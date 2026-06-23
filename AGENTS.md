<!-- headroom:rtk-instructions -->
# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands
```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules
- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->

---

# DPA site — agent runbooks

Task-specific procedures for common work in this repo. Each runbook is a self-contained script the agent can execute from start to finish.

## Runbook: add a content section to a report

**When:** You need to add a new section to an existing report (e.g. adding a demographics section to 2024.md).

**Steps:**

1. **Read the existing report file.** Understand the current sections list, stats, and charts.

2. **Add the section to the report's frontmatter `sections[]` array** in `src/content/reports/<year>.md`:

```yaml
sections:
  - id: my-new-section
    title: My New Section
    summary: One-sentence overview of this section's findings.
    body: |
      Full prose for the section. Keep analytical register. Commentary and
      questions go in their own fields, not in body.

    commentary: |-
      The editorial voice. Starts with a question or claim. One argument.

    questions:
      - A question worth exploring, drawn from this data.
      - Another question.

    whatThisMeans: |-
      What this finding means for the design community broadly.

    whatThisMeansIndividuals: |-
      What this means for individual designers reading this.

    whatThisMeansLeaders: |-
      What this means for team leads and executives.

    references:
      - label: Source report or article
        url: https://example.com

    charts:
      - existing-chart-id
```

3. **Add any new charts** to the report's `charts[]` array. See the chart runbook.

4. **Add any new evidence** to `src/content/evidence/`. See the evidence runbook.

5. **Run the checklist:**
   - `pnpm run check` — Zod schema validates the new section fields
   - `pnpm build:site` — confirms all `evidenceIds` resolve
   - `pnpm run audit:pii` — no PII in new content

6. **Visual verify:** `pnpm dev` and check `/reports/<year>/my-new-section` renders.

**Caveats:**
- `id` must be `^[a-z0-9-]+$` — lowercase, hyphens.
- `body` is mandatory and min 1 char. Use `|-` YAML literal block for multi-paragraph.
- `commentary` is optional but strongly encouraged — this is the editorial voice.
- `whatThisMeans` is suppressed when `isAudienceGuidance` guard fires (template handles this).
- Each chart ID in `charts[]` must exist in the report's `charts[]` array.
- Run humanizer on all `body`, `commentary`, `whatThisMeans*`, and `questions` fields.

---

## Runbook: add or update a chart

**When:** You need to add a new chart to a report, or update an existing one.

**Steps:**

1. **Check available evidence** in `src/content/evidence/` — list all JSON files.

2. **Define the chart** in the report's frontmatter `charts[]` array:

```yaml
charts:
  - id: salary-by-experience
    title: Median salary by years of experience
    caption: Gross annual salary (SGD) by experience band, 2024.
    summary: Accessibility summary describing what this chart shows.
    evidenceIds:
      - evidence:dpa-2024-compensation
    sourceLabel: 2024 DPA Report
    sourceUrl: https://designpay.asia/reports/2024
    bars:
      - label: 0-2 years
        value: 45
        tone: workhorse
      - label: 3-5 years
        value: 62
        tone: signal
      - label: 6-10 years
        value: 78
        tone: workhorse
    fallbackTable:
      columns:
        - Experience
        - Median salary (SGD)
      rows:
        - label: 0-2 years
          value: SGD 45,000
        - label: 3-5 years
          value: SGD 62,000
```

3. **If the chart has an archived PNG:** download the PNG to `public/charts/<year>/<section>/<chart-id>.png` and set `pngPath: /charts/<year>/<section>/<chart-id>.png`.

4. **Cross-reference chart IDs** in the section's `charts[]` array — each must match a chart in the report's `charts[]`.

5. **Run the checklist:**
   - `pnpm run check` — schema validation
   - `pnpm build:site` — evidence resolution
   - `pnpm run a11y:charts` — chart accessibility checks
   - `pnpm run audit:pii` — no PII

**Caveats:**
- `summary` is used for accessibility — never leave empty or placeholder text.
- `bars[].value` must be 0–100 (percentage scale). For raw values, use `fallbackTable`.
- `fallbackTable` must have exactly 2 columns and at least 1 row.
- `evidenceIds` must all reference existing entries in `src/content/evidence/`.
- `id` format: `^[a-z0-9-]+$.
- Chart tone: `workhorse` (neutral fill) or `signal` (crimson fill). Default workhorse.

---

## Runbook: add a redirect

**When:** A URL changes or a convenience alias is needed.

**Steps:**

1. **Edit `src/data/redirects.json`** — add an entry to the array:

```json
{
  "from": "/old-path",
  "to": "/new-path",
  "status": 301
}
```

2. **Apply and verify:**
   ```bash
   pnpm run redirects:sync   # regenerates public/_redirects
   pnpm run redirects:check  # validates all redirects
   ```

3. **Full build check:** `pnpm build:site` to confirm the redirect doesn't break any internal links.

**Caveats:**
- Use 301 for permanent structural changes, 302 for temporary convenience aliases.
- Always sync before check — `redirects:check` validates what's in `public/_redirects`.
- Do not create redirect chains (A → B → C). Each redirect should resolve in one hop.
- The repo has Netlify-style `_redirects` syntax. Each line: `/from /to 301`.

---

## Runbook: add an evidence entry

**When:** A new data source is referenced by a metric or chart.

**Steps:**

1. **Create a JSON file** in `src/content/evidence/` named `<evidence-id-without-prefix>.json`:

```json
{
  "id": "evidence:dpa-2024-compensation",
  "title": "2024 DPA Compensation Findings",
  "summary": "Salary data across 847 designers in 11 Southeast Asian markets, collected January–March 2024.",
  "sourceName": "Design Pay Asia 2024 Report",
  "sourceUrl": "https://designpay.asia/reports/2024",
  "year": 2024,
  "collectedAt": "January – March 2024",
  "geography": ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam", "Philippines"],
  "methodology": "Online self-report survey distributed through design communities, social media, and professional networks.",
  "sampleSize": 847,
  "sensitivity": "public"
}
```

2. **When to suppress or sample:**
   - If cohort < 10: `sensitivity: "small-cohort"` and `publishMode: "suppressed"` on all related metrics.
   - If aggregate-only: `sensitivity: "aggregate-only"`.

3. **Reference from metrics and charts:**
   - Metric: `evidenceId: evidence:dpa-2024-compensation`
   - Chart: `evidenceIds: [evidence:dpa-2024-compensation]`

4. **Run the checklist:**
   - `pnpm run check` — Zod schema validation
   - `pnpm run audit:pii` — no PII in evidence metadata

**Caveats:**
- Filename must match the ID suffix: `dpa-2024-compensation.json` for `evidence:dpa-2024-compensation`.
- `geography` requires at least 1 entry.
- `sourceUrl` must be a valid URL (Zod validates with `.url()`).
- Once created, the evidence entry is referenced by multiple metrics. Changing the `id` requires updating every reference.

---

## Runbook: run the full audit suite

**When:** Before any PR, or when checking the health of the repo.

**Steps:**

```bash
# Phase 1: Build + schema
pnpm run check
pnpm build:site

# Phase 2: Audit suite
pnpm run audit:tokens      # semantic colour token usage
pnpm run audit:ops         # ops freshness
pnpm run audit:pii         # PII in content and evidence
pnpm run a11y:charts       # chart accessibility
pnpm run a11y:contrast     # WCAG 2.1 AA contrast

# Phase 3: Routing
pnpm run redirects:check
pnpm run check-links

# Phase 4: Full build with search
pnpm run build
pnpm run search:index
```

**Failure handling:**
- `check` fails → Astro schema or type error. Read the error, fix the field, re-run.
- `audit:pii` fails → PII detected in content. Check for emails, phone numbers, private names. Suppress or remove.
- `a11y:charts` fails → Chart missing accessibility summary. Add `summary` field.
- `a11y:contrast` fails → Colour contrast below WCAG 2.1 AA. Check against token ramp.
- `redirects:check` fails → Orphan redirect or broken chain. Fix in `redirects.json`, re-sync.

**When to skip phases:** For style-only changes, skip audit:pii. For content-only changes, skip audit:tokens and a11y:contrast. For redirect-only changes, skip everything except redirects:check and build.

---

## Runbook: CSS or style change

**When:** You need to add, modify, or audit a visual style.

**Steps:**

1. **Check if the value already exists as a token.** Query `_semantic.css` for the role. Use the semantic token, not a new hardcoded value.

2. **If a new primitive value is needed:** add it to `_primitives.css` first. Build the ramp if it's a new colour family. Then alias it in `_semantic.css`.

3. **If modifying an existing semantic value:** change it in `_semantic.css` only. It propagates everywhere. This is the intended lever.

4. **Never reference primitives in components.** Use the semantic alias. If no alias exists for your use case, add one to `_semantic.css`.

5. **For new type styles:** Check if it maps to an existing locked moment (hero, h2, stat, pull-quote). If it does, use that moment's token. If it doesn't, use body/caption/footnote/ui-meta, or ask before creating a new moment.

6. **Space values:** only use `--space-1` through `--space-32`. No 5px, no 30px.

7. **Dark mode:** add overrides in `_dark.css`, not in the component's CSS.

8. **Run the checklist:**
   - `pnpm run audit:tokens` — token usage audit
   - `pnpm run a11y:contrast` — contrast check
   - `pnpm build:site` — build with new styles

**Caveats:**
- The `Blob.astro` clip path is derived from the locked D″ master path. Do not change the SVG path without design review.
- Border-radius for non-button elements: use `--radius-blob-motif` (20px) as a scaled reference to the D″ chamfer.
- Button border-radius is always 999px (pill). Do not change.
- `.prose` and `.prose-editorial` are the only line-length constraints. Do not add custom max-widths in components.

---

## Runbook: add a team member

**When:** A new volunteer joins the report team.

**Steps:**

1. **Add the team member's entry** to the report's frontmatter `team[]` array:

```yaml
team:
  - name: First Last
    country: Singapore
    linkedin: https://linkedin.com/in/username
    photo: /team/2024/first-last.jpg
```

2. **Place the photo** at `public/team/2024/first-last.jpg`. Requirements:
   - JPG format
   - Path matches `^/team/\d{4}/.+\.jpg$`
   - Photo should be a reasonable headshot dimension

3. **Run the checklist:**
   - `pnpm run check` — schema validation
   - `pnpm build:site` — build passes

**Caveats:**
- `linkedin` must be a valid URL.
- `photo` path is relative to `public/`, starts with `/`.
- Team members render via `TeamGrid.astro` component.

---

## Runbook: ship a change

**When:** Ready to commit and push.

**Steps:**

1. **Run the full audit suite** (see runbook above).

2. **Write the commit message** using Conventional Commits:

```bash
git add -A
git commit -m "feat: add compensation section with evidence links"
```

3. **Verify the commit:**
   - Subject ≤ 50 chars
   - Type from: `feat`, `fix`, `style`, `chore`, `docs`, `refactor`, `test`
   - Scope optional: `deps`, `content`, `evidence`, `tokens`, `hub`, `a11y`

4. **Push:**

```bash
git push
```

**Caveats:**
- Never commit without running `check` and `build:site` first.
- PII audit is mandatory for any content change. Skip only if the change is wholly structural (CSS, config, redirects).
- If the PR spans multiple concerns (e.g. content + style), make separate commits.
- The repo is default branch `main`. No feature branches needed for single-committer work.
- After pushing, verify the deploy on Cloudflare Pages (typically 2-3 minutes).
