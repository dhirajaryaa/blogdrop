"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Why does BlogDrop exist?",
    a: "Developers spend too much time searching through Twitter, Reddit, RSS feeds, and dozens of blogs to find a few great articles. BlogDrop exists to filter the noise and help you discover the engineering content that's actually worth your time.",
  },
  {
    q: "Why use BlogDrop if I already use daily.dev?",
    a: "daily.dev is great for discovering developer content across the web. BlogDrop focuses on high-quality engineering blogs, AI summaries, personalized recommendations, and a distraction-free reading experience. Many developers use both together.",
  },
  {
    q: "Is this an RSS reader?",
    a: "No. RSS gives you every post. BlogDrop filters the noise, ranks articles by quality and relevance, and adds AI-powered summaries so you can find the best content faster.",
  },
  {
    q: "Where does the content come from?",
    a: "We curate articles from trusted engineering blogs like Netflix, Stripe, Cloudflare, AWS, Meta, Uber, Spotify, Vercel, and many more. No clickbait, just high-quality engineering content.",
  },
  {
    q: "How does AI summarization work?",
    a: "Every article is analyzed and summarized into a quick overview, helping you decide in seconds whether it's worth reading the full article.",
  },
  {
    q: "How is BlogDrop different from newsletters?",
    a: "Newsletters send the same content to everyone on a schedule. BlogDrop updates continuously and personalizes recommendations based on your interests.",
  },
  {
    q: "Can I save articles for later?",
    a: "Yes. Bookmark articles with one click and access them anytime from your personal reading library.",
  },
  {
    q: "Do I need an account?",
    a: "You can explore articles without signing up. Create a free account to personalize your feed, save articles, and sync your reading history across devices.",
  },
  {
    q: "Is BlogDrop free?",
    a: "Yes. BlogDrop offers a free plan so you can start discovering and reading the best engineering articles without any upfront cost.",
  },
]

export default function FAQ() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Questions people ask
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3 border-none">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border bg-card px-5 border-none">
              <AccordionTrigger className="text-sm font-medium py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
