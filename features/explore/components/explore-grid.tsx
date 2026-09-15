import Link from "next/link";
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

const articleCategories = [
  { value: "ai", label: "Artificial Intelligence" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile Development" },
  { value: "cloud", label: "Cloud Computing" },
  { value: "devops", label: "DevOps" },
  { value: "database", label: "Databases" },
  { value: "security", label: "Security" },
  { value: "performance", label: "Performance" },
  { value: "architecture", label: "Software Architecture" },
  { value: "system-design", label: "System Design" },
  { value: "distributed-systems", label: "Distributed Systems" },
  { value: "platform-engineering", label: "Platform Engineering" },
  { value: "developer-tools", label: "Developer Tools" },
  { value: "observability", label: "Observability" },
  { value: "networking", label: "Networking" },
  { value: "data-engineering", label: "Data Engineering" },
  { value: "testing", label: "Testing & QA" },
  { value: "open-source", label: "Open Source" },
  { value: "engineering-culture", label: "Engineering Culture" },
  { value: "case-study", label: "Case Studies" },
  { value: "best-practices", label: "Best Practices" },
  { value: "tutorial", label: "Tutorials" },
  { value: "career", label: "Career & Learning" },
  { value: "product-engineering", label: "Product Engineering" },
];

function ExploreGrid() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mt-16 sm:mt-20">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Explore
        </p>
        <h1 className="mt-4 max-w-xl text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
          Pick a topic, start reading.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-sm leading-7 sm:text-base">
          Browse engineering content by area of interest. Each topic opens a
          filtered feed of the latest stories.
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {articleCategories.map((category) => {
          const Icon = categoryIcons[category.value];

          return (
            <Link
              key={category.value}
              href={`/feed?topic=${category.value}`}
              className="group border-border/80 hover:bg-muted/40 flex items-center gap-4 rounded-2xl border p-5 transition-colors duration-200"
            >
              <span className="bg-muted text-muted-foreground group-hover:text-foreground flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors">
                <Icon size={19} stroke={1.75} />
              </span>
              <span className="text-sm font-medium">{category.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreGrid;