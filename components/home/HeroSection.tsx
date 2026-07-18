"use client"

import Link from "next/link"
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { githubRepo } from "@/config/constant"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-18 ">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-30 bg-linear-to-br from-primary/12 via-background to-primary/5 dark:from-primary/15 dark:via-background dark:to-primary/8 mask-y-from-60% " />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.04] dark:opacity-[0.06] mask-y-from-60% mask-x-from-60% "
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Primary glow blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-100 bg-primary/8 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/12 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/5 w-64 h-64 bg-primary/6 rounded-full blur-[80px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 text-center">
        <Badge className="mb-4 text-xs sm:text-sm py-2 px-4 h-7 bg-primary/80 shadow-glow-sm">
          ✨ Read Smarter, Not More
        </Badge>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold capitalize tracking-tight mb-6 leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Great <span className="text-primary font-extrabold">engineering articles</span>
          <br />
          don&apos;t have to be <span className="text-primary font-extrabold">hard</span> to find.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Stop digging through Twitter, Reddit, and newsletters. We bring the best engineering content to one place — summarized, sorted, and ready to read.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="h-11 px-6 text-sm rounded-xl" asChild>
            <Link href="/feed">
              Go to Feed
              <IconArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-6 text-sm rounded-xl" asChild>
            <a               href={githubRepo} target="_blank">
              <IconBrandGithub className="size-4 mr-2" />
              Open Source
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
