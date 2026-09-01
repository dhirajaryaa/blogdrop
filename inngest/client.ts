import { Inngest, eventType } from "inngest";
import { z } from "zod";

// export const refreshSourceEvent = eventType("cron/refresh-Source");

// export const sourceScan = eventType("cron/all-source-scan");

// export const feedProcessEvent = eventType("feed/process", {
//     schema: z.object({
//         id: z.string(),
//         rssUrl: z.string(),
//     }),
// });

// export const articleProcessEvent = eventType("article/process", {
//     schema: z.object({
//         articleId: z.string(),
//     }),
// });

// export const articleAiProcessingEvent = eventType("article/ai-processing", {
//     schema: z.object({
//         articleId: z.string(),
//     }),
// });

//? inngest app initiation
export const inngest = new Inngest({
    id: "blogdrop",
    checkpointing: {
        maxRuntime: "45s",
    },
});
