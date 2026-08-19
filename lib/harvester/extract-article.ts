import { parseHTML } from "linkedom";
import { Readability } from "@mozilla/readability";

export function extractArticleContent({
    url,
    html,
}: {
    url: string;
    html: string;
}) {
    try {
        const { document } = parseHTML(html);

        const image =
            document
                .querySelector("meta[property='og:image']")
                ?.getAttribute("content") ||
            document
                .querySelector("meta[name='twitter:image']")
                ?.getAttribute("content");

        const unwantedElements = document.querySelectorAll(
            "script, style, noscript, img, iframe, footer, header, nav, .advertisement, .sidebar, .menu"
        );

        unwantedElements.forEach((element) => element.remove());

        const reader = new Readability(document as any);
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
        };
    } catch (error) {
        console.error("Error extracting article content:", error);
        return null;
    }
}