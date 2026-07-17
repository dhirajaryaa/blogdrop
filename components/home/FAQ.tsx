"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Where does the content come from?",
    a: "We pull from engineering blogs of companies like Netflix, Stripe, Cloudflare, AWS, Meta, Uber, Spotify, and hundreds more. Only good sources.",
  },
  {
    q: "Is this an RSS reader?",
    a: "No. RSS shows you everything and makes you filter. We only show the articles worth reading — with summaries and rankings.",
  },
  {
    q: "How does summarization work?",
    a: "Every article gets a short summary. You can decide in seconds if you want to read the full thing.",
  },
  {
    q: "Is it free?",
    a: "Yes. There's a free plan so you can try it before you commit.",
  },
  {
    q: "Can I save articles?",
    a: "Yes. Bookmark anything. It's saved, organized, and easy to find later.",
  },
  {
    q: "How is this different from a newsletter?",
    a: "Newsletters send the same thing to everyone. We learn what you like and show you more of that.",
  },
]

export default function FAQ() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-2xl">
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
