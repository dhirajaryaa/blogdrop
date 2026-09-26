import { Inngest } from "inngest";


export type IngestResult =
    | {
        status: "success";
        data?: unknown;
    }
    | {
        status: "error";
        reason: string;
        error?: unknown;
    };


//? inngest app initiation
export const inngest = new Inngest({
    id: "blogdrop",
    checkpointing: {
        maxRuntime: "45s",
    },
    ...(process.env.INNGEST_SIGNING_KEY && {
        signingKey: process.env.INNGEST_SIGNING_KEY,
    }),
});
