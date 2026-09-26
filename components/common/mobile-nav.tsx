"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mobileNavItems } from "@/config/navigation";

function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background/95 fixed inset-x-0 bottom-0 z-30 border-t backdrop-blur md:hidden">
      <ul className="mx-auto flex h-14 w-full max-w-5xl items-center justify-around px-4">
        {mobileNavItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-muted-foreground flex flex-col items-center gap-1 rounded-lg px-3 py-1 text-[10px] transition-colors",
                  active
                    ? "text-foreground font-medium"
                    : "hover:text-foreground",
                )}
              >
                <Icon size={20} stroke={active ? 2 : 1.75} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MobileNav;