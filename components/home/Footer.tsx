"use client"

import Link from "next/link"
import { IconBrandTabler, IconBrandGithub, IconBrandX } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import { githubRepoLink, twitterLink } from "@/config/constant"

const footerLinks = {
  Product: ["Features", "Roadmap", "Pricing"],
  Resources: ["Blog", "Sources", "Documentation"],
  Company: ["GitHub", "Twitter", "Contact"],
}

export default function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="size-7 rounded-lg bg-linear-to-br from-primary to-primary/50 flex items-center justify-center shadow-glow-sm">
                <IconBrandTabler className="size-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight">BlogDrop</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              One feed for every engineering blog. AI-powered curation for developers who value their time.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-border/20" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BlogDrop. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={githubRepoLink} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <IconBrandGithub className="size-4" />
            </a>
            <a href={twitterLink} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <IconBrandX className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
