"use client";

import { useEffect } from "react";
import Container from "@/components/common/container";
import ErrorView from "@/components/common/error-view";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative">
      <Container className="flex min-h-svh flex-col justify-center">
        <ErrorView
          title="Something went wrong"
          description="An unexpected error broke this page. Try again, and if it keeps happening the feed may be temporarily unavailable."
          onRetry={reset}
        />
      </Container>
    </main>
  );
}
