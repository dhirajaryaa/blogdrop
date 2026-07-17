import { IconQuote } from "@tabler/icons-react"

const testimonials = [
  {
    quote: "I used to spend 30 minutes every morning skimming blogs. Now I spend 5 and find better articles.",
    author: "Sarah Chen",
    role: "Senior Engineer at Vercel",
    initials: "SC",
  },
  {
    quote: "The problem was never finding content — it was finding the right content. BlogDrop solved that.",
    author: "Marcus Johnson",
    role: "Staff Engineer at Shopify",
    initials: "MJ",
  },
  {
    quote: "I follow Kubernetes across twelve blogs. Before BlogDrop, I missed half. Now I miss none.",
    author: "Priya Patel",
    role: "Engineering Manager at Linear",
    initials: "PP",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Social Proof</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What developers are saying
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.author} className="rounded-xl border border-border bg-card p-5 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <IconQuote className="size-5 text-primary/30 mb-3" />
              <p className="text-sm text-foreground/80 leading-relaxed mb-5 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
