import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function MarkdownContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
      "space-y-6 text-muted-foreground leading-relaxed",
      "[&_p]:mb-4",
      "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4",
      "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4",
      "[&_li]:mb-2 [&_li]:pl-2",
      "[&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-4",
      "[&_h4]:text-foreground [&_h4]:font-semibold [&_h4]:text-lg [&_h4]:mt-6 [&_h4]:mb-4",
      "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80 transition-colors",
      "[&_strong]:text-foreground [&_strong]:font-semibold",
      className
    )}>
      {children}
    </div>
  );
}
