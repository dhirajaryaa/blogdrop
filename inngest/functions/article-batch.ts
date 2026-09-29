import { db } from "@/db";
import { IngestResult, inngest } from "../client";
import { aiUsage, article, articleCategory, articleMetaData, articleTag, category, tag } from "@/db/schema";
import { and, asc, eq, inArray, isNull, lt, ne, or, sql } from "drizzle-orm";
import { llmGeneration } from "@/features/ai";
import type { ArticleMetaData } from "@/features/ai/ai.schema";
import { calculateReadingTime } from "@/features/harvester/reading-time";
import { categoriesMapping, tagsMapping } from "@/features/harvester/tag-mapping";
import {
  PermanentArticleError,
  fetchAndExtractArticle,
} from "@/features/harvester/process-article";
import { articleCategories } from "@/config/category";
import { userTags } from "@/config/tags";
import { RateLimiter, describeError, mapSettledWithConcurrency, sleep } from "@/lib/pool";

//? ─── tuning ────────────────────────────────────────────────────────────────

//! how many articles one batch may hold. a processing batch, not a step count:
//! the batch is drained across several runs of this function.
const BATCH_SIZE = 100;

//! articles handled per step. one step == one meaningful unit of work.
const CHUNK_SIZE = 8;

//! steps per run. sized so a run stays inside the route maxDuration, then the
//! function re-enters through one event to finish the rest of the batch.
const MAX_CHUNKS_PER_RUN = 2;

//! parallel page fetches / extractions
const FETCH_CONCURRENCY = 5;

//! simultaneous in flight AI calls
const AI_CONCURRENCY = 5;

//! short term brake so we stay inside the provider requests per minute quota.
//! raise or lower to match your gemini tier.
const AI_REQUESTS_PER_MINUTE = Number(process.env.AI_RPM_LIMIT ?? 30);

//! daily credit budget and the slice we refuse to touch
const AI_CREDIT_LIMIT = Number(process.env.AI_CREDIT_LIMIT ?? 500);
const AI_CREDIT_RESERVE = Number(process.env.AI_CREDIT_RESERVE ?? 50);
const USABLE_AI_CREDITS = Math.max(0, AI_CREDIT_LIMIT - AI_CREDIT_RESERVE);

//! how many times one article may be tried before it is marked failed
const MAX_ARTICLE_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 1_500;

//! a batch is only recoverable if it stalls this long
const PROCESSING_LEASE_MS = 45 * 60 * 1000;

//! chars of article body handed to the model
const LLM_CONTENT_BUDGET = 4_500;

const leaseExpiry = () => new Date(Date.now() + PROCESSING_LEASE_MS);
const utcDay = () => new Date().toISOString().slice(0, 10);

//? one limiter per process, shared by every in flight call
const aiRateLimiter = new RateLimiter(AI_REQUESTS_PER_MINUTE);

//? ─── types ─────────────────────────────────────────────────────────────────

type ResolvedMetadata = {
    summary: string;
    keyTakeaways: string[];
    difficulty: string;
    whyRead: string;
    author: string;
    readingTime: number;
    tags: string[];
    categories: string[];
};

type ChunkOutcome =
    | { articleId: string; status: "done"; llmAttempted: true; metadata: ResolvedMetadata }
    | { articleId: string; status: "promotional"; llmAttempted: true }
    | { articleId: string; status: "failed"; llmAttempted: boolean; error: string };

//? ─── credit accounting ─────────────────────────────────────────────────────

/**
 * Charges one credit per article whose AI request was actually issued,
 * including the ones later removed as promotional: both cases spent real
 * provider quota. One statement per chunk, never one per article.
 *
 * The batch is sized against the remaining credits in `claimBatch`, so the
 * daily ceiling cannot be passed.
 */
const chargeAiUsage = async (count: number): Promise<void> => {
    if (count <= 0) return;

    const day = utcDay();

    await db.transaction(async (tx) => {
        await tx
            .insert(aiUsage)
            .values({ day, used: 0, apiId: 1 })
            .onConflictDoNothing({ target: aiUsage.day });

        await tx
            .update(aiUsage)
            .set({ used: sql`${aiUsage.used} + ${count}` })
            .where(eq(aiUsage.day, day));
    });
};


//? ─── step: claim ───────────────────────────────────────────────────────────

type ClaimResult = { batchId: string; articleIds: string[]; budget: number };


/**
 * Releases batches abandoned by an earlier run and claims the next batch of
 * pending articles, sized against whatever credits are actually left today.
 * The claim and the balance read share one transaction, so two runs can never
 * hand out the same credits.
 */
const claimBatch = async (batchId: string): Promise<ClaimResult> => {
    const day = utcDay();

    return await db.transaction(async (tx) => {
        //? still "processing" under an expired lease belongs to a run that
        //? died. release it so the articles can be picked up again.
        await tx
            .update(article)
            .set({
                status: "pending",
                processingBatchId: null,
                processingLeaseExpiresAt: null,
            })
            .where(
                and(
                    eq(article.status, "processing"),
                    ne(article.processingBatchId, batchId),
                    or(
                        isNull(article.processingLeaseExpiresAt),
                        lt(article.processingLeaseExpiresAt, new Date()),
                    ),
                ),
            );

        await tx
            .insert(aiUsage)
            .values({ day, used: 0, apiId: 1 })
            .onConflictDoNothing({ target: aiUsage.day });

        const [credit] = await tx
            .select({ used: aiUsage.used })
            .from(aiUsage)
            .where(eq(aiUsage.day, day))
            .for("update");

        const budget = Math.max(0, USABLE_AI_CREDITS - (credit?.used ?? 0));

        if (budget === 0) return { batchId, articleIds: [], budget };

        const pending = await tx
            .select({ id: article.id })
            .from(article)
            .where(eq(article.status, "pending"))
            .orderBy(asc(article.createdAt))
            .limit(Math.min(BATCH_SIZE, budget))
            .for("update", { skipLocked: true });

        const articleIds = pending.map(({ id }) => id);
        if (articleIds.length === 0) return { batchId, articleIds, budget };

        await tx
            .update(article)
            .set({
                status: "processing",
                processingBatchId: batchId,
                processingLeaseExpiresAt: leaseExpiry(),
            })
            .where(and(eq(article.status, "pending"), inArray(article.id, articleIds)));

        //? a batch can never spend more than it claimed
        return { batchId, articleIds, budget: Math.min(budget, articleIds.length) };
    });
};


//? ─── step: process a chunk ─────────────────────────────────────────────────

type Extraction = {
    articleId: string;
    content: string;
    author?: string;
    imageUrl?: string;
    fetched: boolean;
    error?: string;
};

/**
 * Fetches and extracts every article in the chunk that has no body yet.
 * Bounded concurrency, one bounded retry chain per article, never throws.
 */
const extractChunk = async (
    rows: { id: string; originalUrl: string; content: string | null }[],
): Promise<Extraction[]> => {
    const results = await mapSettledWithConcurrency(
        rows,
        FETCH_CONCURRENCY,
        async (row): Promise<Extraction> => {
            const existing = row.content?.trim();
            if (existing) {
                return { articleId: row.id, content: existing, fetched: false };
            }

            try {
                const extracted = await runWithRetries(
                    () => fetchAndExtractArticle(row.originalUrl),
                    (error) => !(error instanceof PermanentArticleError),
                );

                return {
                    articleId: row.id,
                    content: extracted.markdown,
                    author: extracted.author,
                    imageUrl: extracted.imageUrl,
                    fetched: true,
                };
            } catch (error) {
                return {
                    articleId: row.id,
                    content: "",
                    fetched: false,
                    error: describeError(error),
                };
            }
        },
    );

    return results.map((result, index) =>
        result.ok ? result.value : {
            articleId: rows[index].id,
            content: "",
            fetched: false,
            error: describeError(result.error),
        },
    );
};


/**
 * Runs the whole per article pipeline for one chunk: page fetch, extraction,
 * markdown conversion, the AI call, then one credit charge. Individual article
 * failures are captured in the returned outcomes so the rest of the chunk keeps
 * going instead of failing the whole step.
 */
const processChunk = async (
    articleIds: string[],
    batchId: string,
): Promise<ChunkOutcome[]> => {
    const candidates = await db
        .select({
            id: article.id,
            originalUrl: article.originalUrl,
            content: article.content,
        })
        .from(article)
        .where(
            and(
                inArray(article.id, articleIds),
                eq(article.status, "processing"),
                eq(article.processingBatchId, batchId),
            ),
        );

    if (candidates.length === 0) return [];

    //? ── content: anything already extracted on a previous attempt is reused
    const extracted = await extractChunk(candidates);
    const newlyFetched = extracted.filter((item) => item.fetched);

    if (newlyFetched.length > 0) {
        await db.transaction(async (tx) => {
            for (const item of newlyFetched) {
                await tx
                    .update(article)
                    .set({
                        content: item.content,
                        author: item.author,
                        imageUrl: item.imageUrl,
                        processingLeaseExpiresAt: leaseExpiry(),
                    })
                    .where(
                        and(
                            eq(article.id, item.articleId),
                            eq(article.status, "processing"),
                            eq(article.processingBatchId, batchId),
                        ),
                    );
            }
        });
    }

    //? ── ai: bounded concurrency, one shared requests per minute brake
    const ready = extracted.filter((item) => !item.error && item.content.length > 0);

    const generated = await mapSettledWithConcurrency(ready, AI_CONCURRENCY, async (row) => {
        await aiRateLimiter.acquire();

        return { ...row, output: await generateMetadata(row.content) };
    });

    const generatedRows = generated.map((result, index) =>
        result.ok ? result.value : {
            ...ready[index],
            output: { attempted: false, error: describeError(result.error) } as ModelResult,
        },
    );

    //? ── credits: charged here, right after the model calls, because the
    //? quota is already spent whether or not the metadata write goes on to
    //? succeed. both "saved metadata" and "removed as promotional" count.
    const requested = generatedRows.filter((row) => row.output.attempted).length;

    if (requested > 0) {
        await chargeAiUsage(requested);
        console.log(`[batch] used ${requested} ai credit(s) for ${generatedRows.length} article(s)`);
    }

    return extracted.map((item) => {
        const row = generatedRows.find((candidate) => candidate.articleId === item.articleId);

        if (item.error || !row) {
            return {
                articleId: item.articleId,
                status: "failed",
                llmAttempted: false,
                error: item.error ?? "article was not processed",
            };
        }

        if (!row.output.data) {
            return {
                articleId: item.articleId,
                status: "failed",
                llmAttempted: row.output.attempted,
                error: row.output.error,
            };
        }

        if (row.output.data.isPromotional) {
            return { articleId: item.articleId, status: "promotional", llmAttempted: true };
        }

        return {
            articleId: item.articleId,
            status: "done",
            llmAttempted: true,
            metadata: resolveMetadata(row.output.data, row.content),
        };
    });
};


type ModelResult =
    | { attempted: true; data: ArticleMetaData }
    | { attempted: boolean; data?: undefined; error: string };


const runWithRetries = async <T>(
    operation: () => Promise<T>,
    isRetryable: (error: unknown) => boolean,
): Promise<T> => {
    for (let attempt = 1; ; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt >= MAX_ARTICLE_ATTEMPTS || !isRetryable(error)) throw error;

            await sleep(RETRY_BASE_DELAY_MS * attempt);
        }
    }
};


/**
 * `llmGeneration` swallows its own errors, so the returned status is retried
 * as well as a throw. `attempted` records that a request actually left the
 * process, which is what decides whether the article owes a credit.
 */
const generateMetadata = async (content: string): Promise<ModelResult> => {
    let attempted = false;
    let lastError = "AI metadata generation failed";

    for (let attempt = 1; attempt <= MAX_ARTICLE_ATTEMPTS; attempt++) {
        attempted = true;

        try {
            const output = await llmGeneration(truncateForModel(content));

            if (output.success) return { attempted: true, data: output.data };

            lastError = output.error ?? lastError;
        } catch (error) {
            lastError = describeError(error);
        }

        if (attempt < MAX_ARTICLE_ATTEMPTS) await sleep(RETRY_BASE_DELAY_MS * attempt);
    }

    return { attempted, error: lastError };
};


const truncateForModel = (content: string) =>
    content.length > LLM_CONTENT_BUDGET
        ? [content.slice(0, 3_000), "...", content.slice(-1_500)].join("\n")
        : content;


const resolveMetadata = (
    data: Exclude<ArticleMetaData, { isPromotional: true }>,
    content: string,
): ResolvedMetadata => ({
    summary: data.summary,
    keyTakeaways: data.keyTakeaways,
    difficulty: data.difficulty,
    whyRead: data.whyRead,
    author: data.author,
    readingTime: calculateReadingTime(content),
    tags: tagsMapping(data.tags),
    categories: categoriesMapping(data.categories),
});


//? ─── step: persist a chunk ─────────────────────────────────────────────────

/**
 * Pure database work, split from `processChunk` on purpose: if this fails the
 * step is retried from durable state and no model call is repeated.
 */
const persistChunk = async (outcomes: ChunkOutcome[], batchId: string) => {
    if (outcomes.length === 0) return;

    const promotional = outcomes
        .filter((outcome) => outcome.status === "promotional")
        .map(({ articleId }) => articleId);

    const failed = outcomes
        .filter((outcome) => outcome.status === "failed")
        .map(({ articleId }) => articleId);

    const ownedBy = (ids: string[]) =>
        and(
            inArray(article.id, ids),
            eq(article.status, "processing"),
            eq(article.processingBatchId, batchId),
        );

    await db.transaction(async (tx) => {
        for (const outcome of outcomes) {
            if (outcome.status !== "done") continue;

            const { articleId, metadata } = outcome;

            //? keep the feed byline when we have one, fall back to the model
            const [updated] = await tx
                .update(article)
                .set({
                    author: sql`COALESCE(NULLIF(${article.author}, ''), ${metadata.author})`,
                    status: "done",
                    processingBatchId: null,
                    processingLeaseExpiresAt: null,
                })
                .where(
                    and(
                        eq(article.id, articleId),
                        eq(article.status, "processing"),
                        eq(article.processingBatchId, batchId),
                    ),
                )
                .returning({ id: article.id });

            if (!updated) continue;

            await tx
                .insert(articleMetaData)
                .values({
                    articleId,
                    summary: metadata.summary,
                    keyTakeaways: metadata.keyTakeaways,
                    difficulty: metadata.difficulty,
                    whyRead: metadata.whyRead,
                    readingTime: metadata.readingTime,
                })
                .onConflictDoUpdate({
                    target: articleMetaData.articleId,
                    set: {
                        summary: metadata.summary,
                        keyTakeaways: metadata.keyTakeaways,
                        difficulty: metadata.difficulty,
                        whyRead: metadata.whyRead,
                        readingTime: metadata.readingTime,
                    },
                });

            const selectedTags = userTags.filter((interest) =>
                metadata.tags.includes(interest.value),
            );

            if (selectedTags.length > 0) {
                const savedTags = await tx
                    .insert(tag)
                    .values(
                        selectedTags.map((selectedTag) => ({
                            name: selectedTag.label,
                            slug: selectedTag.value,
                        })),
                    )
                    .onConflictDoUpdate({
                        target: tag.slug,
                        set: { name: sql`excluded.name` },
                    })
                    .returning({ tagId: tag.id });

                if (savedTags.length > 0) {
                    await tx
                        .insert(articleTag)
                        .values(savedTags.map(({ tagId }) => ({ articleId, tagId })))
                        .onConflictDoNothing();
                }
            }

            const selectedCategories = articleCategories.filter((selectedCategory) =>
                metadata.categories.includes(selectedCategory.value),
            );

            if (selectedCategories.length > 0) {
                const savedCategories = await tx
                    .insert(category)
                    .values(
                        selectedCategories.map((selectedCategory) => ({
                            name: selectedCategory.label,
                            slug: selectedCategory.value,
                        })),
                    )
                    .onConflictDoUpdate({
                        target: category.slug,
                        set: { name: sql`excluded.name` },
                    })
                    .returning({ categoryId: category.id });

                if (savedCategories.length > 0) {
                    await tx
                        .insert(articleCategory)
                        .values(
                            savedCategories.map(({ categoryId }) => ({
                                articleId,
                                categoryId,
                            })),
                        )
                        .onConflictDoNothing();
                }
            }
        }

        //? promotional posts are dropped, the credit stays spent
        if (promotional.length > 0) {
            await tx.delete(article).where(ownedBy(promotional));
        }

        if (failed.length > 0) {
            await tx
                .update(article)
                .set({
                    status: "failed",
                    processingBatchId: null,
                    processingLeaseExpiresAt: null,
                })
                .where(ownedBy(failed));
        }
    });
};


//? ─── function ──────────────────────────────────────────────────────────────

const RELEASED = {
    status: "pending",
    processingBatchId: null,
    processingLeaseExpiresAt: null,
} as const;

type BatchEventData = {
    batchId?: string;
    articleIds?: string[];
    budget?: number;
};

//! the handler can be entered from a cron or an event, so the payload shape
//! is not known statically
const readBatchData = (data: unknown): BatchEventData =>
    data && typeof data === "object" ? (data as BatchEventData) : {};


export const articleBatchProcessor = inngest.createFunction(
    {
        id: "article-batch-processor",
        description: "Claim a batch of pending articles and generate BlogDrop metadata in controlled chunks.",
        concurrency: 1,
        retries: 2,
        idempotency: "event.data.batchId || event.id",
        triggers: [
            { event: "app/ArticleBatchProcess" },
            { cron: "*/5 * * * *" },
        ],
        onFailure: async ({ event, error, step }) => {
            const { batchId } = readBatchData(event.data);
            console.error(`Article batch processing failed for ${batchId ?? "new batch"}:`, error);

            if (batchId) {
                await step.run("release-batch", async () => {
                    //? hand the untouched remainder back so tomorrow's run, or
                    //? the restart event below, picks it up again
                    await db
                        .update(article)
                        .set(RELEASED)
                        .where(
                            and(
                                eq(article.status, "processing"),
                                eq(article.processingBatchId, batchId),
                            ),
                        );
                });
            }

            await step.sendEvent("restart-batch-processor", {
                name: "app/ArticleBatchProcess",
                data: {},
            });
        },
    },
    async ({ step, event }): Promise<IngestResult> => {
        const resumed = readBatchData(event.data);

        let batchId = resumed.batchId;
        const articleIds = resumed.articleIds ?? [];
        let budget = resumed.budget ?? 0;

        //? first entry claims a batch, re entries resume one they were handed
        if (!batchId) {
            const claim = await step.run("claim-batch", () => claimBatch(event.id));

            if (claim.articleIds.length === 0) {
                return {
                    status: "success",
                    data: claim.budget === 0 ? "daily ai credits exhausted" : "no pending articles",
                };
            }

            batchId = claim.batchId;
            budget = claim.budget;
        }

        if (articleIds.length === 0) {
            return { status: "success", data: "nothing left in this batch" };
        }

        const chunksThisRun = Math.min(
            MAX_CHUNKS_PER_RUN,
            Math.ceil(articleIds.length / CHUNK_SIZE),
        );

        const deferred: string[] = [];
        let processed = 0;
        let succeeded = 0;

        for (let index = 0; index < chunksThisRun; index++) {
            const chunk = articleIds.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE);

            //? credits are finite, never start more than we can pay for
            const allowance = Math.min(chunk.length, Math.max(0, budget));
            const runnable = chunk.slice(0, allowance);

            deferred.push(...chunk.slice(allowance));

            if (runnable.length === 0) continue;

            const outcomes = await step.run(`process-chunk-${index}`, () =>
                processChunk(runnable, batchId),
            );

            await step.run(`persist-chunk-${index}`, () => persistChunk(outcomes, batchId));

            processed += outcomes.length;
            succeeded += outcomes.filter((outcome) => outcome.status === "done").length;

            //? only articles that reached the model cost anything
            budget -= outcomes.filter((outcome) => outcome.llmAttempted).length;
        }

        const remaining = [...deferred, ...articleIds.slice(chunksThisRun * CHUNK_SIZE)];

        if (remaining.length > 0) {
            await step.sendEvent("continue-batch", {
                name: "app/ArticleBatchProcess",
                data: { batchId, articleIds: remaining, budget },
            });
        }

        return {
            status: "success",
            data: {
                batchId,
                processed,
                succeeded,
                deferred: remaining.length,
                creditsLeft: budget,
            },
        };
    },
);
