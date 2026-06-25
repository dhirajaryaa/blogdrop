"use client"

import { motion } from "motion/react"
import { IconArrowRight, IconMail } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  return (
    <section id="waitlist" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
            Stop checking dozens of <br />
            <span className="bg-linear-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              engineering blogs.
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Let AI bring the important updates to you. Join the waitlist for early access.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base rounded-xl bg-primary text-primary-foreground hover:bg-primary/80 shadow-glow hover:shadow-glow-lg transition-shadow duration-300">
              <IconMail className="size-4 mr-2" />
              Join Waitlist
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-xl border-border hover:bg-muted/50 hover:shadow-glow-foreground transition-shadow duration-300">
              Get Started
              <IconArrowRight className="size-4 ml-2" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
