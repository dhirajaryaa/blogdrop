import Image from "next/image";
import Link from "next/link";
import GoBackBtn from "@/components/common/go-back";
import { Button } from "@/components/ui/button";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/features/article/format-date";
import type { ArticleBrief } from "../brief-data";

const difficultyStyles: Record<string, string> = {
  junior: "border-border text-muted-foreground",
  mid: "border-primary/30 text-primary",
  senior: "border-destructive/30 text-destructive",
};

const difficultyLabel: Record<string, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
};

function ArticleBriefView({ brief }: { brief: ArticleBrief }) {
  const { article, categoryLabel, related } = brief;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mt-8 sm:mt-12">
        <GoBackBtn text className="mb-10" />
      </div>

      <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
        <Image
          src={article.logo}
          alt={article.company}
          width={20}
          height={20}
          loading="lazy"
          className="rounded-md bg-white object-contain"
        />
        <span className="text-foreground font-medium">{article.company}</span>
        <span aria-hidden>·</span>
        <span>{formatDate(article.date)}</span>
        <span aria-hidden>·</span>
        <span>{article.readingTime} read</span>
      </div>

      <h1 className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
        {article.title}
      </h1>

      <p className="text-muted-foreground mt-4 text-sm">By {article.author}</p>

      <div className="mt-8 flex items-center gap-2">
        <span className="border-border/80 rounded-full border px-3 py-1 text-xs">
          {categoryLabel}
        </span>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-xs",
            difficultyStyles[article.difficulty],
          )}
        >
          {difficultyLabel[article.difficulty]}
        </span>
      </div>

      <div className="mt-12 border-t pt-10">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          AI summary
        </p>
        <p className="mt-4 text-[15px] leading-8 sm:text-base">
          {article.description}
        </p>
      </div>

      <div className="mt-12 border-t pt-10">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Key points
        </p>
        <ul className="mt-4 space-y-3.5">
          {article.keyPoints.map((point) => (
            <li
              key={point}
              className="text-muted-foreground flex gap-3 text-sm leading-7 sm:text-[15px]"
            >
              <span className="bg-primary mt-[11px] size-1.5 shrink-0 rounded-full" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read on {article.company}
            <IconArrowUpRight stroke={2} />
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/feed">Back to feed</Link>
        </Button>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            More in {categoryLabel}
          </p>
          <div className="border-border/70 mt-4 divide-y border-y">
            {related.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/a/${item.slug}`}
                className="group flex flex-col gap-1.5 py-5"
              >
                <span className="text-muted-foreground text-xs">
                  {item.company} · {item.readingTime} read
                </span>
                <span className="text-sm font-medium transition-colors group-hover:underline">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleBriefView;