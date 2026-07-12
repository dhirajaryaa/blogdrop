import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import GoBack from "./back-button";

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
                    <div className="flex gap-2 items-center">
                <GoBack className="rounded-lg" size={"icon"} variant={"outline"} />
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h1>
                    </div>
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