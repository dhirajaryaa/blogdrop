"use client";

import { IconSearch } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';

function SearchBox() {
    return (
        <div className="relative w-full max-w-sm hidden sm:block">
            <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4.5" />
            <Input
                type="search"
                placeholder="Search Article..."
                aria-label="Search"
                className="w-full pl-8"
            />
        </div>
    );
}

export default SearchBox;
