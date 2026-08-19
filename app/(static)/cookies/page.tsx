import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { LegalSection, LegalCard } from "@/components/static/LegalSection";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Cookie Policy - BlogDrop",
  description: "Cookie Policy for BlogDrop",
});

export default function CookiesPage() {
  return (
    <>
      <PageHeader 
        title="Cookie Policy" 
        updatedAt="July 2026"
      />
      
      <ContentSection>
        <LegalSection title="How we use cookies">
          <LegalCard>
            <MarkdownContent>
              <p>BlogDrop uses cookies to:</p>
              <ul>
                <li>Keep you logged in (session cookies)</li>
                <li>Remember basic preferences (theme, saved tags)</li>
                <li>Understand aggregate usage via analytics (e.g., page views, click-through to sources)</li>
              </ul>
              <p>You can disable cookies in your browser settings, but some features (like staying logged in) may not work properly without them. BlogDrop does not use cookies for third-party ad targeting.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>
      </ContentSection>
    </>
  );
}
