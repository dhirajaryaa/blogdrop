"use client"

import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { userTags } from "@/config/tags"
import { articleCategories } from "@/config/category"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { useState } from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

interface CategoryTagSelectorProps {
  selectedCategories: Set<string>;
  setSelectedCategories: (categories: Set<string>) => void;
  selectedTags: Set<string>;
  setSelectedTags: (tags: Set<string>) => void;
  errors: { categories: "min" | "max" | null; tags: "min" | "max" | null };
  setErrors: React.Dispatch<React.SetStateAction<{ categories: "min" | "max" | null; tags: "min" | "max" | null; experience: boolean }>>;
}

export function CategoryTagSelector({
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  errors,
  setErrors
}: CategoryTagSelectorProps) {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const tagAnchor = useComboboxAnchor()
  const tagItems = userTags.map((t) => t.value)

  return (
    <>
      <section className="space-y-3">
        <div>
          <Label className="text-base font-semibold text-foreground">Categories</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Pick 3–5 categories you want to see in your feed
          </p>
          {errors.categories === "max" && (
            <p className="text-sm text-destructive mt-1">Maximum 5 categories allowed</p>
          )}
          {errors.categories === "min" && (
            <p className="text-sm text-destructive mt-1">Please select at least 3 categories</p>
          )}
        </div>
        {/* categories */}
        <ToggleGroup
          type="multiple"
          variant="outline"
          value={[...selectedCategories]}
          onValueChange={(value) => {
            if (value.length > 5) {
              setErrors((prev) => ({ ...prev, categories: "max" }))
              return
            }
            setSelectedCategories(new Set(value))
            setErrors((prev) => ({ ...prev, categories: value.length >= 3 ? null : prev.categories }))
          }}
          className="flex-wrap w-full justify-start gap-2"
        >
          {(showAllCategories ? articleCategories : articleCategories.slice(0, 6)).map((cat) => (
            <ToggleGroupItem
              key={cat.value}
              value={cat.value}
              size={"sm"}
              className="rounded-full border-border/50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:border-primary font-mono text-xs px-4 shadow-none"
            >
              {cat.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {articleCategories.length > 6 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-muted-foreground gap-1 hover:bg-transparent hover:text-primary pl-0"
          >
            {showAllCategories ? "Show less" : `Show all ${articleCategories.length - 6} categories`}
            {showAllCategories ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />}
          </Button>
        )}
      </section>

      <section className="space-y-3">
        <div>
          <Label className="text-base font-semibold text-foreground">Tags</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Pick 3–15 tags to fine-tune your feed
          </p>
          {errors.tags === "max" && (
            <p className="text-sm text-destructive mt-1">Maximum 15 tags allowed</p>
          )}
          {errors.tags === "min" && (
            <p className="text-sm text-destructive mt-1">Please select at least 3 tags</p>
          )}
        </div>
        <Combobox
          multiple
          items={tagItems}
          itemToStringLabel={(value: string) => userTags.find((t) => t.value === value)?.label ?? value}
          value={[...selectedTags]}
          onValueChange={(values: string[]) => {
            if (values.length > 15) {
              setErrors((prev) => ({ ...prev, tags: "max" }))
              return
            }
            setSelectedTags(new Set(values))
            setErrors((prev) => ({ ...prev, tags: values.length >= 3 ? null : prev.tags }))
          }}
        >
          <ComboboxChips ref={tagAnchor} className="w-full rounded-xl border border-border bg-card p-2 px-2.5! min-h-10 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary shadow-none">
            <ComboboxValue>
              {(values: string[]) => (
                <>
                  {values.map((value) => {
                    const tag = userTags.find((t) => t.value === value)
                    return <ComboboxChip className="text-xs px-3 py-1 font-mono rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 shadow-none" key={value}>{tag?.label ?? value}</ComboboxChip>
                  })}
                  <ComboboxChipsInput placeholder="Search tags..." className="font-mono text-sm placeholder:text-muted-foreground ml-2 bg-transparent outline-none border-none" />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={tagAnchor} className="border-border shadow-none rounded-md">
            <ComboboxEmpty className="font-mono text-sm py-4">No tags found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => {
                const tag = userTags.find((t) => t.value === item)
                return (
                  <ComboboxItem key={item} value={item} className="font-mono text-sm cursor-pointer hover:bg-muted">
                    {tag?.label ?? item}
                  </ComboboxItem>
                )
              }}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </section>
    </>
  )
}
