import { ensureAuthUser } from '@/lib/auth/get-user'

async function FeedPage() {
  await ensureAuthUser()
  
  return (
    <div>
      feed page
    </div>
  )
}

export default FeedPage
