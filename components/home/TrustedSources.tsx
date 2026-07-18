import Image from "next/image";

const sourceCompanies = [
  { name: "AWS", icon: "/icons/aws.svg" },
  { name: "Meta", icon: "/icons/meta.svg" },
  { name: "Cloudflare", icon: "/icons/cloudflare.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "Elastic", icon: "/icons/elastic.svg" },
  { name: "Github", icon: "/icons/github.svg" },
  { name: "Google", icon: "/icons/google.svg" },
  { name: "MicroSoft", icon: "/icons/microsoft.svg" },
  { name: "Netflix", icon: "/icons/netflix.svg" },
  { name: "Stripe", icon: "/icons/stripe.svg" },
];

export default function TrustedSources() {
  return (
    <section id="sources" className="py-20 overflow-hidden">
      <p className="text-center text-base font-medium text-muted-foreground mb-10 px-4">
        The best engineering blogs, in one place
      </p>


      <div className="flex animate-marquee w-max space-x-8">
        {sourceCompanies.map((company) => (
          <div
            key={company.name}
            className="flex items-center justify-center px-6 py-3 group"
          >
            <Image
              src={company.icon}
              alt={company.name}
              width={48}
              title={company.name}
              height={48}
              className="sm:h-10 h-8 md:h-14 w-fit object-cover"
            />
            <span className="sr-only">{company.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
