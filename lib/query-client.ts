import {
    QueryClient,
    defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import { cache } from "react";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 min — same as provider
                refetchOnWindowFocus: false,
                refetchOnMount: true,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) || query.state.status === "pending",
            },
        },
    });
}

export const getQueryClient = cache(makeQueryClient);