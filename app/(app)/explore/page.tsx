import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import ExploreGrid from "@/features/explore/components/explore-grid";
import { getExploreCategories } from "@/features/explore/explore.actions";
import { FeedError } from "@/features/feed/components/feed-list";
import Container from "@/components/common/container";

export const metadata: Metadata = constructMetadata({
  title: "Explore — BlogDrop",
  description:
    "Browse engineering topics and discover high-quality stories from the teams building what's next.",
});

export default async function ExplorePage() {
  const result = await getExploreCategories();

  if (!result.success) {
    return <FeedError />;
  }

  return (
    <Container className="max-w-3xl min-h-screen">
      <ExploreGrid categories={result.data} />
    </Container>
  );
}