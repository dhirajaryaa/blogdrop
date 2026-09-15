import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

const sourceStrip = [
  { name: "Stripe", logo: "/icons/stripe.svg" },
  { name: "Cloudflare", logo: "/icons/cloudflare.svg" },
  { name: "Meta", logo: "/icons/meta.svg" },
  { name: "Netflix", logo: "/icons/netflix.svg" },
  { name: "GitHub", logo: "/icons/github.svg" },
  { name: "Docker", logo: "/icons/docker.svg" },
];

function Hero() {
  return (
    <section className="pt-24 sm:pt-32">
      <div className="max-w-3xl">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Every engineering blog · One feed
        </p>

        <h1 className="mt-8 text-4xl leading-[1.15] font-medium tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
          Discover better engineering articles.
        </h1>

        <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8 text-balance sm:text-lg">
          AI summaries and key takeaways from the teams building what&apos;s
          next — Stripe, Cloudflare, Uber, Netflix and hundreds more.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button asChild size="lg">
          <Link href="/feed">
            Start reading
            <IconArrowRight stroke={2} />
          </Link>
        </Button>
        <p className="text-muted-foreground text-xs">
          Free forever · New summaries every day
        </p>
      </div>

      <div className="border-border/70 mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t py-6">
        <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
          From
        </span>
        {sourceStrip.map((source) => (
          <span
            key={source.name}
            className="text-muted-foreground flex items-center gap-2 text-xs"
          >
            <Image
              src={source.logo}
              alt=""
              width={16}
              height={16}
              loading="lazy"
              className="rounded-sm bg-white object-contain"
            />
            {source.name}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Hero;