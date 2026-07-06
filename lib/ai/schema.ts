import * as z from "zod";

export const metadataSchema = z.object({
    summary: z.string().describe("2–3 factual sentences summarizing the article."),
    tags: z.array(z.string()).describe(
        "Generate 3–15 unique lowercase tags. Use simple words without spaces or special characters (e.g. react, nextjs, ai, docker)."
    ),

    categories: z.array(z.string()).describe(
        "Generate 1–3 unique lowercase categories. Use simple singular words (e.g. frontend, backend, devops, ai, database)."
    ),
    keyTakeaways: z.array(z.string()).describe("Concise standalone insights from the article"),
    difficulty: z.enum(["junior", "mid", "senior"]),
    whyRead: z.string().describe("One sentence explaining why an engineer should read this article"),
});

// zod convert schema
export type ArticleMetaData = z.infer<typeof metadataSchema>;

export const metadataJsonSchema = z.toJSONSchema(metadataSchema);