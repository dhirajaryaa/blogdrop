"use client";

import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { FeedArticle } from "../feed.types";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/features/article/format-date";
import { cn } from "@/lib/utils";

const difficultyStyles: Record<string, string> = {
  junior: "border-border text-muted-foreground",
  mid: "border-primary/30 text-primary ",
  senior: "border-destructive/30 text-destructive ",
};

//? feed row
function FeedRow({
  item,
  index,
  minimal = false,
}: {
  item: FeedArticle & { hideNumber?: boolean };
  index: number;
  minimal?: boolean;
}) {
  const logoUrl = `https://faviconapi.com/google/64/png/${new URL(item.originalUrl).host}` || `https://www.google.com/s2/favicons?domain=${new URL(item.originalUrl).host}&sz=128`;;

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
          {!minimal && (
            <>
              <span aria-hidden className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{item.readingTime} read</span>
            </>
          )}
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
          className={cn(
            "line-clamp-1 max-w-2xl text-lg leading-snug font-medium tracking-tight text-balance sm:line-clamp-2 sm:text-xl lg:text-2xl",
            minimal ? "mt-3" : "mt-5",
          )}
          dangerouslySetInnerHTML={{ __html: item.title }}
        />

        {!minimal && (
          <p className="text-muted-foreground mt-3 line-clamp-2 max-w-2xl text-sm leading-7 sm:text-[15px]">
            {item.summary}
          </p>
        )}

        <span
          className={cn(
            "text-muted-foreground mt-6 flex items-center justify-start gap-1 text-sm opacity-60 transition-all duration-300 group-hover:opacity-100",
            minimal && "mt-3 text-xs",
          )}
        >
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

export { FeedError } from "./feed-error";

export function FeedList({
  articles,
  minimal = false,
}: {
  articles: FeedArticle[];
  minimal?: boolean;
}) {
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
          <li
            key={article.id}
            className={cn(
              "first:pt-0 last:pb-0",
              minimal ? "py-8" : "py-10 sm:py-14",
            )}
          >
            <div className="relative">
              <Link href={`/a/${article.slug}`} className="group block">
                <FeedRow item={article} index={index} minimal={minimal} />
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
