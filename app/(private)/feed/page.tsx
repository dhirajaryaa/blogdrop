import { ensureAuthUser } from "@/lib/auth/get-user"
import { constructMetadata } from "@/lib/utils"

export const metadata = constructMetadata({
  title: "Your Feed - BlogDrop",
  description: "Your personalized engineering blog feed.",
})
import { FeedList } from "@/components/feed/FeedList"
import { FeedSidebar } from "@/components/feed/feed-sidebar"
import Link from "next/link"
import LinkTab from "@/components/common/link-tab"
import { SectionHeader } from "@/components/common/section-header"
import FeedContent from "@/components/feed/feed-content"

async function FeedPage() {

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Tabs */}

      {/* <LinkTab /> */}


      <FeedContent />



      {/* Left Sidebar */}
      {/* <FeedSidebar /> */}

      {/* Main Feed Content */}
      {/* <section className="relative flex-1 min-w-1"> */}
      {/* listing  */}
      {/* </section> */}
    </div>
  )
}

export default FeedPage
