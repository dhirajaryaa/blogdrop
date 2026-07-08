"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "../common/Logo";
import UserProfile from "../common/UserProfile";
import { Separator } from "../ui/separator";
import SearchBox from "./search-box";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

function AppHeader() {
    const isMobile = useIsMobile();
    const pathname = usePathname();

    const titles = {
        "/feed": "Discover",
        "/trending": "Trending",
        "/bookmarks": "Bookmarks",
        "/topics": "Topics",
        "/profile": "Profile",
        "/history": "Reading History",
        "/settings": "Settings",
    };


    const title =
        Object.entries(titles).find(([path]) => pathname.startsWith(path))?.[1] ??
        "BlogDrop";

    return (
        <header className="sticky top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl border-b border-border/50 w-full bg-background/80 h-16">
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 w-full gap-3">
                <div className="flex items-center w-fit">
                        <SidebarTrigger size={"icon-lg"} className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className=" mr-2 data-[orientation=vertical]:h-8"
                        />
                    {isMobile ? <Logo href="/feed" /> : <h2 className="text-xl font-semibold">{title}</h2>}
                </div>
                <div className="flex items-center gap-2 w-fit">
                    <SearchBox />
                    <UserProfile />
                </div>
            </div>
        </header>
    )
}

export default AppHeader
