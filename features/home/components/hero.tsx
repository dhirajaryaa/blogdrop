import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

function Hero() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mt-20 flex flex-col gap-2">
        <div className="flex w-full flex-col gap-4">
          <div className="max-w-lg space-y-2">
            <h1 className="text-3xl font-semibold tracking-wide sm:text-4xl">
              Discover better, engineering articles.
            </h1>

            <p className="text-muted-foreground max-w-xl text-sm leading-6 sm:text-base">
              Curated technical stories from the teams building what’s next.
            </p>
          </div>
          <div className="flex items-center">
            <Button
              variant={"link"}
              className="px-0 text-sm hover:text-blue-600 hover:no-underline"
              asChild
            >
              <Link href="/feed">
                Start reading <IconArrowRight stroke={2} />{" "}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
