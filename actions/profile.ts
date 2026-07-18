"use server"

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

export async function updateProfile(data: {
  about: string
  categories: string[]
  tags: string[]
  experienceLevel: string
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    redirect("/login")
  };

  await db
    .update(user)
    .set({
      about: data.about,
      categories: data.categories,
      tags: data.tags,
      experienceLevel: data.experienceLevel,
    })
    .where(eq(user.id, currentUser.id))

  return { success: true };
};
