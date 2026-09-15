import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import PreferenceRow from "@/features/settings/components/preference-row";

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
        <SectionLabel>Reading</SectionLabel>
        <div className="divide-border/70 mt-2 divide-y">
          <PreferenceRow
            title="Open articles in reader"
            description="Read inside BlogDrop's distraction-free view instead of the original site."
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
        <div className="divide-border/70 mt-2 divide-y">
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
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          Manage your profile, interests and connected accounts. Sign out is
          handled from your profile.
        </p>
      </div>
    </div>
  );
}