import { CategoryAlias } from '@/config/category';
import { TagsAlias } from '@/config/tags';
import Fuse from 'fuse.js';

//? the fuse index is built once per module, not once per article
const MAX_FUZZY_SCORE = 0.3;

const buildIndex = (aliases: Record<string, string[]>) => {
    const data = Object.entries(aliases).map(([canonical, alias]) => ({ canonical, alias }));

    return new Fuse(data, {
        includeScore: true,
        ignoreLocation: true,
        keys: ["canonical", "alias"]
    });
};

let tagsIndex: Fuse<{ canonical: string; alias: string[] }> | undefined;
let categoriesIndex: Fuse<{ canonical: string; alias: string[] }> | undefined;

const tagsFuse = () => (tagsIndex ??= buildIndex(TagsAlias));
const categoriesFuse = () => (categoriesIndex ??= buildIndex(CategoryAlias));


export const tagsMapping = (generatedTags: string[]): string[] => {
    const fuse = tagsFuse();
    const normalizedTags = new Set<string>();

    for (const tag of generatedTags) {
        const result = fuse.search(tag);

        if (result.length === 0) continue;
        if ((result[0].score ?? 1) > MAX_FUZZY_SCORE) continue;

        normalizedTags.add(result[0].item.canonical);
    }

    return [...normalizedTags];
}


export const categoriesMapping = (
    generatedCategories: string[]
): string[] => {
    const fuse = categoriesFuse();
    const normalizedCategories = new Set<string>();

    for (const category of generatedCategories) {
        const result = fuse.search(category);

        if (result.length === 0) continue;
        if ((result[0].score ?? 1) > MAX_FUZZY_SCORE) continue;

        normalizedCategories.add(result[0].item.canonical);
    }

    return [...normalizedCategories];
};
