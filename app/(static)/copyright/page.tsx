import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { LegalSection, LegalCard } from "@/components/static/LegalSection";
import { MarkdownContent } from "@/components/static/MarkdownContent";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Content & Copyright Policy - BlogDrop",
  description: "Content & Copyright Policy for BlogDrop",
});

export default function CopyrightPage() {
  return (
    <>
      <PageHeader 
        title="Content & Copyright Policy" 
        updatedAt="July 2026"
      />
      
      <ContentSection>
        <MarkdownContent className="mb-8">
          <p>BlogDrop respects the intellectual property rights of content creators. We index publicly available RSS feeds and display only titles, short excerpts/summaries, and links back to original articles — we do not republish full content.</p>
        </MarkdownContent>

        <LegalSection title="If you're a publisher and want to be removed">
          <LegalCard>
            <MarkdownContent>
              <p>Email copyright@blogdrop.dev with:</p>
              <ol>
                <li>The URL(s) of your blog/feed as it appears on BlogDrop</li>
                <li>Confirmation that you are the rights holder or an authorized representative</li>
                <li>Your requested action (full removal / correction)</li>
              </ol>
              <p>We will process valid requests within 5 business days.</p>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

        <LegalSection title="If you believe content infringes your copyright">
          <LegalCard>
            <MarkdownContent>
              <p>Send a notice including:</p>
              <ul>
                <li>Identification of the copyrighted work</li>
                <li>The BlogDrop URL where the allegedly infringing summary/link appears</li>
                <li>Your contact information</li>
                <li>A statement of good-faith belief that the use is unauthorized</li>
                <li>A statement, under penalty of perjury, that the notice is accurate</li>
              </ul>
            </MarkdownContent>
          </LegalCard>
        </LegalSection>

      </ContentSection>
    </>
  );
}
