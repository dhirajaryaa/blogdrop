import type { Metadata } from "next"
import GoogleLoginButton from "@/components/auth/GoogleLoginButton"
import { IconArrowLeft, IconBrandTabler } from "@tabler/icons-react"
import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import { authCallbackPath } from "@/config/constant";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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
    redirect(authCallbackPath);
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <Link href={"/"} className={buttonVariants({ variant: "secondary", className: "rounded-lg absolute top-2 left-2" })}>
    <IconArrowLeft/> Back
      </Link>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="size-12 rounded-xl bg-linear-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg">
              <IconBrandTabler className="size-7 text-white" />
            </div>
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
