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
    title: "AI Summaries",
    description: "Get concise two-sentence summaries of every article. Know if it's worth your time before reading.",
  },
  {
    icon: IconThumbUp,
    title: "Smart Recommendations",
    description: "The more you read, the better your feed gets. Personalized recommendations that improve over time.",
  },
  {
    icon: IconTag,
    title: "Topic Detection",
    description: "Articles are automatically tagged by topic. Filter by Kubernetes, Rust, AI, or any engineering domain.",
  },
  {
    icon: IconMail,
    title: "Daily Digest",
    description: "A curated morning digest with the top 5 engineering articles you shouldn't miss.",
  },
  {
    icon: IconSearch,
    title: "Smart Search",
    description: "Full-text search across hundreds of blogs. Find that article you read three months ago instantly.",
  },
  {
    icon: IconBookmark,
    title: "Bookmarks",
    description: "Build your personal library of engineering knowledge. Organize with tags and collections.",
  },
]

export default function FeaturesGrid() {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 b.bg-\[radial-gradient\(ellipse_at_bottom\,_var\(--tw-gradient-stops\)\)\] {
 background-image: radial-gradient(ellipse at bottom, var(--tw-gradient-stops));
} from-primary/5 via-transparent to-transparent pointer-events-none" />

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
            Everything you need to stay informed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for developers who want to stay on top of engineering trends.
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
