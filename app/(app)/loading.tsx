import { ArticleListSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/skeletons";
import Container from "@/components/common/container";

//? shown while a route in the (app) group is being streamed. the feed and
//? article pages already have their own Suspense fallbacks; this covers the
//? gap while the page shell itself is still resolving.
export default function AppLoading() {
  return (
    <Container className="max-w-3xl">
      <div className="mt-10 mb-6 flex flex-col gap-3" role="status">
        <span className="sr-only">Loading</span>
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <ArticleListSkeleton />
    </Container>
  );
}
