"use client";

import { Suspense } from "react";
import FeedFilter from "./feed-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

function FeedView() {

  return (
    <Suspense fallback={null}>
      <section className="border-border/70 flex flex-wrap items-center justify-between gap-4 border-t py-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <FeedFilter
            options={options}
            active={"all"}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div>
          content
        </div>
      </section>
    </Suspense>
  );
}

export default FeedView;