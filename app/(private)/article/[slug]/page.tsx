import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getArticleBySlug } from "@/actions/article";
import { constructMetadata } from "@/lib/utils";
import { ArticlePageContent } from "@/components/article/article-page";
import { getQueryClient } from "@/lib/query-client";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// metadata 
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return constructMetadata({
      title: "Article Not Found - BlogDrop",
      description: "The requested article could not be found.",
    });
  }

  return constructMetadata({
    title: `${article.title} - BlogDrop`,
    description: article.summary || "Read this engineering article on BlogDrop.",
    image: article.image || "/thumbnail.png",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug),
  });

  const article = queryClient.getQueryData(["article", slug]);
  if (!article) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlePageContent slug={slug} />
    </HydrationBoundary>
  );
}