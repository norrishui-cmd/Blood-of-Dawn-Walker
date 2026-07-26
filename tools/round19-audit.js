const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const routes = [
  "after-30-days", "four-direction-combat", "block-stamina-cost", "shadowstep",
  "wall-walking", "stealth-feeding", "infamy-system", "blood-convoys",
  "blacksmith-choice-consequence", "kill-npc-content-loss", "coen", "coen-family",
  "anca", "bakir", "brencis", "vrakhiri-lore", "dynamic-weather",
  "collector-edition", "day-one-vs-collector-edition", "xbox-play-anywhere",
];
const classes = [
  "site-header", "article-main", "article-hero", "article-body", "article-content",
  "article-aside", "verification-box", "related-grid", "faq-list", "site-footer",
];
const errors = [];
const metrics = [];

function stripHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ").trim();
}

function alternateMap(html) {
  return new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((match) => [match[1], match[2]]));
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
    const japanese = (text.match(/[\u3040-\u30ff\u3400-\u9fff]/g) || []).length;
    metrics.push({locale, route, words, japanese});

    for (const className of classes) {
      if (!new RegExp(`class="[^"]*\\b${className}\\b`).test(html)) errors.push(`${locale}/${route} missing .${className}`);
    }
    if (!html.includes("../../styles.css")) errors.push(`${locale}/${route} not using English stylesheet`);
    if (!html.includes('id="page-faq"')) errors.push(`${locale}/${route} missing visible FAQ`);
    if (!html.includes('"@type":"FAQPage"')) errors.push(`${locale}/${route} missing FAQ schema`);
    if (/noindex/i.test((html.match(/<meta[^>]+name="robots"[^>]*>/i) || [""])[0])) errors.push(`${locale}/${route} unexpectedly noindex`);
    if (locale === "de" && words < 340) errors.push(`${locale}/${route} only ${words} visible words`);
    if (locale === "ja" && japanese < 780) errors.push(`${locale}/${route} only ${japanese} Japanese characters`);
    if (locale === "ja" && /Zeit-|Vorschau|Editionen und Systemanforderungen/.test(text)) errors.push(`${locale}/${route} contains German source label`);

    const own = alternateMap(html);
    for (const [lang, folder] of [["en", ""], ["de", "de"], ["ja", "ja"]]) {
      const expected = `${SITE}/${folder ? `${folder}/` : ""}${route}/`;
      if (own.get(lang) !== expected) errors.push(`${locale}/${route} hreflang ${lang} mismatch`);
      const target = path.join(ROOT, folder, route, "index.html");
      if (!fs.existsSync(target)) errors.push(`${locale}/${route} target missing ${folder || "en"}`);
      else if (alternateMap(fs.readFileSync(target, "utf8")).get(locale) !== `${SITE}/${locale}/${route}/`) errors.push(`${folder || "en"}/${route} missing reciprocal ${locale}`);
    }
  }
}

for (const locale of ["de", "ja"]) {
  const sitemap = fs.readFileSync(path.join(ROOT, `sitemap-${locale}.xml`), "utf8");
  const home = fs.readFileSync(path.join(ROOT, locale, "index.html"), "utf8");
  if (!home.includes(`ROUND19-${locale.toUpperCase()}-DEEP-DIVES`)) errors.push(`${locale} homepage missing round 19 cluster`);
  for (const route of routes) {
    if (!sitemap.includes(`<loc>${SITE}/${locale}/${route}/</loc>`)) errors.push(`sitemap-${locale} missing ${route}`);
    if (!home.includes(`./${route}/`)) errors.push(`${locale} homepage missing ${route}`);
  }
}

const styles = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
if (!styles.includes("@media")) errors.push("shared stylesheet has no responsive media rules");
for (const className of classes) {
  if (!styles.includes(`.${className}`)) errors.push(`shared stylesheet missing .${className}`);
}

const result = {
  generatedAt: "2026-07-26",
  round: 19,
  german: {
    addedOrReindexed: routes.length,
    minimumVisibleWords: Math.min(...metrics.filter((item) => item.locale === "de").map((item) => item.words)),
  },
  japanese: {
    addedOrReindexed: routes.length,
    minimumJapaneseCharacters: Math.min(...metrics.filter((item) => item.locale === "ja").map((item) => item.japanese)),
  },
  sharedEnglishComponentContract: classes,
  reciprocalHreflang: ["en", "de", "ja"],
  errors: [...new Set(errors)],
};

fs.writeFileSync(path.join(ROOT, "ROUND_19_DE_JA_VALIDATION.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (result.errors.length) process.exit(1);
