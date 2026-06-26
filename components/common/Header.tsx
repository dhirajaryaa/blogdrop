import { getCurrentUser } from "@/lib/auth/get-user";
import Logo from "./Logo";
import UserProfile from "./UserProfile";
import Link from "next/link";

async function Header() {
    const user = await getCurrentUser();

    const navLinks = [
        { label: "Features", href: "#features" },
        { label: "Sources", href: "#sources" },
        { label: "My Feed", href: "/feed" },
    ]

    return (
        <header className="flex sticky top-0 inset-x-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/50 w-full">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 w-full">
                <div className="flex gap-4 items-center flex-1">
                    <Logo />
                    <nav className="hidden md:flex items-center gap-4 ml-4">
                        {!user && (
                            <>
                                <Link href="#features" className="text-base text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                                <Link href="#sources" className="text-base text-muted-foreground hover:text-foreground transition-colors">Sources</Link>
                            </>
                        )}

                        {user && <Link href="/feed" className="text-base text-muted-foreground hover:text-foreground transition-colors">My Feed</Link>}
                    </nav>
                </div>
                <UserProfile />
            </div>
        </header>
    )
}

export default Header;
