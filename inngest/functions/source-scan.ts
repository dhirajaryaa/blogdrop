import { db } from "@/db";
import { inngest } from "../client";
import { article, source } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { fetchRSS } from "@/lib/harvester/feed-process";
import { buildArticleSlug } from "@/utils/slug";

export const sourceScan = inngest.createFunction(
    {
        id: "all-source-scan",
        description: "Refresh all active sources and get all new articles.",
        triggers: [{ event: "app/task.created" }, { cron: "0 0 * * *" }]
    },
    async ({ event, step }) => {

        //? step 1: all active source get form db 
        const sources = await step.run("fetch-active-sources", async () => {
            return await db
                .select({ id: source.id, rssUrl: source.rssUrl })
                .from(source)
                .where(and(eq(source.isActive, true), isNotNull(source.rssUrl)))
        });

        if (sources.length === 0) {
            return { totalSource: 0, reason: "active source not found" };
        };

        //? step 2: run parallel all sources 
        const rssResults = await Promise.all(
            sources.map(source =>
                step.run(`fetch-${source.id}`, async () => {
                    const articles = await fetchRSS(source.rssUrl);

                    return articles.map((article) => ({ ...article, sourceId: source.id }))
                })
            )
        );
        const articles = rssResults.flat();

        //? step 3: all articles save on db
        const savedArticles = await step.run("save-articles", async () => {
            return await db
                .insert(article)
                .values(
                    articles.map((item) => ({
                        title: item.title,
                        originalUrl: item.link,
                        author: item.author,
                        publicAt: item.pubDate,
                        sourceId: item.sourceId,
                        slug: buildArticleSlug(item.title)
                    }))
                )
                .onConflictDoNothing({
                    target: article.originalUrl
                }) //* so already saved articles ignore it */
                .returning({ id: article.id });
        })


        return { totalNewArticle: savedArticles.length };
    })