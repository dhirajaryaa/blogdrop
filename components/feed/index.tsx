"use client";

import ArticleSkelton from "@/components/article/article-skelton";
import EmptyFeed from "@/components/article/empty-feed";
import { ArticleCard } from "@/components/article/article-card";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20;

export function FeedList() {

    const { data,
        isPending,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["feed"],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const res = await fetch(`/api/feed?page=${pageParam}&limit=20`);
            if (!res.ok) throw new Error("Failed to fetch feed");
            return res.json();
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length + 1;
        },
    });

    const allArticles = data?.pages.flat() ?? [];

    if (isPending) {
        return (
            <section className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ArticleSkelton key={i} />
                ))}
            </section>
        );
    };

    return (
        <section
            className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {allArticles.length === 0 ? (<EmptyFeed />) : (
                allArticles.map((article) => (<ArticleCard key={article.id} article={article} />))
            )}
        </section>
    )
}

