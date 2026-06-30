import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import * as cheerio from 'cheerio';
import { extractBannerImage } from './extract-img';

export async function convertHtmlToMarkdown(html: string, cleanTags = 'script, style, noscript, iframe, footer, header, nav, head') {
    // Step 1: remove tags we don't want in the output
    const $ = cheerio.load(html);

    // Extract banner image first
    const bannerImage = extractBannerImage($);

    // Remove unwanted tags
    $(cleanTags).remove();

    const cleanedHtml = $('body').html();
    if (!cleanedHtml) return null;

    // Step 2: run through the unified pipeline
    const result = await unified()
        .use(rehypeParse)
        .use(rehypeMinifyWhitespace) // <-- this is the critical step
        .use(rehypeRemark)
        .use(remarkStringify)
        .use(remarkGfm)
        .process(cleanedHtml);

    // Step 3: collect metadata [optional]
    const title = $("title").text();
    const author = $('meta[name="author"]').attr("content");

    return { markdown: String(result).trim(), title, author, image:bannerImage }
};
