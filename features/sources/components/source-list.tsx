import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { VERIFIED_SOURCES } from "@/config/source";

function faviconUrl(siteUrl: string) {
  try {
    const host = new URL(siteUrl).host;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
  } catch {
    return "";
  }
}

function categoryLabel(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SourceList() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mt-16 sm:mt-20">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Sources
        </p>
        <h1 className="mt-4 max-w-xl text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
          The blogs we&apos;re following.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-sm leading-7 sm:text-base">
          {VERIFIED_SOURCES.length} engineering blogs, verified and tracked.
          Articles are collected from their feeds automatically.
        </p>
      </div>

      <div className="mt-16">
        <ol className="divide-border/70 divide-y">
          {VERIFIED_SOURCES.map((source) => (
            <li key={source.id} className="flex items-center gap-4 py-6">
              <Image
                src={faviconUrl(source.siteUrl)}
                alt={source.name}
                width={24}
                height={24}
                loading="lazy"
                className="size-6 shrink-0 rounded-md bg-white object-contain"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{source.name}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {categoryLabel(source.category)}
                </p>
              </div>
              <a
                href={source.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${source.name}`}
                aria-label={`Visit ${source.name}`}
                className="text-muted-foreground hover:text-foreground rounded-lg p-2 transition-colors"
              >
                <IconArrowUpRight size={16} stroke={2} />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SourceList;