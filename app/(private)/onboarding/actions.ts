"use server"

import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export async function completeOnboarding(data: {
  about: string
  userInterests: string[]
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
      about: data.about,
      userInterests: data.userInterests,
      experienceLevel: data.experienceLevel,
      onboarded: true,
    })
    .where(eq(user.id, session.user.id))

  return { success: true };
}
