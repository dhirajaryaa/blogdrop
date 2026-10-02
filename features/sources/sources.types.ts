import type { FeedArticle } from "@/features/feed/feed.types";

export type SourceItem = {
  id: string;
  title: string;
  siteUrl: string | null;
  isActive: boolean | null;
  articleCount: number;
};

export type SourceDetail = {
  source: SourceItem;
  articles: FeedArticle[];
};