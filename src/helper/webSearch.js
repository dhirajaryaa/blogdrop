import { getJson } from "serpapi";

const apiKey = process.env.SERP_API_KEY

export async function searchOnWeb(query) {
    const response = await getJson({
        engine: "google",
        api_key: apiKey,
        q: query,
    });
    const blogLinks = response?.organic_results?.slice(0, 5)?.map(data => data.link) || "['No Link found']"
    // console.log(blogLinks);

    return blogLinks

}

