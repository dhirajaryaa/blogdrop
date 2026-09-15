import {
  IconBolt,
  IconBookmark,
  IconCompass,
  IconHome2,
  IconSettings,
  IconUserCircle,
  IconWorld,
  type IconProps,
} from "@tabler/icons-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: React.ComponentType<IconProps>;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export const navGroups: NavigationGroup[] = [
  {
    label: "Read",
    items: [
      { label: "Feed", href: "/feed", icon: IconHome2 },
      { label: "Explore", href: "/explore", icon: IconCompass },
      { label: "Latest", href: "/latest", icon: IconBolt },
    ],
  },
  {
    label: "Library",
    items: [
      { label: "Sources", href: "/sources", icon: IconWorld },
      { label: "Saved", href: "/saved", icon: IconBookmark },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", href: "/profile", icon: IconUserCircle },
      { label: "Settings", href: "/settings", icon: IconSettings },
    ],
  },
];

export const mobileNavItems: NavigationItem[] = [
  { label: "Feed", href: "/feed", icon: IconHome2 },
  { label: "Explore", href: "/explore", icon: IconCompass },
  { label: "Latest", href: "/latest", icon: IconBolt },
  { label: "Sources", href: "/sources", icon: IconWorld },
  { label: "Saved", href: "/saved", icon: IconBookmark },
];