"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type FeedFilterOption = {
  value: string;
  label: string;
};

function FeedFilter({
  options,
  active,
  onChange,
}: {
  options: FeedFilterOption[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={active}
      onValueChange={(value) => {
        if (value) onChange(value);
      }}
      spacing={2}
      className="flex flex-wrap"
    >
      {options.map(({ value, label }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          className="h-8 rounded-full border-border bg-transparent px-4 text-xs font-normal text-muted-foreground transition-colors duration-200 hover:text-foreground data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background"
        >
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export default FeedFilter;