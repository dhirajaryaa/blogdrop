"use client";

import { bookmarkArticle } from "@/actions/bookmark";
import { Button } from "@/components/ui/button";
import { IconBookmark, IconBookmarkFilled, IconLoader2 } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function BookmarkButton({ articleId, isBookmark }: { articleId: string, isBookmark: boolean }) {

    const queryClient = useQueryClient();

    const { mutate: toggleBookmark, isPending } = useMutation({
        mutationFn: async () => {
            return await bookmarkArticle({ articleId });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['article', articleId] })
        },
        onError: (err) => {
            console.log(err);
        }
    });




    return (
        <Button title="Bookmark Article" variant={"secondary"} size={"sm"} onClick={() => toggleBookmark()}
            disabled={isPending}
        >
            {isPending ? <>
                <IconLoader2 className="size-4 animate-spin" />
            </>
                : isBookmark ? <>
                    <IconBookmarkFilled fill="currentColor" className="size-4" /> Saved
                </> :
                    <>
                        <IconBookmark className="size-4" />
                        Save
                    </>}
        </Button>
    )
}

export default BookmarkButton;
