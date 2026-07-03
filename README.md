# Blood of Dawnwalker Guide GitHub Package

This is an English static site package for GitHub Pages. It includes `sitemap.xml` and `robots.txt` so the site can be submitted to Google Search Console immediately after deployment.

## Files

- `index.html`: English guide site homepage
- `styles.css`: Site styling
- `app.js`: Guide search, category filters, and saved checklist state
- `sitemap.xml`: Sitemap for Google Search Console
- `robots.txt`: Crawl rules with sitemap declaration
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
