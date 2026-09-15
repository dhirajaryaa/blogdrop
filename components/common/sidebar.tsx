"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  IconChevronsLeft,
  IconChevronsRight,
  type IconProps,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { navGroups, type NavigationItem } from "@/config/navigation";

function SidebarLink({
  item,
  collapsed,
}: {
  item: NavigationItem;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === item.href;
  const Icon = item.icon as React.ComponentType<IconProps>;

  return (
    <li>
      <Link
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={cn(
          "text-sm transition-colors duration-200",
          "flex items-center gap-3 rounded-xl px-3 py-2",
          collapsed && "justify-center px-0",
          active
            ? "bg-muted text-foreground font-medium"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        )}
      >
        <Icon size={19} stroke={active ? 2 : 1.75} />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    </li>
  );
}

function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className={cn(
        "bg-background/80 sticky top-0 hidden h-screen shrink-0 flex-col border-r backdrop-blur transition-all duration-300 lg:flex",
        collapsed ? "w-16" : "w-56",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b",
          collapsed ? "justify-center" : "px-5",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="BlogDrop"
            width={26}
            height={26}
            loading="lazy"
            className="rounded-lg"
          />
          {!collapsed && (
            <span className="text-foreground text-base font-medium">
              Blogdrop
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-muted-foreground/70 px-3 pb-2 text-[11px] font-medium tracking-[0.15em] uppercase">
                {group.label}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <SidebarLink key={item.href} item={item} collapsed={collapsed} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t px-3 py-3">
        <button
          onClick={onToggle}
          className={cn(
            "text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
            collapsed && "justify-center px-0",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <IconChevronsRight size={19} stroke={1.75} />
          ) : (
            <>
              <IconChevronsLeft size={19} stroke={1.75} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;