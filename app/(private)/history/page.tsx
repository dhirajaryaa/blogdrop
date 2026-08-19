
import { ComingSoon } from "@/components/common/coming-soon"
import { SectionHeader } from "@/components/common/section-header"
import { constructMetadata } from "@/lib/utils"


export const metadata = constructMetadata({
  title: "Reading History - BlogDrop",
  description: "Your reading history on BlogDrop.",
  noIndex: true,
})

async function FeedPage() {

  return (
    <>
      <SectionHeader title="Reading History" description="Your reading history on BlogDrop.">
       
          <ComingSoon />
        
      </SectionHeader>
    </>
  )
}

export default FeedPage
