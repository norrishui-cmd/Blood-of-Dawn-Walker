import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const tabs = ['release-guides','gameplay-guides','walkthrough-guides','story-guides','technical-guides','faq-guides','updates-guides'];
const errors = [];
const titles = new Map();
const descriptions = new Map();
let localizedTabs = 0;
let localizedNewsLinks = 0;

for (const lang of ['de', 'es']) {
  for (const tab of tabs) {
    const file = path.join(root, lang, tab, 'index.html');
    const html = await readFile(file, 'utf8');
    localizedTabs++;
    const news = [...html.matchAll(/href="\.\.\/\.\.\/news\/([^/]+)\/"/g)].map(match => match[1]);
    if (news.length !== 5 || new Set(news).size !== 5) errors.push(`/${lang}/${tab}/ has ${news.length} News links`);
    localizedNewsLinks += news.length;
    for (const slug of news) {
      try { await access(path.join(root, 'news', slug, 'index.html')); }
      catch { errors.push(`/${lang}/${tab}/ missing News target /news/${slug}/`); }
    }
    if (!html.includes('LANG-DROPDOWN:START')) errors.push(`/${lang}/${tab}/ has no language dropdown`);
    if (!html.includes(`rel="canonical" href="https://bloodofdawnwalker.cc/${lang}/${tab}/"`)) errors.push(`/${lang}/${tab}/ canonical mismatch`);
    for (const hreflang of ['en', 'de', 'es', 'x-default']) {
      if (!html.includes(`hreflang="${hreflang}"`)) errors.push(`/${lang}/${tab}/ missing ${hreflang} hreflang`);
    }
  }
}

const faq = await readFile(path.join(root, 'faq', 'index.html'), 'utf8');
const round10Block = faq.match(/<section id="faq-round10-intro"[\s\S]*?<script type="application\/ld\+json" data-faq-round10="true">([\s\S]*?)<\/script>/);
if (!round10Block) errors.push('Round 10 FAQ block missing');
else {
  const visible = [...round10Block[0].matchAll(/<div id="faq-([a-z0-9-]+)"><dt>/g)].map(match => match[1]);
  if (visible.length !== 50 || new Set(visible).size !== 50) errors.push(`Round 10 visible FAQ count ${visible.length}`);
  try {
    const schema = JSON.parse(round10Block[1]);
    if (schema.mainEntity?.length !== 50) errors.push(`Round 10 FAQ schema count ${schema.mainEntity?.length}`);
  } catch (error) { errors.push(`Round 10 FAQ schema invalid: ${error.message}`); }
}

async function walk(dir) {
  const output = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const item = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...await walk(item));
    else if (entry.name.endsWith('.html')) output.push(item);
  }
  return output;
}

const htmlFiles = await walk(root);
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativeFile = path.relative(root, file);
  if (relativeFile === '404.html' || relativeFile.startsWith(`templates${path.sep}`)) continue;
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1]
    ?? html.match(/<meta\s+name="description"\s*\n?\s*content="([^"]+)"/)?.[1];
  if (!title || !description) errors.push(`${path.relative(root, file)} missing title or description`);
  if (title) {
    if (titles.has(title)) errors.push(`duplicate title: ${title}`);
    titles.set(title, file);
  }
  if (description) {
    if (descriptions.has(description)) errors.push(`duplicate description: ${description}`);
    descriptions.set(description, file);
  }
  for (const match of html.matchAll(/href="([^"#?]+)(?:#[^"]*)?"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:)/.test(href) || href.endsWith('.css') || href.endsWith('.xml')) continue;
    const base = path.dirname(file);
    const resolved = href.startsWith('/') ? path.resolve(root, `.${href}`) : path.resolve(base, href);
    let target = resolved;
    if (href.endsWith('/')) target = path.join(resolved, 'index.html');
    try { await access(target); }
    catch { errors.push(`${path.relative(root, file)} broken internal link ${href}`); }
  }
}

for (const lang of ['de', 'es']) {
  const sitemap = await readFile(path.join(root, `sitemap-${lang}.xml`), 'utf8');
  for (const tab of tabs) {
    if (!sitemap.includes(`<loc>https://bloodofdawnwalker.cc/${lang}/${tab}/</loc>`)) errors.push(`sitemap-${lang}.xml missing /${lang}/${tab}/`);
  }
}

const report = {
  generatedAt: '2026-07-25',
  htmlFiles: htmlFiles.length,
  uniqueTitles: titles.size,
  uniqueDescriptions: descriptions.size,
  localizedTabPages: localizedTabs,
  localizedNewsLinks,
  round10Faqs: 50,
  errors
};
await writeFile(path.join(root, 'ROUND_10_VALIDATION.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
