"use client";

import Link from "next/link";
import { FeedType } from "@/actions/feed";
import {
    IconArrowRight,
    IconBookmark,
    IconBulb,
    IconClock,
    IconSparkles,
    IconUser,
} from "@tabler/icons-react";
import { formatAuthors } from "@/utils/format-author";
import { formatDate } from "@/utils/format-date";
import { Button } from "@/components/ui/button";

export function ArticleCard({ article }: { article: FeedType }) {
    const domain = new URL(article.originalUrl).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;

    return (
        <article className="group flex flex-col sm:flex-row gap-4 py-6 transition-all hover:shadow-sm p-4 rounded-2xl bg-card border-2 relative hover:scale-99 duration-300 dark:bg-accent/60">
            <Link href={`/article/${article.slug}`} className="absolute inset-0 z-0" aria-label={`Read ${article.title}`} />

            <div className="flex flex-1 flex-col justify-between">
                <div>
                    {/* Metadata Row */}
                    <div className="mb-2 flex items-center gap-3 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                        <span className="inline-flex items-center gap-2 text-foreground/70 tracking-normal font-bold">
                            <img loading="lazy" decoding="async" src={faviconUrl} alt={article.sourceName} className="size-4 rounded-full object-cover" />
                            {article.sourceName}
                        </span>
                        <span>&bull;</span>
                        <time>{formatDate(article.publicAt)}</time>
                        <span className="sm:inline hidden">&bull;</span>
                        <span className="sm:inline-flex items-center gap-1 hidden">
                            <IconClock className="size-3.5" />
                            {article.readingTime} min
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-foreground line-clamp-2 transition-colors pr-12">
                        {article.title}
                    </h2>

                    {/* why read  */}
                    <p className="text-xs mb-2 pr-2 -ml-1 font-mono  tracking-tight  text-primary/80 items-start flex gap-1">
                        <IconBulb className="size-4" /> <span className="line-clamp-2">{article.whyRead}</span>
                    </p>

                    {/* Summary */}
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground mb-3 max-w-3xl">
                        {article.summary}
                    </p>


                </div>

                <div className="flex items-center justify-between mt-2 relative z-10">
                    <div className="inline-flex gap-1.5 text-xs font-mono text-muted-foreground">
                        <IconUser className="size-3.5 shrink-0" />
                        <span>{formatAuthors(article.author)}</span>
                    </div>
                    <div className="inline-flex gap-1.5 text-xs font-mono text-muted-foreground group-hover:underline group-hover:text-foreground pr-3">
                        Read Article
                        <IconArrowRight className="size-3.5 shrink-0" />
                    </div>
                </div>
            </div>
        </article>
    );
}