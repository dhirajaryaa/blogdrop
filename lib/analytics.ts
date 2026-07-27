"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventParams = Record<string, unknown>;

export function track(
    event: string,
    params: EventParams = {}
) {
    const eventParams = {
        ...params,
        ...(process.env.NODE_ENV !== "production"
            ? { debug_mode: true }
            : {}),
    };

    sendGAEvent("event", event, eventParams);
}