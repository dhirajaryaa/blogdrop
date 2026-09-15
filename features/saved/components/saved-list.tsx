import Link from "next/link";
import FeedList, {
  type FeedListItem,
} from "@/features/feed/components/feed-list";
import { Button } from "@/components/ui/button";

function SavedList({ articles }: { articles: FeedListItem[] }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mt-16 sm:mt-20">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Saved
        </p>
        <h1 className="mt-4 max-w-xl text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
          Your reading list.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-sm leading-7 sm:text-base">
          Articles you&apos;ve bookmarked to read later, in the order you saved
          them.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="border-border/70 mt-16 flex flex-col items-start gap-4 border-y py-24">
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
    </div>
  );
}

export default SavedList;