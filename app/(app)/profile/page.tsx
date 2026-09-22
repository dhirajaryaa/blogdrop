import type { Metadata } from "next";
import ProfileView from "@/features/profile/components/profile-view";
import { getProfileData } from "@/features/profile/profile.actions";
import { FeedError } from "@/features/feed/components/feed-list";
import { constructMetadata } from "@/lib/utils";
import Container from "@/components/common/container";

export const metadata: Metadata = constructMetadata({
  title: "Profile — BlogDrop",
  description: "Your profile and reading interests on BlogDrop.",
});

export default async function ProfilePage() {
  const result = await getProfileData();

  if (!result.success) {
    return <FeedError />;
  }

  return (
    <Container className="max-w-3xl min-h-screen">
      <ProfileView data={result.data} />
    </Container>
  );
}