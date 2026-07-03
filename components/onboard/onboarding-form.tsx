"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { userTags } from "@/config/tags"
import { articleCategories } from "@/config/category"
import { toast } from "sonner"
import { completeOnboarding } from "@/actions/onboarding"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
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

export function OnboardingForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [experience, setExperience] = useState("mid")
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [errors, setErrors] = useState<{
    categories: "min" | "max" | null
    tags: "min" | "max" | null
    experience: boolean
  }>({ categories: null, tags: null, experience: false })

  const tagAnchor = useComboboxAnchor()
  const tagItems = userTags.map((t) => t.value)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newErrors = {
      categories: selectedCategories.size < 3 ? ("min" as const) : null,
      tags: selectedTags.size < 3 ? ("min" as const) : null,
      experience: !experience,
    }

    setErrors(newErrors)

    if (newErrors.categories || newErrors.tags || newErrors.experience) {
      return
    }

    setLoading(true)

    const result = await completeOnboarding({
      categories: [...selectedCategories],
      tags: [...selectedTags],
      experienceLevel: experience,
    })

    if (result.success) {
      toast.success("Welcome to BlogDrop!")
      router.push("/feed")
    } else {
      toast.error("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome to BlogDrop</h1>
        <p className="text-muted-foreground">
          Tell us about yourself so we can personalize your feed
        </p>
      </div>

      <section className="space-y-3">
        <div>
          <Label className="text-base">Categories</Label>
          <p className="text-sm text-muted-foreground">
            Pick 3–5 categories you want to see in your feed
          </p>
          {errors.categories === "max" && (
            <p className="text-sm text-destructive">Maximum 5 categories allowed</p>
          )}
          {errors.categories === "min" && (
            <p className="text-sm text-destructive">Please select at least 3 categories</p>
          )}
        </div>
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
          className="flex-wrap w-full"
        >
          {(showAllCategories ? articleCategories : articleCategories.slice(0, 6)).map((cat) => (
            <ToggleGroupItem
              key={cat.value}
              value={cat.value}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
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
            className="text-muted-foreground gap-1"
          >
            {showAllCategories ? "Show less" : `Show all ${articleCategories.length - 6} categories`}
            {showAllCategories ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />}
          </Button>
        )}
      </section>

      <section className="space-y-3">
        <div>
          <Label className="text-base">Tags</Label>
          <p className="text-sm text-muted-foreground">
            Pick 3–15 tags to fine-tune your feed
          </p>
          {errors.tags === "max" && (
            <p className="text-sm text-destructive">Maximum 15 tags allowed</p>
          )}
          {errors.tags === "min" && (
            <p className="text-sm text-destructive">Please select at least 3 tags</p>
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
          <ComboboxChips ref={tagAnchor} className="w-full border-primary">
            <ComboboxValue>
              {(values: string[]) => (
                <>
                  {values.map((value) => {
                    const tag = userTags.find((t) => t.value === value)
                    return <ComboboxChip className={"text-sm px-4 py-3"} key={value}>{tag?.label ?? value}</ComboboxChip>
                  })}
                  <ComboboxChipsInput placeholder="Search tags..." />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={tagAnchor}>
            <ComboboxEmpty>No tags found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => {
                const tag = userTags.find((t) => t.value === item)
                return (
                  <ComboboxItem key={item} value={item}>
                    {tag?.label ?? item}
                  </ComboboxItem>
                )
              }}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </section>

      <section className="space-y-3">
        <div>
          <Label className="text-base">Experience</Label>
          <p className="text-sm text-muted-foreground">
            Your experience level helps us tailor content for you
          </p>
          {errors.experience && (
            <p className="text-sm text-destructive">
              Please select your experience level
            </p>
          )}
        </div>
        <ToggleGroup
          type="single"
          variant="outline"
          value={experience}
          onValueChange={(value) => {
            setExperience(value)
            setErrors((prev) => ({ ...prev, experience: false }))
          }}
        >
          <ToggleGroupItem
            value="junior"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
          >
            Junior
          </ToggleGroupItem>
          <ToggleGroupItem
            value="mid"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
          >
            Mid-Level
          </ToggleGroupItem>
          <ToggleGroupItem
            value="senior"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
          >
            Senior
          </ToggleGroupItem>
        </ToggleGroup>
      </section>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Setting up..." : "Start exploring"}
      </Button>
    </form>
  )
}
