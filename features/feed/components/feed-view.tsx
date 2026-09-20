import { Suspense } from "react";
import FeedFilter from "./feed-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {FeedList ,FeedError} from "./feed-list";
import { getPublicFeed } from "../feed.actions";
import { IconLoader2 } from "@tabler/icons-react";

export type FeedFilterOption = {
  value: string;
  label: string;
};
const options: FeedFilterOption[] = [
  { value: "all", label: "All" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "frontend", label: "Frontend" },
  { value: "databases", label: "Databases" },
  { value: "performance", label: "Performance" },
  { value: "distributed-systems", label: "Distributed Systems" },
  { value: "platform-engineering", label: "Platform Engineering" },
  { value: "networking", label: "Networking" },
  { value: "data-engineering", label: "Data Engineering" },
];

//! loading state
function ArticleLoading() {
  return (
    <div className="flex w-full items-center justify-center pt-14 sm:pt-24 md:pt-40">
      <IconLoader2 className="text-muted-foreground size-8 animate-spin" />
    </div>
  );
};

async function FeedView() {
  const data = await getPublicFeed({ limit: 30, offset: 0 });

  if (!data.success) {
      return (<FeedError />)
    };

  return (
    <>
      <section className="border-border/70 flex flex-wrap items-center justify-between gap-4 border-t py-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <FeedFilter options={options} active={"all"} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Suspense fallback={<ArticleLoading />}>
          <FeedList articles={data.success ? data.data : []} />
        </Suspense>
      </section>
    </>
  );
}

export default FeedView;
