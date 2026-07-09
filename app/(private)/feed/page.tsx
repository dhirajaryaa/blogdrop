import { ensureAuthUser } from "@/lib/auth/get-user"
import { SectionHeader } from "@/components/common/section-header"
import { FeedList } from "@/components/feed"

async function FeedPage() {
  await ensureAuthUser()

  return (
    <>
      <SectionHeader title="Discover" description="Fresh stories, trending insights, and articles tailored to your interests."
        className=" max-w-7xl mx-auto"
      >
        {/* listing  */}
        <FeedList />

      </SectionHeader>
    </>
  )
}

export default FeedPage
