"use client"

import { motion } from "motion/react"
import { IconMessageCircle, IconNews, IconHash, IconMail, IconBrowser, IconAlertTriangle } from "@tabler/icons-react"

const problems = [
  {
    icon: IconMessageCircle,
    title: "Twitter threads vanish overnight",
    description: "That brilliant thread on distributed systems? Buried under memes by morning. No way to save or find it again.",
  },
  {
    icon: IconNews,
    title: "Hacker News moves too fast",
    description: "Great articles hit the front page for a few hours, then disappear forever. If you missed it, you missed it.",
  },
  {
    icon: IconHash,
    title: "Reddit is a rabbit hole",
    description: "You came for one post on system design. Two hours later you&apos;re reading about something completely unrelated.",
  },
  {
    icon: IconMail,
    title: "Newsletters pile up unread",
    description: "You subscribed to five engineering newsletters. Now you have 200 unread emails and zero guilt about deleting them all.",
  },
  {
    icon: IconBrowser,
    title: "Endless open tabs",
    description: "37 tabs open — blog posts, articles, guides. You&apos;ll read them later. You won&apos;t.",
  },
  {
    icon: IconAlertTriangle,
    title: "The important stuff slips through",
    description: "The one article about that exact problem you&apos;re facing? You never saw it. It was published last Tuesday.",
  },
]

export default function ProblemSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 bg-destructive/5 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-destructive uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Engineering knowledge is everywhere.
            <br />
            <span className="text-muted-foreground">You just can&apos;t keep up.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The best engineering insights are scattered across dozens of platforms. You&apos;re missing articles you&apos;d actually want to read.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-border/30 bg-card/30 p-6 hover:bg-card/60 hover:border-destructive/20 hover:shadow-glow-amber transition-all duration-300"
            >
              <div className="size-10 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors shadow-glow-amber-sm">
                <problem.icon className="size-5 text-destructive" />
              </div>
              <h3 className="text-base font-semibold mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
