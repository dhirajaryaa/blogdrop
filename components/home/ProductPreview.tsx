"use client"

import { motion } from "motion/react"
import { IconSparkles, IconBookmark, IconClock, IconStar } from "@tabler/icons-react"
import GlowBadge from "@/components/common/GlowBadge"

const articles = [
  {
    company: "Netflix",
    title: "Building a Resilient Video Pipeline",
    summary: "Netflix engineers present their approach to building fault-tolerant video processing pipelines that handle millions of streams.",
    tags: ["Architecture", "Streaming", "Resilience"],
    time: "5 min",
  },
  {
    company: "Stripe",
    title: "Scaling Payments Infrastructure",
    summary: "How Stripe scaled their payments infrastructure to handle 3x traffic growth while maintaining 99.99% uptime.",
    tags: ["Fintech", "Scale", "Infrastructure"],
    time: "8 min",
  },
  {
    company: "Cloudflare",
    title: "Edge Computing at 330+ Locations",
    summary: "A deep dive into Cloudflare's edge computing platform running across 330+ locations worldwide.",
    tags: ["Edge", "Serverless", "Network"],
    time: "6 min",
  },
]

export default function ProductPreview() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <GlowBadge className="mb-4 px-3 py-1 text-xs">
            Dashboard Preview
          </GlowBadge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            See BlogDrop in action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A focused reading experience designed for engineers who value their time. No clutter, no noise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden shadow-glow-xl"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/20">
            <div className="size-2.5 rounded-full bg-muted/60" />
            <div className="size-2.5 rounded-full bg-muted/40" />
            <div className="size-2.5 rounded-full bg-muted/20" />
            <span className="text-xs text-muted-foreground ml-2">BlogDrop Dashboard</span>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-48 border-r border-border/30 p-3 space-y-0.5 hidden lg:block bg-muted/10">
              {[
                { icon: IconStar, label: "Feed", count: "42", active: true },
                { icon: IconSparkles, label: "Digest", count: "3", active: false },
                { icon: IconBookmark, label: "Bookmarks", count: "18", active: false },
                { icon: IconClock, label: "History", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                    item.active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="size-3.5" />
                    {item.label}
                  </div>
                  {"count" in item && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted/50">{item.count}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">Your Feed</h3>
                  <p className="text-xs text-muted-foreground">Today&apos;s top picks for you</p>
                </div>
                <GlowBadge className="text-xs px-3 py-0.5 flex items-center gap-1">
                  <IconSparkles className="size-3" />
                  Curated for You
                </GlowBadge>
              </div>

              {articles.map((article, i) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group rounded-xl border border-border/30 bg-card/20 p-4 hover:bg-card/50 hover:border-primary/20 hover:shadow-glow-article transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <div className="size-4 rounded-full bg-linear-to-br from-primary to-primary/50 flex items-center justify-center text-[8px] font-bold text-primary-foreground">
                      {article.company[0]}
                    </div>
                    <span>{article.company}</span>
                    <span>·</span>
                    <span>{article.time} read</span>
                  </div>
                  <h4 className="text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right panel */}
            <div className="lg:w-56 border-l border-border/30 p-4 space-y-5 hidden lg:block bg-muted/5">
              <div>
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Reading Stats
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "Articles read", value: "142" },
                    { label: "This week", value: "23" },
                    { label: "Saved", value: "18" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/30 pt-4">
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Top Sources
                </h4>
                <div className="space-y-2">
                  {["Netflix", "Stripe", "Cloudflare", "AWS"].map((source) => (
                    <div key={source} className="flex items-center gap-2 text-xs">
                      <div className="size-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{source}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
