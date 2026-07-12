"use client";

import ArticleSkelton from "@/components/article/article-skelton";
import EmptyFeed from "@/components/article/empty-feed";
import { ArticleCard } from "@/components/article/article-card";
import { FeedType } from "@/actions/feed";


export function FeedLoadingList() {
    return (
        <section className="flex flex-col overflow-y-auto gap-6 w-full">
            {Array.from({ length: 8 }).map((_, i) => (
                <ArticleSkelton key={i} />
            ))}
        </section>
    );
}

export function FeedList({ articles }: { articles: FeedType[] }) {

    return (
        <section className="flex flex-col overflow-y-auto gap-6 w-full">
            {articles.length === 0 ? (<EmptyFeed />) : (
                articles.map((article) => (<ArticleCard key={article.id} article={article} />))
            )}
        </section>
    )
}

