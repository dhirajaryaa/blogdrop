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

type ProfileStats = {
  saved?: number;
  interests?: number;
  following?: number;
};

const experienceOptions = ["Junior", "Mid", "Senior"];

function ProfileView({
  user,
  interests,
  stats,
}: {
  user?: ProfileUser;
  interests: { name: string; slug: string }[];
  stats?: ProfileStats;
}) {
  const { name, email, image, about, experienceLevel, createdAt } = user ?? {};
  const initials = (name || email || "?").slice(0, 2).toUpperCase();
  const memberSince = createdAt ? new Date(createdAt).getFullYear() : null;
  const experience = experienceLevel
    ? experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)
    : null;

  const statItems = [
    { label: "Saved", value: stats?.saved ?? 4 },
    { label: "Interests", value: stats?.interests ?? interests.length },
    { label: "Following", value: stats?.following ?? 12 },
  ];

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

      <div className="divide-border/70 mt-10 grid grid-cols-3 divide-x border-y">
        {statItems.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 py-6">
            <span className="text-xl font-medium tracking-tight">
              {stat.value}
            </span>
            <span className="text-muted-foreground text-xs">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Edit profile
        </p>
        <div className="mt-4 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-muted-foreground mb-2 block text-xs">
                Name
              </label>
              <input
                defaultValue={name ?? ""}
                className="border-border/70 focus:ring-ring/50 h-11 w-full rounded-xl border bg-transparent px-4 text-sm outline-none focus:ring-2"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-muted-foreground mb-2 block text-xs">
                Email
              </label>
              <input
                defaultValue={email ?? ""}
                type="email"
                className="border-border/70 focus:ring-ring/50 h-11 w-full rounded-xl border bg-transparent px-4 text-sm outline-none focus:ring-2"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-muted-foreground mb-2 block text-xs">
              About
            </label>
            <textarea
              defaultValue={about ?? ""}
              rows={3}
              className="border-border/70 focus:ring-ring/50 w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm leading-6 outline-none focus:ring-2"
              placeholder="Tell readers about yourself…"
            />
          </div>

          <div>
            <label className="text-muted-foreground mb-2 block text-xs">
              Experience level
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {experienceOptions.map((option) => {
                const active = option === (experience ?? "Senior");
                return (
                  <button
                    key={option}
                    type="button"
                    className={
                      active
                        ? "border-primary bg-primary text-primary-foreground rounded-full border px-4 py-1.5 text-xs"
                        : "border-border/80 hover:bg-muted/40 rounded-full border px-4 py-1.5 text-xs text-muted-foreground transition-colors"
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium"
          >
            Save changes
          </button>
        </div>
      </div>

      <div className="mt-14">
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