"use client"

import { motion } from "motion/react"
import {
  IconClock, IconLayoutList, IconTrendingUp,
  IconFilter, IconSearch, IconBookmark,
} from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"

const solutions = [
  {
    icon: IconClock,
    title: "Never miss what matters",
    description: "The most important engineering articles surface automatically — no RSS feeds to manage, no tabs to track.",
  },
  {
    icon: IconLayoutList,
    title: "Read only what's relevant",
    description: "Your feed learns from what you read. Over time, you see less noise and more of what actually helps you.",
  },
  {
    icon: IconTrendingUp,
    title: "Discover trending insights",
    description: "See which articles engineers are reading right now. Catch the conversations before they fade.",
  },
  {
    icon: IconFilter,
    title: "Decide in seconds",
    description: "Every article comes with a quick summary. Know if it&apos;s worth your time before you invest a single minute.",
  },
  {
    icon: IconSearch,
    title: "Find anything, instantly",
    description: "Remember that article about database migrations from three months ago? It&apos;s one search away.",
  },
  {
    icon: IconBookmark,
    title: "Build your knowledge library",
    description: "Save the best articles and build a personal reference collection of engineering wisdom you can return to.",
  },
]

export default function SolutionSection() {
  return (
    <section id="features" className="relative py-24 px-4">
      <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_70%)] pointer-events-none" />

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
            One feed. Only the articles worth reading.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BlogDrop collects engineering knowledge from the best sources and helps you understand what&apos;s worth your time — without the overwhelm.
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
