"use server"

import { db } from "@/db"
import { articleCategories } from "@/config/category"
import { userTags as articleTags } from "@/config/tags"
import { article, articleMetaData, source, user } from "@/db/schema"
import { eq, desc, and, sql, inArray } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth/get-user"

//Todo : add consistent response,input validate and error handing ;
export type FeedType = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  author: string;
  publicAt: string;
  summary: string | null;
  tags: string[] | null;
  categories: string | null;
  readingTime: number | null;
  difficulty: string | null;
  sourceName: string;
  whyRead: string | null;
  matchScore: number;
  originalUrl: string;
}

// get personalized feed 
export async function getPersonalizedFeed(
  pageNo: number = 1,
  limit: number = 20
): Promise<FeedType[]> {
  const user = await getCurrentUser();

  const categories =
    user?.categories ?? articleCategories.map((cat) => cat.value);

  const tags =
    user?.tags ?? articleTags.map((tag) => tag.value);

  // User tags array
  const userTags = sql`ARRAY[${sql.join(
    tags.map((tag) => sql`${tag}`),
    sql`,`
  )}]::text[]`;

  // Tag match count
  const tagMatches = sql<number>`
    (
      SELECT COUNT(*)
      FROM unnest(${articleMetaData.tags}) AS tag
      WHERE tag = ANY(${userTags})
    )
  `;

  // Category score
  const categoryScore = sql<number>`
    CASE
      WHEN ${articleMetaData.categories} = ANY (
        ARRAY[
          ${sql.join(
    categories.map((category) => sql`${category}`),
    sql`,`
  )}
        ]::text[]
      )
      THEN 30
      ELSE 0
    END
  `;

  // Freshness score
  const freshnessScore = sql<number>`
CASE
  WHEN (${article.publicAt})::timestamp >= NOW() - INTERVAL '1 day' THEN 15
  WHEN (${article.publicAt})::timestamp >= NOW() - INTERVAL '7 days' THEN 10
  WHEN (${article.publicAt})::timestamp >= NOW() - INTERVAL '30 days' THEN 5
  ELSE 0
END
`;

  // Daily random score (0–5)
  const randomScore = sql<number>`
    abs(hashtext(${article.id}::text || CURRENT_DATE::text)) % 6
  `;

  // difficulty score
  const userLevel = user?.experienceLevel ?? "mid";

  // const difficultyScore = sql<number>`
  // CASE
  //   WHEN ${articleMetaData.difficulty} = ${userLevel} THEN 15 ELSE 0
  // END
  // `;
  const difficultyScore = sql<number>`
CASE
  -- user junior
  WHEN ${userLevel} = 'junior' AND ${articleMetaData.difficulty} = 'junior' THEN 15
  WHEN ${userLevel} = 'junior' AND ${articleMetaData.difficulty} = 'mid' THEN 8
  WHEN ${userLevel} = 'junior' AND ${articleMetaData.difficulty} = 'senior' THEN 2

  -- user mid
  WHEN ${userLevel} = 'mid' AND ${articleMetaData.difficulty} = 'mid' THEN 15
  WHEN ${userLevel} = 'mid' AND ${articleMetaData.difficulty} IN ('junior','senior') THEN 10

  -- user senior
  WHEN ${userLevel} = 'senior' AND ${articleMetaData.difficulty} = 'senior' THEN 15
  WHEN ${userLevel} = 'senior' AND ${articleMetaData.difficulty} = 'mid' THEN 8
  WHEN ${userLevel} = 'senior' AND ${articleMetaData.difficulty} = 'junior' THEN 2

  ELSE 0
END
`;

  // Final recommendation score
  const recommendationScore = sql<number>`
    (
      (${tagMatches} * 20)
      + ${categoryScore}
      + ${freshnessScore}
      + ${randomScore}
      + ${difficultyScore}
    )
  `;

  const feed = await db
    .select({
      id: article.id,
      title: article.title,
      slug: article.slug,
      imageUrl: article.imageUrl,
      author: article.author,
      originalUrl: article.originalUrl,
      publicAt: article.publicAt,

      summary: articleMetaData.summary,
      whyRead: articleMetaData.whyRead,
      tags: articleMetaData.tags,
      categories: articleMetaData.categories,
      difficulty: articleMetaData.difficulty,
      readingTime: articleMetaData.readingTime,

      sourceName: source.title,

      matchScore: recommendationScore,
    })
    .from(article)
    .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
    .innerJoin(source, eq(source.id, article.sourceId))
    .where(
      and(
        eq(article.status, "completed"),
        inArray(articleMetaData.categories, categories)
      )
    )
    .orderBy(
      desc(recommendationScore),
      desc(article.publicAt)
    )
    .limit(limit)
    .offset((pageNo - 1) * limit);

  return feed;
}
