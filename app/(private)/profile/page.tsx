import { ensureAuthUser } from "@/lib/auth/get-user"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"

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
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your profile and content preferences
                </p>
            </div>

            <div className="rounded-2xl border bg-card/60 border-border p-6 sm:p-8">
                <ProfileForm
                    defaultAbout={currentUser.about ?? ""}
                    defaultCategories={userRecord?.categories ?? []}
                    defaultTags={userRecord?.tags ?? []}
                    defaultExperience={currentUser.experienceLevel ?? "mid"}
                />
            </div>
        </div>
    )
}

export default ProfilePage
