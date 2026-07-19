import {readFile,writeFile} from 'node:fs/promises';import path from 'node:path';
const root=path.resolve('.');
const groups={
'release-guides':{title:'Release and Launch Details',items:[
['exact-release-time','Has the exact Dawnwalker release time been announced?','No global unlock hour has been announced. September 3, 2026 is confirmed, but players should check their platform store for the final regional time.'],
['preload-confirmed','Is preload confirmed for The Blood of Dawnwalker?','Not yet. No official preload date or download window has been published as of July 19, 2026.'],
['launch-price','How much does The Blood of Dawnwalker cost?','The US Xbox listing starts at $69.99 for the base preorder and $79.99 for the Eclipse Edition. Prices vary by platform, retailer, and region.'],
['review-embargo','When will Dawnwalker reviews be published?','The review embargo date has not been announced. Do not treat preview coverage as a scored review of the final release build.'],
['day-one-patch','Will The Blood of Dawnwalker have a day-one patch?','A day-one patch is possible after gold status, but its existence, size, and contents have not been officially confirmed.'],
['gone-gold-meaning','What does Dawnwalker going gold mean?','It means the launch build reached the certification and manufacturing milestone. It makes a delay less likely but does not stop later patches.'],
['collector-contents','What is included in the Collector’s Edition?','Official listings describe a Coen figure, SteelBook, map, hardcover compendium, and other edition content. Exact availability and packaging can vary by region.'],
['preorder-armor-exclusive','Is the Sangoran Wayfarer’s Armor preorder-exclusive?','No. The preorder grants an early unlock, but the official Xbox listing says the armor can also be obtained later in the game.'] ]},
'gameplay-guides':{title:'Combat, Movement, and Progression',items:[
['has-horse','Can Coen ride a horse?','No. Rebel Wolves explicitly said Coen does not have a horse.'],
['fast-travel-confirmed','Does The Blood of Dawnwalker have fast travel?','Yes. The developers confirmed fast travel through the world map, although unlock rules and individual nodes are still unknown.'],
['bows-crossbows','Can Coen use bows or crossbows?','No. Coen learned sword fighting from his father and the developers say he cannot use bows or crossbows.'],
['unarmed-combat','Can Coen fight with his fists?','Yes. The gameplay recap confirms punches and blocks as an unarmed combat option.'],
['three-skill-trees','How many skill trees does Coen have?','Three have been shown: a human tree, a vampire tree, and a shared tree used by both forms.'],
['activation-charges','What are Activation Charges?','They are combat resources built through successful attacks, blocks, and parries, then spent on Active Abilities.'],
['burning-blood','What does Burning Blood do?','Burning Blood is a revealed hex that applies damage over time. Final values, upgrades, and resistances are not yet published.'],
['omni-block-function','What does Omni-Block change?','It reduces the need to manually match every incoming block direction. It is an optional defensive aid, not automatic parrying or invulnerability.'],
['focus-one-form','Can you focus only on human or vampire Coen?','Yes, but the developers warn that relying on only one form means missing a large portion of the game’s abilities and content.'] ]},
'walkthrough-guides':{title:'Routes, Quests, and Time Planning',items:[
['xanthe-early-winnable','Can Xanthe be defeated early?','Yes. The official demonstration ends in defeat, but Rebel Wolves states that the early Xanthe battle is winnable for a sufficiently skilled player.'],
['xanthe-blood-guards','How many Blood Guards protect Xanthe in the gameplay demo?','Three Blood Guards must be defeated in the demonstrated cathedral route before Xanthe descends to fight Coen.'],
['hourglass-time-cost','How can you tell whether an activity consumes time?','Time-spending activities display an hourglass icon and show how far they will advance the world before completion.'],
['burning-house-waits','Will a timed-looking event continue while you explore?','The developers use a burning-house activity to explain that the scene can remain available while the player explores because real-world minutes do not advance narrative time.'],
['main-side-quests','Are quests divided into main quests and side quests?','Rebel Wolves says the narrative sandbox does not use a meaningful traditional division; players decide which stories matter to their route.'],
['legendary-sword-quest','Is the legendary sword in Svartrau mandatory?','The gameplay presentation follows clues to a sword in Svartrau’s crypts, but the studio has not said that every playthrough must complete that objective.'],
['important-npc-death','Can important NPCs die without ending the game?','Yes. Choices, combat, and critical hunger can kill characters while the wider playthrough continues with consequences.'] ]},
'story-guides':{title:'Story, Characters, and World',items:[
['self-contained-story','Will the first Dawnwalker game have a complete ending?','Yes. Rebel Wolves says Coen and Brencis’s conflict will receive a self-contained conclusion without leaving the central plot unresolved.'],
['modern-teaser-time-travel','Does the modern-day teaser mean the first game has time travel?','No. The developers explicitly say the first game remains in the 14th century; the modern setting teases future standalone installments.'],
['future-saga-settings','Will future Dawnwalker games use other eras and countries?','That is the stated plan. Future installments are intended to explore different eras, locations, cultures, stories, and characters.'],
['who-skender-dragosti','Who is Skender Dragosti?','He is Vale Sangora’s former knyaz, remembered for crushing a peasant rebellion at Shrike’s Crag before disappearing during a manhunt.'],
['who-father-florin','Who is Father Florin?','He is a local priest whose diary records villagers’ habits, fears, and subtle changes as Vale Sangora approaches a new dawn.'],
['relationships-open-paths','Can relationships unlock new paths?','Yes. Official material says trust and connections can reveal hidden truths and open paths that shape Coen’s destiny.'],
['who-ambrus-bakir','Who are Ambrus and Bakir?','Ambrus is the youngest disclosed vrakhiri and a deceptive social climber; Bakir is a powerful, bloodthirsty lieutenant of Brencis.'] ]},
'technical-guides':{title:'PC, Console, Languages, and Accessibility',items:[
['supported-language-count','How many languages does The Blood of Dawnwalker support?','The official Steam and Xbox listings show 15 supported languages.'],
['full-dub-languages','Which languages have full voice acting?','English, French, Italian, German, Spanish from Spain, and Polish are marked for full audio.'],
['german-full-audio','Does Dawnwalker have German voice acting?','Yes. German supports interface text, subtitles, and full audio.'],
['latin-spanish-audio','Does Latin American Spanish have full voice acting?','No full audio is currently listed for Latin American Spanish; it supports interface text and subtitles. Spanish from Spain has full audio.'],
['steam-cloud-achievements','Does the PC version support Steam Cloud and achievements?','Yes. Steam lists both Steam Cloud and Steam Achievements, along with single-player and Family Sharing.'],
['xbox-ray-tracing-4k','Does the Xbox listing mention 4K and ray tracing?','Yes. The current Xbox store lists 4K Ultra HD and ray tracing capabilities, but final mode details and frame rates remain unpublished.'],
['pc-controller-support','Can the PC version be played with a controller?','Yes. The Xbox listing includes PC Game Pad support, and the game is also available through Xbox Play Anywhere.'],
['install-size-vs-download','Is the final download size exactly 60 GB?','Not necessarily. Sixty gigabytes is the listed SSD storage requirement; the final compressed download and patch size may differ.'] ]},
'faq-guides':{title:'Buying and Storefront Questions',items:[
['developer-publisher','Who develops and publishes The Blood of Dawnwalker?','Rebel Wolves develops the game and Bandai Namco Entertainment publishes it.'],
['xbox-base-price','What is the US Xbox base preorder price?','The official US Xbox listing currently starts at $69.99, subject to taxes, sales, edition, and regional changes.'],
['eclipse-price','What is the US Xbox Eclipse Edition price?','The official US Xbox listing currently starts at $79.99 for the Eclipse Edition preorder.'],
['mature-rating','What age rating does Dawnwalker have in the United States?','The US listings carry an ESRB Mature 17+ rating for content including intense violence, blood and gore, sexual content, nudity, and strong language.'],
['family-sharing','Does The Blood of Dawnwalker support Steam Family Sharing?','Yes. Steam currently lists Family Sharing among the supported features.'],
['play-anywhere-meaning','What does Xbox Play Anywhere mean for Dawnwalker?','A qualifying digital Xbox purchase can be played on Xbox Series X|S and Windows PC without buying the game twice, using the same Xbox account ecosystem.'] ]},
'updates-guides':{title:'Official Updates and Development Status',items:[
['latest-official-bulletin','What is the latest official Community Bulletin?','As of July 19, 2026, Bandai Namco’s game page lists Community Bulletin Board #9, “Coen’s Roots,” dated June 30, as the latest bulletin.'],
['camera-feedback-update','Did Rebel Wolves change the camera after feedback?','Yes. Updated footage specifically cites camera placement, combat flow, mechanics, and feature improvements prompted by community feedback.'],
['gold-announcement-date','When was Dawnwalker’s gold status announced?','Gold status was announced on July 15, 2026, placing the September launch on a firmer footing.'],
['official-hands-on-july','Has there been a July 2026 hands-on preview?','Yes. Xbox Wire published a hands-on preview on July 7 covering writing, performance, time systems, and combat.'],
['reviews-live-yet','Are final Dawnwalker reviews available yet?','No final-release review consensus exists before launch. Current articles are previews or hands-on impressions and should be labeled accordingly.'] ]}
};
const all=Object.values(groups).flatMap(g=>g.items);
if(all.length!==50)throw new Error(`Expected 50 FAQs, got ${all.length}`);
const faqFile=path.join(root,'faq','index.html');let html=await readFile(faqFile,'utf8');
html=html.replace('FAQ · 60+ Answers','FAQ · 110+ Answers').replace('Updated July 18, 2026','Updated July 19, 2026').replace('Last checked: July 18, 2026.','Last checked: July 19, 2026.');
const navigator=`<section class="expanded-faq-nav"><h2>Browse 50 New Verified Questions</h2><div class="related-grid">${Object.entries(groups).map(([tab,g])=>`<a href="#faq-${tab}">${g.title}</a>`).join('')}</div></section>`;
html=html.replace(/<section class="expanded-faq-nav">[\s\S]*?<\/section>/,'').replace('<section id="release-buying">',navigator+'<section id="release-buying">');
const schema={'@context':'https://schema.org','@type':'FAQPage','@id':'https://bloodofdawnwalker.cc/faq/#expanded-50','url':'https://bloodofdawnwalker.cc/faq/','mainEntity':all.map(([,q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
const sections=Object.entries(groups).map(([tab,g])=>`<section id="faq-${tab}"><h2>${g.title}</h2><dl class="faq-list">${g.items.map(([id,q,a])=>`<div id="faq-${id}"><dt>${q}</dt><dd>${a}</dd></div>`).join('')}</dl><p><a href="../${tab}/">Browse the related ${g.title.toLowerCase()} hub</a>.</p></section>`).join('');
const block=`<section id="expanded-faq-2026" class="verification-box"><h2>50 Additional Verified Questions</h2><p>These answers were checked on July 19, 2026 against official publisher, Steam, Xbox, developer reveal, and official hands-on information. Unannounced features are identified as unconfirmed instead of guessed.</p></section>${sections}<script type="application/ld+json" data-expanded-faq="true">${JSON.stringify(schema)}</script>`;
html=html.replace(/<section id="expanded-faq-2026"[\s\S]*?<script type="application\/ld\+json" data-expanded-faq="true">[\s\S]*?<\/script>/,'').replace('</article>',block+'</article>');await writeFile(faqFile,html);
for(const [tab,g] of Object.entries(groups)){const file=path.join(root,tab,'index.html');let h=await readFile(file,'utf8');const links=g.items.map(([id,q])=>`<a class="cluster-link" href="../faq/#faq-${id}"><strong>${q}</strong><span>Read the verified answer in the main FAQ.</span></a>`).join('');const module=`<section class="cluster-index tab-faq-links"><div class="section-heading"><p class="eyebrow">Player Questions</p><h2>Related FAQ</h2><p>Direct links to the verified questions most relevant to this topic.</p></div><div class="cluster-grid">${links}</div></section>`;h=h.replace(/<section class="cluster-index tab-faq-links">[\s\S]*?<\/section>/,'').replace('</main>',module+'</main>');await writeFile(file,h)}
console.log(`Added ${all.length} verified FAQs and ${Object.keys(groups).length} tab entry modules.`);
