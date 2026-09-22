"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

function PreferenceRow({
  title,
  description,
  defaultPressed = false,
}: {
  title: string;
  description: string;
  defaultPressed?: boolean;
}) {
  const [pressed, setPressed] = useState(defaultPressed);

  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-muted-foreground mt-1 text-xs leading-5">
          {description}
        </p>
      </div>
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label={title}
        className="data-[state=on]:bg-muted rounded-2xl data-[pressed=true]:border-transparent data-[pressed=true]:bg-primary data-[pressed=true]:text-primary-foreground"
      />
    </div>
  );
}

export default PreferenceRow;