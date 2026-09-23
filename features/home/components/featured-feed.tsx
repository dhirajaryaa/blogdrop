import { IconArrowDown, IconArrowRight } from "@tabler/icons-react";
import ArticleBanner from "@/features/article/components/article-banner";
import { formatDate } from "@/features/article/format-date";
import { getPublicFeed } from "@/features/feed/feed.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function FeaturedFeed() {
  const feed = await getPublicFeed({ limit: 20, offset: 0 });

  if (!feed.success || feed.data.length === 0) {
    return null;
  }

  //* 3 articles, each from a different source/company
  const seen = new Set<string>();
  const featured = feed.data.filter((a) => {
    if (seen.has(a.sourceName)) return false;
    seen.add(a.sourceName);
    return true;
  }).slice(0, 3);

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

        <Button asChild variant="link" className="text-xs">
          <Link href="/feed">View all →</Link>
        </Button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((article) => {
          const logoUrl = `https://www.google.com/s2/favicons?domain=${new URL(article.originalUrl).hostname}&sz=128`;

          return (
            <Link
              key={article.id}
              href={`/a/${article.slug}`}
              className="group"
            >
              <article className="flex h-full flex-col gap-5">
                {/* Picture / source banner */}
                <ArticleBanner url={logoUrl} title={article.sourceName} />

                {/* Content */}
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <span className="font-medium">{article.sourceName}</span>
                    <span>·</span>
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                  <h3 className="line-clamp-2 text-lg leading-relaxed font-medium tracking-normal">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-6 tracking-normal">
                    {article.summary}
                  </p>
                </div>

                {/* author + date */}
                <div className="text-muted-foreground mt-auto flex items-center gap-2 text-xs">
                  <span>{article.author}</span>
                  <IconArrowRight
                    stroke={2}
                    className="size-4 opacity-100 transition-all duration-300 sm:opacity-0 sm:group-hover:translate-x-1 sm:group-hover:opacity-100"
                  />
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Link
          href="/feed"
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors duration-200 ease-linear"
        >
          Load more <IconArrowDown stroke={2} size={16} />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedFeed;