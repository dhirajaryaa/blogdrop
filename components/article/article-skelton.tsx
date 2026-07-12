import { Skeleton } from "@/components/ui/skeleton"

function ArticleSkelton() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl py-6 w-full bg-card border-2">
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    {/* Metadata Row */}
                    <div className="mb-2 flex items-center gap-3">
                        <Skeleton className="w-16 h-4" />
                        <Skeleton className="w-4 h-4 rounded-full" />
                        <Skeleton className="w-20 h-4" />
                        <Skeleton className="w-4 h-4 rounded-full" />
                        <Skeleton className="w-16 h-4" />
                    </div>

                    {/* Headline */}
                    <div className="mb-2 pr-12 space-y-2">
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-3/4 h-6" />
                    </div>

                    {/* Summary */}
                    <div className="mb-3 space-y-2 max-w-3xl">
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-5/6 h-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleSkelton;
