"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/common/Logo";
import UserProfile from "@/components/common/UserProfile";
import SearchBox from "../sidebar/search-box";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconCompass, IconFlame, IconBookmark, IconMenu2, IconHistory, IconSettings } from "@tabler/icons-react";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function AppHeader() {
    const isMobile = useIsMobile();
    const pathname = usePathname();

    const mainLinks = [
        { href: "/feed", label: "Discover", icon: IconCompass },
        { href: "/trending", label: "Trending", icon: IconFlame },
        { href: "/bookmarks", label: "Bookmarks", icon: IconBookmark },
    ];

    return (
        <header className="sticky top-0 inset-x-0 z-50 transition-all duration-300 border-b border-border/50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-16 shadow-none">
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 w-full max-w-7xl mx-auto gap-3">
                <div className="flex items-center gap-6">
                    <div className="flex items-center">
                        <Logo href="/" />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 ml-4">
                        {mainLinks.map((link) => {
                            const isActive = pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary font-semibold"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <SearchBox />
                    <ThemeToggle />
                    <UserProfile />
                </div>
            </div>
        </header>
    )
}

export default AppHeader;
