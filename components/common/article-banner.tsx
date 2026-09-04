"use client"

type ArticleBannerProps = {
    url: string;
    title?: string;
};

export default function ArticleBanner({
    url,
    title,
}: ArticleBannerProps) {
    return (
        <div className="relative rounded-xl aspect-video w-full overflow-hidden">
            {/* Blurred logo background */}
            <img
                src={url}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-[2] object-contain blur-[46px"
            />

            {/* Brightness / readability layer */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl dark:bg-black/20" />

            {/* Sharp logo */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <img
                    src={url}
                    alt=""
                    className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                />
            </div>

            {/* Optional article title */}
            {title && (
                <div className="absolute inset-x-5 bottom-5 z-20">
                    <h2 className="max-w-xl text-lg font-semibold leading-snug tracking-tight text-zinc-900 sm:text-xl">
                        {title}
                    </h2>
                </div>
            )}
        </div>
    );
}