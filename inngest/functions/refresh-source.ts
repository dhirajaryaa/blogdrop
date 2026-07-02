

import { db } from "@/db";
import { inngest } from "../client"; //! @ import not work in inngest
import { source } from "@/db/schema";
import { eq } from "drizzle-orm";


export const refreshAllSource = inngest.createFunction(
    { id: "refresh-source-list", triggers: { event: "cron/refresh-Source" } },
    async ({ event, step }) => {
        // trigger all source refresh
        const sources = await db
            .select()
            .from(source)
            .where(eq(source.isActive, true));

        await step.sendEvent(
            "dispatch-feeds",
            sources.map((item) => ({
                name: "feed/process",
                data: {
                    id: item.id,
                    rssUrl: item.rssUrl,
                },
            }))
        );

        return { eventId: event.id ,task:"refresh-sources"};
    }
);