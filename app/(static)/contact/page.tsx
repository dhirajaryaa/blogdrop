import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { ContactCard } from "@/components/static/ContactCard";
import { IconMail, IconBug, IconRss } from "@tabler/icons-react";
import { SocialLinks } from "@/components/static/SocialLinks";
import { constructMetadata } from "@/lib/utils";
import { contactEmail, githubIssues } from "@/config/constant";

export const metadata = constructMetadata({
  title: "Contact Us - BlogDrop",
  description: "Get in touch with the BlogDrop team.",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader 
        title="Get in touch" 
      />
      
      <ContentSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCard 
            title="Add your blog"
            description="Send us your RSS feed URL. We prioritize consistent, technical, first-hand writing."
            icon={<IconRss className="w-8 h-8" />}
            href={`mailto:${contactEmail}`}
            actionText="Submit Blog"
          />
          <ContactCard 
            title="Found a bug or bad tag?"
            description="Tell us what's wrong and we'll fix it. Your feedback makes our AI better."
            icon={<IconBug className="w-8 h-8" />}
            href={githubIssues}
            actionText="Report Issue"
          />
          <ContactCard 
            title="Something else?"
            description="For general questions, feedback, or any other inquiries."
            icon={<IconMail className="w-8 h-8" />}
            href={`mailto:${contactEmail}`}
            actionText="Email Us"
          />
        </div>
      </ContentSection>

      <ContentSection>
        <div className="bg-muted p-6 rounded-xl border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Response Time</h3>
              <p className="text-muted-foreground text-sm">
                We are an independent project, but we try our best to respond as quickly as possible.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Follow us:</span>
              <SocialLinks />
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
