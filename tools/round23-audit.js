const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const siteUrl = 'https://bloodofdawnwalker.cc/';
const hubs = [
  'release-guides', 'gameplay-guides', 'walkthrough-guides',
  'story-guides', 'technical-guides', 'faq-guides', 'updates-guides'
];

function walk(directory) {
  const output = [];
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    if (directory === root && ['site', 'templates', 'tools'].includes(entry.name)) continue;
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...walk(item));
    else if (entry.name === 'index.html') output.push(item);
  }
  return output;
}
function meta(html, pattern) {
  return (html.match(pattern) || [])[1] || '';
}
function robots(html) {
  return meta(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/i);
}
function sitemap(file) {
  return [...fs.readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
}
function wordCount(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(/\s+/).length;
}

const errors = [];
const files = walk(root);
const indexable = [];
const noindex = [];
const errorPage = path.join(root, '404.html');
const errorPageIsNoindex = fs.existsSync(errorPage) && /\bnoindex\b/i.test(robots(fs.readFileSync(errorPage, 'utf8')));
const unique = {title: new Map(), description: new Map(), canonical: new Map()};

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const route = path.relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, '');
  if (/\bnoindex\b/i.test(robots(html))) noindex.push(route);
  else indexable.push(route);
  const fields = {
    title: meta(html, /<title>([\s\S]*?)<\/title>/i),
    description: meta(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i),
    canonical: meta(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i)
  };
  for (const [name, value] of Object.entries(fields)) {
    if (!value) errors.push(`Missing ${name}: ${route}`);
    else if (unique[name].has(value)) errors.push(`Duplicate ${name}: ${route} and ${unique[name].get(value)}`);
    else unique[name].set(value, route);
  }
  if (!/<h1[ >]/i.test(html)) errors.push(`Missing H1: ${route}`);
  if (!/google-adsense-account/.test(html)) errors.push(`Missing AdSense: ${route}`);
  if (!/language-menu/.test(html)) errors.push(`Missing language menu: ${route}`);
  try {
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  } catch {
    errors.push(`Invalid JSON-LD: ${route}`);
  }
}

const allSitemap = sitemap(path.join(root, 'sitemap.xml'));
const englishSitemap = sitemap(path.join(root, 'sitemap-en.xml'));
if (allSitemap.length !== indexable.length) errors.push(`Sitemap/indexable mismatch: ${allSitemap.length}/${indexable.length}`);
for (const url of allSitemap) {
  const route = url.slice(siteUrl.length);
  const file = path.join(root, route, 'index.html');
  if (!fs.existsSync(file)) errors.push(`Sitemap missing file: ${url}`);
  else if (/\bnoindex\b/i.test(robots(fs.readFileSync(file, 'utf8')))) errors.push(`Sitemap contains noindex: ${url}`);
}

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href=["']([^"'#]+)(?:#[^"']*)?["']/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|javascript:|\/\/|\/)/.test(href)) continue;
    const target = path.resolve(path.dirname(file), href);
    const resolved = fs.existsSync(target) && (!fs.statSync(target).isDirectory() || fs.existsSync(path.join(target, 'index.html')));
    if (!resolved && !/\.(css|js|png|svg|ico|xml|txt|webmanifest)$/.test(href)) {
      errors.push(`Broken link: ${path.relative(root, file)} -> ${href}`);
    }
  }
}

for (const hub of hubs) {
  const html = fs.readFileSync(path.join(root, hub, 'index.html'), 'utf8');
  const newsSection = meta(html, /(<section[^>]+data-round23-news="true"[\s\S]*?<\/section>)/);
  const faqSection = meta(html, /(<section[^>]+data-round23-faq="true"[\s\S]*?<\/section>)/);
  if ((newsSection.match(/href=/g) || []).length !== 5) errors.push(`Round 23 news count: ${hub}`);
  if ((faqSection.match(/href=/g) || []).length < 5) errors.push(`Round 23 FAQ count: ${hub}`);
}

const newNews = fs.readdirSync(path.join(root, 'news')).filter(slug => {
  const file = path.join(root, 'news', slug, 'index.html');
  return fs.existsSync(file) && /Round 23/.test(fs.readFileSync(file, 'utf8'));
});
const newFaq = fs.readdirSync(path.join(root, 'faq')).filter(slug => {
  const file = path.join(root, 'faq', slug, 'index.html');
  return fs.existsSync(file) && /Verified July 31, 2026/.test(fs.readFileSync(file, 'utf8'));
});
if (newNews.length !== 35) errors.push(`New NewsArticle count: ${newNews.length}`);
if (newFaq.length !== 50) errors.push(`New FAQ count: ${newFaq.length}`);

let minimumNewsWords = Infinity;
let minimumFaqWords = Infinity;
for (const slug of newNews) minimumNewsWords = Math.min(minimumNewsWords, wordCount(fs.readFileSync(path.join(root, 'news', slug, 'index.html'), 'utf8')));
for (const slug of newFaq) minimumFaqWords = Math.min(minimumFaqWords, wordCount(fs.readFileSync(path.join(root, 'faq', slug, 'index.html'), 'utf8')));

const mirrorFiles = [
  ...newNews.map(slug => `news/${slug}/index.html`),
  ...newFaq.map(slug => `faq/${slug}/index.html`),
  ...hubs.map(hub => `${hub}/index.html`),
  'news/index.html', 'faq/index.html',
  ...fs.readdirSync(root).filter(name => /^sitemap.*\.xml$/.test(name))
];
for (const relative of mirrorFiles) {
  const original = path.join(root, relative);
  const mirror = path.join(root, 'site', relative);
  if (!fs.existsSync(mirror) || fs.readFileSync(original).compare(fs.readFileSync(mirror)) !== 0) errors.push(`Mirror mismatch: ${relative}`);
}

const result = {
  generatedAt: '2026-07-31',
  round: 23,
  htmlRoutes: files.length + (fs.existsSync(errorPage) ? 1 : 0),
  indexablePages: indexable.length,
  noindexPages: noindex.length + (errorPageIsNoindex ? 1 : 0),
  sitemapPages: allSitemap.length,
  englishSitemapPages: englishSitemap.length,
  newNewsArticles: newNews.length,
  newFaqPages: newFaq.length,
  minimumNewsWords,
  minimumFaqWords,
  updatedHubs: hubs.length,
  errors
};
fs.writeFileSync(path.join(root, 'ROUND_23_NEWS_FAQ_VALIDATION.json'), JSON.stringify(result, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'site', 'ROUND_23_NEWS_FAQ_VALIDATION.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
