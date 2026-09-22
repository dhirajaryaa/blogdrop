"use server";

//? sources listed from the database with article counts

import { AppResponse } from "@/lib/types";
import { db } from "@/db";
import { article, articleMetaData, source } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import type { SourceDetail, SourceItem } from "./sources.types";

export const getSources = async (): Promise<AppResponse<SourceItem[]>> => {
  try {
    const rows = await db
      .select({
        id: source.id,
        title: source.title,
        siteUrl: source.siteUrl,
        isActive: source.isActive,
        articleCount: sql<number>`count(${article.id})`,
      })
      .from(source)
      .leftJoin(article, eq(article.sourceId, source.id))
      .groupBy(source.id, source.title, source.siteUrl, source.isActive)
      .orderBy(sql`count(${article.id}) desc`);

    return { success: true, data: rows };

  } catch (error) {
    console.error("Error fetching sources:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch sources",
    };
  }
};

export const getSourceArticles = async (
  sourceId: string,
): Promise<AppResponse<SourceDetail>> => {
  try {
    if (!sourceId) {
      return { success: false, reason: "Invalid source" };
    }

    const [sourceInfo] = await db
      .select({
        id: source.id,
        title: source.title,
        siteUrl: source.siteUrl,
        isActive: source.isActive,
        articleCount: sql<number>`count(${article.id})`,
      })
      .from(source)
      .leftJoin(article, eq(article.sourceId, source.id))
      .where(eq(source.id, sourceId))
      .groupBy(source.id, source.title, source.siteUrl, source.isActive)
      .limit(1);

    if (!sourceInfo) {
      return { success: false, reason: "Source not found" };
    }

    const articles = await db
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
      .where(eq(article.sourceId, sourceId))
      .orderBy(sql`${article.publicAt} desc`);

    return { success: true, data: { source: sourceInfo, articles } };

  } catch (error) {
    console.error("Error fetching source articles:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch source articles",
    };
  }
};