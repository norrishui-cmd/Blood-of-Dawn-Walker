import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const domain = 'https://bloodofdawnwalker.cc';
const manifest = JSON.parse(await readFile(path.join(root, 'ROUND_11_URL_MANIFEST.json'), 'utf8'));
const expected = new Set(manifest.routes.map(x => x.route));
const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const round11 = [];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === 'scripts' || entry.name === 'templates') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = await walk(root);
const indexableEnglish = [];

function visibleWords(html) {
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ');
  return (clean.match(/\b[\w’'-]+\b/g) || []).length;
}

for (const file of files) {
  const relative = path.relative(root, file);
  if (relative === '404.html') continue;
  const html = await readFile(file, 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1]?.trim()
    ?? html.match(/<meta\s+name="description"\s*\n?\s*content="([^"]+)"/i)?.[1]?.trim();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const route = canonical?.startsWith(domain) ? new URL(canonical).pathname : null;

  if (!title || !description || !canonical) errors.push(`${relative}: missing title, description, or canonical`);
  if (title) {
    if (titles.has(title)) errors.push(`${relative}: duplicate title with ${titles.get(title)}`);
    titles.set(title, relative);
  }
  if (description) {
    if (descriptions.has(description)) errors.push(`${relative}: duplicate description with ${descriptions.get(description)}`);
    descriptions.set(description, relative);
  }
  if (canonical) {
    if (canonicals.has(canonical)) errors.push(`${relative}: duplicate canonical with ${canonicals.get(canonical)}`);
    canonicals.set(canonical, relative);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); }
    catch (error) { errors.push(`${relative}: invalid JSON-LD ${error.message}`); }
  }
  for (const match of html.matchAll(/href="([^"#?]+)(?:#[^"]*)?"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:|javascript:)/.test(href) || /\.(css|xml|png|svg|ico|webmanifest)$/.test(href)) continue;
    const resolved = href.startsWith('/') ? path.resolve(root, `.${href}`) : path.resolve(path.dirname(file), href);
    const target = href.endsWith('/') ? path.join(resolved, 'index.html') : resolved;
    try { await access(target); }
    catch { errors.push(`${relative}: broken internal link ${href}`); }
  }

  if (expected.has(route)) {
    const words = visibleWords(html);
    round11.push(route);
    if (noindex) errors.push(`${route}: Round 11 page is noindex`);
    if (!html.includes('<h1>')) errors.push(`${route}: missing H1`);
    if (!html.includes('Officially sourced') || !html.includes('Concrete answer')) errors.push(`${route}: missing semantic quality markers`);
    if (!html.includes('google-adsense-account') || !html.includes('adsbygoogle.js')) errors.push(`${route}: missing AdSense`);
    if (!html.includes('LANG-DROPDOWN:START')) errors.push(`${route}: missing language dropdown`);
    if (words < 250) errors.push(`${route}: only ${words} visible words`);
    if ((html.match(/<h2>/g) || []).length < 5) errors.push(`${route}: fewer than five useful sections`);
    if (!html.includes('target="_blank" rel="noreferrer"')) errors.push(`${route}: missing source link`);
  }

  const isEnglish = !relative.startsWith(`de${path.sep}`) && !relative.startsWith(`es${path.sep}`);
  if (isEnglish && !noindex && canonical?.startsWith(domain)) {
    const modified = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1] || '2026-07-25';
    indexableEnglish.push({ url: canonical, modified });
  }
}

for (const route of expected) if (!round11.includes(route)) errors.push(`${route}: missing from generated Round 11 files`);
if (round11.length !== 96) errors.push(`Round 11 page count is ${round11.length}, expected 96`);

indexableEnglish.sort((a, b) => a.url.localeCompare(b.url));
const seenEnglish = new Set();
for (const item of indexableEnglish) {
  if (seenEnglish.has(item.url)) errors.push(`Duplicate English sitemap URL ${item.url}`);
  seenEnglish.add(item.url);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableEnglish.map(x => `  <url><loc>${x.url.replaceAll('&','&amp;')}</loc><lastmod>${x.modified}</lastmod></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(root, 'sitemap-en.xml'), sitemap);
await writeFile(path.join(root, 'sitemap.xml'), sitemap);
await writeFile(path.join(root, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${domain}/sitemap-en.xml</loc><lastmod>2026-07-25</lastmod></sitemap>
  <sitemap><loc>${domain}/sitemap-de.xml</loc><lastmod>2026-07-25</lastmod></sitemap>
  <sitemap><loc>${domain}/sitemap-es.xml</loc><lastmod>2026-07-25</lastmod></sitemap>
</sitemapindex>
`);

const deSitemap = await readFile(path.join(root, 'sitemap-de.xml'), 'utf8');
const esSitemap = await readFile(path.join(root, 'sitemap-es.xml'), 'utf8');
const countLoc = xml => (xml.match(/<loc>/g) || []).length;
const report = {
  generatedAt: '2026-07-25',
  htmlFilesChecked: files.length,
  round11Candidates: 96,
  round11Indexable: round11.length,
  round11Clusters: Object.fromEntries([...new Set(manifest.routes.map(x => x.cluster))].map(cluster => [cluster, manifest.routes.filter(x => x.cluster === cluster).length])),
  sitemap: {
    en: indexableEnglish.length,
    de: countLoc(deSitemap),
    es: countLoc(esSitemap),
    total: indexableEnglish.length + countLoc(deSitemap) + countLoc(esSitemap)
  },
  uniqueTitles: titles.size,
  uniqueDescriptions: descriptions.size,
  uniqueCanonicals: canonicals.size,
  warnings,
  errors
};
await writeFile(path.join(root, 'ROUND_11_VALIDATION.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
