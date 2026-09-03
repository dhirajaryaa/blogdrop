import { GoogleGenAI } from "@google/genai";
import { ArticleMetaData, metadataJsonSchema, metadataSchema } from "./schema";
import { PROMPT } from "./prompt";


type Response = {
    success: true,
    data: ArticleMetaData,
    tokenUsed?: number
} | {
    success: false,
    error: string
};


// client create gen ai 
const client = new GoogleGenAI({
    apiKey: process.env.LLM_API_KEY!
});


export const llmGeneration = async (articleMarkdown: string): Promise<Response> => {
    try {
        const interaction = await client.interactions.create({
            model: "gemini-3.1-flash-lite",
            input: `ARTICLE_CONTENT=${JSON.stringify(articleMarkdown)}`,
            system_instruction: PROMPT,
            response_format: {
                type: "text",
                mime_type: "application/json",
                schema: metadataJsonSchema
            }
        });

        const output = interaction.output_text ?? "";

        const parsed = JSON.parse(output);

        const result = metadataSchema.safeParse(parsed);

        console.log("promotional content filter out",result.data?.isPromotional);
        

        if (!result.success) {
            console.error("Invalid metadata:", result.error);

            return {
                success: false,
                error: "Invalid metadata from LLM",
            };
        };

        return {
            success: true,
            data: result.data,
            tokenUsed: interaction.usage?.total_tokens
        };

    }
    catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "🤖 LLM Generation Failed!";

        console.error(message, error);

        return {
            success: false,
            error: message,
        };
    }
}