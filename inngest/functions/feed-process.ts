import { db } from "@/db";
import { inngest } from "../client";
import Parser from "rss-parser"
import { article } from "@/db/schema";
import { randomUUID } from "node:crypto";

export const feedProcess = inngest.createFunction({
    id: "feed-process", concurrency: 20, triggers: { event: "feed/process" }
}, async ({ step, event }) => {

    const source = event.data;
    //? step1 : parse rss using rss-parser
    const articles = await step.run("rss-parsed", async () => {

        const parser = new Parser();

        const feed = await parser.parseURL(source.rssUrl);

        return feed.items.map((item) => ({
            title: item.title ?? "",
            link: item.link ?? item.guid ?? "",
            author: item.creator ?? "",
            pubDate: item.pubDate ?? "",
        })).filter((item) => item.link !== "")
    });

    //? step2 : all rss returned articles save in database
    const savedArticles = await step.run("save-articles", async () => {
        return await db
            .insert(article)
            .values(
                articles.map((item) => {
                    const slug =
                        item.title
                            .toLowerCase()
                            .trim()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/\s+/g, "-")
                            .replace(/-+/g, "-")
                            .slice(0, 30)
                            .replace(/-$/, "") +
                        "-" +
                        randomUUID().slice(0, 6);

                    return {
                        title: item.title,
                        originalUrl: item.link,
                        author: item.author,
                        publicAt: item.pubDate,
                        sourceId: source.id,
                        slug: slug
                    }
                })
            )
            .onConflictDoNothing({
                target: article.originalUrl
            }) //* so already saved articles ignore it */
            .returning({ id: article.id });
    });

    //? step3 : new articles saved run content fetch and ai processing 
    await step.sendEvent(
        "queue-article-processing",
        savedArticles.map((article) => ({
            name: "article/process",
            data: {
                articleId: article.id,
            },
        }))
    );

    return { id: event.id, totalNewArticle: savedArticles.length };
})