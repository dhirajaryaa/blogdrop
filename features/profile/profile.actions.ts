"use server";

//? profile data for the current user fetched from the database

import { AppResponse } from "@/lib/types";
import { db } from "@/db";
import { bookmark, category, source, user, userCategory, userTag } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/features/auth/auth.actions";
import { userTags } from "@/config/tags";
import type { ProfileData, ProfileInput } from "./profile.types";

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

    const [interests, tags, allCategories, saved, following] = await Promise.all([
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
        .select({
          name: category.name,
          slug: category.slug,
        })
        .from(category)
        .orderBy(category.name),

      db
        .select({ count: sql<number>`count(*)` })
        .from(bookmark)
        .where(eq(bookmark.userId, authUser.id)),

      db
        .select({ count: sql<number>`count(*)` })
        .from(source)
        .where(eq(source.isActive, true)),
    ]);

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
        interests,
        tags: tags.map((tag) => tag.name),
        allCategories,
        stats: {
          saved: saved[0]?.count ?? 0,
          interests: interests.length,
          following: following[0]?.count ?? 0,
        },
      },
    };

  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to fetch profile",
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
      reason: error instanceof Error ? error.message : "Failed to update profile",
    };
  }
};

//* toggle an interest (category) for the current user
export const toggleCategory = async (
  slug: string,
): Promise<AppResponse<void>> => {
  try {
    const authUser = await getCurrentUser();

    if (!authUser) {
      return { success: false, reason: "Login required to update interests" };
    }

    const [target] = await db
      .select({ id: category.id })
      .from(category)
      .where(eq(category.slug, slug))
      .limit(1);

    if (!target) {
      return { success: false, reason: "Category not found" };
    }

    const [existing] = await db
      .select({ userId: userCategory.userId })
      .from(userCategory)
      .where(
        and(
          eq(userCategory.categoryId, target.id),
          eq(userCategory.userId, authUser.id),
        ),
      )
      .limit(1);

    if (existing) {
      await db
        .delete(userCategory)
        .where(
          and(
            eq(userCategory.categoryId, target.id),
            eq(userCategory.userId, authUser.id),
          ),
        );
    } else {
      await db
        .insert(userCategory)
        .values({ categoryId: target.id, userId: authUser.id })
        .onConflictDoNothing();
    }

    return { success: true, data: undefined };

  } catch (error) {
    console.error("Error toggling category:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to update interests",
    };
  }
};

//* add a tag (only predefined tags from config/tags.ts are allowed)
export const addTag = async (name: string): Promise<AppResponse<void>> => {
  try {
    const trimmed = name.trim();

    if (!trimmed) {
      return { success: false, reason: "Tag name is required" };
    }

    if (!predefinedTagNames.has(trimmed)) {
      return {
        success: false,
        reason: "Choose a tag from the predefined list only",
      };
    }

    const authUser = await getCurrentUser();

    if (!authUser) {
      return { success: false, reason: "Login required to add tags" };
    }

    await db
      .insert(userTag)
      .values({ userId: authUser.id, name: trimmed })
      .onConflictDoNothing();

    return { success: true, data: undefined };

  } catch (error) {
    console.error("Error adding tag:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to add tag",
    };
  }
};

//* remove a tag for the current user
export const removeTag = async (name: string): Promise<AppResponse<void>> => {
  try {
    const authUser = await getCurrentUser();

    if (!authUser) {
      return { success: false, reason: "Login required to remove tags" };
    }

    await db
      .delete(userTag)
      .where(and(eq(userTag.userId, authUser.id), eq(userTag.name, name)));

    return { success: true, data: undefined };

  } catch (error) {
    console.error("Error removing tag:", error);
    return {
      success: false,
      reason: error instanceof Error ? error.message : "Failed to remove tag",
    };
  }
};