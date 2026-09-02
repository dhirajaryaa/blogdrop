import * as z from "zod";

const promotionalSchema = z.object({
    isPromotional: z.literal(true),
});

const articleMetadataSchema = z.object({
    summary: z
        .string()
        .min(20)
        .describe(
            `Write 2–3 factual sentences summarizing the article.
Focus on the main problem, approach, and most important result or insight.
Use only information stated in the article.
Do not begin with generic phrases.`
        ),

    tags: z
        .array(z.string())
        .min(3)
        .max(15)
        .describe(
            `Generate 3–15 unique, relevant lowercase tags.
Use simple single words only. No spaces, special characters, or hashtags.
Avoid overly specific or generic tags.`
        ),

    categories: z
        .array(z.string())
        .min(1)
        .max(3)
        .describe(
            `Generate 1–3 relevant categories.
The first category must be the primary topic.
Add secondary categories only when meaningful.`
        ),

    keyTakeaways: z
        .array(z.string())
        .min(3)
        .max(5)
        .describe(
            `Generate 3–5 concise, standalone key technical insights.`
        ),

    difficulty: z
        .enum(["junior", "mid", "senior"])
        .describe(
            `Estimate the technical difficulty required to understand the article.`
        ),

    whyRead: z
        .string()
        .min(8)
        .max(90)
        .describe(
            `Write ONE concise sentence explaining the article's main learning value.
Start with Learn, Understand, Discover, Explore, or See.
Maximum 90 characters.
Do not use marketing language, hype, or generic phrases.`
        ),

    author: z
        .string()
        .min(1)
        .describe(
            `Return the explicitly available author.
If no individual author exists, use the publishing organization followed by "Team".
Never invent a person's name.`
        ),

    isPromotional: z.literal(false),
});

export const metadataSchema = z.union([
    promotionalSchema,
    articleMetadataSchema,
]);

export type ArticleMetaData = z.infer<typeof metadataSchema>;

export const metadataJsonSchema = z.toJSONSchema(metadataSchema);