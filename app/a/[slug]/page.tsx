import { notFound } from "next/navigation"
import Link from "next/link"
import { IconArrowLeft, IconClock, IconExternalLink, IconUser } from "@tabler/icons-react"
import { getArticleBySlug } from "@/actions/article"
import { buttonVariants } from "@/components/ui/button"
import GlowBadge from "@/components/common/GlowBadge"
import { formatDate } from "@/utils/format-date"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  return (
    <div className="max-w-3xl mx-auto space-y-8 my-8 px-4">
      <Link
        href="/feed"
        className={buttonVariants({ variant: "ghost", size: "sm", className: "gap-1.5 text-muted-foreground" })}
      >
        <IconArrowLeft className="size-4" />
        Back to feed
      </Link>

      <article className="space-y-6">
        {article.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
            <img
              src={article.image}
              alt={article.title}
              className="size-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {article.sourceName && (
              <span className="font-semibold text-foreground">{article.sourceName}</span>
            )}
            {article.readingTime && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <IconClock className="size-3.5" />
                  {article.readingTime} min read
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

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {article.title}
          </h1>

          {article.author && (
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <IconUser className="size-3.5" />
              By {article.author}
            </p>
          )}

          <time className="block text-sm text-muted-foreground">
            {formatDate(article.publicAt)}
          </time>
        </div>

        {article.whyRead && article.whyRead.length > 0 && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 ">
            <p className="text-sm font-medium text-primary mb-1">Why read this?</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{article.whyRead}</p>
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {article.summary && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">Summary</h2>
            <p className="text-base leading-7 text-muted-foreground">{article.summary}</p>
          </div>
        )}

        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">Key Takeaways</h2>
            <ul className="space-y-2">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Link
            href={`${article.originalUrl}?ref=blogdrop`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg", className: "gap-2" })}
          >
            Read full article
            <IconExternalLink className="size-4" />
          </Link>
          {article.sourceSiteUrl && (
            <Link
              href={`${article.sourceSiteUrl}?ref=blogdrop`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Visit {article.sourceName}
            </Link>
          )}
        </div>
      </article>
    </div>
  )
}

export default ArticlePage
