import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { SYSTEM_PROMPT } from "./prompt";


export const metadataSchema = z.object({
    author: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    keyTakeaways: z.array(z.string()),
    whyRead: z.string(),
    difficulty: z.enum(["junior", "mid", "senior"]),
});



// TODO: change open router to openai official api key in production
const client = new OpenAI({
    baseURL: process.env.LLM_API_ENDPOINT!,
    apiKey: process.env.LLM_API_KEY!,
});


export const aiGeneration = async (markdown: string | null) => {

    if (!markdown) return null;

    const response = await client.responses.parse({
        model: "openai/gpt-oss-120b",
        input: [
            { role: "system", content: SYSTEM_PROMPT },
            {
                role: "user",
                content: `postMarkdown : ${markdown}`,
            },
        ],
        text: {
            format: zodTextFormat(metadataSchema, "event"),
        },
    });
    

    const output =  response.output_parsed;
    // console.log(output);

    return output;
    
};
