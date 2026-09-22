"use server";

//? public feed data [latest with randomness];

import { AppResponse } from "@/lib/types";
import { FeedArticle, FeedInputProps } from "./feed.types";
import { db } from "@/db";
import { article, articleMetaData, articleCategory, category, source } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const getPublicFeed = async ({
  limit = 20,
  offset = 0,
  category: categorySlug,
}: FeedInputProps): Promise<AppResponse<FeedArticle[]>> => {
  try {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);

    if (
      !Number.isInteger(parsedLimit) ||
      !Number.isInteger(parsedOffset) ||
      parsedLimit <= 0 ||
      parsedOffset < 0
    ) {
      return {
        success: false,
        reason: "Invalid input: limit must be positive and offset non-negative",
      };
    }

    const base = db
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
      .from(article)
      .innerJoin(source, eq(article.sourceId, source.id))
      .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id));

    const query = categorySlug
      ? base
          .innerJoin(articleCategory, eq(articleCategory.articleId, article.id))
          .innerJoin(category, eq(articleCategory.categoryId, category.id))
          .where(eq(category.slug, categorySlug))
      : base;

    const data = await query
      .orderBy(sql`${article.publicAt} desc`, sql`${article.createdAt} desc`)
      .offset(parsedOffset)
      .limit(parsedLimit);

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching public feed:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch feed",
    };
  }
};

//? latest articles ordered by publish date
export const getLatestFeed = async ({
  limit = 30,
  offset = 0,
}: FeedInputProps): Promise<AppResponse<FeedArticle[]>> => {
  try {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);

    if (
      !Number.isInteger(parsedLimit) ||
      !Number.isInteger(parsedOffset) ||
      parsedLimit <= 0 ||
      parsedOffset < 0
    ) {
      return {
        success: false,
        reason: "Invalid input: limit must be positive and offset non-negative",
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
      .from(article)
      .innerJoin(source, eq(article.sourceId, source.id))
      .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
      .orderBy(sql`${article.publicAt} desc`, sql`${article.createdAt} desc`)
      .offset(parsedOffset)
      .limit(parsedLimit);

    return { success: true, data };

  } catch (error) {
    console.error("Error fetching latest feed:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch latest feed",
    };
  }
};

//? personalized user data based feed data
