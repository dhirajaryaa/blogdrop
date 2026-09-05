import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

export function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2 flex-col">
                    <span className="text-sm font-semibold tracking-tight text-foreground">
                        BlogDrop
                    </span>

                    <span className="text-xs text-muted-foreground">
                        Engineering stories worth reading.
                    </span>
                </div>

                <nav className="flex items-center gap-5 text-xs text-muted-foreground">
                    <a
                        href="/about"
                        className="transition-colors hover:text-foreground"
                    >
                        About
                    </a>

                    <a
                        href="/sources"
                        className="transition-colors hover:text-foreground"
                    >
                        Sources
                    </a>

                    <a
                        href="https://github.com/dhirajaryaa/blogdrop"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-foreground"
                    >
                        GitHub ↗
                    </a>
                </nav>
            </div>

            <div className="mx-auto max-w-6xl px-6 pb-6 flex items-center justify-between">
                <p className="pt-5 text-xs text-muted-foreground">
                    <span>© {new Date().getFullYear()} BlogDrop</span>
                </p>
                <p className="pt-5 text-xs text-muted-foreground flex gap-4">
                    <a
                        href="https://x.com/dhirajaryaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X"
                        title="X"
                        className="transition-colors hover:text-foreground"
                    >
                        <IconBrandTwitter className="size-3.5" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/dhirajarya/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                        className="transition-colors hover:text-foreground"
                    >
                        <IconBrandLinkedin className="size-3.5" />
                    </a>
                    <a
                        href="https://github.com/dhirajaryaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        title="GitHub"
                        className="transition-colors hover:text-foreground"
                    >
                        <IconBrandGithub className="size-3.5" />
                    </a>
                </p>
            </div>
        </footer>
    );
}