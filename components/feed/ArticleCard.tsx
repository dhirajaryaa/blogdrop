import { Badge } from "@/components/ui/badge"
import type { getArticles } from "@/actions/feed"
import { IconClock, IconExternalLink } from "@tabler/icons-react"
import { formatDate } from "@/utils/format-date"
import GlowBadge from "../common/GlowBadge"

type Article = Awaited<ReturnType<typeof getArticles>>[number]

function difficultyColor(difficulty: string | null) {
  switch (difficulty) {
    case "junior":
      return "text-emerald-400 border-emerald-400/30"
    case "mid":
      return "text-amber-400 border-amber-400/30"
    case "senior":
      return "text-red-400 border-red-400/30"
    default:
      return ""
  }
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-glow-xs">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5 flex-wrap">
        {article.sourceName && (
          <span className="font-medium text-foreground/80">{article.sourceName}</span>
        )}
        {article.readingTime && (
          <>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <IconClock className="size-3" />
              {article.readingTime} min read
            </span>
          </>
        )}
        {article.difficulty && (
          <>
            <span>·</span>
            <GlowBadge>
              {article.difficulty}
            </GlowBadge>
          </>
        )}
      </div>

      <h2 className="text-lg font-semibold leading-snug mb-1">
        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          {article.title}
        </a>
      </h2>

      <p className="text-sm text-muted-foreground mb-2.5">{article.author}</p>

      {article.summary && (
        <p className="text-sm text-muted-foreground/80 line-clamp-2 mb-4 leading-relaxed">
          {article.summary}
        </p>
      )}

      <div className="flex items-center justify-between pt-1">
        <time className="text-xs text-muted-foreground">{formatDate(article.publicAt)}</time>
        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          Read article
          <IconExternalLink className="size-3" />
        </a>
      </div>
    </article>
  )
}

export { ArticleCard, formatDate }
export type { Article }
