import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { LegalSection, LegalCard } from "@/components/static/LegalSection";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Privacy Policy - BlogDrop",
  description: "Privacy Policy for BlogDrop",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader 
        title="Privacy Policy" 
        updatedAt="July 2026"
      />
      
      <ContentSection>
        <MarkdownContent className="mb-8">
          <p>BlogDrop (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what we collect, why, and what you can do about it.</p>
        </MarkdownContent>

        <LegalSection title="What we collect">
          <LegalCard>
            <MarkdownContent>
              <ul>
                <li><strong>Account info</strong> — if you sign up, we store your email address and any display name you provide.</li>
                <li><strong>Usage data</strong> — pages visited, articles clicked, and general interaction data, collected to improve tagging and recommendations.</li>
                <li><strong>Technical data</strong> — IP address, browser type, and device info, collected automatically for security and analytics.</li>
                <li><strong>Cookies</strong> — used for session management and basic analytics. See our <a href="/cookies">Cookie Policy</a> below.</li>
              </ul>
              <p>We do <strong>not</strong> collect payment information directly (handled by third-party processors, if applicable), and we do not sell your personal data to advertisers or data brokers.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="How we use it">
          <LegalCard>
            <MarkdownContent>
              <ul>
                <li>To operate and improve BlogDrop&apos;s core functionality (feed personalization, tag relevance, etc.)</li>
                <li>To communicate with you about your account, if you have one</li>
                <li>To monitor for abuse, spam, or security issues</li>
                <li>To understand aggregate usage patterns (which sources/tags are popular)</li>
              </ul>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="Third parties">
          <LegalCard>
            <MarkdownContent>
              <p>BlogDrop aggregates content from public RSS feeds of third-party engineering blogs. When you click through to read an article, you leave BlogDrop and are subject to that site&apos;s own privacy policy. We are not responsible for third-party sites&apos; data practices.</p>
              <p>We may use third-party services for hosting, analytics, and email delivery (e.g., Vercel, database providers). These providers only receive the minimum data needed to perform their function.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="Your rights">
          <LegalCard>
            <MarkdownContent>
              <p>You can request to view, correct, or delete your account data at any time by contacting us at privacy@blogdrop.dev. If you&apos;re in the EU/UK, you have rights under GDPR including data portability and the right to be forgotten. If you&apos;re a California resident, you have rights under the CCPA.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="Data retention">
          <LegalCard>
            <MarkdownContent>
              <p>We keep account data as long as your account is active. If you delete your account, we remove personal data within 30 days, except where retention is required by law.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="Children's privacy">
          <LegalCard>
            <MarkdownContent>
              <p>BlogDrop is not directed at children under 13, and we do not knowingly collect data from them.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="Changes">
          <LegalCard>
            <MarkdownContent>
              <p>We may update this policy occasionally. Material changes will be noted on this page with an updated date.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="Contact">
          <LegalCard>
            <MarkdownContent>
              <p>Questions about this policy? Email privacy@blogdrop.dev.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

      </ContentSection>
    </>
  );
}
