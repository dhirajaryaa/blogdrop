"use server";

//? profile data for the current user fetched from the database

import { AppResponse } from "@/lib/types";
import { db } from "@/db";
import {
  article,
  articleMetaData,
  bookmark,
  category,
  source,
  user,
  userCategory,
  userTag,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/features/auth/auth.actions";
import { revalidateTag } from "next/cache";
import { articleCategories } from "@/config/category";
import { userTags } from "@/config/tags";
import type {
  ProfileData,
  ProfileInput,
  ProfileSelectionsInput,
} from "./profile.types";

const configuredCategories = articleCategories.map(({ value, label }) => ({
  slug: value,
  name: label,
}));
const configuredCategorySlugs = new Set<string>(
  configuredCategories.map(({ slug }) => slug),
);

//? only predefined tags from config/tags.ts are allowed as profile tags
const predefinedTagNames = new Set<string>(userTags.map((tag) => tag.label));

export const getProfileData = async (): Promise<AppResponse<ProfileData>> => {
  try {
    const authUser = await getCurrentUser();

    if (!authUser) {
      return {
        success: true,
        data: {
          user: null,
          interests: [],
          tags: [],
          allCategories: [],
          stats: { saved: 0, interests: 0, following: 0 },
        },
      };
    }

    const [interests, tags, saved, following] = await Promise.all([
      db
        .select({
          name: category.name,
          slug: category.slug,
        })
        .from(userCategory)
        .innerJoin(category, eq(userCategory.categoryId, category.id))
        .where(eq(userCategory.userId, authUser.id)),

      db
        .select({ name: userTag.name })
        .from(userTag)
        .where(eq(userTag.userId, authUser.id))
        .orderBy(userTag.createdAt),

      db
        .select({ count: sql<number>`count(${article.id})` })
        .from(bookmark)
        .innerJoin(article, eq(bookmark.articleId, article.id))
        .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
        .where(
          and(eq(bookmark.userId, authUser.id), eq(article.status, "done")),
        ),

      db
        .select({ count: sql<number>`count(*)` })
        .from(source)
        .where(eq(source.isActive, true)),
    ]);

    const visibleInterests = interests.filter(({ slug }) =>
      configuredCategorySlugs.has(slug),
    );

    return {
      success: true,
      data: {
        user: {
          name: authUser.name,
          email: authUser.email,
          image: authUser.image ?? null,
          about: authUser.about ?? null,
          experienceLevel: authUser.experienceLevel ?? null,
          createdAt: authUser.createdAt ?? null,
        },
        interests: visibleInterests,
        tags: tags.map((tag) => tag.name),
        allCategories: configuredCategories,
        stats: {
          saved: saved[0]?.count ?? 0,
          interests: visibleInterests.length,
          following: following[0]?.count ?? 0,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      success: false,
      reason:
        error instanceof Error ? error.message : "Failed to fetch profile",
    };
  }
};

export const updateProfile = async (
  input: ProfileInput,
): Promise<AppResponse<null>> => {
  try {
    const name = input.name.trim();
    if (!name) {
      return { success: false, reason: "Name is required" };
    }

    if (!["junior", "mid", "senior"].includes(input.experienceLevel)) {
      return { success: false, reason: "Invalid experience level" };
    }

    const authUser = await getCurrentUser();

    if (!authUser) {
      return { success: false, reason: "Login required to update profile" };
    }

    await db
      .update(user)
      .set({
        name,
        about: input.about.trim() || null,
        experienceLevel: input.experienceLevel,
      })
      .where(eq(user.id, authUser.id));

    return { success: true, data: null };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      reason:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
};

export const saveProfileSelections = async (
  input: ProfileSelectionsInput,
): Promise<AppResponse<null>> => {
  try {
    if (!Array.isArray(input.interests) || !Array.isArray(input.tags)) {
      return { success: false, reason: "Invalid profile selections" };
    }

    const authUser = await getCurrentUser();

    if (!authUser) {
      return { success: false, reason: "Login required to update selections" };
    }

    const interestSlugs = [
      ...new Set(input.interests.map((interest) => interest.trim())),
    ];
    const selectedCategories = interestSlugs.flatMap((slug) => {
      const selectedCategory = articleCategories.find(
        (item) => item.value === slug,
      );

      return selectedCategory ? [selectedCategory] : [];
    });

    if (selectedCategories.length !== interestSlugs.length) {
      return { success: false, reason: "Choose configured categories only" };
    }

    const selectedTags = [
      ...new Set(input.tags.map((tag) => tag.trim()).filter(Boolean)),
    ];

    if (!selectedTags.every((tag) => predefinedTagNames.has(tag))) {
      return {
        success: false,
        reason: "Choose predefined tags only",
      };
    }

    await db.transaction(async (tx) => {
      let categoryIds: number[] = [];

      if (selectedCategories.length > 0) {
        const savedCategories = await tx
          .insert(category)
          .values(
            selectedCategories.map((item) => ({
              name: item.label,
              slug: item.value,
            })),
          )
          .onConflictDoUpdate({
            target: category.slug,
            set: { name: sql`excluded.name` },
          })
          .returning({ id: category.id });

        categoryIds = savedCategories.map(({ id }) => id);
      }

      await tx.delete(userCategory).where(eq(userCategory.userId, authUser.id));

      if (categoryIds.length > 0) {
        await tx.insert(userCategory).values(
          categoryIds.map((categoryId) => ({
            categoryId,
            userId: authUser.id,
          })),
        );
      }

      await tx.delete(userTag).where(eq(userTag.userId, authUser.id));

      if (selectedTags.length > 0) {
        await tx.insert(userTag).values(
          selectedTags.map((name) => ({
            name,
            userId: authUser.id,
          })),
        );
      }
    });

    revalidateTag("personalized-feed-rank", "max");

    return { success: true, data: null };
  } catch (error) {
    console.error("Error saving profile selections:", error);
    return {
      success: false,
      reason:
        error instanceof Error
          ? error.message
          : "Failed to save profile selections",
    };
  }
};
