import { IconArrowRight } from "@tabler/icons-react";
import ArticleBanner from "@/features/article/components/article-banner";
import { formatDate } from "@/features/article/format-date";
import { getPublicFeed } from "@/features/feed/feed.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function FeaturedFeed() {
  const feed = await getPublicFeed({ limit: 1, offset: 0 });

  if (!feed.success || feed.data.length === 0) {
    return null;
  }

  const article = feed.data[0];
  const logoUrl = `https://www.google.com/s2/favicons?domain=${new URL(article.originalUrl).hostname}&sz=128`;

  return (
    <section className="my-10 space-y-8">
      <div className="flex items-end justify-between">
        <div className="max-w-md">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Featured
          </p>
          <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Fresh off the feed.
          </h2>
        </div>

        <Button asChild variant={"link"} className="text-xs">
          <Link href="/feed">View all →</Link>
        </Button>
      </div>

      <Link
        href={`/a/${article.slug}`}
        className="group border-border/70 bg-muted/10 block overflow-hidden rounded-3xl border transition-colors hover:bg-muted/20"
      >
        <article className="grid gap-0 lg:grid-cols-[1.6fr_1fr]">
          {/* Picture */}
          <div className="relative">
            <ArticleBanner
              url={logoUrl}
              title={article.sourceName}
              className="aspect-[16/10] w-full rounded-none shadow-none lg:h-full"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4 p-7 sm:p-9">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">{article.sourceName}</span>
              <span>·</span>
              <span>{formatDate(article.publishDate)}</span>
            </div>

            <h3 className="line-clamp-3 text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
              {article.title}
            </h3>

            <p className="text-muted-foreground line-clamp-3 text-sm leading-6">
              {article.summary}
            </p>

            <div className="text-muted-foreground mt-auto flex items-center gap-2 text-xs">
              <span>{article.author}</span>
              <IconArrowRight
                stroke={2}
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </article>
      </Link>
    </section>
  );
}

export default FeaturedFeed;