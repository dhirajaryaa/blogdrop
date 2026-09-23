import GoBackBtn from "@/components/common/go-back";
import { getArticleWithSlug } from "@/features/article-reader/articleReader.actions";
import ArticleReader from "@/features/article-reader/reader";
import { FeedError } from "@/features/feed/components/feed-list";
import { ReaderSkeleton } from "@/components/skeletons";
import { Suspense } from "react";
import Container from "@/components/common/container";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

//* per-article SEO: branded og + twitter image (BlogDrop brand, not article banner)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const data = await getArticleWithSlug(slug);

  if (!data.success || !data.data) {
    return constructMetadata({
      title: "Article not found",
      description: "This article could not be found on BlogDrop.",
      noIndex: true,
    });
  }

  const article = data.data;

  return constructMetadata({
    title: article.title,
    description:
      article.summary ??
      `${article.sourceName} — an engineering article curated on BlogDrop.`,
    path: `/a/${slug}`,
    image: `/og/article/${slug}`,
  });
}

async function ArticleReaderPage({ params }: Props) {
  //* get article form slug
  const { slug } = await params;

  const data = await getArticleWithSlug(slug);

  if (!data.success) {
    return <FeedError />;
  }

  return (
    <Container className="max-w-3xl px-8">
      <div className="mt-8 sm:mt-12">
        <GoBackBtn text />
      </div>
      <Suspense fallback={<ReaderSkeleton />}>
        <ArticleReader article={data.data} />
      </Suspense>
    </Container>
  );
}

export default ArticleReaderPage;
