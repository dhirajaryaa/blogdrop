import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

// main readability 
export function extractArticleContent({ url, html }: { url: string, html: string }) {
    try {
        // Create a JSDOM document from the HTML
        const dom = new JSDOM(html, {
            url: url,
            contentType: "text/html",
        });

        const document = dom.window.document;

        const image = document.querySelector("meta[property='og:image']")
            ?.getAttribute("content") ||
            document
                .querySelector("meta[name='twitter:image']")
                ?.getAttribute("content");

        // Optional: Clean unwanted elements first
        const unwantedElements = document.querySelectorAll(
            "script, style, noscript, img, iframe, footer, header, nav, .advertisement, .sidebar, .menu"
        );
        unwantedElements.forEach((element) => element.remove());

        // Use Readability to extract article content
        const reader = new Readability(document);
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
            image
        };
    } catch (error) {
        console.error("Error extracting article content:", error);
        return null;
    }
};