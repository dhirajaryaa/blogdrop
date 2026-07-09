import {
    Card,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function ArticleSkelton() {
    return (
        <Card className="p-2 max-w-xs">
            <div className="aspect-video bg-background/60 w-full rounded-xl" />
            <CardContent className="px-2 pb-2 space-y-4">
                <div className="flex items-center gap-2">
                    <Skeleton className="size-6" />
                    <Skeleton className="w-1/3 h-5" />
                </div>
                <CardDescription className="space-y-3">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-4/6 h-4" />
                    <Skeleton className="w-5/6 h-4" />
                    <Skeleton className="w-4/6 h-4" />
                    <Skeleton className="w-5/6 h-4" />
                    <Skeleton className="w-2/6 h-4" />
                </CardDescription>
                <div className="flex gap-2 items-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="w-12 h-5" />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ArticleSkelton;
