import * as z from "zod";

export const metadataSchema = z.object({
    summary: z.string().describe("2–3 factual sentences summarizing the article."),
    tags: z.array(z.string()).describe(
        "Generate article related 3–15 unique lowercase tags. Use simple words without spaces or special characters."
    ),

    categories: z.string().describe(
        "Generate exactly one category. Choose the single most relevant category only."
    ),
    keyTakeaways: z.array(z.string()).describe("Concise standalone insights from the article"),
    difficulty: z.enum(["junior", "mid", "senior"]),
    whyRead: z.string().describe(
        "One concise sentence (8–15 words). Start with an action verb like Learn, Understand, Discover, Explore, or See. Explain the key learning from the article. No marketing language. Maximum 90 characters."
    ),
    author: z.string().describe("authors of this article if not found. Company Name with Team. like: Github Team., Slack Team.")
});

// zod convert schema
export type ArticleMetaData = z.infer<typeof metadataSchema>;

export const metadataJsonSchema = z.toJSONSchema(metadataSchema);