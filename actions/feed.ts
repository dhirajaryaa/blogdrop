"use server"

import { db } from "@/db"
import { articleCategories } from "@/config/category"
import { userTags as articleTags } from "@/config/tags"
import { article, articleMetaData, source, user } from "@/db/schema"
import { eq, desc, and, sql } from "drizzle-orm"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { getCurrentUser } from "@/lib/auth/get-user"

export async function getArticles() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) return []

  const [currentUser] = await db
    .select({
      tags: user.tags,
      categories: user.categories,
      experienceLevel: user.experienceLevel,
    })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1)

  const userTagsSet = new Set(currentUser?.tags ?? [])
  const userCategoriesSet = new Set(currentUser?.categories ?? [])
  const userExperience = currentUser?.experienceLevel ?? "mid"

  const articles = await db.query.article.findMany({
    with: {
      metadata: true,
      source: true,
    },
    where: eq(article.status, "completed"),
    orderBy: desc(article.publicAt),
    limit: 50,
  })

  return articles
    .filter((a) => a.metadata.difficulty === userExperience)
    .sort(() => Math.random() - 0.5) // random order
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      author: a.author,
      publicAt: a.publicAt,
      image: a.imageUrl ?? "",
      sourceName: a.source?.title ?? "",
      summary: a.metadata?.summary ?? "",
      readingTime: a.metadata?.readingTime ?? 2,
      difficulty: a.metadata?.difficulty ?? "junior",
    }))
};

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
  categories: string[] | null;
  readingTime: number | null;
  difficulty: string | null;
  sourceName: string;
  matchScore: number;
}

// get personalized feed 
export async function getPersonalizedFeed(pageNo: number = 1, limit: number = 20): Promise<FeedType[]> {
  // check user 
  const user = await getCurrentUser();

  const categories = user?.categories ?? articleCategories.map(cat => cat.value);
  const tags = user?.tags ?? articleTags.map(tag => tag.value);

  const userTags = sql`ARRAY[${sql.join(
    tags.map((tag) => sql`${tag}`),
    sql`,`
  )}]::text[]`;

  const userCategories = sql`ARRAY[${sql.join(
    categories.map((category) => sql`${category}`),
    sql`,`
  )}]::text[]`;

  const matchScore = sql<number>`
(
  SELECT COUNT(*)
  FROM unnest(${articleMetaData.tags}) AS tag
  WHERE tag = ANY(${userTags})
)
`;

  const feed = await db
    .select({
      id: article.id,
      title: article.title,
      slug: article.slug,
      imageUrl: article.imageUrl,
      author: article.author,
      publicAt: article.publicAt,
      summary: articleMetaData.summary,
      tags: articleMetaData.tags,
      categories: articleMetaData.categories,
      readingTime: articleMetaData.readingTime,
      difficulty: articleMetaData.difficulty,
      sourceName: source.title,
      matchScore,
    })
    .from(article)
    .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
    .innerJoin(source, eq(source.id, article.sourceId))
    .where(
      and(
        eq(article.status, "completed"),
        sql`${articleMetaData.categories} && ${userCategories}`
      )
    )
    .orderBy(desc(matchScore), desc(article.publicAt))
    .limit(limit)
    .offset((pageNo - 1) * limit);

  return feed;
}
