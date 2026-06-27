import { getCurrentUser } from "@/lib/auth/get-user";
import Logo from "./Logo";
import UserProfile from "./UserProfile";
import Link from "next/link";

async function Header() {
    const user = await getCurrentUser();



    const privateNavLinks = [
        { label: "My Feed", href: "/feed" },
        { label: "Explore", href: "/explore" },
        { label: "Bookmarks", href: "/bookmark" },
    ]

    const publicNavLinks = [
        { label: "Features", href: "#features" },
        { label: "Sources", href: "#sources" },
    ]

    return (
        <header className="flex sticky top-0 inset-x-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/50 w-full">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 w-full">
                <div className="flex gap-4 items-center w-full">
                    <Logo />
                    <nav className="hidden sm:flex items-center gap-4 ml-4">
                        {
                            user ? (
                                privateNavLinks.map((link, index) => (
                                    <Link key={`${link.href}-${index}`} href={link.href} className={`text-base text-muted-foreground hover:text-foreground/80 transition-colors`}>
                                        {link.label}
                                    </Link>))
                            ) : (
                                publicNavLinks.map((link, index) => (
                                    <Link key={`${link.href}-${index}`} href={link.href} className={`text-base text-muted-foreground hover:text-foreground/80 transition-colors`}>
                                        {link.label}
                                    </Link>))
                            )
                        }
                    </nav>
                </div>
                <UserProfile />
            </div>
        </header>
    )
}

export default Header;
