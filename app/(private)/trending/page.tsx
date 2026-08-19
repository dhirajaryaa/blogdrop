import { ensureAuthUser } from "@/lib/auth/get-user"
import { constructMetadata } from "@/lib/utils"
import { SectionHeader } from "@/components/common/section-header"

export const metadata = constructMetadata({
  title: "Trending - BlogDrop",
  description: "Trending engineering articles on BlogDrop.",
})

async function FeedPage() {

  return (
    <>
      <SectionHeader title="Trending" description="  Explore the most popular articles and topics everyone is reading.
">
        
          


          {/* Coming Soon */}
          <div className="row-span-3 flex h-full w-full flex-col items-center justify-center text-center py-16 sm:py-26 md:py-30 px-8">
            <h2 className="text-2xl font-bold sm:text-4xl md:text-5xl">
              Coming Soon
            </h2>

            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              We're working on exciting new features. Stay tuned for upcoming updates!
            </p>
          </div>

      </SectionHeader>
    </>
  )
}

export default FeedPage
