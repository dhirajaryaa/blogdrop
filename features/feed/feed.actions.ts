"use server";

//? public feed data [latest with randomness];

import { AppResponse } from "@/lib/types";
import { FeedArticle, FeedInputProps } from "./feed.types";
import { db } from "@/db";
import { article, articleMetaData, source } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const getPublicFeed = async ({
  limit = 20,
  offset = 0,
}: FeedInputProps): Promise<AppResponse<FeedArticle[]>> => {
  try {
    if (!Number(limit) && !Number(offset)) {
      return {
        success: false,
        reason: "Invalid input: limit and offset must be valid numbers",
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
      .orderBy(sql`RANDOM()`) //for random order 
      .offset(offset)
      .limit(limit);

      return { success: true, data };
      
  } catch (error) {
    console.error("Error fetching public feed:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch feed",
    };
  }
};

//? personalized user data based feed data
