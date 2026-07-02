import { ensureAuthUser } from "@/lib/auth/get-user"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { IconUser } from "@tabler/icons-react"

async function ProfilePage() {
    const user = await ensureAuthUser()

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your profile and content preferences
                </p>
            </div>

            <div className="rounded-2xl border bg-card/60 border-border p-6 sm:p-8">
                <ProfileForm
                    defaultAbout={user.about ?? ""}
                    defaultInterests={user.userInterests ?? []}
                    defaultExperience={user.experienceLevel ?? "mid"}
                />
            </div>
        </div>
    )
}

export default ProfilePage
