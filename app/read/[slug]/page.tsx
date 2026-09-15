import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reader from "@/features/read/components/reader";
import { getReaderArticle } from "@/features/read/reader-data";
import { constructMetadata } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getReaderArticle(slug);

  if (!article) {
    return constructMetadata({
      title: "Article not found — BlogDrop",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${article.title} — BlogDrop`,
    description: article.description,
  });
}

export default async function ReadPage({ params }: Params) {
  const { slug } = await params;
  const article = getReaderArticle(slug);

  if (!article) notFound();

  return <Reader article={article} />;
}