import type { Metadata } from "next";
import SavedList from "@/features/saved/components/saved-list";
import { getSavedArticles } from "@/features/saved/saved.actions";
import { ArticleListSkeleton } from "@/components/skeletons";
import { constructMetadata } from "@/lib/utils";
import Container from "@/components/common/container";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Saved — BlogDrop",
  description: "Your bookmarked engineering articles, ready to read later.",
});

async function SavedArticles() {
  const result = await getSavedArticles();
  const articles = result.success ? result.data : [];

  return <SavedList articles={articles} />;
}

export default function SavedPage() {
  return (
    <Container className="max-w-3xl min-h-screen">
      <Suspense fallback={<ArticleListSkeleton />}>
        <SavedArticles />
      </Suspense>
    </Container>
  );
}