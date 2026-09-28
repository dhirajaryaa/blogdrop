import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/auth.actions";

interface Props {
    searchParams: Promise<{
        redirect?: string;
    }>;
}

//? the proxy deliberately does not touch /auth, so this page is what actually
//? runs after the provider round-trip. it used to be unreachable - the old
//? middleware redirected the already-cookied request straight to /feed.
export default async function AuthCallbackPage({ searchParams }: Props) {
    const { redirect: redirectTo } = await searchParams;

    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth/login");
    }

    //? new accounts have to pick interests before the personalized feed means
    //? anything, so they land on onboarding instead of an empty feed.
    if (!user.onboarded) {
        redirect("/onboarding");
    }

    //? same-origin only: a `//evil.example` or absolute-URL redirect param
    //? would otherwise bounce a freshly signed-in user off-site.
    const safeRedirect =
        redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
            ? redirectTo
            : "/feed";

    redirect(safeRedirect);
}
