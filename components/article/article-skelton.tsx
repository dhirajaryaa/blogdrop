import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/common/section-header";

export function ArticlePageSkeleton() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 my-4 px-4 relative py-8">
            {/* Go Back */}
            <Skeleton className="h-8 w-16 rounded-md" />

            <article className="space-y-6">
                {/* Topbar */}
                <div className="space-y-4">
                    {/* Row: metadata + bookmark */}
                    <div className="flex items-center gap-4 justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                            <Skeleton className="size-5 rounded-full" />
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                            <Skeleton className="w-16 h-4" />
                            <Skeleton className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                            <Skeleton className="w-14 h-5 rounded-full" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>

                    {/* Title */}
                    <div className="space-y-2.5">
                        <Skeleton className="w-full h-7 sm:h-9" />
                        <Skeleton className="w-3/4 h-7 sm:h-9" />
                    </div>

                    {/* Row: author + date */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="size-3.5" />
                            <Skeleton className="w-28 h-4" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="size-4" />
                            <Skeleton className="w-20 h-4" />
                        </div>
                    </div>
                </div>

                {/* Image */}
                <Skeleton className="w-full aspect-video rounded-2xl max-h-100" />

                {/* Why Read */}
                <div className="rounded-xl border border-border p-4 space-y-2">
                    <Skeleton className="w-28 h-4" />
                    <div className="space-y-1.5">
                        <Skeleton className="w-full h-3.5" />
                        <Skeleton className="w-5/6 h-3.5" />
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-9 w-20 rounded-full" />
                    ))}
                </div>

                {/* Summary */}
                <div className="border-l-4 border-border bg-muted/30 p-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-5" />
                        <Skeleton className="w-24 h-4" />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-2/3 h-4" />
                    </div>
                </div>

                {/* Key Takeaways */}
                <div className="space-y-3">
                    <Skeleton className="w-36 h-5" />
                    <div className="space-y-2.5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-2">
                                <Skeleton className="size-5 shrink-0" />
                                <Skeleton className="w-full h-4" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom actions */}
                <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-border items-center md:justify-start">
                    <Skeleton className="h-12 w-full md:max-w-xs rounded-md" />
                    <Skeleton className="h-5 w-28" />
                </div>
            </article>
        </div>
    )
}

export function BookmarkSkeleton() {
    return (
        <SectionHeader title="Saved" description="Keep your favorite engineering articles in one place and read them whenever you're ready.">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col gap-4 p-4 rounded-2xl bg-card border-2">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="w-20 h-4" />
                            </div>
                            <Skeleton className="w-full h-5" />
                            <Skeleton className="w-4/5 h-5" />
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-3/4 h-4" />
                        </div>
                    </div>
                ))}
            </section>
        </SectionHeader>
    );
}

export function ArticleSkeleton() {
    return (<article className="flex flex-col sm:flex-row gap-4 py-6 p-4 rounded-2xl bg-card border-2">
        <div className="flex flex-1 flex-col justify-between">
            <div>
                {/* Metadata Row */}
                <div className="mb-2 flex items-center gap-3">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="w-20 h-3" />
                    <Skeleton className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                    <Skeleton className="w-16 h-3" />
                    <Skeleton className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 hidden sm:block" />
                    <Skeleton className="w-14 h-3 hidden sm:block" />
                </div>

                {/* Headline */}
                <div className="mb-2 pr-12 space-y-2">
                    <Skeleton className="w-full h-5" />
                    <Skeleton className="w-3/4 h-5" />
                </div>

                {/* Why Read */}
                <div className="mb-2 flex items-start gap-1">
                    <Skeleton className="size-4 shrink-0" />
                    <Skeleton className="w-full h-3" />
                </div>

                {/* Summary */}
                <div className="mb-3 space-y-1.5 max-w-3xl">
                    <Skeleton className="w-full h-3.5" />
                    <Skeleton className="w-5/6 h-3.5" />
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                    <Skeleton className="size-3.5" />
                    <Skeleton className="w-24 h-3" />
                </div>
                <div className="flex items-center gap-1.5 pr-3">
                    <Skeleton className="w-16 h-3" />
                    <Skeleton className="size-3.5" />
                </div>
            </div>
        </div>
    </article>)
}
