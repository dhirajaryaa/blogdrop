"use client";

import { Suspense } from "react";

function FeedView() {
  return (
    <Suspense fallback={null}>
      <section className="border-border/70 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
      <div className="bg-muted w-full py-2 ">
        tags
      </div>
      <div>
        content
      </div>
       </section>
    </Suspense>
  );
}

export default FeedView;