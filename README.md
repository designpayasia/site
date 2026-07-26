# Design Pay Asia site

Design Pay Asia is Southeast Asia's design pay conversation: a public, cited, and open website for reports, editorial context, and community-facing pay transparency work.

This repository contains the Astro site for `designpay.asia`. This README and the `/docs` content are the whole public handover — there is no private supplement that explains the build. If you are picking this project up cold, read this file end to end, then read `/docs`.

## Status

The 2024 report rebuild is complete on `main`. The site serves 29 pages: hub, 8 report detail sections, closing, 2023 archive, and supporting pages. Content is modelled as Astro 6 structured collections with evidence-backed metrics, editorial commentary, reader guidance, and community attribution.

## Stack

- Astro 6
- pnpm
- Node 22 via `.nvmrc`
- Plain CSS custom properties for design tokens
- Static-first publishing, with report content modelled as structured files

## Publication contract

The public site contract covers permanent URL structure, published content and data schemas, redirect manifests, and documented integration points. During `0.y.z` initial development, anything may change. `1.0.0` marks the first stable public launch.

- Every published homepage or report metric needs a named `evidenceId`.
- Cohorts smaller than 10 must be sampled or suppressed rather than published as granular facts.
- Reports publish at year-namespaced routes under `/reports/`.
- Redirect changes must update `src/data/redirects.json` and the generated `public/_redirects` file.

## Recovery floor

- Run `nvm use` to match `.nvmrc` before local work — see Runtime, below.
- CI runs on Node 22 and checks build, routes, and content diagnostics.
- GitHub history is the public rollback path for content and route contracts.
- Private handoff packets (account ownership, 2FA, recovery credentials) stay outside this repository.

## Architecture

- Static Astro build. Routes live under `src/pages` and stay year-namespaced for published reports.
- Collections are defined in `src/content.config.ts` and loaded from `src/content/site`, `src/content/reports`, `src/content/evidence`, and `src/content/docs`.
- Redirect rules live in `src/data/redirects.json` and generate `public/_redirects` through `scripts/redirects.mjs`.
- CI proves redirects, token usage, ops freshness, link integrity, content checks, and the full static build.

## Runtime

Use Node 22 for local work. The repo pins this through `.nvmrc` and CI follows the same contract.

```sh
nvm use
pnpm install
pnpm dev
```

Build the production site:

```sh
pnpm run build:site
```

Run Astro diagnostics:

```sh
pnpm run check
```

Verify redirects:

```sh
pnpm run redirects:check
```

Verify generated-site internal links:

```sh
pnpm run check-links
```

Run the semantic colour-token audit:

```sh
pnpm run audit:tokens
```

Run the ops freshness audit:

```sh
pnpm run audit:ops
```

Regenerate `public/_redirects` from `src/data/redirects.json`:

```sh
pnpm run redirects:sync
```

## Quality gates

```sh
pnpm run a11y:charts          # verify all chart summaries are non-empty
pnpm run a11y:contrast        # audit semantic colour-token contrast pairs
pnpm run audit:pii            # scan content for email, phone, and IP leaks
pnpm run check-links          # verify generated-site internal links
pnpm run redirects:check      # validate redirect manifest
```

All audit scripts live under `scripts/` and are verified in CI.

## Succession and ownership matrix

Use Node 22 and run the documented checks before changing routes or published figures. Evidence and data-safety rules are trust floors — where provenance is weak, defer rather than publish. Some rows below are honest gaps, not oversights.

| Surface | Owner | Fallback | Status |
| --- | --- | --- | --- |
| Publication approvals | Jonathan | Decision stays manual | Active |
| Schema and content migration | Repo maintainers + AI drafting | Git history and this README | Active |
| Editorial cadence | Decision pending | Not yet assigned | Open gate |
| Infrastructure and deploy | GitHub repo maintainers | Node 22 + CI contract | Active |

## Route inventory

Routes are discovered at build time by `src/lib/routes.mjs`; their purposes live in `src/data/route-purposes.json`. `pnpm run audit:ops` enforces coverage, so the inventory cannot fall behind what ships.

## Public surfaces

- `/reports` for current and archive report routes
- `/docs` for how the data is handled and how a report cycle is run

Docs are markdown. To add or edit one, write a `.md` file in `src/content/docs/` — no Astro
knowledge needed. Pages marked `status: planned` show on the docs index as an open gap rather
than shipping as a stub.

## Versioning

Releases follow SemVer: `MAJOR.MINOR.PATCH`.

- `MAJOR` changes are for incompatible changes to the public site contract.
- `MINOR` changes are for backward-compatible new functionality.
- `PATCH` changes are for backward-compatible fixes.

Git history uses Conventional Commits so release notes can map cleanly to SemVer.

Examples:

```text
feat: add report content collection
fix: correct homepage metadata
docs: add licensing notes
feat!: change report URL schema
```

## Licensing

Code is licensed under the MIT License. See `LICENSE`.

Content, report text, design writing, and published data are licensed under Creative Commons Attribution 4.0 International unless noted otherwise. See `LICENSE-CONTENT.md`.
