# Releasing

The site deploys from `main`. A release is a tag on a commit that is already live, not a gate the work passes through. Cutting one takes about a minute.

## Branching

`main` is the only long-lived branch. It is always deployable and always deployed.

Work happens on a short-lived branch, goes in by pull request, and is rebase-merged so history stays linear. There is deliberately no `develop` branch: nothing here is an installable artefact, Cloudflare Pages gives every branch its own preview URL, and a second long-lived branch would be one more thing a new maintainer has to learn and can get wrong.

```bash
git switch main && git pull --ff-only
git switch -c fix/short-description
# work, then
pnpm run check && pnpm build
gh pr create --base main
```

Branch names follow the commit type: `feat/`, `fix/`, `docs/`, `chore/`, `refactor/`.

**Do not stack branches.** Cut every branch from `main`. A pull request whose base branch is deleted when its parent merges is closed by GitHub, not retargeted, and a closed pull request's base cannot be edited. Recovering one means opening a fresh pull request. If you have already stacked, retarget the child to `main` **before** merging the parent.

## What blocks a merge

`main` is protected. A pull request is required, the `verify` job must pass, and the branch must be up to date with `main` first. Administrators are included — there is no direct push path, deliberately.

`verify` runs the full battery: `redirects:check`, `audit:tokens`, `audit:ops`, `audit:pii`, `a11y:charts`, `build`, `check-links`, `check`, `a11y:contrast`. Run them locally before opening the pull request rather than discovering a failure in CI.

An approving review is not required, because for now there may be nobody to give one. Add that requirement the day a second maintainer arrives.

## Version numbers

Semantic versioning, on the site itself:

- **MAJOR** — a route structure change, or anything that breaks an existing link
- **MINOR** — new content or a new feature: a report, a section, a documentation page
- **PATCH** — fixes, copy edits, styling, tooling

Take the highest change type across everything merged since the last tag. A range containing one `feat` and nine `fix` commits is a MINOR.

Reports version separately from the site. A corrected figure is a revision of that report, not a version of this repository — a reader who cited a number needs to find out that it moved, and a site version number will not tell them. That mechanism is not built yet.

## Cutting a release

Releases are cut when something reader-visible has landed. Not per merge, and not on a schedule.

```bash
git switch main && git pull --ff-only

# 1. Bump the version in package.json, then:
git switch -c chore/release-X.Y.Z
git add package.json
git commit -m "chore(release): X.Y.Z"
gh pr create --base main --title "chore(release): X.Y.Z"
# merge it once verify is green

# 2. Tag the merged commit and publish
git switch main && git pull --ff-only
git tag -a vX.Y.Z -m "vX.Y.Z — one line on what changed"
git push origin vX.Y.Z
gh release create vX.Y.Z --title "vX.Y.Z" --generate-notes
```

`--generate-notes` builds the notes from merged pull request titles since the previous tag, which is why titles follow Conventional Commits. Read what it produces and add a short reader-facing section at the top if anything visible changed. Pull request titles are written for contributors; most readers will not know what a token gate is.

The release feed is at `/releases.atom`, and watchers can subscribe to releases alone.

## If a release is wrong

Do not delete or move a published tag. Someone may already have cited it. Fix forward: land the correction and cut the next version.
