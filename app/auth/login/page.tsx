import type { Metadata } from "next"
import GoogleLoginButton from "@/components/auth/GoogleLoginButton"
import { IconBrandTabler } from "@tabler/icons-react"
import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import { authCallbackPath } from "@/config/constant";
import GoBack from "@/components/common/back-button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login — BlogDrop",
  description: "Sign in to BlogDrop with your Google account to access your personalized engineering blog feed.",
  openGraph: {
    title: "Login — BlogDrop",
    description: "Sign in to BlogDrop with your Google account.",
  },
  twitter: {
    title: "Login — BlogDrop",
    description: "Sign in to BlogDrop with your Google account.",
  },
}

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    if (!user.onboarded) {
      redirect("/onboarding");
    };

    redirect(authCallbackPath);
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <GoBack className="absolute top-4 left-4" variant={"outline"}/>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="BlogDrop"
              width={64}
              height={64}
              className="rounded-lg size-10"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to BlogDrop</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to follow engineering blogs from Netflix, Stripe, Uber, and more.
          </p>
        </div>
        <GoogleLoginButton />
        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to BlogDrop&apos;s Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  )
}
