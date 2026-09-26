"use server";

//? lightweight article index for client-side site search (fuse.js)

import { AppResponse } from "@/lib/types";
import { db } from "@/db";
import { article, source } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export type SearchIndexArticle = {
  title: string;
  slug: string;
  sourceName: string;
};

export const getSearchIndexArticles = async (): Promise<
  AppResponse<SearchIndexArticle[]>
> => {
  try {
    const rows = await db
      .select({
        title: article.title,
        slug: article.slug,
        sourceName: source.title,
      })
      .from(article)
      .innerJoin(source, eq(article.sourceId, source.id))
      .where(eq(article.status, "done"))
      .orderBy(sql`${article.publicAt} desc`)
      .limit(1000);

    return { success: true, data: rows };

  } catch (error) {
    console.error("Error building search index:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to load search index",
    };
  }
};