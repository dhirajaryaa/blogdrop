import { CategoryAlias } from '@/config/category';
import { TagsAlias } from '@/config/tags';
import Fuse from 'fuse.js';

export const tagsMapping = (generatedTags: string[]): string[] => {

    //? step 1: fuse data [key-value paris(Canonical,alias)]
    const fuseData = Object.entries(TagsAlias).map(([canonical, alias]) => ({ canonical, alias }));

    //? step 2: loop run fuse.search Canonical tags return

    const fuse = new Fuse(fuseData, {
        includeScore: true,
        ignoreLocation: true,
        keys: ["canonical", "alias"] // check karga
    });

    const normalizedTags = new Set<string>();;


    for (const tag of generatedTags) {
        const result = fuse.search(tag);

        if (result.length === 0) continue;
        if ((result[0].score ?? 1) > 0.3) continue;

        normalizedTags.add(result[0].item.canonical);
    }

    return [...normalizedTags];
}


export const categoriesMapping = (generatedCategories: string[]): string[] => {

    //? step 1: fuse data [key-value paris(Canonical,alias)]
    const fuseData = Object.entries(CategoryAlias).map(([canonical, alias]) => ({ canonical, alias }));

    //? step 2: loop run fuse.search Canonical tags return

    const fuse = new Fuse(fuseData, {
        includeScore: true,
        ignoreLocation: true,
        keys: ["canonical", "alias"] // check karga
    });

    const normalizedCategories = new Set<string>();;

    for (const category of generatedCategories) {
        const result = fuse.search(category);

        if (result.length === 0) continue;
        if ((result[0].score ?? 1) > 0.3) continue;

        normalizedCategories.add(result[0].item.canonical)
    };

    //? step 3: return Canonical tags match nhi huya ignore it
    return [...normalizedCategories];
}