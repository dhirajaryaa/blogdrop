"use client";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";

function GoBack({ size, variant, className }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants>) {
    const router = useRouter()
    return (
        <Button onClick={() => router.back()} variant={variant} size={size} className={cn(className)}>
            <IconArrowLeft />
            {size === "icon" ? null : "Back"}
        </Button>
    )
}

export default GoBack
