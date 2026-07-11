import { OnboardingForm } from "@/components/onboard/onboarding-form";
import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

async function OnboardingPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login")
  if (user.onboarded) redirect("/feed");

  return (
    <div className="max-w-2xl mx-auto py-8">
      <OnboardingForm />
    </div>
  )
}

export default OnboardingPage;
