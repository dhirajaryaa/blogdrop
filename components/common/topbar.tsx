import Link from "next/link";
import Image from "next/image";
import { IconBookmark, IconSearch } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

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
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-6 sm:px-10">
        <Link href="/" className="flex items-center md:hidden min-w-8 h-8">
          <Image
            src="/logo.png"
            alt="BlogDrop"
            width={26}
            height={26}
            loading="lazy"
            className="rounded-lg size-8 object-contain"
          />
        </Link>

        {/* search  */}
        <div className="relative w-full max-w-sm">
          <IconSearch
            size={16}
            stroke={1.75}
            className="text-muted-foreground/70 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="search"
            aria-label="Search articles"
            placeholder="Search articles…"
            className="text-muted-foreground flex h-9 w-full max-w-sm items-center gap-2 rounded-xl border bg-transparent px-3 pl-9 text-sm transition-colors placeholder:text-muted-foreground/80 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
          <kbd className="font-mono text-muted-foreground/70 absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded-md bg-muted px-1.5 py-0.5 text-[10px] sm:block">
            ⌘ K
          </kbd>
        </div>

        <div className="flex items-center gap-3">

          {/* saved  */}
          <Link
            href="/saved"
            title="Saved"
            aria-label="Saved"
            className="text-muted-foreground hover:text-foreground hidden rounded-xl p-2 transition-colors sm:flex"
          >
            <IconBookmark size={19} stroke={1.75} />
          </Link>

          {/* theme  */}
          <ThemeToggle />

          {/* profile / login */}
          {user ? (
            <Link href="/profile" title="Profile" aria-label="Profile">
              <Avatar>
                <AvatarImage src={user.image ?? undefined} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({
                  size: "default",
                  className: "rounded-xl px-4 text-sm font-normal",
                }),
              )}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}