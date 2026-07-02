import Image from "next/image";
import { IconClock, IconExternalLink } from "@tabler/icons-react";

import type { getArticles } from "@/actions/feed";
import GlowBadge from "../common/GlowBadge";
import { formatDate } from "@/utils/format-date";

type Article = Awaited<ReturnType<typeof getArticles>>[number];

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      {article.image && (
        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden"
        >
          <div className="relative aspect-video w-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </a>
      )}

      <div className="p-5">
        {/* Meta */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {article.sourceName && (
            <span className="font-semibold text-foreground">
              {article.sourceName}
            </span>
          )}

          {article.readingTime && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <IconClock className="size-3" />
                {article.readingTime} min
              </span>
            </>
          )}

          {article.difficulty && (
            <>
              <span>•</span>
              <GlowBadge>{article.difficulty}</GlowBadge>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="mb-2 line-clamp-2 text-xl font-semibold leading-tight transition-colors group-hover:text-primary">
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.title}
          </a>
        </h2>

        {/* Author */}
        {article.author && (
          <p className="mb-3 text-sm text-muted-foreground">
            {article.author}
          </p>
        )}

        {/* Summary */}
        {article.summary && (
          <p className="mb-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {article.summary}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <time className="text-xs text-muted-foreground">
            {formatDate(article.publicAt)}
          </time>

          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Read Article
            <IconExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export { ArticleCard, formatDate };
export type { Article };