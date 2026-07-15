import { Skeleton } from "@/components/ui/skeleton"

function FeedArticleSkeleton() {
    return (
        <article className="flex flex-col sm:flex-row gap-4 py-6 p-4 rounded-2xl bg-card border-2">
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
        </article>
    )
}

export default FeedArticleSkeleton;
