"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconBookmark,
  IconChevronRight,
  IconPencil,
  IconSettings,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileData } from "../profile.types";
import { updateProfile } from "../profile.actions";

const experienceOptions: { value: string; label: string }[] = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
];

function ProfileView({ data }: { data: ProfileData }) {
  const router = useRouter();
  const { user, interests, stats } = data;

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [about, setAbout] = useState(user?.about ?? "");
  const [experienceLevel, setExperienceLevel] = useState(
    user?.experienceLevel ?? "mid",
  );

  const initials = (user?.name || user?.email || "?").slice(0, 2).toUpperCase();
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : null;
  const experience = experienceLevel
    ? experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)
    : null;

  const statItems = [
    { label: "Saved", value: stats.saved },
    { label: "Interests", value: stats.interests },
    { label: "Following", value: stats.following },
  ];

  const handleOpenEdit = () => {
    setName(user?.name ?? "");
    setAbout(user?.about ?? "");
    setExperienceLevel(user?.experienceLevel ?? "mid");
    setEditing(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);

    try {
      const res = await updateProfile({
        name: name.trim(),
        about: about.trim(),
        experienceLevel: experienceLevel as "junior" | "mid" | "senior",
      });

      if (!res.success) {
        toast.error(res.reason || "Failed to update profile");
        return;
      }

      toast.success("Profile updated");
      setEditing(false);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update profile";
      toast.error(message);
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:gap-6">
        <Avatar size="lg">
          <AvatarImage src={user?.image ?? undefined} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>

        <div className="mt-4 flex-1 sm:mt-0">
          <h1 className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
            {user?.name || "Reader"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{user?.email}</p>
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

        {user && (
          <button
            type="button"
            onClick={handleOpenEdit}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-4 flex items-center gap-2 self-start rounded-xl border px-4 py-2 text-sm transition-colors sm:mt-0 sm:self-center"
          >
            <IconPencil size={16} stroke={1.75} />
            Edit profile
          </button>
        )}
      </div>

      {about && (
        <p className="text-muted-foreground mt-8 max-w-xl text-sm leading-7">
          {about}
        </p>
      )}

      <div className="divide-border/70 mt-10 grid grid-cols-3 divide-x border-y">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 py-6"
          >
            <span className="text-xl font-medium tracking-tight">
              {stat.value}
            </span>
            <span className="text-muted-foreground text-xs">{stat.label}</span>
          </div>
        ))}
      </div>

      {editing && user && (
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              Edit profile
            </p>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Cancel
            </button>
          </div>
          <div className="mt-4 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-muted-foreground mb-2 block text-xs">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-border/70 focus:ring-ring/50 h-11 w-full rounded-xl border bg-transparent px-4 text-sm outline-none focus:ring-2"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-muted-foreground mb-2 block text-xs">
                  Email
                </label>
                <input
                  value={user.email ?? ""}
                  type="email"
                  readOnly
                  disabled
                  className="border-border/70 h-11 w-full cursor-not-allowed rounded-xl border bg-muted/40 px-4 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-muted-foreground mb-2 block text-xs">
                About
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
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
                  const active = experienceLevel === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setExperienceLevel(option.value)}
                      className={
                        active
                          ? "border-primary bg-primary text-primary-foreground rounded-full border px-4 py-1.5 text-xs"
                          : "border-border/80 hover:bg-muted/40 rounded-full border px-4 py-1.5 text-xs text-muted-foreground transition-colors"
                      }
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
            >
              {saving && (
                <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              Save changes
            </button>
          </div>
        </div>
      )}

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
            <IconBookmark
              size={18}
              stroke={1.75}
              className="text-muted-foreground"
            />
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
            <IconSettings
              size={18}
              stroke={1.75}
              className="text-muted-foreground"
            />
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