import { extractArticleContent } from "@/features/harvester/extract-article";
import { convertHtmlToMarkdown } from "@/features/harvester/html-markdown";
import { describeError } from "@/lib/pool";

export const FETCH_TIMEOUT_MS = 15_000;

export const USER_AGENT =
    "BlogdropBot/1.0 (+https://blogdrop.in; contact@blogdrop.in)";

//! shortest body we accept as a real article, below this the extraction is junk
export const MIN_CONTENT_LENGTH = 400;

//! hard cap so one pathological page cannot bloat the row / the llm input
const MAX_CONTENT_LENGTH = 200_000;

export type ExtractedArticle = {
    markdown: string;
    author: string | undefined;
    imageUrl: string | undefined;
};


/** a failure that will never succeed on retry, so we must not retry it */
export class PermanentArticleError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PermanentArticleError";
    }
}


const isTransientStatus = (status: number) =>
    status === 408 || status === 429 || status >= 500;


/**
 * Fetches the article page and turns it into markdown. Runs in-process so a
 * batch can do many articles inside one durable step.
 */
export async function fetchAndExtractArticle(
    url: string
): Promise<ExtractedArticle> {
    let response: Response;

    try {
        response = await fetch(url, {
            redirect: "follow",
            headers: {
                "User-Agent": USER_AGENT,
                Accept: "text/html,application/xhtml+xml",
            },
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });
    } catch (error) {
        // timeouts / dns / connection resets are transient
        throw new Error(`article request failed: ${describeError(error)}`);
    }

    if (!response.ok) {
        const message = `article fetch returned ${response.status} ${response.statusText}`;

        if (isTransientStatus(response.status)) throw new Error(message);
        throw new PermanentArticleError(message);
    }

    const html = await response.text();

    const extracted = extractArticleContent({ url, html });
    if (!extracted) {
        throw new PermanentArticleError("article extraction returned no content");
    }

    const converted = await convertHtmlToMarkdown(extracted.content);
    const markdown = (converted?.markdown || extracted.textContent).trim();

    if (markdown.length < MIN_CONTENT_LENGTH) {
        throw new PermanentArticleError(
            `article body too short (${markdown.length} chars)`
        );
    }

    return {
        markdown: markdown.slice(0, MAX_CONTENT_LENGTH),
        author: extracted.byline || converted?.author || undefined,
        imageUrl: extracted.image || undefined,
    };
}
