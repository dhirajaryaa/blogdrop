# BlogDrop — Design & Page Rules

Single source of truth for keeping every page in the app visually consistent.
Follow this file when adding or editing pages/components. If it isn't documented
here, ask — don't invent a new pattern.

---

## 1. Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack dev) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@custom-variant dark`) |
| UI primitives | shadcn (`components/ui/*`) — `Button`, `Avatar`, `Toggle`, etc. |
| Icons | `@tabler/icons-react` — `stroke={1.75}` default, `stroke={2}` for emphasis |
| Fonts | Poppins 400 (`--font-sans`), JetBrains Mono (`--font-mono`), set in `app/layout.tsx` |
| Theme | `next-themes`, `attribute="class"`, values `light`/`dark`/`system` |

**Hard rules**

- Use design tokens only: `bg-background`, `text-muted-foreground`, `border-border/70`,
  `bg-primary`. NEVER hardcode `text-neutral-*`, `text-*-600`, hex/oklch colors, or `bg-white`.
- Dark mode must work for everything (tokens flip automatically in `globals.css`).
- **Do NOT use shadcn `sidebar`** (buggy). Custom `components/common/sidebar.tsx` is canonical.
- UI pages are UI-only: server components + demo data from `features/*` data files.
  No DB queries, no server actions, no auth in page/view files.
- Rounded: `rounded-xl` inputs/buttons, `rounded-full` pills/badges, `rounded-lg` card media.

---

## 2. Design tokens

Defined in `app/globals.css` (`:root` + `.dark`). Reference via `@theme inline`
classes: `background`, `foreground`, `card`, `muted`(+`-foreground`), `primary`
(+`-foreground`), `accent`, `destructive`, `border`, `input`, `ring`, `sidebar*`.

Common combined classes used everywhere:

```
border-border/70          hairline dividers & borders
bg-muted/40 OR bg-muted/60  subtle hover/toggle fills
text-muted-foreground      secondary text
divide-border/70           list row dividers
```

---

## 3. Typography scale

Body inherits `letter-spacing: var(--tracking-normal)` from the base layer.
Titles use `tracking-tight` (a touch tighter than the body tracking).

### 3.1 Eyebrow / section label
Uppercase, spaced, muted, small. Used above nearly every heading.

```
<p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
  {LABEL}
</p>
```

### 3.2 Page title (H1)
App-shell inner pages (`/feed`, `/explore`, `/saved`, `/settings`, …):

```
<h1 className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
  {Title}
</h1>
```
Optional sub-line right below: `text-muted-foreground` body copy.

Marketing / brief pages may go larger:
`text-4xl sm:text-5xl leading-[1.15]` (hero) or `text-3xl sm:text-4xl` (article brief).

### 3.3 Section heading (H2)

```
<h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
```

### 3.4 Feed/article title (H3)

```
<h2 className="mt-5 max-w-2xl text-lg leading-snug font-medium tracking-tight text-balance sm:text-xl lg:text-2xl">
```

### 3.5 Body / AI summary

```
<p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7 sm:line-clamp-2 sm:text-[15px]">
```
Detail pages keep the full paragraph (`line-clamp` removed, `leading-8 sm:text-base`).

### 3.6 Meta row (source · date · reading time · difficulty)

```
<div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
  <Image ... width={20} height={20} className="rounded-md bg-white object-contain" />
  <span className="text-foreground font-medium">{source}</span>
  <span aria-hidden>·</span>
  <span>{date}</span>
  <span aria-hidden>·</span>
  <span>{readingTime} read</span>
  {difficulty badge}
</div>
```

### 3.7 Small labels

`text-xs` for field labels, helper text, footer links, stat captions.

---

## 4. Difficulty badge

Feed card + article brief chips. Pill: `rounded-full border px-2.5 py-0.5 text-[10px]`
(card) or `px-3 py-1 text-xs` (brief page).

```
junior: border-border text-muted-foreground
mid:    border-primary/30 text-primary
senior: border-destructive/30 text-destructive
```

---

## 5. Spacing & layout rhythm

Inline pages (inside `AppShell`)

- Shell provides: sidebar + `Topbar` (`h-16` sticky), content `max-w-5xl px-6 sm:px-10 pb-28`, `MobileNav` bottom tabs on `lg:hidden`.
- Inner content container: `mx-auto w-full max-w-2xl` (forms/settings) or `max-w-3xl` (reading).
- Page top spacing: `mt-16 sm:mt-20`, then sections at `mt-12`/`mt-14`.
- Section blocks: label + hairline container `border-y border-border/70` with `divide-y`.

Feed rows

- 12–20 px grid gutter, rows `py-10 sm:py-14`, `first:pt-0 last:pb-0`, on `divide-border/70 divide-y`.
- Numbered index (01, 02 …): `font-mono text-xs text-muted-foreground/50` in a `sm:grid-cols-[3.5rem_1fr]` grid.

Standalone pages (`/`, `/onboarding`)

- `Container`: `mx-auto min-h-screen w-full max-w-5xl px-6 sm:px-10`.
- Hero top: `pt-24 sm:pt-32`. Sections separated `mt-24 sm:mt-32`.
- Header hairline: `border-b border-border/70 pb-4`.

---

## 6. Page variants & metadata

All pages export `Metadata` via `constructMetadata` from `lib/utils.ts`
(extends `config/constant` `siteUrl`). Title format: `"{Page} — BlogDrop"`.
Route group `(app)` renders inside `AppShell`; `app/(app)/profile`,
`app/(app)/settings`, … are inner pages.

| Route | Variant | H1 | Notes |
| --- | --- | --- | --- |
| `/` | Standalone marketing | Hero (no eyebrow) | Navbar + HowItWorks + FounderNote + Footer |
| `/feed` | Inner list | Eyebrow + title | `FeedList` rows, topic filter pills |
| `/explore` | Inner grid | Eyebrow + title | Category grid → `/feed?topic=` |
| `/latest` | Inner list | Eyebrow + title | Reuses `FeedList` |
| `/sources` | Inner list | Eyebrow + title | `VERIFIED_SOURCES` |
| `/saved` | Inner list | Eyebrow + title | Demo bookmarks via `FeedList` |
| `/profile` | Inner profile | Name H1 | Stats row + Edit profile form + account links |
| `/settings` | Inner form | Eyebrow + `Make it yours.` | `PreferenceRow` toggles, `ThemeSwitch`, danger zone |
| `/a/[slug]` | AI brief | `text-3xl sm:text-4xl` | In shell, `max-w-3xl`, GoBackBtn, related list |
| `/onboarding` | Standalone | Centered | Outside shell, centered layout |

Metadata pattern example:

```ts
export const metadata: Metadata = constructMetadata({
  title: "Settings — BlogDrop",
  description: "Manage your reading preferences on BlogDrop.",
});
```

---

## 7. Reusable components

| Component | Location | Usage |
| --- | --- | --- |
| `FeedList` + `FeedListItem` | `features/feed/components/feed-list.tsx` | All article lists (feed/latest/saved/home). Card links to `/a/[slug]`; top-right `↗` button (sm+) opens original URL directly — **no `title` attr** (no hover tooltip). |
| `FeedArticle` type | `features/feed/feed-data.ts` | `id, slug, title, description, author, url, date, readingTime, company, logo, category, difficulty, keyPoints[]`. Keep `logo` as `/icons/*.svg` when available. |
| `ArticleBrief` | `features/article-brief/` | `/a/[slug]` view: GoBack, meta, chips, AI summary, Key points, `Read on {company}` (external), related. |
| `PreferenceRow` | `features/settings/components/preference-row.tsx` | Settings toggle rows (shadcn `Toggle`). |
| `ThemeToggle` / `ThemeSwitch` | `components/common/theme-toggle.tsx` | Topbar icon + Settings segmented control. Mount detection via `useSyncExternalStore` (lint-safe). |
| `Topbar` / `Sidebar` / `MobileNav` / `AppShell` | `components/common/` | App chrome (shell). |
| `GoBackBtn` | `components/common/go-back.tsx` | Back buttons (`router.back()`), `text` prop toggles label. |
| `Button` | `components/ui/button.tsx` | `size="lg"` for primary CTAs, `variant="outline"` secondary. |
| `formatDate` | `features/article/format-date.ts` | Date formatting (returns `""` for invalid input). |

---

## 8. Interaction conventions

- Cards are a single `<Link>` (whole row clickable) with an explicit external
  escape (`↗` icon) — preserves a low "trapped" feeling.
- Hover reveal pattern: muted CTA fades in via `opacity-60 group-hover:opacity-100`
  with `group-hover:translate-x-0.5` arrow.
- Pills/chips are links (`/feed?topic=`) or buttons, never non-interactive spans unless truly static.
- Buttons that do nothing yet: `type="button"`, no handlers, demo state only.
- `line-clamp-2` summaries on cards; full paragraphs on brief page.

---

## 9. Verification

Before finishing UI changes, run:

```
npx tsc --noEmit
npx eslint <changed files>
```

Fix both. Pre-existing lint errors elsewhere (`login-btn.tsx`, `extract-article.ts`,
`founder-note.tsx`→now fixed, `lib/types.ts`) should not be touched unless asked.
When routes are deleted, remove stale `error: Cannot find module ... app/**` by
deleting `.next/dev/types/validator.ts` and `.next/types/validator.ts` before `tsc`.