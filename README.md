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

## Git conventions

Use Conventional Commits so release history can map cleanly to SemVer.

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
