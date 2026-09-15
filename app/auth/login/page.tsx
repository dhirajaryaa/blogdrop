import Link from "next/link";
import LoginBtn from "@/features/auth/login-btn";
import GoBackBtn from "@/components/common/go-back";
import Logo from "@/components/common/logo";
import Container from "@/components/common/container";

function LoginPage() {
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
            <LoginBtn type="google" />
            <LoginBtn type="github" />
          </div>

          <p className="text-muted-foreground mt-6 text-center text-xs leading-5">
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
      </Container>
    </main>
  );
}

export default LoginPage;
