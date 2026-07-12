import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { SectionTitle } from "@/components/static/SectionTitle";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "About BlogDrop",
  description: "One feed. Every engineering blog worth reading.",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="BlogDrop" 
        description="One feed. Every engineering blog worth reading."
      />
      
      <ContentSection>
        <MarkdownContent>
          <p>
            The best engineering writing is scattered across a hundred different company blogs, and nobody has time to check them all. BlogDrop pulls it into one place — Netflix, Stripe, Cloudflare, Martin Fowler, and the rest — tagged, categorized, and ready to skim.
          </p>
          <p>
            We&apos;re not another newsletter. No inbox clutter, no weekly digest lag. Just a live feed of what serious engineering teams are publishing, right now.
          </p>
        </MarkdownContent>
      </ContentSection>

      <ContentSection>
        <SectionTitle>How it works</SectionTitle>
        <MarkdownContent>
          <p><strong>1. We watch the sources</strong><br/>
          Every engineering blog worth following gets tracked automatically. New post goes up, it shows up here — usually within minutes.</p>

          <p><strong>2. AI does the sorting</strong><br/>
          Every article gets tagged, categorized, and summarized so you know in five seconds if it&apos;s worth your fifteen minutes. No more opening ten tabs to find the one post that&apos;s actually relevant to what you&apos;re working on.</p>

          <p><strong>3. You read the original</strong><br/>
          BlogDrop never republishes full articles. Every post links straight back to the source. We&apos;re a map, not a replacement for the destination.</p>
        </MarkdownContent>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Why it&apos;s different</SectionTitle>
        <MarkdownContent>
          <ul>
            <li><strong>No noise.</strong> No sponsored placements, no SEO-bait &quot;top 10 frameworks&quot; listicles. Just the primary sources — the teams that actually build the thing writing about how they built it.</li>
            <li><strong>AI tagging, not AI opinions.</strong> BlogDrop uses AI to classify and summarize, never to editorialize. You get the facts of what a post covers, not someone&apos;s take on it.</li>
            <li><strong>Built by one dev, not a company.</strong> BlogDrop is an independent project. No investors deciding what you should read next.</li>
          </ul>
        </MarkdownContent>
      </ContentSection>

      <ContentSection>
        <SectionTitle>Want your blog listed?</SectionTitle>
        <MarkdownContent>
          <p>
            If your team runs an engineering blog and isn&apos;t on BlogDrop yet, <a href="/contact">reach out</a> — sources are added on a rolling basis, prioritizing blogs with consistent, technical, first-hand writing.
          </p>
        </MarkdownContent>
      </ContentSection>
    </>
  );
}
