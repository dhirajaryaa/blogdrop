"use server"

import { db } from "@/db"
import { article, source, user } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

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
}
