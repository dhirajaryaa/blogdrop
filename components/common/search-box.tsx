"use client";

import { IconSearch } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function SearchBox({ searchInput, setSearchInput, className }: { searchInput: string; setSearchInput: (v: string) => void, className?: string }) {
    return (
        <div className={cn("w-full relative", className)}>
            <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4.5" />
            <Input
                value={searchInput}
                onChange={(e) => setSearchInput((e.target as HTMLInputElement).value)}
                type="search"
                placeholder="Search Article..."
                aria-label="Search"
                className="w-full pl-8"
            />
        </div>
    );
}

export default SearchBox;
