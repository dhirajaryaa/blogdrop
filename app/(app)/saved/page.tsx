import type { Metadata } from "next";
import SavedList from "@/features/saved/components/saved-list";
import { feedArticles } from "@/features/feed/feed-data";
import type { FeedListItem } from "@/features/feed/components/feed-list";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Saved — BlogDrop",
  description: "Your bookmarked engineering articles, ready to read later.",
});

const demoSaved: FeedListItem[] = [
  "cloudflare-pingora-proxy",
  "pinterest-data-platform-models",
  "github-ship-in-your-browser",
  "dropbox-nginx-to-envoy",
  "netflix-recommendations-at-scale",
].flatMap((slug) => {
  const article = feedArticles.find((item) => item.slug === slug);
  if (!article) return [];

  return [
    {
      id: article.id,
      slug: article.slug,
      title: article.title,
      description: article.description,
      url: article.url,
      date: article.date,
      readingTime: article.readingTime,
      company: article.company,
      logo: article.logo,
    },
  ];
});

export default function SavedPage() {
  return <SavedList articles={demoSaved} />;
}