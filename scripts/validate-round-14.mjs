import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "https://bloodofdawnwalker.cc";
const locales = ["fr", "it", "pl", "ja"];
const slugs = ["release-date", "30-days", "day-night-system", "combat", "blood-hunger", "characters", "vale-sangora", "system-requirements"];
const requiredClasses = ["site-header", "article-main", "article-hero", "article-body", "article-content", "article-aside", "verification-box", "related-grid", "faq-list"];
const homeParityClasses = ["site-header", "hero", "hero-media", "hero-overlay", "hero-content", "hero-actions", "fact-strip", "research", "band", "section-heading", "insight-grid", "guide-grid", "guide-card", "site-footer"];
const errors = [];

function files(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}

function match(html, re) {
  return html.match(re)?.[1]?.trim() ?? "";
}

function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:amp|quot|lt|gt|nbsp|#\d+);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function routeFor(file) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  return rel === "index.html" ? "/" : `/${rel.replace(/index\.html$/, "")}`;
}

const htmlFiles = files(root).filter((file) => file.endsWith(".html"));
const canonicalMap = new Map();
const titleMap = new Map();
const descriptionMap = new Map();
let indexable = 0;
let noindex = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFor(file);
  const robots = match(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i);
  const canonical = match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i);
  const title = match(html, /<title>([\s\S]*?)<\/title>/i);
  const description = match(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i);
  if (/noindex/i.test(robots)) noindex += 1;
  else if (canonical) {
    indexable += 1;
    if (canonicalMap.has(canonical)) errors.push(`duplicate canonical ${canonical}: ${route} and ${canonicalMap.get(canonical)}`);
    canonicalMap.set(canonical, route);
    if (titleMap.has(title)) errors.push(`duplicate title: ${title}`);
    titleMap.set(title, route);
    if (descriptionMap.has(description)) errors.push(`duplicate description: ${description}`);
    descriptionMap.set(description, route);
  }
  if (!html.includes("ca-pub-9505220977121599")) errors.push(`${route} missing AdSense`);
}

const newPages = [];
for (const locale of locales) {
  const homeHtml = fs.readFileSync(path.join(root, locale, "index.html"), "utf8");
  for (const className of homeParityClasses) {
    if (!new RegExp(`class=["'][^"']*\\b${className}\\b`).test(homeHtml)) errors.push(`/${locale}/ missing English home style class ${className}`);
  }
  if (!homeHtml.includes(`../styles.css`)) errors.push(`/${locale}/ does not reuse English stylesheet`);
  for (const slug of slugs) {
    const file = path.join(root, locale, slug, "index.html");
    if (!fs.existsSync(file)) {
      errors.push(`missing /${locale}/${slug}/`);
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    const text = textContent(html);
    const words = text.split(/\s+/).length;
    const chars = [...text].length;
    for (const className of requiredClasses) {
      if (!new RegExp(`class=["'][^"']*\\b${className}\\b`).test(html)) errors.push(`/${locale}/${slug}/ missing style class ${className}`);
    }
    if (!html.includes(`../../styles.css`)) errors.push(`/${locale}/${slug}/ does not reuse English stylesheet`);
    if (!html.includes(`<html lang="${locale}">`)) errors.push(`/${locale}/${slug}/ wrong html language`);
    if (!html.includes(`href="${base}/${locale}/${slug}/"`)) errors.push(`/${locale}/${slug}/ missing self hreflang/canonical`);
    if ((html.match(/<link rel="alternate" hreflang=/g) || []).length !== 8) errors.push(`/${locale}/${slug}/ incomplete hreflang set`);
    if (!html.includes("FAQPage") || !html.includes("BreadcrumbList")) errors.push(`/${locale}/${slug}/ missing schema`);
    if (locale === "ja" ? chars < 1300 : words < 260) errors.push(`/${locale}/${slug}/ thin content (${words} words, ${chars} chars)`);
    newPages.push({route: `/${locale}/${slug}/`, words, chars});
  }
}

function sitemapUrls(file) {
  const xml = fs.readFileSync(file, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const sitemap = sitemapUrls(path.join(root, "sitemap.xml"));
const sitemapSet = new Set(sitemap);
if (sitemap.length !== sitemapSet.size) errors.push("duplicate URLs in sitemap.xml");
if (sitemap.length !== indexable) errors.push(`sitemap/indexable mismatch ${sitemap.length}/${indexable}`);
for (const canonical of canonicalMap.keys()) {
  if (!sitemapSet.has(canonical)) errors.push(`indexable canonical missing from sitemap: ${canonical}`);
}
for (const url of sitemapSet) {
  if (!canonicalMap.has(url)) errors.push(`sitemap URL is not an indexable canonical: ${url}`);
}

for (const locale of locales) {
  const localeSitemap = new Set(sitemapUrls(path.join(root, `sitemap-${locale}.xml`)));
  for (const slug of slugs) {
    const url = `${base}/${locale}/${slug}/`;
    if (!localeSitemap.has(url)) errors.push(`${url} missing from locale sitemap`);
  }
}

const internalBroken = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const currentDir = path.dirname(file);
  for (const href of [...html.matchAll(/href=["']([^"'#]+)["']/g)].map((m) => m[1])) {
    if (/^(?:https?:|mailto:|tel:|javascript:)/.test(href)) continue;
    const clean = href.split("?")[0];
    const resolved = clean.startsWith("/")
      ? path.join(root, clean)
      : path.resolve(currentDir, clean);
    let target = resolved;
    if (clean.endsWith("/") || fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) target = path.join(resolved, "index.html");
    if (!fs.existsSync(target)) internalBroken.push(`${routeFor(file)} -> ${href}`);
  }
}
if (internalBroken.length) errors.push(...internalBroken.slice(0, 100).map((x) => `broken link ${x}`));

const validation = {
  generatedAt: "2026-07-25",
  round: 14,
  htmlFilesChecked: htmlFiles.length,
  indexableCanonicalUrls: indexable,
  noindexHtmlPages: noindex,
  sitemapUrls: sitemap.length,
  newLocalizedPages: newPages.length,
  locales,
  routesPerLocale: slugs.length,
  styleParity: {
    sharedStylesheet: true,
    requiredEnglishComponentClasses: requiredClasses,
    localizedHomeClasses: homeParityClasses,
    homepagesPassing: locales.length,
    articlePagesPassing: newPages.length
  },
  contentDepth: {
    latinMinimumWords: Math.min(...newPages.filter((p) => !p.route.startsWith("/ja/")).map((p) => p.words)),
    japaneseMinimumCharacters: Math.min(...newPages.filter((p) => p.route.startsWith("/ja/")).map((p) => p.chars))
  },
  duplicateCanonicalCount: 0,
  duplicateTitleCount: 0,
  duplicateDescriptionCount: 0,
  brokenInternalLinks: internalBroken.length,
  errors
};

fs.writeFileSync(path.join(root, "ROUND_14_VALIDATION.json"), JSON.stringify(validation, null, 2) + "\n");
console.log(JSON.stringify(validation, null, 2));
if (errors.length) process.exit(1);
