import { db } from "@/db";
import { inngest, IngestResult } from "../client";
import { article, articleMetaData, aiUsage, tag, category, articleTag, articleCategory } from "@/db/schema";
import { and, eq, lt, sql } from "drizzle-orm";
import { calculateReadingTime } from "@/lib/harvester/reading-time";
import { llmGeneration } from "@/lib/ai";
import { categoriesMapping, tagsMapping } from "@/lib/harvester/tag-mapping";
import { userInterests } from "@/config/tags";
import { articleCategories } from "@/config/category";

const MAX_AI_PER_DAY = 450;

export const articleAIProcessing = inngest.createFunction({
    id: "ai-article-processing",
    concurrency: 5,
    throttle: { limit: 5, period: "2m" },
    triggers: { event: "article/ai-processing" }
},
    async ({ step, event }): Promise<IngestResult> => {

        //? step 1: select article from db
        const [sourceArticle] = await db
            .select()
            .from(article)
            .where(and(eq(article.id, event.data.articleId), eq(article.status, "processing")));

        if (!sourceArticle) return { status: "error", reason: "article not found", error: sourceArticle };

        //* head+tail truncation for token saving [full content if short]
        const rawContent = sourceArticle.content ?? "";

        if (!rawContent.trim()) {
            await step.run("mark-failed-empty-content", async () => {
                await db.update(article).set({ status: "failed" }).where(eq(article.id, sourceArticle.id));
            });
            return { status: "error", reason: "article content is empty" };
        }

        const content = rawContent.length > 4500
            ? [rawContent.slice(0, 3000), "...", rawContent.slice(-1500)].join("\n")
            : rawContent;

        //? step 2: all llm and generate metadata [if promotion so delete article]
        const llmOutput = await step.run("article-metadata-generation",
            async () => {
                return await llmGeneration(content);
            });
        //* llm generation failed
        if (!llmOutput.success) {
            await step.run("mark-ai-failed", async () => {
                await db
                    .update(article)
                    .set({ status: "failed" })
                    .where(eq(article.id, sourceArticle.id));
            });

            return {
                status: "error",
                reason: llmOutput.error ?? "AI metadata generation failed",
            };
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

        //* reading time calculate
        const readingTime = calculateReadingTime(
            sourceArticle.content ?? ""
        );

        //? step 4: metadata save on db, ai credit, tags-categories and status=done in one transition
        const today = new Date().toISOString().slice(0, 10);

        await step.run("save-metadata-and-tags-update",
            async () => {
                await db.transaction((async (tx) => {

                    //* update credit */
                    await tx.update(aiUsage)
                        .set({ used: sql`${aiUsage.used} + 1` })
                        .where(and(eq(aiUsage.day, today), lt(aiUsage.used, MAX_AI_PER_DAY)));

                    //* save metadata */
                    await tx.insert(articleMetaData).values({
                        articleId: sourceArticle.id,
                        readingTime: calculateReadingTime(sourceArticle.content ?? ""),
                        difficulty,
                        keyTakeaways,
                        summary,
                        whyRead
                    })
                        .onConflictDoUpdate({
                            target: articleMetaData.articleId,
                            set: {
                                readingTime: calculateReadingTime(sourceArticle.content ?? ""),
                                difficulty,
                                keyTakeaways,
                                summary,
                                whyRead
                            }
                        })

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
                        }).returning({ categoryId: category.id })

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

                    //* article status update and author add */
                    await tx.update(article).set({
                        author: sourceArticle.author || author,
                        status: "done"
                    }).where(eq(article.id, sourceArticle.id));
                }))

            }
        )

        //? step 5: next batch trigger it
        await step.sendEvent("article-batch-dispatcher", {
            name: "app/ArticleBatchDispatcher",
            data: {}
        });

        return { status: "success", data: llmOutput }
    })
