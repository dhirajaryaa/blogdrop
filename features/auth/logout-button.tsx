"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";
import { authClient } from "@/features/auth/auth-client";

function LogoutButton({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      setIsLoggingOut(false);
      toast.error("Unable to log out. Please try again.");
      console.error("Logout failed:", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      aria-busy={isLoggingOut}
      className={`group flex w-full items-center gap-3 py-5 text-left text-sm disabled:opacity-60 ${className}`}
    >
      <IconLogout
        size={18}
        stroke={1.75}
        className="text-muted-foreground"
      />
      <span className="text-destructive font-medium">
        {isLoggingOut ? "Logging out…" : "Log out"}
      </span>
      <IconChevronRight
        size={16}
        className="text-muted-foreground ml-auto transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );
}

export default LogoutButton;