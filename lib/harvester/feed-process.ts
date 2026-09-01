import Parser from "rss-parser"
import { convertInIsoDate } from "@/utils/format-date";

type FeedArticle = {
    title: string,
    link: string,
    author: string,
    pubDate: string
}

export const fetchRSS = async (rssUrl: string|null): Promise<FeedArticle[]> => {
    if(!rssUrl) return [];

    const parser = new Parser();

    const feed = await parser.parseURL(rssUrl);   

    return feed.items.map((item) => ({
        title: item.title ?? "",
        link: item.link ?? item.guid ?? "",
        author: item.creator ?? "",
        pubDate: convertInIsoDate(item.isoDate ?? item.pubDate),
    })).filter((item) => (item.link !== "" && item.title !== ""))
}