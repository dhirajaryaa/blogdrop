import { articleAIProcessing, articleBatchDispatcher, articleProcessing, sourceScan } from "@/inngest/functions";
import { inngest } from "../../../inngest/client";
import { serve } from "inngest/next";

export const maxDuration = 60;

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        sourceScan,
        articleBatchDispatcher,
        articleProcessing,
        articleAIProcessing
    ],
});