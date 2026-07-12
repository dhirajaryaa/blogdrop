import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { LegalSection, LegalCard } from "@/components/static/LegalSection";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - BlogDrop",
  description: "Learn about how BlogDrop collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader 
        title="Privacy Policy" 
        description="We care about your privacy. Here is how we handle your data."
        updatedAt="October 15, 2024"
      />
      
      <ContentSection>
        <LegalSection title="1. Information Collected">
          <LegalCard>
            <MarkdownContent>
              <p>We collect information to provide better services to all our users. We only collect the minimal data necessary for authentication and preferences.</p>
              <ul>
                <li><strong>Account Information:</strong> When you sign in using GitHub or other OAuth providers, we receive your email address, name, and profile picture.</li>
                <li><strong>Usage Data:</strong> We may collect anonymous analytics regarding page visits and interaction with the platform to improve the user experience.</li>
              </ul>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="2. Cookies & Analytics">
          <LegalCard>
            <MarkdownContent>
              <p>We use essential cookies to maintain your session. For detailed information on the specific cookies we use, please see our <a href="/cookies">Cookie Policy</a>.</p>
              <p>We use privacy-friendly analytics tools that do not track users across websites or sell data.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="3. Third-Party Services">
          <LegalCard>
            <MarkdownContent>
              <p>BlogDrop aggregates public content. In doing so, we might link to third-party engineering blogs. We are not responsible for the privacy practices of those external sites.</p>
              <p>We use external authentication providers (e.g., GitHub OAuth) and AI providers (e.g., OpenAI/Gemini) for summarization. Your data is processed in accordance with their respective privacy policies.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="4. Data Sale and Retention">
          <LegalCard>
            <MarkdownContent>
              <p><strong>BlogDrop does not sell your personal data.</strong></p>
              <p>We retain your profile data as long as your account is active. You have the right to request deletion of your account and all associated data at any time by contacting us.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="5. Contact Us">
          <LegalCard>
            <MarkdownContent>
              <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:privacy@blogdrop.com">privacy@blogdrop.com</a>.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

      </ContentSection>
    </>
  );
}
