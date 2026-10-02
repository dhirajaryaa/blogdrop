import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/utils";
import Container from "@/components/common/container";
import { FeedList, FeedError } from "@/features/feed/components/feed-list";
import { getSourceArticles } from "@/features/sources/sources.actions";

type Props = {
  params: Promise<{ sourceId: string }>;
};

function faviconUrl(siteUrl: string | null) {
  if (!siteUrl) return "";
  try {
    const host = new URL(siteUrl).host;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
  } catch {
    return "";
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sourceId } = await params;
  const result = await getSourceArticles(sourceId);

  if (!result.success) return { title: "Source not found" };

  return constructMetadata({
    title: `${result.data.source.title} — BlogDrop`,
    description: `All engineering articles collected from ${result.data.source.title}.`,
  });
}

export default async function SourceDetailPage({ params }: Props) {
  const { sourceId } = await params;
  const result = await getSourceArticles(sourceId);

  if (!result.success) return <FeedError />;
  if (!result.data.source) notFound();

  const { source, articles } = result.data;

  return (
    <Container className="max-w-3xl min-h-screen">
      <div className="mt-10 mb-6 flex flex-col gap-8">
        <div className="max-w-xl">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            <Link href="/sources" className="hover:text-foreground transition-colors">
              Sources
            </Link>
            <span className="mx-2 text-muted-foreground/50">/</span>
            {source.title}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Image
              src={faviconUrl(source.siteUrl)}
              alt={source.title}
              width={32}
              height={32}
              loading="lazy"
              className="size-8 shrink-0 rounded-md bg-white object-contain"
            />
            <h1 className="text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
              {source.title}
            </h1>
          </div>
          <p className="text-muted-foreground mt-2 text-sm leading-7 sm:text-base">
            {articles.length} article{articles.length === 1 ? "" : "s"}{" "}
            collected from this blog.
          </p>
        </div>
      </div>

      <FeedList articles={articles} />
    </Container>
  );
}