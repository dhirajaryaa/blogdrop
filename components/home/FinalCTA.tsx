import { IconMail, IconBrandGithub } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { earlyAccessFormLink, githubRepo } from "@/config/constant"

export default function FinalCTA() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
          Stop searching for good articles.
          <br />
          <span className="text-primary">Let them find you.</span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8">
          Join thousands of developers who never miss the articles that matter.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" className="h-11 px-6 text-sm rounded-xl" asChild>
            <a href={earlyAccessFormLink} target="_blank">
              <IconMail className="size-4 mr-2" />
              Get Early Access
            </a>
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-6 text-sm rounded-xl" asChild>
            <a               href={githubRepo} target="_blank">
              <IconBrandGithub className="size-4 mr-2" />
              Open Source
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
