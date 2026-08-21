import { db } from "@/db";
import { inngest } from "../client";
import { article } from "@/db/schema";
import { eq } from "drizzle-orm";
import { extractArticleContent } from "@/lib/harvester/extract-article";
import { convertHtmlToMarkdown } from "@/lib/harvester/html-markdown";

const MAX_AI_PER_DAY = 400;

export const articleProcessing = inngest.createFunction({
    id: "article-processing", concurrency: 5, triggers: ({ event: "article/process" })
}
    , async ({ step, event }) => {

        const [sourceArticle] = await db.select().from(article).where(eq(article.id, event.data.articleId));

        if (!sourceArticle) return { id: event.id, error: "article not found" };

        //? step 1: fetch the article in text;
        const response = await step.run("fetch-article", async () => {
            const response = await fetch(sourceArticle.originalUrl);

            if (response.status === 429) {
                throw new Error("Rate-Limit-hit");
            }

            if (response.status === 404) {
                return null;
            }

            if (!response.ok) {
                throw new Error(`Fetch failed: ${response.status}`);
            }

            return {
                status: response.status,
                html: await response.text(),
            };
        });

        //? step 2: readability js parse
        const articleData = await step.run("extract-article-form-link", async () => {

            if (!response?.html) return null;

            return extractArticleContent({ html: response.html, url: sourceArticle.originalUrl });
        });

        //? step 3: article html to markdown [so low token on AI gen]
        const processingRequired = await step.run("convert-html-to-markdown", async () => {

            if (!articleData) return null;

            const data = await convertHtmlToMarkdown(articleData.content);

            if (!data) return null;

            // save to db 
            return await db.update(article).set({
                content: data.markdown,
                author: articleData?.byline ?? data.author,
                imageUrl: articleData.image,
                status: "processing"
            })
                .where(eq(article.id, sourceArticle.id))
                .returning({ id: article.id })
        })

        //? step 4: article meta data generation [function] so rate-limit after retry auto

        if (!processingRequired) return { id: event.id, error: "article processing failed!" };
        
        //! only add for [free tier RPD-500/day limit not fix] if use pro plan simple remove it
        const articlesForAI = processingRequired.slice(0, MAX_AI_PER_DAY);

        await step.sendEvent(
            "ai-article-processing",
            articlesForAI.map((article) => ({
                name: "article/ai-processing",
                data: {
                    articleId: article.id,
                },
            }))
        );

        return { id: event.id, totalNewAIProcessing: processingRequired.length };

    })