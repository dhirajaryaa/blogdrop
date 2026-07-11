import { ensureAuthUser } from "@/lib/auth/get-user"
import { FeedList } from "@/components/feed"
import { FeedSidebar } from "@/components/feed/feed-sidebar"
import Link from "next/link"
import LinkTab from "@/components/common/link-tab"

async function FeedPage() {
  // await ensureAuthUser()

  return (
    <div className="flex gap-8 max-w-7xl mx-auto w-full relative">
      {/* Left Sidebar */}
      <FeedSidebar />

      {/* Main Feed Content */}
      <section className="relative">
        {/* Tabs */}
      <LinkTab />

        {/* listing  */}
        <FeedList />
      </section>
    </div>
  )
}

export default FeedPage
