import { db } from "@/db";
import { inngest } from "../client";
import { article, articleMetaData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateReadingTime } from "@/lib/harvester/reading-time";
import { llmGeneration } from "@/lib/ai";
import { categoriesMapping, tagsMapping } from "@/lib/harvester/tag-mapping";


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
            sourceArticle.content?.slice(0, 3000),
            "...",
            sourceArticle.content?.slice(-1500),
        ].filter(Boolean)
            .join("\n");

        //? step 1: generate metadata with ai [some time author not catch with regex so ai ask, banner image]
        const metadata = await step.run("metadata-generate", async () => {
            return llmGeneration(content);
        });

        if (!metadata.success) return { error: metadata.error ?? "failed to generate metadata" };


        const { categories, difficulty, keyTakeaways, summary, tags, whyRead, author } = metadata.data; // come form metadata extraction AI


        //? step 2: tags & categories mapping with predefined tags-categories
        const canonicalMapping = await step.run("map-original-tags", async () => {

            const canonicalCategories = categoriesMapping(categories);
            const canonicalTags = tagsMapping(tags);

            return { categories: canonicalCategories, tags: canonicalTags };
        });


        //? step 3: save metadata on db [status later on Addon ] 

        await step.run("save-metadata", async () => {

            return await db.transaction(async (tx) => {

                await tx.insert(articleMetaData).values({
                    articleId: sourceArticle.id,
                    summary,
                    tags: canonicalMapping.tags ?? tags,
                    categories: canonicalMapping.categories ?? categories,
                    keyTakeaways,
                    difficulty,
                    whyRead,
                    readingTime: calculateReadingTime(sourceArticle.content ?? "")
                });

                await tx.update(article).set({
                    status: "completed",
                    author: sourceArticle.author || author
                }).where(eq(article.id, sourceArticle.id));
            });

        });

        //? step 4: sleep so ai processing
        await step.sleep("wait-to-new-event-run", "5s");

        return { id: event.id, status: "Article processing Done.", totalTokenUsed: metadata.tokenUsed };
    })