import { db } from "@/db";
import { inngest, articleProcessEvent } from "../client";
import { article } from "@/db/schema";
import { eq } from "drizzle-orm";
import { extractArticleContent } from "@/lib/harvester/extract-article";
import { convertHtmlToMarkdown } from "@/lib/harvester/html-markdown";
import { RetryAfterError } from "inngest";

const FETCH_TIMEOUT_MS = 15_000;
const USER_AGENT = "Mozilla/5.0 (compatible; BlogdropBot/1.0)";

export const articleProcessing = inngest.createFunction({
    id: "article-processing",
    concurrency: 5,
    triggers: { event: articleProcessEvent },
    onFailure: async ({ event, error }) => {
        const articleId = event.data.event.data?.articleId;
        if (!articleId) return;

        await db.update(article)
            .set({ status: "failed" })
            .where(eq(article.id, articleId));

        console.error(`article-processing failed for ${articleId}:`, error.message);
    }
}, async ({ step, event }) => {

    const sourceArticle = await step.run("load-article", async () => {
        const [row] = await db.select().from(article).where(eq(article.id, event.data.articleId));
        return row ?? null;
    });

    if (!sourceArticle) return { error: "article not found" };

    //? skip reprocessing on event redelivery
    if (sourceArticle.status === "completed") {
        return { status: "skipped: already completed" };
    }

    //? step 1: fetch the article in text;
    const response = await step.run("fetch-article", async () => {
        const res = await fetch(sourceArticle.originalUrl, {
            headers: { "User-Agent": USER_AGENT },
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
            redirect: "follow",
        });

        if (res.status === 429) {
            const retryAfterSec = Number(res.headers.get("retry-after")) || 60;
            throw new RetryAfterError("Rate-Limit-hit", retryAfterSec * 1000);
        }

        if (res.status === 404) {
            return null;
        }

        if (!res.ok) {
            throw new Error(`Fetch failed: ${res.status}`);
        }

        return {
            status: res.status,
            html: await res.text(),
        };
    });

    if (!response) {
        await step.run("mark-failed-404", async () => {
            await db.update(article).set({ status: "failed" }).where(eq(article.id, sourceArticle.id));
        });
        return { error: "article not found (404)" };
    }

    //? step 2: readability js parse
    const articleData = await step.run("extract-article", async () => {
        return extractArticleContent({ html: response.html, url: sourceArticle.originalUrl });
    });

    if (!articleData) {
        await step.run("mark-failed-extract", async () => {
            await db.update(article).set({ status: "failed" }).where(eq(article.id, sourceArticle.id));
        });
        return { error: "article extraction failed!" };
    }

    //? step 3: article html to markdown [so low token on AI gen]
    const processed = await step.run("convert-html-to-markdown", async () => {

        const data = await convertHtmlToMarkdown(articleData.content);

        if (!data?.markdown) return null;

        // save to db 
        const [updated] = await db.update(article).set({
            content: data.markdown,
            author: articleData.byline || data.author || sourceArticle.author,
            imageUrl: articleData.image ?? undefined,
            status: "processing"
        })
            .where(eq(article.id, sourceArticle.id))
            .returning({ id: article.id })

        return updated ?? null;
    })

    if (!processed) {
        await step.run("mark-failed-convert", async () => {
            await db.update(article).set({ status: "failed" }).where(eq(article.id, sourceArticle.id));
        });
        return { error: "article processing failed!" };
    }

    //? step 4: article meta data generation [function] so rate-limit after retry auto
    await step.sendEvent(
        "ai-article-processing",
        {
            name: "article/ai-processing",
            data: {
                articleId: processed.id,
            },
        }
    );

    return { queuedAiProcessing: true };

})
