import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBrief } from "@/features/article-brief/brief-data";
import ArticleBriefView from "@/features/article-brief/components/article-brief";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brief = getArticleBrief(slug);
  if (!brief) return { title: "Article not found" };

  return {
    title: brief.article.title,
    description: brief.article.description,
  };
}

export default async function ArticleBriefPage({ params }: Props) {
  const { slug } = await params;
  const brief = getArticleBrief(slug);
  if (!brief) notFound();

  return <ArticleBriefView brief={brief} />;
}