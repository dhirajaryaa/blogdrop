"use server";

import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const ensureAuthUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
       redirect("/login")
    };

    if (!session.user.onboarded) {
        redirect("/app/onboarding")
    }

    return session.user;

}