"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FeedFilter from "./feed-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FeedList, FeedError } from "./feed-list";
import { getPublicFeed } from "../feed.actions";
import { ArticleListSkeleton } from "@/components/skeletons";
import { IconLoader2 } from "@tabler/icons-react";

export type FeedFilterOption = {
  value: string;
  label: string;
};

const options: FeedFilterOption[] = [
  { value: "all", label: "All" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "frontend", label: "Frontend" },
  { value: "databases", label: "Databases" },
  { value: "performance", label: "Performance" },
  { value: "distributed-systems", label: "Distributed Systems" },
  { value: "platform-engineering", label: "Platform Engineering" },
  { value: "networking", label: "Networking" },
  { value: "data-engineering", label: "Data Engineering" },
];

const PAGE_SIZE = 20;

function FeedView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const topic = searchParams.get("topic");
  const category = topic && topic !== "all" ? topic : null;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["public-feed", category ?? "all"],
    queryFn: async ({ pageParam }) =>
      getPublicFeed({ limit: PAGE_SIZE, offset: pageParam, category }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.success || lastPage.data.length < PAGE_SIZE) return undefined;
      return allPages.reduce(
        (count, page) => count + (page.success ? page.data.length : 0),
        0,
      );
    },
    staleTime: 5 * 60 * 1000,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const active = topic ?? "all";

  const onFilterChange = useCallback(
    (value: string) => {
      if (value === "all") {
        router.replace("/feed");
      } else {
        router.replace(`/feed?topic=${encodeURIComponent(value)}`);
      }
    },
    [router],
  );

  const failed =
    !isPending && (isError || data?.pages.some((page) => !page.success));
  const articles =
    data?.pages.flatMap((page) => (page.success ? page.data : [])) ?? [];

  if (failed) {
    return (
      <section className="border-border/70 border-t py-6">
        <FeedError />
      </section>
    );
  }

  return (
    <section className="border-border/70 border-t py-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <FeedFilter options={options} active={active} onChange={onFilterChange} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {isPending ? (
        <ArticleListSkeleton />
      ) : (
        <>
          <FeedList articles={articles} />
          <div ref={sentinelRef} />
          {isFetchingNextPage && (
            <div className="flex w-full items-center justify-center py-8">
              <IconLoader2 className="text-muted-foreground size-6 animate-spin" />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default FeedView;