"use server";

//? explore topics with article counts from the database

import { articleCategories } from "@/config/category";
import { AppResponse } from "@/lib/types";
import { FeedArticle } from "@/features/feed/feed.types";
import { db } from "@/db";
import { article, articleCategory, articleMetaData, category, source } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import type { ExploreCategory } from "./explore.types";

const categoryLabelMap: Record<string, string> = Object.fromEntries(
  articleCategories.map((item) => [item.value, item.label]),
);

export const getExploreCategories = async (): Promise<AppResponse<ExploreCategory[]>> => {
  try {
    const rows = await db
      .select({
        slug: category.slug,
        name: category.name,
        count: sql<number>`count(${articleCategory.articleId})`,
      })
      .from(category)
      .leftJoin(articleCategory, eq(articleCategory.categoryId, category.id))
      .groupBy(category.id, category.slug, category.name)
      .orderBy(category.name);

    const data = rows.map((row) => ({
      ...row,
      label: categoryLabelMap[row.slug] ?? row.name,
    }));

    return { success: true, data };

  } catch (error) {
    console.error("Error fetching explore categories:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch categories",
    };
  }
};

//* full-text search over articles (title, summary, author, source) from the database
export const searchArticles = async (
  query: string,
): Promise<AppResponse<FeedArticle[]>> => {
  try {
    const trimmed = (query ?? "").trim();

    if (!trimmed || trimmed.length < 2) {
      return { success: true, data: [] };
    }

    const searchQuery = sql`plainto_tsquery('english', ${trimmed})`;
    const searchVector = sql`to_tsvector('english', ${article.title} || ' ' || COALESCE(${articleMetaData.summary}, '') || ' ' || ${article.author} || ' ' || ${source.title})`;
    const rank = sql`ts_rank(${searchVector}, ${searchQuery})`;

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
      .where(sql`${searchVector} @@ ${searchQuery}`)
      .orderBy(sql`${rank} desc`, sql`${article.publicAt} desc`)
      .limit(30);

    return { success: true, data };

  } catch (error) {
    console.error("Error searching articles:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to search",
    };
  }
};