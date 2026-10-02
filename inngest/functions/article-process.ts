import { db } from "@/db";
import { article } from "@/db/schema";
import { IngestResult, inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";
import { fetchAndExtractArticle, PermanentArticleError } from "@/features/harvester/process-article";

export const articleProcessing = inngest.createFunction(
  {
    id: "article-processing",
    description: "Fetch, extract, clean article and convert to markdown, then dispatch AI processing.",
    retries: 3,
    concurrency: 5,
    triggers: [{ event: "app/ArticleProcessing" }],
  },
  async ({ step, event }): Promise<IngestResult> => {
    const { articleId, articleUrl } = event.data as {
      articleId: string;
      articleUrl: string;
    };

    if (!(articleId && articleUrl)) {
      return {
        status: "error",
        reason: "article id and article url required to proceed",
      };
    }

    const markFailed = (reason: string) =>
      step
        .run("mark-failed", async () => {
          await db
            .update(article)
            .set({ status: "failed" })
            .where(eq(article.id, articleId));
        })
        .then(() => ({ status: "error" as const, reason }));

    try {
      // Step 1: Fetch and extract article content
      const extracted = await step.run("fetch-and-extract", async () => {
        return await fetchAndExtractArticle(articleUrl);
      });

      // Step 2: Save cleaned content, author, image to DB
      const processed = await step.run("save-cleaned-content", async () => {
        const [updated] = await db
          .update(article)
          .set({
            content: extracted.markdown,
            author: extracted.author ?? undefined,
            imageUrl: extracted.imageUrl ?? undefined,
          })
          .where(eq(article.id, articleId))
          .returning({ id: article.id });

        return updated;
      });

      if (!processed) {
        return await markFailed("article update returned no row (missing id)");
      }

      // Step 3: Trigger AI processing
      await step.sendEvent("ai-article-processing", {
        name: "article/ai-processing",
        data: {
          articleId: processed.id,
        },
      });

      return { status: "success" };
    } catch (err) {
      if (err instanceof PermanentArticleError) {
        return await markFailed(err.message);
      }
      return await markFailed(
        `unexpected error: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  },
);
