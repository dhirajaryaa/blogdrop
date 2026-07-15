"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookmarkArticles } from "@/actions/bookmark";
import { IconBookmarkOff } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";
import { ArticleCard } from "@/components/article/article-card";
import { Skeleton } from "@/components/ui/skeleton";

function BookmarksContent() {
    const { data: articles, isPending, isError } = useQuery({
        queryKey: ["bookmarks"],
        queryFn: () => getBookmarkArticles(),
    });

    if (isPending) {
        return (
            <SectionHeader title="Bookmarks" description="Your saved articles, ready to read anytime.">
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-6xl mx-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col gap-4 p-4 rounded-2xl bg-card border-2">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 rounded-full" />
                                    <Skeleton className="w-20 h-4" />
                                </div>
                                <Skeleton className="w-full h-5" />
                                <Skeleton className="w-4/5 h-5" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-3/4 h-4" />
                            </div>
                        </div>
                    ))}
                </section>
            </SectionHeader>
        );
    }

    if (isError) {
        return (
            <SectionHeader title="Bookmarks" description="Your saved articles, ready to read anytime.">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-muted-foreground">Something went wrong loading your bookmarks.</p>
                </div>
            </SectionHeader>
        );
    }

    if (!articles || articles.length === 0) {
        return (
            <SectionHeader title="Bookmarks" description="Your saved articles, ready to read anytime.">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 rounded-full bg-muted p-4">
                        <IconBookmarkOff className="size-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">No bookmarks yet</h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        Save articles you want to read later and they&apos;ll appear here.
                    </p>
                    <Button variant="outline" className="mt-6" asChild>
                        <Link href="/feed">Browse Feed</Link>
                    </Button>
                </div>
            </SectionHeader>
        );
    }

    return (
        <SectionHeader title="Bookmarks" description="Your saved articles, ready to read anytime.">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </section>
        </SectionHeader>
    );
}

export default BookmarksContent;
