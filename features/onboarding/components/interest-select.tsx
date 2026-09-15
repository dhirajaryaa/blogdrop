"use client";

import {
  IconBrain,
  IconDeviceDesktop,
  IconServer,
  IconDeviceMobile,
  IconCloud,
  IconSettings,
  IconDatabase,
  IconShield,
  IconGauge,
  IconBuildingArch,
  IconTopologyStar,
  IconTopologyRing,
  IconLayersIntersect,
  IconTool,
  IconActivity,
  IconWifi,
  IconChartBar,
  IconCircleCheck,
  IconBrandGithub,
  IconUsers,
  IconFileText,
  IconRosetteDiscountCheck,
  IconBook,
  IconSchool,
  IconRocket,
} from "@tabler/icons-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { saveInterest } from "@/features/onboarding/onboarding.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const articleCategories = [
  {
    value: "ai",
    label: "Artificial Intelligence",
    icon: IconBrain,
  },
  {
    value: "frontend",
    label: "Frontend",
    icon: IconDeviceDesktop,
  },
  {
    value: "backend",
    label: "Backend",
    icon: IconServer,
  },
  {
    value: "mobile",
    label: "Mobile Development",
    icon: IconDeviceMobile,
  },
  {
    value: "cloud",
    label: "Cloud Computing",
    icon: IconCloud,
  },
  {
    value: "devops",
    label: "DevOps",
    icon: IconSettings,
  },
  {
    value: "database",
    label: "Databases",
    icon: IconDatabase,
  },
  {
    value: "security",
    label: "Security",
    icon: IconShield,
  },
  {
    value: "performance",
    label: "Performance",
    icon: IconGauge,
  },
  {
    value: "architecture",
    label: "Software Architecture",
    icon: IconBuildingArch,
  },
  {
    value: "system-design",
    label: "System Design",
    icon: IconTopologyStar,
  },
  {
    value: "distributed-systems",
    label: "Distributed Systems",
    icon: IconTopologyRing,
  },
  {
    value: "platform-engineering",
    label: "Platform Engineering",
    icon: IconLayersIntersect,
  },
  {
    value: "developer-tools",
    label: "Developer Tools",
    icon: IconTool,
  },
  {
    value: "observability",
    label: "Observability",
    icon: IconActivity,
  },
  {
    value: "networking",
    label: "Networking",
    icon: IconWifi,
  },
  {
    value: "data-engineering",
    label: "Data Engineering",
    icon: IconChartBar,
  },
  {
    value: "testing",
    label: "Testing & QA",
    icon: IconCircleCheck,
  },
  {
    value: "open-source",
    label: "Open Source",
    icon: IconBrandGithub,
  },
  {
    value: "engineering-culture",
    label: "Engineering Culture",
    icon: IconUsers,
  },
  {
    value: "case-study",
    label: "Case Studies",
    icon: IconFileText,
  },
  {
    value: "best-practices",
    label: "Best Practices",
    icon: IconRosetteDiscountCheck,
  },
  {
    value: "tutorial",
    label: "Tutorials",
    icon: IconBook,
  },
  {
    value: "career",
    label: "Career & Learning",
    icon: IconSchool,
  },
  {
    value: "product-engineering",
    label: "Product Engineering",
    icon: IconRocket,
  },
];

function InterestSelect() {

  const router = useRouter();
  const [topic, setTopic] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInterestSet = async () => {
    if (topic.size < 3) {
      const remaining = 3 - topic.size;
      const message = `Please select ${remaining} more topic${remaining === 1 ? "" : "s"}.`;
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await saveInterest(topic);

      if (!res.success) {
        const message = res.reason || "Something went wrong while saving your interests.";
        setError(message);
        toast.error(message);
        return;
      }
      toast.success("Your interests have been saved!");
      router.replace("/feed");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to save your interests. Please try again.";
      setError(message);
      toast.error(message);
      console.error("Failed to save interests:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToggleGroup variant={"outline"} type="multiple" className="w-full flex flex-wrap items-center sm:justify-center"
        value={[...topic]}
        onValueChange={(value) => {
          setError(null);
          setTopic(new Set(value));
        }}
      >
        {articleCategories.map(({ value, label, icon: Icon }) => (
          <ToggleGroupItem key={value} value={value} size={"sm"}
            className="rounded-full border-border/70 data-[state=on]:bg-primary data-[state=on]:text-background hover:bg-muted data-[state=on]:border-primary text-xs sm:text-[14px] sm:p-4 shadow  duration-150 shadow-muted">
            <Icon size={16} stroke={1.8} />
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="space-y-3 mt-8 w-full max-w-xl text-center">

        <p className="text-sm text-muted-foreground">
          Choose 3–5 topics you’re interested in.
        </p>
        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          className="w-full h-10"
          size="lg"
          onClick={handleInterestSet}
          disabled={topic.size < 3 || loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving...
            </>
          ) : topic.size < 3 ? (
            `Select ${3 - topic.size} more`
          ) : (
            "Continue"
          )}
        </Button>
      </div>


    </>
  )
}

export default InterestSelect;