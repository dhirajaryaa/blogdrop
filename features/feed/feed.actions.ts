"use server";

//? Suggested indexes to support these queries (NOT applied automatically):
//? - article (status, public_at DESC)     -- both feeds: WHERE status='done' ORDER BY public_at DESC
//? - article_category (article_id)        -- correlated COUNT over article_category by article_id
//?   (already covered by the composite PK (article_id, category_id))
//? - article_tag (article_id)             -- correlated COUNT over article_tag by article_id
//?   (already covered by the composite PK (article_id, tag_id))
//? - read_history (user_id)               -- personalized exclusion filter (created in migration 0014)
//? - category (slug)                      -- already unique-constrained on category.slug
//? - tag (lower(name))                    -- functional index; matching uses LOWER(tag.name)

import { AppResponse } from "@/lib/types";
import { FeedArticle, FeedInputProps } from "./feed.types";
import { db } from "@/db";
import {
  article,
  articleMetaData,
  articleCategory,
  articleTag,
  category,
  readHistory,
  source,
  tag,
  userCategory,
  userTag,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/features/auth/auth.actions";
import { unstable_cache } from "next/cache";

type FeedPoolArticle = FeedArticle & {
  categoryCount: number;
  tagCount: number;
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

//? WHY weighted like this: the only real personalization signal we have is the
//? reader's chosen interests, so a category/tag match must outrank everything
//? else. Recency only reorders articles within the same interest tier (so the
//? feed still looks fresh), and jitter is a tiny deterministic tie-breaker so a
//? given day's order isn't identical to yesterday's. Each layer is an order of
//? magnitude below the one above it, which keeps the score easy to reason about.
const CATEGORY_WEIGHT = 3;
const TAG_WEIGHT = 5;
const INTEREST_SCALE = 1_000;
const RECENCY_SCALE = 100;
const POOL_LIMIT = 500;

//? the ranked order for a given (user, category, day) is deterministic
//? (jitter only changes daily), so the pool fetch + scoring can be cached for a
//? few hours. infinite-scroll pagination requests then reuse the same ranked
//? pool instead of re-fetching and re-sorting 500 rows on every call.
const RANK_CACHE_REVALIDATE = 60 * 60 * 4; // 4 hours

//? fetch the recent pool once per (user, category, day) and rank it in one place
const getRankedPool = unstable_cache(
  async (
    userId: string,
    categorySlug: string | null,
    daySeed: string,
  ): Promise<FeedPoolArticle[]> => {
    //* reader's interests
    const [catRows, tagRows] = await Promise.all([
      db
        .select({ slug: category.slug })
        .from(userCategory)
        .innerJoin(category, eq(userCategory.categoryId, category.id))
        .where(eq(userCategory.userId, userId)),
      db
        .select({ name: userTag.name })
        .from(userTag)
        .where(eq(userTag.userId, userId)),
    ]);

    const userCategorySlugs = new Set(catRows.map((r) => r.slug));
    const userTagNames = new Set(tagRows.map((r) => r.name.toLowerCase()));

    if (userCategorySlugs.size === 0 && userTagNames.size === 0) {
      return [];
    }

    //? parameterized IN (...) value list
    const inList = (values: string[]) =>
      sql`(${sql.join(
        values.map((v) => sql`${v}`),
        sql`, `,
      )})`;

    const categorySlugs = [...userCategorySlugs];
    const tagNames = [...userTagNames];

    //? count the reader's interest matches in SQL instead of shipping every
    //? article's categories/tags up and filtering them in JS
    const categoryCountSql =
      categorySlugs.length > 0
        ? sql<number>`
          (
            SELECT COUNT(*)
            FROM ${articleCategory}
            INNER JOIN ${category} ON ${category.id} = ${articleCategory.categoryId}
            WHERE ${articleCategory.articleId} = ${article.id}
              AND ${category.slug} IN ${inList(categorySlugs)}
          )
        `
        : sql<number>`0`;

    const tagCountSql =
      tagNames.length > 0
        ? sql<number>`
          (
            SELECT COUNT(*)
            FROM ${articleTag}
            INNER JOIN ${tag} ON ${tag.id} = ${articleTag.tagId}
            WHERE ${articleTag.articleId} = ${article.id}
              AND LOWER(${tag.name}) IN ${inList(tagNames)}
          )
        `
        : sql<number>`0`;

    //? articles the reader already opened never come back in the personalized
    //? feed. a NOT EXISTS filter is cheaper than loading the read ids into JS
    //? and works with the normal pool scan. this is read history, not bookmarks,
    //? so a saved-but-unread article still ranks normally.
    const readExclusion = sql`NOT EXISTS (
      SELECT 1
      FROM ${readHistory}
      WHERE ${readHistory.articleId} = ${article.id}
        AND ${readHistory.userId} = ${userId}
    )`;

    //? category is just a membership check, so EXISTS avoids the join-based
    //? row multiplication that would otherwise duplicate articles
    const categoryFilter = categorySlug
      ? sql`EXISTS (
          SELECT 1
          FROM ${articleCategory}
          INNER JOIN ${category} ON ${category.id} = ${articleCategory.categoryId}
          WHERE ${articleCategory.articleId} = ${article.id}
            AND ${category.slug} = ${categorySlug}
        )`
      : undefined;

    const conditions = [eq(article.status, "done"), readExclusion];
    if (categoryFilter) conditions.push(categoryFilter);

    //* pool of recent done articles, with their interest-match counts attached
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
        readingTime: sql<number>`COALESCE(${articleMetaData.readingTime}, 0)`,
        categoryCount: categoryCountSql,
        tagCount: tagCountSql,
      })
      .from(article)
      .innerJoin(source, eq(article.sourceId, source.id))
      .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id));

    const pool = (await base
      .where(and(...conditions))
      .orderBy(sql`${article.publicAt} desc`)
      .limit(POOL_LIMIT)) as unknown as FeedPoolArticle[];

    //? rank in TS: one pass over the pool, so the weights are easy to see
    const now = Date.now();

    return pool
      .map((item) => {
        const interestPoints =
          (item.categoryCount ?? 0) * CATEGORY_WEIGHT +
          (item.tagCount ?? 0) * TAG_WEIGHT;

        const ts = Date.parse(item.publishDate);
        const daysAgo = Number.isNaN(ts)
          ? 9999
          : Math.max(0, (now - ts) / 86_400_000);
        const recency = 1 / (1 + daysAgo);

        const score =
          interestPoints * INTEREST_SCALE +
          recency * RECENCY_SCALE +
          dayJitter(`${item.id}-${daySeed}`);

        return { item, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  },
  ["personalized-feed-rank"],
  {
    revalidate: RANK_CACHE_REVALIDATE,
    tags: ["personalized-feed-rank"],
  },
);

//? public feed (logged-out mode)
export const getPublicFeed = async ({
  limit = 20,
  offset = 0,
  category: categorySlug,
}: FeedInputProps): Promise<AppResponse<FeedArticle[]>> => {
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
      readingTime: sql<number>`COALESCE(${articleMetaData.readingTime}, 0)`,
    })
    .from(article)
    .innerJoin(source, eq(article.sourceId, source.id))
    .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id));

  //? deterministic daily shuffle happens in TS: the score is applied as a
  //? stable-sort tie-breaker over articles sharing a publish timestamp, so
  //? pagination is stable across pages on the same day without the
  //? md5(concat(id, '-', day)) SQL trick (a parameterized concat that
  //? PostgreSQL can't infer a type for)
  const daySeed = new Date().toISOString().slice(0, 10);

  //? membership check only, so EXISTS instead of a join (no article dupes)
  const categoryCondition = (slug: string) => sql`EXISTS (
      SELECT 1
      FROM ${articleCategory}
      INNER JOIN ${category} ON ${category.id} = ${articleCategory.categoryId}
      WHERE ${articleCategory.articleId} = ${article.id}
        AND ${category.slug} = ${slug}
    )`;

  const run = async (filterByCategory: boolean) => {
    const conditions = [eq(article.status, "done")];
    if (filterByCategory && categorySlug) {
      conditions.push(categoryCondition(categorySlug));
    }

    const rows = await base
      .where(and(...conditions))
      .orderBy(sql`${article.publicAt} desc`, sql`${article.createdAt} desc`)
      .offset(parsedOffset)
      .limit(parsedLimit);

    //? stable sort keeps the SQL order for everything else and only reorders
    //? same-day articles by the deterministic daily jitter
    return [...rows].sort((a, b) =>
      a.publishDate === b.publishDate
        ? dayJitter(`${b.id}-${daySeed}`) - dayJitter(`${a.id}-${daySeed}`)
        : 0,
    );
  };

  try {
    const data = await run(Boolean(categorySlug));
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching public feed:", error);

    //? category filtering is an optional enhancement - fall back to the
    //? unfiltered public feed instead of failing the whole feed
    if (categorySlug) {
      try {
        const data = await run(false);
        return { success: true, data };
      } catch (fallbackError) {
        console.error(
          "Error fetching public feed (without category):",
          fallbackError,
        );
        return {
          success: false,
          reason:
            fallbackError instanceof Error
              ? fallbackError.message
              : "Failed to fetch feed",
        };
      }
    }

    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch feed",
    };
  }
};

//? latest articles ordered by publish date (drives the /latest page)
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
        readingTime: sql<number>`COALESCE(${articleMetaData.readingTime}, 0)`,
      })
      .from(article)
      .innerJoin(source, eq(article.sourceId, source.id))
      .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
      .where(eq(article.status, "done"))
      .orderBy(sql`${article.publicAt} desc`, sql`${article.createdAt} desc`)
      .offset(parsedOffset)
      .limit(parsedLimit);

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching latest feed:", error);
    return {
      success: false,
      reason:
        error instanceof Error ? error.message : "Failed to fetch latest feed",
    };
  }
};

//? personalized feed (logged-in mode)
const getPersonalizedFeed = async ({
  limit,
  offset,
  category: categorySlug,
  userId,
}: FeedInputProps & { userId: string }): Promise<
  AppResponse<FeedArticle[]>
> => {
  try {
    //* reader's interests
    const [catRows, tagRows] = await Promise.all([
      db
        .select({ slug: category.slug })
        .from(userCategory)
        .innerJoin(category, eq(userCategory.categoryId, category.id))
        .where(eq(userCategory.userId, userId)),
      db
        .select({ name: userTag.name })
        .from(userTag)
        .where(eq(userTag.userId, userId)),
    ]);

    const userCategorySlugs = new Set(catRows.map((r) => r.slug));
    const userTagNames = new Set(tagRows.map((r) => r.name.toLowerCase()));

    //* no interests configured -> nothing to personalize, serve the public feed
    if (userCategorySlugs.size === 0 && userTagNames.size === 0) {
      return getPublicFeed({ limit, offset, category: categorySlug });
    }

    //* ranked pool is cached for RANK_CACHE_REVALIDATE, so page 2, 3, ... reuse
    //* the same ranking instead of re-fetching and re-sorting all 500 rows
    const daySeed = new Date().toISOString().slice(0, 10);
    const rankedPool = await getRankedPool(
      userId,
      categorySlug ?? null,
      daySeed,
    );

    //* paginate after ranking
    const data = rankedPool.slice(offset, offset + limit).map((item) => ({
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
    //? personalization is an optional enhancement - log the real error, then
    //? serve the normal public feed instead of failing the whole feed
    console.error("Error fetching personalized feed:", error);
    return getPublicFeed({ limit, offset, category: categorySlug });
  }
};

//? entry point used by the feed UI: two modes only - logged out gets the public
//? feed, logged in gets the personalized feed
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

    const authUser = await getCurrentUser();

    if (!authUser) {
      return getPublicFeed({
        limit: parsedLimit,
        offset: parsedOffset,
        category: categorySlug,
      });
    }

    return getPersonalizedFeed({
      limit: parsedLimit,
      offset: parsedOffset,
      category: categorySlug,
      userId: authUser.id,
    });
  } catch (error) {
    console.error("Error fetching user feed:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch feed",
    };
  }
};
