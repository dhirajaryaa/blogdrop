import { articleCategories } from "@/config/category";

export type FeedArticle = {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  url: string;
  date: string;
  readingTime: string;
  company: string;
  logo: string;
  category: (typeof articleCategories)[number]["value"];
};

export const feedArticles: FeedArticle[] = [
  {
    id: "1",
    slug: "stripe-document-databases-uptime",
    title: "How Stripe's Document Databases Support 99.999% Uptime",
    description:
      "How Stripe designed its database infrastructure and data movement systems for zero-downtime migrations at scale.",
    author: "Stripe Engineering",
    url: "https://stripe.dev/blog/how-stripes-document-databases-supported-99.999-uptime-with-zero-downtime-data-migrations",
    date: "Sep 12, 2026",
    readingTime: "12 min",
    company: "Stripe",
    logo: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128",
    category: "database",
  },
  {
    id: "2",
    slug: "meta-recommending-billion-people",
    title: "Recommending Items to More Than a Billion People",
    description:
      "How Facebook scaled collaborative filtering across more than a billion users and 100 billion ratings.",
    author: "Meta Engineering",
    url: "https://engineering.fb.com/2015/06/02/core-infra/recommending-items-to-more-than-a-billion-people/",
    date: "Sep 10, 2026",
    readingTime: "8 min",
    company: "Meta",
    logo: "https://www.google.com/s2/favicons?domain=engineering.fb.com&sz=128",
    category: "ai",
  },
  {
    id: "3",
    slug: "cloudflare-pingora-proxy",
    title:
      "How We Built Pingora, the Proxy That Connects Cloudflare to the Internet",
    description:
      "Inside Cloudflare's Rust-based proxy architecture, built to handle Internet traffic with better performance and efficiency.",
    author: "Cloudflare Engineering",
    url: "https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/",
    date: "Sep 8, 2026",
    readingTime: "12 min",
    company: "Cloudflare",
    logo: "https://www.google.com/s2/favicons?domain=cloudflare.com&sz=128",
    category: "networking",
  },
  {
    id: "4",
    slug: "discord-go-to-rust",
    title: "Why Discord is Switching from Go to Rust",
    description:
      "How Discord eliminated latency spikes and GC pauses in their Read States service by rewriting it from Go to Rust.",
    author: "Discord Engineering",
    url: "https://discord.com/blog/why-discord-is-switching-from-go-to-rust",
    date: "Sep 6, 2026",
    readingTime: "9 min",
    company: "Discord",
    logo: "https://www.google.com/s2/favicons?domain=discord.com&sz=128",
    category: "performance",
  },
  {
    id: "5",
    slug: "pinterest-data-platform-models",
    title: "Designing a Data Platform to Support 1,000s of Models",
    description:
      "How Pinterest unified feature computation, training and serving under a single platform powering thousands of models.",
    author: "Pinterest Engineering",
    url: "https://medium.com/pinterest-engineering/designing-a-data-platform-to-support-1-000s-of-models-8e0aa4cf7fdd",
    date: "Sep 3, 2026",
    readingTime: "10 min",
    company: "Pinterest",
    logo: "https://www.google.com/s2/favicons?domain=pinterest.com&sz=128",
    category: "data-engineering",
  },
  {
    id: "6",
    slug: "uber-40m-reads-per-second",
    title:
      "How Uber Serves Over 40 Million Reads Per Second Using Integrated Cache",
    description:
      "How Uber designed CacheFront, an integrated caching tier built atop Schemaless and Docstore to serve tens of millions of QPS.",
    author: "Uber Engineering",
    url: "https://www.uber.com/blog/how-uber-serves-over-40-million-reads-per-second-using-integrated-cache/",
    date: "Sep 1, 2026",
    readingTime: "9 min",
    company: "Uber",
    logo: "https://www.google.com/s2/favicons?domain=uber.com&sz=128",
    category: "distributed-systems",
  },
  {
    id: "7",
    slug: "planetscale-millions-tiny-databases",
    title: "Millions of Tiny Databases",
    description:
      "PlanetScale's blueprint for managing hundreds of Vitess sharded databases — and how they do it without waking up at 3am.",
    author: "PlanetScale Engineering",
    url: "https://planetscale.com/blog/millions-of-tiny-databases",
    date: "Aug 28, 2026",
    readingTime: "14 min",
    company: "PlanetScale",
    logo: "https://www.google.com/s2/favicons?domain=planetscale.com&sz=128",
    category: "database",
  },
  {
    id: "8",
    slug: "github-ship-in-your-browser",
    title: "How we ship GitHub in your browser",
    description:
      "A deep dive into GitHub's feature-shipping process: A/B test everything, instrument every action, and ship every day.",
    author: "GitHub Engineering",
    url: "https://github.blog/2023-03-09-how-we-ship-github-in-your-browser/",
    date: "Aug 25, 2026",
    readingTime: "8 min",
    company: "GitHub",
    logo: "https://www.google.com/s2/favicons?domain=github.blog&sz=128",
    category: "frontend",
  },
  {
    id: "9",
    slug: "shopify-real-time-editor",
    title: "Building a Real-Time Collaborative Editor",
    description:
      "How Shopify built a collaborative editing experience on top of Yjs, with undo/redo, presence and conflict-safe ops.",
    author: "Shopify Engineering",
    url: "https://shopify.engineering/building-a-real-time-collaborative-editor",
    date: "Aug 22, 2026",
    readingTime: "11 min",
    company: "Shopify",
    logo: "https://www.google.com/s2/favicons?domain=shopify.com&sz=128",
    category: "frontend",
  },
  {
    id: "10",
    slug: "cloudflare-build-platform",
    title: "How We Built Our Own Platform",
    description:
      "Cloudflare's journey of building the internal platform that lets product teams ship straight to the edge.",
    author: "Cloudflare Engineering",
    url: "https://blog.cloudflare.com/how-we-built-our-own-platform/",
    date: "Aug 20, 2026",
    readingTime: "15 min",
    company: "Cloudflare",
    logo: "https://www.google.com/s2/favicons?domain=blog.cloudflare.com&sz=128",
    category: "platform-engineering",
  },
  {
    id: "11",
    slug: "dropbox-nginx-to-envoy",
    title: "How we migrated Dropbox from Nginx to Envoy",
    description:
      "Replacing a fleet of Nginx proxies with a service mesh — zero downtime, 13 trillion requests per year, and lessons learned.",
    author: "Dropbox Engineering",
    url: "https://dropbox.tech/infrastructure/how-we-migrated-dropbox-from-nginx-to-envoy",
    date: "Aug 15, 2026",
    readingTime: "13 min",
    company: "Dropbox",
    logo: "https://www.google.com/s2/favicons?domain=dropbox.tech&sz=128",
    category: "platform-engineering",
  },
  {
    id: "12",
    slug: "netflix-recommendations-at-scale",
    title: "Netflix Information Overload: Recommendations at Scale",
    description:
      "A deep dive into Netflix's multi-layered recommendation system architecture, covering offline model training and real-time inference.",
    author: "Netflix Technology Blog",
    url: "https://netflixtechblog.com/netflix-recommendations-beyond-the-5-stars-part-1-55838468f429",
    date: "Aug 10, 2026",
    readingTime: "10 min",
    company: "Netflix",
    logo: "https://www.google.com/s2/favicons?domain=netflix.com&sz=128",
    category: "ai",
  },
];