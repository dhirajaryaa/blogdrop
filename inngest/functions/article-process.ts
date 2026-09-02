import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { article } from "@/db/schema";
import { eq } from "drizzle-orm";
import { RetryAfterError } from "inngest";
import { extractArticleContent } from "@/lib/harvester/extract-article";
import { convertHtmlToMarkdown } from "@/lib/harvester/html-markdown";

const FETCH_TIMEOUT_MS = 15_000;
const USER_AGENT = "Mozilla/5.0 (compatible; BlogdropBot/1.0)";

export const articleProcessing = inngest.createFunction({
    id: "article-processing",
    concurrency: 5,
    triggers: { event: "app/ArticleProcessing" },
    onFailure: async ({ event, error }): Promise<IngestResult> => {
        //* if processing  failed so mark status "failed"
        const { articleId } = event.data.event.data;
        if (!articleId) return { status: "error", reason: "article id required to proceed" };

        await db.update(article)
            .set({ status: "error" })
            .where(eq(article.id, articleId));

        return { status: "success" }
    }
}, async ({ step, event }): Promise<IngestResult> => {

    const { articleId, articleUrl } = event.data;
    if (!(articleId && articleUrl)) return { status: "error", reason: "article id and article url required to proceed" };

    //? step 1: fetch article content 
    const response = await step.fetch(articleUrl, {
        redirect: "follow"
    });

    //* if error on fetch article
    if (!response.ok) {
        return {
            status: "error",
            reason: `Failed to fetch article: ${response.status} ${response.statusText}`,
            error: response
        };
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
        await step.run("mark-failed-extract", async () => {
            await db.update(article).set({ status: "failed" }).where(eq(article.id, articleId));
        });
        return { status: "error", reason: "article extraction failed!" };
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
    })

    // if (!processed) {
    //     await step.run("mark-failed-convert", async () => {
    //         await db.update(article).set({ status: "failed" }).where(eq(article.id, articleId));
    //     });
    //     return { error: "article processing failed!" };
    // }

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

})
