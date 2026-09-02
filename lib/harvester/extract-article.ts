
import { parseHTML } from "linkedom";
import { Readability } from "@mozilla/readability";

type ExtractArticleContentParams = {
    url: string;
    html: string;
};

export function extractArticleContent({
    url,
    html,
}: ExtractArticleContentParams) {

    if (!html || !html.trim()) {
        console.error("Empty HTML content");
        return null;
    };

    const { document } = parseHTML(html);

    if (!document || !document.documentElement) {
        console.error("Failed to create DOM document");
        return null;
    }

    // Get image before modifying the DOM
    const image =
        document
            .querySelector("meta[property='og:image']")
            ?.getAttribute("content") ||
        document
            .querySelector("meta[name='twitter:image']")
            ?.getAttribute("content") ||
        null;

    // Remove unwanted elements
    // Keep img so Readability can process article images.
    const unwantedElements = document.querySelectorAll(
        "script, style, noscript, iframe, footer, header, nav, " +
        ".advertisement, .sidebar, .menu"
    );

    unwantedElements.forEach((element) => element.remove());

    // Readability options only
    const reader = new Readability(document as any, {
        debug: false,
    });

    const article = reader.parse();

    if (!article) {
        return null;
    }

    return {
        title: article.title || "",
        content: article.content || "",
        textContent: article.textContent || "",
        length: article.length || 0,
        excerpt: article.excerpt || "",
        byline: article.byline || "",
        dir: article.dir || "",
        siteName: article.siteName || "",
        lang: article.lang || "",
        image,
        url,
    };
}