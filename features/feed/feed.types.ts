//* feed input
export type FeedInputProps = {
  limit: number;
  offset: number;
  category?: string | null;
};

//* feed type */
export interface FeedArticle {
  id: string;
  slug: string;
  title: string;
  author: string;
  originalUrl: string;
  publishDate: string;
  sourceName: string;
  sourceUrl: string | null;
  summary: string | null;
  difficulty: string | null;
  readingTime: number | null;
};

