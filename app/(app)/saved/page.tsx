import type { Metadata } from "next";
import SavedList from "@/features/saved/components/saved-list";
import { getSavedArticles } from "@/features/saved/saved.actions";
import { constructMetadata } from "@/lib/utils";
import Container from "@/components/common/container";

export const metadata: Metadata = constructMetadata({
  title: "Saved — BlogDrop",
  description: "Your bookmarked engineering articles, ready to read later.",
});

export default async function SavedPage() {
  const result = await getSavedArticles();
  const articles = result.success ? result.data : [];

  return (
    <Container className="max-w-3xl min-h-screen">
      <SavedList articles={articles} />
    </Container>
  );
}