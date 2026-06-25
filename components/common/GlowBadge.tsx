import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface GlowBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
}

export default function GlowBadge({ children, className, variant = "outline" }: GlowBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "rounded-full border-primary/30 text-primary bg-primary/5 shadow-glow-xs",
        className
      )}
    >
      {children}
    </Badge>
  )
}
