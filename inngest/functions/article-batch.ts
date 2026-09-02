import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { aiUsage, article } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

const BATCH_SIZE = 100;
const AI_API_LIMIT = 500;

export const articleBatchDispatcher = inngest.createFunction({
    id: "article-batch-dispatcher",
    triggers: { event: "app/ArticleBatchDispatcher" }
},
    async ({ step, event }): Promise<IngestResult> => {

        //? step 1: check ai credit [if remaining then proceed]
        const aiCredit = await step.run("ai-credit-check", async () => {
            const today = new Date().toISOString().slice(0, 10);

            const [aiCredit] = await db.select({
                used: aiUsage.used,
                apiId: aiUsage.apiId
            })
                .from(aiUsage)
                .where(eq(aiUsage.day, today));


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
                    .where(eq(article.status, "pending"))
                    .limit(batchSize)
                    .for("update", { skipLocked: true });

                if (!pending.length) return [];

                const ids = pending.map(({ id }) => id);

                return tx
                    .update(article)
                    .set({ status: "processing" })
                    .where(inArray(article.id, ids))
                    .returning()
            });

        });

        //? step 3: trigger article precessing job
        await Promise.all(
            processingArticles.map((article) => (
              step.sendEvent("article-processing", {
                    name: "app/ArticleProcessing",
                    data: {
                        articleId: article.id,
                        articleUrl: article.originalUrl
                    }
                })
            ))
        )

        return { status: "success" }
    })