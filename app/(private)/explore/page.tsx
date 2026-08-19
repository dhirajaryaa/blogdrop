import { ensureAuthUser } from "@/lib/auth/get-user"
import { constructMetadata } from "@/lib/utils"
import { SectionHeader } from "@/components/common/section-header"

export const metadata = constructMetadata({
  title: "Explore - BlogDrop",
  description:
    "Discover engineering articles across AI, Backend, Frontend, DevOps, Cloud, System Design, and more.",
})


async function FeedPage() {

  return (
    <>
      <SectionHeader
        title="Explore"
        description="Discover engineering articles across topics, technologies, and companies."
      >
        
          

        {/* Coming Soon */}
        <div className="row-span-3 flex h-full w-full flex-col items-center justify-center px-8 py-16 text-center sm:py-26 md:py-30">
          <h2 className="text-2xl font-bold sm:text-4xl md:text-5xl">
            Explore is Coming Soon
          </h2>

          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            Browse articles by topic, technology, company, and more. We're building a
            better way to discover high-quality engineering content.
          </p>
        </div>

      </SectionHeader>
    </>
  )
}

export default FeedPage
