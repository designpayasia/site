# Design Pay Asia site

Design Pay Asia is Southeast Asia's design pay conversation: a public, cited, and open website for reports, editorial context, and community-facing pay transparency work.

This repository contains the Astro site for `designpay.asia`.

## Status

The rebuild is in active development. Phase 1 design is coded, and the content foundation now uses Astro 6 structured collections for homepage, reports, evidence, redirects, docs, search, and public continuity notes.

## Stack

- Astro 6
- pnpm
- Node 22 via `.nvmrc`
- Plain CSS custom properties for design tokens
- Static-first publishing, with report content modelled as structured files

## Runtime

Use Node 22 for local work. The repo pins this through `.nvmrc` and CI follows the same contract.

```sh
nvm use
pnpm install
pnpm dev
```

Build the production site and search index:

```sh
pnpm build
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

## Public contract

The public site contract includes permanent URL structure, published content and data schemas, redirect manifests, search index generation, and documented integration points. During `0.y.z` initial development, anything may change. `1.0.0` marks the first stable public launch.

Each published metric must link to a named `evidenceId`. Cohorts smaller than 10 must be sampled or suppressed rather than published as granular facts.

## Public surfaces

- `/reports` for current and archive report routes
- `/docs` for public runbooks
- `/search` for static on-site search
- `/ops` for continuity spine, ownership matrix, and route inventory

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
