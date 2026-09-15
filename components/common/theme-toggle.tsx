"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => { };
const serverValue = false;
const clientValue = true;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => clientValue,
    () => serverValue,
  );

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-muted-foreground hover:text-foreground rounded-xl p-2 transition-colors "
    >
      {!mounted ? (
        <span className="block size-4.75" />
      ) : resolvedTheme === "dark" ? (
        <IconSun size={19} stroke={1.75} />
      ) : (
        <IconMoon size={19} stroke={1.75} />
      )}
    </button>
  );
}

export function ThemeSwitch({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => clientValue,
    () => serverValue,
  );

  const options = [
    { value: "light", label: "Light", icon: IconSun },
    { value: "dark", label: "Dark", icon: IconMoon },
  ];

  return (
    <div
      className={cn(
        "bg-muted/60 flex items-center gap-1 rounded-full border p-1",
        className,
      )}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active = mounted && resolvedTheme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-label={`Switch to ${option.label} theme`}
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon size={14} stroke={active ? 2 : 1.75} />
            <span className={active ? "font-medium" : undefined}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}