import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from "next"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "BlogDrop — Every Engineering Blog. One Feed.",
  description = "AI-powered engineering blog aggregator. Follow Netflix, Stripe, Uber, Cloudflare and hundreds of engineering blogs in a single personalized feed.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@blogdrop"
    },
    icons,
    metadataBase: new URL('https://blogdrop.dev'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
