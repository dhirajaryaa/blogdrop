import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-foreground text-sm font-semibold tracking-tight">
            BlogDrop
          </span>

          <span className="text-muted-foreground text-xs">
            Engineering stories worth reading.
          </span>
        </div>

        <nav className="text-muted-foreground flex items-center gap-5 text-xs">
          <a href="/about" className="hover:text-foreground transition-colors">
            About
          </a>

          <a
            href="/sources"
            className="hover:text-foreground transition-colors"
          >
            Sources
          </a>

          <a
            href="https://github.com/dhirajaryaa/blogdrop"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub ↗
          </a>
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-6">
        <p className="text-muted-foreground pt-5 text-xs">
          <span>© {new Date().getFullYear()} BlogDrop</span>
        </p>
        <p className="text-muted-foreground flex gap-4 pt-5 text-xs">
          <a
            href="https://x.com/dhirajaryaa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            title="X"
            className="hover:text-foreground transition-colors"
          >
            <IconBrandX className="size-3.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/dhirajarya/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="hover:text-foreground transition-colors"
          >
            <IconBrandLinkedin className="size-3.5" />
          </a>
          <a
            href="https://github.com/dhirajaryaa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="hover:text-foreground transition-colors"
          >
            <IconBrandGithub className="size-3.5" />
          </a>
        </p>
      </div>
    </footer>
  );
}
