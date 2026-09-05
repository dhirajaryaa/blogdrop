import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconBrandGithub, IconBrandGoogle, IconBrandGoogleFilled, IconBrandGithubFilled } from "@tabler/icons-react";

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
            className="size-10 rounded-xl"
          />

          <h1 className="mt-7 text-2xl font-semibold tracking-tight">
            Welcome to BlogDrop
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to save and follow the stories you care about.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            // variant="outline"
            className="h-11 w-full gap-2"
          >
            <IconBrandGoogleFilled className="size-5" />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="h-11 w-full gap-2"
          >
            <IconBrandGithubFilled className="size-5" />
            Continue with GitHub
          </Button>
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