import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-user";

interface Props {
    searchParams: Promise<{
        redirect?: string;
    }>;
}

export default async function AuthCallbackPage({ searchParams }: Props) {
    const { redirect: redirectTo } = await searchParams;

    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth/login");
    }

    if (!user.onboarded) {
        redirect("/onboarding");
    }

    redirect(redirectTo || "/feed");
}