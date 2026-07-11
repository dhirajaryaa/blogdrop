import { articleCategories } from "@/config/category"
import { userTags } from "@/config/tags"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { getCurrentUser } from "@/lib/auth/get-user"

export async function FeedSidebar() {
    const user = await getCurrentUser();

    if (!user) return;

    const categories = articleCategories.filter(category =>
        user.categories?.includes(category.value)
    ) ?? articleCategories.slice(0, 5);
    const tags = userTags.filter(tag => user.tags?.includes(tag.value)) ?? userTags.slice(0, 7);

    return (
        <aside className="hidden lg:flex flex-col w-64 shrink-0 space-y-8 pr-6 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pb-8">
            {/* Categories */}
            <div className="space-y-3">
                <h3 className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase">Categories</h3>
                <div className="flex flex-col space-y-1">
                    {categories.slice(0, 6).map((cat, i) => (
                        <button
                            key={cat.value}
                            className={cn(
                                "text-sm text-left px-2 py-1.5 rounded-md transition-colors",
                                i === 0 ? "text-primary font-medium bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Complexity */}
            {/* <div className="space-y-3">
                <h3 className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase">Complexity</h3>
                <ToggleGroup type="single" variant="outline" defaultValue="intro" className="justify-start gap-2">
                    <ToggleGroupItem value="intro" className="rounded-full text-xs h-7 px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground shadow-none border-border/50 font-mono">
                        Intro
                    </ToggleGroupItem>
                    <ToggleGroupItem value="mid" className="rounded-full text-xs h-7 px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground shadow-none border-border/50 font-mono">
                        Mid
                    </ToggleGroupItem>
                    <ToggleGroupItem value="expert" className="rounded-full text-xs h-7 px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground shadow-none border-border/50 font-mono">
                        Expert
                    </ToggleGroupItem>
                </ToggleGroup>
            </div> */}

            {/* Trending Tags */}
            <div className="space-y-3">
                <h3 className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 5).map((tag, i) => (
                        <button
                            key={tag.value}
                            className={cn(
                                "text-xs font-mono px-3 py-1 rounded-full border shadow-none transition-colors",
                                i < 2 ? "bg-primary/10 text-primary border-primary/20" : "bg-transparent text-muted-foreground border-border/50 hover:bg-muted"
                            )}
                        >
                            #{tag.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Favorite Sources */}
            <div className="space-y-3">
                <h3 className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase">Favorite Sources</h3>
                <div className="flex flex-col space-y-1">
                    {["Hacker News", "Medium Eng", "AWS Blog"].map((source) => (
                        <button
                            key={source}
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-muted transition-colors text-left"
                        >
                            <div className="size-4 bg-muted-foreground/20 rounded-sm flex items-center justify-center text-[8px] font-bold">
                                {source.charAt(0)}
                            </div>
                            {source}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}
