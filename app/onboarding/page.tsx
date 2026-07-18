import { OnboardingForm } from "@/components/onboard/onboarding-form";
import { constructMetadata } from "@/lib/utils"
import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({
  title: "Onboarding - BlogDrop",
  description: "Setup your BlogDrop feed.",
  noIndex: true,
})

async function OnboardingPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login")
  if (user.onboarded) redirect("/feed");

  return (
    <div className="max-w-2xl mx-auto py-8">
      <OnboardingForm />
    </div>
  )
}

export default OnboardingPage;
