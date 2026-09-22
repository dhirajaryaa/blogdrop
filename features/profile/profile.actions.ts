"use server";

//? profile data for the current user fetched from the database

import { AppResponse } from "@/lib/types";
import { db } from "@/db";
import { bookmark, category, source, user, userCategory } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/features/auth/auth.actions";
import type { ProfileData, ProfileInput } from "./profile.types";

export const getProfileData = async (): Promise<AppResponse<ProfileData>> => {
  try {
    const authUser = await getCurrentUser();

    if (!authUser) {
      return { success: true, data: { user: null, interests: [], stats: { saved: 0, interests: 0, following: 0 } } };
    }

    const [interests, saved, following] = await Promise.all([
      db
        .select({
          name: category.name,
          slug: category.slug,
        })
        .from(userCategory)
        .innerJoin(category, eq(userCategory.categoryId, category.id))
        .where(eq(userCategory.userId, authUser.id)),

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