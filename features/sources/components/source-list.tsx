import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { SourceItem } from "../sources.types";

function faviconUrl(siteUrl: string | null) {
  if (!siteUrl) return "";
  try {
    const host = new URL(siteUrl).host;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
  } catch {
    return "";
  }
}

function SourceList({ sources }: { sources: SourceItem[] }) {
  return (
    <>
      <div className="mt-10 mb-6 flex flex-col gap-8">
        <div className="max-w-xl">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Sources
          </p>
          <h1 className="mt-4 text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
            The blogs we&apos;re following.
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-7 sm:text-base">
            {sources.length} engineering blogs, verified and tracked. Articles
            are collected from their feeds automatically.
          </p>
        </div>
      </div>

      {sources.length === 0 ? (
        <div className="border-border/70 flex flex-col items-start gap-3 border-y py-24">
          <p className="text-base font-medium">No sources yet.</p>
          <p className="text-muted-foreground text-sm">
            Engineering blogs will appear here once they&apos;re added.
          </p>
        </div>
      ) : (
        <ol className="divide-border/70 divide-y">
          {sources.map((source) => (
            <li key={source.id} className="group flex items-center gap-4 py-6">
              <Link
                href={`/sources/${source.id}`}
                className="flex min-w-0 flex-1 items-center gap-4"
              >
                <Image
                  src={faviconUrl(source.siteUrl)}
                  alt={source.title}
                  width={24}
                  height={24}
                  loading="lazy"
                  className="size-6 shrink-0 rounded-md bg-white object-contain"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {source.title}
                  </span>
                  <span className="text-muted-foreground mt-0.5 block text-xs">
                    {source.articleCount} article
                    {source.articleCount === 1 ? "" : "s"}
                  </span>
                </span>
              </Link>
              <a
                href={source.siteUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${source.title}`}
                aria-label={`Visit ${source.title}`}
                className="text-muted-foreground hover:text-foreground rounded-lg p-2 transition-colors"
              >
                <IconArrowUpRight size={16} stroke={2} />
              </a>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

export default SourceList;