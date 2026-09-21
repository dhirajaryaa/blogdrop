import { AppResponse } from "@/lib/types";
import { ArticleDetails } from "./articleReader.types";
import { article, articleCategory, articleMetaData, articleTag, category, source, tag } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";

export async function getArticleWithSlug(
  slug: string,
): Promise<AppResponse<ArticleDetails>> {
  try {
    // check input
    if (!slug) {
      return {
        success: false,
        reason: "Invalid Slug!",
      };
    }

    // fetch article info

    const [data] = await db
      .select({
        id: article.id,
        slug: article.slug,
        title: article.title,
        author: article.author,
        bannerImg: article.imageUrl,
        originalUrl: article.originalUrl,
        publishDate: article.publicAt,
    
        sourceName: source.title,
        sourceUrl: source.siteUrl,
    
        summary: articleMetaData.summary,
        difficulty: articleMetaData.difficulty,
        whyRead: articleMetaData.whyRead,
        keyTakeaways: articleMetaData.keyTakeaways,
        readingTime: articleMetaData.readingTime ?? 0,
    
        categories: sql<{ name: string; slug: string }[]>`
          COALESCE(
            (
              SELECT json_agg(
                json_build_object(
                  'name', ${category.name},
                  'slug', ${category.slug}
                )
              )
              FROM ${articleCategory}
              INNER JOIN ${category}
                ON ${category.id} = ${articleCategory.categoryId}
              WHERE ${articleCategory.articleId} = ${article.id}
            ),
            '[]'::json
          )
        `,
    
        tags: sql<{ name: string; slug: string }[]>`
          COALESCE(
            (
              SELECT json_agg(
                json_build_object(
                  'name', ${tag.name},
                  'slug', ${tag.slug}
                )
              )
              FROM ${articleTag}
              INNER JOIN ${tag}
                ON ${tag.id} = ${articleTag.tagId}
              WHERE ${articleTag.articleId} = ${article.id}
            ),
            '[]'::json
          )
        `,
      })
      .from(article)
      .innerJoin(source, eq(article.sourceId, source.id))
      .innerJoin(
        articleMetaData,
        eq(articleMetaData.articleId, article.id)
      )
      .where(eq(article.slug, slug));
    
      return { success: true, data };
      
  } catch (error) {
    console.error("Error fetching public feed:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch feed",
    };
  }
};
