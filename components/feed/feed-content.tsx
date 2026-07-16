"use client";

import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPersonalizedFeed } from "@/actions/feed";
import { FeedList, FeedLoadingList } from "./FeedList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FeedSidebar } from "@/components/feed/feed-sidebar";
import LinkTab from "../common/link-tab";
import SearchBox from "../common/search-box";
import { Button } from "../ui/button";
import { IconFilter2, IconLoader2 } from "@tabler/icons-react";
import { toast } from "sonner";

const PAGE_SIZE = 20;
const INITIAL_PAGES = 2;

function FeedContent() {
    const [infiniteScrollActive, setInfiniteScrollActive] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const fetchedSecondPage = useRef(false);

    const query = useInfiniteQuery({
        queryKey: ["feed"],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            return await getPersonalizedFeed(pageParam, PAGE_SIZE);
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length + 1;
        },
    });

    const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = query;

    const allArticles = data?.pages.flatMap(page => page) ?? [];

    // Auto-fetch second page once first page is done
    useEffect(() => {
        if (!fetchedSecondPage.current && !isPending && data && data.pages.length === 1 && hasNextPage) {
            fetchedSecondPage.current = true;
            fetchNextPage();
        }
    }, [isPending, data, hasNextPage, fetchNextPage]);

    // Infinite scroll
    const handleLoadMore = useCallback(() => {
        setInfiniteScrollActive(true);
        fetchNextPage();
    }, [fetchNextPage]);

    useEffect(() => {
        if (!infiniteScrollActive) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        const el = loadMoreRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [infiniteScrollActive, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Search filter
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const fuse = useMemo(() => {
        return new Fuse(allArticles, {
            keys: ["title", "summary", "author", "tags", "categories", "sourceName"],
            threshold: 0.3,
            ignoreLocation: true,
        });
    }, [allArticles]);

    const filteredSearchArticles = useMemo(() => {
        if (!searchInput.trim()) return allArticles;
        return fuse.search(searchInput).map((result) => result.item);
    }, [allArticles, fuse, searchInput]);

    const filteredArticles = useMemo(() => {
        return filteredSearchArticles.filter(article => {
            const categoryMatch = selectedCategory.trim()
                ? article.categories?.includes(selectedCategory)
                : true;
            const tagMatch =
                selectedTags.length === 0 ||
                selectedTags.some(tag => article.tags?.includes(tag));
            return categoryMatch && tagMatch;
        });
    }, [filteredSearchArticles, selectedCategory, selectedTags]);

    const showLoadMore = !infiniteScrollActive && allArticles.length >= PAGE_SIZE * INITIAL_PAGES && hasNextPage;

    const displayArticles = infiniteScrollActive
        ? filteredArticles
        : filteredArticles.slice(0, PAGE_SIZE * INITIAL_PAGES);

    return (
        <section className="w-full max-w-6xl mx-auto">
            <LinkTab />
            <div className="w-full flex flex-col gap-4 md:flex-row md:gap-6">
                <FeedSidebar
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />

                <div className="w-full flex items-center gap-2 md:hidden pt-1">
                    <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
                </div>

                {isPending ? (
                    <FeedLoadingList />
                ) : (
                    <div className="flex flex-col gap-6">
                        <FeedList articles={displayArticles} />

                        {showLoadMore && (
                            <div className="flex justify-center py-6">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLoadMore}
                                    className="px-8 text-primary"
                                    disabled={isFetchingNextPage}
                                >
                                    {isFetchingNextPage && <IconLoader2 className="size-4 mr-2 animate-spin" />}
                                    Load More
                                </Button>
                            </div>
                        )}

                        {infiniteScrollActive && hasNextPage && (
                            <div ref={loadMoreRef} className="flex justify-center py-6">
                                {isFetchingNextPage && (
                                    <IconLoader2 className="size-6 text-muted-foreground animate-spin" />
                                )}
                            </div>
                        )}

                        {!hasNextPage && allArticles.length > 0 && (
                            <p className="text-center text-sm text-muted-foreground py-6">
                                You&apos;ve reached the end of your feed.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default FeedContent;
