const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const generator = fs.readFileSync(path.join(ROOT, "tools", "round22-de-ja.js"), "utf8");
const newsBlock = generator.match(/const news = \[([\s\S]*?)\n\];\n\nconst faq =/)[1];
const faqBlock = generator.match(/const faq = \[([\s\S]*?)\n\];\n\nfunction esc/)[1];
const newsSlugs = [...newsBlock.matchAll(/\["[^"]+","([^"]+)"/g)].map((match) => match[1]);
const faqSlugs = [...faqBlock.matchAll(/\["[^"]+","([^"]+)"/g)].map((match) => match[1]);
const errors = [];
const metrics = [];
const requiredClasses = [
  "site-header", "article-main", "article-hero", "article-body", "article-content",
  "article-aside", "verification-box", "related-grid", "faq-list", "site-footer",
];

function stripHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ").trim();
}
function alternates(html) {
  return new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map((match) => [match[1], match[2]]));
}
function checkPage(locale, type, slug) {
  const file = path.join(ROOT, locale, type, slug, "index.html");
  if (!fs.existsSync(file)) {
    errors.push(`missing ${locale}/${type}/${slug}`);
    return;
  }
  const html = fs.readFileSync(file, "utf8");
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  const japanese = (text.match(/[\u3040-\u30ff\u3400-\u9fff]/g) || []).length;
  metrics.push({ locale, type, slug, words, japanese });
  for (const className of requiredClasses) {
    if (!new RegExp(`class="[^"]*\\b${className}\\b`).test(html)) errors.push(`${locale}/${type}/${slug} missing .${className}`);
  }
  if (!html.includes("../../../styles.css")) errors.push(`${locale}/${type}/${slug} does not reuse shared English CSS`);
  if (!html.includes('id="page-faq"')) errors.push(`${locale}/${type}/${slug} missing visible FAQ`);
  if (!html.includes("LANG-DROPDOWN:START")) errors.push(`${locale}/${type}/${slug} missing language dropdown`);
  if (/noindex/i.test((html.match(/<meta[^>]+name="robots"[^>]*>/i) || [""])[0])) errors.push(`${locale}/${type}/${slug} unexpectedly noindex`);
  if (locale === "de" && words < 300) errors.push(`${locale}/${type}/${slug} only ${words} visible words`);
  if (locale === "ja" && japanese < 650) errors.push(`${locale}/${type}/${slug} only ${japanese} Japanese characters`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${locale}/${type}/${slug} invalid JSON-LD: ${error.message}`); }
  }
  const own = alternates(html);
  const expected = {
    en: `${SITE}/${type}/${slug}/`,
    de: `${SITE}/de/${type}/${slug}/`,
    ja: `${SITE}/ja/${type}/${slug}/`,
    "x-default": `${SITE}/${type}/${slug}/`,
  };
  for (const [language, url] of Object.entries(expected)) {
    if (own.get(language) !== url) errors.push(`${locale}/${type}/${slug} hreflang ${language} mismatch`);
  }
  const english = fs.readFileSync(path.join(ROOT, type, slug, "index.html"), "utf8");
  const EnglishAlternates = alternates(english);
  if (EnglishAlternates.get(locale) !== `${SITE}/${locale}/${type}/${slug}/`) {
    errors.push(`English ${type}/${slug} missing reciprocal ${locale}`);
  }
  const sitemap = fs.readFileSync(path.join(ROOT, `sitemap-${locale}.xml`), "utf8");
  if (!sitemap.includes(`<loc>${SITE}/${locale}/${type}/${slug}/</loc>`)) {
    errors.push(`sitemap-${locale} missing ${type}/${slug}`);
  }
}

if (newsSlugs.length !== 20) errors.push(`expected 20 news slugs, got ${newsSlugs.length}`);
if (faqSlugs.length !== 20) errors.push(`expected 20 FAQ slugs, got ${faqSlugs.length}`);
for (const locale of ["de", "ja"]) {
  for (const slug of newsSlugs) checkPage(locale, "news", slug);
  for (const slug of faqSlugs) checkPage(locale, "faq", slug);
  const home = fs.readFileSync(path.join(ROOT, locale, "index.html"), "utf8");
  if (!home.includes(`ROUND22-${locale.toUpperCase()}-NEWS-FAQ:START`)) errors.push(`${locale} homepage missing Round 22 cluster`);
  if (!fs.existsSync(path.join(ROOT, locale, "news", "index.html"))) errors.push(`${locale} news hub missing`);
}
if (!fs.existsSync(path.join(ROOT, "ja", "faq", "index.html"))) errors.push("Japanese FAQ hub missing");

const globalUrls = [...fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (globalUrls.length !== 782) errors.push(`expected 782 global sitemap URLs, got ${globalUrls.length}`);
if (new Set(globalUrls).size !== globalUrls.length) errors.push("duplicate URLs in global sitemap");

const result = {
  generatedAt: "2026-07-29",
  round: 22,
  localizedPages: metrics.length,
  german: {
    news: newsSlugs.length,
    faq: faqSlugs.length,
    minimumVisibleWords: Math.min(...metrics.filter((item) => item.locale === "de").map((item) => item.words)),
  },
  japanese: {
    news: newsSlugs.length,
    faq: faqSlugs.length,
    minimumJapaneseCharacters: Math.min(...metrics.filter((item) => item.locale === "ja").map((item) => item.japanese)),
  },
  localizedHubs: 3,
  globalSitemapUrls: globalUrls.length,
  sharedEnglishComponentContract: requiredClasses,
  reciprocalHreflang: ["en", "de", "ja", "x-default"],
  errors: [...new Set(errors)],
};

fs.writeFileSync(path.join(ROOT, "ROUND_22_DE_JA_VALIDATION.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (result.errors.length) process.exit(1);
