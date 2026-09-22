import type { Metadata } from "next";
import ProfileView from "@/features/profile/components/profile-view";
import { getProfileData } from "@/features/profile/profile.actions";
import { FeedError } from "@/features/feed/components/feed-list";
import { constructMetadata } from "@/lib/utils";
import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = constructMetadata({
  title: "Profile — BlogDrop",
  description: "Your profile and reading interests on BlogDrop.",
});

export default async function ProfilePage() {
  const result = await getProfileData();

  if (!result.success) {
    return <FeedError />;
  }

  if (!result.data.user) {
    return (
      <Container className="max-w-3xl min-h-screen">
        <div className="mt-10 mb-6 flex flex-col gap-8">
          <div className="max-w-xl">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              Profile
            </p>
            <h1 className="mt-4 text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
              Your profile.
            </h1>
          </div>
        </div>

        <div className="border-border/70 flex flex-col items-start gap-4 border-y py-24">
          <p className="text-base font-medium">You&apos;re not signed in.</p>
          <p className="text-muted-foreground text-sm">
            Log in to view and edit your profile and reading interests.
          </p>
          <Button asChild variant="outline" className="mt-2">
            <Link href="/auth/login">Log in</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="max-w-3xl min-h-screen">
      <ProfileView data={result.data} />
    </Container>
  );
}