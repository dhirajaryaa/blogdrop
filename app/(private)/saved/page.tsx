import { constructMetadata } from "@/lib/utils"
import BookmarksContent from "@/components/article/bookmarks-content"
import { ensureAuthUser } from "@/lib/auth/get-user"

export const metadata = constructMetadata({
  title: "Saved - BlogDrop",
  description: "Your saved engineering articles.",
  noIndex: true,
})

async function BookmarksPage() {
  await ensureAuthUser();
  
  return <BookmarksContent />
}

export default BookmarksPage
