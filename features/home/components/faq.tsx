import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

const faqs = [
  {
    q: "What is BlogDrop?",
    a: "BlogDrop is a curated feed of engineering articles from real product and infrastructure teams — from companies like Netflix, Cloudflare, and Jane Street. We make it easier to discover the engineering work behind the products you use.",
  },
  {
    q: "What makes BlogDrop different from a regular RSS reader?",
    a: "Instead of managing dozens of feeds yourself, BlogDrop brings engineering blogs from trusted companies into one place, organizes them by topics and tags, and helps you discover articles worth reading.",
  },
  {
    q: "How does the personalized feed work?",
    a: "Choose the topics and tags you're interested in, and BlogDrop uses them to prioritize relevant articles in your feed. Your interests, article freshness, and topic or tag matches all contribute to the ranking.",
  },
  {
    q: "Do I need an account to use BlogDrop?",
    a: "No. You can browse and read articles without an account. Creating an account unlocks a personalized feed, saved articles, and your reading profile.",
  },
  {
    q: "Is BlogDrop free?",
    a: "Yes. Reading, saving, and using the personalized feed are currently completely free. There are no plans, pricing tiers, or paywalls.",
  },
  {
    q: "Where do the articles come from?",
    a: "BlogDrop collects articles from engineering blogs and technical publications published by real engineering teams and organizations. We focus on sources that share practical insights about building, scaling, and operating software.",
  },
  {
    q: "Can I save articles to read later?",
    a: "Yes. Log in and bookmark any article you want to keep. Your saved articles are available from your profile whenever you're ready to read them.",
  },
  {
    q: "Can I request an engineering blog to be added?",
    a: "Absolutely. If you know a great engineering blog that isn't on BlogDrop yet, send us a request from Settings. We review source suggestions and regularly add new ones.",
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

      <div className="border-border/70 mx-auto mt-10 max-w-3xl divide-y rounded-2xl border">
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