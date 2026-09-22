import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";
import { ThemeSwitch } from "@/components/common/theme-toggle";
import Container from "@/components/common/container";

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
    <Container className="max-w-3xl min-h-screen">
      <div className="mt-10 mb-6 flex flex-col gap-8">
        <div className="max-w-xl">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Settings
          </p>
          <h1 className="mt-4 text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
            Make it yours.
          </h1>
        </div>
      </div>

      <div className="mt-10">
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
        <SectionLabel>Account</SectionLabel>
        <div className="divide-border/70 mt-2 divide-y border-y">
          <a
            href="mailto:request@blogdrop.in"
            className="group flex w-full items-center gap-3 py-5 text-left text-sm"
          >
            <span className="font-medium">Request a source</span>
            <IconChevronRight
              size={16}
              className="text-muted-foreground ml-auto transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="https://github.com/dhirajaryaa/blogdrop/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center gap-3 py-5 text-left text-sm"
          >
            <span className="font-medium">Report a bug</span>
            <IconChevronRight
              size={16}
              className="text-muted-foreground ml-auto transition-transform group-hover:translate-x-0.5"
            />
          </a>
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
    </Container>
  );
}