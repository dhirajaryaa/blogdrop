"use client"

import { motion } from "motion/react"
import {
  IconSparkles, IconLayoutList, IconTrendingUp,
  IconMail, IconSearch, IconBookmark,
} from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"

const solutions = [
  {
    icon: IconSparkles,
    title: "AI Summaries",
    description: "Read key insights in seconds, not minutes. Get the gist before diving deep.",
  },
  {
    icon: IconLayoutList,
    title: "Personalized Feed",
    description: "See only what matters to you. The more you read, the smarter your feed gets.",
  },
  {
    icon: IconTrendingUp,
    title: "Trending Topics",
    description: "Discover the hottest engineering discussions across the entire blogosphere.",
  },
  {
    icon: IconMail,
    title: "Daily Digest",
    description: "A concise daily rundown of the most important engineering content, delivered to you.",
  },
  {
    icon: IconSearch,
    title: "Smart Search",
    description: "Search across hundreds of blogs at once. Find exactly what you need, instantly.",
  },
  {
    icon: IconBookmark,
    title: "Bookmarks",
    description: "Save articles for later. Build your own reference library of engineering wisdom.",
  },
]

export default function SolutionSection() {
  return (
    <section id="features" className="relative py-24 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">The Solution</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            BlogDrop fixes the signal-to-noise problem.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered curation that surfaces the engineering content you actually care about.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group h-full border border-border/30 bg-card/30 hover:bg-card/60 hover:border-primary/20 transition-all duration-300 hover:shadow-glow-lg">
                <CardContent className="p-6">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors shadow-glow-sm">
                    <solution.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
