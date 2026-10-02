import Skeleton from "./skeleton";

function SourceListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="divide-border/70 divide-y" role="status">
      <span className="sr-only">Loading sources</span>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 py-6">
          <Skeleton className="size-6 rounded-md" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="size-6 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default SourceListSkeleton;