"use client";

import Link from "next/link";

function ErrorView({
  title = "Something went wrong",
  description = "We couldn't load this page. Please try again in a moment.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 pt-14 sm:pt-24 md:pt-40">
      <div className="flex max-w-md flex-col items-center gap-2 text-center">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Error
        </p>
        <h1 className="text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border-border/80 hover:bg-muted/50 text-foreground rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export default ErrorView;