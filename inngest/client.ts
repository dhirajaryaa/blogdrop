import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "blogdrop",
    checkpointing: {
        maxRuntime: "45s",
    },
});