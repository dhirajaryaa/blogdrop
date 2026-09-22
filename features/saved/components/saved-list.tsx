import Link from "next/link";
import { FeedList } from "@/features/feed/components/feed-list";
import type { FeedArticle } from "@/features/feed/feed.types";
import { Button } from "@/components/ui/button";

function SavedList({ articles }: { articles: FeedArticle[] }) {
  return (
    <>
      <div className="mt-10 mb-6 flex flex-col gap-8">
        <div className="max-w-xl">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Saved
          </p>
          <h1 className="mt-4 text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
            Your reading list.
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-7 sm:text-base">
            Articles you&apos;ve bookmarked to read later, in the order you saved
            them.
          </p>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="border-border/70 flex flex-col items-start gap-4 border-y py-24">
          <p className="text-base font-medium">Nothing saved yet.</p>
          <p className="text-muted-foreground text-sm">
            Bookmark articles while you browse and they&apos;ll show up here.
          </p>
          <Button asChild variant="outline" className="mt-2">
            <Link href="/explore">Browse topics</Link>
          </Button>
        </div>
      ) : (
        <FeedList articles={articles} />
      )}
    </>
  );
}

export default SavedList;