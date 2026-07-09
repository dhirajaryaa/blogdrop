"use client";

import { authClient } from "@/lib/auth/auth-client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { data: session } = authClient.useSession();

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


  // clear cache when user changes 
  useEffect(() => {
    queryClient.clear();
  }, [queryClient, session?.user.id]);

  return (
    <QueryClientProvider client={queryClient} >
      {children}
    </QueryClientProvider>
  );
}