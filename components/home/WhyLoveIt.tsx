import { IconClock, IconBrain, IconBookmark, IconShield } from "@tabler/icons-react"

const reasons = [
  { icon: IconClock, title: "Save 5+ hours a week", desc: "Stop going through dozens of blogs. Get the highlights in minutes." },
  { icon: IconBrain, title: "Always stay sharp", desc: "Keep up with what's new in engineering. No information overload." },
  { icon: IconBookmark, title: "Never lose an article", desc: "Save anything. Find it later. Everything stays organized." },
  { icon: IconShield, title: "Only trusted sources", desc: "We pull from real engineering blogs. No clickbait, no noise." },
]

export default function WhyLoveIt() {
  return (
    <section className="py-24 px-4 bg-muted/30" style={{ maskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Why developers love it</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built by engineers. For engineers.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We got tired of missing great articles. So we built this.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-4 rounded-xl border border-border bg-card p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <r.icon className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
