import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import SourceList from "@/features/sources/components/source-list";
import { getSources } from "@/features/sources/sources.actions";
import { FeedError } from "@/features/feed/components/feed-list";
import Container from "@/components/common/container";

export const metadata: Metadata = constructMetadata({
  title: "Sources — BlogDrop",
  description:
    "Browse the engineering blogs BlogDrop collects articles from.",
});

export default async function SourcesPage() {
  const result = await getSources();

  if (!result.success) {
    return <FeedError />;
  }

  return (
    <Container className="max-w-3xl min-h-screen">
      <SourceList sources={result.data} />
    </Container>
  );
}