import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import ExploreGrid from "@/features/explore/components/explore-grid";

export const metadata: Metadata = constructMetadata({
  title: "Explore — BlogDrop",
  description:
    "Browse engineering topics and discover high-quality stories from the teams building what's next.",
});

export default function ExplorePage() {
  return <ExploreGrid />;
}