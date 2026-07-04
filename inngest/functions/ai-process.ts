import { db } from "@/db";
import { inngest } from "../client";
import { article, articleMetaData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateReadingTime } from "@/lib/harvester/reading-time";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { metadataSchema, schema } from "@/lib/ai/schema";

export const articleAIProcessing = inngest.createFunction({ id: "ai-article-processing", concurrency: 1, triggers: { event: "article/ai-processing" } }, async ({ step, event }) => {

    const [sourceArticle] = await db.select().from(article).where(eq(article.id, event.data.articleId));

    if (!sourceArticle) return { error: "article not found" };

    const content = [
        sourceArticle.content?.slice(0, 3000),
        "...",
        sourceArticle.content?.slice(-2000),
    ].filter(Boolean)
        .join("\n");

    //? step 1: generate metadata with ai [some time author not catch with regex so ai ask, banner image]
    const response = await step.ai.infer("metadata-processing", {
        model: step.ai.models.gemini({ model: "gemini-2.5-flash", apiKey: process.env.LLM_API_KEY! }),
        body: {
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: [
                { role: "user", parts: [{ text: content }] },
            ],

            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: schema
            }

        }
    });

    console.log("Total Token Use", response.usageMetadata?.totalTokenCount);


    const part = response?.candidates?.[0]?.content?.parts?.[0];
    const result = part && "text" in part ? part.text : undefined;

    if (!result) {
        throw new Error(
            `No text returned from Gemini metadata call. Full response: ${JSON.stringify(response)}`
        );
    };

    const metadata = JSON.parse(result);

    //? step 2: save metadata on db [status later on Addon ] 
    await step.run("save-metadata", async () => {
        return await db.transaction(async (tx) => {

            await tx.insert(articleMetaData).values({
                articleId: sourceArticle.id,
                summary: metadata.summary,
                tags: metadata.tags,
                keyTakeaways: metadata.keyTakeaways,
                difficulty: metadata.difficulty,
                whyRead: metadata.whyRead ?? "",
                readingTime: calculateReadingTime(sourceArticle.content ?? "")
            });

            await tx.update(article).set({ author: metadata.author ?? article.author, status: "completed" }).where(eq(article.id, sourceArticle.id))
        });

    })

    //? step 3: sleep so ai processing
    await step.sleep("wait-to-new-event-run", "5s");

    return { id: event.id, status: "Article processing Done." };
})