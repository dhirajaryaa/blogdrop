"use server"

import { db } from "@/db"
import { article, articleMetaData, source, user } from "@/db/schema"
import { eq, desc, and, sql } from "drizzle-orm"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { getCurrentUser } from "@/lib/auth/get-user"
import { redirect } from "next/navigation"
import { AppResponse } from "@/lib/types"

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
  summary: string | null;
  tags: string[] | null;
  categories: string[] | null;
  matchScore: number;
}[]

// get personalized feed 
export async function getPersonalizedFeed(pageNo: number = 1, limit: number = 20): Promise<AppResponse<FeedType>> {
  try {
    // check user 
    const user = await getCurrentUser();

    if (!user) {
      redirect("/login")
    };

    // score match sql; 
    const matchScore = sql<number>`
    cardinality(
    ARRAY(
    SELECT UNNEST(${articleMetaData.tags})
    INTERSECT
    SELECT UNNEST(${user.tags}::text[])
    )
    )
    `

    const feed = await db
      .select({
        id: article.id,
        title: article.title,
        slug: article.slug,
        imageUrl: article.imageUrl,
        summary: articleMetaData.summary,
        tags: articleMetaData.tags,
        categories: articleMetaData.categories,
        matchScore: matchScore.as("match_score")
      })
      .from(article)
      .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
      .where(
        and(
          eq(article.status, "completed"),
          sql`${articleMetaData.categories} && ${user.categories}::text[]`
        )
      )
      .orderBy(desc(matchScore), desc(article.publicAt))
      .limit(limit)
      .offset(pageNo * limit);

    return { success: true, data: feed };
    
  } catch (error: any) {
    const message = error instanceof Error ? error.message : "Personalized Feed Fetching Error";
    console.error(message, error);
    return { success: false, error: message };
  }

}
