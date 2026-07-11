import SearchBox from "../sidebar/search-box";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { articleCategories } from "@/config/category";
import { userTags } from "@/config/tags";

type PropsType = {
    searchInput: string;
    setSearchInput: (v: string) => void;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export function FeedSidebar({
    searchInput,
    setSearchInput,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
}: PropsType) {

    const defaultCategories = articleCategories.filter(c =>
        [
            "frontend",
            "backend",
            "ai",
            "cloud",
            "system-design",
        ].includes(c.value)
    );

    const defaultTags = userTags.filter(t =>
        [
            "javascript",
            "typescript",
            "react",
            "python",
            "nodejs",
            "docker",
            "ai",
            "postgresql",
        ].includes(t.value)
    );


    return (
        <aside className="hidden md:flex flex-col max-w-60 w-full sticky top-24 h-full gap-4">
            {/* search  */}
            <h3 className="sr-only">Search</h3>
            <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />

            {/* Categories */}
            <div className="space-y-3">
                <h3 className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase">Categories</h3>
                <ToggleGroup type="single"
                    spacing={1}
                    value={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value || "")}
                    className="w-full flex-wrap" variant={"outline"} >
                    {
                        defaultCategories.map(((cat, i) => (
                            <ToggleGroupItem className="capitalize data-[state=on]:bg-primary/10 outline-0 data-[state=on]:text-primary data-[state=on]:font-medium px-2 text-muted-foreground font-normal w-full justify-start rounded-lg border-0" value={cat.value} key={cat.value}>{cat.label}</ToggleGroupItem>
                        )))
                    }
                </ToggleGroup>
            </div>
            {/* Trending Tags */}
            <div className="space-y-3">
                <h3 className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase">Trending Tags</h3>
                <div className="flex flex-wrap gap-2 w-full">
                    <ToggleGroup type="multiple"
                        value={selectedTags}
                        onValueChange={(value) => setSelectedTags(value)}
                        className="w-full flex-wrap" variant={"outline"} >
                        {
                            defaultTags.map(((tag, i) => (
                                <ToggleGroupItem size={"sm"} variant={"outline"} className="text-xs font-mono shadow-none transition-colors lowercase data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:font-medium px-3 py-1 text-muted-foreground font-normal rounded-lg bg-transparent border-border/50 hover:bg-muted" value={tag.value} key={tag.value}>#{tag.label}</ToggleGroupItem>
                            )))
                        }
                    </ToggleGroup>
                </div>
            </div>


        </aside>
    )
}
