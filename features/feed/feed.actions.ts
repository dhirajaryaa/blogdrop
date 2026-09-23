"use server";


import { AppResponse } from "@/lib/types";
import { FeedArticle, FeedInputProps } from "./feed.types";
import { db } from "@/db";
import { article, articleMetaData, articleCategory, articleTag, category, source, tag, userCategory, userTag } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/features/auth/auth.actions";

type FeedPoolArticle = FeedArticle & {
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
};

//? deterministic pseudo-random in [0,1) so ranking stays stable across
//? paginated requests on the same day but gets reshuffled daily
const dayJitter = (key: string): number => {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
};

const CATEGORY_WEIGHT = 3;
const TAG_WEIGHT = 5;
const POOL_LIMIT = 500;

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

//? personalized feed for the logged-in user; falls back to public feed
export const getUserFeed = async ({
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

    //* if the reader is logged out, serve the public feed
    const authUser = await getCurrentUser();
    if (!authUser) {
      return getPublicFeed({ limit: parsedLimit, offset: parsedOffset, category: categorySlug });
    }

    //* reader's interests
    const [catRows, tagRows] = await Promise.all([
      db
        .select({ slug: category.slug })
        .from(userCategory)
        .innerJoin(category, eq(userCategory.categoryId, category.id))
        .where(eq(userCategory.userId, authUser.id)),
      db
        .select({ name: userTag.name })
        .from(userTag)
        .where(eq(userTag.userId, authUser.id)),
    ]);

    const userCategorySlugs = new Set(catRows.map((r) => r.slug));
    const userTagNames = new Set(tagRows.map((r) => r.name.toLowerCase()));

    //* no interests configured -> behave like the public feed
    if (userCategorySlugs.size === 0 && userTagNames.size === 0) {
      return getPublicFeed({ limit: parsedLimit, offset: parsedOffset, category: categorySlug });
    }

    //* pool of recent done articles, with their categories/tags attached
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
        categories: sql<{ name: string; slug: string }[]>`
          COALESCE(
            (
              SELECT json_agg(
                json_build_object('name', ${category.name}, 'slug', ${category.slug})
              )
              FROM ${articleCategory}
              INNER JOIN ${category} ON ${category.id} = ${articleCategory.categoryId}
              WHERE ${articleCategory.articleId} = ${article.id}
            ),
            '[]'::json
          )
        `,
        tags: sql<{ name: string; slug: string }[]>`
          COALESCE(
            (
              SELECT json_agg(
                json_build_object('name', ${tag.name}, 'slug', ${tag.slug})
              )
              FROM ${articleTag}
              INNER JOIN ${tag} ON ${tag.id} = ${articleTag.tagId}
              WHERE ${articleTag.articleId} = ${article.id}
            ),
            '[]'::json
          )
        `,
      })
      .from(article)
      .innerJoin(source, eq(article.sourceId, source.id))
      .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id));

    const query = categorySlug
      ? base
          .innerJoin(articleCategory, eq(articleCategory.articleId, article.id))
          .innerJoin(category, eq(articleCategory.categoryId, category.id))
          .where(and(eq(article.status, "done"), eq(category.slug, categorySlug)))
      : base.where(eq(article.status, "done"));

    const pool = (await query.orderBy(sql`${article.publicAt} desc`).limit(POOL_LIMIT)) as unknown as FeedPoolArticle[];

    //* rank by relevance to the reader, recency, + daily-shuffled randomness
    const daySeed = new Date().toISOString().slice(0, 10);
    const now = Date.now();

    const scored = pool
      .map((item) => {
        const catMatches =
          (item.categories?.filter((c) => userCategorySlugs.has(c.slug)).length ?? 0) *
          CATEGORY_WEIGHT;
        const tagMatches =
          (item.tags?.filter((t) => userTagNames.has(t.name.toLowerCase())).length ?? 0) *
          TAG_WEIGHT;
        const relevance = catMatches + tagMatches;

        const ts = Date.parse(item.publishDate);
        const daysAgo = Number.isNaN(ts) ? 9999 : Math.max(0, (now - ts) / 86_400_000);
        const recency = 1 / (1 + daysAgo);

        const score = relevance * 1_000_000 + recency * 1_000 + dayJitter(`${item.id}-${daySeed}`);
        return { item, score };
      })
      .sort((a, b) => b.score - a.score);

    const data = scored
      .slice(parsedOffset, parsedOffset + parsedLimit)
      .map(({ item }) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        author: item.author,
        originalUrl: item.originalUrl,
        publishDate: item.publishDate,
        sourceName: item.sourceName,
        sourceUrl: item.sourceUrl,
        summary: item.summary,
        difficulty: item.difficulty,
        readingTime: item.readingTime,
      }));

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching personalized feed:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch feed",
    };
  }
};

//? personalized user data based feed data
