import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";


export function extractArticleContent({ url, html }: { url: string, html: string }) {

    // create jsdom create document 
    try {
        const dom = new JSDOM(html, {
            url: url,
            contentType: "text/html",
        });

        const document = dom.window.document;

        //? remove unwanted elements first
        const UNWANTED_SELECTORS = "script,style,noscript,iframe,svg,canvas,header,footer,nav,aside,form,button,input,select,textarea,dialog,menu,.ads,.advertisement,.ad,.banner,.popup,.modal,.social-share,.share-buttons,.newsletter,.comments,.related-posts,.recommended,.sidebar,.breadcrumbs";

        document.querySelectorAll(UNWANTED_SELECTORS).forEach((el) => el.remove());


        // use readability 
        const reader = new Readability(document);
        const article = reader.parse();

        if (!article) return null;

        return article;

    } catch (error) {
        console.error("Extract Article Content Error", error);
        return null;
    }

}