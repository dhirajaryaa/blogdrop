import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";
import PreferenceRow from "@/features/settings/components/preference-row";
import { ThemeSwitch } from "@/components/common/theme-toggle";

export const metadata: Metadata = constructMetadata({
  title: "Settings — BlogDrop",
  description: "Manage your reading preferences on BlogDrop.",
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
      {children}
    </p>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mt-16 sm:mt-20">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Settings
        </p>
        <h1 className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
          Make it yours.
        </h1>
      </div>

      <div className="mt-16">
        <SectionLabel>Appearance</SectionLabel>
        <div className="border-border/70 mt-2 border-y">
          <div className="flex items-center justify-between gap-6 py-5">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                Choose between a light or dark reading experience.
              </p>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <SectionLabel>Reading</SectionLabel>
        <div className="divide-border/70 mt-2 divide-y border-y">
          <PreferenceRow
            title="Open AI brief first"
            description="Open the AI summary view in BlogDrop instead of jumping straight to the original site."
            defaultPressed
          />
          <PreferenceRow
            title="Show reading time"
            description="Display an estimated reading time on every article."
            defaultPressed
          />
          <PreferenceRow
            title="Show difficulty"
            description="Mark articles as junior, mid or senior level."
            defaultPressed
          />
        </div>
      </div>

      <div className="mt-12">
        <SectionLabel>Notifications</SectionLabel>
        <div className="divide-border/70 mt-2 divide-y border-y">
          <PreferenceRow
            title="Daily digest email"
            description="A short summary of new articles, delivered each morning."
            defaultPressed
          />
          <PreferenceRow
            title="New source alerts"
            description="Let me know when new engineering blogs are added."
          />
        </div>
      </div>

      <div className="mt-12">
        <SectionLabel>Account</SectionLabel>
        <div className="divide-border/70 mt-2 divide-y border-y">
          <button
            type="button"
            className="group flex w-full items-center gap-3 py-5 text-left text-sm"
          >
            <span className="font-medium">Edit profile</span>
            <IconChevronRight
              size={16}
              className="text-muted-foreground ml-auto transition-transform group-hover:translate-x-0.5"
            />
          </button>
          <button
            type="button"
            className="group flex w-full items-center gap-3 py-5 text-left text-sm"
          >
            <span className="text-destructive font-medium">Delete account</span>
            <IconChevronRight
              size={16}
              className="text-muted-foreground ml-auto transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
        <p className="text-muted-foreground mt-4 text-xs leading-5">
          Deleting your account permanently removes your saved articles and
          reading preferences.
        </p>
      </div>
    </div>
  );
}