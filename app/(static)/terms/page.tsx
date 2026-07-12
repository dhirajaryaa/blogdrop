import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { LegalSection, LegalCard } from "@/components/static/LegalSection";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - BlogDrop",
  description: "The terms and conditions governing your use of BlogDrop.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader 
        title="Terms of Service" 
        description="Please read these terms carefully before using BlogDrop."
        updatedAt="October 15, 2024"
      />
      
      <ContentSection>
        <LegalSection title="1. Acceptance of Terms">
          <LegalCard>
            <MarkdownContent>
              <p>By accessing or using BlogDrop, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="2. User Responsibilities & Accounts">
          <LegalCard>
            <MarkdownContent>
              <p>You are responsible for safeguarding the password or OAuth account that you use to access the service and for any activities or actions under your account.</p>
              <p>You agree not to use the service for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="3. Content & Intellectual Property">
          <LegalCard>
            <MarkdownContent>
              <p>BlogDrop aggregates links and summaries of publicly available engineering articles. The original content belongs to their respective publishers and authors.</p>
              <p>We do not claim ownership of the articles linked on this platform. The AI-generated summaries are provided for convenience and fair use purposes.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="4. API Usage">
          <LegalCard>
            <MarkdownContent>
              <p>If you access our API, you must not abuse the service by exceeding rate limits, scraping excessively, or attempting to bypass security measures. We reserve the right to revoke API access at any time.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="5. Limitation of Liability">
          <LegalCard>
            <MarkdownContent>
              <p>In no event shall BlogDrop, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="6. Changes">
          <LegalCard>
            <MarkdownContent>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

      </ContentSection>
    </>
  );
}
