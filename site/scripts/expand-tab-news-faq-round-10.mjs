import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const domain = 'https://bloodofdawnwalker.cc';
const checked = '2026-07-25';
const ads = '<meta name="google-adsense-account" content="ca-pub-9505220977121599" /><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>';

const sources = {
  official: 'https://en.bandainamcoent.eu/dawnwalker/the-blood-of-dawnwalker',
  shop: 'https://en.bandainamcoent.eu/dawnwalker/the-blood-of-dawnwalker/shop-now',
  release: 'https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-will-launch-september-3-rebel-wolves-revealed-key-details',
  gameplay: 'https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap',
  choices: 'https://blog.playstation.com/2026/04/28/choices-and-consequences-in-the-blood-of-dawnwalker-out-september-3/',
  steam: 'https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/',
  connections: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-8-forging-connections',
  roots: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-9-coens-roots',
  saga: 'https://en.bandainamcoent.eu/dawnwalker/news/rebel-wolves-unveils-more-of-the-blood-of-dawnwalker-and-teases-the-future-of'
};

const groups = {
  'release-guides': {
    title: 'Release, Platforms, and Editions',
    items: [
      ['ps4-version-status', 'Is The Blood of Dawnwalker coming to PS4?', 'No PS4 version is announced. Official launch platforms are PC, PS5, and Xbox Series X|S.'],
      ['xbox-one-version-status', 'Is The Blood of Dawnwalker coming to Xbox One?', 'No Xbox One version is announced. The console release is listed for Xbox Series X|S.'],
      ['switch-version-status', 'Is The Blood of Dawnwalker coming to Nintendo Switch or Switch 2?', 'No Nintendo version has been announced as of July 25, 2026.'],
      ['early-access-status', 'Does any Dawnwalker edition include early access?', 'No announced edition lists early access. The confirmed release date is September 3, 2026.'],
      ['physical-editions', 'Does The Blood of Dawnwalker have physical editions?', 'Yes. Official listings include physical Day 1 and Collector’s Edition configurations, with availability varying by region and retailer.'],
      ['edition-story-content', 'Do the premium Dawnwalker editions include extra story DLC?', 'No extra story campaign is listed. Premium contents focus on physical collectibles and digital compendium, comic, soundtrack, and armor items.'],
      ['preorder-after-gold', 'Can Dawnwalker still be preordered after it went gold?', 'Yes. Going gold is a production milestone and does not close the official preorder period.'],
      ['release-date-still-current', 'Is September 3, 2026 still the current Dawnwalker release date?', 'Yes. The official game page and current storefronts continue to list September 3, 2026.']
    ]
  },
  'gameplay-guides': {
    title: 'Combat, Forms, Hunger, and Progression',
    items: [
      ['third-person-camera', 'Is The Blood of Dawnwalker first-person or third-person?', 'It is presented as a third-person action RPG; official gameplay shows Coen from an over-the-shoulder external camera.'],
      ['open-world-confirmed', 'Is The Blood of Dawnwalker open world?', 'Yes. Bandai Namco describes it as an open-world dark fantasy action RPG set in Vale Sangora.'],
      ['human-form-day', 'Is Coen always human during the day?', 'Coen’s Dawnwalker condition divides his toolset between human abilities by day and vampire powers by night in the revealed gameplay structure.'],
      ['vampire-form-night', 'What changes when Coen becomes a vampire at night?', 'Night gameplay adds claws, biting, supernatural movement, and vampire powers, while day combat emphasizes swordplay and runic hexes.'],
      ['directional-attacks', 'Does Dawnwalker use directional attacks and blocks?', 'Yes. Revealed combat uses directional sword attacks, blocks, and parries rather than a purely automatic defense system.'],
      ['active-abilities-cost', 'How are active abilities paid for in combat?', 'Successful attacks, blocks, and parries build Activation Charges, which are then spent on active abilities.'],
      ['hunger-forced-choice', 'Can low blood hunger remove normal dialogue choices?', 'Yes. At critical hunger, dialogue can be replaced by an unavoidable option to give in and feed.'],
      ['partial-feeding', 'Can Coen choose how much blood to take from a person?', 'Official gameplay commentary says players can decide how much blood to drain, creating different risks and consequences.'],
      ['animal-types-feeding', 'Which animals can Coen feed on?', 'Developers have specifically mentioned deer, wolves, and bears as possible animal blood sources.']
    ]
  },
  'walkthrough-guides': {
    title: 'Time, Quest Routes, and Consequences',
    items: [
      ['real-time-countdown', 'Is the 30-day limit a real-time countdown?', 'No. Ordinary real-world minutes and free exploration do not continuously drain the narrative deadline.'],
      ['time-cost-visible-before-action', 'Can you see a time cost before starting an activity?', 'Yes. Time-spending activities use an hourglass indicator and show how far the world will advance.'],
      ['skills-can-cost-time', 'Can learning a skill consume narrative time?', 'Yes. Official preview material says some abilities can have a visible time cost.'],
      ['dialogue-can-cost-time', 'Can dialogue choices advance time in Dawnwalker?', 'Yes. Certain dialogue decisions are among the meaningful actions that may move the clock forward.'],
      ['multiple-objectives-active', 'Can several Dawnwalker quests be active at once?', 'Yes. The official demonstration describes taking multiple objectives and deciding which to complete, delay, or ignore.'],
      ['go-straight-to-brencis', 'Can players challenge Brencis before completing most stories?', 'After reaching a certain point, players can move directly toward Brencis, but the challenge is expected to be much harder.'],
      ['npc-death-route-continues', 'Does a quest NPC dying always force a reload?', 'No. The narrative sandbox is designed to continue after minor or major NPC deaths and reflect the consequences.']
    ]
  },
  'story-guides': {
    title: 'Coen, Family, Villains, and Relationships',
    items: [
      ['coen-fixed-hero', 'Who is the playable character in The Blood of Dawnwalker?', 'Players control Coen, a young man from Laslea whose established family and transformation anchor the story.'],
      ['lunka-identity', 'Who is Lunka in The Blood of Dawnwalker?', 'Lunka is Coen’s sister. Brencis uses vampire blood to heal her from the plague early in the story.'],
      ['esme-identity', 'Who is Esme in The Blood of Dawnwalker?', 'Esme is Coen’s mother and appears in the demonstrated family-rescue and consequence storyline.'],
      ['brencis-blood-tax', 'Why does Brencis impose a blood tax?', 'He presents vampire protection and plague relief as the price for Vale Sangora’s submission, demanding human blood in return.'],
      ['side-characters-own-motives', 'Do Dawnwalker side characters have their own motivations?', 'Yes. Rebel Wolves says supporting characters have backstories, emotions, goals, and the ability to affect Coen’s route.'],
      ['romance-candidates-list', 'Has the full Dawnwalker romance list been revealed?', 'No. Official material hints that some connections may become emotional, but it does not publish a complete candidate list.'],
      ['lunka-vampire-blood-effect', 'Does Brencis’s blood permanently transform Lunka?', 'The official bulletin says vampire blood heals humans and no other long-term effect is currently established, while deliberately leaving some uncertainty.']
    ]
  },
  'technical-guides': {
    title: 'PC Requirements and Technical Status',
    items: [
      ['windows-10-required', 'What operating system does Dawnwalker require on PC?', 'The current Steam requirements list 64-bit Windows 10 and DirectX 12.'],
      ['ram-requirement', 'How much RAM does The Blood of Dawnwalker require?', 'Both the minimum and recommended PC tiers list 16 GB of RAM.'],
      ['ssd-required', 'Does Dawnwalker require an SSD?', 'Yes. The current requirements specify 60 GB of available SSD storage.'],
      ['minimum-gpu', 'What is the minimum Dawnwalker graphics card?', 'Steam currently lists a GTX 1060 or Radeon RX 580 at the minimum tier.'],
      ['recommended-gpu', 'What GPU is recommended for Dawnwalker?', 'The recommended tier lists an RTX 4060, Radeon RX 7600 XT, or Intel Arc B580.'],
      ['steam-deck-status', 'Is The Blood of Dawnwalker Steam Deck verified?', 'No Steam Deck verification status is shown on the official Steam page as of July 25, 2026.'],
      ['ultrawide-status', 'Has official ultrawide monitor support been confirmed?', 'No official aspect-ratio or ultrawide support matrix has been published yet.'],
      ['upscaler-status', 'Are DLSS, FSR, or XeSS confirmed for Dawnwalker?', 'The current official pages do not provide a complete upscaler and frame-generation support list.']
    ]
  },
  'faq-guides': {
    title: 'Buying and General Questions',
    items: [
      ['standard-edition-content', 'What is included in the Dawnwalker Standard Edition?', 'It includes the base game; eligible preorders also receive early access to the Sangoran Wayfarer’s Armor set.'],
      ['day-one-edition-content', 'What is included in the Day 1 Edition?', 'The official listing includes the base game, a SteelBook, a physical world map, and the digital preorder armor bonus.'],
      ['eclipse-edition-content', 'What is included in the Eclipse Edition?', 'It adds a digital world compendium, digital comic book, digital soundtrack, and the preorder armor bonus to the base game.'],
      ['collector-figure-size', 'How large is the Collector’s Edition Coen figure?', 'The official shop lists a 23 cm PureArts Coen figurine in a collector box.'],
      ['collector-compendium-pages', 'How many pages are in the physical Collector’s Edition compendium?', 'The official listing describes a 60-page hardcover world compendium.'],
      ['preorder-armor-paywall', 'Is the preorder armor permanently locked behind a preorder?', 'No. The Sangoran Wayfarer’s Armor is an early unlock that can also be obtained later in the game.']
    ]
  },
  'updates-guides': {
    title: 'Current Development and Demo Status',
    items: [
      ['public-demo-july-25', 'Is there a public Dawnwalker demo as of July 25, 2026?', 'No publicly downloadable demo has been announced on the official game or storefront pages.'],
      ['public-beta-july-25', 'Can players join a public Dawnwalker beta?', 'No public beta registration or player test is currently announced.'],
      ['preview-vs-demo', 'Is the July hands-on preview the same as a public demo?', 'No. A controlled media hands-on build does not mean the public can download or access that build.'],
      ['pre-beta-footage-meaning', 'Does “pre-beta gameplay footage” mean a beta is open?', 'No. It describes the development state of shown footage, not an invitation to a public test.'],
      ['next-official-update', 'When is the next Dawnwalker announcement?', 'No exact next-news date is published. Official channels should be checked for preload, review, patch, and performance updates before launch.']
    ]
  }
};

const total = Object.values(groups).flatMap(group => group.items);
if (total.length !== 50) throw new Error(`Expected 50 FAQ entries, found ${total.length}`);

function esc(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

// Add a second, distinct batch of 50 verified FAQ answers to the English FAQ.
const faqPath = path.join(root, 'faq', 'index.html');
let faq = await readFile(faqPath, 'utf8');
faq = faq
  .replace(/FAQ · \d+\+ Answers/, 'FAQ · 160+ Answers')
  .replace(/Updated July \d+, 2026/, 'Updated July 25, 2026')
  .replace(/Last checked: July \d+, 2026\./, 'Last checked: July 25, 2026.');
const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${domain}/faq/#expanded-50-round-10`,
  url: `${domain}/faq/`,
  dateModified: checked,
  mainEntity: total.map(([, question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
};
const faqSections = Object.entries(groups).map(([tab, group]) =>
  `<section id="faq-round10-${tab}"><h2>${group.title}</h2><dl class="faq-list">${
    group.items.map(([id, question, answer]) =>
      `<div id="faq-${id}"><dt>${esc(question)}</dt><dd>${esc(answer)}</dd></div>`
    ).join('')
  }</dl><p><a href="../${tab}/">Browse the related ${group.title.toLowerCase()} hub</a>.</p></section>`
).join('');
const sourceLinks = Object.values(sources).map(url => `<li><a href="${url}" target="_blank" rel="noreferrer">${url}</a></li>`).join('');
const faqBlock = `<section id="faq-round10-intro" class="verification-box"><h2>50 More Source-Checked Questions</h2><p>This second FAQ expansion was checked on July 25, 2026. It answers new long-tail searches without duplicating the previous 50-question batch. Unannounced features are stated as unconfirmed.</p></section>${faqSections}<section id="faq-round10-sources"><h2>Sources used for this update</h2><ul>${sourceLinks}</ul></section><script type="application/ld+json" data-faq-round10="true">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`;
faq = faq
  .replace(/<section id="faq-round10-intro"[\s\S]*?<script type="application\/ld\+json" data-faq-round10="true">[\s\S]*?<\/script>/, '')
  .replace('</article>', `${faqBlock}</article>`);
await writeFile(faqPath, faq);

// Add direct access to the newly researched questions from all seven English tab hubs.
for (const [tab, group] of Object.entries(groups)) {
  const file = path.join(root, tab, 'index.html');
  let html = await readFile(file, 'utf8');
  const links = group.items.map(([id, question]) =>
    `<a class="cluster-link" href="../faq/#faq-${id}"><strong>${esc(question)}</strong><span>Open the source-checked answer.</span></a>`
  ).join('');
  const module = `<section class="cluster-index tab-faq-links-round10"><div class="section-heading"><p class="eyebrow">FAQ Update · July 25</p><h2>More ${group.title} Questions</h2><p>Direct access to this tab’s new long-tail FAQ answers.</p></div><div class="cluster-grid">${links}</div></section>`;
  html = html
    .replace(/<section class="cluster-index tab-faq-links-round10">[\s\S]*?<\/section>/, '')
    .replace('</main>', `${module}</main>`);
  await writeFile(file, html);
}

// Read the five existing, independent English News URLs from each tab.
const newsByTab = {};
for (const tab of Object.keys(groups)) {
  const html = await readFile(path.join(root, tab, 'index.html'), 'utf8');
  const section = html.match(/<section class="cluster-index tab-news">[\s\S]*?<\/section>/)?.[0] ?? '';
  const cards = [...section.matchAll(/<a class="cluster-link" href="\.\.\/news\/([^/]+)\/"><strong>([^<]+)<\/strong><span>([^<]+)<\/span><\/a>/g)]
    .map(match => ({ slug: match[1], title: match[2], description: match[3] }));
  if (cards.length !== 5) throw new Error(`${tab} has ${cards.length} News links; expected 5`);
  newsByTab[tab] = cards;
}

const localeText = {
  de: {
    language: 'Deutsch', news: 'Aktuelle Meldungen', faq: 'Häufige Fragen',
    intro: 'Fünf quellengeprüfte Updates mit jeweils eigener URL. Die ausführlichen Meldungen sind derzeit auf Englisch verfügbar.',
    faqIntro: 'Direkte Links zu den neuesten verifizierten Antworten im englischen FAQ.',
    tabs: {
      'release-guides': ['Release', 'Termin, Plattformen, Editionen und Vorbestellung'],
      'gameplay-guides': ['Gameplay', 'Kampf, Formen, Bluthunger und Fortschritt'],
      'walkthrough-guides': ['Walkthrough', 'Zeitplanung, Quests und Konsequenzen'],
      'story-guides': ['Story', 'Coen, Charaktere, Welt und Beziehungen'],
      'technical-guides': ['Technik', 'PC-Anforderungen, Konsolen und Zugänglichkeit'],
      'faq-guides': ['FAQ', 'Kaufberatung und häufige Spielerfragen'],
      'updates-guides': ['Updates', 'Entwicklungsstand, Demo und offizielle Meldungen']
    }
  },
  es: {
    language: 'Español', news: 'Noticias recientes', faq: 'Preguntas frecuentes',
    intro: 'Cinco actualizaciones verificadas, cada una con su propia URL. Los artículos completos están disponibles actualmente en inglés.',
    faqIntro: 'Enlaces directos a las respuestas verificadas más recientes en el FAQ inglés.',
    tabs: {
      'release-guides': ['Lanzamiento', 'Fecha, plataformas, ediciones y reserva'],
      'gameplay-guides': ['Jugabilidad', 'Combate, formas, hambre de sangre y progreso'],
      'walkthrough-guides': ['Guías', 'Tiempo, misiones, rutas y consecuencias'],
      'story-guides': ['Historia', 'Coen, personajes, mundo y relaciones'],
      'technical-guides': ['Técnico', 'Requisitos de PC, consolas y accesibilidad'],
      'faq-guides': ['FAQ', 'Compra y preguntas habituales de los jugadores'],
      'updates-guides': ['Actualizaciones', 'Desarrollo, demo y anuncios oficiales']
    }
  }
};

function languageMenu(lang, tab) {
  const label = lang === 'de' ? 'Deutsch' : 'Español';
  return `<!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 ${label}</summary><div class="language-options"><a href="../../${tab}/" lang="en">English</a><a href="../../de/${tab}/" lang="de">Deutsch</a><a href="../../es/${tab}/" lang="es">Español</a></div></details><!-- LANG-DROPDOWN:END -->`;
}

// Add all seven navigation-tab detail pages in German and Spanish.
for (const [lang, text] of Object.entries(localeText)) {
  for (const [tab, group] of Object.entries(groups)) {
    const [title, description] = text.tabs[tab];
    const localUrl = `${domain}/${lang}/${tab}/`;
    const newsCards = newsByTab[tab].map(item =>
      `<a class="cluster-link" href="../../news/${item.slug}/" hreflang="en"><strong>${esc(item.title)}</strong><span>${esc(item.description)}</span></a>`
    ).join('');
    const faqCards = group.items.map(([id, question]) =>
      `<a class="cluster-link" href="../../faq/#faq-${id}" hreflang="en"><strong>${esc(question)}</strong><span>${text.faqIntro}</span></a>`
    ).join('');
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${title} – The Blood of Dawnwalker`,
      description,
      url: localUrl,
      inLanguage: lang,
      dateModified: checked
    };
    const localizedMeta = lang === 'de'
      ? `${description}. Mit fünf News-URLs und direkten Zugängen zu verifizierten FAQ-Antworten.`
      : `${description}. Incluye cinco URL de noticias y accesos directos a respuestas verificadas.`;
    const html = `<!doctype html><html lang="${lang}"><head>${ads}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${title} | The Blood of Dawnwalker ${text.language}</title><meta name="description" content="${localizedMeta}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${localUrl}" /><link rel="alternate" hreflang="en" href="${domain}/${tab}/" /><link rel="alternate" hreflang="de" href="${domain}/de/${tab}/" /><link rel="alternate" hreflang="es" href="${domain}/es/${tab}/" /><link rel="alternate" hreflang="x-default" href="${domain}/${tab}/" /><script type="application/ld+json">${JSON.stringify(pageSchema)}</script><link rel="stylesheet" href="../../styles.css" /></head><body><header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>Blood of Dawnwalker</strong><small>${text.language}</small></span></a><nav><a href="../release-guides/">${text.tabs['release-guides'][0]}</a><a href="../gameplay-guides/">${text.tabs['gameplay-guides'][0]}</a><a href="../walkthrough-guides/">${text.tabs['walkthrough-guides'][0]}</a><a href="../story-guides/">${text.tabs['story-guides'][0]}</a><a href="../technical-guides/">${text.tabs['technical-guides'][0]}</a><a href="../faq-guides/">FAQ</a><a href="../updates-guides/">${text.tabs['updates-guides'][0]}</a>${languageMenu(lang, tab)}</nav></header><main class="article-main"><section class="article-hero"><div><p class="eyebrow">${text.language} · 25/07/2026</p><h1>${title}</h1><p class="hero-copy">${description}</p></div></section><section class="cluster-index tab-news"><div class="section-heading"><h2>${text.news}</h2><p>${text.intro}</p></div><div class="cluster-grid">${newsCards}</div></section><section class="cluster-index tab-faq-links-round10"><div class="section-heading"><h2>${text.faq}</h2><p>${text.faqIntro}</p></div><div class="cluster-grid">${faqCards}</div></section></main></body></html>`;
    const dir = path.join(root, lang, tab);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html);
  }
}

// Add the localized tab routes to their language sitemaps and rebuild the combined sitemap.
function parseUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
}
function renderSitemap(urls) {
  const unique = [...new Set(urls)];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(url => `  <url><loc>${url}</loc><lastmod>${checked}</lastmod></url>`).join('\n')}\n</urlset>\n`;
}
for (const lang of ['de', 'es']) {
  const file = path.join(root, `sitemap-${lang}.xml`);
  const urls = parseUrls(await readFile(file, 'utf8'));
  const tabs = Object.keys(groups).map(tab => `${domain}/${lang}/${tab}/`);
  await writeFile(file, renderSitemap([...urls, ...tabs]));
}
const enUrls = parseUrls(await readFile(path.join(root, 'sitemap-en.xml'), 'utf8'));
const deUrls = parseUrls(await readFile(path.join(root, 'sitemap-de.xml'), 'utf8'));
const esUrls = parseUrls(await readFile(path.join(root, 'sitemap-es.xml'), 'utf8'));
await writeFile(path.join(root, 'sitemap.xml'), renderSitemap([...enUrls, ...deUrls, ...esUrls]));

console.log(`Round 10 complete: 50 new FAQs, 7 English FAQ entry modules, and 14 localized tab hubs with 5 News links each.`);
