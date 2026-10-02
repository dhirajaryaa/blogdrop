import Parser from "rss-parser"
import { convertInIsoDate } from "@/features/article/format-date";

type FeedArticle = {
    title: string,
    link: string,
    author: string,
    pubDate: string
}

export const RSS_FETCH_TIMEOUT_MS = 15_000;

const parser = new Parser({ timeout: RSS_FETCH_TIMEOUT_MS });

export const fetchRSS = async (rssUrl: string|null): Promise<FeedArticle[]> => {
    if(!rssUrl) return [];

    const feed = await parser.parseURL(rssUrl);

    return feed.items.map((item) => ({
        title: item.title ?? "",
        link: item.link ?? item.guid ?? "",
        author: item.creator ?? "",
        pubDate: convertInIsoDate(item.isoDate ?? item.pubDate),
    })).filter((item) => (item.link !== "" && item.title !== ""))
}