import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { article } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { extractArticleContent } from "@/features/harvester/extract-article";
import { convertHtmlToMarkdown } from "@/features/harvester/html-markdown";

export const FETCH_TIMEOUT_MS = 15_000;
export const PROCESSING_LEASE_MS = 15 * 60 * 1000;

export const USER_AGENT =
  "BlogdropBot/1.0 (+https://blogdrop.in; contact@blogdrop.in)";

const processingLeaseExpiry = () => new Date(Date.now() + PROCESSING_LEASE_MS);

export const articleProcessing = inngest.createFunction(
  {
    id: "article-processing",
    concurrency: 5,
    retries: 3,
    idempotency: "event.data.articleId + ':' + event.data.batchId",
    triggers: { event: "app/ArticleProcessing" },
    onFailure: async ({ event, error, step }) => {
      const sourceEvent = event.data.event;
      const articleId = sourceEvent?.data?.articleId;
      const batchId = sourceEvent?.data?.batchId;
      console.error(`Article processing failed for ${articleId}:`, error);

      if (!articleId || !batchId) return;

      await step.run("mark-article-processing-failed", async () => {
        await db
          .update(article)
          .set({
            status: "failed",
            processingBatchId: null,
            processingLeaseExpiresAt: null,
          })
          .where(
            and(
              eq(article.id, articleId),
              eq(article.status, "processing"),
              eq(article.processingBatchId, batchId),
            ),
          );
      });

      await step.sendEvent("article-batch-dispatcher-after-failure", {
        name: "app/ArticleBatchDispatcher",
        data: {},
      });
    },
  },
  async ({ step, event }): Promise<IngestResult> => {
    const { articleId, articleUrl, batchId } = event.data;
    if (!articleId || !articleUrl || !batchId) {
      return {
        status: "error",
        reason: "article id, article url, and batch id are required",
      };
    }

    const claimedArticle = await step.run(
      "claim-article-processing",
      async () => {
        const [claimed] = await db
          .update(article)
          .set({ processingLeaseExpiresAt: processingLeaseExpiry() })
          .where(
            and(
              eq(article.id, articleId),
              eq(article.status, "processing"),
              eq(article.processingBatchId, batchId),
            ),
          )
          .returning({ id: article.id });

        return claimed;
      },
    );

    if (!claimedArticle) {
      return {
        status: "error",
        reason: "article not found or processing ownership was lost",
      };
    }

    try {
      const response = await step.fetch(articleUrl, {
        redirect: "follow",
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml",
        },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch article: ${response.status} ${response.statusText}`,
        );
      }

      const articleData = await step.run("extract-text", async () => {
        const text = await response.text();

        return extractArticleContent({
          url: articleUrl,
          html: text,
        });
      });

      if (!articleData) {
        throw new Error("Article extraction failed");
      }

      const processed = await step.run("convert-html-to-markdown", async () => {
        const data = await convertHtmlToMarkdown(articleData.content);

        const [updated] = await db
          .update(article)
          .set({
            content: data?.markdown ?? articleData.textContent,
            author: articleData.byline ?? data?.author,
            imageUrl: articleData.image ?? undefined,
            processingLeaseExpiresAt: processingLeaseExpiry(),
          })
          .where(
            and(
              eq(article.id, articleId),
              eq(article.status, "processing"),
              eq(article.processingBatchId, batchId),
            ),
          )
          .returning({ id: article.id });

        return updated;
      });

      if (!processed) {
        throw new Error("Article processing ownership was lost");
      }

      await step.sendEvent("ai-article-processing", {
        name: "article/ai-processing",
        data: {
          articleId: processed.id,
          batchId,
        },
      });

      return { status: "success" };
    } catch (error) {
      console.error(
        `Article processing attempt failed for ${articleId}:`,
        error,
      );
      throw error;
    }
  },
);
