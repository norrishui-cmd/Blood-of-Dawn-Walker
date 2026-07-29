const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const site = 'https://bloodofdawnwalker.cc';
const checked = '2026-07-29';
const sources = {
  ps: 'https://blog.playstation.com/2026/07/07/the-blood-of-dawnwalker-unique-time-driven-quest-system-and-player-choice-detailed/',
  xbox: 'https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/',
  gameplay: 'https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap',
  world: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-6-creating-world',
  beasts: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-7-beasts-monstrosities-illustrated',
  people: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-8-forging-connections',
  roots: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-9-coens-roots',
  steam: 'https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/',
  eclipse: 'https://www.xbox.com/en-US/games/store/the-blood-of-dawnwalker-eclipse-edition-content/9N896F4CP4ZR'
};
const tabs = {
  'release-guides': ['Release', '../release-guides/'],
  'gameplay-guides': ['Gameplay', '../gameplay-guides/'],
  'walkthrough-guides': ['Walkthrough', '../walkthrough-guides/'],
  'story-guides': ['Story', '../story-guides/'],
  'technical-guides': ['Technical', '../technical-guides/'],
  'faq-guides': ['FAQ', '../faq-guides/'],
  'updates-guides': ['Updates', '../updates-guides/']
};
const news = {
  'release-guides': [
    ['eclipse-content-xbox-pc-listing','Eclipse Edition Content Lists Xbox Series and PC Compatibility','The official Xbox add-on listing says the digital compendium, soundtrack, and comic work with Xbox Series X|S and PC.',sources.eclipse],
    ['eclipse-content-requires-base-game','Eclipse Digital Extras Are Listed as Content Requiring the Base Game','The storefront separates the Eclipse media package from the game and marks the base game as required.',sources.eclipse],
    ['mature-17-content-descriptors','Xbox Store Publishes Dawnwalker’s Mature 17+ Content Descriptors','The US listing cites intense violence, blood and gore, strong sexual content, nudity, and strong language.',sources.eclipse],
    ['ps5-september-3-confirmation','PlayStation Reconfirms the September 3 PS5 Launch','The July PlayStation feature closes with a direct September 3, 2026 release confirmation for PS5.',sources.ps],
    ['xbox-preorder-base-price','Xbox Preview Links the $69.99 Base-Game Preorder','Xbox Wire’s July hands-on page embeds the official US base-game preorder listing and price.',sources.xbox]
  ],
  'gameplay-guides': [
    ['rats-confirmed-blood-source','Rats and Small Mammals Can Restore Vampire Coen’s Blood','The four-hour Xbox preview confirms that vampire Coen can top off his blood supply using rats and other small mammals.',sources.xbox],
    ['feeding-animation-has-no-immunity','Feeding Does Not Make Coen Invulnerable','The preview build left Coen exposed during a bite, making position and nearby enemies important.',sources.xbox],
    ['human-blood-magic-skill-tree','Human Coen Has a Blood-Magic Skill Tree','Anca teaches Coen blood magic that supports investigation, traversal, and direct-damage applications.',sources.xbox],
    ['compel-soul-dead-investigation','Compel Soul Can Extract Information from the Dead','Official gameplay material identifies Compel Soul as a non-combat spell used to learn secrets from corpses.',sources.gameplay],
    ['region-difficulty-locks-on-entry','Regional Difficulty Locks After the First Visit','Each area uses a level-dependent range when first entered and then retains the resulting difficulty.',sources.gameplay]
  ],
  'walkthrough-guides': [
    ['fishing-quest-spends-time','Helping Coen’s Siblings Fish Spends Time Units','The preview shows accepting the river trip and helping set the lines advancing the prologue clock.',sources.xbox],
    ['anca-latin-lesson-spends-time','Staying for Anca’s Latin Lesson Uses Prologue Time','The July hands-on describes the optional lesson as part of the player’s limited first-day schedule.',sources.xbox],
    ['stolen-tapestry-weaver-route','The Prologue Includes a Stolen-Tapestry Route to Help the Weaver','PlayStation’s official feature lists saving the weaver among the competing first-day choices.',sources.ps],
    ['midnight-mass-reacts-to-choices','The Midnight Mass Can Change with First-Day Choices','Xbox Wire reports that the prologue’s mass can unfold in several ways based on how Coen spends the day.',sources.xbox],
    ['skill-point-can-cost-time','Assigning Some Skill Points Can Consume a Time Unit','The hands-on preview confirms that progression itself can sometimes spend the narrative clock.',sources.xbox]
  ],
  'story-guides': [
    ['marat-rebellion-leader','Marat Leads the Rebellion Against the Vrakhiri','The relationship bulletin describes a charismatic but guarded leader whose trust Coen must earn.',sources.people],
    ['lacra-vengeance-agenda','Lacra Is Driven by Vengeance and Keeps Her Own Agenda','Official character material frames Lacra as a possible connection whose history depends on player actions.',sources.people],
    ['yanna-cares-for-siblings','Yanna Keeps Coen’s Younger Siblings Together','Coen’s family bulletin identifies Yanna as the second-oldest child and a determined caretaker.',sources.roots],
    ['mirto-family-pressure','Mirto Becomes Restless as the Family Fractures','The official family profile describes how his parents’ decline changes the once-quiet child.',sources.roots],
    ['brencis-chose-coen-as-scion','Brencis Chose Coen to Turn Him Against Laslea','PlayStation’s prologue account says Brencis intended a familiar face to become a weapon against the village.',sources.ps]
  ],
  'technical-guides': [
    ['combat-not-animation-locked','Dawnwalker Combat Is Not Animation-Locked','The official recap says attacks can change direction quickly and offense can switch to defense during fast exchanges.',sources.gameplay],
    ['map-visible-from-start','The Whole World Map Is Visible from the Start','Players can see the map immediately, while activities and their details still have to be discovered.',sources.gameplay],
    ['activity-markers-reveal-without-details','New Regions Reveal Activity Markers Without Spoiling Their Contents','Entering an area exposes possible activity locations but leaves their identity for clues or exploration.',sources.gameplay],
    ['southern-regions-harder','Challenges Generally Become Harder Farther South','The official traversal breakdown gives players a broad geographic difficulty signal for route planning.',sources.gameplay],
    ['magic-items-have-rarity','Magical Rings and Amulets Use Rarity Indicators','Official magic notes confirm stat-augmenting jewelry with visible rarity information.',sources.gameplay]
  ],
  'faq-guides': [
    ['other-romance-options-confirmed','Developers Confirm More Than One Romance Option','The Xbox preview says developers confirmed other romance options beyond the chemistry shown with Anca.',sources.xbox],
    ['vampire-healing-uses-blood','Vampire Coen Heals with Blood Instead of Food','The playable prologue changed healing rules after Coen’s transformation.',sources.xbox],
    ['nearby-enemies-react-to-feeding','Nearby Enemies Can Interrupt a Feeding Attempt','A guard’s allies attacked during the bite animation in the preview build.',sources.xbox],
    ['only-one-true-city','Svartrau Is the Only True City in Vale Sangora','Official exploration notes distinguish the capital from villages and other settlements.',sources.gameplay],
    ['fast-travel-uses-world-map','Fast Travel Is Accessed Through the World Map','The gameplay recap directly confirms map-based fast travel and no horse for Coen.',sources.gameplay]
  ],
  'updates-guides': [
    ['bulletin-6-world-weather','Bulletin #6 Confirms Dynamic Weather and Fog Visibility','The April world-building update says weather changes dynamically and fog makes it harder to see.',sources.world],
    ['bulletin-8-marat-lacra-anca','Bulletin #8 Introduces Marat, Lacra, and Anca’s Relationship Roles','The June connections update explains how trust and choice can open paths or expose hidden truths.',sources.people],
    ['bulletin-9-family-profiles','Bulletin #9 Expands Coen’s Family Profiles','The latest family bulletin adds Pieter, Yanna, Mirto, Lunka, and the parents’ worsening condition.',sources.roots],
    ['july-preview-four-hours','Xbox Wire Publishes a Four-Hour Prologue Hands-On','The controlled media preview adds first-hand detail on time costs, healing, skills, and narrative reactivity.',sources.xbox],
    ['playstation-first-day-choice-feature','PlayStation Details the Eight-Part First Day in Laslea','The official July feature maps several mutually competing prologue activities before the Blood Mass.',sources.ps]
  ]
};

const faq = {
  'release-guides': [
    ['does-eclipse-content-require-the-game','Does the Eclipse Edition Content add-on require the base game?','Yes. The official Xbox listing labels the Eclipse content as requiring The Blood of Dawnwalker, which is sold separately.','It is a digital extras package rather than a standalone playable product.',sources.eclipse],
    ['does-eclipse-content-work-on-pc-and-xbox','Does the Xbox Eclipse content listing support both PC and Xbox Series X|S?','Yes. The official listing names PC and Xbox Series X|S under “Play with.”','This matches its Xbox Play Anywhere positioning, but the user must own the appropriate license.',sources.eclipse],
    ['what-mature-rating-descriptors-are-listed','Which Mature 17+ content descriptors are listed for Dawnwalker?','The US Xbox page lists intense violence, blood and gore, strong sexual content, nudity, and strong language.','These descriptors explain the Mature 17+ label more precisely than the age number alone.',sources.eclipse],
    ['is-the-eclipse-world-compendium-digital','Is the Eclipse Edition world compendium digital?','Yes. The Eclipse content listing explicitly calls it a Digital World Compendium.','The physical Collector’s Edition has a separate hardcover compendium, so buyers should not treat the two as the same item.',sources.eclipse],
    ['does-the-eclipse-compendium-contain-concept-art','Does the Eclipse digital compendium include concept art?','Yes. The official description presents the package as a behind-the-scenes look containing concept art.','It is bundled with the digital soundtrack and exclusive digital comic.',sources.eclipse],
    ['is-the-eclipse-comic-book-exclusive','Is the Eclipse Edition comic book described as exclusive?','Yes. The Xbox description calls it an exclusive comic book included in the Eclipse content package.','The listing does not describe it as story DLC or an early-access chapter.',sources.eclipse]
  ],
  'gameplay-guides': [
    ['can-coen-feed-on-rats','Can vampire Coen feed on rats?','Yes. The July Xbox preview says he can top off with rats and other small mammals.','That gives the player a low-profile blood source in addition to larger animals and people.',sources.xbox],
    ['is-coen-invulnerable-while-feeding','Is Coen invulnerable during the feeding animation?','No. In the preview build, enemies could damage and kill him while he was biting a target.','Feeding in a crowd is therefore a positioning risk rather than a guaranteed combat reset.',sources.xbox],
    ['does-food-heal-vampire-coen','Does ordinary food heal vampire Coen?','No. The playable preview states that after turning, Coen no longer heals from food and restores himself with blood.','This is one of the mechanical differences between his human and vampire states.',sources.xbox],
    ['can-human-coen-learn-blood-magic','Can human Coen learn blood magic?','Yes. Anca teaches him blood magic near the end of the prologue, and it has its own skill tree.','The preview shows it supporting investigation, movement, and combat rather than only damage.',sources.xbox],
    ['can-compel-soul-question-the-dead','Can Compel Soul obtain information from dead characters?','Yes. Official gameplay notes identify it as a spell for gathering information or learning secrets from the dead.','The exact targets and quest checks depend on the situation, but the investigative function is confirmed.',sources.gameplay],
    ['why-do-magic-users-carve-runes-into-skin','Why do Dawnwalker magic users carve runes into their skin?','The runes open a gate that allows magic to flow through the practitioner.','Official lore says the formula must be performed correctly because mistakes can be fatal.',sources.gameplay],
    ['do-coens-runes-work-at-night','Do Coen’s carved runes work at night?','No. His runic scars seal over at night, making the human spellcasting method inert.','Vampire Coen instead channels supernatural power instinctively.',sources.gameplay],
    ['does-feeding-alert-nearby-enemies','Does feeding alert or provoke nearby enemies?','It can. Xbox Wire’s previewer was attacked by a guard’s allies while feeding too close to the squad.','The encounter demonstrates that target isolation matters even after Coen starts the bite.',sources.xbox],
    ['when-does-region-difficulty-lock','When does a region’s difficulty become fixed?','The game sets a region within its permitted range when the player first enters it, then keeps that result for the rest of the game.','This prevents every previously visited area from continually rescaling.',sources.gameplay],
    ['can-coen-use-blood-magic-for-traversal','Can human blood magic help with traversal?','Yes. The hands-on preview mentions a faster-running application in addition to investigation and direct-damage spells.','Human magic is therefore not limited to combat encounters.',sources.xbox]
  ],
  'walkthrough-guides': [
    ['does-accepting-the-fishing-trip-spend-time','Does accepting the siblings’ fishing trip spend time?','Yes. The July preview says accepting the river trip moved the clock forward.','Helping set up the fishing lines later consumed another part of the limited first day.',sources.xbox],
    ['does-the-latin-lesson-use-time','Does staying for Anca’s Latin lesson use prologue time?','Yes. The optional lesson is described as taking longer than planned within the first-day schedule.','It competes with other activities before the fixed evening Blood Mass.',sources.xbox],
    ['can-coen-help-find-a-lost-pig','Can Coen help a neighbor find a lost pig?','Yes. Both official first-day coverage and the hands-on preview include the missing-pig activity.','The previewer then chose to help butcher it, creating dialogue reactivity later that day.',sources.xbox],
    ['can-coen-save-the-weaver','Can Coen save the weaver during the Laslea prologue?','Yes. PlayStation’s official feature lists searching for a stolen vrakhiri tapestry as a route that can save the weaver.','It is one of several competing activities, so taking it has an opportunity cost.',sources.ps],
    ['can-coen-punch-an-uriash','Can Coen punch an uriash in the prologue?','Yes. The PlayStation feature explicitly presents confronting a giant ram-like uriash as one possible first-day choice.','It illustrates the prologue’s freedom, not a required objective.',sources.ps],
    ['can-the-prologue-start-a-rebellion','Can Coen uncover the beginning of a rebellion in the prologue?','Yes. The official PlayStation account lists discovering the start of a revolution among Laslea’s possible first-day threads.','Following it competes with family, village, and personal activities for time.',sources.ps],
    ['does-the-midnight-mass-change-with-choices','Can the midnight Blood Mass change based on earlier choices?','Yes. Xbox Wire reports that it can unfold in several ways depending on how Coen spends the preceding day.','The event still arrives at its fixed time, but its context and reactions can differ.',sources.xbox],
    ['can-every-blood-mass-outcome-be-prevented','Can every bad outcome at the Blood Mass be prevented?','No. PlayStation’s official narrative explains that some events have their own momentum and cannot be stopped by any combination of actions or dialogue.','Choice changes the route without granting total control over every character.',sources.ps]
  ],
  'story-guides': [
    ['who-is-marat','Who is Marat in The Blood of Dawnwalker?','Marat is the courageous, charismatic leader of a rebellion opposing the vrakhiri.','He is wary of betrayal and requires Coen to prove his worth before granting trust.',sources.people],
    ['who-is-lacra','Who is Lacra in The Blood of Dawnwalker?','Lacra is a mysterious woman driven by vengeance and pursuing an agenda of her own.','Player actions may persuade her to reveal pieces of her past and intentions.',sources.people],
    ['how-does-coen-earn-marats-trust','How does Coen earn Marat’s trust?','Official character material says Coen must prove his worth and push beyond his limits.','The precise quest checks are not published, but trust is presented as earned rather than automatic.',sources.people],
    ['who-is-pieter','Who is Pieter in Coen’s family?','Pieter is one of Coen’s siblings and one of the older children who can be away from home with Coen.','The family profile places him above Yanna, Mirto, and Lunka in the household structure.',sources.roots],
    ['who-is-yanna','Who is Yanna in The Blood of Dawnwalker?','Yanna is Coen’s second-oldest younger sibling and a determined caretaker for Mirto and Lunka.','She takes responsibility when Coen and Pieter are away.',sources.roots],
    ['who-is-mirto','Who is Mirto in Coen’s family?','Mirto is one of Coen’s younger siblings, a once-quiet child becoming restless as the household breaks down.','Yanna tries to reassure herself that his behavior is only a phase.',sources.roots],
    ['what-happens-to-esme-after-brencis-takes-power','What happens to Coen’s mother after Brencis takes power?','Her condition deteriorates: she struggles to speak, eat, sleep, or hold herself upright under fear.','The family’s worsening state supplies the emotional context for the prologue choices.',sources.roots],
    ['why-does-brencis-turn-coen','Why does Brencis choose to turn Coen?','Brencis intends to use a familiar villager as a weapon against Coen’s friends, family, and neighbors.','Coen’s incomplete transformation instead leaves him human by day and vampiric by night.',sources.ps],
    ['how-often-is-the-blood-offering-collected','How often does Brencis demand a blood offering from villagers?','The PlayStation prologue feature describes the population being bled every fortnight.','The Blood Mass is the public mechanism enforcing that rule in Laslea.',sources.ps]
  ],
  'technical-guides': [
    ['is-dawnwalker-combat-animation-locked','Is Dawnwalker combat animation-locked?','No. The official combat overview says the system is fast and not animation-locked.','Players can redirect attacks and move between offense and defense responsively.',sources.gameplay],
    ['is-the-entire-map-visible-at-the-start','Is the entire Dawnwalker world map visible from the start?','Yes. The overall map is visible immediately, but important activities must still be found before their details appear.','Visibility of geography does not equal automatic completion markers.',sources.gameplay],
    ['what-happens-when-entering-a-new-map-area','What appears on the map when Coen enters a new area?','Indicators for activities in that area are revealed without telling the player exactly what each activity is.','Clues, local information, or direct travel reveal the missing details.',sources.gameplay],
    ['are-southern-regions-more-difficult','Are southern regions generally more difficult?','Yes. The official exploration notes say challenge generally increases the farther south the player travels.','Individual regions still use their own minimum and maximum difficulty ranges.',sources.gameplay],
    ['is-svartrau-the-only-city','Is Svartrau the only city in Vale Sangora?','Yes. Official world notes call it the only true city, while the rest of the map also contains villages and settlements.','Svartrau consequently has the widest selection of specialized merchants.',sources.gameplay],
    ['do-rings-and-amulets-have-rarity-levels','Do magical rings and amulets have rarity indicators?','Yes. Official magic notes say these items can augment statistics and display rarity to indicate value.','This confirms an equipment-quality signal without inventing the final rarity tiers.',sources.gameplay]
  ],
  'faq-guides': [
    ['are-there-multiple-romance-options','Are there multiple romance options in Dawnwalker?','Yes. During the July hands-on interview, developers confirmed other romance options beyond the chemistry shown with Anca.','The complete candidate list and requirements remain part of the unrevealed game content.',sources.xbox],
    ['can-coen-join-the-revolution','Can Coen choose to join the revolution?','Yes. Official narrative framing explicitly includes joining the revolution among the paths Coen can pursue.','The game also allows revenge-focused and more self-interested routes.',sources.ps],
    ['can-relationships-open-new-paths','Can relationships open new paths in Dawnwalker?','Yes. The official connections bulletin says trust, influence, and choice can reveal hidden truths and open routes.','Supporting characters are designed to affect Coen’s story rather than exist only as background.',sources.people],
    ['are-uriashi-always-hostile','Are uriashi always hostile to Coen?','No. The Xbox preview includes an uriash who is more sympathetic than the human soldier beside him.','That scene establishes uriashi as intelligent characters rather than a uniformly hostile monster type.',sources.xbox],
    ['can-coen-heal-with-small-mammals','Can Coen restore blood from small mammals?','Yes. Rats and other small mammals can top off vampire Coen’s blood supply.','Using them can reduce the immediate need to feed on a person.',sources.xbox]
  ],
  'updates-guides': [
    ['what-did-bulletin-6-confirm','What did Dawnwalker Community Bulletin #6 confirm?','It expanded Vale Sangora’s biomes, introduced Anca as an expert herbalist, and confirmed dynamic weather that affects visibility.','Fog is the official example of weather making exploration harder.',sources.world],
    ['what-did-bulletin-8-reveal','What did Community Bulletin #8 reveal?','It introduced Marat, Lacra, and Anca as consequential relationships and explained that trust and choice can open paths.','It also highlighted Father Florin’s diary as a record of changes in the community.',sources.people],
    ['what-did-bulletin-9-reveal','What did Community Bulletin #9 reveal?','It profiled Coen’s family, their responsibilities, and the household’s decline under Brencis.','The bulletin also clarified the healing effect of vampire blood on humans.',sources.roots],
    ['how-long-was-the-july-xbox-preview','How long was Xbox Wire’s Dawnwalker hands-on session?','The writer reports playing roughly four hours of the opening prologue.','The session included the first-day clock, the Blood Mass, Coen’s transformation, and early skill systems.',sources.xbox],
    ['what-did-the-july-playstation-feature-cover','What did the July PlayStation Dawnwalker feature cover?','It detailed Laslea’s eight-part day, competing prologue activities, the Blood Mass, Coen’s transformation, and the 30-day family deadline.','It is an official narrative-system explanation rather than a public demo announcement.',sources.ps],
    ['which-bulletin-confirmed-dynamic-weather','Which official Dawnwalker bulletin confirmed dynamic weather?','Community Bulletin #6, “Creating a World,” confirmed dynamic weather and used reduced visibility in fog as the example.','The article was published by Bandai Namco on April 10, 2026.',sources.world]
  ]
};

function esc(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function ads(){return '<meta name="google-adsense-account" content="ca-pub-9505220977121599" /><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>';}
function menu(depth='../../'){return `<header class="site-header"><a class="brand" href="${depth}"><span class="brand-mark">BD</span><span><strong>Blood of Dawnwalker</strong><small>Guide &amp; Wiki</small></span></a><nav aria-label="Main navigation"><a href="${depth}release-guides/">Release</a><a href="${depth}gameplay-guides/">Gameplay</a><a href="${depth}walkthrough-guides/">Walkthrough</a><a href="${depth}story-guides/">Story</a><a href="${depth}technical-guides/">Technical</a><a href="${depth}faq/">FAQ</a><!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 English</summary><div class="language-options"><a href="${site}/" lang="en" aria-current="page">English</a><a href="${site}/de/" lang="de">Deutsch</a><a href="${site}/es/" lang="es-ES">Español (España)</a><a href="${site}/fr/" lang="fr">Français</a><a href="${site}/it/" lang="it">Italiano</a><a href="${site}/pl/" lang="pl">Polski</a><a href="${site}/zh-hans/" lang="zh-Hans">简体中文</a><a href="${site}/zh-hant/" lang="zh-Hant">繁體中文</a><a href="${site}/ja/" lang="ja">日本語</a><a href="${site}/ko/" lang="ko">한국어</a><a href="${site}/cs/" lang="cs">Čeština</a><a href="${site}/hu/" lang="hu">Magyar</a><a href="${site}/pt-br/" lang="pt-BR">Português (Brasil)</a><a href="${site}/es-419/" lang="es-419">Español (Latinoamérica)</a><a href="${site}/tr/" lang="tr">Türkçe</a></div></details><!-- LANG-DROPDOWN:END --></nav></header>`;}
function write(file, html){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html);}
function addSection(file, marker, section){
  let html=fs.readFileSync(file,'utf8');
  const re=new RegExp(`<section[^>]+data-${marker}="true"[\\s\\S]*?<\\/section>`);
  html=html.replace(re,'').replace('</main>',`${section}</main>`);
  fs.writeFileSync(file,html);
}
function sitemapUrls(file){return [...fs.readFileSync(file,'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);}
function renderSitemap(urls){return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(urls)].sort().map(u=>`  <url><loc>${u}</loc><lastmod>${checked}</lastmod></url>`).join('\n')}\n</urlset>\n`;}

const existingQuestions=[...fs.readFileSync(path.join(root,'faq','index.html'),'utf8').matchAll(/<dt>(.*?)<\/dt>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').toLowerCase().replace(/\W/g,''));
const allNews=Object.values(news).flat(), allFaq=Object.values(faq).flat();
if(allNews.length!==35)throw new Error(`Expected 35 news, got ${allNews.length}`);
if(allFaq.length!==50)throw new Error(`Expected 50 FAQs, got ${allFaq.length}`);
for(const [,q] of allFaq){if(existingQuestions.includes(q.toLowerCase().replace(/\W/g,'')))throw new Error(`Duplicate FAQ: ${q}`);}

for(const [tab,items] of Object.entries(news)){
  const [label]=tabs[tab];
  for(const [slug,title,summary,source] of items){
    const url=`${site}/news/${slug}/`;
    const schema={'@context':'https://schema.org','@type':'NewsArticle',headline:title,description:summary,datePublished:checked,dateModified:checked,mainEntityOfPage:url,author:{'@type':'Organization',name:'Blood of Dawnwalker Guide'},publisher:{'@type':'Organization',name:'Blood of Dawnwalker Guide'},about:{'@type':'VideoGame',name:'The Blood of Dawnwalker'}};
    write(path.join(root,'news',slug,'index.html'),`<!doctype html><html lang="en"><head>${ads()}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${esc(title)} | Dawnwalker News</title><meta name="description" content="${esc(summary)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${url}" /><meta property="og:type" content="article" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(summary)}" /><meta property="og:url" content="${url}" /><script type="application/ld+json">${JSON.stringify(schema)}</script><link rel="stylesheet" href="../../styles.css" /></head><body>${menu()}<main class="article-main"><section class="article-hero"><div><p class="eyebrow">${label} News · July 29, 2026</p><h1>${esc(title)}</h1><p class="hero-copy">${esc(summary)}</p><div class="article-meta"><span class="tag confirmed">Primary-source checked</span><span class="tag">New Round 21 URL</span></div></div></section><div class="article-body"><article class="article-content"><section class="verification-box"><h2>Confirmed Update</h2><p><strong>${esc(summary)}</strong></p></section><section><h2>What the Source Establishes</h2><p>This update isolates one published fact from the broader announcement so players can find a direct answer without reading unrelated speculation. The statement comes from an official publisher, platform, or storefront page and was checked on July 29, 2026.</p></section><section><h2>Why It Matters</h2><p>For players planning a route or purchase, this detail changes a concrete decision: what content is included, how a system behaves, which risk applies, or where the information belongs in the wider guide. It is not presented as release-build testing.</p></section><section><h2>Source and Related Coverage</h2><p><a href="${source}" target="_blank" rel="noreferrer">Read the primary source</a>. Then return to the <a href="../../${tab}/">${label} hub</a> or browse the <a href="../../news/">news index</a>.</p></section></article></div></main></body></html>`);
  }
  const cards=items.map(([slug,title,summary])=>`<a class="cluster-link" href="../news/${slug}/"><strong>${esc(title)}</strong><span>${esc(summary)}</span></a>`).join('');
  addSection(path.join(root,tab,'index.html'),'round21-news',`<section class="cluster-index" data-round21-news="true"><div class="section-heading"><p class="eyebrow">News Expansion · July 29</p><h2>Five More ${label} News Reports</h2><p>Five new source-checked reports, each with an independent URL and distinct search intent.</p></div><div class="cluster-grid">${cards}</div></section>`);
}
const newNewsCards=Object.entries(news).map(([tab,items])=>`<section><h2>${tabs[tab][0]} News · Round 21</h2><div class="related-grid">${items.map(([slug,title,summary])=>`<a href="./${slug}/"><strong>${esc(title)}</strong><span>${esc(summary)}</span></a>`).join('')}</div></section>`).join('');
let newsIndex=fs.readFileSync(path.join(root,'news','index.html'),'utf8');
newsIndex=newsIndex.replace('Track 35 source-checked','Track 70 source-checked').replace('35 independent updates','70 independent updates');
newsIndex=newsIndex.replace(/<!-- ROUND21-NEWS-INDEX:START -->[\s\S]*?<!-- ROUND21-NEWS-INDEX:END -->/,'').replace('</article>',`<!-- ROUND21-NEWS-INDEX:START --><div data-round21-news-index="true"><h2>35 New Source-Checked Reports</h2><p>Round 21 adds five new independent NewsArticle URLs for each of the seven navigation topics.</p>${newNewsCards}</div><!-- ROUND21-NEWS-INDEX:END --></article>`);
fs.writeFileSync(path.join(root,'news','index.html'),newsIndex);

for(const [tab,items] of Object.entries(faq)){
  const [label]=tabs[tab];
  for(const [slug,q,a,detail,source] of items){
    const url=`${site}/faq/${slug}/`;
    const schema={'@context':'https://schema.org','@type':'FAQPage',url,mainEntity:[{'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:`${a} ${detail}`}}]};
    write(path.join(root,'faq',slug,'index.html'),`<!doctype html><html lang="en"><head>${ads()}<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${esc(q)} | Dawnwalker FAQ</title><meta name="description" content="${esc(`${a} ${detail}`)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${url}" /><script type="application/ld+json">${JSON.stringify(schema)}</script><link rel="stylesheet" href="../../styles.css" /></head><body>${menu()}<main class="article-main"><section class="article-hero"><div><p class="eyebrow">${label} FAQ · Verified July 29, 2026</p><h1>${esc(q)}</h1><p class="hero-copy">${esc(a)}</p><div class="article-meta"><span class="tag confirmed">Direct answer</span><span class="tag">Independent FAQ URL</span></div></div></section><div class="article-body"><article class="article-content"><section class="verification-box"><h2>Quick Answer</h2><p><strong>${esc(a)}</strong> ${esc(detail)}</p></section><section><h2>Evidence and Context</h2><p>The answer is grounded in the linked official publisher, platform, or storefront material. It records what the source directly establishes and avoids turning preview observations into universal launch-build rules.</p><p>${esc(detail)} This distinction gives the question one clear search intent while the related category hub provides the broader system, story, purchase, or development context.</p></section><section><h2>What Players Should Take From It</h2><p>${esc(a)} Players should use that confirmed point when planning the relevant choice and follow the deeper guide for adjacent mechanics. Exact quest outcomes, tuning values, or edition availability can still vary when the source does not define them.</p></section><section><h2>Primary Source</h2><p><a href="${source}" target="_blank" rel="noreferrer">Open the source used for this answer</a>. Browse the <a href="../../${tab}/">${label} hub</a> or return to the <a href="../">complete FAQ</a>.</p></section><section id="page-faq"><h2>FAQ</h2><dl class="faq-list"><div><dt>${esc(q)}</dt><dd>${esc(a)} ${esc(detail)}</dd></div></dl></section></article><aside class="article-aside"><h2>At a Glance</h2><p>${esc(a)}</p><a href="../../${tab}/">${label} guides</a><a href="../">All FAQ</a></aside></div></main></body></html>`);
  }
  const cards=items.map(([slug,q,a])=>`<a class="cluster-link" href="../faq/${slug}/"><strong>${esc(q)}</strong><span>${esc(a)}</span></a>`).join('');
  addSection(path.join(root,tab,'index.html'),'round21-faq',`<section class="cluster-index" data-round21-faq="true"><div class="section-heading"><p class="eyebrow">FAQ Expansion · July 29</p><h2>New ${label} FAQ Detail Pages</h2><p>Direct access to the new source-checked FAQ URLs for this topic.</p></div><div class="cluster-grid">${cards}</div></section>`);
}

const faqCards=allFaq.map(([slug,q,a])=>`<a class="cluster-link" href="./${slug}/"><strong>${esc(q)}</strong><span>${esc(a)}</span></a>`).join('');
addSection(path.join(root,'faq','index.html'),'round21-faq-index',`<section class="cluster-index" data-round21-faq-index="true"><div class="section-heading"><p class="eyebrow">50 New Independent URLs</p><h2>New Source-Checked FAQ Detail Pages</h2><p>Each question now has its own crawlable answer page, self-referencing canonical, FAQ schema, primary source, and related hub path.</p></div><div class="cluster-grid">${faqCards}</div></section>`);

const newUrls=[...allNews.map(([slug])=>`${site}/news/${slug}/`),...allFaq.map(([slug])=>`${site}/faq/${slug}/`)];
fs.writeFileSync(path.join(root,'sitemap-en.xml'),renderSitemap([...sitemapUrls(path.join(root,'sitemap-en.xml')),...newUrls]));
for(const file of ['sitemap.xml']){
  const all=[];
  for(const name of fs.readdirSync(root).filter(n=>/^sitemap-(en|de|es|fr|it|pl|zh-hans|zh-hant|ja|ko|cs|hu|pt-br|es-419|tr)\.xml$/.test(n)))all.push(...sitemapUrls(path.join(root,name)));
  fs.writeFileSync(path.join(root,file),renderSitemap(all));
}
fs.writeFileSync(path.join(root,'ROUND_21_NEWS_FAQ_REPORT.md'),`# Round 21 News and FAQ Expansion\n\n- Checked: ${checked}\n- New NewsArticle URLs: 35 (five per navigation hub)\n- New independent FAQ URLs: 50\n- Updated navigation hubs: 7\n- Existing Version 20.1 layout fix preserved\n- Primary sources: Bandai Namco, PlayStation Blog, Xbox Wire, Steam, and Xbox Store\n`);
console.log(JSON.stringify({news:allNews.length,faq:allFaq.length,newUrls:newUrls.length},null,2));
