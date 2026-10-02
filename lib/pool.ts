export type Settled<T> =
    | { ok: true; value: T }
    | { ok: false; error: unknown };

export const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));


export const describeError = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "unknown error";
};


/**
 * Runs `worker` over every item with at most `limit` in-flight calls.
 * Preserves input order in the returned array and never rejects: a failing
 * worker becomes a `{ ok: false }` entry so the rest of the pool keeps going.
 */
export async function mapSettledWithConcurrency<T, R>(
    items: readonly T[],
    limit: number,
    worker: (item: T, index: number) => Promise<R>
): Promise<Settled<R>[]> {
    const results: Settled<R>[] = new Array(items.length);

    if (items.length === 0) return results;

    let cursor = 0;
    const size = Math.max(1, Math.min(limit, items.length));

    const runners = Array.from({ length: size }, async () => {
        while (cursor < items.length) {
            const index = cursor++;

            try {
                results[index] = {
                    ok: true,
                    value: await worker(items[index], index),
                };
            } catch (error) {
                results[index] = { ok: false, error };
            }
        }
    });

    await Promise.all(runners);

    return results;
}


/**
 * Sliding-window rate limiter. Used to keep us inside the AI provider's
 * requests-per-minute quota while still letting several calls run at once.
 * One instance is shared per process; the daily credit cap is the hard limit,
 * this is only the short-term brake.
 */
export class RateLimiter {
    private hits: number[] = [];

    constructor(
        private readonly limit: number,
        private readonly windowMs = 60_000
    ) {}

    async acquire(): Promise<void> {
        for (;;) {
            const now = Date.now();
            this.hits = this.hits.filter((hit) => now - hit < this.windowMs);

            if (this.hits.length < this.limit) {
                this.hits.push(now);
                return;
            }

            await sleep(Math.max(this.hits[0] + this.windowMs - now, 25));
        }
    }
}
