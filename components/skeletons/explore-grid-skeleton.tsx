import Skeleton from "./skeleton";

function ExploreGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2" role="status">
      <span className="sr-only">Loading topics</span>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border-border/80 flex items-center gap-4 rounded-2xl border p-5"
        >
          <Skeleton className="size-10 rounded-xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExploreGridSkeleton;