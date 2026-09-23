import { IconArrowDown, IconArrowRight } from "@tabler/icons-react";
import ArticleBanner from "@/features/article/components/article-banner";
import { formatDate } from "@/features/article/format-date";
import { getPublicFeed } from "@/features/feed/feed.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function FeaturedFeed() {
  const feed = await getPublicFeed({ limit: 6, offset: 0 });

  if (!feed.success || feed.data.length === 0) {
    return null;
  }

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

      <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {feed.data.slice(0, 6).map((article) => {
          const logoUrl = `https://www.google.com/s2/favicons?domain=${new URL(article.originalUrl).hostname}&sz=128`;

          return (
            <Link
              key={article.id}
              href={`/a/${article.slug}`}
              className="group lg:after:bg-border relative cursor-pointer nth-[3n]:after:hidden lg:after:absolute lg:after:inset-y-0 lg:after:-right-8 lg:after:w-px"
            >
              <article className="flex h-full flex-col gap-6">
                {/* Image / Brand Banner */}
                <ArticleBanner url={logoUrl} title={article.sourceName} />
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="line-clamp-2 text-lg leading-relaxed font-medium tracking-normal">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-6 tracking-normal">
                    {article.summary}
                  </p>
                </div>
                {/* { company && date } */}
                <div className="text-muted-foreground mt-auto flex items-center gap-2 text-xs">
                  <span>{article.author}</span>
                  <span>·</span>
                  <span>{formatDate(article.publishDate)}</span>
                  <IconArrowRight
                    stroke={2}
                    className="size-4 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
                  />
                </div>
              </article>
            </Link>
          );
        })}
      </div>
      <div className="mt-16 flex items-center justify-center">
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