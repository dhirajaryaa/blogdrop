"use client";

import { notFound } from "next/navigation"
import Link from "next/link"
import { IconCalendar, IconCircleCheck, IconClock, IconExternalLink, IconHash, IconSparkles, IconUser } from "@tabler/icons-react"
import { getArticleBySlug } from "@/actions/article"
import { buttonVariants } from "@/components/ui/button"
import GlowBadge from "@/components/common/GlowBadge"
import { formatDate } from "@/utils/format-date"
import { Badge } from "@/components/ui/badge"
import GoBack from "@/components/common/back-button"
import BookmarkButton from "@/components/article/bookmark-button"
import { useQuery } from "@tanstack/react-query"
import ArticleSkeleton from "./article-skelton";


export function ArticlePageContent({ slug }: { slug: string }) {

    const { data: article, isPending, isError } = useQuery({
        queryKey: ["article", slug],
        queryFn: () => getArticleBySlug(slug),
    });

    if (isPending) return <ArticleSkeleton />;
    if (isError) return <div className="text-3xl text-center py-10 px-8">Oops, something went wrong!</div>;
    if (!article) return notFound();

    const domain = new URL(article.originalUrl).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;


    return (
        <div className="max-w-4xl mx-auto space-y-8 my-4 px-4 relative py-8">
            <GoBack variant={"outline"} size={"sm"} />

            <article className="space-y-6">
                {/* topbar  */}
                <div className="space-y-4">
                    <div className="flex items-start sm:items-center gap-4 justify-between flex-col sm:flex-row">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2 text-foreground/70 tracking-normal font-semibold text-sm">
                                <img loading="lazy" decoding="async" src={faviconUrl} alt={article?.sourceName || "logo"} className="size-5 rounded-full object-cover" />
                                {article.sourceName}
                            </span>
                            {article.readingTime && (
                                <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <IconClock className="size-3.5" />
                                        {article.readingTime} min read
                                    </span>
                                </>
                            )}
                        </div>

                        <BookmarkButton slug={article.slug} articleId={article.id} isBookmark={article.bookmark as boolean} />
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex gap-2 items-center justify-between">
                        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <IconUser className="size-3.5" />
                            By {article.author}
                        </p>
                        <div className="flex gap-1 items-center">
                            <IconCalendar className="size-4 text-muted-foreground" />
                            <time className="block text-sm text-muted-foreground">
                                {formatDate(article.publicAt)}
                            </time>
                        </div>
                    </div>

                </div>
                {/* image  */}
                {article.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border max-h-100">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="size-full object-cover"
                        />
                    </div>
                )}

                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {article.tags.map((tag, i) => (
                            <Badge
                                key={tag + i}
                                variant={"secondary"}
                                className="capitalize py-2.5 gap-0.5 bg-primary/10 text-primary"
                            >
                                <IconHash /> {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {article.summary && (
                    <div className="space-y-3 bg-primary/8 border-l-4 border-primary p-4">
                        <h2 className="text-[17px] uppercase flex items-center text-primary font-semibold tracking-tight"><IconSparkles className="size-5" /> AI Summary</h2>
                        <p className="text-base leading-5 text-muted-foreground">{article.summary}</p>
                    </div>
                )}

                {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold tracking-tight">Key Takeaways</h2>
                        <ul className="space-y-2">
                            {article.keyTakeaways.map((takeaway, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <IconCircleCheck className="text-primary size-5" />
                                    {takeaway}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-border mt-10 items-center justify-center md:justify-start w-full">
                    <Link
                        href={`${article.originalUrl}?ref=blogdrop`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ size: "lg", className: "gap-2 w-full md:max-w-xs md:h-12" })}>
                        Read full article
                        <IconExternalLink className="size-4" />
                    </Link>
                    {article.sourceSiteUrl && (
                        <Link
                            href={`${article.sourceSiteUrl}?ref=blogdrop`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonVariants({ variant: "link", size: "lg" })}
                        >
                            Visit {article.sourceName}
                        </Link>
                    )}
                </div>
            </article>
        </div>
    )
};
