import { ensureAuthUser } from "@/lib/auth/get-user"
import { constructMetadata } from "@/lib/utils"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { SectionHeader } from "@/components/common/section-header"

export const metadata = constructMetadata({
    title: "Profile - BlogDrop",
    description: "Manage your BlogDrop profile.",
    noIndex: true,
})

async function ProfilePage() {
    const currentUser = await ensureAuthUser()

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
                        defaultCategories={currentUser?.categories ?? []}
                        defaultTags={currentUser?.tags ?? []}
                        defaultExperience={currentUser.experienceLevel ?? "mid"}
                    />
                </section>
            </SectionHeader>
        </>
    )
}

export default ProfilePage
