import TurndownService from "turndown";

export function convertHtmlToMarkDown(html: string) {
    try {
        if (!html) return null;

        const turndownService = new TurndownService();

        return turndownService.turndown(html);

    } catch (error) {
        console.error("Convert Html To MarkDown Error:", error);
        return null;
    }
};