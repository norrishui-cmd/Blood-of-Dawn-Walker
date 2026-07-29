const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const routes = [
  "activation-charges", "parry", "three-skill-trees", "fast-travel",
  "no-main-side-quest-split", "enemy-types", "hands-on-preview", "demo",
  "beta-status", "father-florin", "skender-dragosti", "xanthe-fight-outcomes",
  "bows-and-crossbows", "unarmed-combat", "sangoran-wayfarers-armor",
  "camera-combat-improvements",
];
const hubs = ["gameplay-guides", "walkthrough-guides", "story-guides", "release-guides", "technical-guides", "updates-guides"];
const articleClasses = [
  "site-header", "article-main", "article-hero", "article-body", "article-content",
  "article-aside", "verification-box", "related-grid", "faq-list", "site-footer",
];
const hubClasses = ["site-header", "hero", "hero-media", "hero-overlay", "hero-content", "hero-actions", "fact-strip", "research", "band", "section-heading", "guide-grid", "guide-card", "site-footer"];
const errors = [];
const metrics = [];

function stripHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
}

function alternateMap(html) {
  return new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
}

for (const locale of ["de", "ja"]) {
  for (const route of routes) {
    const file = path.join(ROOT, locale, route, "index.html");
    if (!fs.existsSync(file)) {
      errors.push(`missing ${locale}/${route}`);
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    const text = stripHtml(html);
    const words = text.split(/\s+/).filter(Boolean).length;
    const letters = (text.match(/[\p{L}\p{N}]/gu) || []).length;
    const japanese = (text.match(/[\u3040-\u30ff\u3400-\u9fff]/g) || []).length;
    metrics.push({locale, route, words, letters, japanese});

    for (const className of articleClasses) {
      if (!new RegExp(`class="[^"]*\\b${className}\\b`).test(html)) errors.push(`${locale}/${route} missing .${className}`);
    }
    if (!html.includes("../../styles.css")) errors.push(`${locale}/${route} does not share English stylesheet`);
    if (!html.includes('id="page-faq"')) errors.push(`${locale}/${route} missing visible FAQ`);
    if (!html.includes('"@type":"FAQPage"')) errors.push(`${locale}/${route} missing FAQ schema`);
    if (!html.includes(`href="${SITE}/${locale}/${route}/"`)) errors.push(`${locale}/${route} canonical missing`);
    if (locale === "de" && words < 230) errors.push(`${locale}/${route} only ${words} visible words`);
    if (locale === "ja" && japanese < 620) errors.push(`${locale}/${route} only ${japanese} Japanese characters`);

    const ownAlternates = alternateMap(html);
    for (const [lang, targetLocale] of [["en", ""], ["de", "de"], ["ja", "ja"]]) {
      const expected = `${SITE}/${targetLocale ? `${targetLocale}/` : ""}${route}/`;
      if (ownAlternates.get(lang) !== expected) errors.push(`${locale}/${route} hreflang ${lang} mismatch`);
      const targetFile = path.join(ROOT, targetLocale, route, "index.html");
      if (!fs.existsSync(targetFile)) errors.push(`${locale}/${route} alternate target missing ${targetLocale || "en"}`);
      else if (alternateMap(fs.readFileSync(targetFile, "utf8")).get(locale) !== `${SITE}/${locale}/${route}/`) {
        errors.push(`${targetLocale || "en"}/${route} missing reciprocal ${locale}`);
      }
    }
  }
}

for (const route of hubs) {
  const file = path.join(ROOT, "ja", route, "index.html");
  const html = fs.readFileSync(file, "utf8");
  for (const className of hubClasses) {
    if (!new RegExp(`class="[^"]*\\b${className}\\b`).test(html)) errors.push(`ja/${route} missing .${className}`);
  }
  if (!html.includes("../../styles.css")) errors.push(`ja/${route} does not share English stylesheet`);
}

for (const locale of ["de", "ja"]) {
  const home = fs.readFileSync(path.join(ROOT, locale, "index.html"), "utf8");
  if (!home.includes(`ROUND18-${locale.toUpperCase()}-DEEP-DIVES`)) errors.push(`${locale} home missing deep-dive cluster`);
  for (const route of routes) {
    if (!home.includes(`./${route}/`)) errors.push(`${locale} home missing ${route} entry`);
  }
}

for (const [locale, expected] of [["de", 16], ["ja", 22]]) {
  const xml = fs.readFileSync(path.join(ROOT, `sitemap-${locale}.xml`), "utf8");
  let found = 0;
  for (const route of [...routes, ...(locale === "ja" ? hubs : [])]) {
    if (!xml.includes(`<loc>${SITE}/${locale}/${route}/</loc>`)) errors.push(`sitemap-${locale} missing ${route}`);
    else found += 1;
  }
  if (found !== expected) errors.push(`sitemap-${locale} expected ${expected} round routes, found ${found}`);
}

const styles = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
if (!styles.includes("@media")) errors.push("shared stylesheet lacks responsive media rules");
for (const className of [...new Set([...articleClasses, ...hubClasses])].filter((item) => item !== "research")) {
  if (!styles.includes(`.${className}`)) errors.push(`shared stylesheet missing .${className}`);
}

const result = {
  generatedAt: "2026-07-26",
  round: 18,
  german: {
    upgradedPages: 15,
    newPages: 1,
    checkedPages: metrics.filter((m) => m.locale === "de").length,
    minimumVisibleWords: Math.min(...metrics.filter((m) => m.locale === "de").map((m) => m.words)),
  },
  japanese: {
    newDetailPages: 16,
    newHubPages: 6,
    checkedDetailPages: metrics.filter((m) => m.locale === "ja").length,
    minimumJapaneseCharacters: Math.min(...metrics.filter((m) => m.locale === "ja").map((m) => m.japanese)),
  },
  sharedEnglishComponentContract: {articleClasses, hubClasses, sharedStylesheet: true, responsiveRules: true},
  reciprocalHreflang: ["en", "de", "ja"],
  errors: [...new Set(errors)],
};

fs.writeFileSync(path.join(ROOT, "ROUND_18_DE_JA_VALIDATION.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (result.errors.length) process.exit(1);
