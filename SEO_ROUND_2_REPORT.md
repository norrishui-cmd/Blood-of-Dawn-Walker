# Blood of Dawnwalker SEO Round 2

Date: 2026-07-17

## Outcome

- Existing HTML routes retained: 223
- Previous sitemap URLs: 215
- Quality-approved sitemap URLs after this round: 51
- Repetitive placeholder routes moved to `noindex, follow`: 172
- New high-intent pages: 8
- Existing core pages deeply rewritten: 3
- New/deepened page length: 552–658 words, each with a direct answer, unique metadata, sources, related guides, and matching FAQ schema
- Broken internal links found in final validation: 0
- Duplicate titles/descriptions among HTML routes: 0

## Fixed

| Issue | File/Route | SEO risk | Action | Priority |
|---|---|---|---|---|
| 172 pages repeated the same pre-launch boilerplate | Multiple leaf routes | Site-wide thin-content and near-duplicate signals | Kept URLs available, changed them to `noindex, follow`, and removed them from the sitemap | Critical |
| Homepage described the site as an MVP and exposed internal SEO planning language | `/` | Weak player value, poor trust, diluted search intent | Rebuilt the homepage around confirmed release status, the time system, buyer checks, and player navigation | Critical |
| Core 30-day guide discussed what the site should test instead of answering the query | `/30-days/` | Fails the target query and competes poorly with news coverage | Rewrote with confirmed rules, exploration behavior, deadline consequences, and direct Brencis route | High |
| Day/night page contained a testing checklist rather than known mechanics | `/day-night-system/` | Thin answer for a signature game system | Rewrote human magic, vampire abilities, quest differences, and remaining unknowns | High |
| Combat page was an empty launch template | `/combat/` | No concrete answer for a high-volume gameplay cluster | Rewrote directional combat, parry/block/dodge, activation charges, Omni-Block, and Soulslike positioning | High |
| Latest gold-status news absent | `/gone-gold/` | Misses current release-intent searches | Added a source-checked gold-status explainer and clarified day-one patch implications | High |
| Character creation query had no dedicated answer | `/character-creation/` | Missing pre-purchase long-tail intent | Added a direct answer distinguishing predefined Coen from build and appearance customization | High |
| Blood hunger had no focused page | `/blood-hunger/` | Missing signature-mechanic and NPC-consequence intent | Added critical-hunger, animal feeding, NPC risk, and role-playing coverage | High |
| Omni-Block had no dedicated page | `/omni-block/` | Missing combat/accessibility long tail | Added a focused explanation that separates block assistance from automatic parrying | Growth |
| Compel Soul had no dedicated page | `/compel-soul/` | Missing spell/entity query and human-form differentiation | Added a sourced human-magic page covering investigation and quest branching | Growth |
| Game length query was only buried in FAQ | `/game-length/` | Weak snippet ownership for a common pre-release query | Added 55–70 hour context, 30 days vs real time, and completion limits | Growth |
| Exploration/time and deadline outcomes overlapped inside broad pages | `/exploration-time-cost/`, `/after-30-days/` | Poor match for exact-question searches | Created separate, non-cannibalizing answers and linked them to the 30-day hub | High |
| Feed and sitemap included low-quality placeholders | `sitemap.xml`, `sitemap-index.xml`, `feed.xml` | Wasted crawl budget and inconsistent discovery | Added an automated semantic quality gate that rebuilds discovery files from indexable canonicals only | Critical |

## New Pages

1. `/gone-gold/`
2. `/character-creation/`
3. `/blood-hunger/`
4. `/omni-block/`
5. `/compel-soul/`
6. `/game-length/`
7. `/exploration-time-cost/`
8. `/after-30-days/`

## Quality Controls Added

- `scripts/build-round-2-pages.mjs`: regenerates the 8 new pages and 3 strengthened core pages from reviewed content.
- `scripts/seo-quality-gate.mjs`: detects the known boilerplate pattern, applies `noindex, follow`, rebuilds sitemap/feed files, and writes `SEO_QUALITY_GATE_REPORT.json`.
- Every new/deepened page contains a quick answer, unique intent, visible FAQ, matching FAQ structured data, primary/reputable sources, and internal links only to quality-approved guides.

## Open — Next Three Highest-Leverage Actions

| Issue | File/Route | SEO risk | Recommended next action | Priority |
|---|---|---|---|---|
| Official bestiary and location information is not yet converted into quality entity pages | `/enemy-types/`, `/vale-sangora-map/`, location leaves | Competitors can own named-entity searches before launch | Use official bulletins to rebuild a controlled batch for Blood Guards, vrakhiri, Svartrau, Howling Keep, and Shrike's Crag | High |
| Placeholder routes remain accessible although no longer indexable | 172 noindex routes | Low-quality URLs could still consume some crawl activity through old internal links | Upgrade by evidence cluster; only restore `index` and sitemap inclusion after each page passes the concrete-answer gate | High |
| No GSC query export was supplied for this round | Whole site | Priorities rely on public search/community evidence rather than the site's own impressions | After deployment, compare 7-day and 28-day queries and landing pages before changing titles again | High |

## Deployment Check

After deploying the package, resubmit `https://bloodofdawnwalker.cc/sitemap-index.xml`, request indexing for the homepage, `/gone-gold/`, `/30-days/`, `/character-creation/`, and `/blood-hunger/`, then wait 5–7 days before another title/snippet rewrite.
