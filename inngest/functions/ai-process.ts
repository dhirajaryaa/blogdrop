import { db } from "@/db";
import { inngest, IngestResult } from "../client";
import { article, articleMetaData, aiUsage, tag, category, articleTag, articleCategory } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { calculateReadingTime } from "@/lib/harvester/reading-time";
import { llmGeneration } from "@/lib/ai";
import { categoriesMapping, tagsMapping } from "@/lib/harvester/tag-mapping";
import { userInterests } from "@/config/tags";
import { articleCategories } from "@/config/category";

export const articleAIProcessing = inngest.createFunction({
    id: "ai-article-processing",
    concurrency: 5,
    retries: 3,
    throttle: { limit: 5, period: "1m" },
    triggers: { event: "article/ai-processing" }
},
    async ({ step, event }): Promise<IngestResult> => {

        //* helper: terminal-status guard so the row never lingers as "processing"
        const markFailed = (reason: string) =>
            step.run("mark-ai-failed", async () => {
                await db.update(article).set({ status: "failed" }).where(eq(article.id, event.data.articleId));
            }).then(() => ({ status: "error" as const, reason }));

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

        //? step 4: metadata save on db, ai credit, tags-categories and status=done in one transition
        const today = new Date().toISOString().slice(0, 10);

        await step.run("save-metadata-and-tags-update",
            async () => {
                return await db.transaction(async (tx) => {
                    //* always increment credit — AI call already happened in step 2, tokens already used
                    await tx.update(aiUsage)
                        .set({ used: sql`${aiUsage.used} + 1` })
                        .where(eq(aiUsage.day, today));

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

                    const selectedTags = userInterests.filter((interest) =>
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

        //? step 5: next batch trigger it
        await step.sendEvent("article-batch-dispatcher", {
            name: "app/ArticleBatchDispatcher",
            data: {}
        });

        return { status: "success", data: llmOutput }
    })
