import { ensureAuthUser } from "@/lib/auth/get-user"
import { FeedList } from "@/components/feed"
import { FeedSidebar } from "@/components/feed/feed-sidebar"
import Link from "next/link"
import LinkTab from "@/components/common/link-tab"

async function FeedPage() {
  // await ensureAuthUser()

  return (
    <div className="flex gap-8 max-w-6xl mx-auto w-full">
      {/* Left Sidebar */}
      <FeedSidebar />

      {/* Main Feed Content */}
      <section className="relative flex-1 min-w-1">
        {/* Tabs */}
        <LinkTab />

        {/* listing  */}
        <FeedList />
      </section>
    </div>
  )
}

export default FeedPage
