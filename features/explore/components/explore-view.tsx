"use client";

import { useEffect, useState } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { FeedArticle } from "@/features/feed/feed.types";
import { FeedList } from "@/features/feed/components/feed-list";
import ExploreGrid from "./explore-grid";
import { searchArticles } from "../explore.actions";
import type { ExploreCategory } from "../explore.types";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 350;

//* results === null while a search is in flight
function ExploreView({ categories }: { categories: ExploreCategory[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FeedArticle[] | null>(null);

  const trimmed = query.trim();
  const searching = trimmed.length >= MIN_QUERY_LENGTH;

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setResults(null);
  };

  //* debounced db search
  useEffect(() => {
    if (trimmed.length < MIN_QUERY_LENGTH) {
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await searchArticles(trimmed);
      setResults(res.success ? res.data : []);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [trimmed]);

  return (
    <>
      {/* header + search */}
      <div className="mt-10 mb-6 flex flex-col gap-6">
        <div className="max-w-xl">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Explore
          </p>
          <h1 className="mt-4 text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
            Search or pick a topic.
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-7 sm:text-base">
            Search the full archive of engineering articles, or browse by area
            of interest.
          </p>
        </div>

        <div className="relative w-full">
          <IconSearch
            size={18}
            stroke={1.75}
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
          />
          <input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search title, author, source…"
            aria-label="Search articles"
            className="border-border/70 focus:ring-ring/50 h-12 w-full rounded-xl border bg-transparent pr-11 pl-11 text-sm outline-none focus:ring-2"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange("")}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition-colors"
            >
              <IconX size={16} stroke={2} />
            </button>
          )}
        </div>
      </div>

      {/* results or topics */}
      {searching ? (
        results === null ? (
          <div className="border-border/70 flex flex-col items-start gap-3 border-y py-24">
            <p className="text-base font-medium">Searching “{trimmed}”…</p>
          </div>
        ) : results.length > 0 ? (
          <FeedList articles={results} minimal />
        ) : (
          <div className="border-border/70 flex flex-col items-start gap-3 border-y py-24">
            <p className="text-base font-medium">No results for “{trimmed}”.</p>
            <p className="text-muted-foreground text-sm">
              Try a different keyword, or browse by topic below.
            </p>
          </div>
        )
      ) : (
        <ExploreGrid categories={categories} />
      )}
    </>
  );
}

export default ExploreView;