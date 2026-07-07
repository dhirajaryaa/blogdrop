import { CategoryAlias } from '@/config/category';
import { TagsAlias } from '@/config/tags';
import Fuse from 'fuse.js';

export const tagsMapping = (generatedTags: string[]) => {

    //? step 1: fuse data [key-value paris(Canonical,alias)]
    const fuseData = Object.entries(TagsAlias).map(([canonical, alias]) => ({ canonical, alias }));

    //? step 2: loop run fuse.search Canonical tags return

    const fuse = new Fuse(fuseData, {
        includeScore: true,
        ignoreLocation: true,
        keys: ["canonical", "alias"] // check karga
    });

    const normalizedTags = generatedTags.map((tag) => {
        const result = fuse.search(tag);

        if (result.length === 0) return null;

        if ((result[0].score ?? 1) > 0.3) return null;

        return result[0].item.canonical;
    })
        .filter(Boolean);

    //? step 3: return Canonical tags match nhi huya ignore it
    return normalizedTags;
}


export const categoriesMapping = (generatedCategories: string[]) => {

    //? step 1: fuse data [key-value paris(Canonical,alias)]
    const fuseData = Object.entries(CategoryAlias).map(([canonical, alias]) => ({ canonical, alias }));

    //? step 2: loop run fuse.search Canonical tags return

    const fuse = new Fuse(fuseData, {
        includeScore: true,
        ignoreLocation: true,
        keys: ["canonical", "alias"] // check karga
    });

    const normalizedTags = generatedCategories.map((tag) => {
        const result = fuse.search(tag);

        if (result.length === 0) return null;

        if ((result[0].score ?? 1) > 0.3) return null;

        return result[0].item.canonical;
    })
        .filter(Boolean);

    //? step 3: return Canonical tags match nhi huya ignore it
    return normalizedTags;
}