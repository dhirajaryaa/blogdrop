
import { cn } from "@/lib/utils";

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
        <div className={cn("relative rounded-lg aspect-video w-full overflow-hidden ", className)}>
            {/* Blurred logo background */}
            <img
                src={url}
                alt={title || "Article logo"}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-[2] object-contain blur-sm opacity-80  select-none"
                draggable={false}
            />

            {/* Brightness / readability layer */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl dark:bg-black/20 select-none group-hover:bg-white/5 dark:group-hover:bg-black/5 duration-300"
                draggable={false} />

            {/* Sharp logo */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <img
                    src={url}
                    alt={title || "Article logo"}
                    className="h-16 w-16 object-contain sm:h-20 sm:w-20 group-hover:scale-105 duration-300"
                />
            </div>
        </div>
    );
}