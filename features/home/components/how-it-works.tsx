const steps = [
  {
    number: "01",
    title: "Follow the sources",
    description:
      "Pick the engineering blogs you care about. Every new post lands in one clean feed.",
  },
  {
    number: "02",
    title: "Read the AI brief",
    description:
      "Each article comes with an AI summary and key takeaways — so you know if it's worth your time before you open it.",
  },
  {
    number: "03",
    title: "Visit the original",
    description:
      "When one resonates, jump to the original site and read in full. Save it for later if you're busy.",
  },
];

function HowItWorks() {
  return (
    <section className="mt-24 sm:mt-32">
      <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
        How it works
      </p>
      <h2 className="mt-4 max-w-xl text-2xl font-medium tracking-tight text-balance sm:text-3xl">
        Less scrolling. More signal.
      </h2>

      <div className="divide-border/70 mt-10 grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-3 py-8 pr-6 sm:py-0 sm:pl-8 sm:first:pl-0">
            <span className="font-mono text-muted-foreground/50 text-xs">
              {step.number}
            </span>
            <h3 className="text-base font-medium tracking-tight">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-6">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;