import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import FeedView from "@/features/feed/components/feed-view";

export const metadata: Metadata = constructMetadata({
  title: "Feed — BlogDrop",
  description:
    "Your feed of curated engineering articles from the teams building what's next.",
});

export default function FeedPage() {
  return <FeedView />;
}