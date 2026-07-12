"use client";

import Logo from "@/components/common/Logo";
import UserProfile from "@/components/common/UserProfile";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/theme-toggle";

function AppHeader() {
    const pathname = usePathname();

    const mainLinks = [
        { href: "/feed", label: "For You" },
        { href: "/explore", label: "Explore" },
        { href: "/trending", label: "Trending" },
        { href: "/bookmarks", label: "Bookmarks" },
    ];

    return (
        <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-border/50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-16 shadow-none">
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 w-full max-w-7xl mx-auto gap-3">
                <div className="flex items-center gap-2 flex-1">
                    <Logo href="/" />
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 ml-7">
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
                    <ThemeToggle />
                    <UserProfile />
                </div>
            </div>
        </header>
    )
}

export default AppHeader;
