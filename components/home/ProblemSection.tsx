"use client"

import { motion } from "motion/react"
import { IconRss, IconBellOff, IconSearchOff, IconStack3 } from "@tabler/icons-react"

const problems = [
  {
    icon: IconStack3,
    title: "Following 50+ blogs is impossible",
    description: "You can't keep up with Netflix, Stripe, Cloudflare and dozens of other engineering blogs.",
  },
  {
    icon: IconBellOff,
    title: "Important updates get missed",
    description: "The one article you actually needed was buried under 50 other posts you skimmed past.",
  },
  {
    icon: IconRss,
    title: "RSS readers are overwhelming",
    description: "Hundreds of unread items pile up and you end up ignoring all of them entirely.",
  },
  {
    icon: IconSearchOff,
    title: "No personalized discovery",
    description: "You get the same content as everyone else — no curation, no signal, just noise.",
  },
]

export default function ProblemSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/5 via-transparent to-transparent pointer-events-none" />

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
            Developer knowledge is scattered.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineering knowledge is spread across hundreds of blogs. Keeping up shouldn&apos;t be a full-time job.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
