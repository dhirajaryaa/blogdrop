import Link from "next/link";
import {
  IconBookmark,
  IconChevronRight,
  IconSettings,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  about?: string | null;
  experienceLevel?: string | null;
  createdAt?: Date | string | null;
};

function ProfileView({
  user,
  interests,
}: {
  user?: ProfileUser;
  interests: { name: string; slug: string }[];
}) {
  const { name, email, image, about, experienceLevel, createdAt } = user ?? {};
  const initials = (name || email || "?").slice(0, 2).toUpperCase();
  const memberSince = createdAt ? new Date(createdAt).getFullYear() : null;
  const experience = experienceLevel
    ? experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)
    : null;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mt-16 flex flex-col sm:mt-20 sm:flex-row sm:items-center sm:gap-6">
        <Avatar size="lg">
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>

        <div className="mt-4 sm:mt-0">
          <h1 className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
            {name || "Reader"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{email}</p>
          <div className="mt-3 flex items-center gap-2">
            {memberSince && (
              <span className="text-muted-foreground text-xs">
                Member since {memberSince}
              </span>
            )}
            {experience && (
              <>
                <span className="bg-border/70 h-3 w-px" />
                <span className="text-muted-foreground text-xs">
                  {experience} level
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {about && (
        <p className="text-muted-foreground mt-8 max-w-xl text-sm leading-7">
          {about}
        </p>
      )}

      <div className="mt-12">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Your interests
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {interests.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No interests yet —{" "}
              <Link href="/explore" className="text-foreground underline">
                pick a topic
              </Link>
              .
            </p>
          ) : (
            interests.map((interest) => (
              <Link
                key={interest.slug}
                href={`/feed?topic=${interest.slug}`}
                className="border-border/80 hover:bg-muted/40 rounded-full border px-4 py-1.5 text-xs transition-colors"
              >
                {interest.name}
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="mt-16 border-t">
        <div className="divide-border/70 divide-y">
          <Link
            href="/saved"
            className="group flex items-center gap-3 py-5 text-sm"
          >
            <IconBookmark size={18} stroke={1.75} className="text-muted-foreground" />
            <span className="font-medium">Saved articles</span>
            <IconChevronRight
              size={16}
              className="text-muted-foreground ml-auto transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/settings"
            className="group flex items-center gap-3 py-5 text-sm"
          >
            <IconSettings size={18} stroke={1.75} className="text-muted-foreground" />
            <span className="font-medium">Settings</span>
            <IconChevronRight
              size={16}
              className="text-muted-foreground ml-auto transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;