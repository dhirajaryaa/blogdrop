"use server"

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/get-user";

export async function updateProfile(data: {
  about: string
  userInterests: string[]
  experienceLevel: string
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return { error: "Not authenticated" };
  };

  await db
    .update(user)
    .set({
      about: data.about,
      userInterests: data.userInterests,
      experienceLevel: data.experienceLevel,
    })
    .where(eq(user.id, currentUser.id))

  return { success: true };
}
