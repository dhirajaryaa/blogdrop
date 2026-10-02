import Link from "next/link";
import type { ExploreCategory } from "../explore.types";
import {
  IconActivity,
  IconBook,
  IconBrain,
  IconBrandGithub,
  IconBuildingArch,
  IconChartBar,
  IconCircleCheck,
  IconCloud,
  IconDatabase,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconFileText,
  IconGauge,
  IconLayersIntersect,
  IconRocket,
  IconRosetteDiscountCheck,
  IconSchool,
  IconServer,
  IconSettings,
  IconShield,
  IconTool,
  IconTopologyRing,
  IconTopologyStar,
  IconUsers,
  IconWifi,
  type IconProps,
} from "@tabler/icons-react";

const categoryIcons: Record<string, React.ComponentType<IconProps>> = {
  ai: IconBrain,
  frontend: IconDeviceDesktop,
  backend: IconServer,
  mobile: IconDeviceMobile,
  cloud: IconCloud,
  devops: IconSettings,
  database: IconDatabase,
  security: IconShield,
  performance: IconGauge,
  architecture: IconBuildingArch,
  "system-design": IconTopologyStar,
  "distributed-systems": IconTopologyRing,
  "platform-engineering": IconLayersIntersect,
  "developer-tools": IconTool,
  observability: IconActivity,
  networking: IconWifi,
  "data-engineering": IconChartBar,
  testing: IconCircleCheck,
  "open-source": IconBrandGithub,
  "engineering-culture": IconUsers,
  "case-study": IconFileText,
  "best-practices": IconRosetteDiscountCheck,
  tutorial: IconBook,
  career: IconSchool,
  "product-engineering": IconRocket,
};

function ExploreGrid({ categories }: { categories: ExploreCategory[] }) {
  if (categories.length === 0) {
    return (
      <div className="border-border/70 flex flex-col items-start gap-3 border-y py-24">
        <p className="text-base font-medium">No topics yet.</p>
        <p className="text-muted-foreground text-sm">
          Topics will appear here as articles are collected.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((category) => {
        const Icon = categoryIcons[category.slug] ?? IconFileText;

        return (
          <Link
            key={category.slug}
            href={`/feed?topic=${category.slug}`}
            className="group border-border/80 hover:bg-muted/40 flex items-center gap-4 rounded-2xl border p-5 transition-colors duration-200"
          >
            <span className="bg-muted text-muted-foreground group-hover:text-foreground flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors">
              <Icon size={19} stroke={1.75} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">
                {category.label}
              </span>
              <span className="text-muted-foreground text-xs">
                {category.count} article{category.count === 1 ? "" : "s"}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ExploreGrid;