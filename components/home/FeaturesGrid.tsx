import { IconSparkles, IconThumbUp, IconTag, IconMail, IconSearch, IconBookmark } from "@tabler/icons-react"

const features = [
  { icon: IconSparkles, title: "Know before you read", desc: "A short summary for every article. See what it's about in 10 seconds." },
  { icon: IconThumbUp, title: "Gets better over time", desc: "Your feed learns what you like. The more you use it, the smarter it gets." },
  { icon: IconTag, title: "Filter by your stack", desc: "Pick your topics. Kubernetes, Rust, AI, databases — whatever you work on." },
  { icon: IconMail, title: "Morning briefing", desc: "One short email every morning. Five minutes and you're all caught up." },
  { icon: IconSearch, title: "Search everything", desc: "Find that article about database indexing you saved three months ago." },
  { icon: IconBookmark, title: "Your personal library", desc: "Save the best articles. Find them whenever you need." },
]

export default function FeaturesGrid() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Built for developers who want to stay sharp without wasting hours.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="group rounded-xl border border-border bg-card p-7 hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
