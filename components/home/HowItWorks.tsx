import { IconTarget, IconSparkles, IconFilter } from "@tabler/icons-react"

const steps = [
  { step: "01", icon: IconTarget, title: "Pick what you like", desc: "Choose the topics and companies you follow. Kubernetes, databases, AI — up to you." },
  { step: "02", icon: IconSparkles, title: "We do the hard work", desc: "Every article is read, summarized, and ranked. You only see the best." },
  { step: "03", icon: IconFilter, title: "Read in minutes", desc: "Short summaries help you choose fast. Stay current without losing hours." },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Three steps. That&apos;s it.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border" />

          {steps.map((s) => (
            <div key={s.step} className="relative flex flex-col items-center text-center group">
              <div className="relative mb-5">
                <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                  <s.icon className="size-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 text-[10px] font-bold text-primary bg-background border border-primary/20 rounded-full size-6 flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
