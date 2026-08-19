import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from "next"
import { siteUrl } from "@/config/constant"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "BlogDrop — Every Engineering Blog. One Feed.",
  description = "AI-powered engineering blog aggregator. Follow Netflix, Stripe, Uber, Cloudflare and hundreds of engineering blogs in a single personalized feed.",
  image = "/main-og.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string | null
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  const imageUrl = image
    ? new URL(image, siteUrl).toString()
    : undefined

  return {
    title,
    description,

    metadataBase: new URL(siteUrl),

    ...(imageUrl && {
      openGraph: {
        title,
        description,
        url: siteUrl,
        siteName: "BlogDrop",
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
        creator: "@blogdrop",
      },
    }),

    icons,

    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}