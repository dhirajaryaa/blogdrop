import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { article, articleMetaData, source } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/get-user";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!currentUser.tags || !currentUser.categories) {
            return NextResponse.json(
                { message: "User preferences not found" },
                { status: 400 }
            );
        }

        const { searchParams } = new URL(req.url);

        const page = Number(searchParams.get("page") ?? 1);
        const limit = Number(searchParams.get("limit") ?? 20);

        const userTags = sql`ARRAY[${sql.join(
            currentUser.tags.map((tag) => sql`${tag}`),
            sql`,`
        )}]::text[]`;

        const userCategories = sql`ARRAY[${sql.join(
            currentUser.categories.map((category) => sql`${category}`),
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
            .orderBy(desc(matchScore))
            .limit(limit)
            .offset((page - 1) * limit);

        return NextResponse.json(feed);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}