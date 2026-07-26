import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { db } from "@/db";
import { article, source, articleMetaData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { siteUrl } from "@/config/constant";

export const runtime = "nodejs";
export const alt = "BlogDrop article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [row] = await db
    .select({
      title: article.title,
      sourceName: source.title,
      tags: articleMetaData.tags,
      readingTime: articleMetaData.readingTime,
    })
    .from(article)
    .leftJoin(source, eq(article.sourceId, source.id))
    .leftJoin(articleMetaData, eq(article.id, articleMetaData.articleId))
    .where(eq(article.slug, slug))
    .limit(1);

  const rawTitle = row?.title || "Every Engineering Blog. One Feed.";
  // Ensure title never exceeds 3 lines (approx 120 chars max for our typography)
  const title =
    rawTitle.length > 120
      ? rawTitle.slice(0, 117).trim() + "..."
      : rawTitle;

  const sourceName = row?.sourceName || "BlogDrop";
  const readingTime = row?.readingTime || 5;

  // Tag handling: display up to 5 tags and show "+X more" pill for remaining tags
  const allTags = row?.tags || [];
  const displayTags = allTags.slice(0, 4);
  const remainingTagsCount = allTags.length - displayTags.length;

  const siteHost = siteUrl ||"blogdrop.dev";

  const [logoData, dmSansBold, dmSansRegular] = await Promise.all([
    readFile(join(process.cwd(), "app/assets/logo.png")),
    readFile(join(process.cwd(), "app/assets/fonts/DMSans-Bold.ttf")),
    readFile(join(process.cwd(), "app/assets/fonts/DMSans-Regular.ttf")),
  ]);

  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  // Dynamic font sizing for maximum editorial visual impact
  const isLongTitle = title.length > 80;
  const isMediumTitle = title.length > 45 && !isLongTitle;

  const titleFontSize = isLongTitle ? "52px" : isMediumTitle ? "58px" : "66px";
  const titleLineHeight = isLongTitle ? 1.15 : 1.12;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          fontFamily: "DM Sans",
          backgroundColor: "#EFF6FF",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 30%, #C7D2FE 65%, #F3E8FF 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(750px circle at 950px 150px, rgba(37,99,235,0.45) 0%, rgba(79,70,229,0.25) 35%, rgba(139,92,246,0.08) 60%, rgba(139,92,246,0) 80%, rgba(139,92,246,0) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(700px circle at 1050px 550px, rgba(79,70,229,0.4) 0%, rgba(236,72,153,0.2) 40%, rgba(236,72,153,0.05) 65%, rgba(236,72,153,0) 85%, rgba(236,72,153,0) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(500px circle at 920px 315px, rgba(14,165,233,0.45) 0%, rgba(37,99,235,0.22) 45%, rgba(37,99,235,0.05) 65%, rgba(37,99,235,0) 80%, rgba(37,99,235,0) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(650px circle at 200px 350px, rgba(59,130,246,0.25) 0%, rgba(79,70,229,0.12) 40%, rgba(79,70,229,0.03) 65%, rgba(79,70,229,0) 85%, rgba(79,70,229,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-150px",
            width: "800px",
            height: "800px",
            borderRadius: "400px",
            border: "1px solid rgba(37,99,235,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-60px",
            width: "620px",
            height: "620px",
            borderRadius: "310px",
            border: "1px solid rgba(79,70,229,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "30px",
            width: "440px",
            height: "440px",
            borderRadius: "220px",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "170px",
            right: "120px",
            width: "260px",
            height: "260px",
            borderRadius: "130px",
            border: "1px solid rgba(37,99,235,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "250px",
            right: "200px",
            width: "100px",
            height: "100px",
            borderRadius: "50px",
            border: "1px solid rgba(79,70,229,0.3)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.28,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "120px",
            right: "290px",
            width: "6px",
            height: "6px",
            borderRadius: "3px",
            backgroundColor: "rgba(37,99,235,0.45)",
            boxShadow: "0 0 10px rgba(37,99,235,0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "230px",
            right: "150px",
            width: "5px",
            height: "5px",
            borderRadius: "2.5px",
            backgroundColor: "rgba(79,70,229,0.5)",
            boxShadow: "0 0 10px rgba(79,70,229,0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "390px",
            right: "330px",
            width: "5px",
            height: "5px",
            borderRadius: "2.5px",
            backgroundColor: "rgba(14,165,233,0.45)",
            boxShadow: "0 0 10px rgba(14,165,233,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "150px",
            right: "200px",
            width: "7px",
            height: "7px",
            borderRadius: "3.5px",
            backgroundColor: "rgba(37,99,235,0.4)",
            boxShadow: "0 0 12px rgba(37,99,235,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "90px",
            left: "520px",
            width: "5px",
            height: "5px",
            borderRadius: "2.5px",
            backgroundColor: "rgba(56,189,248,0.45)",
            boxShadow: "0 0 10px rgba(56,189,248,0.7)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background:
              "linear-gradient(90deg, #1D4ED8 0%, #2563EB 35%, #4F46E5 70%, #0284C7 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "54px 64px",
            boxSizing: "border-box",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img
                src={logoBase64}
                width={32}
                height={32}
                alt="BlogDrop Logo"
                style={{
                  borderRadius: "8px"
                }}
              />
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: 700,
                  color: "#0F172A",
                  letterSpacing: "-0.5px",
                }}
              >
                BlogDrop
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 22px",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(37,99,235,0.25)",
                boxShadow:
                  "0 6px 18px rgba(37,99,235,0.1), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              <span style={{ fontSize: "17px" }}>✨</span>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#2563EB",
                  letterSpacing: "0.3px",
                }}
              >
                AI Curated
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "28px",
              width: "100%",
              maxWidth: "1050px",
              flex: 1,
              margin: "36px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: titleFontSize,
                  fontWeight: 700,
                  lineHeight: titleLineHeight,
                  color: "#0F172A",
                  letterSpacing: "-1.5px",
                }}
              >
                {title}
              </span>
            </div>

            {allTags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {displayTags.map((tag: string, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "9px 18px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(255,255,255,0.92)",
                      border: "1px solid #BFDBFE",
                      boxShadow:
                        "0 4px 12px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,1)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#2563EB",
                        letterSpacing: "0.2px",
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                ))}

                {remainingTagsCount > 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "9px 18px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(243,244,246,0.92)",
                      border: "1px solid #D1D5DB",
                      boxShadow:
                        "0 3px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#6B7280",
                        letterSpacing: "0.2px",
                      }}
                    >
                      +{remainingTagsCount} more
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                {sourceName}
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 400,
                  color: "#CBD5E1",
                  margin: "0 4px",
                }}
              >
                •
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#64748B",
                }}
              >
                {readingTime} min read
              </span>
            </div>

            <span
              style={{
                fontSize: "19px",
                fontWeight: 700,
                color: "#64748B",
                letterSpacing: "0.3px",
              }}
            >
              {siteHost}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: dmSansBold, weight: 700, style: "normal" },
        {
          name: "DM Sans",
          data: dmSansRegular,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
