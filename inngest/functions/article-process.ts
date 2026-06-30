import { db } from "@/db";
import { inngest } from "../client";
import { article } from "@/db/schema";
import { eq } from "drizzle-orm";
import { extractArticleContent } from "@/lib/harvester/extract-article";
import { convertHtmlToMarkdown } from "@/lib/harvester/html-markdown";


export const articleProcessing = inngest.createFunction({
    id: "article-processing", concurrency: 20, triggers: ({ event: "article/process" })
}
    , async ({ step, event }) => {

        const [sourceArticle] = await db.select().from(article).where(eq(article.id, event.data.articleId));

        if (!sourceArticle) return { error: "article not found" };

        //? step 1: fetch the article in text;
        const response = await step.fetch(sourceArticle.originalUrl);

        //? step 2: readability js parse
        const articleData = await step.run("extract-article-form-link", async () => {
            const articleHtml = await response.text();

            if (!articleHtml) return null;

            return extractArticleContent({ html: articleHtml, url: sourceArticle.originalUrl });
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
                imageUrl: data.image
            })
                .where(eq(article.id, sourceArticle.id))
                .returning({ id: article.id })
        })

        //? step 4: article meta data generation [function] so rate-limit after retry auto

        if (!processingRequired) return { eventId: event.id, error: "article processing failed!" };

        await step.sendEvent(
            "ai-article-processing",
            processingRequired.map((article) => ({
                name: "article/ai-processing",
                data: {
                    articleId: article.id,
                },
            }))
        );

        return { eventId: event.id, task: "article/process" };

    })