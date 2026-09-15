import { cn } from "@/lib/utils";
import React from "react";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto min-h-screen w-full max-w-5xl px-6 sm:px-10", className)}
    >
      {children}
    </div>
  );
}

export default Container;
