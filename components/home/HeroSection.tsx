"use client"

import { motion } from "motion/react"
import { IconArrowRight, IconStar, IconBookmark, IconTrendingUp, IconClock, IconSparkles2, IconBrandNetflix, IconCar, IconBrandStripe, IconCloud, IconBrandAws, IconBrandGithub, IconBrandMeta, IconBrandSpotify, IconBrandX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import GlowBadge from "@/components/common/GlowBadge"
import { earlyAccessFormLink } from "@/config/constant"
import Link from "next/link"

const trendingTopics = [
  "System Design", "Kubernetes", "Rust", "AI/ML", "Performance"
]

const topArticles = [
  {
    company: "Netflix",
    title: "Building a Resilient Video Pipeline",
    time: "5 min",
    tags: ["Architecture", "Streaming"],
  },
  {
    company: "Stripe",
    title: "Scaling Payments Infrastructure",
    time: "8 min",
    tags: ["Fintech", "Scale"],
  },
  {
    company: "Cloudflare",
    title: "Edge Computing at 330+ Locations",
    time: "6 min",
    tags: ["Edge", "Network"],
  },
]

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 md:pb-24 px-4">
      <div className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_bottom_left,black_30%,transparent_70%)] pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[10%] size-72 rounded-full bg-primary/8 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-48 right-[8%] size-56 rounded-full bg-primary/6 blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 left-[20%] size-40 rounded-full bg-primary/5 blur-[60px] pointer-events-none"
      />

      {/* Floating company badges */}
      {[
        { icon: IconBrandNetflix, label: "Netflix", top: "18%", left: "8%", y: [0, -20, 0], dur: 6, delay: 0 },
        { icon: IconCar, label: "Uber", top: "25%", right: "6%", y: [0, 18, 0], dur: 7, delay: 0.5 },
        { icon: IconBrandStripe, label: "Stripe", top: "55%", left: "5%", y: [0, -15, 0], dur: 8, delay: 1 },
        { icon: IconBrandGithub, label: "GitHub", top: "15%", right: "15%", y: [0, 22, 0], dur: 6.5, delay: 1.5 },
        { icon: IconCloud, label: "Cloudflare", top: "60%", right: "8%", y: [0, -18, 0], dur: 7.5, delay: 2 },
        { icon: IconBrandAws, label: "AWS", top: "70%", left: "12%", y: [0, 16, 0], dur: 8.5, delay: 0.8 },
        { icon: IconBrandMeta, label: "Meta", top: "40%", left: "3%", y: [0, -22, 0], dur: 9, delay: 2.5 },
        { icon: IconBrandSpotify, label: "Spotify", top: "45%", right: "4%", y: [0, 14, 0], dur: 7, delay: 1.2 },
        { icon: IconBrandX, label: "X", top: "75%", right: "18%", y: [0, -16, 0], dur: 8, delay: 3 },
        { icon: IconBrandNetflix, label: "Netflix", top: "80%", left: "22%", y: [0, 20, 0], dur: 6, delay: 0.3 },
      ].map((item) => (
        <motion.div
          key={`${item.label}-${item.top}-${item.left ?? item.right}`}
          animate={{ y: item.y, opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: item.dur, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
          className="absolute flex items-center justify-center size-10 rounded-xl border border-border/30 bg-card/40 backdrop-blur-sm shadow-glow-sm pointer-events-none hidden lg:flex"
          style={{ top: item.top, left: item.left, right: item.right }}
        >
          <item.icon className="size-5 text-muted-foreground" />
        </motion.div>
      ))}

      {/* Grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full flex flex-col items-center text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-6 mt-10"
        >
          <GlowBadge className="py-3 px-5 text-xs font-medium [&>svg]:size-5!">
            <IconSparkles2 className="" />
            Engineering Knowledge, Curated for You
          </GlowBadge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6 bg-linear-to-b from-foreground to-foreground/70 bg-clip-text"
        >
          The Best Engineering
          <br />
          <span className="bg-linear-to-r from-primary to-primary/50 bg-clip-text text-transparent">Content is Already Out There.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          BlogDrop curates articles from the world&apos;s top engineering teams — so you can stay informed without the overwhelm. One feed, only what matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Button size="lg" className="h-12 px-6 text-base rounded-xl bg-primary text-primary-foreground hover:bg-primary/80 shadow-glow hover:shadow-glow-lg transition-shadow duration-300" asChild>
            <Link href="/feed">
              Go to Feed
              <IconArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-6 text-base rounded-xl border-border hover:bg-muted/50 hover:shadow-glow-foreground transition-shadow duration-300" asChild>
            <a href={earlyAccessFormLink} target="_blank">
              Get Early Access
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-glow-xl">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-56 border-r border-border/50 p-4 space-y-1 hidden lg:block">
                {[
                  { icon: IconStar, label: "Feed", active: true },
                  { icon: IconTrendingUp, label: "Trending", active: false },
                  { icon: IconBookmark, label: "Bookmarks", active: false },
                  { icon: IconClock, label: "Digest", active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${item.active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="flex-1 p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Your Feed</h3>
                  <GlowBadge className="text-xs px-3 py-0.5">
                    Curated for You
                  </GlowBadge>
                </div>

                {topArticles.map((article, i) => (
                  <div
                    key={i}
                    className="group rounded-xl border border-border/40 bg-card/30 p-4 hover:bg-card/60 transition-all hover:border-primary/20 hover:shadow-glow-article"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="size-5 rounded-full bg-linear-to-br from-primary to-primary/50 flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-glow-xs">
                          {article.company[0]}
                        </div>
                        <span className="text-xs text-muted-foreground">{article.company}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{article.time}</span>
                      </div>
                      <IconBookmark className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="text-sm font-medium text-foreground mb-2">{article.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      Quick summary: Key architectural decisions and engineering insights from their latest infrastructure improvements.
                    </p>
                    <div className="flex items-center gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:w-56 border-l border-border/50 p-4 space-y-4 hidden lg:block">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Trending Topics</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {trendingTopics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border/50 pt-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Reading Streak</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">12</span>
                    <span className="text-xs text-muted-foreground">days</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                    <div className="h-full w-2/3 rounded-full bg-linear-to-r from-primary to-primary/50 shadow-glow-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
