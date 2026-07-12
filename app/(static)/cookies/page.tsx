import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { LegalSection, LegalCard } from "@/components/static/LegalSection";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - BlogDrop",
  description: "How we use cookies to improve your experience.",
};

export default function CookiesPage() {
  return (
    <>
      <PageHeader 
        title="Cookie Policy" 
        description="Information about how we use cookies and similar technologies."
        updatedAt="October 15, 2024"
      />
      
      <ContentSection>
        <LegalSection title="What are Cookies?">
          <LegalCard>
            <MarkdownContent>
              <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="Types of Cookies We Use">
          <LegalCard>
            <MarkdownContent>
              <p>We use the following types of cookies:</p>
              <ul>
                <li><strong>Necessary Cookies:</strong> These are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.</li>
                <li><strong>Authentication Cookies:</strong> We use these to remember your login state so you don&apos;t have to log in every time you visit.</li>
                <li><strong>Preference Cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences (for example, your choice of dark or light theme).</li>
                <li><strong>Analytics Cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
              </ul>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="Managing Cookies">
          <LegalCard>
            <MarkdownContent>
              <p>You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site, specifically authenticated areas.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>
      </ContentSection>
    </>
  );
}
