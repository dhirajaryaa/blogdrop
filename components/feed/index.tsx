"use client";

import ArticleSkelton from "@/components/article/article-skelton";
import EmptyFeed from "@/components/article/empty-feed";
import { ArticleCard } from "@/components/article/article-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPersonalizedFeed } from "@/actions/feed";

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
        queryFn: async ({ pageParam}) => {
            return await getPersonalizedFeed()
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length + 1;
        },
    });

    const allArticles = data?.pages.flatMap(page=>page) ?? [];
    
    if (isPending) {
        return (
            <section className="flex flex-col border-t border-border/50">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ArticleSkelton key={i} />
                ))}
            </section>
        );
    };

    return (
        <section className="flex flex-col border-t border-border/50">
            {allArticles.length === 0 ? (<EmptyFeed />) : (
                allArticles.map((article) => (<ArticleCard key={article.id} article={article} />))
            )}
        </section>
    )
}

