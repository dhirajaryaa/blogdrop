"use server"

import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function completeOnboarding(data: {
  categories: string[]
  tags: string[]
  experienceLevel: string
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/auth/login");
  };

  await db
    .update(user)
    .set({
      onboarded: true,
      categories: data.categories,
      tags: data.tags,
      experienceLevel: data.experienceLevel,
    })
    .where(eq(user.id, session.user.id))

  return { success: true };
}
