"use server";

//? saved articles for a logged in user (bookmarks)

import { AppResponse } from "@/lib/types";
import { FeedArticle } from "@/features/feed/feed.types";
import { db } from "@/db";
import { article, articleMetaData, bookmark, source } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "@/features/auth/auth.actions";

export const getSavedArticles = async (): Promise<
  AppResponse<FeedArticle[]>
> => {
  try {
    const authUser = await getCurrentUser();

    if (!authUser) {
      return {
        success: false,
        reason: "Login required to view saved articles",
      };
    }

    const data = await db
      .select({
        id: article.id,
        slug: article.slug,
        title: article.title,
        author: article.author,
        originalUrl: article.originalUrl,
        publishDate: article.publicAt,
        sourceName: source.title,
        sourceUrl: source.siteUrl,
        summary: articleMetaData.summary,
        difficulty: articleMetaData.difficulty,
        readingTime: articleMetaData.readingTime ?? 0,
      })
      .from(bookmark)
      .innerJoin(article, eq(bookmark.articleId, article.id))
      .innerJoin(source, eq(article.sourceId, source.id))
      .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
      .where(and(eq(bookmark.userId, authUser.id), eq(article.status, "done")))
      .orderBy(bookmark.createdAt);

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching saved articles:", error);
    return {
      success: false,
      reason:
        error instanceof Error
          ? error.message
          : "Failed to fetch saved articles",
    };
  }
};

//* save / remove article, returns the new saved state
export const toggleSaveArticle = async (
  articleId: string,
): Promise<AppResponse<boolean>> => {
  try {
    if (!articleId) {
      return { success: false, reason: "Invalid article" };
    }

    const authUser = await getCurrentUser();

    if (!authUser) {
      return { success: false, reason: "Login required to save articles" };
    }

    const result = await db.transaction(async (tx) => {
      const [existing] = await tx
        .select({ id: bookmark.id })
        .from(bookmark)
        .where(
          and(
            eq(bookmark.articleId, articleId),
            eq(bookmark.userId, authUser.id),
          ),
        )
        .for("update")
        .limit(1);

      if (existing) {
        await tx.delete(bookmark).where(eq(bookmark.id, existing.id));
        return { saved: false };
      }

      const [readableArticle] = await tx
        .select({ id: article.id })
        .from(article)
        .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
        .where(and(eq(article.id, articleId), eq(article.status, "done")))
        .limit(1);

      if (!readableArticle) {
        return { saved: false, reason: "Article is not available" };
      }

      await tx
        .insert(bookmark)
        .values({ articleId, userId: authUser.id })
        .onConflictDoNothing({
          target: [bookmark.articleId, bookmark.userId],
        });

      return { saved: true };
    });

    if (result.reason) {
      return { success: false, reason: result.reason };
    }

    return { success: true, data: result.saved };
  } catch (error) {
    console.error("Error toggling saved article:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to save article",
    };
  }
};
