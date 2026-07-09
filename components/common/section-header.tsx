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
        <div className={cn("space-y-6", className)}>
            <section className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {title}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>

                {action && (
                    <div className="shrink-0">
                        {action}
                    </div>
                )}
            </section>

            {children}
        </div>
    );
}