import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { formatDate } from "@/features/article/format-date";

export type FeedListItem = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  url: string;
  date: string;
  readingTime: string;
  company: string;
  logo: string;
};

function FeedRow({ item, index }: { item: FeedListItem; index: number }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[3.5rem_1fr]">
      <span className="font-mono text-muted-foreground/50 pt-1.5 text-xs">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <Image
            src={item.logo}
            alt={item.company}
            width={20}
            height={20}
            loading="lazy"
            className="rounded-md bg-white object-contain"
          />
          <span className="text-foreground font-medium">{item.company}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(item.date)}</span>
          <span aria-hidden>·</span>
          <span>{item.readingTime} read</span>
        </div>

        <h2 className="mt-5 max-w-2xl text-lg leading-snug font-medium tracking-tight text-balance sm:text-xl lg:text-2xl">
          {item.title}
        </h2>

        <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7 sm:text-[15px]">
          {item.description}
        </p>

        <span className="text-muted-foreground mt-6 flex items-center gap-1 text-sm opacity-60 transition-all duration-300 group-hover:opacity-100">
          {item.slug ? "Open in reader" : "Read article"}
          <IconArrowUpRight
            stroke={2}
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </div>
  );
}

function FeedList({ articles }: { articles: FeedListItem[] }) {
  if (articles.length === 0) {
    return (
      <div className="border-border/70 flex flex-col items-start gap-3 border-y py-24">
        <p className="text-base font-medium">Nothing here yet.</p>
        <p className="text-muted-foreground text-sm">
          No articles in this topic right now. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-8">
      <ol className="divide-border/70 divide-y">
        {articles.map((article, index) => (
          <li
            key={article.id}
            className="py-10 first:pt-0 last:pb-0 sm:py-14"
          >
            {article.slug ? (
              <Link href={`/read/${article.slug}`} className="group block">
                <FeedRow item={article} index={index} />
              </Link>
            ) : (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <FeedRow item={article} index={index} />
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default FeedList;