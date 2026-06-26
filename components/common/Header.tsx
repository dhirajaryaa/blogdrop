import Logo from "./Logo";
import UserProfile from "./UserProfile";

function Header() {

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
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-base text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
                <UserProfile />
            </div>
        </header>
    )
}

export default Header;
