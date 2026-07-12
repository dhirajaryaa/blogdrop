import { ensureAuthUser } from "@/lib/auth/get-user"
import { constructMetadata } from "@/lib/utils"

export const metadata = constructMetadata({
  title: "Profile - BlogDrop",
  description: "Manage your BlogDrop profile.",
  noIndex: true,
})
import { ProfileForm } from "@/components/profile/ProfileForm"
import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { SectionHeader } from "@/components/common/section-header"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner"
import { githubRepoLink } from "@/config/constant"
import { IconBrandGithub } from "@tabler/icons-react"

async function ProfilePage() {
    const currentUser = await ensureAuthUser()
    const [userRecord] = await db
        .select({
            categories: user.categories,
            tags: user.tags,
        })
        .from(user)
        .where(eq(user.id, currentUser.id))

    return (
        <>
            <SectionHeader
                title="Profile"
                description="Manage your profile and content preferences."
                className="max-w-3xl mx-auto"
            >
                <section>
                    <ProfileForm
                        defaultAbout={currentUser.about ?? ""}
                        defaultCategories={userRecord?.categories ?? []}
                        defaultTags={userRecord?.tags ?? []}
                        defaultExperience={currentUser.experienceLevel ?? "mid"}
                    />
                </section>
            </SectionHeader>
        </>
    )
}

export default ProfilePage
