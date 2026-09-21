import GoBackBtn from "@/components/common/go-back";
import { getArticleWithSlug } from "@/features/article-reader/articleReader.actions";
import ArticleReader from "@/features/article-reader/reader";
import { FeedError } from "@/features/feed/components/feed-list";
import { ArticleLoading } from "@/features/feed/components/feed-view";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

async function ArticleReaderPage({ params }: Props) {
  //* get article form slug
  const { slug } = await params;

  const data = await getArticleWithSlug(slug);

  if (!data.success) {
    return <FeedError />;
  }

  // render on ui
  // generate metadata

  return (
    <div className="mx-auto max-w-3xl px-8">
      <div className="mt-8 sm:mt-12">
        <GoBackBtn text />
      </div>
      <Suspense fallback={<ArticleLoading />}>
        <ArticleReader article={data.success && data.data} />
      </Suspense>
    </div>
  );
}

export default ArticleReaderPage;
