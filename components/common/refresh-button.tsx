"use client";

import { Button } from "@/components/ui/button";
import { IconRefresh } from "@tabler/icons-react";

export default function RefreshButton() {

    return (
        <Button onClick={() => window.navigation.reload()}>
            <IconRefresh className="size-4" />
            Refresh Feed
        </Button>
    );
}