"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { toast } from "sonner";
import { authCallbackPath } from "./auth-client";

type LoginBtnProps = {
  type: "google" | "github";
  //? where the user was headed before we bounced them to login. carried through
  //? the provider round-trip as a query param on the callback path.
  redirectTo?: string;
};

function LoginBtn({ type, redirectTo }: LoginBtnProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //? auth function
  async function authHandle({ type }: LoginBtnProps) {
    try {
      const callbackURL = redirectTo
        ? `${authCallbackPath}?redirect=${encodeURIComponent(redirectTo)}`
        : authCallbackPath;

      await authClient.signIn.social(
        {
          provider: type,
          callbackURL,
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(
              ctx.error.message || "Unable to sign in. Please try again.",
            );
          },
        },
      );
    } catch (error: unknown) {
      setIsLoading(false);
      toast.error("Unable to sign in. Please try again.");
      console.error(error);
      return;
    }
  }

  return type === "google" ? (
    <>
      <Button
        onClick={() => authHandle({ type: "google", redirectTo })}
        disabled={isLoading}
        aria-busy={isLoading}
        className="h-11 w-full gap-2 text-sm"
      >
        {isLoading ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Redirect to Google...
          </>
        ) : (
          <>
            <IconBrandGoogleFilled className="size-4" />
            Continue with Google
          </>
        )}
      </Button>
    </>
  ) : (
    <>
      <Button
        onClick={() => authHandle({ type: "github", redirectTo })}
        disabled={isLoading}
        aria-busy={isLoading}
        variant="outline"
        className="h-11 w-full gap-2 text-sm"
      >
        {isLoading ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Redirect to GitHub...
          </>
        ) : (
          <>
            <IconBrandGithub className="size-4" />
            Continue with GitHub
          </>
        )}
      </Button>
    </>
  );
}

export default LoginBtn;
