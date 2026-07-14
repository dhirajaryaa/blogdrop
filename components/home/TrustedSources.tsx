"use client"

import { motion } from "motion/react"
import {
  IconBrandNetflix, IconCar, IconBrandStripe,
  IconCloud, IconBrandAws, IconBrandMeta,
  IconBrandSpotify, IconBrandSlack, IconBrandDropbox,
} from "@tabler/icons-react"

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
  { name: "Martin Fowler", icon: undefined },
]

export default function TrustedSources() {
  return (
    <section id="sources" className="relative py-24 px-4 border-y border-border/20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
            Trusted Sources
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Engineering blogs from the best teams
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border/30 bg-card/30 hover:bg-card/60 hover:border-primary/20 hover:shadow-glow-lg transition-all duration-300"
            >
              {company.icon ? (
                <company.icon className="size-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              ) : (
                <div className="size-8 rounded-full bg-linear-to-br from-destructive to-destructive/70 flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                  MF
                </div>
              )}
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
