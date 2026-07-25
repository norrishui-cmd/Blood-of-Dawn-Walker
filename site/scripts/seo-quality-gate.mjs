import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const domain = 'https://bloodofdawnwalker.cc';
const placeholderSignals = [
  'Pre-launch topic. Last verified: 2026-07-13.',
  'During launch week, use this page as a checklist. First confirm whether the topic affects buying',
  'Do Not Publish Yet</dt><dd>Exact numbers, quest outcomes, map locations'
];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, {withFileTypes:true})) {
    if (entry.name === 'templates' || entry.name === 'scripts') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

const files = await walk(root);
const pruned = [];
const indexable = [];

for (const file of files) {
  let html = await readFile(file, 'utf8');
  const isPlaceholder = placeholderSignals.some(signal => html.includes(signal));
  if (isPlaceholder) {
    html = html.replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />');
    await writeFile(file, html);
    pruned.push('/' + path.relative(root, path.dirname(file)).replaceAll(path.sep, '/') + '/');
  }
  const isNoindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!isNoindex && canonical?.startsWith(domain)) {
    const modified = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1] || '2026-07-18';
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || 'Blood of Dawnwalker Guide';
    const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1]?.trim() || 'Source-checked Blood of Dawnwalker guide.';
    indexable.push({url:canonical, modified, title, description});
  }
}

indexable.sort((a,b) => a.url.localeCompare(b.url));
const guideLinks = indexable.filter(x => x.url !== `${domain}/guide-index/`).map(item => {
  const route = new URL(item.url).pathname;
  return `<a href="..${route}"><strong>${item.title}</strong><span>${item.description}</span></a>`;
}).join('');
await writeFile(path.join(root,'guide-index','index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Blood of Dawnwalker Guide Index</title><meta name="description" content="Browse every quality-approved, indexable Blood of Dawnwalker guide for release details, systems, characters, enemies, locations, and story planning." /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${domain}/guide-index/" /><link rel="stylesheet" href="../styles.css" /></head><body><header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>Blood of Dawnwalker</strong><small>Guide &amp; Wiki</small></span></a><nav aria-label="Main navigation"><a href="../release-guides/">Release</a><a href="../gameplay-guides/">Gameplay</a><a href="../faq/">FAQ</a></nav></header><main class="article-main"><section class="article-hero"><div><p class="eyebrow">Quality-approved URLs</p><h1>Blood of Dawnwalker Guide Index</h1><p class="hero-copy">Every guide below contains a concrete answer and is eligible for search indexing. Placeholder routes are intentionally excluded.</p></div></section><section class="article-content"><div class="related-grid">${guideLinks}</div></section></main></body></html>\n`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map(({url,modified}) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${modified}</lastmod>\n  </url>`).join('\n')}
</urlset>\n`;
await writeFile(path.join(root, 'sitemap.xml'), sitemap);
await writeFile(path.join(root, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${domain}/sitemap.xml</loc>
    <lastmod>2026-07-18</lastmod>
  </sitemap>
</sitemapindex>\n`);

const xml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
const feedItems = [...indexable].sort((a,b) => b.modified.localeCompare(a.modified) || a.url.localeCompare(b.url)).slice(0,50);
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Blood of Dawnwalker Guide Updates</title>
  <link href="${domain}/feed.xml" rel="self" />
  <link href="${domain}/" />
  <id>${domain}/</id>
  <updated>2026-07-18T00:00:00Z</updated>
  <subtitle>Source-checked release, gameplay, story, FAQ, and system guides for The Blood of Dawnwalker.</subtitle>
${feedItems.map(item => `  <entry>\n    <title>${xml(item.title)}</title>\n    <link href="${xml(item.url)}" />\n    <id>${xml(item.url)}</id>\n    <updated>${item.modified}T00:00:00Z</updated>\n    <summary>${xml(item.description)}</summary>\n  </entry>`).join('\n')}
</feed>\n`;
await writeFile(path.join(root, 'feed.xml'), feed);

const report = {
  generatedAt:'2026-07-18',
  htmlRoutesScanned:files.length,
  placeholderRoutesNoindexed:pruned.length,
  indexableCanonicalUrls:indexable.length,
  placeholderRoutes:pruned.sort()
};
await writeFile(path.join(root, 'SEO_QUALITY_GATE_REPORT.json'), JSON.stringify(report,null,2) + '\n');
console.log(JSON.stringify(report,null,2));
