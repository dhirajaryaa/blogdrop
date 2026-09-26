import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { aiUsage, article } from "@/db/schema";
import { and, eq, inArray, isNull, lt, or, sql } from "drizzle-orm";

const BATCH_SIZE = 100;
const AI_API_LIMIT = 450;
const PROCESSING_LEASE_MS = 15 * 60 * 1000;

const leaseExpiry = () => new Date(Date.now() + PROCESSING_LEASE_MS);

export const articleBatchDispatcher = inngest.createFunction(
  {
    id: "article-batch-dispatcher",
    concurrency: 1,
    retries: 2,
    triggers: [
      { event: "app/ArticleBatchDispatcher" },
      { cron: "*/5 * * * *" },
    ],
    onFailure: async ({ event, error, step }) => {
      const sourceEvent = event.data.event;
      const batchId = sourceEvent?.id;
      console.error(`Article batch dispatcher failed for ${batchId}:`, error);

      if (!batchId) return;

      await step.run("requeue-unclaimed-articles", async () => {
        await db
          .update(article)
          .set({
            status: "pending",
            processingBatchId: null,
            processingLeaseExpiresAt: null,
          })
          .where(
            and(
              eq(article.status, "processing"),
              eq(article.processingBatchId, batchId),
            ),
          );
      });

      await step.sendEvent("article-batch-dispatcher-after-failure", {
        name: "app/ArticleBatchDispatcher",
        data: {},
      });
    },
  },
  async ({ step, event }): Promise<IngestResult> => {
    const batchId = event.id;

    await step.run("recover-stale-articles", async () => {
      const now = new Date();
      await db
        .update(article)
        .set({
          status: "pending",
          processingBatchId: null,
          processingLeaseExpiresAt: null,
        })
        .where(
          and(
            eq(article.status, "processing"),
            or(
              isNull(article.processingLeaseExpiresAt),
              lt(article.processingLeaseExpiresAt, now),
            ),
          ),
        );
    });

    const claimed = await step.run("claim-and-reserve-articles", async () =>
      db.transaction(async (tx) => {
        const today = new Date().toISOString().slice(0, 10);
        await tx
          .insert(aiUsage)
          .values({ day: today, used: 0, apiId: 1 })
          .onConflictDoNothing({ target: aiUsage.day });

        const [credit] = await tx
          .select({ used: aiUsage.used })
          .from(aiUsage)
          .where(eq(aiUsage.day, today))
          .for("update");
        const remaining = Math.max(0, AI_API_LIMIT - (credit?.used ?? 0));

        const current = await tx
          .select({
            id: article.id,
            originalUrl: article.originalUrl,
            status: article.status,
          })
          .from(article)
          .where(
            and(
              eq(article.status, "processing"),
              eq(article.processingBatchId, batchId),
            ),
          )
          .orderBy(sql`${article.createdAt} asc`)
          .limit(BATCH_SIZE)
          .for("update", { skipLocked: true });

        const pendingLimit = Math.min(
          remaining,
          Math.max(0, BATCH_SIZE - current.length),
        );
        const pending =
          pendingLimit > 0
            ? await tx
                .select({
                  id: article.id,
                  originalUrl: article.originalUrl,
                  status: article.status,
                })
                .from(article)
                .where(eq(article.status, "pending"))
                .orderBy(sql`${article.createdAt} asc`)
                .limit(pendingLimit)
                .for("update", { skipLocked: true })
            : [];

        const articles = [...current, ...pending];
        if (articles.length === 0) {
          return {
            articles: [],
            reservedCredits: 0,
            reservedArticleIds: [],
            remaining,
          };
        }

        if (pending.length > 0) {
          await tx
            .update(aiUsage)
            .set({ used: sql`${aiUsage.used} + ${pending.length}` })
            .where(eq(aiUsage.day, today));
        }

        const claimedArticles = await tx
          .update(article)
          .set({
            status: "processing",
            processingBatchId: batchId,
            processingLeaseExpiresAt: leaseExpiry(),
          })
          .where(
            and(
              inArray(
                article.id,
                articles.map(({ id }) => id),
              ),
              or(
                eq(article.status, "pending"),
                and(
                  eq(article.status, "processing"),
                  eq(article.processingBatchId, batchId),
                ),
              ),
            ),
          )
          .returning({ id: article.id, originalUrl: article.originalUrl });

        return {
          articles: claimedArticles,
          reservedCredits: pending.length,
          reservedArticleIds: pending.map(({ id }) => id),
          remaining: Math.max(0, remaining - pending.length),
        };
      }),
    );

    if (claimed.articles.length === 0) {
      return { status: "success", data: "no pending articles" };
    }

    const dispatchResults = await Promise.allSettled(
      claimed.articles.map((processingArticle) =>
        step.sendEvent(`article-processing-${processingArticle.id}`, {
          name: "app/ArticleProcessing",
          data: {
            articleId: processingArticle.id,
            articleUrl: processingArticle.originalUrl,
            batchId,
          },
        }),
      ),
    );
    const failedDispatches = dispatchResults.flatMap((result, index) =>
      result.status === "rejected"
        ? [
            {
              articleId: claimed.articles[index].id,
              reason: result.reason,
            },
          ]
        : [],
    );

    for (const failedDispatch of failedDispatches) {
      console.error(
        `Article dispatch failed for ${failedDispatch.articleId}:`,
        failedDispatch.reason,
      );
    }

    if (failedDispatches.length > 0) {
      const failedArticleIds = failedDispatches.map(
        ({ articleId }) => articleId,
      );
      await step.run("requeue-failed-dispatches", async () => {
        await db
          .update(article)
          .set({
            status: "pending",
            processingBatchId: null,
            processingLeaseExpiresAt: null,
          })
          .where(
            and(
              eq(article.status, "processing"),
              eq(article.processingBatchId, batchId),
              inArray(article.id, failedArticleIds),
            ),
          );

        const failedReservedCount = failedDispatches.filter(({ articleId }) =>
          claimed.reservedArticleIds.includes(articleId),
        ).length;

        if (failedReservedCount > 0) {
          const today = new Date().toISOString().slice(0, 10);
          await db
            .update(aiUsage)
            .set({
              used: sql`GREATEST(${aiUsage.used} - ${failedReservedCount}, 0)`,
            })
            .where(eq(aiUsage.day, today));
        }
      });

      throw new Error(
        `Failed to dispatch ${failedDispatches.length} article processing events`,
      );
    }

    return { status: "success", data: { processed: claimed.articles.length } };
  },
);
