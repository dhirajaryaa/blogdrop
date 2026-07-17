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

export default function TrustedSources() {
  return (
    <section id="sources" className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm font-medium text-muted-foreground mb-10">
          The best engineering blogs, in one place
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center gap-3 text-muted-foreground/40 hover:text-muted-foreground transition-all duration-300 hover:scale-110 cursor-default"
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
