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
  difficulty: "junior" | "mid" | "senior";
  keyPoints: string[];
};

export const feedArticles: FeedArticle[] = [
  {
    id: "1",
    slug: "stripe-document-databases-uptime",
    title: "How Stripe's Document Databases Support 99.999% Uptime",
    description:
      "Stripe runs a single logical database over many physical Postgres shards, moving data between them with zero-downtime, replayable change streams instead of one-shot migrations.",
    author: "Stripe Engineering",
    url: "https://stripe.dev/blog/how-stripes-document-databases-supported-99.999-uptime-with-zero-downtime-data-migrations",
    date: "Sep 12, 2026",
    readingTime: "12 min",
    company: "Stripe",
    logo: "/icons/stripe.svg",
    category: "database",
    difficulty: "senior",
    keyPoints: [
      "A single logical database is backed by many physical shards, each an independent Postgres cluster.",
      "Zero-downtime migrations replay change streams instead of doing one-shot cutovers.",
      "Indexes are rebuilt in parallel on new hardware and swapped via atomic catalog updates.",
    ],
  },
  {
    id: "2",
    slug: "meta-recommending-billion-people",
    title: "Recommending Items to More Than a Billion People",
    description:
      "Facebook scaled collaborative filtering to more than a billion users and 100 billion ratings by sharding item embeddings and splitting the rating matrix across machines.",
    author: "Meta Engineering",
    url: "https://engineering.fb.com/2015/06/02/core-infra/recommending-items-to-more-than-a-billion-people/",
    date: "Sep 10, 2026",
    readingTime: "8 min",
    company: "Meta",
    logo: "/icons/meta.svg",
    category: "ai",
    difficulty: "mid",
    keyPoints: [
      "Collaborative filtering scales by sharding item embeddings and splitting the rating matrix.",
      "Offline models run nightly while incremental updates keep fresh ratings flowing in.",
      "The same recommender core powers recommendations across products.",
    ],
  },
  {
    id: "3",
    slug: "cloudflare-pingora-proxy",
    title:
      "How We Built Pingora, the Proxy That Connects Cloudflare to the Internet",
    description:
      "Cloudflare rebuilt its edge proxy in Rust to eliminate crash cascades and memory-unsafe code, serving over a trillion requests per day with better performance and efficiency.",
    author: "Cloudflare Engineering",
    url: "https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/",
    date: "Sep 8, 2026",
    readingTime: "12 min",
    company: "Cloudflare",
    logo: "/icons/cloudflare.svg",
    category: "networking",
    difficulty: "senior",
    keyPoints: [
      "Pingora serves over a trillion requests per day on a Rust-based proxy.",
      "Connection persistence and task scheduling deliver the biggest wins over Apache/Nginx workers.",
      "Memory safety removes an entire class of crash cascades that haunted the old C stack.",
    ],
  },
  {
    id: "4",
    slug: "discord-go-to-rust",
    title: "Why Discord is Switching from Go to Rust",
    description:
      "Discord's Read States service suffered latency spikes and GC pauses under Go's garbage collector, so the team rewrote it in Rust for predictable memory and better performance.",
    author: "Discord Engineering",
    url: "https://discord.com/blog/why-discord-is-switching-from-go-to-rust",
    date: "Sep 6, 2026",
    readingTime: "9 min",
    company: "Discord",
    logo: "https://www.google.com/s2/favicons?domain=discord.com&sz=128",
    category: "performance",
    difficulty: "mid",
    keyPoints: [
      "Go's garbage collector caused latency spikes in Read States, especially on hot cache paths.",
      "Rust eliminated GC pauses and made memory usage predictable.",
      "The rewrite shipped with no framework overhead and lower CPU usage.",
    ],
  },
  {
    id: "5",
    slug: "pinterest-data-platform-models",
    title: "Designing a Data Platform to Support 1,000s of Models",
    description:
      "Pinterest unified feature computation, training and serving under one platform so thousands of ML models could be built and maintained without duplicated pipelines.",
    author: "Pinterest Engineering",
    url: "https://medium.com/pinterest-engineering/designing-a-data-platform-to-support-1-000s-of-models-8e0aa4cf7fdd",
    date: "Sep 3, 2026",
    readingTime: "10 min",
    company: "Pinterest",
    logo: "https://www.google.com/s2/favicons?domain=pinterest.com&sz=128",
    category: "data-engineering",
    difficulty: "senior",
    keyPoints: [
      "Feature data is unified into a single store served by a dedicated fleet.",
      "Training and serving share the same feature pipeline to avoid skew.",
      "The platform lets data scientists iterate on models without re-building infra.",
    ],
  },
  {
    id: "6",
    slug: "uber-40m-reads-per-second",
    title:
      "How Uber Serves Over 40 Million Reads Per Second Using Integrated Cache",
    description:
      "Uber built CacheFront, an integrated caching tier inside storage nodes over Schemaless and Docstore, to serve tens of millions of reads per second without a network hop.",
    author: "Uber Engineering",
    url: "https://www.uber.com/blog/how-uber-serves-over-40-million-reads-per-second-using-integrated-cache/",
    date: "Sep 1, 2026",
    readingTime: "9 min",
    company: "Uber",
    logo: "https://www.google.com/s2/favicons?domain=uber.com&sz=128",
    category: "distributed-systems",
    difficulty: "senior",
    keyPoints: [
      "CacheFront sits inside storage nodes, removing a network hop from the hot read path.",
      "Schemaless and Docstore direct reads through the integrated cache at tens of millions of QPS.",
      "Offloading read pressure protects the underlying storage cluster from overload.",
    ],
  },
  {
    id: "7",
    slug: "planetscale-millions-tiny-databases",
    title: "Millions of Tiny Databases",
    description:
      "PlanetScale's sharding model produced hundreds of small Vitess databases, each with a narrow blast radius, made manageable by automation and no pager noise.",
    author: "PlanetScale Engineering",
    url: "https://planetscale.com/blog/millions-of-tiny-databases",
    date: "Aug 28, 2026",
    readingTime: "14 min",
    company: "PlanetScale",
    logo: "https://www.google.com/s2/favicons?domain=planetscale.com&sz=128",
    category: "database",
    difficulty: "mid",
    keyPoints: [
      "Sharding produced many small databases instead of a few giant ones.",
      "Smaller blast radius means failures stay contained to a single tenant.",
      "Automated self-healing and coordinated failovers keep the fleet quiet at 3am.",
    ],
  },
  {
    id: "8",
    slug: "github-ship-in-your-browser",
    title: "How we ship GitHub in your browser",
    description:
      "GitHub ships features in the browser by A/B testing everything, instrumenting every action, and rolling out through feature flags instead of big-bang releases.",
    author: "GitHub Engineering",
    url: "https://github.blog/2023-03-09-how-we-ship-github-in-your-browser/",
    date: "Aug 25, 2026",
    readingTime: "8 min",
    company: "GitHub",
    logo: "/icons/github.svg",
    category: "frontend",
    difficulty: "junior",
    keyPoints: [
      "Every feature ships behind a flag with A/B testing from day one.",
      "Instrumentation on each action feeds decision pipelines that accelerate rollout.",
      "Small, frequent releases replace the risky big-bang launch.",
    ],
  },
  {
    id: "9",
    slug: "shopify-real-time-editor",
    title: "Building a Real-Time Collaborative Editor",
    description:
      "Shopify built a collaborative editing experience on Yjs CRDTs, giving conflict-safe edits with instant local input, plus presence, undo/redo and selection awareness.",
    author: "Shopify Engineering",
    url: "https://shopify.engineering/building-a-real-time-collaborative-editor",
    date: "Aug 22, 2026",
    readingTime: "11 min",
    company: "Shopify",
    logo: "https://www.google.com/s2/favicons?domain=shopify.com&sz=128",
    category: "frontend",
    difficulty: "mid",
    keyPoints: [
      "Yjs CRDTs provide conflict-safe collaborative editing with instant local input.",
      "Presence, undo/redo and selection awareness share one document model.",
      "Debouncing and update batching keep network traffic under control.",
    ],
  },
  {
    id: "10",
    slug: "cloudflare-build-platform",
    title: "How We Built Our Own Platform",
    description:
      "Cloudflare treated its internal developer platform as a product, giving teams standardized pipelines to ship straight to the edge with far less boilerplate.",
    author: "Cloudflare Engineering",
    url: "https://blog.cloudflare.com/how-we-built-our-own-platform/",
    date: "Aug 20, 2026",
    readingTime: "15 min",
    company: "Cloudflare",
    logo: "/icons/cloudflare.svg",
    category: "platform-engineering",
    difficulty: "senior",
    keyPoints: [
      "An internal platform treated as a product lets teams ship straight to the edge.",
      "Standardized pipelines remove boilerplate and shrink time-to-production.",
      "Self-serve primitives reduce the platform team's manual workload.",
    ],
  },
  {
    id: "11",
    slug: "dropbox-nginx-to-envoy",
    title: "How we migrated Dropbox from Nginx to Envoy",
    description:
      "Dropbox replaced a fleet of Nginx proxies with an Envoy mesh — shifting traffic gradually over months to handle 13 trillion requests a year with zero downtime.",
    author: "Dropbox Engineering",
    url: "https://dropbox.tech/infrastructure/how-we-migrated-dropbox-from-nginx-to-envoy",
    date: "Aug 15, 2026",
    readingTime: "13 min",
    company: "Dropbox",
    logo: "https://www.google.com/s2/favicons?domain=dropbox.tech&sz=128",
    category: "platform-engineering",
    difficulty: "senior",
    keyPoints: [
      "A staged migration ran Nginx and Envoy side by side, shifting traffic gradually.",
      "Envoy's dynamic configuration enabled incremental rollouts at 13T requests/year.",
      "A dedicated migration team and canaries kept risk contained throughout.",
    ],
  },
  {
    id: "12",
    slug: "netflix-recommendations-at-scale",
    title: "Netflix Information Overload: Recommendations at Scale",
    description:
      "Netflix's recommender combines offline batch-trained models with real-time scoring, assembling personalized rows from candidate generators ranked by predicted engagement.",
    author: "Netflix Technology Blog",
    url: "https://netflixtechblog.com/netflix-recommendations-beyond-the-5-stars-part-1-55838468f429",
    date: "Aug 10, 2026",
    readingTime: "10 min",
    company: "Netflix",
    logo: "/icons/netflix.svg",
    category: "ai",
    difficulty: "mid",
    keyPoints: [
      "A multi-stage pipeline combines offline batch models with real-time scoring.",
      "Personalized rows are assembled from candidate generators ranked by predicted engagement.",
      "Models learn from implicit feedback at web scale, not just explicit ratings.",
    ],
  },
];