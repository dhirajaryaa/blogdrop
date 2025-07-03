import Parser from '@postlight/parser';
import { getJson } from "serpapi";

const apiKey = process.env.SERP_API_KEY

export async function searchOnWeb({ query }) {
    try {
        console.log("Search on web...");
        const response = await getJson({
            engine: "google",
            api_key: apiKey,
            q: query,
        });
        const blogLinks = response?.organic_results?.slice(0, 3)?.map(data => data.link) || ["No Link found"];
        // console.log(blogLinks);
        let blogContents = [];
        console.log("Read web page...");
        for (const link of blogLinks) {
            const result = await Parser.parse(link, { contentType: 'text' });            
            blogContents.push({ content: result.content, source: result.url });
        };    

        return JSON.stringify(blogContents);
    } catch (error) {
        console.error("Search Error...");
        
    }
}


