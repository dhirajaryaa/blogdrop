import * as cheerio from "cheerio";

export function extractBannerImage($: cheerio.CheerioAPI) {
    // 1. Open Graph
    const ogImage = $('meta[property="og:image"]').attr("content");
    if (ogImage) return ogImage;

    // 2. Twitter
    const twitterImage = $('meta[name="twitter:image"]').attr("content");
    if (twitterImage) return twitterImage;

    // 3. Article image
    const articleImg = $("article img").first().attr("src");
    if (articleImg) return articleImg;

    // 4. Main image
    const mainImg = $("main img").first().attr("src");
    if (mainImg) return mainImg;

    // 5. Fallback
    return $("img").first().attr("src") ?? null;
}