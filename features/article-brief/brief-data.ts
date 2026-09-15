import { feedArticles, type FeedArticle } from "@/features/feed/feed-data";
import { articleCategories } from "@/config/category";

export type ArticleBrief = {
  article: FeedArticle;
  categoryLabel: string;
  related: FeedArticle[];
};

export function getArticleBrief(slug: string): ArticleBrief | null {
  const article = feedArticles.find((item) => item.slug === slug);
  if (!article) return null;

  const categoryLabel =
    articleCategories.find((cat) => cat.value === article.category)?.label ??
    article.category;

  const related = feedArticles.filter(
    (item) =>
      item.category === article.category &&
      item.slug !== article.slug,
  );

  return {
    article,
    categoryLabel,
    related,
  };
}