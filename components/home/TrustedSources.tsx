import { IconBrandNetflix, IconCar, IconBrandStripe, IconCloud, IconBrandAws, IconBrandMeta, IconBrandSpotify, IconBrandSlack, IconBrandDropbox } from "@tabler/icons-react"

const companies = [
  { name: "Netflix", icon: IconBrandNetflix },
  { name: "Uber", icon: IconCar },
  { name: "Stripe", icon: IconBrandStripe },
  { name: "Cloudflare", icon: IconCloud },
  { name: "AWS", icon: IconBrandAws },
  { name: "Meta", icon: IconBrandMeta },
  { name: "Spotify", icon: IconBrandSpotify },
  { name: "Slack", icon: IconBrandSlack },
  { name: "Dropbox", icon: IconBrandDropbox },
]

const duplicated = [...companies, ...companies]

export default function TrustedSources() {
  return (
    <section id="sources" className="py-20 overflow-hidden">
      <p className="text-center text-sm font-medium text-muted-foreground mb-10 px-4">
        The best engineering blogs, in one place
      </p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max">
          {duplicated.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center gap-3 text-muted-foreground/60 hover:text-muted-foreground transition-all duration-300 hover:scale-110 cursor-default mx-10 shrink-0"
            >
              <company.icon className="size-8" />
              <span className="text-base font-semibold">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
