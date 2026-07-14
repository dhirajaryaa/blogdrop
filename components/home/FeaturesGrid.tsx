"use client"

import { motion } from "motion/react"
import {
  IconSparkles, IconThumbUp, IconTag,
  IconMail, IconSearch, IconBookmark,
} from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: IconSparkles,
    title: "Understand before you read",
    description: "Every article comes with a quick summary. Know what it covers and decide if it's worth your time — in under 10 seconds.",
  },
  {
    icon: IconThumbUp,
    title: "Gets smarter the more you use it",
    description: "Your feed learns from what you actually read. The articles get more relevant every week, not less.",
  },
  {
    icon: IconTag,
    title: "Follow only what matches your stack",
    description: "Articles are tagged by topic automatically. Filter by Kubernetes, Rust, AI, databases — whatever you work with.",
  },
  {
    icon: IconMail,
    title: "Your morning engineering briefing",
    description: "A curated daily digest with the top articles you shouldn't miss. One email, five minutes, fully caught up.",
  },
  {
    icon: IconSearch,
    title: "That article you read three months ago",
    description: "Full-text search across hundreds of blogs. Find that one post about database indexing you bookmarked and forgot about.",
  },
  {
    icon: IconBookmark,
    title: "Your personal knowledge library",
    description: "Save the best articles and build a collection you can actually find later. No more lost bookmarks in browser history.",
  },
]

export default function FeaturesGrid() {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_bottom,black_30%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Every feature serves a purpose
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for developers who want to stay informed without drowning in content.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="group h-full border border-border/20 bg-card/20 hover:bg-card/50 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg">
                <CardContent className="p-6">
                  <div className="size-12 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center mb-5 group-hover:from-primary/20 group-hover:to-primary/10 group-hover:border-primary/20 transition-all duration-300 shadow-glow-article">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
