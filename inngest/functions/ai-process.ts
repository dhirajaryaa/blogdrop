import { db } from "@/db";
import { inngest, IngestResult } from "../client";
import { article, articleMetaData, aiUsage } from "@/db/schema";
import { and, eq, lt, sql } from "drizzle-orm";
import { calculateReadingTime } from "@/lib/harvester/reading-time";
import { llmGeneration } from "@/lib/ai";
import { categoriesMapping, tagsMapping } from "@/lib/harvester/tag-mapping";


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

        //* skip reprocessing on event redelivery
        if (sourceArticle.status === "done") {
            return { status: "success", data: "skipped: already completed" };
        };

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
            return {
                status: "error",
                reason: llmOutput.error ?? "AI metadata generation failed",
            };
        };
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


        //? step 4: metadata save on db, ai credit, tags-categories and status=done in one transition

        //? step 5: ai credit if remaining so next batch trigger it

        return { status: "success", data: llmOutput }
    })
