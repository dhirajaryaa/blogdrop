"use client";

import Link from "next/link";
import Image from "next/image";
import { FeedType } from "@/actions/feed";
import {
    IconArrowRight,
    IconBookmark,
    IconClock,
    IconUser,
    IconWorld,
} from "@tabler/icons-react";
import { formatAuthors } from "@/utils/format-author";
import { formatDate } from "@/utils/format-date";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import ArticleImage from "./article-img";

export function ArticleCard({ article }: { article: FeedType }) {
    return (
        <Link href={`/a/${article.slug}`} className="block h-full relative">
            <Card className="py-0 group">
                <ArticleImage url={article.imageUrl} alt={article.title} />
                <CardContent className="flex flex-1 flex-col py-0 px-5">
                    {/* Meta */}
                    <div className="mb-3 flex h-7 justify-between items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex gap-1 font-medium text-foreground">
                            <IconWorld className="size-3.5" />
                            {article.sourceName}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <IconClock className="size-3.5" />
                            {article.readingTime} min
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="line-clamp-2 min-h-14 text-xl font-semibold leading-7 transition-colors group-hover:text-primary">
                        {article.title}
                    </h2>

                    {/* Author */}
                    <div className="mt-2 inline-flex gap-1 text-sm text-muted-foreground">
                        <IconUser className="size-4 shrink-0" />
                        <span>{formatAuthors(article.author)}</span>
                    </div>

                    {/* Summary */}
                    <p className="mt-2 line-clamp-2 sm:line-clamp-3 min-h-18 text-sm leading-6 text-muted-foreground">
                        {article.summary}
                    </p>
                </CardContent>
                <CardFooter className="justify-between mb-4 border-t">
                    <time className="text-xs text-muted-foreground">
                        {formatDate(article.publicAt)}
                    </time>

                    <div className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
                        Read Article
                        <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </CardFooter>
            </Card>
            <Button className="absolute top-2 right-2 hover:text-primary transition-colors duration-150" variant={"outline"} size={"icon-sm"}><IconBookmark /></Button>
        </Link>
    );
}