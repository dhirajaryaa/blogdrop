import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import SourceList from "@/features/sources/components/source-list";

export const metadata: Metadata = constructMetadata({
  title: "Sources — BlogDrop",
  description:
    "Browse the engineering blogs BlogDrop collects articles from.",
});

export default function SourcesPage() {
  return <SourceList />;
}