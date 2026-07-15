"use server";

import z from "zod";
import { bookmarkInput } from "@/schema/article-schema"
import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { bookmark, article, source, articleMetaData } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

export type BookmarkInput = z.infer<typeof bookmarkInput>;

export const bookmarkArticle = async ({ articleId }: BookmarkInput) => {
    const validateInput = bookmarkInput.safeParse({ articleId });

    if (!validateInput.success) {
        throw new Error("Invalid Input")
    };

    const user = await getCurrentUser();

    if (!user) {
        redirect("/login")
    };

    const validArticle = await db.query.article.findFirst({
        where: eq(article.id, articleId),
    });

    if (!validArticle) {
        throw new Error("Article not found");
    };

    await db.transaction(async (tx) => {
        const existing = await tx.query.bookmark.findFirst({
            where: and(
                eq(bookmark.userId, user.id),
                eq(bookmark.articleId, articleId)
            ),
        });

        if (existing) {
            await tx
                .delete(bookmark)
                .where(eq(bookmark.id, existing.id));

            return { bookmarked: false };
        }

        await tx.insert(bookmark).values({
            userId: user.id,
            articleId,
        });

        return { bookmarked: true };
    })
};

export const getBookmarkArticles = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return await db
        .select({
            id: article.id,
            slug: article.slug,
            title: article.title,
            originalUrl: article.originalUrl,
            author: article.author,
            publicAt: article.publicAt,
            imageUrl: article.imageUrl,
            sourceName: sql<string>`coalesce(${source.title}, '')`,
            summary: articleMetaData.summary,
            whyRead: articleMetaData.whyRead,
            readingTime: articleMetaData.readingTime,
            difficulty: articleMetaData.difficulty,
            tags: articleMetaData.tags,
            categories: articleMetaData.categories,
            matchScore: sql<number>`0`,
        })
        .from(bookmark)
        .innerJoin(article, eq(bookmark.articleId, article.id))
        .leftJoin(source, eq(article.sourceId, source.id))
        .leftJoin(articleMetaData, eq(article.id, articleMetaData.articleId))
        .where(eq(bookmark.userId, user.id))
        .orderBy(desc(bookmark.createdAt));
};
