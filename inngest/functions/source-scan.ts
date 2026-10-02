import { db } from "@/db";
import { article, source } from "@/db/schema";
import { buildArticleSlug } from "@/features/article/slugCreate";
import { fetchRSS } from "@/features/harvester/feed-process";
import { IngestResult, inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";

export const sourceScan = inngest.createFunction(
  {
    id: "all-source-scan",
    description: "Refresh all active sources and get all new articles.",
    retries: 2,
    triggers: [{ event: "app/allSourceScan" }, { cron: "0 0 * * *" }],
  },
  async ({ step }): Promise<IngestResult> => {
    //Todo: 1. Get select all active source form database
    const activeSource = await step.run("get-all-active-sources", async () => {
      return await db.select().from(source).where(eq(source.isActive, true));
    });

    if (activeSource.length === 0) {
      return { status: "error", reason: "No Active Source found!" };
    }

    //Todo: 2. run Promise.settled to scan all source

    const results = await Promise.allSettled(
      activeSource.map(async (source) => {
        return await step.run(
          `fetch-article-from-${source.title}`,
          async () => {
            if (!source.rssUrl) return []; // if rss url not found;

            try {
              const posts = await fetchRSS(source.rssUrl);
              return posts.map((post) => ({ ...post, sourceId: source.id }));
            } catch (error) {
              console.error(`RSS fetch failed for source ${source.id}:`, error);
              return [];
            }
          },
        );
      }),
    );

    const fetchedArticles = results.flatMap((result) =>
      result.status === "fulfilled" ? result.value : [],
    );

    if (!fetchedArticles || fetchedArticles.length === 0) {
      return {
        status: "error",
        reason: "Failed to fetch articles form rss feed!",
      };
    }

    //Todo: 3. all success article save on db
    const savedArticles = await step.run("save-articles-in-db", async () => {
      return await db
        .insert(article)
        .values(
          fetchedArticles.map((post) => ({
            title: post.title,
            originalUrl: post.link,
            author: post.author,
            publicAt: post.pubDate,
            sourceId: post.sourceId,
            slug: buildArticleSlug(post.title),
          })),
        )
        .onConflictDoNothing({
          target: article.originalUrl,
        })
        .returning({ articleId: article.id });
    });

    //Todo: 4.  Trigger Article Batch Processing
    await step.sendEvent("article-batch-dispatcher", {
      name: "app/ArticleBatchDispatcher",
      data: {},
    })

    return { status: "success", data: savedArticles };
  },
);
