import { ensureAuthUser } from "@/lib/auth/get-user"
import { getArticles } from "@/actions/feed"
import { IconRss } from "@tabler/icons-react"
import Link from "next/link"
import { SectionHeader } from "@/components/common/section-header"
import ArticlesList from "@/components/article/article-list"

async function FeedPage() {
  await ensureAuthUser()

  const articles = await getArticles()

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
          <IconRss className="size-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">No articles yet</h2>
        <p className="text-muted-foreground max-w-md">
          Your feed is empty. Add sources to start receiving articles tailored to your interests.
        </p>
        <Link
          href="/settings"
          className="inline-flex h-8 items-center gap-1.5 rounded-2xl bg-primary text-primary-foreground px-3 text-sm font-medium hover:bg-primary/80 transition-colors"
        >
          Add sources
        </Link>
      </div>
    )
  };

  return (
    <>
      <SectionHeader title="Discover" description="Fresh stories, trending insights, and articles tailored to your interests."
        className=" max-w-7xl mx-auto"
      >
        {/* listing  */}

        <ArticlesList articles={articles} />

      </SectionHeader>
    </>
  )
}

export default FeedPage
