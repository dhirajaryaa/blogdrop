import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

const faqs = [
  {
    q: "What is BlogDrop?",
    a: "BlogDrop is a curated feed of engineering articles from real product and infrastructure teams — think Netflix, Cloudflare, and Jane Street. We surface the writing that explains how the web is actually built.",
  },
  {
    q: "How does the personalized feed work?",
    a: "Pick topics and tags on your profile and we rank your feed against them — matching articles float to the top, weighted by category and tag overlaps, recency, and a little daily randomness so it never feels stale.",
  },
  {
    q: "Is BlogDrop free?",
    a: "Yes — reading, saving, and your personalized feed are completely free. There are no plans, pricing, or paywalls. We'll let you know if that ever changes.",
  },
  {
    q: "Can I request an engineering source?",
    a: "Absolutely. If there's an engineering blog you'd like to see, head to Settings and let us know. We review every request and add the best sources regularly.",
  },
  {
    q: "How do I save articles for later?",
    a: "Log in, open any article, and hit the bookmark. Your saved articles live in one place, ready when you are.",
  },
  {
    q: "Do I need an account to read articles?",
    a: "No. Anyone can browse and read from the feed, latest, and explore pages. An account unlocks a personalized feed, saved articles, and your reading profile.",
  },
];

function Faq() {
  return (
    <section className="mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
          FAQ
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Questions, answered.
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          Everything you might want to know before hitting your first article.
        </p>
      </div>

      <div className="border-border/70 mx-auto mt-10 max-w-2xl divide-y rounded-2xl border">
        {faqs.map(({ q, a }) => (
          <details
            key={q}
            className="group bg-background first:rounded-t-2xl last:rounded-b-2xl"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <IconChevronDown
                size={16}
                stroke={1.75}
                className="text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="text-muted-foreground px-5 pb-5 text-sm leading-6">
              {a}
            </p>
          </details>
        ))}
      </div>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Still have a question?{" "}
        <Link
          href="/settings"
          className="text-foreground font-medium underline underline-offset-4"
        >
          Get in touch
        </Link>
        .
      </p>
    </section>
  );
}

export default Faq;