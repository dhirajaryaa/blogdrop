import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconNewsOff, IconSettings } from "@tabler/icons-react";
import RefreshButton from "../common/refresh-button";

export default function EmptyFeed() {
    return (
        <div className="max-w-xl mx-auto col-span-4 w-full">
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                    <IconNewsOff className="size-8 text-muted-foreground" />
                </div>

                <h2 className="text-xl font-semibold">
                    Your feed is empty
                </h2>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    We couldn&apos;t find any articles for your current interests.
                    Try refreshing your feed or update your preferences to discover
                    more content.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <RefreshButton />

                    <Button variant="outline" asChild>
                        <Link href="/profile">
                            <IconSettings className="size-4" />
                            Update Interests
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}