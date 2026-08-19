import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
}

export function ContentSection({ children, className }: ContentSectionProps) {
  return (
    <section className={cn("py-6 md:py-8 space-y-8", className)}>
      {children}
    </section>
  );
}
