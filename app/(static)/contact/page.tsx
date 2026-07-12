import { PageHeader } from "@/components/static/PageHeader";
import { ContentSection } from "@/components/static/ContentSection";
import { ContactCard } from "@/components/static/ContactCard";
import { IconBrandGithub, IconBrandX, IconMail, IconBug, IconBulb } from "@tabler/icons-react";
import { Metadata } from "next";
import { SocialLinks } from "@/components/static/SocialLinks";

export const metadata: Metadata = {
  title: "Contact Us - BlogDrop",
  description: "Get in touch with the BlogDrop team for support, feature requests, or business inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader 
        title="Contact Us" 
        description="We'd love to hear from you. Whether you have a feature request, found a bug, or just want to say hi."
      />
      
      <ContentSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCard 
            title="General Inquiries"
            description="For general questions, feedback, or business inquiries."
            icon={<IconMail className="w-8 h-8" />}
            href="mailto:hello@blogdrop.com"
            actionText="Email Us"
          />
          <ContactCard 
            title="Bug Reports"
            description="Found a glitch or an article that isn't parsing correctly?"
            icon={<IconBug className="w-8 h-8" />}
            href="https://github.com/blogdrop/issues"
            actionText="Report Issue"
          />
          <ContactCard 
            title="Feature Requests"
            description="Have an idea for a new feature? Let us know on X or GitHub."
            icon={<IconBulb className="w-8 h-8" />}
            href="https://x.com/blogdrop"
            actionText="Reach Out"
          />
        </div>
      </ContentSection>

      <ContentSection>
        <div className="bg-muted p-6 rounded-xl border border-border">
          <h3 className="font-semibold text-lg mb-2">Response Time</h3>
          <p className="text-muted-foreground mb-4">
            We are a small team, but we try our best to respond to all emails and issues within 24-48 business hours. For urgent matters, reaching out via email is the fastest route.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Follow us:</span>
            <SocialLinks />
          </div>
        </div>
      </ContentSection>
    </>
  );
}
