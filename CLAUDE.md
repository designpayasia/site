# DPA site — agent instructions

Design Pay Asia is Southeast Asia's design pay conversation: a public, cited, open website for reports, editorial context, and community-facing pay transparency work.

Stack: Astro 6, pnpm, Node 22 via `.nvmrc`, plain CSS custom properties (3-tier token architecture), Pagefind search, Zod content schemas, no JS framework (React/Vue/Svelte).

Site: `https://designpay.asia`. Repo: `designpayasia/site`.

## Commands

```bash
nvm use && pnpm install           # first-time setup
pnpm dev                          # dev server (localhost:4321)
pnpm build                        # site + Pagefind index (required before search works)
pnpm build:site                   # site only
pnpm run check                    # Astro diagnostics + content schema check — run before every commit
pnpm run redirects:sync           # regenerate public/_redirects from src/data/redirects.json
pnpm run redirects:check          # verify redirects after any URL/route change
pnpm run check-links              # verify internal links in built site
pnpm run audit:tokens             # semantic colour token audit
pnpm run audit:ops                # ops freshness audit
pnpm run audit:pii                # PII audit — required before any content PR
pnpm run a11y:charts              # chart accessibility — after adding/changing charts
pnpm run a11y:contrast            # WCAG 2.1 AA contrast — after any style change
pnpm run search:index             # Pagefind index rebuild (separate from build)
pnpm run preview                  # local preview of built site
```

## Directory structure

```
src/
  components/           # Astro components only (.astro — no React/Vue/Svelte)
  content/
    evidence/           # named evidence entries (*.json, one per evidenceId)
    reports/            # 2023.md, 2024.md
    site/               # site-level content (*.json)
  content.config.ts     # Zod schemas — single source of truth for all collections
  data/
    redirects.json      # canonical redirect map
  lib/
    evidence.ts         # evidence helpers (buildEvidenceMap, collectEvidence, MIN_SAFE_COHORT)
  layouts/              # Astro layout components
  pages/
    index.astro                    # homepage
    about.astro                    # about page
    contribute.astro               # contribute page
    ops.astro                      # continuity spine
    resources.astro                # resources page
    search.astro                   # Pagefind search page
    reports/index.astro            # report hub
    reports/[slug].astro           # report landing page
    reports/[year]/[section].astro # report section detail page
    docs/*.astro                   # public runbooks (edit-report, publish, etc.)
  styles/
    tokens/
      _primitives.css   # raw values only — never reference directly in components
      _semantic.css     # role-based aliases — always use these in component CSS
      _dark.css         # data-theme="dark" overrides only
    global.css          # import order: primitives → semantic → dark → base
public/
  charts/2024/<section>/ # archived chart PNGs (68 total across 8 sections)
  team/2024/              # team member headshots
```

## Non-obvious constraints

### CSS token architecture (3-tier, from design spec §10)

Tokens are organised in three tiers, each referencing the tier below it:

```
Primitive tokens (_primitives.css)
      ↓  (never referenced in component CSS)
Semantic tokens (_semantic.css)
      ↓  (always used in components)
Component tokens (in component scope, when a semantic alias is too generic)
```

Rules:
- **Never reference `_primitives.css` tokens directly in components.** Always use semantic tokens from `_semantic.css`.
- No hardcoded hex/rgb/px values that have a token equivalent. If a design value is not in the token system, it does not exist in the brand system.
- Changing a semantic token value changes it everywhere. That is the succession lever.
- Space scale tokens: `--space-1` through `--space-6` (consecutive, 4px–24px), then `--space-8`, `--space-10`, `--space-12`, `--space-16`, `--space-24`, `--space-32`. Tailwind-style stops — no intermediate values.

### Colour roles (design spec §4 — Track B resolved)

| Role | Token prefix | Usage | Hex anchor |
|------|-------------|-------|------------|
| Signal | `--color-signal-*` | Crimson — CTAs, mark, data highlights, key links | `#991844` |
| Workhorse | `--color-workhorse` | Near-black — primary text at every level | `#1a1a1a` |
| Ambient | `--color-ambient` | Warm cream — background surfaces | `#faf8f4` |
| Action | `--color-action` | Navy-derived — secondary interactive, hover, focus | `#4a628f` |
| Ink muted | `--color-ink-muted` | Reserved editorial support — not full signal or workhorse | `#6d6865` |

Colour ramps are complete: crimson, navy, warm grey, cream — each 50–900.

### Dark mode (design spec §4, encoded in _dark.css)

- Toggle: `data-theme="dark"` on `<html>` element.
- **V1 does NOT follow `prefers-color-scheme` automatically.** Dark mode is intentional, not automatic.
- Dark surface: navy `#0f1c2e` (resolved in §4).
- Crimson split for dark-surface readability: signal-fill `--color-crimson-400`, signal-text `--color-crimson-300`.
- Overrides exist only in `_dark.css` — never sprinkle dark-mode overrides in component files.
- The homepage has one intentional dark inversion beat (see `DarkBeat.astro`), handled by inverse tokens (`--color-inverse-surface`, `--color-inverse-text`).

### Typography — 4 locked display moments (design spec §5)

Do not invent new display sizes. Collapse anything that feels like a new size into `--type-h2`. Ask before creating new moments.

| Moment | Token pattern | Size | Leading | Tracking | Face |
|--------|-------------|------|---------|----------|------|
| Hero | `--type-hero-*` | 132px (8.25rem) | 0.88 | -0.018em | Instrument Serif |
| H2 | `--type-h2-*` | 64px (4rem) | 1.00 | -0.018em | Instrument Serif |
| Stat | `--type-stat-*` | 132px / DM Mono | 0.92 | -0.03em | DM Mono |
| Pull-quote | `--type-pullquote-*` | 36px (2.25rem) | 1.18 | 0em | Instrument Serif, italic, crimson |

Below display scale:

| Token | Size | Usage |
|-------|------|-------|
| `--type-body` | 16px (1rem) | Body text, prose |
| `--type-caption` | 14px (0.875rem) | Captions, chart notes |
| `--type-footnote` | 12px (0.75rem) | Footnotes, source credits |
| `--ui-meta` | 11px (0.6875rem) | **Accessibility floor** — use for eyebrow, label, meta. Never go smaller. |

UPPERCASE labels: use `text-transform: uppercase` in CSS via `.label-mono` class. Never uppercase in copy source.

### Typography — face selection (design spec §5, resolved)

| Role | Face | Fallback |
|------|------|----------|
| Display / editorial voice | Instrument Serif | Georgia, serif |
| Functional sans / data voice | Plus Jakarta Sans | system-ui, sans-serif |
| Data / tabular | DM Mono | Courier New, monospace |

Poppins is retired. It may appear only in legacy embedded Looker dashboards until replaced.

### Layout zones (design spec §7)

| Zone | Max-width | Purpose |
|------|-----------|---------|
| Prose | 65ch (`--zone-prose`) | Body text, editorial copy |
| Editorial | 80ch (`--zone-editorial`) | Section headings, wider editorial |
| Full | 100% (`--zone-full`) | Charts, images, hero moments, blob architecture |

CSS utility classes: `.prose` (65ch constraint), `.prose-editorial` (80ch constraint).

Grid: 12 columns desktop (≥1280px), 8 mid (768–1279px), 4 mobile (<768px). The grid is a scaffold, not a cage.

### Content schema invariants (from src/content.config.ts and src/lib/evidence.ts)

- **`MIN_SAFE_COHORT = 10`** — enforced in `src/lib/evidence.ts`. Cohorts < 10 must use `publishMode: 'suppressed'` or `'sample'` and include a `note` explaining why. Never publish granular facts for small cohorts.
- Every metric must have a valid `evidenceId` referencing an existing evidence entry. The build crashes with `Missing evidence entry` on mismatch.
- Evidence ID format: `evidence:[a-z0-9-]+` — lowercase, hyphens, no spaces.
- `getVisibleMetrics()` filters out `publishMode === 'suppressed'`. Always use it when rendering metric lists.
- Chart `evidenceIds` must all reference existing evidence entries. The build validates.
- Published metrics with `sampleSize < 10` are rejected by the Zod superRefine.
- Non-published metrics (`sample` or `suppressed`) must include a `note` explaining why.
- Report `canonicalPath` regex: `^/reports/[a-z0-9-]+(/[a-z0-9-]+)?$` — allows hub or hub+section.
- Section `id`: `^[a-z0-9-]+$`. Chart `id`: `^[a-z0-9-]+$`.
- Team member `photo`: `^/team/\d{4}/.+\.jpg$`.

### Evidence entry schema

Each evidence JSON file in `src/content/evidence/` requires: `id`, `title`, `summary`, `sourceName`, `sourceUrl`, `year`, `collectedAt`, `geography` (array, min 1), `methodology`, optional `sampleSize`, `sensitivity` (public|small-cohort|aggregate-only, default public).

### Components

- `.astro` only. No React/Vue/Svelte components.
- PascalCase filenames: `ChartBlock.astro`, `BigStat.astro`, `SiteHeader.astro`.
- Minimum touch target: 44px (see `.btn` in `global.css`, applies to all interactive elements).
- `.prose` constrains body text to `--zone-prose` (65ch). `.prose-editorial` to `--zone-editorial` (80ch).
- Use `sticky` positioning only via `StickyMeta.astro` pattern — scroll-aware meta panels.
- Blob shape derives from the locked D″ master SVG path (see `Blob.astro`). All blobs on the site share one source of truth.
- The `.btn` class is the global button pattern: pill shape (border-radius: 999px), DM Mono, uppercase, 44px min-height. Variants: `.btn--primary` (crimson fill) and `.btn--secondary` (navy outline).

### Routing

- Report routes: `/reports/[slug]` (hub page) and `/reports/[year]/[section]` (section detail).
- Report detail pages live under `src/pages/reports/[year]/[section].astro`. The `[section]` param is a slug from the report's `sections[].id`.
- All static pages have their own `.astro` file under `src/pages/`.
- Docs: `/docs/*` — public runbooks for contributors.
- Ops: `/ops` — continuity spine, ownership matrix, route inventory.

### Redirects

- All redirects tracked in `src/data/redirects.json`. Array of `{ from, to, status }` objects.
- Run `pnpm run redirects:sync` after adding or changing redirects, then `pnpm run redirects:check` to verify.
- Redirects use 301 (permanent) for structural URL changes and 302 (temporary) for convenience aliases.
- Current redirects: `/reports/latest` → `/reports/2024` (302), `/latest-report` → `/reports/2024` (302), `/report/2023` → `/reports/2023` (301), `/report/2024` → `/reports/2024` (301).

### Data visualisation (design spec §6)

- Default chart character: the editorial summary register (OWID-style — clean, standardised, rigorous).
- Key findings (3–4 per report) may use the data essay treatment (Pudding-style — richer annotation, narrative baked into the visual).
- Every chart must have: title, caption, summary, `evidenceIds`, sourceLabel, sourceUrl, fallbackTable (2-column array with min 1 row), bars (label/value/tone).
- Optional: `pngPath` for archived chart images.
- v1 ships existing Observable embeds as-is. Themed Observable charts are a post-v1 workstream.
- Chart accessibility summary is required — CI fails when missing.

### Voice and prose (design spec §8)

Two registers, never blurred:

| Register | Tone | Usage |
|----------|------|-------|
| Data voice | Neutral, precise, cited — no editorialising | Findings, methodology, tables, footnotes |
| Editorial voice | Opinionated, questions-first, marked as such | Framing, intros, section headers, provocations |

Data voice rules: state finding before context, always name sample/scope, state uncertainty explicitly, no editorialising adjectives, past tense for findings, specific comparisons.

Editorial voice rules: lead with question or claim, one argument per passage, mark register visually, acknowledge distance between data and argument, no false balance.

- British English. Oxford comma. Sentence-case headings — never title case.
- Run the humanizer skill on all prose before landing. This is Gate 3.
- DPA voice: direct, cited, not AI-sounding. Trust comes from the data voice being unimpeachable; authority comes from the editorial voice being brave.

### Succession principle (design spec §10)

The repo is designed to run without the founder. Every design decision is encoded in tokens. A capable stranger, volunteer, or AI should be able to read the spec and codebase and produce DPA-sounding work without reverse-engineering intent.

## Commits

Conventional Commits. Subject ≤ 50 chars:

```
feat: add 2024 compensation section
fix: correct cohort suppression check
style(hub): restyle hero grid
chore: archive 2024 chart PNGs
docs: add evidence entry for compensation data
```

SemVer mapping: `feat` → MINOR, `fix` → PATCH, `feat!` → MAJOR.

## Task completion checklist

Before marking any task done:

1. `pnpm run check` — must pass clean (Astro diagnostics + schema validation)
2. `pnpm build:site` — must succeed
3. Content changes → `pnpm run audit:pii`
4. Style changes → `pnpm run a11y:contrast`
5. Chart changes → `pnpm run a11y:charts`
6. Evidence/data changes → `pnpm run audit:pii`
7. URL/route changes → `pnpm run redirects:check`
8. Redirect changes → `pnpm run redirects:sync` then `pnpm run redirects:check`
9. Visual verify in browser: golden path (homepage → report hub → section detail → search) + edge cases
10. Run humanizer on all new or edited prose

## Delegation (per delegation-playbook.md)

All non-trivial work follows the T1/T2/T3 delegation model. Route by task shape, not by brand.

| Tier | Role | Best for | Route to |
|------|------|----------|----------|
| T1 | Extractor | File gathering, schema checks, brief construction, mechanical edits, asset downloads | Fast, cheap model (Haiku, Flash, 4o-mini) |
| T2 | Maker | Commentary writing, voice graft, schema edits, redirect mapping, general component work | Mid model (Sonnet, 4o, Pro) |
| T3 | Architect | Design decisions with downstream impact, cross-page consistency review, anything expensive if wrong | Strong model (Opus, o3, Ultra) |
| Reviewer | Same tier or higher | Diff review, fact-check, prose audit | Same or stronger model; never the same agent instance that made the change |

Rules:
- Orchestrator plans and reviews — never executes.
- Maker and checker are always different agent instances.
- Gate 1: human reviews extraction before downstream work begins.
- Gate 3: run humanizer on all prose before landing.
- Gate 4: infra/account/payment/design-direction stays human-only.
- British English, Oxford comma, sentence-case headings throughout.

### Task routing notes for DPA

- **Content extraction** (read Notion section → emit structured JSON) → T1
- **Content writing** (commentary, questions, reader guidance) → T2 + humanizer
- **Chart rebuild** (PNG download + JSON reconstruction) → T1 download, T2 reshape, maker/checker
- **Schema changes** (extending content.config.ts) → T2 draft, T3 review
- **CSS/style changes** (following spec) → T2 implementation, T3 design review for cross-page impact
- **Voice graft** (restoring community register to editorial copy) → T2 + humanizer
- **Architecture decisions** (route design, collection shape) → T3
- **Evidence data entry** (adding JSON to evidence/) → T1 extractor, T2 editorial review
- **Audit runs** (PII, tokens, a11y, ops) → T1 — but fix findings at appropriate tier

### Bridge access

The repo lives on macOS at `/Users/jon/Documents/GitHub/designpayasia/site`. When operating from the Hermes container, use the SSH bridge:

```bash
ssh -i ~/.ssh/mac-bridge jon@192.168.1.176 "cd /Users/jon/Documents/GitHub/designpayasia/site && <command>"
```

For pnpm/node commands, prepend PATH: `zsh -l -c 'export PATH="/opt/homebrew/bin:$PATH" && <command>'`

RTK is container-only — do not prefix macOS host commands with `rtk`.
