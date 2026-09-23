import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IconArrowRight,
  IconCompass,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";

function Hero() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden py-16 sm:py-24">
      {/* soft radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 45% at 50% -5%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)",
        }}
      />
      {/* masked grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--foreground) 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 10%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 20%, #000 20%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 20%, #000 20%, transparent 78%)",
        }}
      />
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="text-muted-foreground border-border/70 bg-muted/40 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
          <IconSparkles size={13} stroke={1.75} />
          Curated engineering stories, hand-picked daily
        </span>

        <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl ">
          Discover better
          <br />
          <span className="text-transparent [background:linear-gradient(120deg,var(--foreground),var(--muted-foreground))_text]">
            engineering articles.
          </span>
        </h1>

        <p className="text-muted-foreground max-w-xl text-sm leading-7 sm:text-base">
          BlogDrop collects the best technical writing from the teams building
          the web — and feeds them to you in one personalized stream.
        </p>

        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="h-10 gap-2 rounded-xl text-sm" asChild>
            <Link href="/feed">
              Start reading <IconArrowRight stroke={2} size={16} />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-10 gap-2 rounded-xl text-sm"
            asChild
          >
            <Link href="/explore">
              <IconCompass stroke={1.75} size={16} /> Explore articles
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-14 flex w-full flex-col items-center gap-6">
        <div className="search-demo text-muted-foreground border-border/70 bg-muted/30 flex w-full max-w-md items-center gap-3 rounded-xl border px-4 py-3 text-sm">
          <IconSearch size={16} stroke={1.75} />
          <span className="truncate">Try searching for “storage”, “LLMs”…</span>
          <kbd className="font-mono ml-auto rounded-md border px-1.5 py-0.5 text-[10px]">
            ⌘ K
          </kbd>
        </div>
      </div>
    </section>
  );
}

export default Hero;