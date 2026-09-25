import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { aiUsage, article } from "@/db/schema";
import { and, eq, inArray, or, sql } from "drizzle-orm";

const BATCH_SIZE = 100;
const AI_API_LIMIT = 450;

export const articleBatchDispatcher = inngest.createFunction({
    id: "article-batch-dispatcher",
    concurrency: 1, //* prevent two dispatchers from racing for the same articles
    retries: 2,
    triggers: [
        { event: "app/ArticleBatchDispatcher" },
        { cron: "*/5 * * * *" },
    ],
    onFailure: async ({ event, error, step }) => {
        const sourceEvent = event.data.event;
        const batchId = sourceEvent.id;
        console.error(`Article batch dispatcher failed for ${batchId}:`, error);

        if (!batchId) return;

        await step.run("requeue-unclaimed-articles", async () => {
            await db
                .update(article)
                .set({ status: "pending", processingBatchId: null })
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

        //? step 1: check ai credit [if remaining then proceed]
        const aiCredit = await step.run("ai-credit-check", async () => {
            const today = new Date().toISOString().slice(0, 10);

            const [aiCredit] = await db
                .insert(aiUsage)
                .values({
                    day: today,
                    used: 0,
                    apiId: 1
                })
                .onConflictDoUpdate({
                    target: aiUsage.day,
                    set: {
                        used: sql`${aiUsage.used}`
                    }
                })
                .returning({
                    used: aiUsage.used,
                    apiId: aiUsage.apiId
                });


            const used = aiCredit?.used ?? 0;
            const remaining = AI_API_LIMIT - used;

            if (remaining <= 0) {
                return { allow: false, remaining: 0 }
            };

            return { allow: true, remaining }
        });

        if (!aiCredit.allow) return {
            status: "error",
            reason: "no ai credit remaining",
            error: aiCredit
        };

        //? step 2: select pending article [limit remaining or batch size -100] and upsert status "processing"
        const processingArticles = await step.run("select-pending-article", async () => {

            const batchSize = Math.min(aiCredit.remaining, BATCH_SIZE);

            return await db.transaction(async (tx) => {
                // 1 - select pending and mark so skip
                const pending = await tx
                    .select({ id: article.id })
                    .from(article)
                    .where(
                        or(
                            eq(article.status, "pending"),
                            and(
                                eq(article.status, "processing"),
                                eq(article.processingBatchId, event.id),
                            ),
                        ),
                    )
                    .orderBy(
                        sql`CASE WHEN ${article.processingBatchId} = ${event.id} THEN 0 ELSE 1 END`,
                    )
                    .limit(batchSize)
                    .for("update", { skipLocked: true });

                if (!pending.length) return [];

                const ids = pending.map(({ id }) => id);

                return tx
                    .update(article)
                    .set({
                        status: "processing",
                        processingBatchId: event.id,
                    })
                    .where(inArray(article.id, ids))
                    .returning();
            });

        });

        //* no pending articles to process — exit early
        if (!processingArticles.length) {
            return { status: "success", data: "no pending articles" };
        }

        //? step 3: trigger article processing job
        const dispatchResults = await Promise.allSettled(
            processingArticles.map((processingArticle) =>
                step.sendEvent(`article-processing-${processingArticle.id}`, {
                    name: "app/ArticleProcessing",
                    data: {
                        articleId: processingArticle.id,
                        articleUrl: processingArticle.originalUrl
                    }
                })
            )
        );
        const failedDispatches = dispatchResults.flatMap((result, index) =>
            result.status === "rejected"
                ? [{ articleId: processingArticles[index].id, reason: result.reason }]
                : []
        );

        for (const failedDispatch of failedDispatches) {
            console.error(`Article dispatch failed for ${failedDispatch.articleId}:`, failedDispatch.reason);
        }

        if (failedDispatches.length > 0) {
            const failedArticleIds = failedDispatches.map(({ articleId }) => articleId);

            await step.run("requeue-failed-dispatches", async () => {
                await db
                    .update(article)
                    .set({ status: "pending", processingBatchId: null })
                    .where(
                        and(
                            eq(article.status, "processing"),
                            eq(article.processingBatchId, event.id),
                            inArray(article.id, failedArticleIds),
                        ),
                    );
            });

            throw new Error(`Failed to dispatch ${failedDispatches.length} article processing events`);
        }

        const processingArticleIds = processingArticles.map(({ id }) => id);
        await step.run("mark-dispatched-articles-processing", async () => {
            await db
                .update(article)
                .set({
                    status: "processing",
                    processingBatchId: event.id,
                })
                .where(
                    and(
                        eq(article.status, "pending"),
                        inArray(article.id, processingArticleIds),
                    ),
                );
        });

        return { status: "success" }
    })
