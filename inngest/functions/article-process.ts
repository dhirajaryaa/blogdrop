import { db } from "@/db";
import { inngest } from "../client";
import { article } from "@/db/schema";
import { eq } from "drizzle-orm";
import { extractArticleContent } from "@/lib/harvester/extract-article";
import { convertHtmlToMarkDown } from "@/lib/harvester/html-markdown";

export const articleProcessing = inngest.createFunction({
    id: "article-processing", concurrency: 1, triggers: ({ event: "article/process" })
}
    , async ({ step, event }) => {

        const [sourceArticle] = await db.select().from(article).where(eq(article.id, event.data.articleId));

        if (!sourceArticle) return { error: "article not found" };
        
        //? step 1: fetch the article in text;
        const articleHtml = await step.fetch(sourceArticle.originalUrl);

        //? step 2: readability js parse
        const articleData = await step.run("extract-article-form-link", async () => {
            const html = await articleHtml.text();

            return extractArticleContent({ html, url: sourceArticle.originalUrl });

        })

        //? step 3: article html to markdown [so low token on AI gen]
        await step.run("convert-html-to-markdown", async () => {

            if (!articleData) { error: "failed to extract article" }

            const markdown = convertHtmlToMarkDown(articleData?.content ?? "")?.replace(/\n{3,}/g, "\n\n");

            // save to db 

            await db.update(article).set({
                content: markdown,
                author: articleData?.byline ?? article.author
            })
            .where(eq(article.id,sourceArticle.id))
            .returning({ id: article.id })
        })

        //? step 4: article meta data generation


        return { eventId: event.id, task: "article/process" };

    })