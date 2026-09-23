"use server";

//? saved articles for a logged in user (bookmarks)

import { AppResponse } from "@/lib/types";
import { FeedArticle } from "@/features/feed/feed.types";
import { db } from "@/db";
import { article, articleMetaData, bookmark, source } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "@/features/auth/auth.actions";

export const getSavedArticles = async (): Promise<AppResponse<FeedArticle[]>> => {
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
      .where(eq(bookmark.userId, authUser.id))
      .orderBy(bookmark.createdAt);

    return { success: true, data };

  } catch (error) {
    console.error("Error fetching saved articles:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch saved articles",
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
    };


    const saved = await db.transaction(async (tx) => {


      const [existing] = await tx
        .select({ id: bookmark.id })
        .from(bookmark)
        .where(
          and(eq(bookmark.articleId, articleId), eq(bookmark.userId, authUser.id)),
        )
        .for("update")
        .limit(1);

      if (existing) {
        await tx.delete(bookmark).where(eq(bookmark.id, existing.id));
        return false;
      };

      await tx
        .insert(bookmark)
        .values({ articleId, userId: authUser.id })
        .onConflictDoNothing({
          target: [bookmark.articleId, bookmark.userId]
        });

      return true;
    })

    return { success: true, data: saved };

  } catch (error) {
    console.error("Error toggling saved article:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to save article",
    };
  }
};