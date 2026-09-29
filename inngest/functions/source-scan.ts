import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { article, source } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { fetchRSS } from "@/features/harvester/feed-process";
import { buildArticleSlug } from "@/features/article/slugCreate";
import { describeError, mapSettledWithConcurrency } from "@/lib/pool";

//! how many feeds we pull at once. polite to origin servers and keeps one
//! step from opening hundreds of sockets at the same time.
const RSS_CONCURRENCY = 10;

//! postgres has a hard bind-parameter ceiling, chunk the bulk insert
const INSERT_CHUNK_SIZE = 200;

type FeedItem = Awaited<ReturnType<typeof fetchRSS>>[number];

type StagedArticle = FeedItem & { sourceId: string };


const insertArticles = async (articles: StagedArticle[]) => {
    let saved = 0;

    for (let i = 0; i < articles.length; i += INSERT_CHUNK_SIZE) {
        const chunk = articles.slice(i, i + INSERT_CHUNK_SIZE);

        const inserted = await db
            .insert(article)
            .values(
                chunk.map((item) => ({
                    title: item.title,
                    originalUrl: item.link,
                    author: item.author,
                    publicAt: item.pubDate,
                    sourceId: item.sourceId,
                    slug: buildArticleSlug(item.title),
                }))
            )
            .onConflictDoNothing({
                target: article.originalUrl,
            }) //* so already saved articles ignore it */
            .returning({ id: article.id });

        saved += inserted.length;
    }

    return saved;
};


export const sourceScan = inngest.createFunction(
    {
        id: "all-source-scan",
        description: "Refresh all active sources and get all new articles.",
        concurrency: 1,
        retries: 2,
        triggers: [{ event: "app/allSourceScan" }, { cron: "0 0 * * *" }]
    },
    async ({ step }): Promise<IngestResult> => {

        //? one coarse step: read the active sources, pull and parse every feed
        //? in-process with bounded concurrency, then bulk insert. one feed
        //? failing only loses that feed.
        const scan = await step.run("fetch-and-save-articles", async () => {
            const sources = await db
                .select({ id: source.id, rssUrl: source.rssUrl })
                .from(source)
                .where(and(eq(source.isActive, true), isNotNull(source.rssUrl)));

            if (sources.length === 0) {
                return {
                    sourcesScanned: 0,
                    failedSources: 0,
                    articlesFound: 0,
                    articlesSaved: 0,
                };
            }

            const results = await mapSettledWithConcurrency(
                sources,
                RSS_CONCURRENCY,
                async (activeSource) => {
                    const items = await fetchRSS(activeSource.rssUrl);

                    return items.map((item) => ({
                        ...item,
                        sourceId: activeSource.id,
                    }));
                }
            );

            const failedSources: { id: string; reason: string }[] = [];
            const articles: StagedArticle[] = [];

            results.forEach((result, index) => {
                if (result.ok) {
                    articles.push(...result.value);
                    return;
                }

                const reason = describeError(result.error);
                failedSources.push({ id: sources[index].id, reason });
                console.error(`RSS fetch failed for source ${sources[index].id}:`, reason);
            });

            const articlesSaved = articles.length > 0 ? await insertArticles(articles) : 0;

            return {
                sourcesScanned: sources.length,
                failedSources: failedSources.length,
                articlesFound: articles.length,
                articlesSaved,
            };
        });

        if (scan.sourcesScanned === 0) {
            return { status: "error", reason: "no active source found" };
        };

        //* total outage, worth a retry of the whole scan
        if (scan.failedSources === scan.sourcesScanned) {
            throw new Error(`RSS fetch failed for all ${scan.sourcesScanned} active sources`);
        }

        //* nothing new anywhere
        if (scan.articlesSaved === 0) {
            return { status: "success", data: scan };
        }

        //? articles are already in the db. this only starts the batch loop.
        await step.sendEvent("article-batch-dispatcher", {
            name: "app/ArticleBatchProcess",
            data: {}
        });

        return { status: "success", data: scan };
    })
