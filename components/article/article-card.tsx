"use client";

import Link from "next/link";
import { FeedType } from "@/actions/feed";
import {
    IconBookmark,
    IconClock,
    IconUser,
    IconWorld,
} from "@tabler/icons-react";
import { formatAuthors } from "@/utils/format-author";
import { formatDate } from "@/utils/format-date";
import { Button } from "../ui/button";

export function ArticleCard({ article }: { article: FeedType }) {
    return (
        <div className="group relative flex flex-col sm:flex-row gap-4 border-b border-border/50 py-6 transition-colors hover:bg-muted/30">
            <Link href={`/a/${article.slug}`} className="absolute inset-0 z-0" aria-label={`Read ${article.title}`} />

            <div className="flex flex-1 flex-col justify-between">
                <div>
                    {/* Metadata Row */}
                    <div className="mb-2 flex items-center gap-3 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                        <span className="inline-flex items-center gap-1 font-medium text-foreground">
                            <IconWorld className="size-3.5 text-primary/70" />
                            {article.sourceName}
                        </span>
                        <span>&bull;</span>
                        <time>{formatDate(article.publicAt)}</time>
                        <span>&bull;</span>
                        <span className="inline-flex items-center gap-1">
                            <IconClock className="size-3.5" />
                            {article.readingTime} min
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary pr-12">
                        {article.title}
                    </h2>

                    {/* Summary */}
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground mb-3 max-w-3xl">
                        {article.summary}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-2 relative z-10">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <IconUser className="size-3.5 shrink-0" />
                        <span>{formatAuthors(article.author)}</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col justify-start sm:items-end">
                <Button
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors rounded-full"
                    variant="ghost"
                    size="icon"
                >
                    <IconBookmark className="size-5" />
                </Button>
            </div>
        </div>
    );
}