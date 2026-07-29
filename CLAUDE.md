# DPA site — agent instructions

Design Pay Asia is Southeast Asia's design pay conversation: a public, cited, open website for reports, editorial context, and community-facing pay transparency work.

Stack: Astro 6, pnpm, Node 22 via `.nvmrc`, plain CSS custom properties (3-tier token architecture), Zod content schemas, no JS framework (React/Vue/Svelte).

Site: `https://designpay.asia`. Repo: `designpayasia/site`.

## Commands

Node 22 is required (`.nvmrc`, `package.json` engines). The shell's default Node can drift out of range — if so, run scripts as `CI=true mise exec node@22 -- pnpm run <script>` rather than trusting `nvm use`.

```bash
pnpm install                      # first-time setup
pnpm dev                          # dev server (localhost:4321)
pnpm build                        # site build (alias for build:site plus a11y:charts)
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
pnpm run preview                  # local preview of built site
```

## Directory structure

```
src/
  components/           # Astro components only (.astro — no React/Vue/Svelte)
  content/
    contributors/       # roster.json — contributor list
    docs/               # public documentation (*.md, one per /docs/<slug>)
    evidence/           # named evidence entries (*.json, one per evidenceId)
    reports/            # <year>/index.md (report) + <year>/<section>.md (report sections)
    site/               # site-level content (*.json)
  content.config.ts     # Zod schemas — single source of truth for all collections
  data/
    redirects.json      # canonical redirect map
    route-purposes.json # route pattern → purpose, checked against routes.mjs by audit:ops
  lib/
    evidence.ts         # evidence helpers (buildEvidenceMap, collectEvidence, MIN_SAFE_COHORT)
    routes.mjs          # route discovery from src/pages + collections — consumed only by audit:ops, not by the build
  layouts/              # Astro layout components
  pages/
    index.astro                    # homepage
    about.astro                    # about page
    contribute.astro               # contribute page
    reports/index.astro            # report hub
    reports/[slug].astro           # report landing page
    reports/[year]/[section].astro # report section detail page
    docs/index.astro               # docs index, generated from the docs collection
    docs/[slug].astro              # docs renderer
    docs/patterns.astro            # component catalogue (not in the docs collection)
  styles/
    tokens/
      _primitives.css   # raw values only — never reference directly in components
      _semantic.css     # role-based aliases — always use these in component CSS
      _dark.css         # data-theme="dark" overrides only
    global.css          # import order: primitives → semantic → dark → base
public/
  charts/<year>/<section>/ # archived chart PNGs (2024: 52 across 8 sections; 2023 also present)
  team/<year>/              # team member headshots (2023 and 2024)
```

## Non-obvious constraints

### Design system → DESIGN.md

All visual design rules live in **DESIGN.md** (repo root). Read it before any style or component change. It covers: colour roles + exact hex values, dark mode, typography scale + faces, layout zones, shapes (D-blob SVG path), component visual specs, and do's and don'ts.

**Operational token rules (coding constraints):**
- Never reference `_primitives.css` tokens directly in components — always use semantic tokens from `_semantic.css`
- All dark mode overrides go in `_dark.css` only — never in component style blocks
- No hardcoded hex/rgb/px values that have a token equivalent
- Space scale: `--space-1` through `--space-32` (stops: 4 8 12 16 24 32 40 48 64 96 128px) — no intermediate values
- UPPERCASE labels: `text-transform: uppercase` in CSS via `.label-mono` — never uppercase in copy source

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
- **YAML frontmatter gotcha**: a bare `: ` (colon-space) inside a multi-line unquoted plain scalar breaks js-yaml with "bad indentation of a mapping entry" or "implicit mapping pair" — it reads as a new key. Rephrase to avoid the colon, or quote the whole string.

### Docs collection schema

Each markdown file in `src/content/docs/` requires: `title`, `summary`, `group` (`trust` | `playbook`), `order` (int ≥ 1), `updated` (`YYYY-MM-DD` string), optional `status` (`published` | `planned`, default `published`) and `related` (array of `{ label, href }`).

- `group` drives which section of the `/docs` index the doc appears in. Adding a third group means adding it to the `groups` array in `src/pages/docs/index.astro`.
- `status: 'planned'` renders the entry on the index as a visible gap and generates **no route**. This is how a missing doc stays honest instead of shipping as a 70-word stub. To fill it: write the body, flip `status` to `published`.
- `updated` is a quoted string, not a bare date — YAML would otherwise coerce it to a `Date` and the Zod regex would fail.
- Prose belongs in the markdown. Do not create per-doc `.astro` pages; `/docs/patterns` is the sole exception, because it renders live component demos.

### Evidence entry schema

Each evidence JSON file in `src/content/evidence/` requires: `id`, `title`, `summary`, `sourceName`, `sourceUrl`, `year`, `collectedAt`, `geography` (array, min 1), `methodology`, optional `sampleSize`, `sensitivity` (public|small-cohort|aggregate-only, default public).

### Components

- `.astro` only. No React/Vue/Svelte components.
- PascalCase filenames: `ChartBlock.astro`, `BigStat.astro`, `SiteHeader.astro`.
- Minimum touch target: 44px (see `.btn` in `global.css`, applies to all interactive elements).
- `.prose` constrains body text to `--zone-prose` (65ch). `.prose-editorial` to `--zone-editorial` (80ch).
- Page shell: gutters go on the `__inner` wrapper next to `max-width`, never on the outer section — see DESIGN.md § Layout. Getting this backwards renders a page two gutters wider than the rest of the site and nothing fails.
- Use `sticky` positioning only via `StickyMeta.astro` pattern — scroll-aware meta panels.
- Blob shape derives from the locked D″ master SVG path (see `Blob.astro`). All blobs on the site share one source of truth.
- The `.btn` class is the global button pattern: pill shape (border-radius: 999px), DM Mono, uppercase, 44px min-height. Variants: `.btn--primary` (crimson fill) and `.btn--secondary` (navy outline).

### Routing

- Report routes: `/reports/[slug]` (hub page) and `/reports/[year]/[section]` (section detail).
- Report detail pages live under `src/pages/reports/[year]/[section].astro`. The `[section]` param is a slug from the report's `sections[].id`.
- All static pages have their own `.astro` file under `src/pages/`.
- Docs: `/docs/*` — rendered from the `docs` content collection, not from per-page `.astro` files. Adding a doc means adding one `.md` file to `src/content/docs/`; no Astro required. `/docs/patterns` is the one exception and stays a hand-built `.astro` page because it hosts live component demos.
- `/ops` was retired; its content — continuity spine, architecture, succession, ownership matrix — now lives in the repo `README.md`.
- `src/lib/routes.mjs` derives every route pattern from `src/pages` and the content collections. Nothing in the build reads it any more; only `pnpm run audit:ops` does, checking each pattern has a purpose entry in `src/data/route-purposes.json` (and vice versa) and that the README still covers the required continuity-spine terms. Never hand-edit `routes.mjs`. A new route needs a purpose entry in `route-purposes.json`, and `audit:ops` fails until it has one. A new *dynamic* route also needs an expander in `routes.mjs`, or `audit:ops` throws.
- Report sections listed in `src/data/unrouted-sections.json` exist as content but get no route — they render inside the report landing page. That file is the single source: `src/pages/reports/[year]/[section].astro` filters `getStaticPaths` by it, and `src/lib/routes.mjs` skips those ids when listing route patterns. Do not re-inline the list.
- Report methodology is authored **only** as `methodologyStrip` in the report's `index.md` frontmatter, and the schema requires it. Do not add a `methodology.md` section file — there is no longer a render path for one, so its content would be invisible.
- Internal links are root-relative. The live domain appears in exactly three places: `site` in `astro.config.mjs`, the resolver base in `src/lib/evidence.ts`, and the citation example in `src/content/docs/using-our-data.md`. `sourceUrl` and `references[].url` accept either an external URL or a `/`-prefixed path (`sourceUrlSchema`).

### Redirects

- All redirects tracked in `src/data/redirects.json`. Array of `{ from, to, status }` objects.
- Run `pnpm run redirects:sync` after adding or changing redirects, then `pnpm run redirects:check` to verify.
- Redirects use 301 (permanent) for structural URL changes and 302 (temporary) for convenience aliases.
- Current redirects: `/reports/latest` → `/reports/2024` (302), `/latest-report` → `/reports/2024` (302), `/report/2023` → `/reports/2023` (301), `/report/2024` → `/reports/2024` (301).

### Data visualisation (design spec §6)

Chart style, register (OWID vs Pudding), and visual language → see **DESIGN.md § Data visualisation**.

Functional requirements for `ChartBlock.astro` (CI-enforced):
- Required fields: `title`, `caption`, `summary` (a11y), `evidenceIds`, `sourceLabel`, `sourceUrl`, `fallbackTable` (2-column array, min 1 row), `bars` (label/value/tone)
- Optional: `pngPath` for archived chart images
- Chart accessibility `summary` is required — CI fails when missing
- v1 ships existing Observable embeds as-is. Themed Observable = post-v1.

### Voice and prose (design spec §8)

Voice registers, tone rules, and examples → see **DESIGN.md § Do's and don'ts → Voice**.

Operational rules:
- British English. Oxford comma. Sentence-case headings — never title case.
- Run the humanizer skill on all prose before landing (Gate 3).
- DPA voice: direct, cited. Trust = data voice unimpeachable. Authority = editorial voice brave.
- Numeric ranges use an en dash (`25–30`, `2–8%`), never a hyphen (`25-30`).

### Succession principle

Repo runs without the founder. Design decisions are in tokens (DESIGN.md + `src/styles/tokens/`). A capable stranger or AI reads DESIGN.md and produces DPA-consistent work without reverse-engineering intent.

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
9. Visual verify in browser: golden path (homepage → report hub → section detail → docs) + edge cases
10. Run humanizer on all new or edited prose

## Delegation

The full playbook lives in the maintainer's notes, not in this repo. Everything needed to follow it is restated below — do not go looking for a `delegation-playbook.md` here.

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

### Environment

The repo lives at `/Volumes/Workspace/projects/designpayasia/site` and runs directly on the host — no container, no bridge.

The shell's default Node drifts out of the required range (`>=22.12.0 <25`). Run scripts as `CI=true mise exec node@22 -- pnpm run <script>` rather than relying on `nvm use`.
