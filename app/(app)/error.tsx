"use client";

import { useEffect } from "react";
import Container from "@/components/common/container";
import ErrorView from "@/components/common/error-view";

//? route-level error boundary. catches anything a page throws while rendering
//? and offers a retry. the root layout (providers, theme, toaster) stays
//? mounted because this renders *inside* it - only app/global-error.tsx
//? replaces the whole document.
export default function AppError({
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
    <Container className="max-w-3xl">
      <ErrorView onRetry={reset} />
    </Container>
  );
}
