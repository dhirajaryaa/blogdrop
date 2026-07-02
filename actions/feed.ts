"use server"

import { db } from "@/db"
import { article, articleMetaData, source, user } from "@/db/schema"
import { and, desc, eq, sql } from "drizzle-orm"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export async function getArticles() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) return []

  const [currentUser] = await db
    .select({ tags: user.tags })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1)

  const userInterests = currentUser?.tags ?? []

  const conditions = [eq(article.status, "completed")]

  if (userInterests.length > 0) {
    conditions.push(
      sql`EXISTS (SELECT 1 FROM jsonb_array_elements_text(${articleMetaData.tags}) tag WHERE tag = ANY(ARRAY[${sql.join(userInterests.map((i) => sql`${i}`), sql`, `)}]))`
    )
  }

  const rows = await db
    .select({
      id: article.id,
      slug: article.slug,
      title: article.title,
      originalUrl: article.originalUrl,
      author: article.author,
      publicAt: article.publicAt,
      image: article.imageUrl,
      sourceName: source.title,
      sourceSiteUrl: source.siteUrl,
      summary: articleMetaData.summary,
      readingTime: articleMetaData.readingTime,
      difficulty: articleMetaData.difficulty,
    })
    .from(article)
    .leftJoin(source, eq(article.sourceId, source.id))
    .leftJoin(articleMetaData, eq(article.id, articleMetaData.articleId))
    .where(and(...conditions))
    .orderBy(desc(article.publicAt))
    .limit(50)

  return rows
}
