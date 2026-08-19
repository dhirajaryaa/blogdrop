import { constructMetadata } from "@/lib/utils"
import FeedContent from "@/components/feed/feed-content"
import { Suspense } from "react"

export const metadata = constructMetadata({
  title: "Your Feed - BlogDrop",
  description: "Your personalized engineering blog feed.",
})

async function FeedPage() {

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Suspense>
        <FeedContent />
      </Suspense>
    </div>
  )
}

export default FeedPage
