"use server";

//? explore topics with article counts from the database

import { articleCategories } from "@/config/category";
import { AppResponse } from "@/lib/types";
import { db } from "@/db";
import { articleCategory, category } from "@/db/schema";
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