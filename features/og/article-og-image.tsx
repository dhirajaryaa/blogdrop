//* branded article og card — personal branding first, article banner is NOT used
export type OgArticleImageData = {
  title: string;
  sourceName: string | null;
  author: string;
  readingTime: number | null;
  category: string | null;
};

type ArticleOgImageProps = {
  data: OgArticleImageData;
  logoDataUri?: string;
};

function truncateTitle(title: string, max = 140) {
  const trimmed = title.trim();
  return trimmed.length > max
    ? `${trimmed.slice(0, max).trimEnd()}…`
    : trimmed;
}

//* light theme tokens — matches the site's near-white / brand-blue look
const PRIMARY = "#3B6BF2";
const BRAND_STRONG = "#2658D8";
const INK = "#111827";
const INK_MUTED = "rgba(15,23,42,0.62)";
const INK_FAINT = "rgba(15,23,42,0.45)";
const BORDER = "rgba(15,23,42,0.1)";

function ArticleOgImage({ data, logoDataUri }: ArticleOgImageProps) {
  const title = truncateTitle(data.title);
  const isLongTitle = title.length > 96;
  const titleSize = isLongTitle ? 46 : 56;
  const titleLineHeight = isLongTitle ? 1.16 : 1.14;
  const category = data.category || "Engineering Blog";
  const readingTime = data.readingTime;

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#FFFFFF",
      }}
    >
      {/* background layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #F2F6FF 55%, #E7EFFF 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          right: -180,
          top: -240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,107,242,0.16), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          left: -220,
          bottom: -280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.1), transparent 70%)",
        }}
      />

      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "54px 62px 46px",
        }}
      >
        {/* header: branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {logoDataUri ? (
              //* <img /> is required here: next/image doesn't work inside ImageResponse
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoDataUri}
                alt="BlogDrop"
                width={44}
                height={44}
                style={{ borderRadius: 11 }}
              />
            ) : (
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  background: PRIMARY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 22,
                }}
              >
                B
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontSize: 27,
                  fontWeight: 700,
                  color: INK,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                BlogDrop
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: INK_FAINT,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                }}
              >
                ENGINEERING BLOG FEED
              </span>
            </div>
          </div>

          {/* personal branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: `1px solid ${BORDER}`,
              borderRadius: 999,
              padding: "9px 18px",
              background: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(15,23,42,0.05)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: PRIMARY,
              }}
            />
            <span
              style={{
                fontSize: 16,
                color: INK_MUTED,
                fontWeight: 500,
              }}
            >
              Curated by
            </span>
            <span style={{ fontSize: 17, color: BRAND_STRONG, fontWeight: 700 }}>
              Dhiraj Arya
            </span>
          </div>
        </div>

        {/* body: article title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: BRAND_STRONG,
                border: "1px solid rgba(59,107,242,0.4)",
                borderRadius: 999,
                padding: "6px 14px",
                background: "rgba(59,107,242,0.08)",
              }}
            >
              {category}
            </span>
            {readingTime !== null && (
              <span
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: 13,
                  fontWeight: 500,
                  color: INK_MUTED,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 999,
                  padding: "6px 14px",
                  background: "rgba(255,255,255,0.7)",
                }}
              >
                {readingTime} MIN READ
              </span>
            )}
          </div>

          <h1
            style={{
              margin: 0,
              marginTop: 22,
              maxWidth: 1030,
              fontSize: titleSize,
              fontWeight: 700,
              color: INK,
              lineHeight: titleLineHeight,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h1>
        </div>

        {/* footer: attribution */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 28,
            width: "100%",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 0,
            }}
          >
            {data.sourceName && (
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: BRAND_STRONG,
                  whiteSpace: "nowrap",
                }}
              >
                {data.sourceName}
              </span>
            )}
            <span style={{ color: "rgba(15,23,42,0.3)", fontSize: 15 }}>
              •
            </span>
            <span
              style={{
                fontSize: 15,
                color: INK_MUTED,
                whiteSpace: "nowrap",
              }}
            >
              By {data.author}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 15,
                fontWeight: 500,
                color: INK,
              }}
            >
              blogdrop.in
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 14,
                fontWeight: 500,
                color: INK_FAINT,
              }}
            >
              @dhirajarya01
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleOgImage;