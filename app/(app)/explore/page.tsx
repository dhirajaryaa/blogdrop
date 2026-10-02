import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import ExploreView from "@/features/explore/components/explore-view";
import { getExploreCategories } from "@/features/explore/explore.actions";
import { FeedError } from "@/features/feed/components/feed-list";
import { ExploreGridSkeleton } from "@/components/skeletons";
import Container from "@/components/common/container";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Explore — BlogDrop",
  description:
    "Search and browse engineering topics, and discover high-quality stories from the teams building what's next.",
});

async function ExploreTopics() {
  const result = await getExploreCategories();

  if (!result.success) {
    return <FeedError />;
  }

  return <ExploreView categories={result.data} />;
}

export default function ExplorePage() {
  return (
    <Container className="max-w-3xl min-h-screen">
      <Suspense fallback={<ExploreGridSkeleton />}>
        <ExploreTopics />
      </Suspense>
    </Container>
  );
}