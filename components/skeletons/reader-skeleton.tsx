import Skeleton from "./skeleton";

function ReaderSkeleton() {
  return (
    <div className="mt-6" role="status">
      <span className="sr-only">Loading article</span>
      <Skeleton className="h-3 w-32" />

      <div className="mt-4 flex items-start justify-between gap-4">
        <Skeleton className="h-9 w-3/4 sm:h-10" />
        <Skeleton className="mt-2 hidden h-9 w-24 rounded-full sm:block" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <Skeleton className="size-5 rounded-md" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
      </div>

      <Skeleton className="mt-8 aspect-[16/9] w-full rounded-xl" />

      <div className="mt-10 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="mt-10 flex items-center gap-3">
        <Skeleton className="h-11 w-32 rounded-xl" />
        <Skeleton className="h-11 w-32 rounded-full sm:hidden" />
      </div>
    </div>
  );
}

export default ReaderSkeleton;