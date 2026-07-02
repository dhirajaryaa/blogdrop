"use server"

import { db } from "@/db"
import { article, articleMetaData, source } from "@/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export async function getArticles() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) return []

  const rows = await db
    .select({
      id: article.id,
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
    .leftJoin(source, and(eq(article.sourceId, source.id), eq(article.status, "completed")))
    .leftJoin(articleMetaData, eq(article.id, articleMetaData.articleId))
    .orderBy(desc(article.publicAt))
    .limit(50)

  return rows
}
