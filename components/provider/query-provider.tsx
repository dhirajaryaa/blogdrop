"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 min
            refetchOnWindowFocus: false,
            refetchOnMount: true
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient} >
      {children}
    </QueryClientProvider>
  );
}