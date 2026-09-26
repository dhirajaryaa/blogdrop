"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleSaveArticle } from "@/features/saved/saved.actions";

function SaveArticleButton({
  articleId,
  initialSaved,
  className,
}: {
  articleId: string;
  initialSaved: boolean;
  className?: string;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleSaveArticle(articleId);

      if (res.success) {
        setSaved(res.data);
        toast.success(res.data ? "Saved to your library" : "Removed from saved");
      } else {
        toast.error(res.reason || "Failed to save article");
      }
    });
  };

  return (
    <Button
      variant={saved ? "secondary" : "outline"}
      size="default"
      onClick={handleToggle}
      disabled={pending}
      aria-pressed={saved}
      className={cn("rounded-full", className)}
    >
      {saved ? (
        <IconBookmarkFilled stroke={2} />
      ) : (
        <IconBookmark stroke={1.75} />
      )}
      {saved ? "Saved" : "Save"}
    </Button>
  );
}

export default SaveArticleButton;