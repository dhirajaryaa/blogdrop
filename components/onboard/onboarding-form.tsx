"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner"
import { completeOnboarding } from "@/actions/onboarding"
import { CategoryTagSelector } from "@/components/common/category-tag-selector"
import { IconArrowLeft } from "@tabler/icons-react"

export function OnboardingForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [experience, setExperience] = useState("mid")

  const [errors, setErrors] = useState<{
    categories: "min" | "max" | null
    tags: "min" | "max" | null
    experience: boolean
  }>({ categories: null, tags: null, experience: false })

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
    <form onSubmit={onSubmit} className="space-y-10 max-w-2xl mx-auto py-8 px-4">

      <div className="text-center space-y-2 mb-8 relative">
        <Button onClick={() => router.back()} variant={"outline"} className="absolute top-2 left-2">
          <IconArrowLeft /> Back
        </Button>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Welcome to BlogDrop</h1>
        <p className="text-muted-foreground text-sm">
          Tell us about yourself so we can personalize your feed
        </p>
      </div>

      <CategoryTagSelector
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        errors={errors}
        setErrors={setErrors}
      />

      <section className="space-y-3">
        <div>
          <Label className="text-base font-semibold text-foreground">Experience</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Your experience level helps us tailor content for you
          </p>
          {errors.experience && (
            <p className="text-sm text-destructive mt-1">
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
          className="justify-start gap-3"
        >
          <ToggleGroupItem
            value="junior"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary px-6 tracking-tight"
          >
            Junior
          </ToggleGroupItem>
          <ToggleGroupItem
            value="mid"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary px-6"
          >
            Mid-Level
          </ToggleGroupItem>
          <ToggleGroupItem
            value="senior"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary px-6"
          >
            Senior
          </ToggleGroupItem>
        </ToggleGroup>
      </section>

      <Button type="submit" size="lg" className="w-full rounded-full mt-8 shadow-none" disabled={loading}>
        {loading ? "Setting up..." : "Start exploring"}
      </Button>
    </form>
  )
}

