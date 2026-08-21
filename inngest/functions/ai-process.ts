import { db } from "@/db";
import { inngest, articleAiProcessingEvent } from "../client";
import { article, articleMetaData, aiUsage } from "@/db/schema";
import { and, eq, lt, sql } from "drizzle-orm";
import { calculateReadingTime } from "@/lib/harvester/reading-time";
import { llmGeneration } from "@/lib/ai";
import { categoriesMapping, tagsMapping } from "@/lib/harvester/tag-mapping";

//! only add for [free tier RPD-500/day limit not fix] if use pro plan simple remove it
const MAX_AI_PER_DAY = 400;

//? atomic daily quota consume [memoized step so LLM retries never double-count]
const acquireAiQuota = async (): Promise<boolean> => {
    const day = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" UTC

    await db.insert(aiUsage).values({ day }).onConflictDoNothing();

    const [row] = await db.update(aiUsage)
        .set({ used: sql`${aiUsage.used} + 1` })
        .where(and(eq(aiUsage.day, day), lt(aiUsage.used, MAX_AI_PER_DAY)))
        .returning({ used: aiUsage.used });

    return row != null;
}

const nextUtcMidnight = (): Date => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
}

export const articleAIProcessing = inngest.createFunction({
    id: "ai-article-processing",
    concurrency: 5,
    throttle: { limit: 5, period: "1m" },
    triggers: { event: articleAiProcessingEvent },
    onFailure: async ({ event, error }) => {
        const articleId = event.data.event.data?.articleId;
        if (!articleId) return;

        await db.update(article)
            .set({ status: "failed" })
            .where(eq(article.id, articleId));

        console.error(`ai-article-processing failed for ${articleId}:`, error.message);
    }
},
    async ({ step, event }) => {

        const sourceArticle = await step.run("load-article", async () => {
            const [row] = await db.select().from(article).where(eq(article.id, event.data.articleId));
            return row ?? null;
        });

        if (!sourceArticle) return { error: "article not found" };

        //? skip reprocessing on event redelivery
        if (sourceArticle.status === "completed") {
            return { status: "skipped: already completed" };
        }

        //? head+tail truncation for token saving [full content if short]
        const rawContent = sourceArticle.content ?? "";

        if (!rawContent.trim()) {
            await step.run("mark-failed-empty-content", async () => {
                await db.update(article).set({ status: "failed" }).where(eq(article.id, sourceArticle.id));
            });
            return { error: "article content is empty" };
        }

        const content = rawContent.length > 4500
            ? [rawContent.slice(0, 3000), "...", rawContent.slice(-1500)].join("\n")
            : rawContent;

        //? step 0: daily ai quota check [cap reached ho toh utc midnight tak sleep]
        let acquired = await step.run("acquire-ai-quota", acquireAiQuota);

        if (!acquired) {
            await step.sleepUntil("wait-for-quota-reset", nextUtcMidnight());
            acquired = await step.run("acquire-ai-quota-after-reset", acquireAiQuota);

            if (!acquired) {
                await step.run("mark-failed-quota", async () => {
                    await db.update(article).set({ status: "failed" }).where(eq(article.id, sourceArticle.id));
                });
                return { status: "skipped: daily AI quota exhausted" };
            }
        }

        //? step 1: generate metadata with ai [some time author not catch with regex so ai ask, banner image]
        //! throw inside step so Inngest retries the actual LLM call with backoff
        const metadata = await step.run("metadata-generate", async () => {
            const result = await llmGeneration(content);

            if (!result.success) {
                throw new Error(result.error ?? "failed to generate metadata");
            }

            return { data: result.data, tokenUsed: result.tokenUsed };
        });

        //? step 2: remove promotional article and abort for there steps
        if (metadata.data.isPromotional) {
            await step.run("remove-promotion", async () => {
                return await db.delete(article).where(eq(article.id, sourceArticle.id));
            });
            return { status: "Article removed (promotional)" };
        };

        const { categories, difficulty, keyTakeaways, summary, tags, whyRead, author } = metadata.data;

        //? step 3: tags & categories mapping with predefined tags-categories
        const canonicalMapping = await step.run("map-original-tags", async () => {
            const canonicalCategories = categoriesMapping(categories);
            const canonicalTags = tagsMapping(tags);

            return { categories: canonicalCategories, tags: canonicalTags };
        });


        //? step 4: save metadata on db [idempotent so duplicate events safe]

        await step.run("save-metadata", async () => {

            return await db.transaction(async (tx) => {
                await tx.insert(articleMetaData).values({
                    articleId: sourceArticle.id,
                    summary,
                    tags: canonicalMapping.tags,
                    categories: canonicalMapping.categories ?? categories,
                    keyTakeaways,
                    difficulty,
                    whyRead,
                    readingTime: calculateReadingTime(sourceArticle.content ?? "")
                }).onConflictDoUpdate({
                    target: articleMetaData.articleId,
                    set: {
                        summary,
                        tags: canonicalMapping.tags,
                        categories: canonicalMapping.categories ?? categories,
                        keyTakeaways,
                        difficulty,
                        whyRead,
                        readingTime: calculateReadingTime(sourceArticle.content ?? "")
                    }
                });

                await tx.update(article).set({
                    status: "completed",
                    author: sourceArticle.author || author
                }).where(eq(article.id, sourceArticle.id));
            });

        });

        return { status: "Article processing Done.", totalTokenUsed: metadata.tokenUsed };
    })
