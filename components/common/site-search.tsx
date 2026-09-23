"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowUpRight,
  IconFileText,
  IconSearch,
  type IconProps,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { navGroups, type NavigationItem } from "@/config/navigation";
import {
  getSearchIndexArticles,
  type SearchIndexArticle,
} from "@/features/search/search.actions";

type SearchItem = {
  id: string;
  kind: "page" | "article";
  label: string;
  description?: string;
  href: string;
  Icon?: React.ComponentType<IconProps>;
};

const pageItems: SearchItem[] = [
  { id: "page-/", kind: "page", label: "Home", description: "Landing", href: "/" },
  ...navGroups.flatMap((group) =>
    group.items.map((item: NavigationItem) => ({
      id: `page-${item.href}`,
      kind: "page" as const,
      label: item.label,
      description: group.label,
      href: item.href,
      Icon: item.icon as React.ComponentType<IconProps>,
    })),
  ),
];

const MAX_VISIBLE = 8;

function SiteSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [articles, setArticles] = useState<SearchItem[]>([]);

  const trimmed = query.trim();

  //* load article headings once, then fuse matches locally
  useEffect(() => {
    let alive = true;

    getSearchIndexArticles().then((res) => {
      if (!alive) return;
      if (res.success) {
        setArticles(
          res.data.map((a: SearchIndexArticle, i: number) => ({
            id: `article-${a.slug}`,
            kind: "article",
            label: a.title,
            description: a.sourceName,
            href: `/a/${a.slug}`,
            Icon: i % 2 === 0 ? IconFileText : undefined,
          })),
        );
      }
    });

    return () => {
      alive = false;
    };
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse<SearchItem>([...pageItems, ...articles], {
        keys: [
          { name: "label", weight: 0.75 },
          { name: "description", weight: 0.25 },
        ],
        threshold: 0.35,
        minMatchCharLength: 1,
        ignoreLocation: true,
      }),
    [articles],
  );

  const results = useMemo(() => {
    if (trimmed.length < 1) return [];
    return fuse.search(trimmed, { limit: MAX_VISIBLE }).map((r) => r.item);
  }, [fuse, trimmed]);

  //* cmd/ctrl + k focuses the search box
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  //* close on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const go = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "Enter") {
      const item = results[active];
      if (item) go(item);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full max-w-sm">
      <IconSearch
        size={16}
        stroke={1.75}
        className="text-muted-foreground/70 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
      />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(e.target.value.length > 0);
          setActive(0);
        }}
        onFocus={() => query.length > 0 && setOpen(true)}
        onKeyDown={onKeyDown}
        aria-label="Search site"
        placeholder="Search pages and articles…"
        className="text-muted-foreground focus:ring-ring/50 flex h-9 w-full max-w-sm items-center gap-2 rounded-xl border bg-transparent px-3 pl-9 text-sm transition-colors outline-none placeholder:text-muted-foreground/80 hover:bg-muted/50 focus:ring-2"
      />
      <kbd className="font-mono text-muted-foreground/70 absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded-md bg-muted px-1.5 py-0.5 text-[10px] sm:block">
        ⌘ K
      </kbd>

      {open && (
        <div className="bg-background shadow-muted shadow-xl absolute top-11 right-0 left-0 z-30 overflow-hidden rounded-xl">
          {trimmed.length === 0 ? (
            <p className="text-muted-foreground px-4 py-3 text-sm">
              Type to search pages and articles…
            </p>
          ) : results.length === 0 ? (
            <p className="text-muted-foreground px-4 py-3 text-sm">
              No results for “{trimmed}”.
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1.5">
              {results.map((item, idx) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => go(item)}
                    onMouseEnter={() => setActive(idx)}
                    className={cn(
                      "flex items-start gap-3 px-3 py-2.5 transition-colors",
                      idx === active && "bg-muted/50",
                    )}
                  >
                    <span className="bg-muted text-muted-foreground mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg">
                      {item.Icon ? (
                        <item.Icon size={15} stroke={1.75} />
                      ) : (
                        <IconArrowUpRight size={15} />
                      )}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="line-clamp-1 text-sm font-medium">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-muted-foreground/80 text-xs">
                          {item.description}
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground/70 mt-1 text-[10px] tracking-wide uppercase">
                      {item.kind}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t bg-muted/30 flex items-center gap-3 px-3 py-1.5 text-[10px] text-muted-foreground/70">
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-background px-1 font-mono">↑</kbd>
              <kbd className="rounded bg-background px-1 font-mono">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-background px-1 font-mono">↵</kbd>
              open
            </span>
            <IconArrowUpRight size={11} className="ml-auto" stroke={1.75} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SiteSearch;