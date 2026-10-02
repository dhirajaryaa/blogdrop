import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sql } from "drizzle-orm";
import { and, eq } from "drizzle-orm";
import {
  article,
  articleCategory,
  articleMetaData,
  category,
  source,
} from "@/db/schema";
import { db } from "@/db";
import ArticleOgImage, {
  type OgArticleImageData,
} from "@/features/og/article-og-image";

export const dynamic = "force-dynamic";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap";

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type LoadedFont = {
  data: ArrayBuffer;
  name: string;
  weight: FontWeight;
  style: "normal";
};

let fontsCache: LoadedFont[] | null = null;

//* load + cache Poppins & JetBrains Mono once per server instance
async function getFonts(): Promise<LoadedFont[]> {
  if (fontsCache) return fontsCache;

  try {
    const css = await (await fetch(FONTS_URL)).text();
    const seen = new Set<string>();
    const fonts: LoadedFont[] = [];

    const blockRegex =
      /font-family:\s*'([^']+)';[\s\S]*?font-weight:\s*(\d+)[\s\S]*?url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;

    let match: RegExpExecArray | null;
    while ((match = blockRegex.exec(css))) {
      const family = match[1];
      const weight = Number(match[2]);
      const fontUrl = match[3];

      const key = `${family}:${weight}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const fontData = await (await fetch(fontUrl)).arrayBuffer();
      fonts.push({
        data: fontData,
        name: family,
        weight: weight as FontWeight,
        style: "normal",
      });
    }

    fontsCache = fonts;
  } catch (error) {
    console.error("Failed to load OG fonts:", error);
    fontsCache = [];
  }

  return fontsCache!;
}

//* embed the logo so the card never depends on a flaky network fetch
async function getLogoDataUri(): Promise<string | undefined> {
  try {
    const logo = await readFile(join(process.cwd(), "public", "logo.png"));
    return `data:image/png;base64,${logo.toString("base64")}`;
  } catch (error) {
    console.error("Failed to read logo for OG image:", error);
    return undefined;
  }
}

async function getArticleData(
  slug: string,
): Promise<OgArticleImageData | null> {
  try {
    const [row] = await db
      .select({
        title: article.title,
        author: article.author,
        readingTime: articleMetaData.readingTime,
        sourceName: source.title,
        categories: sql<{ name: string }[]>`
          COALESCE(
            (
              SELECT json_agg(json_build_object('name', ${category.name}))
              FROM ${articleCategory}
              INNER JOIN ${category}
                ON ${category.id} = ${articleCategory.categoryId}
              WHERE ${articleCategory.articleId} = ${article.id}
            ),
            '[]'::json
          )
        `,
      })
      .from(article)
      .innerJoin(source, eq(article.sourceId, source.id))
      .innerJoin(articleMetaData, eq(articleMetaData.articleId, article.id))
      .where(and(eq(article.slug, slug), eq(article.status, "done")));

    if (!row) return null;

    return {
      title: row.title,
      author: row.author,
      readingTime: row.readingTime,
      sourceName: row.sourceName,
      category: row.categories[0]?.name ?? null,
    };
  } catch (error) {
    console.error("Error loading article for OG image:", error);
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const [articleData, fonts, logo] = await Promise.all([
    getArticleData(decodeURIComponent(slug)),
    getFonts(),
    getLogoDataUri(),
  ]);

  const data: OgArticleImageData =
    articleData ??
    ({
      title: "Discover better engineering articles, all in one feed.",
      sourceName: "BlogDrop",
      author: "",
      readingTime: null,
      category: "Engineering Blog",
    } satisfies OgArticleImageData);

  const response = new ImageResponse(
    ArticleOgImage({ data, logoDataUri: logo }),
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );

  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
