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

    return session.user;

}