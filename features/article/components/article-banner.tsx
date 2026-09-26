import { cn } from "@/lib/utils";
import Image from "next/image";

type ArticleBannerProps = {
  url: string;
  title?: string;
  className?: string;
};

export default function ArticleBanner({
  url,
  title,
  className = "",
}: ArticleBannerProps) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg shadow-md",
        className,
      )}
    >
      {/* Blurred logo background */}
      <Image
        src={url}
        alt={title || "Article logo"}
        aria-hidden="true"
        fill
        sizes="100vw"
        className="scale-[2] object-contain opacity-80 blur-sm select-none"
      />

      {/* Brightness / readability layer */}
      <div
        className="absolute inset-0 bg-white/20 backdrop-blur-2xl duration-300 select-none group-hover:bg-white/5 dark:bg-black/20 dark:group-hover:bg-black/5"
        draggable={false}
      />

      {/* Sharp logo */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <Image
          width={80}
          height={80}
          priority
          src={url}
          alt={title || "Article logo"}
          className="h-16 w-16 object-contain duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
        />
      </div>
    </div>
  );
}
