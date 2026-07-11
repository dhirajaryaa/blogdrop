import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    description: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
}

export function SectionHeader({
    title,
    description,
    action,
    children,
    className,
}: SectionHeaderProps) {
    return (
        <div className={cn("space-y-6 max-w-6xl", className)}>
            <section className="flex items-start justify-between gap-4 pt-2">
                <div className="min-w-0">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h1>
                    <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
                        {description}
                    </p>
                </div>

                {action && (
                    <div className="shrink-0 mt-1">
                        {action}
                    </div>
                )}
            </section>

            {children}
        </div>
    );
}