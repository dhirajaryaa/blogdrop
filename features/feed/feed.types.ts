//* feed input
export type FeedInputProps = {
  limit: number;
  offset: number;
};

//* feed type */
export type FeedArticle = {
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

