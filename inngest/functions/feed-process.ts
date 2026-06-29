import { db } from "@/db";
import { inngest } from "../client";
import Parser from "rss-parser"
import { article } from "@/db/schema";

export const feedProcess = inngest.createFunction({
    id: "feed-process", concurrency: 10, triggers: { event: "feed/process" }
}, async ({ step, event }) => {

    const source = event.data;
    //step1 : parse rss using rss-parser
    const articles = await step.run("rss-parsed", async () => {

        const parser = new Parser();

        const feed = await parser.parseURL(source.rssUrl);
        return feed.items;
    });

    const savedArticles = await step.run("save-articles", async () => {
        return await db
            .insert(article)
            .values(
                articles.map((item) => ({
                    title: item.title ?? "",
                    originalUrl: item.link ?? item.guid ?? "",
                    author: item.creator ?? "",
                    publicAt: item.pubDate ?? "",
                    sourceId: source.id,
                    content: item.content ?? "",
                }))
            )
            .onConflictDoNothing()
            .returning();
    });

    await step.sendEvent(
        "queue-article-processing",
        articles.map((article) => ({
            name: "article/process",
            data: {
                articleId: article.id,
            },
        }))
    )

    return { eventId: event.id,task: "feed-process" };
})