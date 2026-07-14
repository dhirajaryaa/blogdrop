"use server"

import { db } from "@/db"
import { article, articleMetaData, bookmark, source } from "@/db/schema"
import { getCurrentUser } from "@/lib/auth/get-user";
import { and, eq, isNotNull, sql } from "drizzle-orm"


export async function getArticleBySlug(slug: string) {

  //? step 1: validate user
  const user = await getCurrentUser();

  const [rows] = await db
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
      bookmark: isNotNull(bookmark.id)
    })
    .from(article)
    .leftJoin(source, eq(article.sourceId, source.id))
    .leftJoin(articleMetaData, eq(article.id, articleMetaData.articleId))
    .leftJoin(bookmark,
      user?.id ? and(eq(article.id, bookmark.articleId), eq(bookmark.userId, user.id)) :
        sql`false`
    )
    .where(eq(article.slug, slug))
    .limit(1)

  return rows
}
