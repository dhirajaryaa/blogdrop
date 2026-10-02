import Link from "next/link";
import { redirect } from "next/navigation";
import LoginBtn from "@/features/auth/login-btn";
import GoBackBtn from "@/components/common/go-back";
import Logo from "@/components/common/logo";
import Container from "@/components/common/container";
import { getCurrentUser } from "@/features/auth/auth.actions";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

//? only same-origin, absolute-path targets survive. without the leading-slash
//? check, `?redirect=https://evil.example` would turn the callback into an
//? open redirect on the very first thing a new user sees after signing in.
const safeRedirect = (value?: string) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : undefined;

async function LoginPage({ searchParams }: LoginPageProps) {
  const [user, params] = await Promise.all([getCurrentUser(), searchParams]);

  //? the proxy used to do this, but it also caught /auth/callback and broke
  //? the OAuth return trip. checking here lets /auth/callback render freely.
  if (user) {
    redirect("/feed");
  }

  const redirectTo = safeRedirect(params.redirect);

  return (
    <main className="relative">
      <Container className="relative flex min-h-svh items-center justify-center ">
        {/* Back */}
        <GoBackBtn className="absolute left-4 top-4" />

        {/* Login */}
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center">
            <Logo className="size-8 sm:size-10" />

            <h1 className="mt-7 text-xl font-semibold tracking-tight sm:text-2xl">
              Welcome to Blogdrop
            </h1>

            <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
              Sign in to save and follow the stories you care about.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <LoginBtn type="google" redirectTo={redirectTo} />
            <LoginBtn type="github" redirectTo={redirectTo} />
          </div>

          <p className="text-muted-foreground mt-6 text-center text-xs leading-5">
            Reading without an account works too — the{" "}
            <Link href="/feed" className="text-foreground underline underline-offset-4">
              public feed
            </Link>{" "}
            is open to everyone.
          </p>
        </div>
      </Container>
    </main>
  );
}

export default LoginPage;
