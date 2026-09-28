import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { IconArrowNarrowRight, IconHome2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function NotFoundView({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-6 py-20 text-center",
        className,
      )}
    >
      <div className="flex max-w-md flex-col items-center gap-2">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          404
        </p>
        <h1 className="text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
          This page doesn&apos;t exist
        </h1>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          The link may be broken, or the article may have been removed. The
          feed is still right where you left it.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/feed"
          className={cn(
            buttonVariants({ size: "lg" }),
            "gap-1 font-normal",
          )}
        >
          Go to Feed <IconArrowNarrowRight stroke={2} />
        </Link>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "gap-1 font-normal",
          )}
        >
          <IconHome2 stroke={2} />
          Back home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundView;
