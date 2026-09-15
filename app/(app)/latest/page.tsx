import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import FeedList from "@/features/feed/components/feed-list";
import { feedArticles } from "@/features/feed/feed-data";

export const metadata: Metadata = constructMetadata({
  title: "Latest — BlogDrop",
  description:
    "The newest engineering articles from across the web, sorted by publish date.",
});

export default function LatestPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mt-16 sm:mt-20">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Latest
        </p>
        <h1 className="mt-4 max-w-xl text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
          Fresh off the presses.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-sm leading-7 sm:text-base">
          New engineering posts, ordered by publish date — no curation, just
          what the blogs put out.
        </p>
      </div>

      <FeedList articles={feedArticles} />
    </div>
  );
}