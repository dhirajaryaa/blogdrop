import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconBrandGithub, IconBrandX, IconMail } from "@tabler/icons-react";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
        <Link href="https://github.com/blogdrop" target="_blank" rel="noopener noreferrer">
          <IconBrandGithub className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
      </Button>
      <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
        <Link href="https://x.com/blogdrop" target="_blank" rel="noopener noreferrer">
          <IconBrandX className="h-5 w-5" />
          <span className="sr-only">X (Twitter)</span>
        </Link>
      </Button>
      <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
        <Link href="mailto:hello@blogdrop.com">
          <IconMail className="h-5 w-5" />
          <span className="sr-only">Email</span>
        </Link>
      </Button>
    </div>
  );
}
