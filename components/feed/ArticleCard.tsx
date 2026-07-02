import Link from "next/link";
import { IconClock } from "@tabler/icons-react";

import type { getArticles } from "@/actions/feed";
import GlowBadge from "../common/GlowBadge";
import { formatDate } from "@/utils/format-date";
import { formatAuthors } from "@/utils/format-author";

type Article = Awaited<ReturnType<typeof getArticles>>[number];

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/a/${article.slug}`} className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      {article.image && (
        <div className="overflow-hidden">
          <div className="relative aspect-video w-full">
            <img
              src={article.image}
              alt={article.title}
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      )}

      <div className="p-5">
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

        <h2 className="mb-2 line-clamp-2 text-xl font-semibold leading-tight transition-colors group-hover:text-primary">
          {article.title}
        </h2>

        {article.author && (
          <p className="mb-3 text-sm text-muted-foreground">
            {formatAuthors(article.author)}
          </p>
        )}

        {article.summary && (
          <p className="mb-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {article.summary}
          </p>
        )}

        <div className="flex items-center justify-between border-t pt-4">
          <time className="text-xs text-muted-foreground">
            {formatDate(article.publicAt)}
          </time>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
            Read Article
          </span>
        </div>
      </div>
    </Link>
  );
}

export { ArticleCard };
export type { Article };