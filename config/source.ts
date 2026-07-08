//TODO: add feature on user submit our source request

//! This time only mvp source directly import 

export const sources = [
    // ==========================================
    // Big Tech (software-engineering)
    // ==========================================
    {
        id: "netflix-techblog",
        name: "Netflix TechBlog",
        category: "software-engineering",
        rssUrl: "https://netflixtechblog.com/feed",
        sitemapUrl: "https://netflixtechblog.com/sitemap.xml",
        siteUrl: "https://netflixtechblog.com/",
        priority: 10
    },
    {
        id: "uber-engineering",
        name: "Uber Engineering",
        category: "software-engineering",
        rssUrl: "https://www.uber.com/blog/engineering/rss/",
        sitemapUrl: "https://www.uber.com/sitemap.xml",
        siteUrl: "https://www.uber.com/blog/engineering/",
        priority: 10
    },
    {
        id: "airbnb-engineering",
        name: "Airbnb Engineering",
        category: "software-engineering",
        rssUrl: "https://medium.com/feed/airbnb-engineering",
        sitemapUrl: "https://airbnb.io/sitemap.xml",
        siteUrl: "https://airbnb.io/",
        priority: 10
    },
    {
        id: "stripe-engineering",
        name: "Stripe Engineering",
        category: "software-engineering",
        rssUrl: "https://stripe.com/blog/feed.rss",
        sitemapUrl: "https://stripe.com/sitemap.xml",
        siteUrl: "https://stripe.com/blog/engineering",
        priority: 10
    },
    {
        id: "cloudflare-blog",
        name: "Cloudflare Blog",
        category: "software-engineering",
        rssUrl: "https://blog.cloudflare.com/rss/",
        sitemapUrl: "https://blog.cloudflare.com/sitemap.xml",
        siteUrl: "https://blog.cloudflare.com/",
        priority: 10
    },
    {
        id: "cloudflare-developers",
        name: "Cloudflare Developers",
        category: "software-engineering",
        rssUrl: "https://blog.cloudflare.com/tag/developers/rss/",
        sitemapUrl: "https://blog.cloudflare.com/sitemap.xml",
        siteUrl: "https://blog.cloudflare.com/tag/developers/",
        priority: 8
    },
    {
        id: "meta-engineering",
        name: "Meta Engineering",
        category: "software-engineering",
        rssUrl: "https://engineering.fb.com/feed/",
        sitemapUrl: "https://engineering.fb.com/sitemap.xml",
        siteUrl: "https://engineering.fb.com/",
        priority: 10
    },
    {
        id: "google-developers-blog",
        name: "Google Developers Blog",
        category: "software-engineering",
        rssUrl: "https://feeds.feedburner.com/GDBcode",
        sitemapUrl: "https://developers.googleblog.com/sitemap.xml",
        siteUrl: "https://developers.googleblog.com/",
        priority: 10
    },
    {
        id: "google-research-blog",
        name: "Google Research Blog",
        category: "software-engineering",
        rssUrl: "https://research.google/blog/feed/",
        sitemapUrl: "https://research.google/sitemap.xml",
        siteUrl: "https://research.google/blog/",
        priority: 10
    },
    {
        id: "android-developers-blog",
        name: "Android Developers Blog",
        category: "software-engineering",
        rssUrl: "https://android-developers.googleblog.com/feeds/posts/default?alt=rss",
        sitemapUrl: "https://android-developers.googleblog.com/sitemap.xml",
        siteUrl: "https://android-developers.googleblog.com/",
        priority: 10
    },
    {
        id: "chrome-developers-blog",
        name: "Chrome Developers Blog",
        category: "software-engineering",
        rssUrl: "https://developer.chrome.com/feeds/blog.xml",
        sitemapUrl: "https://developer.chrome.com/sitemap.xml",
        siteUrl: "https://developer.chrome.com/blog/",
        priority: 10
    },
    {
        id: "microsoft-devblogs",
        name: "Microsoft DevBlogs",
        category: "software-engineering",
        rssUrl: "https://devblogs.microsoft.com/feed/",
        sitemapUrl: "https://devblogs.microsoft.com/sitemap.xml",
        siteUrl: "https://devblogs.microsoft.com/",
        priority: 10
    },
    {
        id: "microsoft-engineering",
        name: "Microsoft Engineering",
        category: "software-engineering",
        rssUrl: "https://devblogs.microsoft.com/engineering/feed/",
        sitemapUrl: "https://devblogs.microsoft.com/engineering/sitemap.xml",
        siteUrl: "https://devblogs.microsoft.com/engineering/",
        priority: 10
    },
    {
        id: "github-engineering",
        name: "GitHub Engineering",
        category: "software-engineering",
        rssUrl: "https://github.blog/category/engineering/feed/",
        sitemapUrl: "https://github.blog/sitemap_index.xml",
        siteUrl: "https://github.blog/category/engineering/",
        priority: 10
    },
    {
        id: "gitlab-engineering",
        name: "GitLab Engineering",
        category: "software-engineering",
        rssUrl: "https://about.gitlab.com/blog/feed.xml",
        sitemapUrl: "https://about.gitlab.com/sitemap.xml",
        siteUrl: "https://about.gitlab.com/blog/category/engineering/",
        priority: 10
    },
    {
        id: "linkedin-engineering",
        name: "LinkedIn Engineering",
        category: "software-engineering",
        rssUrl: "https://engineering.linkedin.com/blog.rss",
        sitemapUrl: "https://engineering.linkedin.com/sitemap.xml",
        siteUrl: "https://engineering.linkedin.com/",
        priority: 10
    },
    {
        id: "pinterest-engineering",
        name: "Pinterest Engineering",
        category: "software-engineering",
        rssUrl: "https://medium.com/feed/pinterest-engineering",
        sitemapUrl: "https://medium.com/pinterest-engineering/sitemap/sitemap-index.xml",
        siteUrl: "https://medium.com/pinterest-engineering",
        priority: 10
    },
    {
        id: "discord-engineering",
        name: "Discord Engineering",
        category: "software-engineering",
        rssUrl: "https://discord.com/blog/rss.xml",
        sitemapUrl: "https://discord.com/sitemap.xml",
        siteUrl: "https://discord.com/blog/categories/engineering",
        priority: 10
    },
    {
        id: "slack-engineering",
        name: "Slack Engineering",
        category: "software-engineering",
        rssUrl: "https://slack.engineering/feed",
        sitemapUrl: "https://slack.engineering/sitemap.xml",
        siteUrl: "https://slack.engineering/",
        priority: 10
    },
    {
        id: "dropbox-tech",
        name: "Dropbox Tech",
        category: "software-engineering",
        rssUrl: "https://dropbox.tech/feed",
        sitemapUrl: "https://dropbox.tech/sitemap.xml",
        siteUrl: "https://dropbox.tech/",
        priority: 10
    },
    {
        id: "shopify-engineering",
        name: "Shopify Engineering",
        category: "software-engineering",
        rssUrl: "https://shopify.engineering/blogs/engineering.atom",
        sitemapUrl: "https://shopify.engineering/sitemap.xml",
        siteUrl: "https://shopify.engineering/",
        priority: 10
    },
    {
        id: "reddit-engineering",
        name: "Reddit Engineering",
        category: "software-engineering",
        rssUrl: "https://medium.com/feed/reddit-engineering",
        sitemapUrl: "https://medium.com/reddit-engineering/sitemap/sitemap-index.xml",
        siteUrl: "https://medium.com/reddit-engineering",
        priority: 10
    },
    {
        id: "canva-engineering",
        name: "Canva Engineering",
        category: "software-engineering",
        rssUrl: "https://canvatechblog.com/feed",
        sitemapUrl: "https://canvatechblog.com/sitemap.xml",
        siteUrl: "https://canvatechblog.com/",
        priority: 10
    },
    {
        id: "atlassian-engineering",
        name: "Atlassian Engineering",
        category: "software-engineering",
        rssUrl: "https://medium.com/feed/atlassian-engineering",
        sitemapUrl: "https://medium.com/atlassian-engineering/sitemap/sitemap-index.xml",
        siteUrl: "https://medium.com/atlassian-engineering",
        priority: 10
    },
    {
        id: "figma-blog",
        name: "Figma Blog",
        category: "software-engineering",
        rssUrl: "https://www.figma.com/blog/section/engineering/feed/",
        sitemapUrl: "https://www.figma.com/sitemap.xml",
        siteUrl: "https://www.figma.com/blog/section/engineering/",
        priority: 10
    },
    {
        id: "notion-engineering",
        name: "Notion Engineering",
        category: "software-engineering",
        rssUrl: "https://www.notion.so/blog/topic/engineering/feed",
        sitemapUrl: "https://www.notion.so/sitemap.xml",
        siteUrl: "https://www.notion.so/blog/topic/engineering",
        priority: 10
    },
    {
        id: "linear-engineering",
        name: "Linear Engineering",
        category: "software-engineering",
        rssUrl: "https://linear.app/blog/feed.xml",
        sitemapUrl: "https://linear.app/sitemap.xml",
        siteUrl: "https://linear.app/blog",
        priority: 10
    },
    {
        id: "vercel-blog",
        name: "Vercel Blog",
        category: "software-engineering",
        rssUrl: "https://vercel.com/blog/feed",
        sitemapUrl: "https://vercel.com/sitemap.xml",
        siteUrl: "https://vercel.com/blog",
        priority: 10
    },
    {
        id: "twilio-engineering",
        name: "Twilio Engineering",
        category: "software-engineering",
        rssUrl: "https://www.twilio.com/blog/feed",
        sitemapUrl: "https://www.twilio.com/sitemap.xml",
        siteUrl: "https://www.twilio.com/blog/category/engineering",
        priority: 10
    },
    {
        id: "datadog-engineering",
        name: "Datadog Engineering",
        category: "software-engineering",
        rssUrl: "https://www.datadoghq.com/blog/index.xml",
        sitemapUrl: "https://www.datadoghq.com/sitemap.xml",
        siteUrl: "https://www.datadoghq.com/blog/",
        priority: 10
    },

    // ==========================================
    // Infrastructure (infrastructure)
    // ==========================================
    {
        id: "aws-architecture-blog",
        name: "AWS Architecture Blog",
        category: "infrastructure",
        rssUrl: "https://aws.amazon.com/blogs/architecture/feed/",
        sitemapUrl: "https://aws.amazon.com/sitemap.xml",
        siteUrl: "https://aws.amazon.com/blogs/architecture/",
        priority: 8
    },
    {
        id: "aws-database-blog",
        name: "AWS Database Blog",
        category: "infrastructure",
        rssUrl: "https://aws.amazon.com/blogs/database/feed/",
        sitemapUrl: "https://aws.amazon.com/sitemap.xml",
        siteUrl: "https://aws.amazon.com/blogs/database/",
        priority: 8
    },
    {
        id: "aws-machine-learning-blog",
        name: "AWS Machine Learning Blog",
        category: "infrastructure",
        rssUrl: "https://aws.amazon.com/blogs/machine-learning/feed/",
        sitemapUrl: "https://aws.amazon.com/sitemap.xml",
        siteUrl: "https://aws.amazon.com/blogs/machine-learning/",
        priority: 8
    },
    {
        id: "google-cloud-blog",
        name: "Google Cloud Blog",
        category: "infrastructure",
        rssUrl: "https://cloud.google.com/blog/rss/",
        sitemapUrl: "https://cloud.google.com/sitemap.xml",
        siteUrl: "https://cloud.google.com/blog/",
        priority: 10
    },
    {
        id: "azure-blog",
        name: "Azure Blog",
        category: "infrastructure",
        rssUrl: "https://azure.microsoft.com/blog/feed/",
        sitemapUrl: "https://azure.microsoft.com/sitemap.xml",
        siteUrl: "https://azure.microsoft.com/blog/",
        priority: 10
    },
    {
        id: "fastly-blog",
        name: "Fastly Blog",
        category: "infrastructure",
        rssUrl: "https://www.fastly.com/blog/feed",
        sitemapUrl: "https://www.fastly.com/sitemap.xml",
        siteUrl: "https://www.fastly.com/blog",
        priority: 8
    },
    {
        id: "digitalocean-blog",
        name: "DigitalOcean Blog",
        category: "infrastructure",
        rssUrl: "https://www.digitalocean.com/blog/rss",
        sitemapUrl: "https://www.digitalocean.com/sitemap.xml",
        siteUrl: "https://www.digitalocean.com/blog",
        priority: 8
    },
    {
        id: "fly-io-blog",
        name: "Fly.io Blog",
        category: "infrastructure",
        rssUrl: "https://fly.io/blog/feed.xml",
        sitemapUrl: "https://fly.io/sitemap.xml",
        siteUrl: "https://fly.io/blog",
        priority: 10
    },
    {
        id: "render-blog",
        name: "Render Blog",
        category: "infrastructure",
        rssUrl: "https://render.com/blog/feed.xml",
        sitemapUrl: "https://render.com/sitemap.xml",
        siteUrl: "https://render.com/blog",
        priority: 8
    },
    {
        id: "railway-blog",
        name: "Railway Blog",
        category: "infrastructure",
        rssUrl: "https://railway.com/blog/feed.xml",
        sitemapUrl: "https://railway.com/sitemap.xml",
        siteUrl: "https://railway.com/blog",
        priority: 8
    },
    {
        id: "planetscale-blog",
        name: "PlanetScale Blog",
        category: "infrastructure",
        rssUrl: "https://planetscale.com/blog/feed.xml",
        sitemapUrl: "https://planetscale.com/sitemap.xml",
        siteUrl: "https://planetscale.com/blog",
        priority: 8
    },
    {
        id: "neon-blog",
        name: "Neon Blog",
        category: "infrastructure",
        rssUrl: "https://neon.tech/blog/feed.xml",
        sitemapUrl: "https://neon.tech/sitemap.xml",
        siteUrl: "https://neon.tech/blog",
        priority: 8
    },
    {
        id: "supabase-blog",
        name: "Supabase Blog",
        category: "infrastructure",
        rssUrl: "https://supabase.com/rss.xml",
        sitemapUrl: "https://supabase.com/sitemap.xml",
        siteUrl: "https://supabase.com/blog",
        priority: 10
    },
    {
        id: "cockroachdb-blog",
        name: "CockroachDB Blog",
        category: "infrastructure",
        rssUrl: "https://www.cockroachlabs.com/blog/index.xml",
        sitemapUrl: "https://www.cockroachlabs.com/sitemap.xml",
        siteUrl: "https://www.cockroachlabs.com/blog",
        priority: 8
    },

    // ==========================================
    // Databases (databases)
    // ==========================================
    {
        id: "mongodb-blog",
        name: "MongoDB Blog",
        category: "databases",
        rssUrl: "https://www.mongodb.com/blog/rss",
        sitemapUrl: "https://www.mongodb.com/sitemap.xml",
        siteUrl: "https://www.mongodb.com/blog",
        priority: 8
    },
    {
        id: "redis-blog",
        name: "Redis Blog",
        category: "databases",
        rssUrl: "https://redis.com/blog/feed/",
        sitemapUrl: "https://redis.com/sitemap.xml",
        siteUrl: "https://redis.com/blog",
        priority: 8
    },
    {
        id: "postgresql-blog",
        name: "PostgreSQL Blog",
        category: "databases",
        rssUrl: "https://www.postgresql.org/news.xml",
        sitemapUrl: "https://www.postgresql.org/sitemap.xml",
        siteUrl: "https://www.postgresql.org/",
        priority: 8
    },
    {
        id: "clickhouse-blog",
        name: "ClickHouse Blog",
        category: "databases",
        rssUrl: "https://clickhouse.com/blog/feed",
        sitemapUrl: "https://clickhouse.com/sitemap.xml",
        siteUrl: "https://clickhouse.com/blog",
        priority: 8
    },
    {
        id: "scylladb-blog",
        name: "ScyllaDB Blog",
        category: "databases",
        rssUrl: "https://www.scylladb.com/feed/",
        sitemapUrl: "https://www.scylladb.com/sitemap.xml",
        siteUrl: "https://www.scylladb.com/blog/",
        priority: 8
    },
    {
        id: "influxdata-blog",
        name: "InfluxData Blog",
        category: "databases",
        rssUrl: "https://www.influxdata.com/blog/feed/",
        sitemapUrl: "https://www.influxdata.com/sitemap.xml",
        siteUrl: "https://www.influxdata.com/blog/",
        priority: 8
    },
    {
        id: "timescale-blog",
        name: "Timescale Blog",
        category: "databases",
        rssUrl: "https://www.timescale.com/blog/rss/",
        sitemapUrl: "https://www.timescale.com/sitemap.xml",
        siteUrl: "https://www.timescale.com/blog",
        priority: 8
    },
    {
        id: "duckdb-blog",
        name: "DuckDB Blog",
        category: "databases",
        rssUrl: "https://duckdb.org/feed.xml",
        sitemapUrl: "https://duckdb.org/sitemap.xml",
        siteUrl: "https://duckdb.org/blog",
        priority: 10
    },
    {
        id: "motherduck-blog",
        name: "MotherDuck Blog",
        category: "databases",
        rssUrl: "https://motherduck.com/blog/feed.xml",
        sitemapUrl: "https://motherduck.com/sitemap.xml",
        siteUrl: "https://motherduck.com/blog/",
        priority: 8
    },
    {
        id: "yugabytedb-blog",
        name: "YugabyteDB Blog",
        category: "databases",
        rssUrl: "https://www.yugabyte.com/blog/feed/",
        sitemapUrl: "https://www.yugabyte.com/sitemap.xml",
        siteUrl: "https://www.yugabyte.com/blog/",
        priority: 8
    },

    // ==========================================
    // AI (ai)
    // ==========================================
    {
        id: "openai-blog",
        name: "OpenAI Blog",
        category: "ai",
        rssUrl: "https://openai.com/news/rss.xml",
        sitemapUrl: "https://openai.com/sitemap.xml",
        siteUrl: "https://openai.com/blog",
        priority: 10
    },
    {
        id: "anthropic-news",
        name: "Anthropic News",
        category: "ai",
        rssUrl: "https://www.anthropic.com/news/rss.xml",
        sitemapUrl: "https://www.anthropic.com/sitemap.xml",
        siteUrl: "https://www.anthropic.com/news",
        priority: 10
    },
    {
        id: "google-deepmind-blog",
        name: "Google DeepMind Blog",
        category: "ai",
        rssUrl: "https://deepmind.google/blog/rss.xml",
        sitemapUrl: "https://deepmind.google/sitemap.xml",
        siteUrl: "https://deepmind.google/blog",
        priority: 10
    },
    {
        id: "hugging-face-blog",
        name: "Hugging Face Blog",
        category: "ai",
        rssUrl: "https://huggingface.co/blog/feed.xml",
        sitemapUrl: "https://huggingface.co/sitemap.xml",
        siteUrl: "https://huggingface.co/blog",
        priority: 10
    },
    {
        id: "langchain-blog",
        name: "LangChain Blog",
        category: "ai",
        rssUrl: "https://blog.langchain.dev/rss/",
        sitemapUrl: "https://blog.langchain.dev/sitemap.xml",
        siteUrl: "https://blog.langchain.dev/",
        priority: 10
    },
    {
        id: "llamaindex-blog",
        name: "LlamaIndex Blog",
        category: "ai",
        rssUrl: "https://blog.llamaindex.ai/feed",
        sitemapUrl: "https://blog.llamaindex.ai/sitemap.xml",
        siteUrl: "https://blog.llamaindex.ai/",
        priority: 10
    },
    {
        id: "weights-biases-blog",
        name: "Weights & Biases Blog",
        category: "ai",
        rssUrl: "https://wandb.ai/fully-connected/feed.xml",
        sitemapUrl: "https://wandb.ai/sitemap.xml",
        siteUrl: "https://wandb.ai/fully-connected",
        priority: 8
    },
    {
        id: "together-ai-blog",
        name: "Together AI Blog",
        category: "ai",
        rssUrl: "https://www.together.ai/blog/rss.xml",
        sitemapUrl: "https://www.together.ai/sitemap.xml",
        siteUrl: "https://www.together.ai/blog",
        priority: 8
    },
    {
        id: "mistral-ai-news",
        name: "Mistral AI News",
        category: "ai",
        rssUrl: "https://mistral.ai/news/feed.xml",
        sitemapUrl: "https://mistral.ai/sitemap.xml",
        siteUrl: "https://mistral.ai/news/",
        priority: 10
    },
    {
        id: "cohere-blog",
        name: "Cohere Blog",
        category: "ai",
        rssUrl: "https://cohere.com/blog/rss.xml",
        sitemapUrl: "https://cohere.com/sitemap.xml",
        siteUrl: "https://cohere.com/blog",
        priority: 10
    },
    {
        id: "perplexity-engineering",
        name: "Perplexity Engineering",
        category: "ai",
        rssUrl: "https://blog.perplexity.ai/rss.xml",
        sitemapUrl: "https://blog.perplexity.ai/sitemap.xml",
        siteUrl: "https://blog.perplexity.ai/",
        priority: 10
    },
    {
        id: "ollama-blog",
        name: "Ollama Blog",
        category: "ai",
        rssUrl: "https://ollama.com/blog/feed.xml",
        sitemapUrl: "https://ollama.com/sitemap.xml",
        siteUrl: "https://ollama.com/blog",
        priority: 10
    },
    {
        id: "engineering-at-meta-ai",
        name: "Engineering at Meta AI",
        category: "ai",
        rssUrl: "https://ai.meta.com/blog/rss/",
        sitemapUrl: "https://ai.meta.com/sitemap.xml",
        siteUrl: "https://ai.meta.com/blog/",
        priority: 10
    },
    {
        id: "google-ai-blog",
        name: "Google AI Blog",
        category: "ai",
        rssUrl: "https://research.google/blog/feed/",
        sitemapUrl: "https://research.google/sitemap.xml",
        siteUrl: "https://ai.google/",
        priority: 10
    },
    {
        id: "netflix-research",
        name: "Netflix Research",
        category: "ai",
        rssUrl: "https://research.netflix.com/feed.xml",
        sitemapUrl: "https://research.netflix.com/sitemap.xml",
        siteUrl: "https://research.netflix.com/",
        priority: 10
    },

    // ==========================================
    // Frontend (frontend)
    // ==========================================
    {
        id: "react-blog",
        name: "React Blog",
        category: "frontend",
        rssUrl: "https://react.dev/feed.xml",
        sitemapUrl: "https://react.dev/sitemap.xml",
        siteUrl: "https://react.dev/blog",
        priority: 10
    },
    {
        id: "nextjs-blog",
        name: "Next.js Blog",
        category: "frontend",
        rssUrl: "https://nextjs.org/feed.xml",
        sitemapUrl: "https://nextjs.org/sitemap.xml",
        siteUrl: "https://nextjs.org/blog",
        priority: 10
    },
    {
        id: "vuejs-blog",
        name: "Vue.js Blog",
        category: "frontend",
        rssUrl: "https://blog.vuejs.org/feed.xml",
        sitemapUrl: "https://blog.vuejs.org/sitemap.xml",
        siteUrl: "https://blog.vuejs.org/",
        priority: 8
    },
    {
        id: "svelte-blog",
        name: "Svelte Blog",
        category: "frontend",
        rssUrl: "https://svelte.dev/blog/rss.xml",
        sitemapUrl: "https://svelte.dev/sitemap.xml",
        siteUrl: "https://svelte.dev/blog",
        priority: 8
    },
    {
        id: "angular-blog",
        name: "Angular Blog",
        category: "frontend",
        rssUrl: "https://blog.angular.io/feed",
        sitemapUrl: "https://blog.angular.io/sitemap.xml",
        siteUrl: "https://blog.angular.io/",
        priority: 8
    },
    {
        id: "vite-blog",
        name: "Vite Blog",
        category: "frontend",
        rssUrl: "https://vite.dev/blog/feed.xml",
        sitemapUrl: "https://vite.dev/sitemap.xml",
        siteUrl: "https://vite.dev/blog",
        priority: 8
    },
    {
        id: "astro-blog",
        name: "Astro Blog",
        category: "frontend",
        rssUrl: "https://astro.build/rss.xml",
        sitemapUrl: "https://astro.build/sitemap-index.xml",
        siteUrl: "https://astro.build/blog/",
        priority: 8
    },
    {
        id: "remix-blog",
        name: "Remix Blog",
        category: "frontend",
        rssUrl: "https://remix.run/blog/rss.xml",
        sitemapUrl: "https://remix.run/sitemap.xml",
        siteUrl: "https://remix.run/blog",
        priority: 8
    },
    {
        id: "nuxt-blog",
        name: "Nuxt Blog",
        category: "frontend",
        rssUrl: "https://nuxt.com/blog/rss.xml",
        sitemapUrl: "https://nuxt.com/sitemap.xml",
        siteUrl: "https://nuxt.com/blog",
        priority: 8
    },
    {
        id: "tailwind-css-blog",
        name: "Tailwind CSS Blog",
        category: "frontend",
        rssUrl: "https://blog.tailwindcss.com/feed.xml",
        sitemapUrl: "https://blog.tailwindcss.com/sitemap.xml",
        siteUrl: "https://blog.tailwindcss.com/",
        priority: 8
    },
    {
        id: "prisma-blog",
        name: "Prisma Blog",
        category: "frontend",
        rssUrl: "https://www.prisma.io/blog/rss.xml",
        sitemapUrl: "https://www.prisma.io/sitemap.xml",
        siteUrl: "https://www.prisma.io/blog",
        priority: 8
    },
    {
        id: "drizzle-orm-blog",
        name: "Drizzle ORM Blog",
        category: "frontend",
        rssUrl: "https://orm.drizzle.team/blog/rss.xml",
        sitemapUrl: "https://orm.drizzle.team/sitemap.xml",
        siteUrl: "https://orm.drizzle.team/blog",
        priority: 8
    },
    {
        id: "biome-blog",
        name: "Biome Blog",
        category: "frontend",
        rssUrl: "https://biomejs.dev/blog/feed.xml",
        sitemapUrl: "https://biomejs.dev/sitemap.xml",
        siteUrl: "https://biomejs.dev/blog/",
        priority: 8
    },
    {
        id: "vitest-blog",
        name: "Vitest Blog",
        category: "frontend",
        rssUrl: "https://vitest.dev/blog/feed.xml",
        sitemapUrl: "https://vitest.dev/sitemap.xml",
        siteUrl: "https://vitest.dev/blog/",
        priority: 8
    },
    {
        id: "playwright-blog",
        name: "Playwright Blog",
        category: "frontend",
        rssUrl: "https://dev.to/feed/playwright",
        sitemapUrl: "https://playwright.dev/sitemap.xml",
        siteUrl: "https://playwright.dev/",
        priority: 8
    },
    {
        id: "cypress-blog",
        name: "Cypress Blog",
        category: "frontend",
        rssUrl: "https://www.cypress.io/blog/feed.xml",
        sitemapUrl: "https://www.cypress.io/sitemap.xml",
        siteUrl: "https://www.cypress.io/blog",
        priority: 8
    },
    {
        id: "expo-blog",
        name: "Expo Blog",
        category: "frontend",
        rssUrl: "https://blog.expo.dev/feed",
        sitemapUrl: "https://blog.expo.dev/sitemap.xml",
        siteUrl: "https://blog.expo.dev/",
        priority: 8
    },
    {
        id: "electron-blog",
        name: "Electron Blog",
        category: "frontend",
        rssUrl: "https://www.electronjs.org/blog/rss.xml",
        sitemapUrl: "https://www.electronjs.org/sitemap.xml",
        siteUrl: "https://www.electronjs.org/blog",
        priority: 8
    },

    // ==========================================
    // Backend (backend)
    // ==========================================
    {
        id: "nodejs-blog",
        name: "Node.js Blog",
        category: "backend",
        rssUrl: "https://nodejs.org/en/feed/blog.xml",
        sitemapUrl: "https://nodejs.org/sitemap.xml",
        siteUrl: "https://nodejs.org/en/blog/",
        priority: 8
    },
    {
        id: "deno-blog",
        name: "Deno Blog",
        category: "backend",
        rssUrl: "https://deno.com/blog/feed.xml",
        sitemapUrl: "https://deno.com/sitemap.xml",
        siteUrl: "https://deno.com/blog",
        priority: 8
    },
    {
        id: "bun-blog",
        name: "Bun Blog",
        category: "backend",
        rssUrl: "https://bun.sh/blog/feed.xml",
        sitemapUrl: "https://bun.sh/sitemap.xml",
        siteUrl: "https://bun.sh/blog",
        priority: 8
    },
    {
        id: "rust-blog",
        name: "Rust Blog",
        category: "backend",
        rssUrl: "https://blog.rust-lang.org/feed.xml",
        sitemapUrl: "https://blog.rust-lang.org/sitemap.xml",
        siteUrl: "https://blog.rust-lang.org/",
        priority: 8
    },
    {
        id: "go-blog",
        name: "Go Blog",
        category: "backend",
        rssUrl: "https://go.dev/blog/feed.atom",
        sitemapUrl: "https://go.dev/sitemap.xml",
        siteUrl: "https://go.dev/blog/",
        priority: 8
    },
    {
        id: "python-software-foundation-blog",
        name: "Python Software Foundation Blog",
        category: "backend",
        rssUrl: "https://pyfound.blogspot.com/feeds/posts/default?alt=rss",
        sitemapUrl: "https://pyfound.blogspot.com/sitemap.xml",
        siteUrl: "https://pyfound.blogspot.com/",
        priority: 8
    },

    // ==========================================
    // DevOps (devops)
    // ==========================================
    {
        id: "docker-blog",
        name: "Docker Blog",
        category: "devops",
        rssUrl: "https://www.docker.com/blog/feed/",
        sitemapUrl: "https://www.docker.com/sitemap.xml",
        siteUrl: "https://www.docker.com/blog/",
        priority: 8
    },
    {
        id: "kubernetes-blog",
        name: "Kubernetes Blog",
        category: "devops",
        rssUrl: "https://kubernetes.io/feed.xml",
        sitemapUrl: "https://kubernetes.io/sitemap.xml",
        siteUrl: "https://kubernetes.io/blog/",
        priority: 8
    },
    {
        id: "hashicorp-blog",
        name: "HashiCorp Blog",
        category: "devops",
        rssUrl: "https://www.hashicorp.com/blog/feed.xml",
        sitemapUrl: "https://www.hashicorp.com/sitemap.xml",
        siteUrl: "https://www.hashicorp.com/blog",
        priority: 8
    },
    {
        id: "grafana-labs-blog",
        name: "Grafana Labs Blog",
        category: "devops",
        rssUrl: "https://grafana.com/blog/index.xml",
        sitemapUrl: "https://grafana.com/sitemap.xml",
        siteUrl: "https://grafana.com/blog/",
        priority: 8
    },
    {
        id: "prometheus-blog",
        name: "Prometheus Blog",
        category: "devops",
        rssUrl: "https://prometheus.io/blog/feed.xml",
        sitemapUrl: "https://prometheus.io/sitemap.xml",
        siteUrl: "https://prometheus.io/blog/",
        priority: 8
    },
    {
        id: "opentelemetry-blog",
        name: "OpenTelemetry Blog",
        category: "devops",
        rssUrl: "https://opentelemetry.io/feed.xml",
        sitemapUrl: "https://opentelemetry.io/sitemap.xml",
        siteUrl: "https://opentelemetry.io/blog/",
        priority: 8
    },
    {
        id: "helm-blog",
        name: "Helm Blog",
        category: "devops",
        rssUrl: "https://helm.sh/blog/feed.xml",
        sitemapUrl: "https://helm.sh/sitemap.xml",
        siteUrl: "https://helm.sh/blog/",
        priority: 8
    },
    {
        id: "argocd-blog",
        name: "ArgoCD Blog",
        category: "devops",
        rssUrl: "https://blog.argoproj.io/feed",
        sitemapUrl: "https://argoproj.github.io/sitemap.xml",
        siteUrl: "https://blog.argoproj.io/",
        priority: 8
    },
    {
        id: "istio-blog",
        name: "Istio Blog",
        category: "devops",
        rssUrl: "https://istio.io/latest/news/feed.xml",
        sitemapUrl: "https://istio.io/sitemap.xml",
        siteUrl: "https://istio.io/latest/news/",
        priority: 8
    },
    {
        id: "linkerd-blog",
        name: "Linkerd Blog",
        category: "devops",
        rssUrl: "https://linkerd.io/feed.xml",
        sitemapUrl: "https://linkerd.io/sitemap.xml",
        siteUrl: "https://linkerd.io/blog/",
        priority: 8
    },

    // ==========================================
    // Security (security)
    // ==========================================
    {
        id: "trail-of-bits-blog",
        name: "Trail of Bits Blog",
        category: "security",
        rssUrl: "https://blog.trailofbits.com/feed/",
        sitemapUrl: "https://blog.trailofbits.com/sitemap.xml",
        siteUrl: "https://blog.trailofbits.com/",
        priority: 8
    },
    {
        id: "snyk-blog",
        name: "Snyk Blog",
        category: "security",
        rssUrl: "https://snyk.io/blog/feed/",
        sitemapUrl: "https://snyk.io/sitemap.xml",
        siteUrl: "https://snyk.io/blog/",
        priority: 8
    },
    {
        id: "auth0-blog",
        name: "Auth0 Blog",
        category: "security",
        rssUrl: "https://auth0.com/blog/rss.xml",
        sitemapUrl: "https://auth0.com/sitemap.xml",
        siteUrl: "https://auth0.com/blog/",
        priority: 8
    },
    {
        id: "okta-developer-blog",
        name: "Okta Developer Blog",
        category: "security",
        rssUrl: "https://developer.okta.com/blog/feed.xml",
        sitemapUrl: "https://developer.okta.com/sitemap.xml",
        siteUrl: "https://developer.okta.com/blog/",
        priority: 8
    },
    {
        id: "owasp-blog",
        name: "OWASP Blog",
        category: "security",
        rssUrl: "https://owasp.org/blog/feed.xml",
        sitemapUrl: "https://owasp.org/sitemap.xml",
        siteUrl: "https://owasp.org/blog/",
        priority: 8
    },
    {
        id: "chainguard-blog",
        name: "Chainguard Blog",
        category: "security",
        rssUrl: "https://www.chainguard.dev/unchained/rss.xml",
        sitemapUrl: "https://www.chainguard.dev/sitemap.xml",
        siteUrl: "https://www.chainguard.dev/unchained",
        priority: 8
    },

    // ==========================================
    // Personal Tech Blogs (personal-blogs)
    // ==========================================
    {
        id: "martin-fowler",
        name: "Martin Fowler",
        category: "personal-blogs",
        rssUrl: "https://martinfowler.com/feed.atom",
        sitemapUrl: "https://martinfowler.com/sitemap.xml",
        siteUrl: "https://martinfowler.com/",
        priority: 10
    },
    {
        id: "kent-c-dodds",
        name: "Kent C. Dodds",
        category: "personal-blogs",
        rssUrl: "https://kentcdodds.com/blog/rss.xml",
        sitemapUrl: "https://kentcdodds.com/sitemap.xml",
        siteUrl: "https://kentcdodds.com/blog",
        priority: 10
    },
    {
        id: "dan-abramov",
        name: "Dan Abramov",
        category: "personal-blogs",
        rssUrl: "https://overreacted.io/rss.xml",
        sitemapUrl: "https://overreacted.io/sitemap.xml",
        siteUrl: "https://overreacted.io/",
        priority: 10
    },
    {
        id: "addy-osmani",
        name: "Addy Osmani",
        category: "personal-blogs",
        rssUrl: "https://addyosmani.com/feed/",
        sitemapUrl: "https://addyosmani.com/sitemap.xml",
        siteUrl: "https://addyosmani.com/",
        priority: 10
    },
    {
        id: "jake-archibald",
        name: "Jake Archibald",
        category: "personal-blogs",
        rssUrl: "https://jakearchibald.com/posts.rss",
        sitemapUrl: "https://jakearchibald.com/sitemap.xml",
        siteUrl: "https://jakearchibald.com/",
        priority: 10
    },
    {
        id: "brendan-gregg",
        name: "Brendan Gregg",
        category: "personal-blogs",
        rssUrl: "http://www.brendangregg.com/blog/rss.xml",
        sitemapUrl: "http://www.brendangregg.com/sitemap.xml",
        siteUrl: "http://www.brendangregg.com/blog/",
        priority: 10
    },
    {
        id: "julia-evans",
        name: "Julia Evans",
        category: "personal-blogs",
        rssUrl: "https://jvns.ca/atom.xml",
        sitemapUrl: "https://jvns.ca/sitemap.xml",
        siteUrl: "https://jvns.ca/",
        priority: 10
    },
    {
        id: "charity-majors",
        name: "Charity Majors",
        category: "personal-blogs",
        rssUrl: "https://charity.wtf/feed/",
        sitemapUrl: "https://charity.wtf/sitemap.xml",
        siteUrl: "https://charity.wtf/",
        priority: 10
    },
    {
        id: "dhh-blog",
        name: "DHH Blog",
        category: "personal-blogs",
        rssUrl: "https://world.hey.com/dhh/feed.atom",
        sitemapUrl: "https://world.hey.com/dhh/sitemap.xml",
        siteUrl: "https://world.hey.com/dhh",
        priority: 10
    },

    // ==========================================
    // General Engineering (general-engineering)
    // ==========================================
    {
        id: "infoq",
        name: "InfoQ",
        category: "general-engineering",
        rssUrl: "https://feed.infoq.com/",
        sitemapUrl: "https://www.infoq.com/sitemap.xml",
        siteUrl: "https://www.infoq.com/",
        priority: 8
    },
    {
        id: "acm-queue",
        name: "ACM Queue",
        category: "general-engineering",
        rssUrl: "https://queue.acm.org/rss/feeds/queue.xml",
        sitemapUrl: "https://queue.acm.org/sitemap.xml",
        siteUrl: "https://queue.acm.org/",
        priority: 8
    },
    {
        id: "thoughtworks-insights",
        name: "Thoughtworks Insights",
        category: "general-engineering",
        rssUrl: "https://www.thoughtworks.com/rss/insights.xml",
        sitemapUrl: "https://www.thoughtworks.com/sitemap.xml",
        siteUrl: "https://www.thoughtworks.com/en-in/insights",
        priority: 8
    },
    {
        id: "high-scalability",
        name: "High Scalability",
        category: "general-engineering",
        rssUrl: "http://feeds.feedburner.com/HighScalability",
        sitemapUrl: "http://highscalability.com/sitemap.xml",
        siteUrl: "http://highscalability.com/",
        priority: 8
    },
    {
        id: "the-pragmatic-engineer",
        name: "The Pragmatic Engineer",
        category: "general-engineering",
        rssUrl: "https://newsletter.pragmaticengineer.com/feed",
        sitemapUrl: "https://blog.pragmaticengineer.com/sitemap.xml",
        siteUrl: "https://blog.pragmaticengineer.com/",
        priority: 10
    },
    {
        id: "bytebytego",
        name: "ByteByteGo",
        category: "general-engineering",
        rssUrl: "https://blog.bytebytego.com/feed",
        sitemapUrl: "https://blog.bytebytego.com/sitemap.xml",
        siteUrl: "https://blog.bytebytego.com/",
        priority: 10
    }
];


type InputSource = {
    id: string,
    name: string,
    category: string,
    rssUrl: string,
    sitemapUrl: string,
    siteUrl: string,
    priority: number
}

export const MVP_SOURCES: InputSource[] = [
    // ==========================================
    // Big Tech (software-engineering)
    // ==========================================
    {
        id: "netflix-techblog",
        name: "Netflix TechBlog",
        category: "software-engineering",
        rssUrl: "https://netflixtechblog.com/feed",
        sitemapUrl: "https://netflixtechblog.com/sitemap.xml",
        siteUrl: "https://netflixtechblog.com/",
        priority: 10
    },
    {
        id: "meta-engineering",
        name: "Meta Engineering",
        category: "software-engineering",
        rssUrl: "https://engineering.fb.com/feed/",
        sitemapUrl: "https://engineering.fb.com/sitemap.xml",
        siteUrl: "https://engineering.fb.com/",
        priority: 10
    },
    {
        id: "stripe-engineering",
        name: "Stripe Engineering",
        category: "software-engineering",
        rssUrl: "https://stripe.com/blog/feed.rss",
        sitemapUrl: "https://stripe.com/sitemap.xml",
        siteUrl: "https://stripe.com/blog/engineering",
        priority: 10
    },
    {
        id: "uber-engineering",
        name: "Uber Engineering",
        category: "software-engineering",
        rssUrl: "https://www.uber.com/en-US/blog/rss/",
        sitemapUrl: "https://www.uber.com/sitemap.xml",
        siteUrl: "https://www.uber.com/blog/engineering/",
        priority: 10
    },
    {
        id: "github-engineering",
        name: "GitHub Engineering",
        category: "software-engineering",
        rssUrl: "https://github.blog/category/engineering/feed/",
        sitemapUrl: "https://github.blog/sitemap_index.xml",
        siteUrl: "https://github.blog/category/engineering/",
        priority: 10
    },
    {
        id: "slack-engineering",
        name: "Slack Engineering",
        category: "software-engineering",
        rssUrl: "https://slack.engineering/feed",
        sitemapUrl: "https://slack.engineering/sitemap.xml",
        siteUrl: "https://slack.engineering/",
        priority: 10
    },
    {
        id: "cloudflare-blog",
        name: "Cloudflare Blog",
        category: "software-engineering",
        rssUrl: "https://blog.cloudflare.com/rss/",
        sitemapUrl: "https://blog.cloudflare.com/sitemap.xml",
        siteUrl: "https://blog.cloudflare.com/",
        priority: 10
    },
    {
        id: "discord-engineering",
        name: "Discord Engineering",
        category: "software-engineering",
        rssUrl: "https://discord.com/blog/rss.xml",
        sitemapUrl: "https://discord.com/sitemap.xml",
        siteUrl: "https://discord.com/blog/categories/engineering",
        priority: 10
    },
    {
        id: "doordash-engineering",
        name: "DoorDash Engineering",
        category: "software-engineering",
        rssUrl: "https://doordash.engineering/feed/",
        sitemapUrl: "https://doordash.engineering/sitemap.xml",
        siteUrl: "https://doordash.engineering/",
        priority: 9
    },

    // ==========================================
    // AI (ai)
    // ==========================================
    {
        id: "openai-blog",
        name: "OpenAI Blog",
        category: "ai",
        rssUrl: "https://openai.com/news/rss.xml",
        sitemapUrl: "https://openai.com/sitemap.xml",
        siteUrl: "https://openai.com/news/",
        priority: 10
    },
    {
        id: "anthropic-news",
        name: "Anthropic News",
        category: "ai",
        rssUrl: "https://www.anthropic.com/news/rss.xml",
        sitemapUrl: "https://www.anthropic.com/sitemap.xml",
        siteUrl: "https://www.anthropic.com/news",
        priority: 10
    },
    {
        id: "hugging-face-blog",
        name: "Hugging Face Blog",
        category: "ai",
        rssUrl: "https://huggingface.co/blog/feed.xml",
        sitemapUrl: "https://huggingface.co/sitemap.xml",
        siteUrl: "https://huggingface.co/blog",
        priority: 10
    },

    // ==========================================
    // Frontend & Languages (frontend / backend)
    // ==========================================
    {
        id: "react-blog",
        name: "React Blog",
        category: "frontend",
        rssUrl: "https://react.dev/feed.xml",
        sitemapUrl: "https://react.dev/sitemap.xml",
        siteUrl: "https://react.dev/blog",
        priority: 10
    },
    {
        id: "nextjs-blog",
        name: "Next.js Blog",
        category: "frontend",
        rssUrl: "https://nextjs.org/feed.xml",
        sitemapUrl: "https://nextjs.org/sitemap.xml",
        siteUrl: "https://nextjs.org/blog",
        priority: 10
    },
    {
        id: "angular-blog",
        name: "Angular Blog",
        category: "frontend",
        rssUrl: "https://blog.angular.dev/feed",
        sitemapUrl: "https://blog.angular.dev/sitemap.xml",
        siteUrl: "https://blog.angular.dev/",
        priority: 8
    },
    {
        id: "rust-blog",
        name: "Rust Blog",
        category: "backend",
        rssUrl: "https://blog.rust-lang.org/feed.xml",
        sitemapUrl: "https://blog.rust-lang.org/sitemap.xml",
        siteUrl: "https://blog.rust-lang.org/",
        priority: 8
    },
    {
        id: "go-blog",
        name: "Go Blog",
        category: "backend",
        rssUrl: "https://go.dev/blog/feed.atom",
        sitemapUrl: "https://go.dev/sitemap.xml",
        siteUrl: "https://go.dev/blog/",
        priority: 8
    },

    // ==========================================
    // Personal Tech Blogs (personal-blogs)
    // ==========================================
    {
        id: "martin-fowler",
        name: "Martin Fowler",
        category: "personal-blogs",
        rssUrl: "https://martinfowler.com/feed.atom",
        sitemapUrl: "https://martinfowler.com/sitemap.xml",
        siteUrl: "https://martinfowler.com/",
        priority: 10
    },
    {
        id: "julia-evans",
        name: "Julia Evans",
        category: "personal-blogs",
        rssUrl: "https://jvns.ca/atom.xml",
        sitemapUrl: "https://jvns.ca/sitemap.xml",
        siteUrl: "https://jvns.ca/",
        priority: 10
    },
    {
        id: "dan-luu",
        name: "Dan Luu",
        category: "personal-blogs",
        rssUrl: "https://danluu.com/atom.xml",
        sitemapUrl: "https://danluu.com/sitemap.xml",
        siteUrl: "https://danluu.com/",
        priority: 10
    },
    {
        id: "tania-rascia",
        name: "Tania Rascia",
        category: "personal-blogs",
        rssUrl: "https://tania.dev/rss.xml",
        sitemapUrl: "https://tania.dev/sitemap.xml",
        siteUrl: "https://tania.dev/",
        priority: 9
    },
    {
        id: "jake-wharton",
        name: "Jake Wharton",
        category: "personal-blogs",
        rssUrl: "https://jakewharton.com/atom.xml",
        sitemapUrl: "https://jakewharton.com/sitemap.xml",
        siteUrl: "https://jakewharton.com/blog",
        priority: 9
    },

    // ==========================================
    // Infrastructure & Databases (infrastructure)
    // ==========================================
    {
        id: "supabase-blog",
        name: "Supabase Blog",
        category: "infrastructure",
        rssUrl: "https://supabase.com/rss.xml",
        sitemapUrl: "https://supabase.com/sitemap.xml",
        siteUrl: "https://supabase.com/blog",
        priority: 10
    },
    {
        id: "cockroachdb-blog",
        name: "CockroachDB Blog",
        category: "infrastructure",
        rssUrl: "https://www.cockroachlabs.com/blog/index.xml",
        sitemapUrl: "https://www.cockroachlabs.com/sitemap.xml",
        siteUrl: "https://www.cockroachlabs.com/blog",
        priority: 8
    }
];



//! use top 50 working and mpv ke liya perfectly
export const VERIFIED_SOURCES: InputSource[] = [

    {
        id: "netflix-techblog",
        name: "Netflix TechBlog",
        category: "software-engineering",
        rssUrl: "https://netflixtechblog.com/feed",
        sitemapUrl: "https://netflixtechblog.com/sitemap.xml",
        siteUrl: "https://netflixtechblog.com/",
        priority: 10,
    },
    {
        id: "airbnb-engineering",
        name: "Airbnb Engineering",
        category: "software-engineering",
        rssUrl: "https://medium.com/feed/airbnb-engineering",
        sitemapUrl: "https://airbnb.io/sitemap.xml",
        siteUrl: "https://airbnb.io/",
        priority: 10,
    },
    {
        id: "stripe-engineering",
        name: "Stripe Engineering",
        category: "software-engineering",
        rssUrl: "https://stripe.com/blog/feed.rss",
        sitemapUrl: "https://stripe.com/sitemap.xml",
        siteUrl: "https://stripe.com/blog/engineering",
        priority: 10,
    },
    {
        id: "cloudflare-blog",
        name: "Cloudflare Blog",
        category: "software-engineering",
        rssUrl: "https://blog.cloudflare.com/rss/",
        sitemapUrl: "https://blog.cloudflare.com/sitemap.xml",
        siteUrl: "https://blog.cloudflare.com/",
        priority: 10,
    },
    {
        id: "cloudflare-developers",
        name: "Cloudflare Developers",
        category: "software-engineering",
        rssUrl: "https://blog.cloudflare.com/tag/developers/rss/",
        sitemapUrl: "https://blog.cloudflare.com/sitemap.xml",
        siteUrl: "https://blog.cloudflare.com/tag/developers/",
        priority: 8,
    },
    {
        id: "meta-engineering",
        name: "Meta Engineering",
        category: "software-engineering",
        rssUrl: "https://engineering.fb.com/feed/",
        sitemapUrl: "https://engineering.fb.com/sitemap.xml",
        siteUrl: "https://engineering.fb.com/",
        priority: 10,
    },
    {
        id: "github-engineering",
        name: "GitHub Engineering",
        category: "software-engineering",
        rssUrl: "https://github.blog/category/engineering/feed/",
        sitemapUrl: "https://github.blog/sitemap_index.xml",
        siteUrl: "https://github.blog/category/engineering/",
        priority: 10,
    },
    {
        id: "slack-engineering",
        name: "Slack Engineering",
        category: "software-engineering",
        rssUrl: "https://slack.engineering/feed",
        sitemapUrl: "https://slack.engineering/sitemap.xml",
        siteUrl: "https://slack.engineering/",
        priority: 10,
    },
    {
        id: "dropbox-tech",
        name: "Dropbox Tech",
        category: "software-engineering",
        rssUrl: "https://dropbox.tech/feed",
        sitemapUrl: "https://dropbox.tech/sitemap.xml",
        siteUrl: "https://dropbox.tech/",
        priority: 10,
    },
    {
        id: "canva-engineering",
        name: "Canva Engineering",
        category: "software-engineering",
        rssUrl: "https://canvatechblog.com/feed",
        sitemapUrl: "https://canvatechblog.com/sitemap.xml",
        siteUrl: "https://canvatechblog.com/",
        priority: 10,
    },
    {
        id: "vercel-blog",
        name: "Vercel Blog",
        category: "software-engineering",
        rssUrl: "https://vercel.com/blog/feed",
        sitemapUrl: "https://vercel.com/sitemap.xml",
        siteUrl: "https://vercel.com/blog",
        priority: 10,
    },
    {
        id: "datadog-engineering",
        name: "Datadog Engineering",
        category: "software-engineering",
        rssUrl: "https://www.datadoghq.com/blog/index.xml",
        sitemapUrl: "https://www.datadoghq.com/sitemap.xml",
        siteUrl: "https://www.datadoghq.com/blog/",
        priority: 10,
    },
    {
        id: "aws-architecture-blog",
        name: "AWS Architecture Blog",
        category: "infrastructure",
        rssUrl: "https://aws.amazon.com/blogs/architecture/feed/",
        sitemapUrl: "https://aws.amazon.com/sitemap.xml",
        siteUrl: "https://aws.amazon.com/blogs/architecture/",
        priority: 8,
    },
    {
        id: "aws-database-blog",
        name: "AWS Database Blog",
        category: "infrastructure",
        rssUrl: "https://aws.amazon.com/blogs/database/feed/",
        sitemapUrl: "https://aws.amazon.com/sitemap.xml",
        siteUrl: "https://aws.amazon.com/blogs/database/",
        priority: 8,
    },
    {
        id: "aws-machine-learning-blog",
        name: "AWS Machine Learning Blog",
        category: "infrastructure",
        rssUrl: "https://aws.amazon.com/blogs/machine-learning/feed/",
        sitemapUrl: "https://aws.amazon.com/sitemap.xml",
        siteUrl: "https://aws.amazon.com/blogs/machine-learning/",
        priority: 8,
    },
    {
        id: "azure-blog",
        name: "Azure Blog",
        category: "infrastructure",
        rssUrl: "https://azure.microsoft.com/blog/feed/",
        sitemapUrl: "https://azure.microsoft.com/sitemap.xml",
        siteUrl: "https://azure.microsoft.com/blog/",
        priority: 10,
    },
    {
        id: "digitalocean-blog",
        name: "DigitalOcean Blog",
        category: "infrastructure",
        rssUrl: "https://www.digitalocean.com/blog/rss",
        sitemapUrl: "https://www.digitalocean.com/sitemap.xml",
        siteUrl: "https://www.digitalocean.com/blog",
        priority: 8,
    },
    {
        id: "fly-io-blog",
        name: "Fly.io Blog",
        category: "infrastructure",
        rssUrl: "https://fly.io/blog/feed.xml",
        sitemapUrl: "https://fly.io/sitemap.xml",
        siteUrl: "https://fly.io/blog",
        priority: 10,
    },
    {
        id: "supabase-blog",
        name: "Supabase Blog",
        category: "infrastructure",
        rssUrl: "https://supabase.com/rss.xml",
        sitemapUrl: "https://supabase.com/sitemap.xml",
        siteUrl: "https://supabase.com/blog",
        priority: 10,
    },
    {
        id: "mongodb-blog",
        name: "MongoDB Blog",
        category: "databases",
        rssUrl: "https://www.mongodb.com/blog/rss",
        sitemapUrl: "https://www.mongodb.com/sitemap.xml",
        siteUrl: "https://www.mongodb.com/blog",
        priority: 8,
    },
    {
        id: "redis-blog",
        name: "Redis Blog",
        category: "databases",
        rssUrl: "https://redis.com/blog/feed/",
        sitemapUrl: "https://redis.com/sitemap.xml",
        siteUrl: "https://redis.com/blog",
        priority: 8,
    },
    {
        id: "duckdb-blog",
        name: "DuckDB Blog",
        category: "databases",
        rssUrl: "https://duckdb.org/feed.xml",
        sitemapUrl: "https://duckdb.org/sitemap.xml",
        siteUrl: "https://duckdb.org/blog",
        priority: 10,
    },
    {
        id: "yugabytedb-blog",
        name: "YugabyteDB Blog",
        category: "databases",
        rssUrl: "https://www.yugabyte.com/blog/feed/",
        sitemapUrl: "https://www.yugabyte.com/sitemap.xml",
        siteUrl: "https://www.yugabyte.com/blog/",
        priority: 8,
    },
    {
        id: "openai-blog",
        name: "OpenAI Blog",
        category: "ai",
        rssUrl: "https://openai.com/news/rss.xml",
        sitemapUrl: "https://openai.com/sitemap.xml",
        siteUrl: "https://openai.com/blog",
        priority: 10,
    },
    {
        id: "google-deepmind-blog",
        name: "Google DeepMind Blog",
        category: "ai",
        rssUrl: "https://deepmind.google/blog/rss.xml",
        sitemapUrl: "https://deepmind.google/sitemap.xml",
        siteUrl: "https://deepmind.google/blog",
        priority: 10,
    },
    {
        id: "hugging-face-blog",
        name: "Hugging Face Blog",
        category: "ai",
        rssUrl: "https://huggingface.co/blog/feed.xml",
        sitemapUrl: "https://huggingface.co/sitemap.xml",
        siteUrl: "https://huggingface.co/blog",
        priority: 10,
    },
    {
        id: "together-ai-blog",
        name: "Together AI Blog",
        category: "ai",
        rssUrl: "https://www.together.ai/blog/rss.xml",
        sitemapUrl: "https://www.together.ai/sitemap.xml",
        siteUrl: "https://www.together.ai/blog",
        priority: 8,
    },
    {
        id: "react-blog",
        name: "React Blog",
        category: "frontend",
        rssUrl: "https://react.dev/feed.xml",
        sitemapUrl: "https://react.dev/sitemap.xml",
        siteUrl: "https://react.dev/blog",
        priority: 10,
    },
    {
        id: "nextjs-blog",
        name: "Next.js Blog",
        category: "frontend",
        rssUrl: "https://nextjs.org/feed.xml",
        sitemapUrl: "https://nextjs.org/sitemap.xml",
        siteUrl: "https://nextjs.org/blog",
        priority: 10,
    },
    {
        id: "astro-blog",
        name: "Astro Blog",
        category: "frontend",
        rssUrl: "https://astro.build/rss.xml",
        sitemapUrl: "https://astro.build/sitemap-index.xml",
        siteUrl: "https://astro.build/blog/",
        priority: 8,
    },
    {
        id: "remix-blog",
        name: "Remix Blog",
        category: "frontend",
        rssUrl: "https://remix.run/blog/rss.xml",
        sitemapUrl: "https://remix.run/sitemap.xml",
        siteUrl: "https://remix.run/blog",
        priority: 8,
    },
    {
        id: "nuxt-blog",
        name: "Nuxt Blog",
        category: "frontend",
        rssUrl: "https://nuxt.com/blog/rss.xml",
        sitemapUrl: "https://nuxt.com/sitemap.xml",
        siteUrl: "https://nuxt.com/blog",
        priority: 8,
    },
    {
        id: "prisma-blog",
        name: "Prisma Blog",
        category: "frontend",
        rssUrl: "https://www.prisma.io/blog/rss.xml",
        sitemapUrl: "https://www.prisma.io/sitemap.xml",
        siteUrl: "https://www.prisma.io/blog",
        priority: 8,
    },
    {
        id: "nodejs-blog",
        name: "Node.js Blog",
        category: "backend",
        rssUrl: "https://nodejs.org/en/feed/blog.xml",
        sitemapUrl: "https://nodejs.org/sitemap.xml",
        siteUrl: "https://nodejs.org/en/blog/",
        priority: 8,
    },
    {
        id: "rust-blog",
        name: "Rust Blog",
        category: "backend",
        rssUrl: "https://blog.rust-lang.org/feed.xml",
        sitemapUrl: "https://blog.rust-lang.org/sitemap.xml",
        siteUrl: "https://blog.rust-lang.org/",
        priority: 8,
    },
    {
        id: "go-blog",
        name: "Go Blog",
        category: "backend",
        rssUrl: "https://go.dev/blog/feed.atom",
        sitemapUrl: "https://go.dev/sitemap.xml",
        siteUrl: "https://go.dev/blog/",
        priority: 8,
    },
    {
        id: "docker-blog",
        name: "Docker Blog",
        category: "devops",
        rssUrl: "https://www.docker.com/blog/feed/",
        sitemapUrl: "https://www.docker.com/sitemap.xml",
        siteUrl: "https://www.docker.com/blog/",
        priority: 8,
    },
    {
        id: "kubernetes-blog",
        name: "Kubernetes Blog",
        category: "devops",
        rssUrl: "https://kubernetes.io/feed.xml",
        sitemapUrl: "https://kubernetes.io/sitemap.xml",
        siteUrl: "https://kubernetes.io/blog/",
        priority: 8,
    },
    {
        id: "hashicorp-blog",
        name: "HashiCorp Blog",
        category: "devops",
        rssUrl: "https://www.hashicorp.com/blog/feed.xml",
        sitemapUrl: "https://www.hashicorp.com/sitemap.xml",
        siteUrl: "https://www.hashicorp.com/blog",
        priority: 8,
    },
    {
        id: "grafana-labs-blog",
        name: "Grafana Labs Blog",
        category: "devops",
        rssUrl: "https://grafana.com/blog/index.xml",
        sitemapUrl: "https://grafana.com/sitemap.xml",
        siteUrl: "https://grafana.com/blog/",
        priority: 8,
    },
    {
        id: "prometheus-blog",
        name: "Prometheus Blog",
        category: "devops",
        rssUrl: "https://prometheus.io/blog/feed.xml",
        sitemapUrl: "https://prometheus.io/sitemap.xml",
        siteUrl: "https://prometheus.io/blog/",
        priority: 8,
    },
    {
        id: "trail-of-bits-blog",
        name: "Trail of Bits Blog",
        category: "security",
        rssUrl: "https://blog.trailofbits.com/feed/",
        sitemapUrl: "https://blog.trailofbits.com/sitemap.xml",
        siteUrl: "https://blog.trailofbits.com/",
        priority: 8,
    },
    {
        id: "auth0-blog",
        name: "Auth0 Blog",
        category: "security",
        rssUrl: "https://auth0.com/blog/rss.xml",
        sitemapUrl: "https://auth0.com/sitemap.xml",
        siteUrl: "https://auth0.com/blog/",
        priority: 8,
    },
    {
        id: "martin-fowler",
        name: "Martin Fowler",
        category: "personal-blogs",
        rssUrl: "https://martinfowler.com/feed.atom",
        sitemapUrl: "https://martinfowler.com/sitemap.xml",
        siteUrl: "https://martinfowler.com/",
        priority: 10,
    },
    {
        id: "kent-c-dodds",
        name: "Kent C. Dodds",
        category: "personal-blogs",
        rssUrl: "https://kentcdodds.com/blog/rss.xml",
        sitemapUrl: "https://kentcdodds.com/sitemap.xml",
        siteUrl: "https://kentcdodds.com/blog",
        priority: 10,
    },
    {
        id: "dan-abramov",
        name: "Dan Abramov",
        category: "personal-blogs",
        rssUrl: "https://overreacted.io/rss.xml",
        sitemapUrl: "https://overreacted.io/sitemap.xml",
        siteUrl: "https://overreacted.io/",
        priority: 10,
    },
    {
        id: "jake-archibald",
        name: "Jake Archibald",
        category: "personal-blogs",
        rssUrl: "https://jakearchibald.com/posts.rss",
        sitemapUrl: "https://jakearchibald.com/sitemap.xml",
        siteUrl: "https://jakearchibald.com/",
        priority: 10,
    },
    {
        id: "julia-evans",
        name: "Julia Evans",
        category: "personal-blogs",
        rssUrl: "https://jvns.ca/atom.xml",
        sitemapUrl: "https://jvns.ca/sitemap.xml",
        siteUrl: "https://jvns.ca/",
        priority: 10,
    },
    {
        id: "the-pragmatic-engineer",
        name: "The Pragmatic Engineer",
        category: "general-engineering",
        rssUrl: "https://newsletter.pragmaticengineer.com/feed",
        sitemapUrl: "https://blog.pragmaticengineer.com/sitemap.xml",
        siteUrl: "https://blog.pragmaticengineer.com/",
        priority: 10,
    },
    {
        id: "bytebytego",
        name: "ByteByteGo",
        category: "general-engineering",
        rssUrl: "https://blog.bytebytego.com/feed",
        sitemapUrl: "https://blog.bytebytego.com/sitemap.xml",
        siteUrl: "https://blog.bytebytego.com/",
        priority: 10,
    },
];
