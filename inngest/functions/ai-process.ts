import { db } from "@/db";
import { inngest } from "../client";
import { article, articleMetaData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { aiGeneration } from "@/lib/ai";

export const articleAIProcessing = inngest.createFunction({ id: "ai-article-processing", triggers: { event: "article/ai-processing" } }, async ({ step, event }) => {

    const [sourceArticle] = await db.select().from(article).where(eq(article.id, event.data.articleId));

    if (!sourceArticle) return { error: "article not found" };

    //? step 1: generate metadata with ai [some time author not catch with regex so ai ask, banner image]
    // Todo: later on mvp migrate on inngest agent with multiple provider support 
    const metadata = await step.run("metadata-processing", async () => {
        const response = await aiGeneration(sourceArticle.content)

        return response

    });

    if (!metadata) return { error: "failed to generate metadata!" }

    //? step 2: save metadata on db [status later on Addon ] 
    await step.run("save-metadata", async () => {

        await db.insert(articleMetaData).values({
            articleId: sourceArticle.id,
            summary: metadata.summary,
            tags: metadata.tags,
            keyTakeaways: metadata.keyTakeaways,
            difficulty: metadata.difficulty,
            whyRead: metadata.whyRead
        });

    })

    return { id: event.id, task: "metadata-generation" };
})