import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import SourceList from "@/features/sources/components/source-list";
import { getSources } from "@/features/sources/sources.actions";
import { FeedError } from "@/features/feed/components/feed-list";
import { SourceListSkeleton } from "@/components/skeletons";
import Container from "@/components/common/container";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Sources — BlogDrop",
  description:
    "Browse the engineering blogs BlogDrop collects articles from.",
});

async function SourcesFeed() {
  const result = await getSources();

  if (!result.success) {
    return <FeedError />;
  }

  return <SourceList sources={result.data} />;
}

export default function SourcesPage() {
  return (
    <Container className="max-w-3xl min-h-screen">
      <Suspense fallback={<SourceListSkeleton />}>
        <SourcesFeed />
      </Suspense>
    </Container>
  );
}