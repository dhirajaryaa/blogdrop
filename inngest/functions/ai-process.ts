import { db } from "@/db";
import {
  inngest,
  IngestResult,
} from "@/inngest/client";
import {
  article,
  articleMetaData,
  aiUsage,
  tag,
  category,
  articleTag,
  articleCategory,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { calculateReadingTime } from "@/features/harvester/reading-time";
import { llmGeneration } from "@/features/ai";
import { categoriesMapping, tagsMapping } from "@/features/harvester/tag-mapping";
import { userTags as userInterests } from "@/config/tags";
import { articleCategories } from "@/config/category";

export const articleAIProcessing = inngest.createFunction(
  {
    id: "ai-article-processing",
    concurrency: 5,
    retries: 3,
    throttle: { limit: 5, period: "1m" },
    triggers: [{ event: "article/ai-processing" }],
  },
  async ({ step, event }): Promise<IngestResult> => {
    const articleId = event.data.articleId as string;

    // Helper: terminal-status guard so row never lingers as "processing"
    const markFailed = (reason: string) =>
      step
        .run("mark-ai-failed", async () => {
          await db
            .update(article)
            .set({ status: "failed" })
            .where(eq(article.id, articleId));
        })
        .then(() => ({ status: "error" as const, reason }));

    // Step 1: select article from db
    const [sourceArticle] = await db
      .select()
      .from(article)
      .where(and(eq(article.id, articleId), eq(article.status, "processing")));

    if (!sourceArticle) {
      return {
        status: "error",
        reason: "article not found or not in processing state",
      };
    }

    const rawContent = sourceArticle.content ?? "";

    if (!rawContent.trim()) {
      return await markFailed("article content is empty");
    }

    const content =
      rawContent.length > 4500
        ? [rawContent.slice(0, 3000), "...", rawContent.slice(-1500)].join("\n")
        : rawContent;

    // Step 2: LLM metadata generation
    let llmOutput: Awaited<ReturnType<typeof llmGeneration>>;
    try {
      llmOutput = await step.run("article-metadata-generation", async () => {
        return await llmGeneration(content);
      });
    } catch (err) {
      return await markFailed(
        `LLM call threw: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    if (!llmOutput.success) {
      return await markFailed(llmOutput.error ?? "AI metadata generation failed");
    }

    // Step 2.5: Count the AI call.
    //* done as its own step, right after the LLM call and outside the save
    //* transaction, so a later write failure can never roll the credit back.
    //* upsert (not plain update) so it counts even when the dispatcher
    //* never created today's row.
    const today = new Date().toISOString().slice(0, 10);

    await step.run("increment-ai-credit", async () => {
      await db
        .insert(aiUsage)
        .values({ day: today, used: 1, apiId: 1 })
        .onConflictDoUpdate({
          target: aiUsage.day,
          set: { used: sql`${aiUsage.used} + 1` },
        });
    });

    // Promotional article - remove
    if (llmOutput.data.isPromotional) {
      await step.run("remove-promotion", async () => {
        await db.delete(article).where(eq(article.id, sourceArticle.id));
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

    // Step 3: Map to canonical tags/categories
    const canonicalCategories = categoriesMapping(categories);
    const canonicalTags = tagsMapping(tags);

    const readingTime = calculateReadingTime(sourceArticle.content ?? "");

    // Step 4: Save in transaction
    await step.run("save-metadata-and-tags-update", async () => {
      return await db.transaction(async (tx) => {
        // Save metadata
        await tx
          .insert(articleMetaData)
          .values({
            articleId: sourceArticle.id,
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

        // Save tags
        const selectedTags = userInterests.filter((interest) =>
          canonicalTags.includes(interest.value),
        );

        if (selectedTags.length > 0) {
          const savedTags = await tx
            .insert(tag)
            .values(
              selectedTags.map((t) => ({
                name: t.label,
                slug: t.value,
              })),
            )
            .onConflictDoUpdate({
              target: tag.slug,
              set: {
                name: sql`excluded.name`,
              },
            })
            .returning({ tagId: tag.id });

          if (savedTags.length > 0) {
            await tx
              .insert(articleTag)
              .values(
                savedTags.map(({ tagId }) => ({
                  articleId: sourceArticle.id,
                  tagId,
                })),
              )
              .onConflictDoNothing();
          }
        }

        // Save categories
        const selectedCategories = articleCategories.filter((cat) =>
          canonicalCategories.includes(cat.value),
        );

        if (selectedCategories.length > 0) {
          const savedCategories = await tx
            .insert(category)
            .values(
              selectedCategories.map((cat) => ({
                name: cat.label,
                slug: cat.value,
              })),
            )
            .onConflictDoUpdate({
              target: category.slug,
              set: {
                name: sql`excluded.name`,
              },
            })
            .returning({ categoryId: category.id });

          if (savedCategories.length > 0) {
            await tx
              .insert(articleCategory)
              .values(
                savedCategories.map(({ categoryId }) => ({
                  articleId: sourceArticle.id,
                  categoryId,
                })),
              )
              .onConflictDoNothing();
          }
        }

        // Update article status
        await tx
          .update(article)
          .set({
            author: sourceArticle.author || author,
            status: "done",
          })
          .where(eq(article.id, sourceArticle.id));

        return { saved: true };
      });
    });

    // Trigger next batch
    await step.sendEvent("article-batch-dispatcher", {
      name: "app/ArticleBatchDispatcher",
      data: {},
    });

    return { status: "success", data: llmOutput };
  },
);
