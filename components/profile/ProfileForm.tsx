"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { updateProfile } from "@/actions/profile"
import { CategoryTagSelector } from "@/components/common/category-tag-selector"

interface ProfileFormProps {
  defaultAbout: string
  defaultCategories: string[]
  defaultTags: string[]
  defaultExperience: string
}

export function ProfileForm({
  defaultAbout,
  defaultCategories,
  defaultTags,
  defaultExperience,
}: ProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [about, setAbout] = useState(defaultAbout)
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(defaultCategories))
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(defaultTags))
  const [experience, setExperience] = useState(defaultExperience)
  
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

    const result = await updateProfile({
      about,
      categories: [...selectedCategories],
      tags: [...selectedTags],
      experienceLevel: experience,
    })

    if (result.success) {
      toast.success("Profile updated")
      router.refresh()
    } else {
      toast.error("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10 py-6 max-w-3xl mx-auto">
      <section className="space-y-3">
        <div>
          <Label className="text-base font-semibold text-foreground">About you</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Share a short bio so other devs know what you&apos;re about
          </p>
        </div>
        <Textarea
          placeholder="I'm a full-stack developer passionate about..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="min-h-30 rounded-lg border-border/50 shadow-none focus-visible:ring-1 focus-visible:ring-primary"
        />
      </section>

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
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary px-6 shadow-none"
          >
            Junior
          </ToggleGroupItem>
          <ToggleGroupItem
            value="mid"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary px-6 shadow-none"
          >
            Mid-Level
          </ToggleGroupItem>
          <ToggleGroupItem
            value="senior"
            className="rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary px-6 shadow-none"
          >
            Senior
          </ToggleGroupItem>
        </ToggleGroup>
      </section>

      <Button type="submit" size="lg" className="rounded-full w-full mt-8 shadow-none" disabled={loading}>
        {loading ? "Saving..." : "Save changes"}
      </Button>
    </form>
  )
}
