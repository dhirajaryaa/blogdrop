import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { metadataSchemaOpenAI } from "./schema";

const client = new OpenAI({
    apiKey: process.env.LLM_API_KEY,
    baseURL: process.env.LLM_API_ENDPOINT
});

export const aiGeneration = async (markdown: string) => {
    try {
        // 2. USE client.models.generateContent instead of interactions
        const response = await client.responses.parse({
            model: "openai/gpt-oss-20b",
            input: `you are export metadata extractor. article_markdown-${JSON.stringify(markdown)}`,

            text: {
                format: zodTextFormat(metadataSchemaOpenAI, "event"),
            },
        });

        console.log("💳️ total token count:",response.usage?.total_tokens);

        console.log(response.output_parsed);
        

        if (!response.output_parsed) {
            return null;
        };
        return response.output_parsed;

    } catch (error) {
        console.error("AI metadata data generation failed:", error);
        return null;
    }
}
