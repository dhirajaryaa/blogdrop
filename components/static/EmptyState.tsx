import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export function EmptyState({ icon, title, description, actionText, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl bg-card/50 shadow-sm">
      <div className="p-4 bg-muted text-muted-foreground rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground max-w-[400px] mb-6">{description}</p>
      {actionText && actionHref && (
        <Button asChild>
          <Link href={actionHref}>{actionText}</Link>
        </Button>
      )}
    </div>
  );
}
