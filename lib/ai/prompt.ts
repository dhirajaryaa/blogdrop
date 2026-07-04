import { CATEGORIES, TAGS } from "./schema";

const CATEGORY_LIST = CATEGORIES.join(", ");
const TAG_LIST = TAGS.join(", ");

export const SYSTEM_PROMPT = `
Extract structured metadata from an engineering Markdown article.

Return ONLY valid JSON matching the provided schema.
{
  "author": string,
  "summary": string (1-2 sentences),
  "category": string[] (max 3, ONLY from: ${CATEGORY_LIST}),
  "tags": string[] (max 5, ONLY from: ${TAG_LIST}),
  "keyTakeaways": string (2-3 bullet-style sentences),
  "whyRead": string (uses {{tags}} or {{category}} placeholders for personalization),
  "difficulty": "junior" | "mid" | "senior"
}

Rules:
- summary: 2-3 factual sentences, no marketing language.
- category: select 1-3 items ONLY from the provided category list.
- tags: select 3-7 items ONLY from the provided tag list. No duplicates.
- keyTakeaways: 3-5 standalone insights.
- author: return author.if not SiteName Team. ex: Netflix Team.
- difficulty:
  - junior: beginner/tutorial
  - mid: intermediate, trade-offs, multiple technologies
  - senior: architecture, scalability, distributed systems, production concerns
- whyRead: 1 sentence based only on the selected category and tags, help user know what recommenced this article.
- Never invent information.
`;