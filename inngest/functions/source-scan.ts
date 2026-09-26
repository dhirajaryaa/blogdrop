import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { article, source } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { fetchRSS } from "@/features/harvester/feed-process";
import { buildArticleSlug } from "@/features/article/slugCreate";

export const sourceScan = inngest.createFunction(
    {
        id: "all-source-scan",
        description: "Refresh all active sources and get all new articles.",
        retries: 2,
        triggers: [{ event: "app/allSourceScan" }, { cron: "0 0 * * *" }]
    },
    async ({ step }): Promise<IngestResult> => {

        //? step 1: all active source get from db
        const sources = await step.run("fetch-active-sources", async () => {
            return await db
                .select({ id: source.id, rssUrl: source.rssUrl })
                .from(source)
                .where(and(eq(source.isActive, true), isNotNull(source.rssUrl)))
        });

        if (sources.length === 0) {
            return { status: "error", reason: "no active source found" };
        };

        //? step 2: run parallel all sources (individual failures don't block the rest)
        const rssResults = await Promise.allSettled(
            sources.map(source =>
                step.run(`fetch-${source.id}`, async () => {
                    const articles = await fetchRSS(source.rssUrl);
                    return articles.map((article) => ({ ...article, sourceId: source.id }));
                })
            )
        );
        const failedSources = rssResults.flatMap((result, index) =>
            result.status === "rejected"
                ? [{ id: sources[index].id, reason: result.reason }]
                : []
        );

        for (const failedSource of failedSources) {
            console.error(`RSS fetch failed for source ${failedSource.id}:`, failedSource.reason);
        }

        if (failedSources.length === sources.length) {
            throw new Error(`RSS fetch failed for all ${sources.length} active sources`);
        }

        const articles = rssResults.flatMap((result) =>
            result.status === "fulfilled" ? result.value : []
        );

        //* no articles found from any source
        if (articles.length === 0) {
            return { status: "success", data: "no new articles found from any source" };
        }

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
        });

        //? step 4: trigger article process-metadata generation
        if (savedArticles.length > 0) {
            await step.sendEvent("article-batch-dispatcher", {
                name: "app/ArticleBatchDispatcher",
                data: {}
            });
        }

        return { status: "success", data: { sourcesScanned: sources.length, articlesFound: articles.length, articlesSaved: savedArticles.length } };
    })
