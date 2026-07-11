"use client";

import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { getPersonalizedFeed } from "@/actions/feed";
import { FeedList, FeedLoadingList } from "./FeedList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FeedSidebar } from "@/components/feed/feed-sidebar";
import LinkTab from "../common/link-tab";
import { authClient } from "@/lib/auth/auth-client";
import { articleCategories } from "@/config/category";
import { userTags } from "@/config/tags";
import SearchBox from "../sidebar/search-box";
import { Button } from "../ui/button";
import { IconFilter2 } from "@tabler/icons-react";
import { toast } from "sonner";

const PAGE_SIZE = 20;

function FeedContent() {

    // get articles 
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
            return await getPersonalizedFeed(pageParam, PAGE_SIZE)
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length + 1;
        },
    });

    const allArticles = data?.pages.flatMap(page => page) ?? [];

    // search filer 
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const fuse = useMemo(() => {
        return new Fuse(allArticles, {
            keys: [
                "title",
                "summary",
                "author",
                "tags",
                "categories",
                "source.name",
            ],
            threshold: 0.3,
            ignoreLocation: true,
        })
    }, [allArticles]);

    //! handle search filter 
    const filteredSearchArticles = useMemo(() => {
        if (!searchInput.trim()) return allArticles;

        return fuse.search(searchInput).map((result) => result.item);

    }, [allArticles, fuse, searchInput]);

    //! handle filter or  tags
    const filteredArticles = useMemo(() => {
        return filteredSearchArticles.filter(article => {
            const categoryMatch = selectedCategory.trim() ? article.categories?.includes(selectedCategory) : article;

            const tagMatch =
                selectedTags.length === 0 ||
                selectedTags.some(tag =>
                    article.tags?.includes(tag)
                );

            return categoryMatch && tagMatch;
        });
    }, [filteredSearchArticles, selectedCategory, selectedTags]);


    return (
        <section className="w-full max-w-6xl mx-auto">
            {/* links tab  */}
            <LinkTab />
            <div className="w-full flex flex-col gap-4 md:flex-row md:gap-6 pt-1 md:pt-6">
                {/* sidebar for desktop view */}
                <FeedSidebar
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />

                {/* mobile view search bar  */}
                <div className="w-full flex items-center gap-2 md:hidden">
                    <SearchBox searchInput={searchInput}
                        setSearchInput={setSearchInput} />
                    <Button
                        variant="outline"
                        onClick={() => toast.info("Mobile filters are coming soon. You can use search for now.")}
                    >
                        <IconFilter2 />
                        Filters
                    </Button>
                </div>

                {/* feed list show  */}
                {
                    isPending ?
                        <FeedLoadingList /> :
                        <FeedList articles={filteredArticles} />
                }
            </div>

        </section>
    )
}

export default FeedContent
