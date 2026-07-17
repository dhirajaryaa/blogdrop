import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import GoBack from "../common/back-button";

interface PageHeaderProps {
  title: string;
  description?: string;
  updatedAt?: string;
  breadcrumbs?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, updatedAt, breadcrumbs, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 pb-8 mb-8 border-b border-border", className)}>
      {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
      
      <div className="flex items-center gap-2">
        <GoBack variant={"outline"} size={"icon"} className="rounded-xl"/>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        </div>
      {description && <p className="text-lg text-muted-foreground max-w-180">{description}</p>}
      {updatedAt && <p className="text-sm text-muted-foreground mt-2">Last updated: {updatedAt}</p>}
    </div>
  );
}
