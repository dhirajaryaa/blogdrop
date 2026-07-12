// "use client";

import Image from "next/image";
import Link from "next/link";
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";

import { Separator } from "@/components/ui/separator";
import { githubRepoLink, twitterLink } from "@/config/constant";

const footerSections = [
  {
    title: "Product",
    links: [
      { title: "Features", href: "#features" },
      { title: "Trending", href: "/trending" },
      { title: "Bookmarks", href: "/bookmarks" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Engineering Sources", href: "/sources" },
      { title: "Blog", href: "/blog" },
      { title: "RSS Feed", href: "/rss.xml" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "GitHub", href: githubRepoLink },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Disclaimer", href: "/disclaimer" },
      { title: "Cookie Policy", href: "/cookies" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="mt-16 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 border-t">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="BlogDrop"
                width={32}
                height={32}
                className="rounded-lg"
                priority
              />

              <span className="text-lg font-bold tracking-tight">
                BlogDrop
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Read what matters. Skip the noise.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={githubRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <IconBrandGithub className="size-5" />
              </a>

              <a
                href={twitterLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="rounded-lg border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <IconBrandX className="size-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BlogDrop. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Built for developers who love learning.
          </p>
        </div>
      </div>
    </footer>
  );
}