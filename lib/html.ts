//? decode html entities (numeric + common named) into plain text so
//? feed titles/descriptions like "Don&#8217;t" render as "Don't"

const namedEntities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201c",
  rdquo: "\u201d",
  bull: "•",
  middot: "·",
  copy: "©",
  reg: "®",
  trade: "™",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  times: "×",
  divide: "÷",
  plusmn: "±",
  iexcl: "¡",
  laquo: "«",
  raquo: "»",
  deg: "°",
  sect: "§",
  para: "¶",
};

const namedPattern = Object.keys(namedEntities).join("|");

export function decodeHtmlEntities(input: string): string {
  if (!input) return input;

  return input
    .replace(/&#x([\da-f]+);/gi, (_m, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_m, dec: string) =>
      String.fromCodePoint(Number.parseInt(dec, 10)),
    )
    .replace(
      new RegExp(`&(${namedPattern});`, "g"),
      (_m, name: string) => namedEntities[name] ?? _m,
    );
}