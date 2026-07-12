import { GoogleGenAI } from "@google/genai";
import { ArticleMetaData, metadataJsonSchema, metadataSchema } from "./schema";


type Response = {
    success: true,
    data: ArticleMetaData,
    tokenUsed: number | undefined
} | {
    success: false,
    error: string
};


// client create gen ai 
const client = new GoogleGenAI({
    apiKey: process.env.LLM_API_KEY!
});

// system prompt
const prompt = `
You are an expert technical content analyst.
Analyze the provided Markdown article and extract accurate metadata.
Return only valid JSON that strictly follows the provided schema. Base every field only on the article content, infer missing information conservatively, and never hallucinate facts.
`;


export const llmGeneration = async (articleMarkdown: string): Promise<Response> => {
    try {
        const interaction = await client.interactions.create({
            model: "gemini-3.1-flash-lite",
            input: `ARTICLE_CONTENT=${JSON.stringify(articleMarkdown)}`,
            system_instruction: prompt,
            response_format: {
                type: "text",
                mime_type: "application/json",
                schema: metadataJsonSchema
            }
        });

        // type check 
        const result = metadataSchema.safeParse(JSON.parse(interaction.output_text ?? ""));

        if (!result.success) {
            return { success: false, error: "Invalid metadata from LLM" };
        };

        return {
            success: true,
            data: result.data,
            tokenUsed: interaction.usage?.total_tokens
        };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "🤖 LLM Generation Failed!";
        console.error(message, error);
        return { success: false, error: message };
    };
}