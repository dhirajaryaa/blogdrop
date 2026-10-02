import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { FeedList, FeedError } from "@/features/feed/components/feed-list";
import { getLatestFeed } from "@/features/feed/feed.actions";
import { ArticleListSkeleton } from "@/components/skeletons";
import Container from "@/components/common/container";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Latest — BlogDrop",
  description:
    "The newest engineering articles from across the web, sorted by publish date.",
});

async function LatestFeed() {
  const result = await getLatestFeed({ limit: 30, offset: 0 });

  if (!result.success) {
    return <FeedError />;
  }

  return <FeedList articles={result.data} />;
}

export default function LatestPage() {
  return (
    <Container className="max-w-3xl min-h-screen">
      <div className="mt-10 mb-6 flex flex-col gap-8">
        <div className="max-w-xl">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Latest
          </p>
          <h1 className="mt-4 text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
            Fresh off the presses.
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-7">
            New engineering posts, ordered by publish date — no curation, just
            what the blogs put out.
          </p>
        </div>
      </div>

      <Suspense fallback={<ArticleListSkeleton />}>
        <LatestFeed />
      </Suspense>
    </Container>
  );
}