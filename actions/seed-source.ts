"use server";

import { db } from "@/db";
import { source } from "@/db/schema";

type InputSource = {
    id: string,
    name: string,
    category: string,
    rssUrl: string,
    sitemapUrl: string,
    siteUrl: string,
    priority: number
}

export const seedSourcesOnDB = async (inputRowSources: InputSource[]) => {

    if (!inputRowSources) return;



    const seed = await db.insert(source).values(
        inputRowSources.map((item) => {


            return {
                title: item.name.trim(),
                rssUrl: item.rssUrl.trim(),
                siteUrl: item.siteUrl ?? "",
                sitemapUrl: item.sitemapUrl ?? "",
                isActive: true,
            }
        })
    ).onConflictDoNothing();

    // console.log(seed);

    return { "status": "ok" }

}