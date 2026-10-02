import Skeleton from "./skeleton";

function ProfileSkeleton() {
  return (
    <div className="mt-10" role="status">
      <span className="sr-only">Loading profile</span>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Skeleton className="size-20 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="hidden h-9 w-28 rounded-xl sm:block" />
      </div>

      <Skeleton className="mt-8 h-4 w-2/3" />

      <div className="divide-border/70 mt-10 grid grid-cols-3 divide-x border-y">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 py-6"
          >
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>

      <div className="mt-14">
        <Skeleton className="h-3 w-24" />
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-7 w-24 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;