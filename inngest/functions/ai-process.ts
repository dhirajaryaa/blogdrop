import { db } from "@/db";
import { inngest } from "../client";
import { article, articleMetaData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateReadingTime } from "@/lib/harvester/reading-time";
import { llmGeneration } from "@/lib/ai";

export const articleAIProcessing = inngest.createFunction({
    id: "ai-article-processing",
    concurrency: 5,
    throttle: { limit: 12, period: "1m" },
    triggers: { event: "article/ai-processing" }
},
    async ({ step, event }) => {

        const [sourceArticle] = await db.select().from(article).where(eq(article.id, event.data.articleId));

        if (!sourceArticle) return { error: "article not found" };

        const content = [
            sourceArticle.content?.slice(0, 2500),
            "...",
            sourceArticle.content?.slice(-1000),
        ].filter(Boolean)
            .join("\n");

        //? step 1: generate metadata with ai [some time author not catch with regex so ai ask, banner image]
        const metadata = await step.run("metadata-generate", async () => {
            return llmGeneration(content);
        });

        if (!metadata.success) return { error: metadata.error ?? "failed to generate metadata" };

        //? step 2: save metadata on db [status later on Addon ] 

        await step.run("save-metadata", async () => {

            return await db.transaction(async (tx) => {

                const { categories, difficulty, keyTakeaways, summary, tags, whyRead } = metadata.data;

                await tx.insert(articleMetaData).values({
                    articleId: sourceArticle.id,
                    summary,
                    tags,
                    categories,
                    keyTakeaways,
                    difficulty,
                    whyRead,
                    readingTime: calculateReadingTime(sourceArticle.content ?? "")
                });

                await tx.update(article).set({ status: "completed" }).where(eq(article.id, sourceArticle.id))
            });

        });

        //? step 3: sleep so ai processing
        await step.sleep("wait-to-new-event-run", "5s");

        return { id: event.id, status: "Article processing Done.", totalTokenUsed: metadata.tokenUsed };
    })