import Skeleton from "./skeleton";

function ArticleListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="divide-border/70 mt-6 divide-y sm:mt-10" role="status">
      <span className="sr-only">Loading articles</span>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="py-10 first:pt-0 last:pb-0 sm:py-14">
          <div className="grid gap-2 sm:grid-cols-[3.5rem_1fr]">
            <Skeleton className="text-muted-foreground/50 mt-1 h-3 w-6" />
            <div>
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-5 rounded-md" />
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="mt-5 h-5 w-3/4" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleListSkeleton;