import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { article } from "@/db/schema";
import { eq } from "drizzle-orm";
import { extractArticleContent } from "@/lib/harvester/extract-article";
import { convertHtmlToMarkdown } from "@/lib/harvester/html-markdown";

export const FETCH_TIMEOUT_MS = 15_000;

export const USER_AGENT =
    "BlogdropBot/1.0 (+https://blogdrop.in; contact@blogdrop.in)";

export const articleProcessing = inngest.createFunction({
    id: "article-processing",
    concurrency: 5,
    retries: 3,
    triggers: { event: "app/ArticleProcessing" }
}, async ({ step, event }): Promise<IngestResult> => {

    const { articleId, articleUrl } = event.data;
    if (!(articleId && articleUrl)) return { status: "error", reason: "article id and article url required to proceed" };

    //* helper: guarantee a terminal status so rows never stay "processing"
    const markFailed = (reason: string) =>
        step.run("mark-failed", async () => {
            await db.update(article).set({ status: "failed" }).where(eq(article.id, articleId));
        }).then(() => ({ status: "error" as const, reason }));

    try {
        //? step 1: fetch article content
        const response = await step.fetch(articleUrl, {
            redirect: "follow",
            headers: { "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml" },
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });

        //* if error on fetch article
        if (!response.ok) {
            return await markFailed(`Failed to fetch article: ${response.status} ${response.statusText}`);
        }

        //? step 2: get clean html content [readability.js parser]
        const articleData = await step.run("extract-text", async () => {
            const text = await response.text();

            return extractArticleContent({
                url: articleUrl,
                html: text
            });
        });

        if (!articleData) {
            return await markFailed("article extraction failed!");
        };

        //? step 3: convert in clean markdown
        const processed = await step.run("convert-html-to-markdown", async () => {

            const data = await convertHtmlToMarkdown(articleData.content);

            // save to db
            const [updated] = await db.update(article).set({
                content: data?.markdown ?? articleData.textContent,
                author: articleData.byline ?? data?.author,
                imageUrl: articleData.image ?? undefined,
            })
                .where(eq(article.id, articleId))
                .returning({ id: article.id });

            return updated;
        });

        if (!processed) {
            return await markFailed("article update returned no row (missing id)");
        }

        //? step 4: trigger metadata gen. jobs
        await step.sendEvent(
            "ai-article-processing",
            {
                name: "article/ai-processing",
                data: {
                    articleId: processed.id,
                },
            }
        );

        return { status: "success" }
    } catch (err) {
        //* safety net: any uncaught throw leaves the article 'failed', not 'processing'
        return await markFailed(
            `unexpected error: ${err instanceof Error ? err.message : String(err)}`
        );
    }

})
