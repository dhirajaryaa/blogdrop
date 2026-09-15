import type { Metadata } from "next";
import ProfileView from "@/features/profile/components/profile-view";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Profile — BlogDrop",
  description: "Your profile and reading interests on BlogDrop.",
});

const demoUser = {
  name: "Dhiraj Arya",
  email: "dhirajarya.ptn@gmail.com",
  image: null as string | null,
  about:
    "Senior engineer. Building developer tools and reading every engineering blog I can get my hands on.",
  experienceLevel: "senior",
  createdAt: "2024-09-01",
};

const demoInterests = [
  { name: "Databases", slug: "database" },
  { name: "Distributed Systems", slug: "distributed-systems" },
  { name: "Platform Engineering", slug: "platform-engineering" },
  { name: "AI", slug: "ai" },
  { name: "Networking", slug: "networking" },
];

export default function ProfilePage() {
  return <ProfileView user={demoUser} interests={demoInterests} />;
}