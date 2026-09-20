"use client";

import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { FeedArticle } from "../feed.types";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/features/article/format-date";
import { cn } from "@/lib/utils";

const difficultyStyles: Record<string, string> = {
  junior: "border-border text-muted-foreground bg-muted/30",
  mid: "border-primary/30 text-primary bg-primary/30",
  senior: "border-destructive/30 text-destructive bg-destructive/30",
};

//? feed row
function FeedRow({
  item,
  index,
}: {
  item: FeedArticle & { hideNumber?: boolean };
  index: number;
}) {
  const logoUrl = `https://www.google.com/s2/favicons?domain=${new URL(item.originalUrl).hostname}&sz=128`;

  return (
    <div className="grid gap-2 sm:grid-cols-[3.5rem_1fr]">
      {!item.hideNumber && (
        <span className="text-muted-foreground/50 pt-1.5 font-mono text-xs">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div>
        <div className="text-muted-foreground flex flex-wrap items-center gap-2.5 text-xs">
          <Image
            src={logoUrl}
            alt={item.sourceName}
            width={20}
            height={20}
            loading="lazy"
            className="bg-background rounded-md object-contain"
          />
          <span className="text-foreground font-medium">{item.sourceName}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(item.publishDate)}</span>
          <span aria-hidden>·</span>
          <span className="hidden sm:inline">{item.readingTime} read</span>
          <span aria-hidden>·</span>
          {item.difficulty && (
            <span
              className={cn(
                "py flex items-center justify-center rounded-full border px-2 text-[10px] lowercase",
                difficultyStyles[item.difficulty],
              )}
            >
              {item.difficulty}
            </span>
          )}
        </div>

        <h2
          className="mt-5 line-clamp-1 max-w-2xl text-lg leading-snug font-medium tracking-tight text-balance sm:line-clamp-2 sm:text-xl lg:text-2xl"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />

        <p className="text-muted-foreground mt-3 line-clamp-2 max-w-2xl text-sm leading-7 sm:text-[15px]">
          {item.summary}
        </p>

        <span className="text-muted-foreground mt-6 flex items-center justify-start gap-1 text-sm opacity-60 transition-all duration-300 group-hover:opacity-100">
          AI summary
          <IconArrowRight
            stroke={2}
            size={14}
            className="transition-transform duration-400 group-hover:translate-x-1"
          />
        </span>
      </div>
    </div>
  );
}

//? error reload
export function FeedError() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pt-14 sm:pt-24 md:pt-40">
      <p className="text-muted-foreground text-sm">Failed to load articles.</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        Reload
      </button>
    </div>
  );
}

export function FeedList({ articles }: { articles: FeedArticle[] }) {
  if (articles.length === 0) {
    return (
      <div className="border-border/70 flex flex-col items-start gap-3 border-y py-24">
        <p className="text-base font-medium">Nothing here yet.</p>
        <p className="text-muted-foreground text-sm">
          No articles in this topic right now. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-10">
      <ol className="divide-border/70 divide-y">
        {articles.map((article, index) => (
          <li key={article.id} className="py-10 first:pt-0 last:pb-0 sm:py-14">
            <div className="relative">
              <Link href={`/a/${article.slug}`} className="group block">
                <FeedRow item={article} index={index} />
              </Link>
              {/*source link */}
              <a
                href={article.originalUrl}
                target="_blank"
                title={article.sourceName}
                rel="noopener noreferrer"
                aria-label={`Open the original article on ${article.sourceName}`}
                className="text-muted-foreground hover:text-foreground border-border/80 hover:border-foreground/30 bg-background/60 absolute top-0 right-0 hidden h-8 w-8 items-center justify-center rounded-full border backdrop-blur transition-colors sm:inline-flex"
              >
                <IconArrowUpRight size={14} stroke={2} />
              </a>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
