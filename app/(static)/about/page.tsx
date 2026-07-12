import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { SectionTitle } from "@/components/static/SectionTitle";
import { InfoCard } from "@/components/static/InfoCard";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { IconCode, IconRobot, IconBrandOpenSource } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BlogDrop",
  description: "Learn why we are building BlogDrop and our vision for the future of engineering content.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="About BlogDrop" 
        description="We are building the ultimate aggregation platform for software engineering teams. Curated, AI-summarized, and noise-free."
      />
      
      <ContentSection>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <MarkdownContent>
            <p>
              <strong>BlogDrop</strong> was born out of a simple frustration: there is too much noise in the developer ecosystem. Between social media algorithms, scattered RSS feeds, and corporate marketing disguised as engineering posts, finding signal is harder than ever.
            </p>
            <p>
              Our mission is to centralize high-quality, trusted engineering knowledge. We believe that learning from the challenges and solutions of teams at Netflix, Stripe, Cloudflare, and others is the fastest way to grow as a developer.
            </p>
          </MarkdownContent>
          <div className="grid gap-4">
            <InfoCard 
              title="Trusted Sources Only" 
              description="We hand-curate our feed to include only verified engineering blogs from reputable tech companies. No spam, no low-effort tutorials." 
              icon={<IconCode className="w-6 h-6" />}
            />
            <InfoCard 
              title="AI-Powered Summaries" 
              description="We use advanced LLMs to extract the core architecture decisions and takeaways, saving you hours of reading time." 
              icon={<IconRobot className="w-6 h-6" />}
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Our Vision</SectionTitle>
        <MarkdownContent>
          <p>
            We envision a future where developers don&apos;t have to hunt for knowledge. By aggregating and distilling the world&apos;s best engineering blogs, we aim to be the homepage for every software engineer. 
          </p>
          <p>
            We are actively building features like personalized tagging, team collaboration feeds, and deeper AI analysis of code snippets found in articles.
          </p>
        </MarkdownContent>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Open Source</SectionTitle>
        <div className="flex flex-col md:flex-row gap-8 items-center bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex-1 space-y-4">
            <p className="text-muted-foreground">
              We believe in building in public and contributing back to the community. Parts of BlogDrop&apos;s aggregation engine and UI components are open source.
            </p>
            <Button asChild>
              <Link href="https://github.com/blogdrop" target="_blank">
                <IconBrandOpenSource className="w-4 h-4 mr-2" />
                View GitHub Organization
              </Link>
            </Button>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
