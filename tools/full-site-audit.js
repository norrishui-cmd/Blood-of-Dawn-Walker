const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DOMAIN = "https://bloodofdawnwalker.cc";
const errors = [];
const warnings = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function liveRoute(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -11)}/`;
  if (rel === "404.html") return "/404.html";
  return null;
}

function one(html, regex) {
  return (html.match(regex) || [])[1] || "";
}

function metaDescription(html) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((value) => /name\s*=\s*["']description["']/i.test(value));
  return tag ? one(tag, /content\s*=\s*["']([^"']*)["']/i) : "";
}

const allHtml = walk(ROOT).filter((file) => file.endsWith(".html"));
const liveHtml = allHtml.filter((file) => !file.includes(`${path.sep}templates${path.sep}`));
const routes = new Map(liveHtml.map((file) => [liveRoute(file), file]).filter(([route]) => route));
const values = { title: new Map(), description: new Map(), canonical: new Map() };
let jsonLdBlocks = 0;
let indexableHtml = 0;
let noindexHtml = 0;
let adsenseFiles = 0;
let dropdownFiles = 0;

for (const [route, file] of routes) {
  const html = fs.readFileSync(file, "utf8");
  const is404 = route === "/404.html";
  const noindex = /<meta[^>]+name="robots"[^>]+noindex/i.test(html);
  if (noindex) noindexHtml += 1;
  else if (!is404) indexableHtml += 1;
  if (html.includes("google-adsense-account") && html.includes("adsbygoogle.js")) adsenseFiles += 1;
  else errors.push(`AdSense missing: ${route}`);
  if (html.includes("LANG-DROPDOWN:START")) dropdownFiles += 1;
  else errors.push(`language dropdown missing: ${route}`);

  const metadata = {
    title: one(html, /<title>([\s\S]*?)<\/title>/i),
    description: metaDescription(html),
    canonical: one(html, /<link rel="canonical" href="([^"]*)"/i),
  };
  if (!is404) {
    for (const [kind, value] of Object.entries(metadata)) {
      if (!value) errors.push(`${kind} missing: ${route}`);
      else if (values[kind].has(value)) errors.push(`duplicate ${kind}: ${route} and ${values[kind].get(value)}`);
      else values[kind].set(value, route);
    }
    const expectedCanonical = `${DOMAIN}${route}`;
    if (metadata.canonical && metadata.canonical !== expectedCanonical) errors.push(`canonical mismatch: ${route}`);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    jsonLdBlocks += 1;
    try { JSON.parse(match[1]); } catch (error) { errors.push(`invalid JSON-LD: ${route}: ${error.message}`); }
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|#|javascript:)/.test(href)) continue;
    if (/\.(css|ico|png|svg|xml|json|webmanifest|txt)(?:#.*)?$/.test(href)) continue;
    const resolved = new URL(href, `${DOMAIN}${route}`).pathname;
    const candidate = resolved.endsWith("/") || resolved.endsWith(".html") ? resolved : `${resolved}/`;
    if (!routes.has(candidate)) errors.push(`broken internal link: ${route} -> ${href}`);
  }

  for (const match of html.matchAll(/<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g)) {
    const target = new URL(match[1]).pathname;
    const candidate = target.endsWith("/") ? target : `${target}/`;
    if (!routes.has(candidate)) errors.push(`broken hreflang: ${route} -> ${match[1]}`);
  }
}

function sitemap(name) {
  const xml = fs.readFileSync(path.join(ROOT, name), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const sitemapAll = sitemap("sitemap.xml");
const sitemapEn = sitemap("sitemap-en.xml");
const duplicateSitemap = sitemapAll.filter((url, index) => sitemapAll.indexOf(url) !== index);
if (duplicateSitemap.length) errors.push(`duplicate sitemap URLs: ${duplicateSitemap.join(", ")}`);
for (const url of sitemapAll) {
  const route = new URL(url).pathname;
  const file = routes.get(route);
  if (!file) {
    errors.push(`sitemap route missing: ${route}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  if (/name="robots" content="noindex/i.test(html)) errors.push(`sitemap/noindex conflict: ${route}`);
  const canonical = one(html, /<link rel="canonical" href="([^"]*)"/i);
  if (canonical !== url) errors.push(`sitemap/canonical conflict: ${route}`);
}

const officialLanguageHomes = ["/", "/de/", "/es/", "/fr/", "/it/", "/pl/", "/zh-hans/", "/zh-hant/", "/ja/", "/ko/", "/cs/", "/hu/", "/pt-br/", "/es-419/", "/tr/"];
for (const route of officialLanguageHomes) {
  const html = fs.readFileSync(routes.get(route), "utf8");
  const alternates = [...html.matchAll(/hreflang="([^"]+)"/g)].map((x) => x[1]);
  if (alternates.length !== 16) errors.push(`language-home hreflang count ${route}: ${alternates.length}`);
}

const result = {
  generatedAt: "2026-07-25",
  liveHtmlFiles: routes.size,
  indexableHtml,
  noindexHtml,
  sitemap: { en: sitemapEn.length, allLanguages: sitemapAll.length },
  uniqueMetadata: {
    titles: values.title.size,
    descriptions: values.description.size,
    canonicals: values.canonical.size,
  },
  adsenseFiles,
  languageDropdownFiles: dropdownFiles,
  jsonLdBlocks,
  officialLanguageHomes: officialLanguageHomes.length,
  errors: [...new Set(errors)],
  warnings: [...new Set(warnings)],
};

fs.writeFileSync(path.join(ROOT, "FULL_SITE_VALIDATION_ROUND_13.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (result.errors.length) process.exit(1);
