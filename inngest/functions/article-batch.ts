import { db } from "@/db";
import { aiUsage, article } from "@/db/schema";
import { IngestResult, inngest } from "@/inngest/client";
import { eq, inArray, sql } from "drizzle-orm";

const BATCH_SIZE = 100;
const AI_API_LIMIT = 500; // RPD as requested

export const articleBatchDispatcher = inngest.createFunction(
  {
    id: "article-batch-dispatcher",
    concurrency: 1, // prevent two dispatchers from racing for the same articles
    retries: 2,
    triggers: [{ event: "app/ArticleBatchDispatcher" }],
  },
  async ({ step }): Promise<IngestResult> => {
    // Step 1: check AI credit [if remaining then proceed]
    const aiCredit = await step.run("ai-credit-check", async () => {
      const today = new Date().toISOString().slice(0, 10);

      const [credit] = await db
        .insert(aiUsage)
        .values({
          day: today,
          used: 0,
          apiId: 1,
        })
        .onConflictDoUpdate({
          target: aiUsage.day,
          set: {
            used: sql`${aiUsage.used}`,
          },
        })
        .returning({
          used: aiUsage.used,
          apiId: aiUsage.apiId,
        });

      const used = credit?.used ?? 0;
      const remaining = AI_API_LIMIT - used;

      if (remaining <= 0) {
        return { allow: false, remaining: 0 };
      }

      return { allow: true, remaining };
    });

    if (!aiCredit.allow) {
      return {
        status: "error",
        reason: "no ai credit remaining",
        error: aiCredit,
      };
    }

    // Step 2: select pending articles and mark as processing
    const processingArticles = await step.run("select-pending-article", async () => {
      const batchSize = Math.min(aiCredit.remaining, BATCH_SIZE);

      return await db.transaction(async (tx) => {
        const pending = await tx
          .select({ id: article.id, originalUrl: article.originalUrl })
          .from(article)
          .where(eq(article.status, "pending"))
          .limit(batchSize)
          .for("update", { skipLocked: true });

        if (!pending.length) return [];

        const ids = pending.map(({ id }) => id);

        return tx
          .update(article)
          .set({ status: "processing" })
          .where(inArray(article.id, ids))
          .returning();
      });
    });

    if (!processingArticles.length) {
      return { status: "success", data: "no pending articles" };
    }

    // Step 3: trigger article processing jobs
    await Promise.all(
      processingArticles.map((art) =>
        step.sendEvent("article-processing", {
          name: "app/ArticleProcessing",
          data: {
            articleId: art.id,
            articleUrl: art.originalUrl,
          },
        }),
      ),
    );

    return { status: "success" };
  },
);
