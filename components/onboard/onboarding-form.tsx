"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { userInterests } from "@/config/interest"
import { toast } from "sonner"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { completeOnboarding } from "@/actions/onboarding"

export function OnboardingForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [about, setAbout] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [experience, setExperience] = useState("mid")
  const [showAll, setShowAll] = useState(false);
  const [errors, setErrors] = useState<{ interest: boolean, experience: boolean }>({ interest: false, experience: false });

  const visibleInterests = showAll ? userInterests : userInterests.slice(0, 7)
  const hiddenCount = userInterests.length - 7

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // check empty 
    if (selectedInterests.length < 3) {
      setErrors((prev) => ({ ...prev, interest: true }));
      return;
    };
    if (!experience) {
      setErrors((prev) => ({ ...prev, experience: true }));
      return;
    };

    setLoading(true)

    const result = await completeOnboarding({
      about,
      userInterests: selectedInterests,
      experienceLevel: experience,
    })

    if (result.success) {
      toast.success("Welcome to BlogDrop!")
      router.push("/feed")
    } else {
      toast.error(result.error || "Something went wrong")
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
          <Label className="text-base">About you</Label>
          <p className="text-sm text-muted-foreground">
            Share a short bio so other devs know what you&apos;re about
          </p>
        </div>
        <Textarea
          placeholder="I'm a full-stack developer passionate about..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="min-h-30"
        />
      </section>

      <section className="space-y-3">
        <div>
          <Label className="text-base">Interests</Label>
          <p className="text-sm text-muted-foreground">
            Pick topics you want to see in your feed
          </p>
          {
            errors?.interest &&
            <p className="text-sm text-destructive">
              Please select at least 3 topics you want to see in your feed
            </p>
          }
        </div>
        <ToggleGroup
          type="multiple"
          variant="outline"
          value={selectedInterests}
          onValueChange={(value) => {
            setSelectedInterests(value);

            if (value.length >= 3) {
              setErrors((prev) => ({ ...prev, interest: false }));
            }
          }}
          className="flex-wrap w-full"
        >
          {visibleInterests.map((interest) => (
            <ToggleGroupItem
              key={interest.value}
              value={interest.value}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
            >
              {interest.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {hiddenCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-muted-foreground gap-1"
          >
            {showAll ? (
              <>Show less</>
            ) : (
              <>Show all {hiddenCount} topics</>
            )}
            {showAll ? (
              <IconChevronUp className="size-4" />
            ) : (
              <IconChevronDown className="size-4" />
            )}
          </Button>
        )}
      </section>

      <section className="space-y-3">
        <div>
          <Label className="text-base">Experience</Label>
          <p className="text-sm text-muted-foreground">
            Your experience level helps us tailor content for you
          </p>
          {
            errors?.experience &&
            <p className="text-sm text-destructive">
              Please select experience helps us tailor content for you
            </p>
          }
        </div>
        <ToggleGroup
          type="single"
          variant="outline"
          value={experience}
          onValueChange={(value) => {
            setExperience(value);
            setErrors((prev) => ({ ...prev, experience: false }));
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
