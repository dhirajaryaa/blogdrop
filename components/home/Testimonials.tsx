"use client"

import { motion } from "motion/react"
import { IconQuote } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote: "I used to spend 30 minutes every morning skimming blogs. Now I spend 5 minutes and actually find better articles. BlogDrop completely changed how I stay current.",
    author: "Sarah Chen",
    role: "Senior Engineer at Vercel",
    initials: "SC",
  },
  {
    quote: "The problem was never finding engineering content — it was finding the right content. BlogDrop solved that. The daily digest is the first thing I read every morning.",
    author: "Marcus Johnson",
    role: "Staff Engineer at Shopify",
    initials: "MJ",
  },
  {
    quote: "I follow Kubernetes across twelve different company blogs. Before BlogDrop, I missed half of them. Now I miss none. The summaries save me hours every week.",
    author: "Priya Patel",
    role: "Engineering Manager at Linear",
    initials: "PP",
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 px-4 border-y border-border/20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
            Loved by engineers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What developers are saying
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border border-border/20 bg-card/20 hover:bg-card/40 hover:border-primary/20 transition-all duration-300 hover:shadow-glow-lg">
                <CardContent className="p-6 flex flex-col h-full">
                  <IconQuote className="size-6 text-primary/30 mb-4" />
                  <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                    <div className="size-9 rounded-full bg-linear-to-br from-primary to-primary/50 flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
