import Link from "next/link";
import Image from "next/image";
import { IconBookmark, IconSearch } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TopbarUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export function Topbar({ user }: { user?: TopbarUser }) {
  const initials = (user?.name || user?.email || "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="bg-background/80 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6 sm:px-10">
        <Link href="/" className="flex items-center lg:hidden">
          <Image
            src="/logo.png"
            alt="BlogDrop"
            width={26}
            height={26}
            loading="lazy"
            className="rounded-lg"
          />
        </Link>

        <button
          type="button"
          className="text-muted-foreground flex h-9 w-full max-w-sm items-center gap-2 rounded-xl border px-3 text-sm transition-colors hover:bg-muted/50"
        >
          <IconSearch size={16} stroke={1.75} />
          <span className="text-muted-foreground/80">Search articles…</span>
          <kbd className="font-mono text-muted-foreground/70 ml-auto hidden rounded-md bg-muted px-1.5 py-0.5 text-[10px] sm:block">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-3">
          <Link
            href="/saved"
            title="Saved"
            aria-label="Saved"
            className="text-muted-foreground hover:text-foreground hidden rounded-xl p-2 transition-colors sm:flex"
          >
            <IconBookmark size={19} stroke={1.75} />
          </Link>

          <Link href="/profile" title="Profile" aria-label="Profile">
            <Avatar size="sm">
              <AvatarImage src={user?.image ?? undefined} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}