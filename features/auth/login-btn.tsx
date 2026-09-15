"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { toast } from "sonner";
import { authCallbackPath } from "./auth-client";

type LoginBtnProps = {
  type: "google" | "github";
};

function LoginBtn({ type }: LoginBtnProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //? auth function
  async function authHandle({ type }: LoginBtnProps) {
    try {
      await authClient.signIn.social(
        {
          provider: type,
          callbackURL: authCallbackPath,
        },
        {
          onRequest: (ctx) => {
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
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Unable to sign in. Please try again.");
      console.error(error);
      return;
    }
  }

  return type === "google" ? (
    <>
      <Button
        onClick={() => authHandle({ type: "google" })}
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
        onClick={() => authHandle({ type: "github" })}
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
