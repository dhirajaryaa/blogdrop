import {
  IconBooks,
  IconUsers,
  IconAdjustments,
  IconBookmark,
} from "@tabler/icons-react";

const features = [
  {
    Icon: IconBooks,
    title: "Curated sources",
    description:
      "Only the best engineering blogs — from the teams actually building the web.",
  },
  {
    Icon: IconAdjustments,
    title: "Personalized feed",
    description:
      "Articles ranked to your interests, refreshed every day with a little randomness.",
  },
  {
    Icon: IconBookmark,
    title: "Read later",
    description: "Save what catches your eye and come back whenever you like.",
  },
  {
    Icon: IconUsers,
    title: "Join the builders",
    description:
      "Learn from the decisions, problems, and lessons of real engineering teams.",
  },
];

function FeatureStrip() {
  return (
    <section className="mt-4 mb-8">
      <div className="border-border/70 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="bg-background flex flex-col gap-2 p-5 sm:p-6"
          >
            <div className="bg-muted/50 text-muted-foreground flex size-9 items-center justify-center rounded-lg">
              <Icon size={18} stroke={1.75} />
            </div>
            <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
            <p className="text-muted-foreground text-xs leading-5">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureStrip;