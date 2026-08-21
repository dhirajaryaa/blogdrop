import { db } from "@/db";
import { inngest, refreshSourceEvent } from "../client"; //! @ import not work in inngest
import { source } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";

const SEND_EVENT_CHUNK = 100;

export const refreshAllSource = inngest.createFunction(
    {
        id: "refresh-source-list",
        triggers: [{ event: refreshSourceEvent }, { cron: "0 0 * * *" }]
    },
    async ({ step }) => {
        const sources = await step.run("fetch-active-sources", async () => {
            return await db
                .select({ id: source.id, rssUrl: source.rssUrl })
                .from(source)
                .where(and(eq(source.isActive, true), isNotNull(source.rssUrl)));
        });

        if (sources.length === 0) {
            return { totalSource: 0 };
        }

        //? dispatch in chunks so payload size stays bounded
        for (let i = 0; i < sources.length; i += SEND_EVENT_CHUNK) {
            const chunk = sources.slice(i, i + SEND_EVENT_CHUNK);

            await step.sendEvent(`dispatch-feeds-${i}`, chunk.map((item) => ({
                name: "feed/process",
                data: {
                    id: item.id,
                    rssUrl: item.rssUrl!,
                },
            })));
        }

        return { totalSource: sources.length };
    }
);
