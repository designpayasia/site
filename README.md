# Design Pay Asia site

Design Pay Asia is Southeast Asia's design pay conversation: a public, cited, and open website for reports, editorial context, and community-facing pay transparency work.

This repository contains the Astro site for `designpay.asia`.

## Status

The rebuild is in early active development. The design-language direction is locked, and the first coded surfaces are being built from the local design spec.

## Stack

- Astro
- pnpm
- Plain CSS custom properties for design tokens
- Static-first publishing, with report content modelled as structured files

## Local development

```sh
pnpm install
pnpm dev
```

Build the production site:

```sh
pnpm build
```

Preview a production build:

```sh
pnpm preview
```

## Versioning and git conventions

Versions follow Semantic Versioning 2.0.0: `MAJOR.MINOR.PATCH`.

- `MAJOR` changes are for incompatible changes to the public site contract.
- `MINOR` changes are for backward-compatible new functionality.
- `PATCH` changes are for backward-compatible fixes.

For this site, the public contract includes permanent URL structure, published content and data schemas, and documented integration points. During `0.y.z` initial development, anything may change. `1.0.0` marks the first stable public launch.

Git history uses Conventional Commits so release notes can map cleanly to SemVer. This is a commit-message convention, not a replacement for SemVer.

Common commit types:

- `feat:` for user-facing site features
- `fix:` for bug fixes
- `docs:` for documentation-only changes
- `style:` for formatting-only changes
- `refactor:` for code changes that do not change behaviour
- `test:` for test coverage
- `chore:` for maintenance, tooling, and dependency work

Breaking changes must include `!` after the type or a `BREAKING CHANGE:` footer.

Examples:

```text
feat: add report content collection
fix: correct homepage metadata
docs: add licensing notes
feat!: change report URL schema
```

## Licensing

Code in this repository is licensed under the MIT License. See `LICENSE`.

Content, report text, design writing, and published data are licensed under Creative Commons Attribution 4.0 International unless noted otherwise. See `LICENSE-CONTENT.md`.
