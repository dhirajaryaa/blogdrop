import { db } from "@/db";
import { inngest, feedProcessEvent } from "../client";
import Parser from "rss-parser"
import { article } from "@/db/schema";
import { randomUUID } from "node:crypto";

const toIsoDate = (value?: string): string => {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

const buildSlug = (title: string): string => {
    const base = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 30)
        .replace(/^-+|-+$/g, "");

    return [base, randomUUID().slice(0, 6)].filter(Boolean).join("-");
}

export const feedProcess = inngest.createFunction({
    id: "feed-process", concurrency: 5, triggers: { event: feedProcessEvent }
}, async ({ step, event }) => {

    //? step1 : parse rss using rss-parser
    const articles = await step.run("rss-parsed", async () => {

        const parser = new Parser();

        const feed = await parser.parseURL(event.data.rssUrl);

        return feed.items.map((item) => ({
            title: item.title ?? "",
            link: item.link ?? item.guid ?? "",
            author: item.creator ?? "",
            pubDate: toIsoDate(item.isoDate ?? item.pubDate),
        }))
            .filter((item) => item.link !== "" && item.title !== "")
    });

    //? step2 : all rss returned articles save in database
    const savedArticles = await step.run("save-articles", async () => {
        return await db
            .insert(article)
            .values(
                articles.map((item) => ({
                    title: item.title,
                    originalUrl: item.link,
                    author: item.author,
                    publicAt: item.pubDate,
                    sourceId: event.data.id,
                    slug: buildSlug(item.title)
                }))
            )
            .onConflictDoNothing({
                target: article.originalUrl
            }) //* so already saved articles ignore it */
            .returning({ id: article.id });
    });

    if (savedArticles.length === 0) {
        return { totalNewArticle: 0 };
    }

    //? step3 : new articles saved run content fetch and ai processing 
    await step.sendEvent(
        "queue-article-processing",
        savedArticles.map((item) => ({
            name: "article/process",
            data: {
                articleId: item.id,
            },
        }))
    );

    return { totalNewArticle: savedArticles.length };
})
