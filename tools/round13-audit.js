const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DOMAIN = "https://bloodofdawnwalker.cc";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "templates" ? [] : walk(full);
    return [full];
  });
}

function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "ROUND_13_URL_MANIFEST.json"), "utf8"));
const newRoutes = [...manifest.newHubs.map((x) => x.route), ...manifest.newLeaves.map((x) => x.route)];
const errors = [];
const warnings = [];
const seen = { title: new Map(), description: new Map(), canonical: new Map() };
let minWords = Infinity;

for (const route of newRoutes) {
  const file = path.join(ROOT, route.slice(1), "index.html");
  if (!fs.existsSync(file)) {
    errors.push(`missing file ${route}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
  const description = (html.match(/<meta name="description" content="([^"]+)"/i) || [])[1];
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/i) || [])[1];
  const h1 = (html.match(/<h1>([\s\S]*?)<\/h1>/i) || [])[1];
  const words = textContent(html).split(/\s+/).filter(Boolean).length;
  minWords = Math.min(minWords, words);
  if (!title || !description || !canonical || !h1) errors.push(`metadata missing ${route}`);
  if (!/index, follow/.test(html) || /noindex/i.test(html)) errors.push(`index state ${route}`);
  if (!html.includes("google-adsense-account") || !html.includes("adsbygoogle.js")) errors.push(`adsense missing ${route}`);
  const isHub = manifest.newHubs.some((x) => x.route === route);
  if (!html.includes("application/ld+json")) errors.push(`schema missing ${route}`);
  if (isHub && !html.includes('"ItemList"')) errors.push(`hub ItemList schema missing ${route}`);
  if (!isHub && !html.includes('"FAQPage"')) errors.push(`leaf FAQ schema missing ${route}`);
  if (!html.includes("<h2>Source") && !html.includes("Evidence and update policy")) errors.push(`source section missing ${route}`);
  if (words < 360) errors.push(`thin visible text ${route}: ${words}`);
  for (const [key, value] of Object.entries({ title, description, canonical })) {
    if (seen[key].has(value)) errors.push(`duplicate ${key}: ${route} and ${seen[key].get(value)}`);
    else seen[key].set(value, route);
  }
  if (canonical !== `${DOMAIN}${route}`) errors.push(`canonical mismatch ${route}`);
}

function sitemapUrls(name) {
  const xml = fs.readFileSync(path.join(ROOT, name), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
}

const enUrls = sitemapUrls("sitemap-en.xml");
const allUrls = sitemapUrls("sitemap.xml");
if (enUrls.length !== 291) errors.push(`English sitemap count ${enUrls.length}, expected 291`);
if (allUrls.length !== 393) errors.push(`All sitemap count ${allUrls.length}, expected 393`);
for (const route of newRoutes) {
  const url = `${DOMAIN}${route}`;
  if (!enUrls.includes(url) || !allUrls.includes(url)) errors.push(`sitemap missing ${route}`);
}

const htmlFiles = walk(ROOT).filter((f) => f.endsWith(".html"));
const routeFiles = new Map();
for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file);
  if (rel === "index.html") routeFiles.set("/", file);
  else if (rel.endsWith(`${path.sep}index.html`)) routeFiles.set(`/${rel.slice(0, -11).split(path.sep).join("/")}/`, file);
}

let brokenLinks = 0;
for (const route of newRoutes) {
  const file = routeFiles.get(route);
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|#)/.test(href) || /\.(css|ico|png|svg|xml|json|webmanifest)$/.test(href)) continue;
    const resolved = new URL(href, `${DOMAIN}${route}`).pathname;
    const normalized = resolved.endsWith("/") ? resolved : `${resolved}/`;
    if (!routeFiles.has(normalized)) {
      brokenLinks += 1;
      errors.push(`broken internal link ${route} -> ${href}`);
    }
  }
}

// Templates are intentionally excluded from this audit; the live noindex baseline is 166.
const noindexBefore = 165;
const noindexNow = htmlFiles.filter((file) => /<meta[^>]+name="robots"[^>]+noindex/i.test(fs.readFileSync(file, "utf8"))).length;
if (noindexNow !== noindexBefore) warnings.push(`noindex count changed from ${noindexBefore} to ${noindexNow}`);

const result = {
  generatedAt: "2026-07-25",
  htmlFilesChecked: htmlFiles.length,
  round13: { leaves: manifest.newLeaves.length, hubs: manifest.newHubs.length, total: newRoutes.length },
  sitemap: { en: enUrls.length, total: allUrls.length },
  minimumVisibleWordsInNewPages: minWords,
  uniqueNewTitles: seen.title.size,
  uniqueNewDescriptions: seen.description.size,
  uniqueNewCanonicals: seen.canonical.size,
  brokenInternalLinks: brokenLinks,
  noindexPages: noindexNow,
  warnings,
  errors,
};
fs.writeFileSync(path.join(ROOT, "ROUND_13_VALIDATION.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
