import { IconMessageCircle, IconNews, IconHash, IconMail, IconBrowser, IconAlertTriangle } from "@tabler/icons-react"

const problems = [
  {
    icon: IconMessageCircle,
    title: "Twitter threads disappear",
    desc: "That great thread on distributed systems? Gone by morning. No way to save it.",
  },
  {
    icon: IconNews,
    title: "Hacker News moves fast",
    desc: "Good articles are on the front page for a few hours. Then they're gone.",
  },
  {
    icon: IconHash,
    title: "Reddit pulls you in",
    desc: "You came for one post about system design. Two hours later, you're still scrolling.",
  },
  {
    icon: IconMail,
    title: "Newsletters pile up",
    desc: "Five engineering newsletters. 200 unread emails. You just delete them all.",
  },
  {
    icon: IconBrowser,
    title: "Too many open tabs",
    desc: "37 tabs open — articles, guides, blog posts. You'll read them later. You won't.",
  },
  {
    icon: IconAlertTriangle,
    title: "You miss the good stuff",
    desc: "The article you needed? Published last week. You never even saw it.",
  },
]

export default function ProblemSection() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-destructive uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Good content is everywhere. But you can&apos;t find it.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            The best articles are spread across dozens of sites. You&apos;re missing the ones you&apos;d actually love to read.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <div key={p.title} className="group rounded-xl border border-border bg-card p-7 hover:border-destructive/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="size-9 rounded-lg bg-destructive/10 flex items-center justify-center mb-3 group-hover:bg-destructive/15 transition-colors">
                <p.icon className="size-4.5 text-destructive" />
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
