const fs = require('fs');
const path = require('path');

const project = path.resolve(__dirname, '..');
const siteUrl = 'https://bloodofdawnwalker.cc';
const checked = '2026-07-31';
const sources = {
  sword: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-10-swordmastery',
  choices: 'https://blog.playstation.com/2026/04/28/choices-and-consequences-in-the-blood-of-dawnwalker-out-september-3/',
  july: 'https://blog.playstation.com/2026/07/07/the-blood-of-dawnwalker-unique-time-driven-quest-system-and-player-choice-detailed/',
  xboxWorld: 'https://news.xbox.com/en-us/2026/04/30/the-blood-of-dawnwalker-world/',
  xboxJuly: 'https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/',
  saga: 'https://en.bandainamcoent.eu/dawnwalker/news/rebel-wolves-unveils-more-of-the-blood-of-dawnwalker-and-teases-the-future-of',
  gamescom: 'https://news.xbox.com/en-us/2026/07/28/xbox-gamescom-2026/',
  steam: 'https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/'
};

const tabs = {
  'release-guides': 'Release',
  'gameplay-guides': 'Gameplay',
  'walkthrough-guides': 'Walkthrough',
  'story-guides': 'Story',
  'technical-guides': 'Technical',
  'faq-guides': 'FAQ',
  'updates-guides': 'Updates'
};

const news = {
  'release-guides': [
    ['bulletin-10-reconfirms-launch-platforms', 'Bulletin #10 Reconfirms PS5, Xbox Series, and PC Launch Platforms', 'Bandai Namco’s July 29 swordmastery update again lists PS5, Xbox Series X|S, and PC as the launch platforms.', sources.sword],
    ['gamescom-2026-xbox-lineup', 'Dawnwalker Joins the Xbox Gamescom 2026 Lineup', 'Xbox includes The Blood of Dawnwalker in its newly announced Gamescom 2026 presence.', sources.gamescom],
    ['september-3-launch-remains-current', 'September 3 Release Date Remains Current in the Latest Official Update', 'The newest publisher bulletin continues to display the September 3, 2026 launch date.', sources.sword],
    ['first-game-promises-self-contained-ending', 'First Dawnwalker Game Promises a Self-Contained Ending', 'Rebel Wolves says Coen and Brencis’s conflict will conclude without a cliffhanger in the September release.', sources.saga],
    ['steam-still-lists-prepurchase', 'Steam Store Continues to List Dawnwalker for Pre-Purchase', 'The official Steam listing remains live with the base game, platform information, and mature-content notice.', sources.steam]
  ],
  'gameplay-guides': [
    ['omniattacks-and-omniblocks-explained', 'Omniattacks and Omniblocks Offer Automatic Direction Selection', 'Players can let the combat system choose sword-swing and deflection directions or use the fully directional approach.', sources.sword],
    ['sword-attacks-have-three-phases', 'Every Sword Attack Uses Windup, Anticipation, and Swing Phases', 'The official swordmastery bulletin explains the three animation phases behind readable and responsive exchanges.', sources.sword],
    ['combat-books-unlock-techniques', 'Combat Books Unlock New Sword Techniques and Abilities', 'Exploration can reward books that expand Coen’s available combat techniques.', sources.sword],
    ['passive-perks-shape-swordplay', 'Passive Perks Support Defensive, Mobile, or Aggressive Swordplay', 'The latest combat update describes counterattack, mobility, and pressure-focused growth paths.', sources.sword],
    ['axes-and-pickaxe-teased', 'Axes and a Possible Pickaxe Join Dawnwalker’s Weapon Pool', 'Developers say players can pick up axes and other weapons beyond the main short, long, and great sword families.', sources.sword]
  ],
  'walkthrough-guides': [
    ['defensive-counterattack-build-path', 'Swordmastery Update Outlines a Defensive Counterattack Path', 'Passive perks can support a style built around defense and devastating counterattacks.', sources.sword],
    ['mobility-aggression-build-path', 'Mobility and Relentless Pressure Form a Second Swordplay Path', 'Players can develop a faster, aggressive style instead of focusing on defense.', sources.sword],
    ['books-as-exploration-rewards', 'Exploration Books Can Expand Coen’s Combat Toolkit', 'The official update makes finding books a progression objective because they unlock techniques and abilities.', sources.sword],
    ['positioning-timing-commitment-matter', 'Positioning, Timing, and Commitment Define Sword Exchanges', 'Rebel Wolves says combat is designed around reading attacks and creating openings, not reflexes alone.', sources.sword],
    ['different-swords-change-attack-speed', 'Short, Long, and Great Swords Change Attack Speed', 'The developers confirm that sword categories feel different and directly affect how quickly Coen attacks.', sources.sword]
  ],
  'story-guides': [
    ['coens-father-trained-him', 'Coen’s Father Trained Him with a Sword from Childhood', 'The swordmastery bulletin identifies Coen’s father as the person who prepared him to survive with a blade.', sources.sword],
    ['coens-father-former-mercenary', 'Coen’s Father Is Confirmed as a Former Mercenary', 'The latest character detail links the family’s history to Coen’s early weapons training.', sources.sword],
    ['coen-brencis-conflict-will-conclude', 'Coen and Brencis’s Conflict Will Conclude in the First Game', 'Rebel Wolves says the origin story has a definitive ending shaped by player choices.', sources.saga],
    ['dawnwalker-saga-spans-eras-continents', 'Future Dawnwalker Stories Aim to Span Eras and Continents', 'The saga teaser establishes a long-range anthology-like direction across locations, cultures, and historical periods.', sources.saga],
    ['modern-teaser-is-not-time-travel', 'Rebel Wolves Says the Modern Saga Teaser Does Not Mean Time Travel', 'The studio describes future standalone installments rather than sending the first game’s plot through time.', sources.saga]
  ],
  'technical-guides': [
    ['combat-motion-capture-adjusted', 'Dawnwalker Combat Uses Motion Capture Refined by Animators', 'A large portion of combat was captured physically and then adjusted to fit the game’s mood and direction.', sources.sword],
    ['hema-inspired-not-simulation', 'Historical European Martial Arts Inspired Combat Without Becoming a Simulation', 'The developers used historical references for authenticity but did not recreate medieval habits one to one.', sources.sword],
    ['omni-controls-support-accessibility', 'Omni Controls Make Directional Swordplay More Approachable', 'Automatic direction selection provides an accessible control option while preserving manual tactical depth.', sources.sword],
    ['attack-animation-phases-improve-readability', 'Three Animation Phases Make Incoming Attacks Easier to Read', 'Windup, anticipation, and swing frames are used to balance agility with readable combat timing.', sources.sword],
    ['weapon-family-speed-differences', 'Weapon Family Choice Changes Attack-Speed Behavior', 'Short swords, long swords, and great swords are officially described as feeling and attacking differently.', sources.sword]
  ],
  'faq-guides': [
    ['automatic-direction-combat-option', 'Dawnwalker Includes an Automatic Direction Option for Sword Combat', 'Omniattacks and omniblocks can select directions automatically for players who do not want full manual inputs.', sources.sword],
    ['manual-directional-combat-remains', 'Fully Directional Tactical Combat Remains Available', 'Players who prefer manual swordplay can observe an opponent’s movement and choose attack or block directions themselves.', sources.sword],
    ['swords-not-only-weapons', 'Developers Confirm Swords Are Not the Only Weapons', 'Axes and other weapons can be found even though sword families remain the main focus.', sources.sword],
    ['claws-and-magic-remain-in-arsenal', 'Coen’s Arsenal Still Includes Claws and Magic', 'The swordmastery update closes by reaffirming both vampire claws and bodily magic alongside weapons.', sources.sword],
    ['combat-growth-not-only-numbers', 'Combat Growth Is Designed Around Style, Not Only Stat Increases', 'Books, abilities, and passive perks let players develop distinct approaches to swordplay.', sources.sword]
  ],
  'updates-guides': [
    ['bulletin-10-swordmastery-published', 'Community Bulletin #10 Focuses on Swordmastery', 'Bandai Namco published the official combat deep dive on July 29, 2026.', sources.sword],
    ['bulletin-10-answers-weapon-question', 'Bulletin #10 Answers the Community’s Other-Weapons Question', 'The monthly Q&A confirms sword categories, axes, other pickups, and a possible pickaxe.', sources.sword],
    ['xbox-confirms-gamescom-presence', 'Xbox Confirms Dawnwalker in Its Gamescom 2026 Coverage', 'The July 28 event announcement names The Blood of Dawnwalker among the games in Xbox’s wider lineup.', sources.gamescom],
    ['saga-teaser-points-to-21st-century', 'Official Saga Teaser Points Toward a 21st-Century Setting', 'The June CGI teaser shows Coen in modern surroundings as a signal of the franchise’s long-range direction.', sources.saga],
    ['july-official-preview-roundup', 'July Official Coverage Expands Combat, Choice, and Prologue Details', 'Publisher, PlayStation, and Xbox features now provide a denser verified foundation for pre-release guides.', sources.xboxJuly]
  ]
};

const faq = {
  'release-guides': [
    ['is-september-3-still-the-release-date', 'Is September 3, 2026 still the Dawnwalker release date?', 'Yes. Bandai Namco’s July 29 Bulletin #10 continues to show September 3, 2026 as the release date.', 'The latest official publisher update is newer than the earlier April and July previews.', sources.sword],
    ['which-platforms-does-bulletin-10-list', 'Which launch platforms are listed in Bulletin #10?', 'PS5, Xbox Series X|S, and PC.', 'The bulletin repeats the same current-generation platform set used by the official store and preview pages.', sources.sword],
    ['is-dawnwalker-in-xbox-gamescom-2026-lineup', 'Is The Blood of Dawnwalker in Xbox’s Gamescom 2026 lineup?', 'Yes. Xbox names it among the games included in its Gamescom 2026 coverage.', 'The announcement confirms event presence but does not by itself define a public demo or exact booth activity.', sources.gamescom],
    ['will-first-game-end-on-cliffhanger', 'Will the first Dawnwalker game end on a cliffhanger?', 'No. Rebel Wolves says the first game has a self-contained conclusion without unresolved plot threads.', 'The wider saga can continue while Coen and Brencis’s immediate conflict still reaches an ending.', sources.saga],
    ['is-modern-setting-part-of-first-game', 'Is the 21st-century setting part of the first Dawnwalker game?', 'No. The Blood of Dawnwalker itself is set entirely in the 14th century.', 'The modern imagery is a teaser for the wider saga rather than a confirmed playable section of the September game.', sources.saga],
    ['is-steam-prepurchase-live', 'Can The Blood of Dawnwalker still be pre-purchased on Steam?', 'Yes. The official Steam page currently presents the game as available for pre-purchase.', 'Regional availability, pricing, and refund rules should still be checked on the buyer’s own storefront.', sources.steam],
    ['are-future-dawnwalker-games-standalone', 'Will future Dawnwalker installments be standalone stories?', 'Yes. Rebel Wolves describes each installment as a standalone game with its own story.', 'The games may share an overarching plot and breadcrumbs without depending on cliffhangers.', sources.saga]
  ],
  'gameplay-guides': [
    ['what-are-omniattacks', 'What are omniattacks in The Blood of Dawnwalker?', 'Omniattacks automatically choose the direction of Coen’s sword swing.', 'They provide an approachable alternative to selecting each attack direction manually.', sources.sword],
    ['what-are-omniblocks', 'What are omniblocks in The Blood of Dawnwalker?', 'Omniblocks automatically choose the direction needed to deflect an incoming strike.', 'Manual directional blocking remains available for players who prefer the tactical system.', sources.sword],
    ['can-direction-selection-be-manual', 'Can sword attack and block directions be selected manually?', 'Yes. Players can fully embrace directional combat by reading enemy movement and responding themselves.', 'The automatic omni options do not remove the manual approach.', sources.sword],
    ['how-many-phases-does-sword-attack-have', 'How many animation phases does a Dawnwalker sword attack have?', 'Three: windup, anticipation, and swing.', 'The phases help create readable timing while keeping the system agile.', sources.sword],
    ['do-books-unlock-combat-abilities', 'Do books unlock combat abilities in Dawnwalker?', 'Yes. Finding books can unlock new techniques and combat abilities.', 'The official source does not publish a complete book list or final locations yet.', sources.sword],
    ['can-passive-perks-support-counterattacks', 'Can passive perks support a counterattack build?', 'Yes. The official update specifically mentions defense and devastating counterattacks as one development path.', 'The exact perk names and numerical bonuses are not listed in the bulletin.', sources.sword],
    ['can-passive-perks-support-aggression', 'Can passive perks support an aggressive sword build?', 'Yes. Mobility, aggression, and relentless pressure are named as an alternative path.', 'Players can shape style instead of only increasing raw numbers.', sources.sword],
    ['does-positioning-matter-in-sword-combat', 'Does positioning matter in Dawnwalker sword combat?', 'Yes. Positioning, timing, and commitment are described as central to every exchange.', 'Reading an incoming attack and finding an opening can decide the encounter.', sources.sword]
  ],
  'walkthrough-guides': [
    ['how-do-you-unlock-new-sword-techniques', 'How do you unlock new sword techniques?', 'The confirmed method is finding books during Coen’s journey.', 'Those books unlock techniques and combat abilities; other progression sources may exist but are not defined here.', sources.sword],
    ['is-defensive-sword-build-confirmed', 'Is a defensive sword build confirmed?', 'Yes. Passive perks can support defense and powerful counterattacks.', 'The bulletin confirms the playstyle but not a launch-ready best-build recipe.', sources.sword],
    ['is-mobility-sword-build-confirmed', 'Is a mobility-focused sword build confirmed?', 'Yes. Mobility and relentless pressure are named as a supported approach.', 'The final ability order and equipment requirements remain unconfirmed.', sources.sword],
    ['do-great-swords-attack-differently', 'Do great swords attack differently from short and long swords?', 'Yes. The sword families feel different and affect attack speed.', 'The official answer does not publish exact frame data or damage values.', sources.sword],
    ['can-coen-find-axes', 'Can Coen find and use axes?', 'Yes. Developers say axes can be picked up along the journey.', 'Swords remain the main weapon families discussed in the combat bulletin.', sources.sword],
    ['is-pickaxe-a-confirmed-weapon', 'Is a pickaxe confirmed as a usable weapon?', 'It is teased, but the wording is deliberately tentative.', 'The official answer says “maybe a pickaxe,” so its final availability should not be treated as guaranteed.', sources.sword],
    ['are-omni-controls-good-for-beginners', 'Are omniattacks and omniblocks intended for beginners?', 'They make combat more approachable by choosing directions automatically.', 'Experienced players can still use the deeper manual directional approach.', sources.sword]
  ],
  'story-guides': [
    ['who-taught-coen-swordplay', 'Who taught Coen to use a sword?', 'His father trained him from a young age.', 'The lesson was meant to give Coen a weapon skill that could one day save his life.', sources.sword],
    ['what-was-coens-fathers-profession', 'What was Coen’s father before the story?', 'He was a former mercenary.', 'That background explains why he could train Coen in swordsmanship.', sources.sword],
    ['does-coen-brencis-feud-end-first-game', 'Does Coen’s feud with Brencis end in the first game?', 'Yes. Rebel Wolves says their conflict reaches a definitive conclusion.', 'Player choices shape the ending, but the story is not designed as an unresolved cliffhanger.', sources.saga],
    ['will-saga-cross-different-eras', 'Will the Dawnwalker saga cross different historical eras?', 'Yes. Future installments are intended to span centuries.', 'The teaser also points toward new locations, cultures, antagonists, and stories.', sources.saga],
    ['will-saga-cross-continents', 'Will the Dawnwalker saga move beyond Vale Sangora?', 'Yes. Rebel Wolves says the wider saga aims to cross continents and cultures.', 'That is a franchise direction, not a promise that the first game leaves its Carpathian setting.', sources.saga],
    ['does-modern-teaser-confirm-time-travel', 'Does the modern Dawnwalker teaser confirm time travel?', 'No. The studio explicitly frames the plan as separate standalone stories, not time travel.', 'The first game remains entirely in the 14th century.', sources.saga],
    ['will-first-game-have-saga-breadcrumbs', 'Will the first game contain clues about the wider Dawnwalker saga?', 'Yes. The narrative director says attentive players can find breadcrumbs connected to the overarching plot.', 'Those clues do not prevent the immediate story from concluding.', sources.saga],
    ['will-future-games-have-new-characters', 'Will future Dawnwalker games introduce new characters?', 'Yes. Rebel Wolves says later installments will bring new stories and characters.', 'No cast list or specific future game has been announced.', sources.saga]
  ],
  'technical-guides': [
    ['was-dawnwalker-combat-motion-captured', 'Was Dawnwalker combat motion-captured?', 'Yes. A large portion of the combat was shot in motion capture.', 'Animators then adjusted the footage to match the game’s mood and direction.', sources.sword],
    ['is-combat-a-hema-simulation', 'Is Dawnwalker combat a one-to-one HEMA simulation?', 'No. Historical European Martial Arts and other materials inspired it, but strict reconstruction was not the goal.', 'The references support authenticity while the system remains a playable action RPG.', sources.sword],
    ['why-do-attacks-have-anticipation-frames', 'Why do sword attacks include anticipation frames?', 'They help make attacks readable before the swing completes.', 'Together with windup and swing frames, they balance accessibility, agility, and tactical timing.', sources.sword],
    ['do-omni-controls-remove-directional-depth', 'Do omni controls remove directional combat depth?', 'No. Omni inputs are optional and the full manual directional system remains available.', 'Players can choose the approach that fits their preferences.', sources.sword],
    ['does-sword-type-affect-attack-speed', 'Does sword type affect attack speed?', 'Yes. Short, long, and great swords are stated to affect how quickly Coen attacks.', 'Exact speeds and comparative damage values have not been published.', sources.sword],
    ['were-mocap-animations-used-unchanged', 'Were motion-captured combat animations used unchanged?', 'No. Animators adjusted the captured material for the game’s tone and direction.', 'The process combines physical reference with authored animation work.', sources.sword],
    ['is-combat-designed-for-newcomers', 'Is Dawnwalker sword combat designed to be approachable for newcomers?', 'Yes. The developers describe the final system as approachable while retaining mastery depth.', 'Omni controls and readable attack phases are part of that balance.', sources.sword]
  ],
  'faq-guides': [
    ['what-sword-types-are-confirmed', 'What sword types are confirmed in The Blood of Dawnwalker?', 'Short swords, long swords, and great swords.', 'The categories feel different and affect attack speed.', sources.sword],
    ['are-axes-confirmed-weapons', 'Are axes confirmed weapons in Dawnwalker?', 'Yes. Developers say players will be able to pick up axes.', 'The complete axe roster and progression details are not published.', sources.sword],
    ['are-there-weapons-beyond-swords', 'Are there weapons besides swords in Dawnwalker?', 'Yes. Axes and other weapons are confirmed beyond the three main sword families.', 'A pickaxe is only teased with tentative wording.', sources.sword],
    ['can-coen-fight-with-claws', 'Can Coen fight with claws as well as weapons?', 'Yes. His newly acquired razor-sharp claws remain part of his arsenal.', 'They belong to his vampire side and complement human swordplay.', sources.sword],
    ['can-coen-combine-swords-and-magic', 'Does Coen have both sword skills and magic?', 'Yes. The official update lists sword, claws, and bodily magic as parts of his broader arsenal.', 'Day and night still change which abilities are available.', sources.sword],
    ['is-progression-more-than-stat-increases', 'Is combat progression more than numerical stat increases?', 'Yes. The developers emphasize developing an individual fighting style.', 'Books, abilities, and passive perks support different tactical approaches.', sources.sword]
  ],
  'updates-guides': [
    ['when-was-bulletin-10-published', 'When was Dawnwalker Community Bulletin #10 published?', 'July 29, 2026.', 'Bandai Namco titles the update “Swordmastery.”', sources.sword],
    ['what-is-bulletin-10-about', 'What is Community Bulletin #10 about?', 'It is an official deep dive into sword combat, animation, progression, and weapon types.', 'It also answers a community question about non-sword weapons.', sources.sword],
    ['what-community-question-does-bulletin-10-answer', 'What community question does Bulletin #10 answer?', 'It asks whether the game has weapon types outside swords.', 'The answer names axes, other pickups, and tentatively a pickaxe.', sources.sword],
    ['did-xbox-announce-dawnwalker-for-gamescom', 'Did Xbox announce Dawnwalker for Gamescom 2026?', 'Yes. The July 28 Xbox event post includes the game in its Gamescom lineup.', 'The post should not be overread as confirmation of a downloadable public demo.', sources.gamescom],
    ['what-did-sgf-2026-saga-teaser-show', 'What did the Summer Game Fest 2026 Dawnwalker saga teaser show?', 'It showed Coen in a modern, 21st-century setting.', 'The image previews the franchise’s future direction rather than the first game’s playable period.', sources.saga],
    ['where-can-official-sgf-trailers-be-watched', 'Where can the official Summer Game Fest Dawnwalker trailers be watched?', 'Bandai Namco directs viewers to the official Dawnwalker YouTube channel.', 'The publisher’s June recap also summarizes what each trailer establishes.', sources.saga],
    ['is-bulletin-10-newer-than-family-bulletin', 'Is Bulletin #10 newer than the Coen family bulletin?', 'Yes. Bulletin #10 was published July 29, after Bulletin #9 on June 30.', 'The newer update focuses on swordmastery rather than family profiles.', sources.sword]
  ]
};

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
function ads() {
  return '<meta name="google-adsense-account" content="ca-pub-9505220977121599" /><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>';
}
function menu(depth = '../../') {
  return `<header class="site-header"><a class="brand" href="${depth}"><span class="brand-mark">BD</span><span><strong>Blood of Dawnwalker</strong><small>Guide &amp; Wiki</small></span></a><nav aria-label="Main navigation"><a href="${depth}release-guides/">Release</a><a href="${depth}gameplay-guides/">Gameplay</a><a href="${depth}walkthrough-guides/">Walkthrough</a><a href="${depth}story-guides/">Story</a><a href="${depth}technical-guides/">Technical</a><a href="${depth}faq/">FAQ</a><a href="${depth}updates-guides/">Updates</a><!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 English</summary><div class="language-options"><a href="${siteUrl}/" lang="en" aria-current="page">English</a><a href="${siteUrl}/de/" lang="de">Deutsch</a><a href="${siteUrl}/es/" lang="es-ES">Español (España)</a><a href="${siteUrl}/fr/" lang="fr">Français</a><a href="${siteUrl}/it/" lang="it">Italiano</a><a href="${siteUrl}/pl/" lang="pl">Polski</a><a href="${siteUrl}/zh-hans/" lang="zh-Hans">简体中文</a><a href="${siteUrl}/zh-hant/" lang="zh-Hant">繁體中文</a><a href="${siteUrl}/ja/" lang="ja">日本語</a><a href="${siteUrl}/ko/" lang="ko">한국어</a><a href="${siteUrl}/cs/" lang="cs">Čeština</a><a href="${siteUrl}/hu/" lang="hu">Magyar</a><a href="${siteUrl}/pt-br/" lang="pt-BR">Português (Brasil)</a><a href="${siteUrl}/es-419/" lang="es-419">Español (Latinoamérica)</a><a href="${siteUrl}/tr/" lang="tr">Türkçe</a></div></details><!-- LANG-DROPDOWN:END --></nav></header>`;
}
function write(file, html) {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, html);
}
function addSection(file, marker, section) {
  let html = fs.readFileSync(file, 'utf8');
  const re = new RegExp(`<section[^>]+data-${marker}="true"[\\s\\S]*?<\\/section>`);
  html = html.replace(re, '').replace('</main>', `${section}</main>`);
  fs.writeFileSync(file, html);
}
function sitemapUrls(file) {
  return [...fs.readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
}
function renderSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(urls)].sort().map(url => `  <url><loc>${url}</loc><lastmod>${checked}</lastmod></url>`).join('\n')}\n</urlset>\n`;
}
function visibleText(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const allNews = Object.values(news).flat();
const allFaq = Object.values(faq).flat();
if (allNews.length !== 35) throw new Error(`Expected 35 news, got ${allNews.length}`);
if (allFaq.length !== 50) throw new Error(`Expected 50 FAQ, got ${allFaq.length}`);
if (new Set(allNews.map(item => item[0])).size !== 35) throw new Error('Duplicate news slug');
if (new Set(allFaq.map(item => item[0])).size !== 50) throw new Error('Duplicate FAQ slug');

function build(root) {
  for (const [tab, items] of Object.entries(news)) {
    const label = tabs[tab];
    for (const [slug, title, summary, source] of items) {
      const file = path.join(root, 'news', slug, 'index.html');
      if (fs.existsSync(file)) throw new Error(`Existing news slug: ${slug}`);
      const url = `${siteUrl}/news/${slug}/`;
      const schema = {'@context':'https://schema.org','@type':'NewsArticle',headline:title,description:summary,datePublished:checked,dateModified:checked,mainEntityOfPage:url,author:{'@type':'Organization',name:'Blood of Dawnwalker Guide'},publisher:{'@type':'Organization',name:'Blood of Dawnwalker Guide'},about:{'@type':'VideoGame',name:'The Blood of Dawnwalker'}};
      write(file, `<!doctype html><html lang="en"><head>${ads()}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${esc(title)} | Dawnwalker News</title><meta name="description" content="${esc(summary)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${url}" /><meta property="og:type" content="article" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(summary)}" /><meta property="og:url" content="${url}" /><script type="application/ld+json">${JSON.stringify(schema)}</script><link rel="stylesheet" href="../../styles.css" /></head><body>${menu()}<main class="article-main"><section class="article-hero"><div><p class="eyebrow">${label} News · July 31, 2026</p><h1>${esc(title)}</h1><p class="hero-copy">${esc(summary)}</p><div class="article-meta"><span class="tag confirmed">Primary-source checked</span><span class="tag">Round 23</span></div></div></section><div class="article-body"><article class="article-content"><section class="verification-box"><h2>Confirmed Update</h2><p><strong>${esc(summary)}</strong></p></section><section><h2>What the Official Source Establishes</h2><p>The linked official publisher, platform, or storefront page directly supports this update. This report isolates one decision-relevant fact so players can find it without mixing confirmed information with rumors, inferred launch-build details, or unrelated announcement material.</p><p>The evidence was checked on July 31, 2026. Where the source uses tentative language, this page keeps the same limit instead of turning a tease into a guarantee.</p></section><section><h2>Why This Matters</h2><p>${esc(summary)} That point can affect purchase planning, route preparation, build expectations, lore interpretation, or the way a player reads the newest development update. It should not be used to invent exact damage values, quest steps, release-time tuning, or unannounced content.</p></section><section><h2>Verification Boundary</h2><p>This is a pre-release evidence page. It records what the source states today and separates that statement from details that still require the final game, a platform listing, or a later developer clarification. The page will be updated if the official information changes.</p></section><section><h2>Source and Related Coverage</h2><p><a href="${source}" target="_blank" rel="noreferrer">Read the primary source</a>. Continue with the <a href="../../${tab}/">${label} hub</a>, the <a href="../../news/">news index</a>, or the related FAQ pages linked from the hub.</p></section></article><aside class="article-aside"><h2>At a Glance</h2><p>${esc(summary)}</p><a href="../../${tab}/">${label} guides</a><a href="../../faq/">FAQ</a></aside></div></main></body></html>`);
    }
    const cards = items.map(([slug, title, summary]) => `<a class="cluster-link" href="../news/${slug}/"><strong>${esc(title)}</strong><span>${esc(summary)}</span></a>`).join('');
    addSection(path.join(root, tab, 'index.html'), 'round23-news', `<section class="cluster-index" data-round23-news="true"><div class="section-heading"><p class="eyebrow">News Expansion · July 31</p><h2>Five New ${label} News Reports</h2><p>Five source-checked reports with independent URLs, direct answers, evidence boundaries, and related navigation.</p></div><div class="cluster-grid">${cards}</div></section>`);
  }

  const newsSections = Object.entries(news).map(([tab, items]) => `<section><h2>${tabs[tab]} News · Round 23</h2><div class="related-grid">${items.map(([slug, title, summary]) => `<a href="./${slug}/"><strong>${esc(title)}</strong><span>${esc(summary)}</span></a>`).join('')}</div></section>`).join('');
  let newsIndex = fs.readFileSync(path.join(root, 'news', 'index.html'), 'utf8');
  newsIndex = newsIndex.replace(/<!-- ROUND23-NEWS-INDEX:START -->[\s\S]*?<!-- ROUND23-NEWS-INDEX:END -->/, '').replace('</article>', `<!-- ROUND23-NEWS-INDEX:START --><div data-round23-news-index="true"><h2>35 New Source-Checked Reports · Round 23</h2><p>Each of the seven navigation topics receives five additional independent NewsArticle URLs.</p>${newsSections}</div><!-- ROUND23-NEWS-INDEX:END --></article>`);
  fs.writeFileSync(path.join(root, 'news', 'index.html'), newsIndex);

  for (const [tab, items] of Object.entries(faq)) {
    const label = tabs[tab];
    for (const [slug, question, answer, detail, source] of items) {
      const file = path.join(root, 'faq', slug, 'index.html');
      if (fs.existsSync(file)) throw new Error(`Existing FAQ slug: ${slug}`);
      const url = `${siteUrl}/faq/${slug}/`;
      const schema = {'@context':'https://schema.org','@type':'FAQPage',url,mainEntity:[{'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:`${answer} ${detail}`}}]};
      write(file, `<!doctype html><html lang="en"><head>${ads()}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${esc(question)} | Dawnwalker FAQ</title><meta name="description" content="${esc(`${answer} ${detail}`)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${url}" /><script type="application/ld+json">${JSON.stringify(schema)}</script><link rel="stylesheet" href="../../styles.css" /></head><body>${menu()}<main class="article-main"><section class="article-hero"><div><p class="eyebrow">${label} FAQ · Verified July 31, 2026</p><h1>${esc(question)}</h1><p class="hero-copy">${esc(answer)}</p><div class="article-meta"><span class="tag confirmed">Direct answer</span><span class="tag">Independent FAQ URL</span></div></div></section><div class="article-body"><article class="article-content"><section class="verification-box"><h2>Quick Answer</h2><p><strong>${esc(answer)}</strong> ${esc(detail)}</p></section><section><h2>Evidence and Context</h2><p>The answer is grounded in the linked official publisher, platform, or storefront material and was checked on July 31, 2026. ${esc(detail)}</p><p>This page preserves the source’s level of certainty. Confirmed facts are stated directly; tentative language, missing figures, and unrevealed launch-build details remain clearly limited.</p></section><section><h2>What Players Should Take From It</h2><p>${esc(answer)} Use that confirmed point for the relevant purchase, combat, progression, story, technical, or update decision. Do not infer exact quest outcomes, numerical tuning, item locations, or platform features that the source does not publish.</p></section><section><h2>Related Decision</h2><p>The broader <a href="../../${tab}/">${label} hub</a> connects this answer to adjacent reports and guides. That structure keeps this URL focused on one search intent while still giving players a path to the wider topic.</p></section><section><h2>Primary Source</h2><p><a href="${source}" target="_blank" rel="noreferrer">Open the official source used for this answer</a>. You can also return to the <a href="../">complete FAQ index</a>.</p></section><section id="page-faq"><h2>FAQ</h2><dl class="faq-list"><div><dt>${esc(question)}</dt><dd>${esc(answer)} ${esc(detail)}</dd></div></dl></section></article><aside class="article-aside"><h2>At a Glance</h2><p>${esc(answer)}</p><a href="../../${tab}/">${label} guides</a><a href="../">All FAQ</a></aside></div></main></body></html>`);
    }
    const cards = items.map(([slug, question, answer]) => `<a class="cluster-link" href="../faq/${slug}/"><strong>${esc(question)}</strong><span>${esc(answer)}</span></a>`).join('');
    addSection(path.join(root, tab, 'index.html'), 'round23-faq', `<section class="cluster-index" data-round23-faq="true"><div class="section-heading"><p class="eyebrow">FAQ Expansion · July 31</p><h2>New ${label} FAQ Detail Pages</h2><p>Direct access to this topic’s new source-checked FAQ URLs.</p></div><div class="cluster-grid">${cards}</div></section>`);
  }

  const faqCards = allFaq.map(([slug, question, answer]) => `<a class="cluster-link" href="./${slug}/"><strong>${esc(question)}</strong><span>${esc(answer)}</span></a>`).join('');
  addSection(path.join(root, 'faq', 'index.html'), 'round23-faq-index', `<section class="cluster-index" data-round23-faq-index="true"><div class="section-heading"><p class="eyebrow">50 New Independent URLs</p><h2>Round 23 Source-Checked FAQ Detail Pages</h2><p>Each question has a unique intent, direct answer, self-referencing canonical, FAQ schema, primary source, and related hub path.</p></div><div class="cluster-grid">${faqCards}</div></section>`);

  const newUrls = [
    ...allNews.map(([slug]) => `${siteUrl}/news/${slug}/`),
    ...allFaq.map(([slug]) => `${siteUrl}/faq/${slug}/`)
  ];
  const enMap = path.join(root, 'sitemap-en.xml');
  fs.writeFileSync(enMap, renderSitemap([...sitemapUrls(enMap), ...newUrls]));
  const all = [];
  for (const name of fs.readdirSync(root).filter(name => /^sitemap-(en|de|es|fr|it|pl|zh-hans|zh-hant|ja|ko|cs|hu|pt-br|es-419|tr)\.xml$/.test(name))) {
    all.push(...sitemapUrls(path.join(root, name)));
  }
  fs.writeFileSync(path.join(root, 'sitemap.xml'), renderSitemap(all));

  for (const [slug] of allNews) {
    const html = fs.readFileSync(path.join(root, 'news', slug, 'index.html'), 'utf8');
    if (visibleText(html).split(/\s+/).length < 220) throw new Error(`Thin news page: ${slug}`);
  }
  for (const [slug] of allFaq) {
    const html = fs.readFileSync(path.join(root, 'faq', slug, 'index.html'), 'utf8');
    if (visibleText(html).split(/\s+/).length < 220) throw new Error(`Thin FAQ page: ${slug}`);
  }
}

build(project);
build(path.join(project, 'site'));

const report = `# Round 23 Navigation News and FAQ Expansion

- Checked: ${checked}
- Navigation hubs updated: 7
- New NewsArticle URLs: 35 (five per hub)
- New independent FAQ URLs: 50
- Net new indexable URLs: 85
- Primary new evidence: Community Bulletin #10 – Swordmastery
- Supporting evidence: Bandai Namco, PlayStation Blog, Xbox Wire, Steam
- Root and site mirror updated together
`;
fs.writeFileSync(path.join(project, 'ROUND_23_NEWS_FAQ_REPORT.md'), report);
fs.writeFileSync(path.join(project, 'site', 'ROUND_23_NEWS_FAQ_REPORT.md'), report);
console.log(JSON.stringify({news: allNews.length, faq: allFaq.length, newUrls: 85, roots: 2}, null, 2));
