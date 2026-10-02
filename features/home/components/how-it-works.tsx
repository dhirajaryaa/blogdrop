import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "01",
    title: "Tell us what you care about",
    description:
      "Pick a few topics and tags on your profile. Your feed shapes itself around them.",
  },
  {
    step: "02",
    title: "Read what matters",
    description:
      "Every day we pull the freshest engineering writing and rank it for relevance — not noise.",
  },
  {
    step: "03",
    title: "Save what resonates",
    description:
      "Bookmark articles to revisit, and let your interests evolve as you learn.",
  },
];

function HowItWorks() {
  return (
    <section className="mt-20">
      <div className="flex items-end justify-between">
        <div className="max-w-md">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            How it works
          </p>
          <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            From the web to your feed in three steps.
          </h2>
        </div>
        <Button asChild variant="link" className="hidden text-xs sm:flex">
          <Link href="/onboarding">Get started →</Link>
        </Button>
      </div>

      <div className="border-border/70 mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
        {steps.map(({ step, title, description }) => (
          <div
            key={step}
            className="bg-background flex flex-col gap-3 p-6 sm:p-8"
          >
            <span className="text-muted-foreground/60 font-mono text-xs">
              {step}
            </span>
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            <p className="text-muted-foreground text-sm leading-6">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;