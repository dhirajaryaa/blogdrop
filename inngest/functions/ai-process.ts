import { db } from "@/db";
import { inngest, IngestResult } from "../client";
import {
  article,
  articleCategory,
  articleMetaData,
  articleTag,
  category,
  tag,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { calculateReadingTime } from "@/features/harvester/reading-time";
import { llmGeneration } from "@/features/ai/";
import {
  categoriesMapping,
  tagsMapping,
} from "@/features/harvester/tag-mapping";
import { userTags } from "@/config/tags";
import { articleCategories } from "@/config/category";

const PROCESSING_LEASE_MS = 15 * 60 * 1000;
const processingLeaseExpiry = () => new Date(Date.now() + PROCESSING_LEASE_MS);

export const articleAIProcessing = inngest.createFunction(
  {
    id: "ai-article-processing",
    concurrency: 5,
    retries: 3,
    idempotency: "event.data.articleId + ':' + event.data.batchId",
    throttle: { limit: 5, period: "1m" },
    triggers: { event: "article/ai-processing" },
    onFailure: async ({ event, error, step }) => {
      const sourceEvent = event.data.event;
      const articleId = sourceEvent?.data?.articleId;
      const batchId = sourceEvent?.data?.batchId;
      console.error(`AI processing failed for ${articleId}:`, error);

      if (!articleId || !batchId) return;

      await step.run("mark-ai-processing-failed", async () => {
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

      await step.sendEvent("article-batch-dispatcher-after-ai-failure", {
        name: "app/ArticleBatchDispatcher",
        data: {},
      });
    },
  },
  async ({ step, event }): Promise<IngestResult> => {
    const { articleId, batchId } = event.data;
    if (!articleId || !batchId) {
      return {
        status: "error",
        reason: "article id and batch id are required",
      };
    }

    try {
      const claimedArticle = await step.run("claim-ai-processing", async () => {
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
      });

      if (!claimedArticle) {
        return {
          status: "error",
          reason: "article not found or processing ownership was lost",
        };
      }

      const [sourceArticle] = await db
        .select()
        .from(article)
        .where(
          and(
            eq(article.id, articleId),
            eq(article.status, "processing"),
            eq(article.processingBatchId, batchId),
          ),
        );

      if (!sourceArticle) {
        return {
          status: "error",
          reason: "article not found or processing ownership was lost",
        };
      }

      const rawContent = sourceArticle.content ?? "";
      if (!rawContent.trim()) {
        throw new Error("Article content is empty");
      }

      const content =
        rawContent.length > 4500
          ? [rawContent.slice(0, 3000), "...", rawContent.slice(-1500)].join(
              "\n",
            )
          : rawContent;

      const llmOutput = await step.run(
        "article-metadata-generation",
        async () => llmGeneration(content),
      );

      if (!llmOutput.success) {
        throw new Error(llmOutput.error ?? "AI metadata generation failed");
      }

      if (llmOutput.data.isPromotional) {
        const deleted = await step.run("remove-promotion", async () => {
          const [removedArticle] = await db
            .delete(article)
            .where(
              and(
                eq(article.id, articleId),
                eq(article.status, "processing"),
                eq(article.processingBatchId, batchId),
              ),
            )
            .returning({ id: article.id });
          return removedArticle;
        });

        if (!deleted) {
          throw new Error("Article processing ownership was lost");
        }

        await step.sendEvent("article-batch-dispatcher", {
          name: "app/ArticleBatchDispatcher",
          data: {},
        });

        return {
          status: "success",
          data: "Article removed (promotional)",
        };
      }

      const {
        categories,
        difficulty,
        keyTakeaways,
        summary,
        tags,
        whyRead,
        author,
      } = llmOutput.data;
      const canonicalCategories = categoriesMapping(categories);
      const canonicalTags = tagsMapping(tags);
      const readingTime = calculateReadingTime(rawContent);

      const saved = await step.run("save-metadata-and-tags-update", async () =>
        db.transaction(async (tx) => {
          await tx
            .insert(articleMetaData)
            .values({
              articleId,
              readingTime,
              difficulty,
              keyTakeaways,
              summary,
              whyRead,
            })
            .onConflictDoUpdate({
              target: articleMetaData.articleId,
              set: {
                readingTime,
                difficulty,
                keyTakeaways,
                summary,
                whyRead,
              },
            });

          const selectedTags = userTags.filter((interest) =>
            canonicalTags.includes(interest.value),
          );
          if (selectedTags.length > 0) {
            const savedTags = await tx
              .insert(tag)
              .values(
                selectedTags.map((selectedTag) => ({
                  name: selectedTag.label,
                  slug: selectedTag.value,
                })),
              )
              .onConflictDoUpdate({
                target: tag.slug,
                set: { name: sql`excluded.name` },
              })
              .returning({ tagId: tag.id });

            if (savedTags.length > 0) {
              await tx
                .insert(articleTag)
                .values(savedTags.map(({ tagId }) => ({ articleId, tagId })))
                .onConflictDoNothing();
            }
          }

          const selectedCategories = articleCategories.filter(
            (selectedCategory) =>
              canonicalCategories.includes(selectedCategory.value),
          );
          if (selectedCategories.length > 0) {
            const savedCategories = await tx
              .insert(category)
              .values(
                selectedCategories.map((selectedCategory) => ({
                  name: selectedCategory.label,
                  slug: selectedCategory.value,
                })),
              )
              .onConflictDoUpdate({
                target: category.slug,
                set: { name: sql`excluded.name` },
              })
              .returning({ categoryId: category.id });

            if (savedCategories.length > 0) {
              await tx
                .insert(articleCategory)
                .values(
                  savedCategories.map(({ categoryId }) => ({
                    articleId,
                    categoryId,
                  })),
                )
                .onConflictDoNothing();
            }
          }

          const [updatedArticle] = await tx
            .update(article)
            .set({
              author: sourceArticle.author || author,
              status: "done",
              processingBatchId: null,
              processingLeaseExpiresAt: null,
            })
            .where(
              and(
                eq(article.id, articleId),
                eq(article.status, "processing"),
                eq(article.processingBatchId, batchId),
              ),
            )
            .returning({ id: article.id });

          if (!updatedArticle) {
            throw new Error("Article processing ownership was lost");
          }

          return updatedArticle;
        }),
      );

      await step.sendEvent("article-batch-dispatcher", {
        name: "app/ArticleBatchDispatcher",
        data: {},
      });

      return { status: "success", data: saved };
    } catch (error) {
      console.error(`AI processing attempt failed for ${articleId}:`, error);
      throw error;
    }
  },
);
