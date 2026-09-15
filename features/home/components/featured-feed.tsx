import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import FeedList from "@/features/feed/components/feed-list";
import { feedArticles } from "@/features/feed/feed-data";

function FeaturedFeed() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="border-border/70 flex items-end justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Latest
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            From the field.
          </h2>
        </div>

        <Link
          href="/feed"
          className="group text-muted-foreground hover:text-foreground flex items-center gap-1 pb-1 text-sm transition-colors"
        >
          View all
          <IconArrowRight
            size={15}
            stroke={2}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <FeedList articles={feedArticles.slice(0, 6)} />
    </section>
  );
}

export default FeaturedFeed;