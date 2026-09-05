import { IconArrowRight } from '@tabler/icons-react';
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
      url: "https://stripe.dev/blog/how-stripes-document-databases-supported-99.999-uptime-with-zero-downtime-data-migrations",
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
    <section className="space-y-8 my-10">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-wide">
          Featured
        </h2>

        <a
          href="/feed"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          View all →
        </a>
      </div>

      <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {featuredArticles.slice(0, 6).map((article, index) => (

          <a href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
    relative group rounded-lg cursor-pointer
    before:absolute before:-left-8 before:top-0
    before:h-full before:w-px
    before:bg-border before:inset-y-0
    ${index === 0 ? "before:hidden" : ""}`}
            key={article.title}
          >
            <article key={article.title} className="flex flex-col gap-6 h-full">
              {/* Image / Brand Banner */}
              <ArticleBanner url={article.logo} title={article.company} />
              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg line-clamp-2 font-medium leading-relaxed tracking-normal">
                  {article.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground tracking-normal">
                  {article.description}
                </p>
              </div>
              {/* { company && date } */}
              <div className="flex items-center gap-2 mt-auto text-xs text-muted-foreground">
                <span>{article.author}</span>
                <span>·</span>
                <span>{article.date}</span>
                <IconArrowRight stroke={2} className='size-4 duration-300 opacity-0 group-hover:opacity-100 transition-opacity' />
              </div>
            </article>
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <a
          href="/feed"
          className="text-sm  text-muted-foreground hover:text-foreground duration-200 ease-linear "
        >
          Read More Articles →
        </a>
      </div>
    </section>
  )
}

export default FeaturedFeed