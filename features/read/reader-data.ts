import { feedArticles } from "@/features/feed/feed-data";

export type ReaderArticle = {
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  company: string;
  logo?: string;
  url: string;
  content: string;
  summary?: string;
  keyTakeaways?: string[];
  difficulty?: "junior" | "mid" | "senior";
  whyRead?: string;
  isPreview?: boolean;
};

export function getReaderArticle(slug: string): ReaderArticle | null {
  const mock = feedArticles.find((item) => item.slug === slug);
  if (!mock) return null;

  return {
    title: mock.title,
    description: mock.description,
    author: mock.author,
    date: mock.date,
    readingTime: mock.readingTime,
    company: mock.company,
    logo: mock.logo,
    url: mock.url,
    content: mock.description,
    isPreview: true,
  };
}