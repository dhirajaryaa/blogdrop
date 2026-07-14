"use client"

import { motion } from "motion/react"
import { IconTarget, IconSparkles, IconFilter, IconArrowDown } from "@tabler/icons-react"

const steps = [
  {
    icon: IconTarget,
    title: "Pick what matters to you",
    description: "Choose the companies and topics you care about. Kubernetes, system design, databases — whatever keeps you up at night.",
    step: "01",
  },
  {
    icon: IconSparkles,
    title: "BlogDrop curates everything",
    description: "Every article is read, summarized, and ranked. You get only the signal — the rest stays out of sight.",
    step: "02",
  },
  {
    icon: IconFilter,
    title: "Read smarter, not more",
    description: "Quick summaries help you decide in seconds. Save what matters, skip what doesn't. Stay ahead without the guilt.",
    step: "03",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            From setup to smarter reading in 3 steps
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="size-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/15 transition-all duration-300 shadow-glow">
                    <step.icon className="size-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold text-primary bg-background border border-primary/20 rounded-full size-6 flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{step.description}</p>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-6 text-primary/30">
                    <IconArrowDown className="size-5 rotate-[-90deg]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
