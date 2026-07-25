import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const domain = 'https://bloodofdawnwalker.cc';
const verified = '2026-07-25';

const sources = {
  cbb1: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-1-vrakhiri-our-vampiric-masters',
  cbb5: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-5-secrets-of-vale-sangora',
  cbb6: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-6-creating-world',
  cbb7: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-7-beasts-monstrosities-illustrated',
  cbb8: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-8-forging-connections',
  cbb9: 'https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-9-coens-roots',
  official: 'https://en.bandainamcoent.eu/dawnwalker/the-blood-of-dawnwalker',
  launch: 'https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-will-launch-september-3-rebel-wolves-revealed-key-details',
  saga: 'https://en.bandainamcoent.eu/dawnwalker/news/rebel-wolves-unveils-more-of-the-blood-of-dawnwalker-and-teases-the-future-of',
  gameplay: 'https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-shows-duality-new-improved-gameplay-extended-footage',
  ps: 'https://blog.playstation.com/2026/04/28/choices-and-consequences-in-the-blood-of-dawnwalker-out-september-3/',
  xbox: 'https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/',
  xboxStore: 'https://www.xbox.com/en-US/games/the-blood-of-dawnwalker',
  steam: 'https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/',
  collector: 'https://store.bandainamcoent.eu/the-blood-of-dawnwalker-physical-full-game-pc-collectors-edition/'
};

const sourceNames = {
  [sources.cbb1]: 'Official Community Bulletin #1',
  [sources.cbb5]: 'Official Community Bulletin #5',
  [sources.cbb6]: 'Official Community Bulletin #6',
  [sources.cbb7]: 'Official Community Bulletin #7',
  [sources.cbb8]: 'Official Community Bulletin #8',
  [sources.cbb9]: 'Official Community Bulletin #9',
  [sources.official]: 'Official game and editions page',
  [sources.launch]: 'Official Road to Launch announcement',
  [sources.saga]: 'Official Dawnwalker Saga announcement',
  [sources.gameplay]: 'Official extended gameplay update',
  [sources.ps]: 'PlayStation Blog developer preview',
  [sources.xbox]: 'Xbox Wire hands-on preview',
  [sources.xboxStore]: 'Official Xbox store listing',
  [sources.steam]: 'Official Steam store listing',
  [sources.collector]: 'Official Bandai Namco store listing'
};

const clusters = {
  character: { hub: 'characters', label: 'Character Database', related: ['coen', 'brencis', 'relationship-guide'] },
  location: { hub: 'world-map', label: 'World & Locations', related: ['vale-sangora', 'svartrau', 'howling-keep'] },
  creature: { hub: 'enemy-types', label: 'Bestiary', related: ['blood-guards', 'kobolds', 'psoglavs'] },
  time: { hub: '30-days', label: 'Time System', related: ['day-night-system', 'exploration-time-cost', 'choices-consequences'] },
  lore: { hub: 'story-guides', label: 'Lore & Story', related: ['story', 'vrakhiri', 'vale-sangora'] },
  gameplay: { hub: 'gameplay-guides', label: 'Gameplay System', related: ['combat', 'human-vampire', 'skills'] },
  language: { hub: 'language-support', label: 'Language Support', related: ['release-date', 'platforms', 'faq'] },
  technical: { hub: 'technical-guides', label: 'PC & Platform', related: ['system-requirements', 'pc-version', 'platforms'] },
  edition: { hub: 'editions', label: 'Edition Contents', related: ['preorder', 'price', 'release-date'] }
};

const entries = [];
const add = (cluster, slug, title, answer, detail, use, boundary, source) =>
  entries.push({ cluster, slug, title, answer, detail, use, boundary, source });

// Character profiles: official identities and relationships, not speculative quest outcomes.
[
  ['marat','Marat Character Guide','Marat is the leader of the rebellion opposing the vrakhiri in Vale Sangora.','Official material describes him as courageous and charismatic but deeply cautious about betrayal. Coen must prove his worth before Marat is willing to trust him.','Use this profile to identify Marat’s faction, his relationship to the vrakhiri conflict, and why trust is likely to shape conversations involving him.','No complete quest chain, recruitability rule, romance route, combat build, or final outcome has been published. Those details must wait for verifiable release-game evidence.',sources.cbb8],
  ['lacra','Lacra Character Guide','Lacra is a mysterious, vengeance-driven woman with an agenda of her own.','The official character introduction says that player actions may persuade Lacra to reveal fragments of her past and intentions, while warning that getting closer carries a cost.','This makes Lacra a high-priority relationship character to track when comparing trust choices and information-gathering routes.','Official material does not confirm her faction, romance status, full abilities, quest order, or ending state.',sources.cbb8],
  ['anca','Anca Character Guide','Anca is Coen’s longtime guide and teacher, associated with reading, Latin, herbalism, and an undisclosed secret.','The official bulletin describes her as a quiet presence who taught Coen to read and look beyond the obvious. The Xbox preview also places her in Laslea as the village herbalist.','Players can use this page to separate Anca’s confirmed history with Coen from theories about her secret or allegiance.','Her secret, relationship outcome, combat role, and complete quest path have not been revealed.',sources.cbb8],
  ['pieter','Pieter Character Guide','Pieter is Coen’s father, a former mercenary who taught him basic swordsmanship.','He is described as strict, emotionally distant, and protective. Coen worked beside him in the silver mines as a child, and Pieter’s past is deliberately left partly hidden.','This profile connects Coen’s human combat background, family responsibilities, and early life in Laslea.','The game has not published Pieter’s full mercenary history, rescue outcome, or every choice affecting him.',sources.cbb9],
  ['esme','Esme Character Guide','Esme is Coen’s mother, whose physical and emotional health deteriorates after Brencis takes power.','Official material says she consistently puts her family first. By the period immediately before the game, she barely speaks, eats, or sleeps as the household struggles under vrakhiri rule.','Use this page when tracking Coen’s family stakes and the prologue events that motivate his search.','No official source has published her complete medical explanation, branching outcome, or rescue requirements.',sources.cbb9],
  ['yanna','Yanna Character Guide','Yanna is Coen’s second-oldest sibling and the family member who cares for Mirto and Lunka when the older children and parents are absent.','She is mature beyond her years and determined to keep the family together, although the strain sometimes shows as impatience.','This profile clarifies the family structure and helps distinguish Yanna from Coen’s younger siblings during story discussions.','Official sources have not disclosed a personal quest, combat role, or final outcome for Yanna.',sources.cbb9],
  ['mirto','Mirto Character Guide','Mirto is one of Coen’s younger siblings, a restless child affected by his parents’ growing emotional absence.','The official family profile presents him as increasingly unsettled while Yanna tries to reassure the household. An Xbox preview describes a fishing request involving Coen’s younger siblings.','This page identifies Mirto’s place in the family and the prologue context without turning preview choices into a guaranteed full-game walkthrough.','Exact dialogue results, rescue conditions, and later-game outcomes remain undisclosed.',sources.cbb9]
].forEach(row => add('character', ...row));

// Location and biome pages.
[
  ['laslea-village','Laslea Village Guide','Laslea is Coen’s home village in the hills of Vale Sangora.','The secluded settlement suffered heavily during the Black Plague and was ruled by Skender Dragosti before the vrakhiri takeover. Coen, his parents, and three siblings live there.','Use Laslea as the anchor for Coen’s family, Zdislav, Anca, the prologue, and early village relationships.','A complete street map, merchant list, collectible checklist, and post-prologue state require release-game verification.',sources.cbb9],
  ['tantari-woods','Tantari Woods Guide','Tantari Woods is the dark forest said to conceal the elusive Howling Keep.','Local stories say the mansion can appear or disappear depending on who approaches and with what intent. The forest is described as unusually foreboding even by Vale Sangora standards.','This page connects the Howling Keep legend to a named woodland region instead of treating the mansion as an isolated point of interest.','Exact entrances, fast-travel points, enemy levels, and quest triggers are not public.',sources.cbb5],
  ['svartrau-underground','Svartrau Underground Guide','A network of cellars, damp caves, and ancient ruins lies beneath Svartrau.','The underground routes help thieves evade the city guard, but the official description also warns that the old corridors are inhabited by dangerous creatures.','Use this page to understand why Svartrau is both a city hub and an exploration layer with hidden routes.','No complete underground map, loot table, or entrance list has been released.',sources.cbb5],
  ['vale-sangora-silver-mines','Vale Sangora Silver Mines','Silver mining is central to Vale Sangora’s economy and to Coen’s childhood.','Svartrau became rich through the silver trade, while Coen worked in the mines beside his father when he was young. Other official material associates subterranean spaces with kobolds and danger.','This page joins economic lore, family history, and the game’s mine environments in one focused reference.','Specific mine names, ore nodes, crafting yields, and quest rewards still need in-game confirmation.',sources.cbb5],
  ['primeval-forest','Primeval Forest Biome','Vale Sangora includes lush primeval forest filled with herbs, hidden knowledge, secrets, and threats.','The world-building bulletin presents forests as one of several distinct hand-crafted environments inspired by Central and Eastern Europe.','Use this biome page to distinguish broad environmental facts from exact herb locations or collectible routes that are not yet testable.','The official description does not provide a complete species list, resource map, or recommended level.',sources.cbb6],
  ['vale-sangora-swamps','Vale Sangora Swamps','Treacherous swamps are a confirmed part of Vale Sangora’s open world.','Official world descriptions place swamps alongside forests, mountains, caves, ruins, plains, and settlements, with each environment carrying its own mood and threats.','This page establishes the biome for later map, enemy, and route data while giving pre-release visitors a concrete answer about world variety.','No named swamp, exact hazard mechanic, or collectible route has been published.',sources.official],
  ['ancient-civilization-ruins','Ancient Civilization Ruins','Forgotten ruins and remnants of an ancient civilization are explorable parts of Vale Sangora.','Official descriptions connect old ruins with buried history, secrets, and dangers. Ancient undead are specifically associated with ruins where guardians remain bound to old duties.','Use this page as the lore-first hub for confirmed ruins rather than assuming every ruin is a dungeon or contains the same enemy type.','Named ruin locations, puzzle solutions, bosses, and rewards are not yet verified.',sources.official],
  ['remote-mountain-paths','Remote Mountain Paths','Remote and dangerous mountain paths are a confirmed Vale Sangora environment.','The valley sits within the Carpathian Mountains and draws visual inspiration from Central and Eastern European landscapes. Some paths are described as leading seemingly nowhere.','This page answers whether the open world includes mountainous traversal and provides a future home for tested routes.','Climbing rules, mount restrictions, shortcuts, and path destinations remain unconfirmed.',sources.cbb6],
  ['medieval-settlements','Medieval Settlements Guide','Vale Sangora contains lively medieval settlements in addition to its capital and villages.','Official feature descriptions contrast populated settlements with forests, plains, swamps, mountains, caves, and crumbling ruins. The world is designed to react to Coen’s actions.','Use this page to separate the confirmed settlement category from named hubs such as Svartrau and Laslea.','A full settlement list, services, faction control states, and NPC schedules are not public.',sources.official],
  ['vale-sangora-plains','Vale Sangora Plains','Vast plains are one of the confirmed landscapes in the hand-crafted open world.','The official North American game page lists plains alongside lush forests, treacherous swamps, steep mountaintops, medieval settlements, and forgotten ruins.','This page documents a distinct terrain type and gives later route, encounter, and map coverage a stable parent URL.','Exact boundaries, encounters, resources, and travel times require the released game.',sources.official]
].forEach(row => add('location', ...row));

// Additional officially named folklore creatures.
[
  ['uriashi','Uriashi in The Blood of Dawnwalker','Uriashi are officially named among the game’s folklore-inspired creatures.','The bestiary bulletin confirms that The Blood of Dawnwalker draws monsters from folklore and legends, naming uriashi alongside likhos, kobolds, and tatzelwurms.','This page provides a verified entity record so future appearance, behavior, and location data can be added without inventing them before launch.','The official source has not yet shown the uriashi model, combat behavior, habitat, weakness, or loot.',sources.cbb7],
  ['likhos','Likhos in The Blood of Dawnwalker','Likhos are officially confirmed folklore-inspired creatures in Vale Sangora.','They appear in the developer’s named list of monsters inspired by legends, establishing that likhos are part of the game’s bestiary even though detailed footage is not yet public.','Use this record to distinguish a confirmed creature name from fan speculation or similarly named folklore outside the game.','Appearance, encounter location, tactics, and drops are not disclosed.',sources.cbb7],
  ['tatzelwurms','Tatzelwurms in The Blood of Dawnwalker','Tatzelwurms are officially confirmed as one of the game’s folklore-inspired monster types.','The official bestiary bulletin names tatzelwurms with uriashi, likhos, and kobolds when answering whether mythological creatures will appear.','This is an entity-confirmation page, not a fabricated boss guide; it will gain tactics only after repeatable game evidence exists.','The number of variants, habitats, attacks, weaknesses, and rewards are unknown.',sources.cbb7]
].forEach(row => add('creature', ...row));

// Time and narrative-sandbox mechanics.
[
  ['day-has-eight-time-units','How Many Time Units Are in a Day?','Each daytime period is divided into eight time units.','Xbox’s four-hour hands-on preview explains that both day and night have eight units. Quest actions spend one or more units, while simply moving through the world does not run a real-time clock.','Use the eight-unit structure to read hourglass costs before committing to a quest step; do not convert units into real-world minutes.','The final UI may label or display units differently by release, but the eight-unit structure is directly reported from the preview build.',sources.xbox],
  ['night-has-eight-time-units','How Many Time Units Are in a Night?','Each nighttime period is divided into eight time units.','Night is a separate eight-unit planning window with Coen’s vampire form and access to form-specific abilities or areas. Time advances through chosen actions rather than continuous free roaming.','Plan night-only objectives around visible costs and remember that arriving at night does not itself imply a ticking real-time timer.','Exact costs for every night quest have not been published.',sources.xbox],
  ['hourglass-time-icons','Hourglass Time Icons Explained','Hourglass icons show a quest action’s time cost before the player commits.','The hands-on preview states that actions consuming time display one or several hourglass icons in the interface. This makes time a visible resource rather than a hidden penalty.','Check the icons before accepting a step, continuing a conversation, or learning a time-costing ability.','The complete icon legend, accessibility options, and every cost value need launch-build verification.',sources.xbox],
  ['quest-action-time-costs','Do Quest Actions Cost Time?','Yes. Specific quest actions can consume one or several time units.','The 30-day system does not charge time for ordinary exploration. Instead, selected quest decisions move the clock, with the cost shown in advance.','Treat each action as a route choice: compare its visible cost with the information, relationship, or objective it advances.','Not every interaction costs time, and no complete quest-by-quest cost table is public.',sources.ps],
  ['dialogue-choice-time-costs','Can Dialogue Choices Cost Time?','Yes. Certain dialogue choices have a visible time cost.','PlayStation’s developer preview specifically includes certain conversations among the major actions that can move the clock. This means talking is not always mechanically free.','Read the cost prompt before selecting time-consuming dialogue, especially when several leads compete for the same day or night.','Most dialogue costs and their consequences are intentionally undisclosed.',sources.ps],
  ['skill-learning-time-cost','Does Learning Skills Cost Time?','Some abilities can cost time to learn.','The developer preview identifies learning particular abilities for the skill tree as one of the actions that can visibly advance the clock.','Build planning therefore involves both skill points and, for some abilities, time-budget tradeoffs.','The game has not published a complete list of time-costing skills or their exact hourglass values.',sources.ps],
  ['free-roam-no-time-cost','Does Free Roaming Cost Time?','No. The clock does not continuously advance while Coen explores the world.','The hands-on preview says movement and exploration do not consume time in real time; quest actions trigger the time cost instead.','Players can inspect routes, caves, paths, and settlements without treating every minute of wandering as part of the 30-day countdown.','Fast travel, resting, waiting, and specific transitions may follow separate rules that require final-build testing.',sources.xbox],
  ['deadline-consequences','What Happens When the 30 Days End?','Running out of time has consequences, but it is not necessarily an immediate game over.','The developers told PlayStation Blog that the game moves on after the deadline. The system is designed to create pressure without preventing meaningful exploration.','Treat day 30 as a major story-state boundary rather than a traditional fail screen.','The exact scenes, family outcomes, and ending branches after the deadline are spoiler-sensitive and not published.',sources.ps],
  ['majority-before-deadline','Can You Complete Most of the Game Before Day 30?','The developers say players can complete a majority of the game before time runs out.','This statement is paired with the promise that the deadline is not meant to punish exploration, even though players will not have time to pursue every person and thread.','A first playthrough can still cover substantial content, but route choices will determine which stories are left unresolved.','“Majority” is not a published percentage and should not be converted into a completion checklist before launch.',sources.ps],
  ['blood-sacrament-deadline','Why Does Coen Have 30 Days?','Coen’s family is being held for a blood sacrament scheduled in 30 days.','The Xbox hands-on preview ties the deadline directly to Brencis taking Coen’s family hostage. Coen must learn to use his incomplete vampire condition and challenge far older enemies.','This story explanation separates the narrative deadline from a real-time survival timer.','The exact ritual, rescue branches, and family outcomes are intentionally unrevealed.',sources.xbox],
  ['day-night-restricted-quests','Are Some Quests Limited to Day or Night?','Yes. Some quests and areas are accessible only in Coen’s human or vampire form.','Because Coen is human by day and vampire by night, form access can determine when a narrative thread or location can be pursued.','When routing objectives, pair the hourglass cost with the required form instead of treating all tasks as available at all times.','A full day-only and night-only quest list is not available before launch.',sources.xbox],
  ['quest-order-freedom','Can You Choose the Quest Order?','Yes. The narrative sandbox allows players to choose which threads and vrakhiri targets to pursue first.','Xbox’s preview describes three principal lieutenants with associated stories and says their order is up to the player.','Use order freedom to investigate the target that best fits the current clues, form, relationships, and time budget.','The exact lockouts and dependency graph must be tested in the released game.',sources.xbox],
  ['no-golden-path','Does Dawnwalker Have a Golden Main-Quest Path?','The developers describe no single golden path of main quests.','Instead, Vale Sangora contains narrative threads that players pull while working toward the larger goal of defeating Brencis and saving Coen’s family.','This explains why a linear “main quest first” checklist may be less useful than route maps organized by goal, time, and consequence.','The game still has a central objective and authored story; “no golden path” does not mean procedurally generated quests.',sources.xbox],
  ['time-as-resource','How Time Works as a Resource','Time is spent by selected actions and must be budgeted alongside combat and relationship choices.','Each day and night provides eight units, costs are shown with hourglass icons, and ordinary exploration does not drain the clock. Some quests, dialogue choices, and skills use time.','A useful planning loop is: check form, inspect cost, identify likely consequence, then commit or preserve the units for another thread.','No pre-release guide can truthfully provide an optimal full route because complete costs and outcomes are not public.',sources.xbox]
].forEach(row => add('time', ...row));

// Focused lore explainers with a single question each.
[
  ['year-1347-setting','Why Is Dawnwalker Set in 1347?','The story begins in AD 1347, during the Black Death and a violent shift of power in Vale Sangora.','The vrakhiri use the valley’s crisis as an opportunity to emerge from the shadows, replace human rule, and offer protection and healing at a terrible price.','The date anchors the game’s plague, social collapse, feudal politics, and historical inspirations.','Vale Sangora is fictional; this page does not treat game lore as a literal account of medieval history.',sources.cbb1],
  ['black-death-in-vale-sangora','The Black Death in Vale Sangora','The Black Death devastates Vale Sangora and is central to the vrakhiri rise.','Laslea suffers heavy losses, Coen’s sister Lunka is infected, and Brencis uses vampire blood’s healing properties to demonstrate power over frightened communities.','Understanding the plague explains why some residents might accept vampire rule despite the blood tax.','The full disease system, curative items, and every plague-related quest are not public.',sources.cbb9],
  ['blood-tax-explained','What Is the Blood Tax?','The blood tax is the price Brencis demands from human communities in exchange for vampiric protection.','The prologue preview describes villagers giving blood after Brencis saves Lunka and establishes a new order in the plague-stricken valley.','The blood tax frames Brencis as both protector and predator, complicating a simple good-versus-evil reading of his rule.','Collection schedules, gameplay penalties, and player choices around the tax are not fully disclosed.',sources.ps],
  ['vampire-blood-healing','Can Vampire Blood Heal Humans?','Yes. Official lore says vampire blood has healing properties for humans.','Brencis gives his blood to plague-infected Lunka, and the official Coen family bulletin says the treatment does not appear to create another lasting effect, while deliberately leaving room for uncertainty.','This explains how Brencis turns healing into political leverage during the Black Plague.','The source does not establish a reusable player healing item or guarantee Lunka’s long-term story outcome.',sources.cbb9],
  ['skender-disappearance','What Happened to Skender Dragosti?','Skender Dragosti goes missing during a manhunt before Brencis emerges as Vale Sangora’s new ruler.','Official vrakhiri lore identifies Skender as the former lord and links his absence to the vampires’ public takeover.','This event marks the transition from brutal human feudal rule to open vrakhiri control.','His exact location, playable encounter, and final fate remain story material rather than confirmed guide data.',sources.cbb1],
  ['vrakhiri-takeover','How Did the Vrakhiri Take Over Vale Sangora?','The vrakhiri step out of hiding during the plague-era power vacuum and install Brencis as ruler.','They present strength, healing, and order while binding the population through fear, blood obligations, and immortal lieutenants.','This page connects Brencis, Xanthe, Ambrus, Bakir, Blood Guards, and the valley’s political structure.','The complete chronology and every faction response have not been published.',sources.cbb1],
  ['coen-family-tree','Coen Family Members Explained','Coen is the eldest child of Pieter and Esme, with younger siblings Yanna, Mirto, and Lunka.','The family lives in the hills of Laslea. Coen takes responsibility early, Yanna helps care for the younger children, Mirto grows restless, and Lunka shares a particularly close bond with Coen.','Use this reference to identify the family members behind the central rescue objective.','It does not reveal who can be saved or the conditions of individual family outcomes.',sources.cbb9],
  ['dawnwalker-condition','What Is a Dawnwalker?','A Dawnwalker is Coen’s incomplete vampire condition: human by day and vampire by night, with daylight causing him no harm.','His form changes the abilities, traversal options, mysteries, and routes available during each half of the cycle.','The condition is the foundation for the game’s two gameplay loops and for form-restricted quests.','The complete origin, cure possibilities, and ending variations are not disclosed.',sources.xbox],
  ['svartrau-silver-trade','Why Is Svartrau Rich?','Svartrau became wealthy through Vale Sangora’s silver trade.','The capital sits above underground cellars, caves, and ancient ruins, creating a contrast between prosperous streets and hidden dangers beneath them. The city guard also struggles to catch thieves using routes below the streets.','Silver links the city economy to Coen’s mining childhood and the wider history of the valley.','Prices, merchant inventories, mine ownership, and economic simulation rules are not public.',sources.cbb5],
  ['shrikes-crag-massacre','What Happened at Shrike’s Crag?','Shrike’s Crag is the site of a massacre ordered by Skender Dragosti after a peasant rebellion.','Surviving rebels were trapped at the old quarry and denied mercy. The bloodshed left the place cursed in local memory, and travelers are said not to return.','This history explains why the Crag is feared before any player reaches it.','The official story does not yet confirm a boss, ghost mechanic, quest reward, or exact route there.',sources.cbb5],
  ['self-contained-story','Is The Blood of Dawnwalker a Complete Story?','Yes. Rebel Wolves describes Coen’s origin story and conflict with Brencis as self-contained and reaching a conclusion in this game.','The broader Dawnwalker saga can continue across other eras, continents, locations, and antagonists, with breadcrumbs in the first chapter.','Players should expect a complete central conflict rather than a story that exists only to set up a sequel.','A self-contained story does not mean every mystery or series-level plot thread will be resolved.',sources.saga],
  ['dawnwalker-saga-future','What Is Next for the Dawnwalker Saga?','The planned saga can move across different eras and continents with new locations, antagonists, and stories.','The Summer Game Fest 2026 teaser presents The Blood of Dawnwalker as the first chapter while confirming that Coen and Brencis’ conflict concludes in this installment.','This separates confirmed long-term creative direction from unsupported claims about a named sequel.','No sequel title, setting, protagonist, platform, or release date has been announced.',sources.saga]
].forEach(row => add('lore', ...row));

// Gameplay features with direct, useful answers.
[
  ['wall-walking','Can Coen Walk on Walls?','Yes. Coen’s vampire form can defy gravity and move vertically along walls.','Official gameplay descriptions frame supernatural traversal as one of the vampire form’s defining advantages, opening routes unavailable to human Coen.','Use wall movement when evaluating night-only access and alternate approaches rather than assuming every vertical surface is climbable.','Exact valid surfaces, stamina costs, and combat interactions need final-build testing.',sources.official],
  ['shadowstep','Shadowstep Ability Explained','Shadowstep is a vampire traversal power used to move rapidly toward distant points or routes.','Hands-on and gameplay material present it as part of the night form’s supernatural mobility, complementing wall movement and form-specific exploration.','This ability is relevant to route planning, reaching elevated spaces, and closing distance.','Unlock timing, range, resource cost, upgrades, and every valid target remain unverified.',sources.xbox],
  ['vampire-claw-combat','Vampire Claw Combat','At night, Coen can fight directly with vampiric claws instead of relying only on human swordplay.','The official feature set contrasts brutal supernatural force with the human form’s sword and magic approach.','Expect the two forms to reward different combat and traversal decisions rather than functioning as cosmetic skins.','Exact claw combos, damage values, scaling, and best builds require release-game testing.',sources.official],
  ['human-sword-combat','Human Sword Combat','During the day, Coen fights with a sword and can combine martial combat with magic.','His father taught him basic swordsmanship, while official gameplay emphasizes adaptation between human and vampire strengths.','Use this page as the human-combat overview and follow specialist pages for directional defense and activation charges.','Weapon lists, attack frames, damage numbers, and optimal gear are not fully public.',sources.official],
  ['hex-magic','Hex Magic Explained','Human Coen can spend activation charges to use Hex magic.','Combat material describes activation charges as a resource earned through fighting, with Hexes and execution-style actions providing powerful payoffs during human-form encounters.','The practical decision is whether to spend charges on magic, an execution, or another available effect.','A complete Hex list, costs, upgrades, and status interactions have not been published.',sources.xbox],
  ['execution-moves','Execution Moves Explained','Execution moves are powerful combat actions tied to activation charges.','They sit beside Hex magic in the human combat resource loop, rewarding successful engagement before a high-impact spend. Charges are earned through active combat rather than supplied as an unlimited resource.','Track charge generation and enemy state rather than treating executions as free finishing animations.','Trigger thresholds, invulnerability, boss rules, and damage values need final-game evidence.',sources.xbox],
  ['human-day-gameplay','Human-by-Day Gameplay','Coen is human during the day, using human abilities, sword combat, magic, and access paths distinct from his vampire form.','Day and night are designed as two different gameplay loops with different mysteries and ways to reach objectives.','Schedule human-only areas and conversations during the day, then compare their time costs with night alternatives.','A full list of day-exclusive quests and abilities is not public.',sources.official],
  ['vampire-night-gameplay','Vampire-by-Night Gameplay','Coen becomes a vampire at night, gaining claws and supernatural movement options.','Night gameplay emphasizes powers such as wall movement, rapid traversal, feeding, and routes unavailable to human Coen.','Plan night windows around form-exclusive access rather than merely expecting harder enemies after sunset.','The complete night ability tree, hunger penalties, and quest list remain incomplete before launch.',sources.official],
  ['form-specific-access','Human and Vampire Access Rules','Some areas and narrative threads can only be reached in the appropriate human or vampire form.','The form schedule therefore combines with the time-unit system: a low-cost objective may still be unavailable until the correct half of the cycle.','Check the required form before spending time traveling or committing to a route.','No complete access matrix exists yet, so individual pages must be verified after release.',sources.xbox],
  ['dynamic-world-reactions','How the World Reacts to Choices','Vale Sangora reacts to Coen’s actions and inaction, not only to major ending decisions.','Official features say relationships, power balance, available truths, and the world itself can change as players choose whom to help or ignore.','This makes consequence tracking useful at the quest and relationship level, not just at a final decision screen.','The exact persistence rules and reversible choices are not fully disclosed.',sources.official]
].forEach(row => add('gameplay', ...row));

// One page per officially supported language. The intent is exact audio/subtitle/interface support.
const fullAudio = [
  ['english','English'],['french','French'],['german','German'],['italian','Italian'],
  ['spanish-spain','Spanish (Spain)'],['polish','Polish']
];
const textOnly = [
  ['simplified-chinese','Simplified Chinese'],['traditional-chinese','Traditional Chinese'],
  ['japanese','Japanese'],['korean','Korean'],['czech','Czech'],['hungarian','Hungarian'],
  ['portuguese-brazil','Portuguese (Brazil)'],['spanish-latin-america','Spanish (Latin America)'],['turkish','Turkish']
];
for (const [slug, language] of fullAudio) {
  add('language', `${slug}-language-support`, `${language} Language Support`,
    `The Blood of Dawnwalker supports ${language} interface text, subtitles, and full audio.`,
    `Official storefront language tables place ${language} among the six fully voiced languages. This is broader than subtitle-only support.`,
    `Players using ${language} can plan for localized menus, on-screen text, subtitles, and spoken dialogue at launch.`,
    `Regional storefront wording and downloadable language-pack behavior can differ by platform; verify the installed options after release.`,
    sources.steam);
}
for (const [slug, language] of textOnly) {
  add('language', `${slug}-language-support`, `${language} Language Support`,
    `The Blood of Dawnwalker supports ${language} interface text and subtitles, but no full ${language} audio is listed.`,
    `The official storefront language table separates text localization from the six languages receiving full voice acting.`,
    `Players can use ${language} menus and subtitles while selecting one of the available spoken-language tracks.`,
    `Platform-specific download sizes and whether audio can be installed separately are not yet documented.`,
    sources.steam);
}

// PC requirements and Xbox platform capabilities.
[
  ['pc-minimum-requirements','PC Minimum Requirements','The official minimum PC target lists Windows 10 with DirectX 12, an Intel Core i5-11400F or Ryzen 7 2700X, 16 GB RAM, a GTX 1060 or RX 580, and 60 GB of storage.','These are the baseline components published by Bandai Namco for the PC version.','Compare every component, not just the GPU, and leave additional free storage for downloads and updates.','The minimum table does not guarantee a specific result on every laptop or unusual hardware configuration.',sources.official],
  ['pc-recommended-requirements','PC Recommended Requirements','The recommended PC target lists an Intel Core i7-11700K or Ryzen 7 5700X, 16 GB RAM, an RTX 4060, RX 7600 XT, or Intel Arc B580, 60 GB storage, Windows 10, and DirectX 12.','This tier is the clearest official reference for a stronger launch configuration.','Match CPU, GPU, memory, OS, and storage together when judging readiness.','Driver versions, laptop equivalents, and final patch performance can change real results.',sources.official],
  ['windows-10-requirement','Windows 10 Support','Windows 10 is the minimum operating system listed for The Blood of Dawnwalker on PC.','The official minimum and recommended tables both pair Windows 10 with DirectX 12.','Update Windows, GPU drivers, and DirectX components before troubleshooting launch issues.','No official Linux or macOS native version is listed.',sources.official],
  ['directx-12-requirement','DirectX 12 Requirement','DirectX 12 is required in the official PC specifications.','Both minimum and recommended configurations list Windows 10 and DirectX 12. The requirement applies alongside the published processor, graphics, memory, and storage baselines.','Confirm that the GPU supports the required API and that current drivers are installed.','API support alone does not mean a GPU meets the game’s performance target.',sources.official],
  ['16gb-ram-requirement','Is 16 GB RAM Enough?','Yes. Both the official minimum and recommended PC specifications list 16 GB RAM.','The identical memory figure across the two published tiers makes 16 GB the confirmed baseline.','Close memory-heavy background applications if the system has exactly 16 GB available.','The official table does not publish a separate high-resolution memory recommendation.',sources.official],
  ['60gb-storage-requirement','How Much Storage Does Dawnwalker Need?','The official PC requirements list 60 GB of available storage.','Bandai Namco’s PC tables use the same 60 GB figure for minimum and recommended configurations.','Keep extra free space beyond 60 GB for the installer, patches, shader caches, saves, and platform overhead.','Final installed size and day-one update size can change before release.',sources.official],
  ['gtx-1060-support','GTX 1060 Support','The NVIDIA GTX 1060 is listed in the official minimum PC requirements.','It appears alongside the Radeon RX 580, 16 GB RAM, and the minimum CPU choices.','Treat it as part of a complete minimum configuration rather than a stand-alone performance promise.','The listing does not specify every GTX 1060 memory variant or laptop equivalent.',sources.official],
  ['rx-580-support','Radeon RX 580 Support','The Radeon RX 580 is listed as an official minimum GPU option.','It is paired with the GTX 1060 in the minimum table and still requires the listed CPU, memory, OS, and storage baseline.','Use current AMD drivers and compare the rest of the system before expecting the target experience.','Exact presets, resolution, and frame-rate behavior can change with patches.',sources.official],
  ['rtx-4060-support','RTX 4060 Recommended Specs','The NVIDIA RTX 4060 is one of the official recommended GPU options.','It is listed beside the RX 7600 XT and Intel Arc B580 in the recommended PC tier.','This makes the RTX 4060 a clear reference point when evaluating a new PC build for the game.','The table does not promise identical performance across desktop and laptop versions.',sources.official],
  ['rx-7600-xt-support','Radeon RX 7600 XT Recommended Specs','The Radeon RX 7600 XT is an official recommended GPU option.','Bandai Namco lists it with the RTX 4060 and Intel Arc B580 in the recommended tier.','Pair it with a recommended-class CPU and 16 GB RAM rather than judging by GPU alone.','Final drivers and game patches can materially affect performance.',sources.official],
  ['intel-arc-b580-support','Intel Arc B580 Recommended Specs','The Intel Arc B580 is explicitly listed as a recommended GPU.','Its inclusion confirms official Intel Arc support at the recommended tier, alongside NVIDIA and AMD alternatives.','Install a current Arc driver and ensure Resizable BAR is configured according to Intel platform guidance.','The game page does not provide model-by-model Arc troubleshooting yet.',sources.official],
  ['xbox-play-anywhere','Xbox Play Anywhere Support','The Blood of Dawnwalker supports Xbox Play Anywhere.','Xbox’s official preview states that players can access the game on Xbox console and Xbox on PC at no additional cost under Play Anywhere.','Use the same Microsoft account and a supported digital entitlement when moving between the two Xbox ecosystems.','Physical discs and purchases from unrelated storefronts do not automatically imply Play Anywhere ownership.',sources.xbox],
  ['xbox-cloud-gaming','Xbox Cloud Gaming Support','Xbox’s official preview lists cloud as one of the Xbox ways to play The Blood of Dawnwalker.','The July 2026 Xbox Wire article names Xbox Series X|S, Xbox on PC, and cloud together.','Cloud availability can reduce local hardware requirements, subject to service access, region, network quality, and account entitlements.','The preview does not publish every launch-day cloud region or queue condition.',sources.xbox],
  ['xbox-on-pc','Xbox on PC Version','An Xbox on PC version is officially confirmed alongside the console release.','Xbox’s product coverage also confirms Xbox Play Anywhere, connecting supported digital ownership across Xbox Series consoles and Xbox on PC.','This is distinct from buying the game on Steam, even though both are PC versions.','Save and entitlement behavior across non-Xbox PC storefronts is not implied.',sources.xbox],
  ['current-generation-platforms','Current-Generation Platforms','The game launches on PS5, Xbox Series X|S, and PC; no PS4 or Xbox One version is listed.','Official Bandai Namco pages consistently name only the current-generation consoles and PC.','Choose a supported platform and do not assume backward-generation versions based on publisher history.','Future ports are not confirmed and should not be presented as planned.',sources.official]
].forEach(row => add('technical', ...row));

// Edition contents. Existing thin routes are upgraded rather than duplicated.
[
  ['standard-edition','Standard Edition Contents','The Standard Edition contains the full game; eligible pre-orders receive early access to the Sangoran Wayfarer’s Armor Set.','The armor is an early unlock, not permanently exclusive content, because it can also be obtained later in the game.','Choose Standard if the base game is the priority and the digital compendium, comic, soundtrack, physical map, and figurine are not needed.','Retail availability and local pricing vary by platform and country.',sources.official],
  ['deluxe-edition','Is There a Deluxe Edition?','No edition is officially named “Deluxe.” The premium digital option is called the Eclipse Edition.','The official comparison uses Standard, Eclipse, Day 1, and Collector’s Edition.','Players searching for a deluxe package should compare Eclipse Edition content instead.','Retailers may use informal labels, but the publisher’s official edition name is authoritative.',sources.official],
  ['digital-edition','Digital Edition Options','The officially presented digital choices are the Standard Edition and Eclipse Edition.','Eclipse adds a digital world compendium, digital comic book, and digital soundtrack to the base game.','Compare the digital extras rather than expecting physical items such as the steelbook or printed map.','Exact storefront availability and local prices can differ by region.',sources.official],
  ['collector-edition','Collector’s Edition Contents','The Collector’s Edition includes the game, steelbook, 33 × 40 cm world map, 23 cm PureArts Coen figurine, 60-page hardcover world compendium, and Eclipse digital content.','The digital bundle includes the world compendium, comic book, soundtrack, and eligible pre-order armor early unlock.','Use the item dimensions and physical-versus-digital breakdown to compare value and storage or shipping needs.','Stock, platform code format, shipping, taxes, and retailer allocation vary by region.',sources.official],
  ['eclipse-edition-contents','Eclipse Edition Contents','The Eclipse Edition includes the base game, digital world compendium, digital comic book, and digital soundtrack.','Eligible pre-orders also receive early access to the Sangoran Wayfarer’s Armor Set, which remains obtainable later in the game.','Choose Eclipse for the digital lore and music extras without the Collector’s Edition physical items.','The extras are not evidence of gameplay DLC or early access to the game itself.',sources.official],
  ['day-one-edition-contents','Day 1 Edition Contents','The Day 1 Edition includes the base game, a SteelBook, a physical world map, and eligible pre-order armor early unlock.','It is the physical launch package positioned between Standard and Collector’s Edition contents.','Choose it when the steelbook and map matter but the figurine and hardcover compendium do not.','Retailer stock and participating pre-order bonuses vary.',sources.official],
  ['digital-world-compendium','Digital World Compendium','A digital world compendium is included with the Eclipse Edition and Collector’s Edition digital upgrade.','It is an official lore extra distinct from the Collector’s Edition 60-page physical hardcover compendium.','Check whether a digital reference or physical book better matches the desired edition before purchasing.','File format, page count, and delivery method for the digital version are not specified.',sources.official],
  ['digital-comic-book','Digital Comic Book','The official Eclipse digital upgrade includes a digital comic book.','The comic is included in Eclipse Edition and Collector’s Edition through the Eclipse content bundle. It is not listed with the Standard or Day 1 package.','Treat it as a digital narrative extra, not as a separate playable DLC or required story purchase.','The official page does not publish its length, format, or precise story placement.',sources.official],
  ['digital-soundtrack','Digital Soundtrack','The Eclipse digital upgrade includes the game’s digital soundtrack.','It is included with Eclipse Edition and Collector’s Edition, alongside the digital world compendium and comic.','This is the correct edition comparison point for players interested in the music revealed through official showcases.','Track count, audio format, and delivery application are not yet listed.',sources.official],
  ['coen-figurine','Coen Figurine Size and Edition','The Collector’s Edition includes a 23 cm PureArts Coen figurine in a collector box.','The figurine is a physical Collector’s Edition item and is not part of Standard, Eclipse, or Day 1 Edition.','Use the published 23 cm size when planning display space and comparing the physical package.','Final packaging dimensions, weight, shipping cost, and regional stock differ by seller.',sources.official]
].forEach(row => add('edition', ...row));

if (entries.length !== 96) throw new Error(`Expected 96 entries, received ${entries.length}`);
if (new Set(entries.map(x => x.slug)).size !== entries.length) throw new Error('Duplicate Round 11 slug');

const esc = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const json = value => JSON.stringify(value).replaceAll('<', '\\u003c');
const wordCount = html => (html.replace(/<[^>]+>/g, ' ').match(/\b[\w’'-]+\b/g) || []).length;
const decisionContext = {
  character: entry => `<section><h2>Relationship and story tracking</h2><p>Record what ${esc(entry.title.replace(' Character Guide',''))} says, what Coen promises, and whether another character reacts. The published material makes trust and hidden motives important, but it does not justify assigning a fixed ally, enemy, or romance label before the relevant branch is tested. Link a verified consequence back to this profile only when the trigger and result can be reproduced.</p></section>`,
  location: entry => `<section><h2>Map and route checklist</h2><p>When the release build is available, this ${esc(entry.title.toLowerCase())} page should add named entrances, nearby landmarks, required form, visible time costs, safe exits, and tested points of interest. Until then, the location record answers where the area sits in the published world without inventing coordinates, collectibles, loot, or a fastest route.</p></section>`,
  creature: entry => `<section><h2>Bestiary verification checklist</h2><p>After launch, the ${esc(entry.title)} entry should document a confirmed habitat, recognizable silhouette, attacks, defensive behavior, form-specific interactions, and repeatable rewards. A creature name in an official bulletin proves that the entity exists; it does not prove that it is a boss, appears in a particular cave, or has a folklore-accurate weakness.</p></section>`,
  time: entry => `<section><h2>Planning rule</h2><p>Apply the ${esc(entry.title.toLowerCase())} answer together with three checks: which form Coen currently has, how many hourglass units the next action shows, and which other thread would be delayed. Free exploration and charged quest actions are different categories, so route advice should never deduct time merely because a player walked, searched, or opened the map.</p></section>`,
  lore: entry => `<section><h2>Lore versus outcome</h2><p>This page records background that official material establishes before release. It can explain motives, institutions, and historical context, but it cannot predict the result of Coen’s choices. Future updates should keep a clean separation between codex-level history, dialogue claims made by characters, and consequences that players can independently reproduce in the final game.</p></section>`,
  gameplay: entry => `<section><h2>Build and testing checklist</h2><p>At launch, test ${esc(entry.title.toLowerCase())} in both ordinary encounters and restricted situations before recommending a build. Record unlock requirements, resource cost, valid targets, animation commitment, form and time restrictions, upgrades, and failure cases. Official feature confirmation is enough for this overview, but it is not enough for damage rankings or “best” claims.</p></section>`,
  language: entry => `<section><h2>Before choosing a platform</h2><p>Language tables describe localization coverage, not necessarily the download workflow. After installation, check the storefront region, game properties, first-launch language menu, subtitle toggle, and spoken-language selector. Do not assume that localized interface text includes voice acting; the full-audio column is the deciding field for ${esc(entry.title.replace(' Language Support',''))} dialogue.</p></section>`,
  technical: entry => `<section><h2>Configuration check</h2><p>Hardware labels should be read as a complete configuration. Compare CPU, GPU, system memory, operating system, DirectX support, storage space, driver status, and whether the component is a desktop or reduced-power laptop model. The official entry answers compatibility at the named tier, while launch drivers, patches, cooling, and background software can still change real performance.</p></section>`,
  edition: entry => `<section><h2>Buying check</h2><p>Compare the ${esc(entry.title.toLowerCase())} answer against four separate needs: the playable base game, digital lore or music extras, physical collectibles, and the pre-order armor early unlock. The armor can be obtained later in-game, so it should not be described as permanently exclusive. Confirm platform, code or disc format, retailer participation, shipping, and local price before ordering.</p></section>`
};

function page(entry, index) {
  const c = clusters[entry.cluster];
  const title = `${entry.title} | Blood of Dawnwalker Guide`;
  const description = `${entry.answer} Verified ${verified} with official-source context and clearly marked evidence limits.`;
  const canonical = `${domain}/${entry.slug}/`;
  const sourceName = sourceNames[entry.source] || 'Official source';
  const related = [...new Set(c.related.filter(slug => slug !== entry.slug && slug !== c.hub))].slice(0, 4);
  const questionLabel = entry.title.replace(/[?!.]+$/, '');
  const variants = [
    [
      ['Direct answer', `<p>${esc(entry.answer)}</p><p>${esc(entry.detail)}</p>`],
      ['How to use this information', `<p>${esc(entry.use)}</p>`],
      ['Evidence boundary', `<p>${esc(entry.boundary)}</p>`]
    ],
    [
      ['What is confirmed', `<p>${esc(entry.answer)} ${esc(entry.detail)}</p>`],
      ['Why players search for this', `<p>${esc(entry.use)}</p>`],
      ['What this page does not claim', `<p>${esc(entry.boundary)}</p>`]
    ],
    [
      ['Quick reference', `<dl class="data-list"><div><dt>Confirmed</dt><dd>${esc(entry.answer)}</dd></div><div><dt>Source context</dt><dd>${esc(entry.detail)}</dd></div></dl>`],
      ['Practical meaning', `<p>${esc(entry.use)}</p>`],
      ['Still requires verification', `<p>${esc(entry.boundary)}</p>`]
    ],
    [
      ['The short version', `<p>${esc(entry.answer)}</p>`],
      ['Published evidence', `<p>${esc(entry.detail)}</p>`],
      ['Player takeaway', `<p>${esc(entry.use)}</p>`],
      ['Known limit', `<p>${esc(entry.boundary)}</p>`]
    ],
    [
      ['Answer', `<p>${esc(entry.answer)}</p>`],
      ['Context', `<p>${esc(entry.detail)}</p><p>This distinction matters because pre-release summaries often merge confirmed facts with expected genre conventions.</p>`],
      ['Use in planning', `<p>${esc(entry.use)}</p>`],
      ['Verification status', `<p>${esc(entry.boundary)}</p>`]
    ],
    [
      ['Verified status', `<p>${esc(entry.answer)}</p>`],
      ['What the source establishes', `<p>${esc(entry.detail)}</p>`],
      ['Why it matters', `<p>${esc(entry.use)}</p>`],
      ['Do not infer beyond this', `<p>${esc(entry.boundary)}</p>`]
    ]
  ];
  const sections = variants[index % variants.length].map(([heading, body]) => `<section><h2>${heading}</h2>${body}</section>`).join('');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', name: entry.title, description, url: canonical, inLanguage: 'en',
        dateModified: verified,
        isPartOf: {'@type':'WebSite', name:'Blood of Dawnwalker Guide', url:`${domain}/`},
        breadcrumb: {'@type':'BreadcrumbList', itemListElement:[
          {'@type':'ListItem', position:1, name:'Home', item:`${domain}/`},
          {'@type':'ListItem', position:2, name:c.label, item:`${domain}/${c.hub}/`},
          {'@type':'ListItem', position:3, name:entry.title, item:canonical}
        ]}
      },
      {
        '@type':'FAQPage',
        mainEntity:[
          {'@type':'Question', name:entry.title, acceptedAnswer:{'@type':'Answer', text:entry.answer}},
          {'@type':'Question', name:`What is not yet confirmed about ${questionLabel}?`, acceptedAnswer:{'@type':'Answer', text:entry.boundary}}
        ]
      }
    ]
  };
  return `<!doctype html>
<html lang="en"><head>
  <meta name="google-adsense-account" content="ca-pub-9505220977121599" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title><meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" /><link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="stylesheet" href="../styles.css" />
  <meta property="og:type" content="article" /><meta property="og:site_name" content="Blood of Dawnwalker Guide" />
  <meta property="og:title" content="${esc(entry.title)}" /><meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" /><meta property="og:image" content="${domain}/icon-512.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">${json(schema)}</script>
  <link rel="alternate" hreflang="en" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
</head><body>
<header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>Blood of Dawnwalker</strong><small>Guide Site</small></span></a><nav aria-label="Main navigation"><a href="../release-guides/">Release</a><a href="../gameplay-guides/">Gameplay</a><a href="../walkthrough-guides/">Walkthrough</a><a href="../story-guides/">Story</a><a href="../technical-guides/">Technical</a><a href="../faq/">FAQ</a><!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 English</summary><div class="language-options"><a href="../${entry.slug}/" lang="en">English</a><a href="../de/" lang="de">Deutsch</a><a href="../es/" lang="es">Español</a></div></details><!-- LANG-DROPDOWN:END --></nav></header>
<main class="article-main"><section class="article-hero"><div><p class="eyebrow">${c.label} · Verified ${verified}</p><h1>${esc(entry.title)}</h1><p class="hero-copy">${esc(entry.answer)}</p><div class="article-meta"><span class="tag">Officially sourced</span><span class="tag confirmed">Concrete answer</span></div></div></section>
<div class="article-body"><article class="article-content">
${sections}
${decisionContext[entry.cluster](entry)}
<section><h2>Source</h2><p><a href="${entry.source}" target="_blank" rel="noreferrer">${esc(sourceName)}</a>. Checked ${verified}. This guide separates published facts from details that still require the release build.</p></section>
<section id="page-faq"><h2>FAQ</h2><dl class="faq-list"><div><dt>${esc(entry.title)}</dt><dd>${esc(entry.answer)}</dd></div><div><dt>What is still unconfirmed?</dt><dd>${esc(entry.boundary)}</dd></div></dl></section>
</article><aside class="article-aside"><h2>${c.label}</h2><a href="../${c.hub}/">Open the parent hub</a>${related.map(slug => `<a href="../${slug}/">${slug.replaceAll('-', ' ')}</a>`).join('')}<a href="../guide-index/">All quality-approved guides</a></aside></div></main>
<footer class="site-footer"><p>Independent, unofficial Blood of Dawnwalker guide. Confirmed facts are sourced; unannounced details are labeled clearly.</p></footer></body></html>\n`;
}

for (const [index, entry] of entries.entries()) {
  const dir = path.join(root, entry.slug);
  await mkdir(dir, { recursive: true });
  const html = page(entry, index);
  if (wordCount(html) < 250) throw new Error(`${entry.slug} is below 250 visible words`);
  await writeFile(path.join(dir, 'index.html'), html);
}

function clusterBlock(cluster) {
  const c = clusters[cluster];
  const pages = entries.filter(x => x.cluster === cluster);
  return `<section class="round11-cluster" data-round11-cluster="${cluster}"><h2>New verified ${c.label} pages</h2><p>This expansion publishes one concrete search intent per URL and keeps unverified walkthrough details out of the sitemap.</p><div class="related-grid">${pages.map(item => `<a href="../${item.slug}/"><strong>${esc(item.title)}</strong><span>${esc(item.answer)}</span></a>`).join('')}</div></section>`;
}

const hubClusters = {
  characters: ['character'],
  'world-map': ['location'],
  'enemy-types': ['creature'],
  'gameplay-guides': ['time', 'gameplay'],
  'story-guides': ['lore'],
  'technical-guides': ['technical'],
  'release-guides': ['language', 'edition'],
  'language-support': ['language'],
  editions: ['edition']
};

for (const [hub, clusterList] of Object.entries(hubClusters)) {
  const file = path.join(root, hub, 'index.html');
  let html = await readFile(file, 'utf8');
  html = html.replace(/<section class="round11-cluster"[\s\S]*?<\/section>/g, '');
  const block = clusterList.map(clusterBlock).join('');
  html = html.includes('</main>') ? html.replace('</main>', `${block}</main>`) : html.replace('</body>', `${block}</body>`);
  html = html.replace(/<meta name="robots" content="noindex, follow" \/>/, '<meta name="robots" content="index, follow, max-image-preview:large" />');
  html = html.replace(/"dateModified"\s*:\s*"\d{4}-\d{2}-\d{2}"/g, `"dateModified":"${verified}"`);
  await writeFile(file, html);
}

const roadmap = {
  targetIndexableUrls: 1000,
  currentRound: 11,
  strategy: 'Controlled batches of no more than 80–100 candidates, with only concrete-answer pages entering the sitemap.',
  targetMix: { database: '60%', toolsAndComparisons: '15%', guides: '15%', editorialNews: '10%' },
  phases: [
    { phase: 'Pre-release verified knowledge', target: 350, status: 'in progress', examples: ['characters','locations','systems','platforms','editions','languages'] },
    { phase: 'Launch-week tested database', target: 650, status: 'planned', examples: ['quests','items','skills','bosses','maps','choices'] },
    { phase: 'Post-launch combinations and tools', target: 1000, status: 'planned', examples: ['builds','route comparisons','ending matrices','collectible checklists','patch states'] }
  ],
  hardGate: 'A page without a specific answer stays noindex and outside every sitemap.'
};
await writeFile(path.join(root, 'URL_ROADMAP_TO_1000.json'), `${JSON.stringify(roadmap, null, 2)}\n`);
await writeFile(path.join(root, 'ROUND_11_URL_MANIFEST.json'), `${JSON.stringify({
  generatedAt: verified,
  candidateCount: entries.length,
  routes: entries.map(({ slug, cluster, title, source }) => ({ route: `/${slug}/`, cluster, title, source }))
}, null, 2)}\n`);

await writeFile(path.join(root, 'SEO_ROUND_11_REPORT.md'), `# The Blood of Dawnwalker — URL Expansion Round 11

Checked: ${verified}

## Outcome

- Built 96 source-backed English candidate pages across 9 different content models.
- Upgraded existing thin edition/language hubs where official answers are now available.
- Added cluster entry points to Characters, World Map, Bestiary, Gameplay, Story, Technical, Release, Language Support, and Editions hubs.
- Preserved the rule that unverified quest steps, item values, endings, bosses, and map locations do not enter the sitemap.

## Candidate mix

${Object.entries(clusters).map(([key, value]) => `- ${value.label}: ${entries.filter(x => x.cluster === key).length}`).join('\n')}

## Evidence

Primary evidence comes from Bandai Namco's official game page, editions and system-requirement tables, Community Bulletins #1 and #5–#9, the official saga announcement, PlayStation Blog's developer preview, Xbox Wire's hands-on preview, Xbox's product listing, and Steam's language table.

## Path to 1,000

The target is an indexable knowledge system, not 1,000 HTML placeholders. Round 11 follows a maximum 96-page candidate batch. Launch-week expansion should convert tested quests, items, skills, bosses, choices, maps, and troubleshooting into the next database layers.
`);

console.log(JSON.stringify({
  generatedAt: verified,
  candidatePages: entries.length,
  byCluster: Object.fromEntries(Object.keys(clusters).map(key => [key, entries.filter(x => x.cluster === key).length])),
  hubsUpdated: Object.keys(hubClusters).length
}, null, 2));
