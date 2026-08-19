import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  as?: "h2" | "h3" | "h4";
  className?: string;
}

export function SectionTitle({ children, as: Tag = "h2", className }: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "font-semibold tracking-tight text-foreground",
        {
          "text-2xl mt-8 mb-4": Tag === "h2",
          "text-xl mt-6 mb-3": Tag === "h3",
          "text-lg mt-4 mb-2": Tag === "h4",
        },
        className
      )}
    >
      {children}
    </Tag>
  );
}
