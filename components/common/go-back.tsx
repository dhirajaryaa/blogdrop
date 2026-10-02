"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function GoBackBtn({
    className,
    text = true
}: {
    className?: string,
    text?: boolean
}) {
    const router = useRouter();

    return (
        <Button variant="outline"
            size={text ? "sm":"icon-sm"}
            onClick={() => router.back()}
            className={cn("text-muted-foreground cursor-pointer gap-1 text-sm rounded-lg", className)}>
            <IconChevronLeft />
            {text ? "Back" : null}
        </Button>
    )
}

export default GoBackBtn;