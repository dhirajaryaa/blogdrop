import Link from "next/link";
import Image from "next/image";
import { ArticleDetails } from "./articleReader.types";
import { formatDate } from "../article/format-date";
import { Button } from "@/components/ui/button";
import { IconArrowUpRight } from "@tabler/icons-react";
import SaveArticleButton from "./save-article";

function ArticleReader({ article }: { article: ArticleDetails }) {
  const logoUrl = `https://www.google.com/s2/favicons?domain=${new URL(article.originalUrl).hostname
    }&sz=128`;

  return (
    <>
      {/* Categories */}
      {article.categories.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          {article.categories.map((category, index) => (
            <span key={category.slug} className="text-muted-foreground">
              {index > 0 && (
                <span className="mr-2 text-muted-foreground/50">/</span>
              )}
              {category.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
          {article.title}
        </h1>

        <SaveArticleButton
          articleId={article.id}
          initialSaved={article.isSaved}
          className="mt-2 hidden shrink-0 sm:inline-flex"
        />
      </div>

      {/* Article metadata */}
      <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-2.5 text-xs">
        <Image
          src={logoUrl}
          alt={article.sourceName}
          width={20}
          height={20}
          loading="lazy"
          className="rounded-md object-contain"
        />

        <span className="text-foreground font-medium">
          {article.sourceName}
        </span>

        <span aria-hidden>·</span>

        <span>{formatDate(article.publishDate)}</span>

        <span aria-hidden>·</span>

        <span>{article.readingTime} min read</span>
      </div>

      {/* Author */}
      <p className="text-muted-foreground mt-2 text-sm">
        By {article.author}
      </p>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag.slug}
              className="border-primary/60 text-primary inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-normal"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Hero image */}
      {article.bannerImg && (
        <div className="relative mt-6 aspect-1200/630 overflow-hidden rounded-lg border">
          <Image
            src={article.bannerImg}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      {/* AI Summary */}
      {article.summary && (
        <div className="mt-6 border-t pt-10">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            AI summary
          </p>

          <p className="mt-4 text-[15px] leading-8 sm:text-base">
            {article.summary}
          </p>
        </div>
      )}

      {/* Key points */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="mt-12 border-t pt-10">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Key points
          </p>

          <ul className="mt-4 space-y-3.5">
            {article.keyTakeaways.map((point) => (
              <li
                key={point}
                className="text-muted-foreground flex gap-3 text-sm leading-7 sm:text-[15px]"
              >
                <span className="bg-primary mt-3 size-1.5 shrink-0 rounded-full" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg">
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read on {article.sourceName}
            <IconArrowUpRight stroke={2} />
          </a>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="/feed">Back to feed</Link>
        </Button>

        <SaveArticleButton
          articleId={article.id}
          initialSaved={article.isSaved}
          className="sm:hidden"
        />
      </div>
    </>
  );
}

export default ArticleReader;