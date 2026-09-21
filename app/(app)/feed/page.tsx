import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import FeedView from "@/features/feed/components/feed-view";
import Container from "@/components/common/container";

export const metadata: Metadata = constructMetadata({
  title: "Feed — BlogDrop",
  description:
    "Your feed of curated engineering articles from the teams building what's next.",
});

export default function FeedPage() {
  return <>
    <Container className="max-w-3xl min-h-screen">
      <section className="mt-10 mb-6 flex flex-col gap-8">
        <div className="max-w-xl">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Your feed
          </p>
          <h1 className="mt-4 text-2xl sm:text-3xl leading-tight font-medium tracking-tight text-balance">
            Engineering stories, thoughtfully collected.
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-7 ">
            Hand-picked articles from the teams building the web — new posts
            from the engineering blogs you care about.
          </p>
        </div>
          </section>
          {/*list articles */}
      <FeedView />
    </Container>
  </>
}