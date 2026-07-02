"use server"

import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export async function completeOnboarding(data: {
  about: string
  categories: string[]
  tags: string[]
  experienceLevel: string
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  };

  await db
    .update(user)
    .set({
      onboarded: true,
      about: data.about,
      categories: data.categories,
      tags: data.tags,
      experienceLevel: data.experienceLevel,
    })
    .where(eq(user.id, session.user.id))

  return { success: true };
}
