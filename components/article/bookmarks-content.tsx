"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookmarkArticles } from "@/actions/bookmark";
import { IconBookmarkOff } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";
import { ArticleCard } from "@/components/article/article-card";
import { BookmarkSkeleton } from "./article-skelton";

function BookmarksContent() {
    const { data: articles, isPending, isError } = useQuery({
        queryKey: ["bookmarks"],
        queryFn: () => getBookmarkArticles(),
    });

    if (isPending) {
        return (
            <BookmarkSkeleton />
        );
    };

    if (isError) {
        return (
            <SectionHeader title="Saved" description="Keep your favorite engineering articles in one place and read them whenever you're ready.">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-muted-foreground">Something went wrong loading your saved articles.</p>
                </div>
            </SectionHeader>
        );
    };

    if (!articles || articles.length === 0) {
        return (
            <SectionHeader title="Bookmarks" description="Your saved articles, ready to read anytime.">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 rounded-full bg-muted p-4">
                        <IconBookmarkOff className="size-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">No Saved yet</h2>
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
        <SectionHeader title="Saved" description="Keep your favorite engineering articles in one place and read them whenever you're ready.">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </section>
        </SectionHeader>
    );
}

export default BookmarksContent;
