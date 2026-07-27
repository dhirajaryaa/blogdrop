"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventParams = Record<string, unknown>;

export function track(
    event: string,
    params: EventParams = {}
) {
    sendGAEvent("event", event, params);
}