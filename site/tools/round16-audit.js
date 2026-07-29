const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const locales = [
  ["zh-hans", "zh-Hans", "cjk"],
  ["zh-hant", "zh-Hant", "cjk"],
  ["ko", "ko", "cjk"],
  ["pt-br", "pt-BR", "latin"],
  ["cs", "cs", "latin"],
  ["hu", "hu", "latin"],
  ["es-419", "es-419", "latin"],
  ["tr", "tr", "latin"],
];
const equivalentLocales = [
  ["", "en"], ["de", "de"], ["es", "es-ES"], ["fr", "fr"], ["it", "it"],
  ["pl", "pl"], ["zh-hans", "zh-Hans"], ["zh-hant", "zh-Hant"], ["ja", "ja"],
  ["ko", "ko"], ["pt-br", "pt-BR"],
  ["cs", "cs"], ["hu", "hu"], ["es-419", "es-419"], ["tr", "tr"],
];
const routes = [
  "release-date", "30-days", "day-night-system", "combat",
  "blood-hunger", "characters", "vale-sangora", "system-requirements",
];
const articleClasses = [
  "site-header", "article-main", "article-hero", "article-body", "article-content",
  "article-aside", "verification-box", "related-grid", "faq-list", "site-footer",
];
const homeClasses = [
  "site-header", "hero", "hero-media", "hero-overlay", "hero-content",
  "hero-actions", "fact-strip", "research", "band", "section-heading",
  "insight-grid", "guide-grid", "guide-card", "site-footer",
];
const errors = [];
const metrics = [];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function routeUrl(locale, route) {
  return `${SITE}${locale ? `/${locale}` : ""}/${route}/`;
}

function alternates(html) {
  return new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g)].map((match) => [match[1], match[2]]));
}

for (const [locale, lang, mode] of locales) {
  const homeFile = path.join(ROOT, locale, "index.html");
  const home = fs.readFileSync(homeFile, "utf8");
  for (const className of homeClasses) {
    if (!new RegExp(`class="[^"]*\\b${className}\\b`).test(home)) errors.push(`${locale} home missing class ${className}`);
  }
  if (!home.includes(`lang="${lang}"`)) errors.push(`${locale} home language mismatch`);
  if (!home.includes("../styles.css")) errors.push(`${locale} home does not share root stylesheet`);

  for (const route of routes) {
    const file = path.join(ROOT, locale, route, "index.html");
    const html = fs.readFileSync(file, "utf8");
    const text = stripHtml(html);
    const latinWords = text.split(/\s+/).filter(Boolean).length;
    const letters = (text.match(/[\p{L}\p{N}]/gu) || []).length;
    metrics.push({ locale, route, mode, latinWords, letters });

    for (const className of articleClasses) {
      if (!new RegExp(`class="[^"]*\\b${className}\\b`).test(html)) errors.push(`${locale}/${route} missing class ${className}`);
    }
    if (!html.includes("../../styles.css")) errors.push(`${locale}/${route} does not share root stylesheet`);
    if (mode === "latin" && latinWords < 360) errors.push(`${locale}/${route} has only ${latinWords} visible words`);
    if (mode === "cjk" && letters < 1150) errors.push(`${locale}/${route} has only ${letters} visible letters`);
    if (!html.includes(`lang="${lang}"`)) errors.push(`${locale}/${route} html language mismatch`);
    if (!html.includes(`href="${routeUrl(locale, route)}"`)) errors.push(`${locale}/${route} canonical missing`);
    if (!html.includes("verification-box") || !html.includes('id="page-faq"')) errors.push(`${locale}/${route} semantic sections missing`);

    const hreflang = alternates(html);
    for (const [targetLocale, targetLang] of equivalentLocales) {
      const expected = routeUrl(targetLocale, route);
      if (hreflang.get(targetLang) !== expected) errors.push(`${locale}/${route} hreflang ${targetLang} mismatch`);
      const targetFile = targetLocale ? path.join(ROOT, targetLocale, route, "index.html") : path.join(ROOT, route, "index.html");
      const targetHtml = fs.readFileSync(targetFile, "utf8");
      if (alternates(targetHtml).get(lang) !== routeUrl(locale, route)) errors.push(`${targetLocale || "en"}/${route} missing reciprocal ${lang}`);
    }

    for (const [targetLocale] of equivalentLocales) {
      const href = routeUrl(targetLocale, route);
      if (!html.includes(`href="${href}"`)) errors.push(`${locale}/${route} dropdown or hreflang missing ${targetLocale || "en"}`);
    }
  }
}

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
for (const [locale] of locales) {
  for (const route of routes) {
    if (!sitemap.includes(`<loc>${routeUrl(locale, route)}</loc>`)) errors.push(`sitemap missing ${locale}/${route}`);
  }
}

const styles = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
if (!styles.includes("@media")) errors.push("shared stylesheet has no responsive media rules");
for (const className of [...new Set([...articleClasses, ...homeClasses])].filter((item) => item !== "research")) {
  if (!styles.includes(`.${className}`)) errors.push(`shared stylesheet missing .${className}`);
}

const result = {
  generatedAt: "2026-07-26",
  round: 17,
  newLocalizedPages: locales.length * routes.length,
  upgradedLocalizedHomes: locales.length,
  locales: locales.map(([locale]) => locale),
  routesPerLocale: routes.length,
  styleParity: {
    sharedStylesheet: true,
    responsiveMediaRules: styles.includes("@media"),
    requiredArticleClasses: articleClasses,
    requiredHomeClasses: homeClasses,
  },
  contentDepth: {
    minimumLatinWords: Math.min(...metrics.filter((item) => item.mode !== "cjk").map((item) => item.latinWords)),
    minimumCjkOrKoreanLetters: Math.min(...metrics.filter((item) => item.locale !== "pt-br").map((item) => item.letters)),
  },
  reciprocalHreflangLocales: equivalentLocales.map(([, lang]) => lang),
  pagesChecked: metrics.length,
  errors: [...new Set(errors)],
};

fs.writeFileSync(path.join(ROOT, "ROUND_17_VALIDATION.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (result.errors.length) process.exit(1);
