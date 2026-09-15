"use server";

import { articleCategories } from "@/config/category";
import { db } from "@/db";
import {
    category as categoryTable,
    user,
    userCategory,
} from "@/db/schema";
import { AppResponse } from "@/lib/types";
import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/features/auth/auth.actions";
import { redirect } from "next/navigation";

type InterestInput = Set<string>;

export const saveInterest = async (
    interests: InterestInput,
): Promise<AppResponse<null>> => {
    // Validate input
    if (!interests?.size) {
        return {
            success: false,
            reason: "Interests are required.",
        };
    }

    // Check authentication
    const authUser = await getCurrentUser();

    if (!authUser) {
        return redirect("/auth/login");
    }

    // Validate interests against allowed categories
    const data = [...interests].flatMap((interest) => {
        const matchedCategory = articleCategories.find(
            (cat) => cat.value === interest,
        );

        if (!matchedCategory) return [];

        return {
            name: matchedCategory.label,
            slug: matchedCategory.value,
        };
    });

    if (!data.length) {
        return {
            success: false,
            reason: "No valid interests found.",
        };
    }

    try {
        await db.transaction(async (tx) => {
            // Create categories if they don't exist
            const savedCategories = await tx
                .insert(categoryTable)
                .values(data)
                .onConflictDoUpdate({
                    target: categoryTable.slug,
                    set: {
                        name: sql`excluded.name`,
                    },
                })
                .returning({
                    categoryId: categoryTable.id,
                });

            // Connect categories to current user
            if (savedCategories.length > 0) {
                await tx
                    .insert(userCategory)
                    .values(
                        savedCategories.map(({ categoryId }) => ({
                            userId: authUser.id,
                            categoryId,
                        })),
                    )
                    .onConflictDoNothing();
            }

            // Mark user as onboarded
            await tx
                .update(user)
                .set({
                    onboarded: true,
                })
                .where(eq(user.id, authUser.id));
        });

        return {
            success: true,
            data: null,
        };
    } catch (error) {
        console.error("Failed to save interests:", error);

        return {
            success: false,
            reason: "Failed to save interests.",
        };
    }
};