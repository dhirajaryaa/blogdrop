import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { LegalSection, LegalCard } from "@/components/static/LegalSection";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - BlogDrop",
  description: "Important information regarding content ownership and AI summaries.",
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader 
        title="Disclaimer" 
        description="Understanding how we aggregate and summarize content."
      />
      
      <ContentSection>
        <LegalSection title="Content Ownership">
          <LegalCard>
            <MarkdownContent>
              <p>BlogDrop is an aggregator. We collect publicly available engineering articles through RSS feeds and direct links. <strong>All original content, trademarks, and intellectual property belong to their respective publishers and organizations.</strong></p>
              <p>We do not host the full content of the articles. We link directly to the original source to ensure authors receive the traffic and credit they deserve.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="AI-Generated Summaries">
          <LegalCard>
            <MarkdownContent>
              <p>To help developers consume information faster, we use Large Language Models (LLMs) to generate summaries and extract key takeaways from the articles.</p>
              <ul>
                <li><strong>Mistakes can happen:</strong> AI models may occasionally hallucinate or misinterpret technical nuances.</li>
                <li><strong>Verify critical info:</strong> Always read the original article if you are implementing architectural decisions based on the content.</li>
                <li><strong>No endorsement:</strong> A summary does not constitute an endorsement of the technical practices described.</li>
              </ul>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="External Links">
          <LegalCard>
            <MarkdownContent>
              <p>Our service contains links to third-party websites or services that are not owned or controlled by BlogDrop. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>
      </ContentSection>
    </>
  );
}
