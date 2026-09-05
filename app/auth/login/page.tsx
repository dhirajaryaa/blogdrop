import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";
import LoginBtn from "@/components/auth/login-btn";

function LoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center px-6">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="absolute left-4 top-4 gap-1 text-xs text-muted-foreground"
      >
        <Link href="/">
          <IconChevronLeft className="size-4" />
          Home
        </Link>
      </Button>

      {/* Login */}
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="BlogDrop"
            width={40}
            height={40}
            loading="lazy"
            className="size-8 sm:size-10 rounded-lg"
          />

          <h1 className="mt-7 text-xl sm:text-2xl font-semibold tracking-tight">
            Welcome to Blogdrop
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Sign in to save and follow the stories you care about.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <LoginBtn type="google" />
          <LoginBtn type="github" />
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
          By continuing, you agree to BlogDrop's{" "}
          <Link
            href="/terms"
            className="text-foreground underline underline-offset-4"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-foreground underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

export default LoginPage;