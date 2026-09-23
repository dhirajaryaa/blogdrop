import Container from "@/components/common/container"
import GoBackBtn from "@/components/common/go-back"
import Logo from "@/components/common/logo"
import { getCurrentUser } from "@/features/auth/auth.actions"
import InterestSelect from "@/features/onboarding/components/interest-select"
import { redirect } from "next/navigation"

async function OnboardingPage() {
    const user = await getCurrentUser()
    if(!user){
        redirect("/auth/login");
    };
    if(user.onboarded){
        redirect("/feed")
    };
    
    return (
        <main className="relative">
            <Container className="relative flex flex-col gap-8 min-h-svh items-center justify-center py-4">

                {/* Back */}
                <GoBackBtn className="absolute left-4 top-4" />
                {/* onboarding */}
                <div className="w-full max-w-2xl">
                    <div className="flex flex-col items-center text-center">
                        <Logo className="size-8 sm:size-10" />

                        <h1 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
                            What are you interested in?
                        </h1>

                        <p className="text-muted-foreground mt-2 text-xs sm:text-sm ">
                            Select the topics you’d like to read about. You can change these anytime.
                        </p>

                    </div>
                </div>

                {/* list category  */}
                <div className="flex flex-wrap gap-4 px-2 pb-8 items-center justify-center">
                    <InterestSelect />
                </div>
            </Container>
        </main>
    )
}

export default OnboardingPage