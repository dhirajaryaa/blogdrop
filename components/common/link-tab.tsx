"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"
import { usePathname } from "next/navigation";

function LinkTab() {
    const pathname = usePathname();

    const links = [
        { href: "/feed", name: "For You" },
        { href: "/trending", name: "Trending" },
        { href: "/bookmark", name: "Saved" },
        { href: "/history", name: "Reading History" },
    ]

    return (
        <div className="sticky! top-16 z-40 bg-background w-full h-fit">
            <ScrollArea className="w-full p-0!">
                <div className=" flex w-full items-center gap-6 border-b border-border/50 bg-background/95 backdrop-blur my-4">
                    {
                        links.map((link) => (
                            <Link key={link.name} href={link.href} className={`text-sm font-semibold border-b-[3px] pb-1 w-fit px-2 whitespace-nowrap transition-colors  duration-300 ${pathname.startsWith(link.href) ? "text-primary hover:text-primary/80 border-primary" : "text-muted-foreground hover:text-foreground border-transparent"}`}>
                                {link.name}
                            </Link>
                        ))
                    }
                </div>
                <ScrollBar orientation="horizontal" className="bg-muted rounded-full" />
            </ScrollArea>

        </div>
    )
}

export default LinkTab
