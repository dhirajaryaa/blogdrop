"use client";

import { bookmarkArticle } from "@/actions/bookmark";
import { Button } from "@/components/ui/button";
import { IconBookmark, IconBookmarkFilled, IconLoader2 } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function BookmarkButton({ articleId, isBookmark, slug }: { articleId: string, isBookmark: boolean, slug: string }) {

    const queryClient = useQueryClient();


    const { mutate: toggleBookmark, isPending } = useMutation({
        mutationFn: () => bookmarkArticle({ articleId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["article", slug] });
        },
    });

    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={() => toggleBookmark()}
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <IconLoader2 className="size-4 animate-spin" />
                    {isBookmark ? "Removing..." : "Saving..."}
                </>
            ) : isBookmark ? (
                <>
                    <IconBookmarkFilled className="size-4 fill-current" />
                    Saved
                </>
            ) : (
                <>
                    <IconBookmark className="size-4" />
                    Save
                </>
            )}
        </Button>
    )
}

export default BookmarkButton;
