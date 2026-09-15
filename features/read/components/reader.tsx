import Image from "next/image";
import Link from "next/link";
import GoBackBtn from "@/components/common/go-back";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/features/article/format-date";
import type { ReaderArticle } from "../reader-data";

const difficultyLabels: Record<string, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
};

function Reader({ article }: { article: ReaderArticle }) {
  return (
    <>
      <header className="bg-background/80 sticky top-0 z-20 border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <GoBackBtn text={false} />
            <span className="text-muted-foreground hidden truncate text-xs sm:block">
              {article.company}
            </span>
          </div>

          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open original"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Open original
            <IconArrowUpRight size={15} stroke={2} />
          </Link>
        </div>
      </header>

      <article className="mx-auto w-full max-w-2xl px-5 pt-14 pb-32 sm:pt-20 sm:px-0">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          {article.logo && (
            <Image
              src={article.logo}
              alt={article.company}
              width={20}
              height={20}
              loading="lazy"
              className="rounded-md bg-white object-contain"
            />
          )}
          <span className="text-foreground font-medium">{article.company}</span>
          <span aria-hidden>·</span>
          <span>{article.date ? formatDate(article.date) : ""}</span>
          {article.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span>{article.readingTime} read</span>
            </>
          )}
        </div>

        <h1 className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
          {article.title}
        </h1>

        <p className="text-muted-foreground mt-4 text-sm">By {article.author}</p>

        {article.whyRead && (
          <p className="mt-8 border-l-2 pl-5 text-base text-muted-foreground italic leading-7">
            {article.whyRead}
          </p>
        )}

        {(article.summary || article.keyTakeaways) && (
          <aside className="mt-10 rounded-2xl border p-7">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              TL;DR
            </p>
            {article.summary && (
              <p className="mt-4 text-sm leading-7 sm:text-base">{article.summary}</p>
            )}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {article.keyTakeaways.map((takeaway) => (
                  <li
                    key={takeaway}
                    className="text-muted-foreground flex gap-3 text-sm leading-6"
                  >
                    <span className="mt-[9px] size-1 shrink-0 rounded-full bg-muted-foreground/60" />
                    {takeaway}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex items-center gap-2 border-t pt-5">
              {article.difficulty && (
                <span className="border-border/80 rounded-full border px-3 py-1 text-xs">
                  {difficultyLabels[article.difficulty] ?? article.difficulty}
                </span>
              )}
              {article.readingTime && (
                <span className="text-muted-foreground text-xs">
                  {article.readingTime} read
                </span>
              )}
            </div>
          </aside>
        )}

        <div className="my-12 h-px w-full bg-border/70" />

        {article.content ? (
          <div className="text-foreground/85 text-[15px] leading-8 whitespace-pre-wrap sm:text-base">
            {article.content}
          </div>
        ) : (
          <p className="text-muted-foreground text-[15px] leading-8">
            Full article content will appear here once it&apos;s been collected.
          </p>
        )}

        {article.isPreview && (
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border p-7">
            <p className="text-sm font-medium">Preview</p>
            <p className="text-muted-foreground text-sm leading-6">
              This is a preview while articles are being collected. The full
              text syncs automatically.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={article.url} target="_blank" rel="noopener noreferrer">
                Read the full story on {article.company}
                <IconArrowUpRight size={15} stroke={2} />
              </Link>
            </Button>
          </div>
        )}
      </article>
    </>
  );
}

export default Reader;