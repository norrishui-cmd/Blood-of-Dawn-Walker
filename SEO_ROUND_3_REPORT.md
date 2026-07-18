# Blood of Dawnwalker SEO Round 3

Date: 2026-07-18

## Outcome

- Existing HTML routes before this round: 223
- HTML routes after this round: 233
- Quality-approved sitemap URLs: 51 → 62
- Repetitive placeholder routes kept at `noindex, follow`: 171
- New source-checked entity pages: 10
- Deeply rewritten cluster hubs: 2
- Visible FAQ coverage: 60+ answers, including 12 new monster/location questions
- Final validation: 0 errors, 0 warnings, 0 broken internal links, 233 unique titles and descriptions

## Fixed

| Issue | File/Route | SEO risk | Action | Priority |
|---|---|---|---|---|
| Official bestiary had no indexable entity coverage | `/blood-guards/`, `/kobolds/`, `/ancient-undead/`, `/psoglavs/` | Publishers and competitors could own named-monster searches | Added primary-source entity pages with direct answers, lore, habitat/tactics boundaries, FAQ schema, and related links | High |
| Vrakhiri terminology was fragmented | `/vrakhiri/`, `/xanthe/`, `/ambrus/` | Entity ambiguity and weak character/faction topical authority | Added distinct faction and character intents; separated vrakhiri from Blood Guards, murohni, and corrupted animals | High |
| Named locations existed only in broad world copy | `/svartrau/`, `/howling-keep/`, `/shrikes-crag/` | Missed location and lore long tails | Added source-checked location pages without inventing map markers, rewards, or quest routes | High |
| Enemy hub was a repetitive placeholder | `/enemy-types/` | Thin hub could not support bestiary entities | Rebuilt as an indexable bestiary hub and restored it to sitemap eligibility | Critical |
| Vale Sangora page lacked an entity structure | `/vale-sangora/` | Weak internal linking for location cluster | Rewrote around Svartrau, Tantari Woods, Howling Keep, Shrike's Crag, biomes, and exploration | High |
| FAQ did not cover new official lore queries | `/faq/` | Missed question-format long tails and user navigation | Added 12 concise monster, vampire, and location answers with deep links | Growth |
| Homepage did not expose the world/entity cluster | `/` | New pages would receive weak internal authority | Added bestiary, locations, and vrakhiri cards to the primary guide grid | High |
| Guide index linked all noindex placeholders | `/guide-index/` | Crawl paths continued to emphasize low-value routes | Rebuilt the index automatically from quality-approved canonical URLs only | Critical |
| Quality artifacts used the previous round date | discovery files and reports | Stale lastmod/feed signals | Updated sitemap index, Atom feed, quality report, and validation date to 2026-07-18 | Medium |

## New Pages

1. `/blood-guards/`
2. `/kobolds/`
3. `/ancient-undead/`
4. `/psoglavs/`
5. `/vrakhiri/`
6. `/svartrau/`
7. `/howling-keep/`
8. `/shrikes-crag/`
9. `/xanthe/`
10. `/ambrus/`

## Rewritten Hubs

- `/enemy-types/`
- `/vale-sangora/`

## Reproducible Build and Validation

Run these scripts in order:

1. `node scripts/build-round-3-pages.mjs`
2. `node scripts/extend-round-3-pages.mjs`
3. `node scripts/expand-round-3-faq.mjs`
4. `node scripts/update-round-3-home.mjs`
5. `node scripts/seo-quality-gate.mjs`
6. `node scripts/validate-round-3.mjs`

The final machine-readable checks are in `SEO_QUALITY_GATE_REPORT.json` and `SEO_ROUND_3_VALIDATION.json`.

## Next Highest-Leverage Actions

| Issue | File/Route | SEO risk | Recommended next action | Priority |
|---|---|---|---|---|
| Named creatures lack enough disclosed facts for standalone pages | uriashi, likhos, tatzelwurms, murohni | Publishing now would recreate thin pages | Keep them on `/enemy-types/`; promote only after an official bulletin or release-build evidence supplies concrete answers | High |
| 171 placeholders remain accessible | Multiple noindex routes | Some crawl activity can still reach old URLs | Upgrade one evidence cluster at a time; never mass-restore sitemap inclusion | High |
| No GSC query export is available | Whole site | Next priorities cannot use actual impressions or CTR | After deployment, compare 7-day and 28-day queries for the new entity cluster | High |

## Deployment Check

Deploy the complete package, resubmit `https://bloodofdawnwalker.cc/sitemap-index.xml`, then request indexing for `/enemy-types/`, `/vrakhiri/`, `/blood-guards/`, `/svartrau/`, and `/vale-sangora/`. Wait 5–7 days before changing their titles or snippets unless an official fact changes.
