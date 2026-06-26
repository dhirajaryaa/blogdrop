"use server";

import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user;
};


export async function ensureAuthUser() {
    const user = await getCurrentUser();

    if (!user) redirect("/login");

    if (!user.onboarded) {
        redirect("/onboarding");
    }

    return user;
};