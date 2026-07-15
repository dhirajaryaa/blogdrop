"use server";

import z from "zod";
import { bookmarkInput } from "@/schema/article-schema"
import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { bookmark, article } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// type 
export type BookmarkInput = z.infer<typeof bookmarkInput>;

export const bookmarkArticle = async ({ articleId }: BookmarkInput) => {
    const validateInput = bookmarkInput.safeParse({ articleId });

    if (!validateInput.success) {
        throw new Error("Invalid Input")
    };

    //? step 1: validate user
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login")
    };

    //? step 2: valid article id 
    const validArticle = await db.query.article.findFirst({
        where: eq(article.id, articleId),
    });

    if (!validArticle) {
        throw new Error("Article not found");
    };

    //? step 3: check already saved so toggle it
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
}