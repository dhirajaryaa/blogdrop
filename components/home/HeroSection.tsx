import Link from "next/link"
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { githubRepo } from "@/config/constant"
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"

const sourceLogos = [
  { src: "/icons/netflix.svg", name: "Netflix" },
  { src: "/icons/stripe.svg", name: "Stripe" },
  { src: "/icons/elastic.svg", name: "Elastic" },
  { src: "/icons/cloudflare.svg", name: "Cloudflare" },
  { src: "/icons/meta.svg", name: "Meta" },
  { src: "/icons/google.svg", name: "Google" },
  { src: "/icons/docker.svg", name: "Docker" },
  { src: "/icons/microsoft.svg", name: "Microsoft" },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-18 mask-b-from-90%">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-30 bg-linear-to-br from-primary/12 via-background to-primary/5 dark:from-primary/15 dark:via-background dark:to-primary/8" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.04] dark:opacity-[0.06] mask-t-from-50% mask-b-from-20% mask-x-from-83%"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Primary glow blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-100 bg-primary/8 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/12 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/5 w-64 h-64 bg-primary/6 rounded-full blur-[80px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 text-center relative">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground/95 capitalize tracking-tight mb-4 leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Great <span className="text-primary font-extrabold">engineering articles</span>
          <br />
          don&apos;t have to be <span className="text-primary font-extrabold">hard</span> to find.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Discover the best engineering articles from 100+ trusted companies — AI summarized, ranked by quality, and personalized for you.
        </p>

        {/* Avatar group - source logos */}
        <div className="flex items-center justify-center mb-8 animate-fade-up flex-col gap-2" style={{ animationDelay: "0.25s" }}>
          <AvatarGroup className="justify-center">
            {sourceLogos.map((logo) => (
              <Avatar key={logo.name} size="default" >
                <AvatarImage src={logo.src} alt={logo.name} className="object-contain p-1 bg-background backdrop-blur-lg" />
                <AvatarFallback>{logo.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+94</AvatarGroupCount>
          </AvatarGroup>
          <span className="text-muted-foreground text-xs text-center">100+ Trusted Engineering Sources</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="h-11 px-6 text-sm rounded-xl w-full sm:max-w-xs" asChild>
            <Link href="/feed">
              Go to Feed
              <IconArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-6 text-sm rounded-xl w-full sm:max-w-xs" asChild>
            <a href={githubRepo} target="_blank">
              <IconBrandGithub className="size-4 mr-2" />
              Open Source
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
