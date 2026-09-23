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

const BRAND = "#8AB4FF";
const PRIMARY = "#5B8CFF";

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
        background: "#0A0F1E",
      }}
    >
      {/* background layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #0A0F1E 0%, #0E1830 52%, #132541 100%)",
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
            "radial-gradient(circle, rgba(91,140,255,0.32), transparent 70%)",
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
            "radial-gradient(circle, rgba(56,189,248,0.16), transparent 70%)",
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
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                BlogDrop
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
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
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "9px 18px",
              background: "rgba(255,255,255,0.06)",
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
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
              }}
            >
              Curated by
            </span>
            <span
              style={{ fontSize: 17, color: BRAND, fontWeight: 700 }}
            >
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
                color: BRAND,
                border: `1px solid rgba(91,140,255,0.45)`,
                borderRadius: 999,
                padding: "6px 14px",
                background: "rgba(91,140,255,0.12)",
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
                  color: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 999,
                  padding: "6px 14px",
                  background: "rgba(255,255,255,0.05)",
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
              color: "#FFFFFF",
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
            borderTop: "1px solid rgba(255,255,255,0.1)",
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
                  color: BRAND,
                  whiteSpace: "nowrap",
                }}
              >
                {data.sourceName}
              </span>
            )}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 15 }}>
              •
            </span>
            <span
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.7)",
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
                color: "rgba(255,255,255,0.92)",
              }}
            >
              blogdrop.in
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
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