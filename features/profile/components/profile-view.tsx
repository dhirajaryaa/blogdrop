"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconBookmark,
  IconChevronRight,
  IconPencil,
  IconPlus,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ProfileData, ProfileInterest } from "../profile.types";
import {
  addTag,
  removeTag,
  toggleCategory,
  updateProfile,
} from "../profile.actions";

const experienceOptions: { value: string; label: string }[] = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
];

function ProfileView({ data }: { data: ProfileData }) {
  const router = useRouter();
  const { user, interests: initialInterests, tags: initialTags, allCategories, stats } = data;

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [about, setAbout] = useState(user?.about ?? "");
  const [experienceLevel, setExperienceLevel] = useState(
    user?.experienceLevel ?? "mid",
  );

  const [editingInterests, setEditingInterests] = useState(false);
  const [interests, setInterests] = useState<ProfileInterest[]>(initialInterests);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState("");
  const [isToggling, startToggling] = useTransition();

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

  const handleToggleInterest = (slug: string) => {
    startToggling(async () => {
      const selected = interests.some((i) => i.slug === slug);

      setInterests((prev) =>
        selected
          ? prev.filter((i) => i.slug !== slug)
          : [...prev, { slug, name: slug }],
      );

      const res = await toggleCategory(slug);

      if (res.success) {
        router.refresh();
      } else {
        toast.error(res.reason || "Failed to update interests");
        router.refresh();
      }
    });
  };

  const handleAddTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = tagInput.trim();

    if (!value) return;
    if (tags.includes(value)) {
      setTagInput("");
      return;
    }

    setTagInput("");
    setTags((prev) => [...prev, value]);

    startToggling(async () => {
      const res = await addTag(value);

      if (!res.success) {
        toast.error(res.reason || "Failed to add tag");
      }
      router.refresh();
    });
  };

  const handleRemoveTag = (value: string) => {
    setTags((prev) => prev.filter((tag) => tag !== value));

    startToggling(async () => {
      const res = await removeTag(value);

      if (!res.success) {
        toast.error(res.reason || "Failed to remove tag");
      }
      router.refresh();
    });
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
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Your interests
          </p>
          <button
            type="button"
            onClick={() => setEditingInterests((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors"
          >
            <IconPencil size={13} stroke={1.75} />
            {editingInterests ? "Done" : "Edit"}
          </button>
        </div>

        {editingInterests ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {allCategories.map((interest) => {
              const active = interests.some(
                (item) => item.slug === interest.slug,
              );

              return (
                <button
                  key={interest.slug}
                  type="button"
                  onClick={() => handleToggleInterest(interest.slug)}
                  disabled={isToggling}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/80 hover:bg-muted/40 text-muted-foreground",
                  )}
                >
                  {interest.name}
                </button>
              );
            })}
          </div>
        ) : interests.length === 0 ? (
          <p className="text-muted-foreground mt-4 text-sm">
            No interests yet —{" "}
            <button
              type="button"
              onClick={() => setEditingInterests(true)}
              className="text-foreground underline"
            >
              pick a topic
            </button>
            .
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Link
                key={interest.slug}
                href={`/feed?topic=${interest.slug}`}
                className="border-border/80 hover:bg-muted/40 rounded-full border px-4 py-1.5 text-xs transition-colors"
              >
                {interest.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-14">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Your tags
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border-border/80 bg-muted/30 flex items-center gap-1.5 rounded-full border py-1.5 pr-2 pl-4 text-xs"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                disabled={isToggling}
                aria-label={`Remove tag ${tag}`}
                className="text-muted-foreground hover:text-foreground rounded-full p-0.5 transition-colors"
              >
                <IconX size={12} stroke={2} />
              </button>
            </span>
          ))}

          <form
            onSubmit={handleAddTag}
            className="flex items-center gap-1.5 rounded-full border border-dashed py-1.5 pr-2 pl-4"
          >
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag…"
              aria-label="Tag name"
              className="text-xs outline-none placeholder:text-muted-foreground/60"
            />
            <button
              type="submit"
              disabled={isToggling || !tagInput.trim()}
              className="text-muted-foreground hover:text-foreground disabled:opacity-40 rounded-full p-0.5 transition-colors"
              aria-label="Add tag"
            >
              <IconPlus size={12} stroke={2} />
            </button>
          </form>
        </div>

        <p className="text-muted-foreground mt-3 text-xs">
          {tags.length === 0
            ? "Add your own tags to mark the topics you care about."
            : `You've saved ${tags.length} tag${tags.length === 1 ? "" : "s"}.`}
        </p>
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