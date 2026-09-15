"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { articleCategories } from "@/config/category";
import FeedFilter from "./feed-filter";
import FeedList from "./feed-list";
import { feedArticles } from "../feed-data";

function FeedViewInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");

  const options = useMemo(
    () => [
      { value: "all", label: "All" },
      ...articleCategories
        .filter((category) =>
          feedArticles.some(
            (article) => article.category === category.value,
          ),
        )
        .map((category) => ({
          value: category.value,
          label: category.label,
        })),
    ],
    [],
  );

  const [activeCategory, setActiveCategory] = useState(() => {
    const valid = options.some(
      (option) => option.value === topicParam,
    );
    return valid ? (topicParam as string) : "all";
  });

  const articles = useMemo(
    () =>
      activeCategory === "all"
        ? feedArticles
        : feedArticles.filter(
            (article) => article.category === activeCategory,
          ),
    [activeCategory],
  );

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    router.replace(value === "all" ? "/feed" : `/feed?topic=${value}`);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mt-16 flex flex-col gap-8 sm:mt-20">
        <div className="max-w-xl">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Your feed
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
            Engineering stories, thoughtfully collected.
          </h1>
          <p className="text-muted-foreground mt-5 text-sm leading-7 sm:text-base">
            Hand-picked articles from the teams building the web — new posts
            from the engineering blogs you care about.
          </p>
        </div>

        <div className="border-border/70 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <FeedFilter
            options={options}
            active={activeCategory}
            onChange={handleCategoryChange}
          />
          <p className="text-muted-foreground text-xs">
            {articles.length} {articles.length === 1 ? "story" : "stories"}
          </p>
        </div>
      </div>

      <div className="pb-8 sm:pb-12">
        <FeedList articles={articles} />

        <div className="mt-10 flex items-center gap-4">
          <div className="bg-border/70 h-px flex-1" />
          <p className="text-muted-foreground/70 text-xs tracking-[0.2em] uppercase">
            You&apos;re all caught up
          </p>
          <div className="bg-border/70 h-px flex-1" />
        </div>
      </div>
    </div>
  );
}

function FeedView() {
  return (
    <Suspense fallback={null}>
      <FeedViewInner />
    </Suspense>
  );
}

export default FeedView;