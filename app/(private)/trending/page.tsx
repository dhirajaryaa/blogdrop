import { ensureAuthUser } from "@/lib/auth/get-user"
import { constructMetadata } from "@/lib/utils"

export const metadata = constructMetadata({
  title: "Trending - BlogDrop",
  description: "Trending engineering articles on BlogDrop.",
})
import { getArticles } from "@/actions/feed"
import { ArticleCard } from "@/components/article/article-card"
import { IconRss } from "@tabler/icons-react"
import Link from "next/link"
import { SectionHeader } from "@/components/common/section-header"

async function FeedPage() {

  return (
    <>
      <SectionHeader title="Trending" description="  Explore the most popular articles and topics everyone is reading.
">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))} */}
        </section>
      </SectionHeader>
    </>
  )
}

export default FeedPage
