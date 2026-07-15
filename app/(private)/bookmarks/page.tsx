import { constructMetadata } from "@/lib/utils"
import BookmarksContent from "@/components/article/bookmarks-content"

export const metadata = constructMetadata({
  title: "Bookmarks - BlogDrop",
  description: "Your saved engineering articles.",
  noIndex: true,
})

function BookmarksPage() {
  return <BookmarksContent />
}

export default BookmarksPage
