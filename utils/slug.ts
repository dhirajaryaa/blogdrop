import { randomUUID } from "node:crypto";

export const buildArticleSlug = (title: string): string => {
    const base = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 30) //! do if not much production save articles
        .replace(/^-+|-+$/g, "");

    return [base, randomUUID().slice(0, 6)].filter(Boolean).join("-");
}