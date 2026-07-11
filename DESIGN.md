---
name: Design Pay Asia
version: alpha
description: >
  Editorial salon for Southeast Asia's design community pay conversation.
  SEA-rooted. Warm-civic. Succession-first. Reports are evidence;
  the conversation is the work. Primary audience: the design community
  (civic register). Secondary: institutions, press, employers.
colors:
  signal: "#991844"
  signal-fill: "#991844"
  signal-text: "#991844"
  workhorse: "#1a1a1a"
  ambient: "#faf8f4"
  action: "#4a628f"
  ink-muted: "#6d6865"
  inverse-surface: "#0f1c2e"
  inverse-text: "#faf8f4"
  inverse-signal-fill: "#e05878"
  inverse-signal-text: "#d7a7b4"
  chart-primary: "#991844"
  chart-secondary: "#4a628f"
  chart-neutral: "#9a9591"
typography:
  hero:
    fontFamily: "Instrument Serif"
    fontSize: 132px
    lineHeight: 0.88
    letterSpacing: -0.018em
    fontWeight: 400
  h2:
    fontFamily: "Instrument Serif"
    fontSize: 64px
    lineHeight: 1.00
    letterSpacing: -0.018em
    fontWeight: 400
  stat:
    fontFamily: "DM Mono"
    fontSize: 132px
    lineHeight: 0.92
    letterSpacing: -0.03em
    fontWeight: 400
    fontFeature: "lining-nums tabular-nums"
  pull-quote:
    fontFamily: "Instrument Serif"
    fontSize: 36px
    lineHeight: 1.18
    letterSpacing: 0em
    fontWeight: 400
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 16px
    lineHeight: 1.625
    fontWeight: 400
  body-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 14px
    lineHeight: 1.4
    fontWeight: 400
  caption:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 12px
    lineHeight: 1.4
    fontWeight: 400
  meta:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 11px
    lineHeight: 1.4
    fontWeight: 400
  data-label:
    fontFamily: "DM Mono"
    fontSize: 12px
    lineHeight: 1.4
    fontWeight: 400
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
  24: 96px
  32: 128px
rounded:
  btn: 999px
  motif: 20px
  sm: 4px
  md: 8px
components:
  big-stat:
    typography: "{typography.stat}"
    textColor: "{colors.signal-text}"
  big-stat-label:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 12px
    textColor: "{colors.ink-muted}"
  button-primary:
    backgroundColor: "{colors.signal-fill}"
    textColor: "{colors.ambient}"
    rounded: "{rounded.btn}"
    height: 44px
  button-primary-hover:
    backgroundColor: "#c4295e"
    textColor: "{colors.ambient}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.action}"
    rounded: "{rounded.btn}"
    height: 44px
  link:
    textColor: "{colors.signal-text}"
  pull-quote:
    typography: "{typography.pull-quote}"
    textColor: "{colors.signal-text}"
  site-header:
    backgroundColor: "{colors.ambient}"
    textColor: "{colors.workhorse}"
  blob-primary:
    backgroundColor: "{colors.signal-fill}"
    textColor: "{colors.ambient}"
  blob-neutral:
    backgroundColor: "var(--color-surface-muted)"
    textColor: "{colors.workhorse}"
  dark-beat:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-text}"
  chart-bar:
    backgroundColor: "{colors.workhorse}"
  chart-bar-signal:
    backgroundColor: "{colors.signal-fill}"
---

## Overview

DPA publishes an annual pay transparency report for the SEA design community.
The site is a conversation space — not a data archive, not a product. Reports are
evidence contributions to an ongoing dialogue. The primary action is to share and
cite. Design for warmth, shareability, and civic ownership: "this was made by the
community for the community."

**Succession rule:** every design value is in the token system. A capable stranger
or AI maintainer can read DESIGN.md plus `src/styles/tokens/` and produce
DPA-consistent work. If a value is not in the tokens, it does not exist in the brand.

**Design system master reference:** a synthesised copy of this spec plus adjudication
notes lives in the Obsidian vault at `workbench/dpa/design system/DPA Design System —
Master Reference.md`. DESIGN.md and the implementation in `src/styles/` remain
canonical for values.

**Reference set:** The Pudding (playful rigour), Kontinentalist (SEA data storytelling),
Rest of World (humane non-Western editorial), the-symposium.live (salon discourse,
gallery-like), Hermes Agent (structural confidence, generous spacing, restrained motion).
Take principles from each; do not copy any single aesthetic.

**Token architecture:** 3-tier CSS custom properties.
1. `src/styles/tokens/_primitives.css` — raw values only; never reference in components
2. `src/styles/tokens/_semantic.css` — role aliases; always use these in components
3. `src/styles/tokens/_dark.css` — dark mode overrides only; never in component files

## Colors

Four functional roles cover the entire system. Palette direction: Track B — editorial
neutral ground with crimson as signal accent (not atmosphere).

| Role | CSS token | Hex | Usage |
|------|-----------|-----|-------|
| Signal | `--color-signal` | `#991844` | Crimson — CTAs, mark, data highlights, key links. One moment per section max. |
| Workhorse | `--color-workhorse` | `#1a1a1a` | Near-black — primary text at every level |
| Ambient | `--color-ambient` | `#faf8f4` | Warm cream — background surfaces |
| Action | `--color-action` | `#4a628f` | Navy-derived — secondary interactive, hover, focus |
| Ink muted | `--color-ink-muted` | `#6d6865` | Editorial support — chart labels, captions, secondary text |
| Ink subtle | `--color-ink-subtle` | `#4d4a47` | Editorial support — softer than ink-muted, secondary text |
| Surface muted | `--color-surface-muted` | `#eeeceb` | Quiet containers, neutral blob variant fill |
| Border subtle | `--color-border-subtle` | `#d8d5d2` | Hairline dividers, subtle container edges |
| Border strong | `--color-border-strong` | `#b8b4b0` | Emphasised borders, outlined component edges |

Crimson is a signal, not an atmosphere. It should feel unmissable in its role — CTAs,
the mark, data highlights. Never use it as a background wash or decorative fill.

**Dark mode** — toggle `data-theme="dark"` on `<html>`. V1 does not follow
`prefers-color-scheme` automatically; dark mode is intentional.

| Dark role | CSS token | Hex |
|-----------|-----------|-----|
| Surface | `--color-ambient` (overridden) | `#0f1c2e` (navy-900) |
| Text | `--color-workhorse` (overridden) | `#faf8f4` (cream-50) |
| Signal fill (buttons, badges, chart highlights) | `--color-signal-fill` | `#e05878` (crimson-400) |
| Signal text (links, inline emphasis) | `--color-signal-text` | `#d7a7b4` (crimson-300) |
| Inverse beat | `--color-inverse-surface` | `#0f1c2e` |
| Inverse text | `--color-inverse-text` | `#faf8f4` |

One intentional dark inversion beat on the homepage (`DarkBeat.astro`). Outside of
`DarkBeat.astro`, dark mode is driven entirely by `_dark.css` semantic overrides.

**Data-viz palette** (post-v1 themed Observable charts; v1 ships existing embeds as-is):

| Series | Token / Hex | Role |
|--------|-------------|------|
| Primary | `{colors.chart-primary}` `#991844` | Lead series, key finding |
| Secondary | `{colors.chart-secondary}` `#4a628f` | Comparison series |
| Neutral | `{colors.chart-neutral}` `#9a9591` | Ambient / total |

All chart series must pass WCAG AA (4.5:1) against the chart background in both modes.

## Typography

Three faces, three registers. Track B colour decision means typography carries hierarchy —
there is no coloured atmosphere to do that work.

| Role | Face | Fallback | Register |
|------|------|----------|----------|
| Display / editorial voice | Instrument Serif | Georgia, serif | Editorial opinionated — headlines, provocations, pull-quotes |
| Functional sans / data voice | Plus Jakarta Sans | system-ui, sans-serif | Data neutral — body, labels, UI, navigation |
| Data / tabular | DM Mono | Courier New, monospace | Numbers, tables, chart labels, mono labels |

Plus Jakarta Sans is designed by Tokotype (Jakarta). The SEA origin is intentional
and meaningful for a community data project about SEA designers.

Poppins is retired. It appears only in legacy embedded Looker dashboards.

**Four display moments — do not invent new ones.** If something needs a new size, use h2.

| Moment | CSS token | Size | Line-height | Tracking | Face | Notes |
|--------|-----------|------|------------|---------|------|-------|
| Hero | `--type-hero-*` | 132px (8.25rem) | 0.88 | −0.018em | Instrument Serif | Tight line-height is deliberate |
| H2 | `--type-h2-*` | 64px (4rem) | 1.00 | −0.018em | Instrument Serif | Italic stress allowed; signal colour allowed |
| Stat | `--type-stat-*` | 132px (8.25rem) | 0.92 | −0.03em | DM Mono | `lining-nums tabular-nums`; unit at 0.42em, 0.12em gap after number |
| Pull-quote | `--type-pullquote-*` | 36px (2.25rem) | 1.18 | 0 | Instrument Serif | Italic always; crimson always. The only italic-only moment. |

**Sub-display scale:**

| Token | Size | Usage |
|-------|------|-------|
| `--type-body` | 16px (1rem) | Body text, prose |
| `--type-caption` | 14px (0.875rem) | Captions, chart notes |
| `--type-footnote` | 12px (0.75rem) | Footnotes, source credits |
| `--ui-meta` | 11px (0.6875rem) | Accessibility floor — eyebrow, label, meta. Never smaller. |

**Mobile display fallback:** `--t-display-mobile` (64px) — R1 fallback for Hero/H2 display
moments on narrow viewports where the 132px/64px desktop sizes overflow.

**Stat tracking:** `-0.03em` (kept). Note — the `--tracking-stat` primitive (`-0.018em` in
`_primitives.css`) is retired in favour of `-0.03em`; `--type-stat-tracking` will reference
the primitive once `_primitives.css` is aligned. Decided 2026-07-04.

**Mono tracking:** `--tracking-mono` (0.02em) — general DM Mono tracking. `--tracking-label`
(0.08em) — UPPERCASE mono labels (`.label-mono`), wider tracking for legibility at small sizes.

**Italic rules:** italic = stress only. Two classes: `.display-italic` (muted, `--color-ink-muted`)
and `.display-signal` (crimson). Never style italic ad-hoc. Italic serif never appears in
subheads under hero or in footers — use Plus Jakarta Sans for those.

**Casing:** sentence case everywhere. Exceptions: DPA, Design Pay Asia, market names,
person names, publication titles. Mono labels are UPPERCASE via `text-transform: uppercase`
in CSS only — underlying copy written in sentence case.

**Body text max line length:** ~65–70 characters. Use `.prose` (65ch) or
`.prose-editorial` (80ch) CSS utilities. Do not add custom `max-width` in components.

## Layout

**Zone system (design spec §7):**

| Zone | Max-width | CSS utility | Purpose |
|------|-----------|-------------|---------|
| Prose | 65ch | `.prose` | Body text, editorial copy |
| Editorial | 80ch | `.prose-editorial` | Section headings, wider editorial passages |
| Full | 100% | — | Charts, images, hero moments, blob architecture |
| Site max | 1280px | `--width-site-max` | Overall container cap |

**Grid:** 12 columns desktop (≥1280px), 8 mid (768–1279px), 4 mobile (<768px).
The grid is a scaffold, not a cage — full-bleed moments, blob architecture, and
stats are intentional interruptions of the column grid.

**Spacing scale** (Tailwind-style stops — no intermediate values):
`4 8 12 16 24 32 40 48 64 96 128px` → tokens `--space-1` through `--space-32`.

**Composition character (§7):**
- Generous white space — editorial ground is largely neutral, colour is in signal roles
- Stats and provocations interrupt the reading rhythm intentionally
- Alternating text/visual zones create magazine-like pacing
- Sticky meta panels via `StickyMeta.astro` for scroll-aware secondary content
- Full-bleed moments anchor major section breaks

## Elevation & depth

DPA is flat. No shadow system, no elevation layers. Visual depth comes from:
- Contrast between ambient (cream) and workhorse (near-black) text
- The D-blob shape creating figure/ground separation
- The one dark inversion beat (`DarkBeat.astro`) on the homepage

Do not introduce box-shadow as a depth signal. If a container needs separation,
use the border token or a tint from the ambient ramp.

## Shapes

**The D-blob (D″ master):** the primary brand mark. A 200×400-unit D-shape with
two 45° chamfered corners (upper-left, upper-right, r=80) and a full arc right edge.

Locked SVG path (viewBox `0 0 200 400`):
```
M0 400 V133.14 A80 80 0 0 1 23.43 76.57 L76.57 23.43 A80 80 0 0 1 133.14 0 H200 A200 200 0 0 1 200 400 Z
```

All blobs on the site share this single path via `Blob.astro`. Never redraw it.
The path is the brand; its proportions encode the speech-bubble equity built over
five years. Request design review before any modification.

**Blob variants:**
- Primary (crimson fill, cream text) — callouts, hero moments
- Neutral (surface-muted fill, workhorse text) — supporting content
- Wordmark-only — SVG logotype, no fill colour change

**Reference motif radius:** `--radius-blob-motif: 20px` — scaled reference to the D″
chamfer. Use for non-button container rounding where the blob motif is referenced.

**Button shape:** `border-radius: 999px` (pill) — always. No exceptions.

## Components

All components are `.astro` only. PascalCase filenames. No React, Vue, or Svelte.

**`BigStat.astro`** ✓ implemented
- The 132px DM Mono stat with label below. Unit sits at 0.42em font-size, 0.12em gap
  after number — enforced in component, not freestyle. Stat value in `--color-signal-text`.
- Pattern: `<BigStat value="62%" label="received no pay increase in 2024" />`

**`Blob.astro`** ✓ implemented
- All blob instances. Accepts `variant` (primary | neutral) and `size`.
- Never duplicate the SVG path outside this component.

**Buttons** ✓ implemented (`.btn` CSS class)
- Primary: crimson fill, cream text, pill, 44px min-height — `.btn.btn--primary`
- Secondary: navy outline, no fill, pill, 44px min-height — `.btn.btn--secondary`
- Touch target minimum: 44px (WCAG). Applied globally via `.btn` in `global.css`.
- Font: DM Mono, `text-transform: uppercase`, from `.label-mono`.
- Hover transition: 180ms, canonical — currently hardcoded in `global.css`; to be
  tokenised as `--duration-hover: 180ms`. `--duration-fast` (150ms) keeps its
  non-button uses. Decided 2026-07-04.

**`SiteHeader.astro` / `SiteFooter.astro`** ✓ implemented
- Header: cream ambient background. Navigation in Plus Jakarta Sans.
- Footer: TBC (aspirational). Should not use Instrument Serif for pitch copy.

**`PullQuote.astro`** ✓ implemented
- 36px Instrument Serif italic, crimson. The only italic-only moment.
- Never nest multiple pull-quotes within a single section.

**`DarkBeat.astro`** ✓ implemented
- Homepage dark inversion section. navy-900 surface, cream text, crimson accents.
- Uses inverse token set. This is the only dark section in light mode.

**`ChartBlock.astro`** ✓ implemented
- Wrapper for all charts. Required fields: `title`, `caption`, `summary`
  (accessibility), `evidenceIds`, `sourceLabel`, `sourceUrl`, `fallbackTable`, `bars`.
- Bar tone: `workhorse` (neutral, `--color-workhorse` fill) or `signal` (crimson fill).
- v1: ships existing Observable embeds via `pngPath`. Themed Observable = post-v1.

**`StickyMeta.astro`** ✓ implemented
- Scroll-aware meta panels. Use only this pattern for sticky positioning.

**`FindingsStrip.astro`, `ConversationBlock.astro`, `TeamGrid.astro`** ✓ implemented
- Report-surface components. Styling follows the same token system.

**`Invitation.astro`** ✓ implemented
- Personal invitation voice moment (§8 third register). Centred layout: 40px blob mark
  (signal fill) + h2 question (display serif, max 20ch) + optional draft label (mono pill).
- One per report section at most — the question is the sole content, never buried in prose.
- Pattern: `<Invitation question="What does your pay say about how the industry values what you do?" />`

**`GuidePage.astro`** ✓ implemented
- Public contributor runbook layout. Props: `eyebrow` (mono label), `title` (h1, max 16ch),
  `summary` (prose), `steps[]` (ordered list), `links[]` (optional outlined doc-links).
- Doc-link border-radius: 8px (not pill — these are document navigation, not CTAs).
- Used for `/docs/*` public runbook pages.

**`StubPage.astro`** ✓ implemented
- Placeholder layout for pages not yet built. Props: `eyebrow`, `title`, `summary`,
  `ctaLabel`, `ctaHref`. CTA uses 8px border-radius outlined link (not `.btn` pill).
- Retire this component once the target page ships.

## Do's and don'ts

### Colors

✓ Use semantic tokens (`--color-signal`, `--color-workhorse`, etc.) in all component CSS  
✓ Reference `_dark.css` for all dark mode overrides — never in component files  
✓ Keep crimson to one moment per section maximum  
✓ Use `--color-signal-fill` for solid crimson surfaces, `--color-signal-text` for foreground crimson  

✗ Never hardcode hex values in component CSS — use semantic tokens  
✗ Never reference `_primitives.css` tokens directly in components  
✗ Never use crimson as an atmospheric wash or repeated decorative element  
✗ Never add dark mode overrides in `.astro` component style blocks  

### Typography

✓ Use Instrument Serif only for editorial register: headlines, pull-quotes, provocation copy  
✓ Keep exactly four display moments: hero, h2, stat, pull-quote — collapse anything else into h2  
✓ Set stat units at 0.42em with 0.12em gap after the number  
✓ Use `text-transform: uppercase` in CSS for mono labels; write underlying copy in sentence case  
✓ Constrain body text to `.prose` (65ch) or `.prose-editorial` (80ch)  

✗ Never use Instrument Serif for navigation, footer text, labels, or UI elements  
✗ Never use italic Instrument Serif under a hero heading — use Plus Jakarta Sans  
✗ Never use italic Instrument Serif in footer pitch copy — use Plus Jakarta Sans  
✗ Never invent a new display type size — ask before creating a new moment  
✗ Never write UPPERCASE in copy source — apply `text-transform` in CSS only  
✗ Never use Poppins  

### Long values and currency

Every stat component (`BigStat`, `DarkBeat`, `CoverCardInverse`, `StatTakeover`, `MetricShelf`) follows the same recipe for values that risk overflow — long pay figures, currency-prefixed numbers, multi-word units.

✓ Split the value into three segments — affix, numeric core, and unit — sized per the 0.42em, 0.12em gap rule above  
✓ Let segments wrap at their own boundaries (`flex-wrap: wrap`) rather than forcing one unbroken line  
✓ Keep digits together — the numeric core never breaks mid-number, however the layout wraps  
✓ Size the value with length-aware fit: `font-size: clamp(1rem, calc(100cqi / var(--stat-advance)), <locked ceiling>)` inside a `container-type: inline-size` ancestor, where `--stat-advance` is the value's own measured advance (in units of its font-size) set inline per value — the mono stat moment sizes to `min(locked ceiling, container ÷ value advance)`, so digits never clip, a 1rem clamp floor is a legibility backstop only, and `overflow: visible` on the figure is the tell-tale if a pathological value ever overflows — visible overflow is detectable, clipped digits are a silent lie  

✗ Never size a stat value with `vw` — it measures the viewport, not the component's own container, and breaks in a narrow grid cell  

Editorially, abbreviate pay values of six digits or more at hero stat moments (`S$4.85m`), and give the full figure in the caption or source line.

### Layout

✓ Use only named spacing stops: 4 8 12 16 24 32 40 48 64 96 128px (`--space-*`)  
✓ Use `.prose` and `.prose-editorial` as the only line-length constraints  
✓ Full-bleed moments (charts, hero, blobs) intentionally break the column grid  

✗ Never use intermediate spacing values (5px, 10px, 30px, etc.)  
✗ Never add custom `max-width` in component CSS — use zone utilities  

### Shapes

✓ Use `Blob.astro` for all blob instances — it is the single source of truth for the SVG path  
✓ Use `border-radius: 999px` for all buttons  
✓ Reference `--radius-blob-motif` (20px) for any container rounding that echoes the D″ chamfer  

✗ Never modify the blob SVG path without design review  
✗ Never use button border-radius other than 999px  

### Data visualisation

✓ Default chart mode: editorial summary register (OWID-style — clean, standardised, cited)  
✓ Feature chart mode: data essay register (Pudding-style — narrative annotated, 3–4 per report)  
✓ Every chart requires: `title`, `caption`, `summary` (a11y), `evidenceIds`, `fallbackTable`, `bars`  
✓ Bar tone `workhorse` for neutral data; `signal` for the key finding or highlighted category  

✗ Never ship a chart without an accessibility summary — CI fails  
✗ Never create themed Observable charts in v1 — that is a post-v1 workstream  

### Voice

Two registers, never blurred. The dual-register discipline is what earns trust.

**Data voice** (findings, methodology, tables, footnotes):
- State finding before context. Always name sample and scope.
- State uncertainty explicitly — "likely", "appears to" when data supports it.
- No editorialising adjectives. Past tense for findings.
- Specific comparisons; never vague relativism.

**Editorial voice** (framing, intros, section headers, provocations, "what this means"):
- Lead with question or claim. One argument per passage.
- Mark register visually (pull-quote, provocation callout) — never let editorial
  reasoning hide inside data-register prose.
- Acknowledge distance between data and argument.
- No false balance. No predetermined answer. Convene; do not campaign.

British English. Oxford comma. Sentence case in all headings and copy — never title case.
Run the humanizer skill on all prose before landing (Gate 3).
