import { IconClock, IconLayoutList, IconTrendingUp, IconFilter, IconSearch, IconBookmark } from "@tabler/icons-react"

const solutions = [
  { icon: IconClock, title: "Never miss what matters", desc: "The best articles show up in your feed. No RSS. No searching." },
  { icon: IconLayoutList, title: "Only read what fits you", desc: "The more you read, the better your feed gets. Less noise every week." },
  { icon: IconTrendingUp, title: "See what's hot right now", desc: "Find out which articles engineers are reading. Jump into the conversation early." },
  { icon: IconFilter, title: "Decide in 10 seconds", desc: "Every article has a short summary. Know if it's worth your time before you start." },
  { icon: IconSearch, title: "Find anything, fast", desc: "That article about databases from three months ago? One search away." },
  { icon: IconBookmark, title: "Build your own library", desc: "Save the best articles. Come back to them whenever you need." },
]

export default function SolutionSection() {
  return (
    <section id="features" className="py-24 px-4 bg-muted/30" style={{ maskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">The Solution</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            One feed. Only the good stuff.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We collect the best engineering articles and help you pick the ones worth your time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s) => (
            <div key={s.title} className="group rounded-xl border border-border bg-card p-7 hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                <s.icon className="size-4.5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
