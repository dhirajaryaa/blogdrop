import { db } from "@/db";
import { inngest, IngestResult } from "../client";
import { article, articleMetaData, aiUsage, tag, category, articleTag, articleCategory } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { calculateReadingTime } from "@/features/harvester/reading-time";
import { llmGeneration } from "@/features/ai/";
import { categoriesMapping, tagsMapping } from "@/features/harvester/tag-mapping";
import { userTags } from "@/config/tags";
import { articleCategories } from "@/config/category";

export const articleAIProcessing = inngest.createFunction({
    id: "ai-article-processing",
    concurrency: 5,
    retries: 3,
    throttle: { limit: 5, period: "1m" },
    triggers: { event: "article/ai-processing" }
},
    async ({ step, event }): Promise<IngestResult> => {
        try {
        //* helper: terminal-status guard so the row never lingers as "processing"
        const markFailed = (reason: string) =>
            step.run("mark-ai-failed", async () => {
                await db.update(article).set({ status: "failed" }).where(eq(article.id, event.data.articleId));
            }).then(() => ({ status: "error" as const, reason }));

        //* one Gemini call = one credit, whether the article is saved or removed
        //* as promotional - bill it right after the call completes. upsert so the
        //* ai_usage row always exists to increment (e.g. at a UTC day boundary)
        const consumeAiCredit = () =>
            step.run("consume-ai-credit", async () => {
                const today = new Date().toISOString().slice(0, 10);
                return db
                    .insert(aiUsage)
                    .values({ day: today, used: 1, apiId: 1 })
                    .onConflictDoUpdate({
                        target: aiUsage.day,
                        set: {
                            used: sql`${aiUsage.used} + 1`,
                        },
                    });
            });

        //? step 1: select article from db
        const [sourceArticle] = await db
            .select()
            .from(article)
            .where(and(eq(article.id, event.data.articleId), eq(article.status, "processing")));

        if (!sourceArticle) return { status: "error", reason: "article not found or not in processing state" };

        //* head+tail truncation for token saving [full content if short]
        const rawContent = sourceArticle.content ?? "";

        if (!rawContent.trim()) {
            return await markFailed("article content is empty");
        }

        const content = rawContent.length > 4500
            ? [rawContent.slice(0, 3000), "...", rawContent.slice(-1500)].join("\n")
            : rawContent;

        //? step 2: all llm and generate metadata [if promotion so delete article]
        let llmOutput: Awaited<ReturnType<typeof llmGeneration>>;
        try {
            llmOutput = await step.run("article-metadata-generation",
                async () => {
                    return await llmGeneration(content);
                });
        } catch (err) {
            return await markFailed(
                `LLM call threw: ${err instanceof Error ? err.message : String(err)}`
            );
        }
        //* llm generation failed
        if (!llmOutput.success) {
            return await markFailed(llmOutput.error ?? "AI metadata generation failed");
        }
        //* a Gemini call completed - bill it now so promotional-removed articles
        //* still count against the daily AI usage
        await consumeAiCredit();
        //* promotional article remove
        if (llmOutput.data.isPromotional) {
            await step.run("remove-promotion", async () => {
                await db
                    .delete(article)
                    .where(eq(article.id, sourceArticle.id));
            });

            return {
                status: "success",
                data: "Article removed (promotional)",
            };
        };

        const {
            categories,
            difficulty,
            keyTakeaways,
            summary,
            tags,
            whyRead,
            author,
        } = llmOutput.data;

        //? step 3: tags & categories mapping with predefined tags-categories

        const canonicalCategories = categoriesMapping(categories);
        const canonicalTags = tagsMapping(tags);

        //* reading time calculate (computed once, reused in transaction)
        const readingTime = calculateReadingTime(sourceArticle.content ?? "");

        //? step 4: metadata save on db, tags-categories and status=done in one transition
        await step.run("save-metadata-and-tags-update",
            async () => {
                return await db.transaction(async (tx) => {
                    //* save metadata */
                    await tx.insert(articleMetaData).values({
                        articleId: sourceArticle.id,
                        readingTime,
                        difficulty,
                        keyTakeaways,
                        summary,
                        whyRead
                    })
                        .onConflictDoUpdate({
                            target: articleMetaData.articleId,
                            set: {
                                readingTime,
                                difficulty,
                                keyTakeaways,
                                summary,
                                whyRead
                            }
                        });

                    //* tag create-save */

                    const selectedTags = userTags.filter((interest) =>
                        canonicalTags.includes(interest.value)
                    );

                    if (selectedTags.length > 0) {
                        const savedTags = await tx.insert(tag).values(
                            selectedTags.map((tag) => ({
                                name: tag.label,
                                slug: tag.value,
                            }))
                        ).onConflictDoUpdate({
                            target: tag.slug,
                            set: {
                                name: sql`excluded.name`,
                            },
                        }).returning({ tagId: tag.id });

                        if (savedTags.length > 0) {
                            await tx
                                .insert(articleTag)
                                .values(
                                    savedTags.map(({ tagId }) => ({
                                        articleId: sourceArticle.id,
                                        tagId,
                                    }))
                                )
                                .onConflictDoNothing();
                        }
                    }

                    //* categories create-save */

                    const selectedCategories = articleCategories.filter((category) =>
                        canonicalCategories.includes(category.value)
                    );

                    if (selectedCategories.length > 0) {

                        const savedCategories = await tx.insert(category).values(
                            selectedCategories.map((category) => ({
                                name: category.label,
                                slug: category.value,
                            }))
                        ).onConflictDoUpdate({
                            target: category.slug,
                            set: {
                                name: sql`excluded.name`,
                            },
                        }).returning({ categoryId: category.id });

                        if (savedCategories.length > 0) {
                            await tx
                                .insert(articleCategory)
                                .values(
                                    savedCategories.map(({ categoryId }) => ({
                                        articleId: sourceArticle.id,
                                        categoryId,
                                    }))
                                )
                                .onConflictDoNothing();
                        }
                    }

                    //* article status update and author add */
                    await tx.update(article).set({
                        author: sourceArticle.author || author,
                        status: "done"
                    }).where(eq(article.id, sourceArticle.id));

                    return { saved: true };
                });
            }
        );

        return { status: "success", data: llmOutput }
        } finally {
            //? keep the queue self-driving: re-trigger the batch dispatcher on
            //? every terminal path (success, promotional removal, or failure) so
            //? one bad article can't stall the rest of the pending queue
            await step.sendEvent("article-batch-dispatcher", {
                name: "app/ArticleBatchDispatcher",
                data: {}
            });
        }
    })
