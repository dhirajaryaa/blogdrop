"use client"

import { IconSearch, IconSparkles, IconBookmark, IconClock } from "@tabler/icons-react"
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

const categories = [
  { label: "AI / ML", active: true },
  { label: "Backend", active: true },
  { label: "Frontend", active: false },
  { label: "DevOps", active: true },
  { label: "Databases", active: false },
  { label: "System Design", active: false },
  { label: "Security", active: false },
  { label: "Performance", active: false },
]

const tags = [
  { label: "React", active: true },
  { label: "TypeScript", active: true },
  { label: "Kubernetes", active: false },
  { label: "PostgreSQL", active: true },
  { label: "Rust", active: false },
  { label: "Next.js", active: false },
  { label: "Docker", active: true },
  { label: "LLMs", active: false },
  { label: "Go", active: false },
  { label: "Redis", active: false },
  { label: "AWS", active: true },
  { label: "GraphQL", active: false },
]

export default function ProductPreview() {
  return (
    <section className="relative pb-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-10">
          {/* <GlowBadge className="mb-4 px-3 py-1 text-xs">
            Dashboard Preview
          </GlowBadge> */}
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Dashboard Preview</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            See BlogDrop in action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A focused reading experience designed for engineers who value their time. No clutter, no noise.
          </p>
        </div>

        <div className="relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden shadow-lg">
          {/* Browser bar */}
          <div className="flex items-center gap-1 px-4 py-3 border-b border-border/30 bg-muted/20">
            <div className="size-2.5 rounded-full bg-red-500" />
            <div className="size-2.5 rounded-full bg-orange-400" />
            <div className="size-2.5 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground ml-6">BlogDrop Dashboard</span>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left sidebar - Categories & Tags */}
            <div className="lg:w-52 border-r border-border/30 p-4 space-y-5 hidden lg:block bg-muted/10">
              {/* Search */}
              <div className="relative">
                <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full h-8 pl-8 pr-3 rounded-lg bg-background border border-border/50 text-xs text-muted-foreground placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <span
                      key={cat.label}
                      className={`text-[10px] px-2 py-1 rounded-full cursor-default transition-colors ${
                        cat.active
                          ? "bg-primary/15 text-primary font-medium"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`text-[10px] px-2 py-1 rounded-full cursor-default transition-colors ${
                        tag.active
                          ? "bg-primary/15 text-primary font-medium"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main feed */}
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

              {articles.map((article) => (
                <div
                  key={article.title}
                  className="group rounded-xl border border-border/30 bg-card/20 p-4 hover:bg-card/50 hover:border-primary/20 hover:shadow-glow-article/70 transition-all duration-300"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
