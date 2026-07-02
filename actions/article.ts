"use server"

import { db } from "@/db"
import { article, articleMetaData, source } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getArticleBySlug(slug: string) {
  const rows = await db
    .select({
      id: article.id,
      slug: article.slug,
      title: article.title,
      originalUrl: article.originalUrl,
      author: article.author,
      content: article.content,
      publicAt: article.publicAt,
      image: article.imageUrl,
      sourceName: source.title,
      sourceSiteUrl: source.siteUrl,
      summary: articleMetaData.summary,
      tags: articleMetaData.tags,
      keyTakeaways: articleMetaData.keyTakeaways,
      difficulty: articleMetaData.difficulty,
      whyRead: articleMetaData.whyRead,
      readingTime: articleMetaData.readingTime,
    })
    .from(article)
    .leftJoin(source, eq(article.sourceId, source.id))
    .leftJoin(articleMetaData, eq(article.id, articleMetaData.articleId))
    .where(eq(article.slug, slug))
    .limit(1)

  return rows[0] ?? null
}
