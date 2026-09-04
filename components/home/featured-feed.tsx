import ArticleBanner from '../common/article-banner';

function FeaturedFeed() {
  const featuredArticles = [
    {
      title: "How Stripe’s Document Databases Support 99.999% Uptime",
      description:
        "How Stripe designed its database infrastructure and data movement systems for zero-downtime migrations at scale.",
      author: "Stripe Engineering",
      date: "Jun 6, 2024",
      readingTime: "12 min",
      company: "Stripe",
      logo: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128",
      url: "https://stripe.com/blog/how-stripes-document-databases-supported-99999-uptime-with-zero-downtime-data-migrations",
    },
    {
      title: "Recommending Items to More Than a Billion People",
      description:
        "How Facebook scaled collaborative filtering across more than a billion users and 100 billion ratings.",
      author: "Meta Engineering",
      date: "Jun 2, 2015",
      readingTime: "8 min",
      company: "Meta",
      logo: "https://www.google.com/s2/favicons?domain=engineering.fb.com&sz=128",
      url: "https://engineering.fb.com/2015/06/02/core-infra/recommending-items-to-more-than-a-billion-people/",
    },
    {
      title: "How We Built Pingora, the Proxy That Connects Cloudflare to the Internet",
      description:
        "Inside Cloudflare’s Rust-based proxy architecture, built to handle Internet traffic with better performance and efficiency.",
      author: "Cloudflare Engineering",
      date: "Sep 14, 2022",
      readingTime: "12 min",
      company: "Cloudflare",
      logo: "https://www.google.com/s2/favicons?domain=cloudflare.com&sz=128",
      url: "https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/",
    },
  ];

  return (
    <section className="space-y-6 my-10">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-wide">
          Featured
        </h2>

        <a
          href="/articles"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          View all →
        </a>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredArticles.slice(0, 6).map((article) => (
          <article key={article.title} className="group cursor-pointer">
            {/* Image / Brand Banner */}
              <ArticleBanner url={article.logo}/>

            {/* Content */}
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold leading-snug tracking-tight">
                {article.title}
              </h3>

              <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                {article.description}
              </p>

              <div className="flex items-center gap-2 pt-3 text-xs text-muted-foreground">
                <img
                  src={article.logo}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                <span>{article.author}</span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedFeed