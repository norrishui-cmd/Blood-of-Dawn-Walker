# Blood of Dawnwalker Guide GitHub Package

This is an English static site package for GitHub Pages. It includes `sitemap.xml` and `robots.txt` so the site can be submitted to Google Search Console immediately after deployment.

## Files

- `index.html`: English guide site homepage
- `release-date/`: Release date and launch status page
- `platforms/`: Platform availability page
- `system-requirements/`: PC requirements tracker
- `beginner-guide/`: First-hours guide framework
- `day-night-system/`: Time mechanics guide
- `builds/`: Beginner build templates
- `bosses/`: Boss guide and weakness tracker
- `quests/`: Quest and choice tracker
- `gameplay/`: Open-world gameplay overview
- `combat/`: Combat and boss preparation guide
- `vampire-powers/`: Vampire ability tracker
- `world-map/`: Map, regions, and exploration tracker
- `characters/`: Character, NPC, and faction tracker
- `endings/`: Ending branches and choice tracker
- `preorder/`: Editions and preorder tracker
- `achievements/`: Trophy and completion framework
- `faq/`: High-intent question and answer page
- `story/`: Spoiler-light story hub
- `coen/`: Protagonist profile and guide hub
- `vale-sangora/`: Region and map hub
- `30-days/`: Time-limit and route planning page
- `trailers/`: Official media and trailer breakdown hub
- `game-pass/`: Xbox Game Pass availability tracker
- `updates/`: Site changelog and news update page
- `sources/`: Editorial policy and source transparency page
- `editions/`: Edition and buyer comparison framework
- `choices-consequences/`: Decision and outcome tracker
- `human-vampire/`: Human and vampire form planning guide
- `narrative-sandbox/`: Route structure and quest freedom guide
- `romance/`: Cautious relationship and romance tracker
- `skills/`: Ability tree and progression framework
- `stealth-feeding/`: Stealth, feeding, and consequence tracker
- `brencis/`: Character and encounter tracker
- `lunka/`: Story character and quest tracker
- `styles.css`: Site styling
- `app.js`: Guide search, category filters, and saved checklist state
- `sitemap.xml`: Sitemap for Google Search Console
- `robots.txt`: Crawl rules with sitemap declaration
- `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`: Original non-infringing site icons
- `hero-art.svg`: Original non-infringing dark fantasy hero background
- `404.html`: GitHub Pages 404 page
- `.nojekyll`: Prevents GitHub Pages from processing the site with Jekyll
- `site.webmanifest`: Basic web app metadata
- `configure-site-url.ps1`: Replaces the placeholder site URL with your live URL

## Deploy To GitHub Pages

1. Create a GitHub repository, for example `blood-dawnwalker-guide`.
2. Upload all files from this package to the repository root.
3. Open repository `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select `main` and `/root`, then save.
6. Wait for GitHub Pages to publish the site.

This package is configured for your custom domain:

```text
https://bloodofdawnwalker.cc/
```

## Site URL

The production URL has already been written into:

- `index.html` canonical, Open Graph URL, and structured data
- `sitemap.xml`
- `robots.txt`

## Google Search Console

1. Open Google Search Console.
2. Add a URL-prefix property using your GitHub Pages URL or custom domain.
3. Complete verification with the method GSC provides.
4. Go to `Sitemaps` and submit:

```text
sitemap.xml
```

Submit this sitemap URL:

```text
https://bloodofdawnwalker.cc/sitemap.xml
```

## Content Notes

The Blood of Dawnwalker is still pre-release. This site marks untested content as `TBA`, `Needs Testing`, or `Template` to avoid misleading players. After launch, add dedicated pages for quests, bosses, builds, maps, achievements, and patches, then include those URLs in `sitemap.xml`.
