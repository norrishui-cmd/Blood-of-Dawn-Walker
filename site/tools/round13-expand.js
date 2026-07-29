const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://bloodofdawnwalker.cc";
const DATE = "2026-07-25";
const ADS = `<meta name="google-adsense-account" content="ca-pub-9505220977121599" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9505220977121599" crossorigin="anonymous"></script>`;
const LANG = `<!-- LANG-DROPDOWN:START --><details class="language-menu"><summary aria-label="Select language">🌐 English</summary><div class="language-options"><a href="${SITE}/" lang="en" aria-current="page">English</a><a href="${SITE}/de/" lang="de">Deutsch</a><a href="${SITE}/es/" lang="es-ES">Español (España)</a><a href="${SITE}/fr/" lang="fr">Français</a><a href="${SITE}/it/" lang="it">Italiano</a><a href="${SITE}/pl/" lang="pl">Polski</a><a href="${SITE}/zh-hans/" lang="zh-Hans">简体中文</a><a href="${SITE}/zh-hant/" lang="zh-Hant">繁體中文</a><a href="${SITE}/ja/" lang="ja">日本語</a><a href="${SITE}/ko/" lang="ko">한국어</a><a href="${SITE}/cs/" lang="cs">Čeština</a><a href="${SITE}/hu/" lang="hu">Magyar</a><a href="${SITE}/pt-br/" lang="pt-BR">Português (Brasil)</a><a href="${SITE}/es-419/" lang="es-419">Español (Latinoamérica)</a><a href="${SITE}/tr/" lang="tr">Türkçe</a></div></details><!-- LANG-DROPDOWN:END -->`;

const sources = {
  ps: ["PlayStation Blog: time-driven quest system and player choice", "https://blog.playstation.com/2026/07/07/the-blood-of-dawnwalker-unique-time-driven-quest-system-and-player-choice-detailed/"],
  xbox: ["Xbox Wire: four-hour hands-on preview", "https://news.xbox.com/en-us/2026/07/07/the-blood-of-dawnwalker-hands-on-preview/"],
  world: ["Xbox Wire: building Vale Sangora's living world", "https://news.xbox.com/en-us/2026/04/30/the-blood-of-dawnwalker-world/"],
  cbb1: ["Official Community Bulletin #1: the Vrakhiri", "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-1-vrakhiri-our-vampiric-masters"],
  cbb9: ["Official Community Bulletin #9: Coen's roots", "https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-9-coens-roots"],
  shop: ["Official editions and system requirements page", "https://en.bandainamcoent.eu/dawnwalker/the-blood-of-dawnwalker/shop-now"],
  launch: ["Official Road to Launch summary", "https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-will-launch-september-3-rebel-wolves-revealed-key-details"],
  saga: ["Official Summer Game Fest saga announcement", "https://en.bandainamcoent.eu/dawnwalker/news/rebel-wolves-unveils-more-of-the-blood-of-dawnwalker-and-teases-the-future-of"],
};

const clusters = {
  prologue: {
    hub: "prologue-guides",
    label: "Prologue Activity",
    summary: "Verified opening-day activities and decision points shown in official descriptions or the four-hour preview.",
    intro: "The opening day in Laslea is not a conventional checklist. Exploration itself does not move the clock, but committing to meaningful actions can consume one or more of the eight daytime segments. The practical value of this page is therefore route awareness: know what the activity proves, what it may cost, and what remains impossible to optimize before the retail build is available.",
  },
  combat: {
    hub: "combat-mechanics",
    label: "Combat Mechanic",
    summary: "Confirmed sword, claw, feeding, blood-magic, and traversal rules with clear testing boundaries.",
    intro: "Dawnwalker's combat combines a directional sword system with form-specific vampire and human tools. Preview evidence can establish how a mechanic works at a basic level, but it cannot yet support frame data, damage rankings, or a universal best strategy. This page separates the rule players can plan around from launch-day testing that still needs to happen.",
  },
  world: {
    hub: "world-reactivity",
    label: "World Reactivity",
    summary: "How time, reputation, weather, NPC survival, and world-state choices create consequences.",
    intro: "Vale Sangora is described as a living narrative sandbox rather than a static quest board. Significant actions advance time, people continue acting without Coen, and apparently local decisions can remove services or create allies. Each guide in this cluster focuses on one confirmed cause-and-effect relationship instead of promising a complete consequence tree before release.",
  },
  lore: {
    hub: "vrakhiri-lore",
    label: "Vrakhiri Lore",
    summary: "Official biographies, political symbols, and the vampire regime's economy and ideology.",
    intro: "The Vrakhiri are presented as historical individuals from different centuries and cultures, not a single anonymous enemy type. Their biographies explain the regime Coen opposes and help readers distinguish confirmed backstory from conclusions that will depend on dialogue, notes, and endings in the finished game.",
  },
  family: {
    hub: "coen-family",
    label: "Coen Family",
    summary: "The confirmed history, responsibilities, illness, and relationships inside Coen's Laslea household.",
    intro: "Coen's family is the story's central deadline, but each family member also enters the opening with a distinct history and response to poverty, plague, and Vrakhiri rule. These pages preserve those differences and avoid turning pre-release biographies into invented outcome guides.",
  },
  editions: {
    hub: "edition-comparisons",
    label: "Edition Guide",
    summary: "Physical and digital contents, dimensions, upgrade items, and purchase comparisons.",
    intro: "Edition pages are purchase aids, so the useful answer is an exact inventory and a clear distinction between physical, digital, and early-unlock content. Regional stock and retailer pricing remain volatile; the official comparison page is the authority for current availability.",
  },
  pc: {
    hub: "pc-specs-explained",
    label: "PC Requirement",
    summary: "CPU, GPU, SSD, and recommended-spec pages tied directly to the official requirement table.",
    intro: "The official requirement table names hardware tiers but does not publish a final resolution, frame-rate, graphics-preset, or upscaling target for each tier. These pages help buyers compare the named components without pretending the list is a benchmark.",
  },
  development: {
    hub: "development-insights",
    label: "Development & Saga",
    summary: "Motion capture, music, narrative scope, sequel direction, and the cost of player choice.",
    intro: "Behind-the-scenes material can answer who contributed to a feature and what the studio intends, but it should not be mistaken for a launch-build walkthrough. This cluster records explicit production facts and narrative-scope statements while keeping future installments separate from the September 2026 game.",
  },
};

const pages = [
  ["prologue","blood-mass-prologue","Blood Mass Prologue Explained","The Blood Mass is the fixed event at the end of Laslea's opening day: adult villagers must give blood to Brencis and his clique, and Coen cannot prevent the event merely by choosing a perfect daytime route.",["Laslea's adults are required to attend the offering.","The opening day has eight segments between dawn and sunset.","The event still arrives after Coen spends the day choosing whom to help."],"Plan the day around information, relationships, and preparation rather than assuming the Mass itself can be cancelled.","The retail build may support different scenes and reactions, but the preview states that the Mass is an unavoidable opening event.","ps"],
  ["prologue","anca-medicine-quest","Anca Medicine Quest Preview","Coen's father sends him to Anca, Laslea's herbalist, to obtain stronger medicine for his traumatized mother before the Blood Mass.",["The errand is one of the opening day's explicit objectives.","Anca is both a herbalist and a source of later blood-magic knowledge.","Spending additional time with her can compete with other opening-day activities."],"This is a relationship-and-resource decision, not just a fetch quest; budget time before accepting optional extensions.","Exact dialogue checks, item names, and every outcome need launch-build verification.","xbox"],
  ["prologue","anca-latin-lesson","Anca Latin Lesson Choice","The preview confirms that Coen can remain with Anca for an impromptu, flirtatious Latin lesson, spending more of the limited opening day.",["Coen secretly studies Latin and hopes for a life beyond Laslea.","The lesson can follow the medicine visit.","The preview describes natural chemistry between Coen and Anca."],"Take the lesson if character context matters more than completing every available opening activity; it is a deliberate time trade-off.","The exact time cost and romance consequences are not yet published.","xbox"],
  ["prologue","escaped-pig-activity","Escaped Pig Activity Preview","One opening-day thread lets Coen help a neighbor find an escaped pig and later assist with butchering it.",["The pig search is one of several optional Laslea activities.","The previewer accepted liquor before the butchering.","Pieter later reacted to the smell of alcohol, demonstrating stateful dialogue."],"This activity is an early example of a small choice producing a later family reaction, so record the follow-up rather than judging it only by a reward screen.","Rewards, alternate refusals, and exact time costs require launch testing.","xbox"],
  ["prologue","stolen-tapestry-quest","Stolen Tapestry Quest Preview","The official PlayStation description names an opening opportunity to help a weaver by searching for a stolen tapestry commissioned by the Vrakhiri.",["The activity is available during Laslea's first day.","It competes with family, medicine, and rebellion threads.","Its commission connects ordinary village work to Vrakhiri rule."],"Treat it as a known route candidate, not a finished walkthrough; compare its visible hourglass cost when the retail build launches.","The thief, recovery steps, rewards, and consequences have not been officially detailed.","ps"],
  ["prologue","river-fishing-with-siblings","River Fishing With Coen's Siblings","Coen's younger siblings can ask him to escort them to the river to fish because wolves have been seen nearby; accepting and helping with the lines advances the clock.",["The request appears during the previewed first day.","At least two commitments consume time: accepting the escort and helping set the lines.","The scene connects family care with time management."],"Players prioritizing family context should reserve time for both stages rather than assuming the initial acceptance completes the activity.","Exact branch outcomes and whether wolves can attack in every route remain unverified.","xbox"],
  ["prologue","old-woman-unearthed-grave","Old Woman and Unearthed Grave Encounter","The PlayStation preview identifies an old woman weeping beside an unearthed grave as one of the situations Coen can investigate during the opening day.",["The encounter is part of Laslea's explorable opening.","Watching or listening does not itself force real-time clock movement.","Intervening may become a meaningful action with a displayed time cost."],"Inspect the hourglass indicator before committing and capture the resulting world-state change during launch-week testing.","No official source has published the grave's identity, reward, or complete resolution.","ps"],
  ["prologue","laslea-revolution-thread","Laslea Revolution Thread Preview","Coen can uncover the beginning of organized resistance against the vampires during the opening day, but pursuing it competes with other family and village needs.",["Human rebellion is already growing under Vrakhiri rule.","Brencis suspects Pieter of encouraging unrest.","The wider game lets Coen seek allies or pursue other priorities."],"Use this thread to map political consequences and family reactions, not as proof of a single mandatory faction route.","The organization, leaders, recruitment conditions, and ending impact remain launch-build questions.","ps"],

  ["combat","four-direction-combat","Four-Direction Combat System","Weapon attacks and incoming strikes use four cardinal directions, communicated by an icon over the opponent during the preview.",["The direction applies to both attacking and defending.","Holding block can defend without matching direction, but costs stamina.","Matching the direction at the correct moment enables a more efficient parry."],"Practice reading the icon before optimizing damage; the system rewards recognition and timing more than button mashing.","Input windows, accessibility adjustments, and enemy-specific exceptions need retail testing.","xbox"],
  ["combat","block-stamina-cost","Does Blocking Cost Stamina?","Yes. The hands-on preview states that holding the block button defends against weapon attacks but consumes stamina.",["Basic blocking is the safer fallback when the attack direction is uncertain.","Directional parrying can avoid the stamina cost.","Being surrounded is substantially more dangerous than a one-on-one exchange."],"Use ordinary block for unfamiliar patterns, then transition to directional parries to preserve stamina when the cue is reliable.","Exact stamina values, regeneration rates, and guard-break thresholds are not public.","xbox"],
  ["combat","directional-parry","Directional Parry Explained","A directional parry requires moving the stick toward the indicated incoming direction at the correct time; the preview reports that a successful parry avoids the stamina cost of holding block.",["The incoming direction appears above the attacker.","Timing and direction both matter.","QA players were observed parrying Brencis repeatedly in the prologue duel."],"The mechanic is the clearest confirmed route to efficient defense, but launch testing must measure timing across difficulty settings.","No official frame window or keyboard input mapping has been published.","xbox"],
  ["combat","repeated-attack-direction","Why Repeating One Attack Direction Is Risky","The preview states that attacking from the same direction too often makes Coen easier to block.",["Directional choice matters offensively as well as defensively.","Alternating directions should reduce predictability.","The rule discourages repeating a single comfortable input."],"Build an attack sequence that changes direction and reserve repeated strikes for situations where the target cannot defend.","The game has not published an exact repetition counter or enemy resistance table.","xbox"],
  ["combat","feeding-animation-risk","Feeding Animation Risk and Interruptions","Coen is not invulnerable while feeding; biting a guard near allies can leave him exposed to immediate attacks.",["Feeding restores health after Coen's transformation.","Nearby enemies can react to the victim's distress.","Position and isolation matter before committing to the animation."],"Treat feeding as a vulnerable combat action: separate the target, check nearby sightlines, and do not assume the bite is an emergency invincibility tool.","Cancel windows, armor effects, and upgrades that modify feeding safety need launch testing.","xbox"],
  ["combat","rat-blood-healing","Can Coen Heal From Rats?","Yes. The hands-on preview says Coen can top up health by feeding on rats and other small mammals after his transformation.",["Vampire Coen heals through blood rather than ordinary food.","Small animals offer a lower-risk source than a guarded human target.","The source describes this as topping off, not necessarily a full heal."],"Use small animals as recovery between fights when available, while reserving hostile humans for situations where positioning is safe.","Healing amounts, animal availability, and difficulty scaling are not published.","xbox"],
  ["combat","wolf-form-traversal","Wolf Form Traversal Explained","Vampire Coen can transform into a wolf to move quickly across the countryside at night.",["Wolf form is a vampire traversal power.","It complements wall walking and other night-only routes.","The preview frames it as fast countryside movement rather than a separate playable character."],"Use wolf form for overland repositioning and compare it with map travel once the retail build reveals unlock and resource rules.","Unlock timing, duration, combat use, and restrictions are not yet confirmed.","xbox"],
  ["combat","blood-magic-investigation","Blood Magic for Investigations","Anca teaches human Coen blood magic; the preview uses it to interrogate a dead soldier for clues about the captured family.",["Blood magic has its own skill tree.","It supports investigations as well as traversal and direct damage.","The teaching occurs late in the previewed prologue."],"Investigation-focused players should track which corpses, clues, or dialogue states accept blood-magic interaction before spending points on combat-only assumptions.","The complete spell list and investigation eligibility rules remain unpublished.","xbox"],

  ["world","blood-convoys","Blood Convoys in Vale Sangora","Vrakhiri store and transport human blood as a strategic resource, and Coen can encounter and disrupt blood convoys in the open world.",["The convoys are part of the regime's operating economy.","Disruption can weaken vampire operations.","Attacking them also increases Coen's infamy."],"Judge a convoy by both its immediate resource value and the additional attention created by infamy; it is a strategic world choice, not free loot.","Routes, schedules, guards, rewards, and repeatability need launch testing.","world"],
  ["world","infamy-system","Infamy System Explained","Confirmed world examples show that openly disrupting Vrakhiri operations can raise Coen's infamy and place a target on him.",["Blood-convoy disruption is the clearest official example.","The system links visible resistance to greater danger.","It operates alongside local relationship and service consequences."],"Track infamy before and after major public actions to determine thresholds and whether stealth can preserve the same objective with less exposure.","The UI scale, decay rules, and exact enemy responses are not yet public.","world"],
  ["world","blacksmith-choice-consequence","What Happens If You Kill a Blacksmith?","The official world overview gives a concrete consequence: kill a local blacksmith for gold and that forge becomes inaccessible.",["The decision trades immediate money for a lost service.","It demonstrates that NPC survival affects practical world utility.","The example warns against treating every kill as reversible loot."],"Before attacking a named civilian or merchant, identify the service and save-state consequences; gold may be replaceable while a forge may not be.","The number of alternate blacksmiths and whether the consequence can be repaired are unknown.","world"],
  ["world","free-captive-consequence","Freeing a Captive: Guard and Skill Consequences","The official example says freeing a captive may alienate local guards but can also lead to learning a new skill from a new friend.",["A single action can create both hostility and opportunity.","Skills may come from relationships, not only a menu.","The best result depends on the player's route rather than a universal morality score."],"Record the captive, guards, learned skill, and time cost as one decision package; do not evaluate only the immediate combat outcome.","The captive's identity, skill, and all alternate resolutions are not published.","world"],
  ["world","world-updates-with-time","How the World Updates When Time Advances","Every significant choice can consume time segments, and the world updates as those segments pass.",["Characters make choices beyond Coen's control.","Events can continue without player intervention.","Smaller decisions may cost fewer segments than major actions."],"Before committing, review the hourglass cost and any active deadlines; a locally good action may allow another event to progress elsewhere.","A complete schedule of NPC and event updates requires the retail build.","world"],
  ["world","autonomous-character-actions","Do Characters Act Without Coen?","Yes. Official descriptions say characters have their own agency and events continue with or without Coen's intervention.",["Time progression is triggered by significant player actions rather than free roaming.","Inaction can shape outcomes just as intervention does.","Notes and small stories can reveal what other people are doing."],"Treat ignored requests as choices with possible consequences and revisit relevant NPCs after time advances.","The game has not published a master schedule or pause conditions for every character.","world"],
  ["world","dynamic-weather","Dynamic Weather Confirmed","Dynamic weather is officially confirmed for Vale Sangora.",["The world draws on multiple Central and Eastern European climates.","Weather participates in the atmosphere of forests, swamps, mountains, and settlements.","At least one weather type, fog, has a gameplay visibility effect."],"Plan exploration and combat with changing visibility in mind rather than assuming weather is purely cosmetic.","Frequency, forecasts, combat modifiers, and whether players can wait for conditions are not yet known.","https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-6-creating-world"],
  ["world","fog-visibility","Does Fog Affect Visibility?","Yes. The developers specifically confirmed that it becomes harder to see in fog.",["Fog is an example of dynamic weather affecting play.","Reduced sight can matter on dangerous paths and around enemies.","No official source says that fog changes damage, detection values, or navigation markers."],"Slow down in fog, rely on landmarks, and test enemy detection separately before claiming a stealth advantage or penalty.","The magnitude of the visibility reduction and graphics-setting interactions remain unknown.","https://en.bandainamcoent.eu/dawnwalker/news/community-bulletin-board-6-creating-world"],

  ["lore","brencis-caeso-burrienus-laurentius","Brencis's Roman Name and Origin","Brencis was born in the Roman Empire in AD 131 under the name Caeso Burrienus Laurentius.",["He came from a noble family with large latifundia.","His biography predates the 1347 setting by more than a millennium.","His long history supports the Vrakhiri theme of crossing centuries and cultures."],"Use the Roman identity when interpreting Brencis's political ambition; it explains why rule, status, and legacy are central to his characterization.","The date and circumstances of his transformation have not been fully disclosed.","cbb1"],
  ["lore","brencis-roman-senator","Brencis as a Roman Senator","Before becoming a vampire, Brencis joined the Roman Senate and rose through official life with the ambition of becoming consul.",["His human life was defined by political advancement.","Vampirism interrupted rather than created his desire to rule.","He later becomes leader of the Vrakhiri in Vale Sangora."],"Read his Vale Sangora regime as an extension of an ancient political project, not merely a monster occupying a castle.","The game has not revealed which emperor or exact Roman offices framed his career.","cbb1"],
  ["lore","xanthe-ancient-greek-priestess","Xanthe's Ancient Greek Priestess Origin","Xanthe is the oldest member of Brencis's group and was once a priestess in Ancient Greece; her original name has been lost over the centuries.",["She hears voices from beyond the pale.","Her age has affected both body and mind.","Official biography describes her insight as real rather than simple insanity."],"Her sparse dialogue should be read as ancient perspective and fear, while remaining alert to how the finished story frames the voices she hears.","Her exact age, cult, transformation, and full role are not published.","cbb1"],
  ["lore","ambrus-human-origins","Ambrus's Human Origins","Ambrus is the youngest vampire in the clique and came from a painful, humble human life marked by humiliation.",["He deliberately sought vampiric power.","He wants to prove himself to older peers.","His polished noble appearance contrasts with his origins."],"Expect his charm and social presentation to serve ambition; do not assume apparent refinement means loyalty or restraint.","His birthplace, human occupation, and exact age are not yet disclosed.","cbb1"],
  ["lore","bakir-central-asian-origins","Bakir's Central Asian Origins","Before becoming a vampire, Bakir spent decades riding across the dry steppes of Central Asia while burning, trampling, and pillaging.",["He is one of Brencis's strongest lieutenants.","He resented centuries spent hiding.","His biography says he thirsted for blood even as a human."],"His open violence and desire for recognition distinguish him from Vrakhiri who prefer political or deceptive control.","The game has not yet published a precise culture, century, or transformation event.","cbb1"],
  ["lore","vrakhiri-blood-economy","How the Vrakhiri Blood Economy Works","The Vrakhiri treat human blood as a managed resource: villagers give regular offerings, and blood is stored and transported through convoys.",["Brencis presents health and safety as benefits of his rule.","Humans are managed like a valuable herd.","Coen can weaken operations by disrupting transport."],"Connect Blood Mass obligations, stored blood, and convoys when planning resistance; they are parts of one operating system rather than unrelated encounters.","Production quantities, storage sites, and the full convoy network remain unknown.","world"],
  ["lore","brencis-shrines-coins-frescoes","Brencis Shrines, Coins, and Frescoes","Brencis's image and coat of arms appear throughout Vale Sangora on roadside shrines, coins, and newly painted church frescoes.",["The symbols make his power visible in daily life.","Religious and economic imagery reinforce political control.","The official world article calls the likeness omnipresent."],"Use these objects as environmental-storytelling markers for how recently and how deeply Vrakhiri rule has reshaped a location.","No collectible list or reward for finding every symbol is confirmed.","world"],
  ["lore","vrakhiri-new-religion","The Vrakhiri's New Religion","Official world material describes a new national religion built around Brencis, visible through shrines and altered church art.",["The regime blends spiritual imagery with political authority.","Freshly painted frescoes show active replacement of older symbols.","The presentation supports the Vrakhiri claim to benevolent rule."],"When exploring churches and settlements, distinguish devotional propaganda from evidence about local belief or resistance.","Formal doctrine, clergy structure, and whether Coen can alter the religion are not published.","world"],

  ["family","coen-eldest-sibling","Coen as the Eldest Sibling","Coen is the eldest of four children and took early responsibility for supporting and watching over Yanna, Mirto, and Lunka.",["His family lives in the hills of Laslea.","Poverty and illness shaped his responsibilities.","His bond with Lunka is described as especially strong."],"Family-first choices are grounded in a long caretaking role, not only the 30-day hostage deadline.","The final game will determine how individual decisions change each relationship.","cbb9"],
  ["family","coen-silver-miner-childhood","Coen's Childhood in the Silver Mines","As a child, Coen worked beside his father Pieter in Laslea's silver mines, an experience that left lasting physical and emotional marks.",["The mines are part of the family's economic history.","Coen later awakens in the mine after the Blood Mass.","The background connects labor, family, and a major prologue location."],"Use the history to interpret Coen's familiarity with the mine, but do not assume every tunnel or shortcut is known to him.","The exact injuries, work duration, and mine layout remain unrevealed.","cbb9"],
  ["family","coen-studies-latin","Why Does Coen Study Latin?","Coen secretly studies Latin because he dreams of eventually leaving his constrained life in Laslea.",["Pieter is emotionally distant and protective.","Coen's education is self-directed rather than part of village privilege.","Anca can share a Latin lesson with him during the opening day."],"Latin choices may carry character and relationship meaning even when they are not the fastest route to an immediate objective.","No full list of texts, skill bonuses, or dialogue checks has been published.","cbb9"],
  ["family","pieter-former-mercenary","Pieter's Former Mercenary Past","Pieter, Coen's father, is a former mercenary with a troubled past he rarely discusses.",["He later raises a family in Laslea.","Brencis suspects him of fomenting unrest.","His past helps explain his strict, guarded behavior."],"Treat references to Pieter's history as potential political context, but keep unconfirmed battles and affiliations out of the guide.","The official biography does not identify his company, campaigns, or reason for leaving.","cbb9"],
  ["family","pieter-sword-training","Who Taught Coen Swordsmanship?","Pieter taught Coen the basics of swordsmanship before the events of the game.",["The training predates Coen's Dawnwalker transformation.","Human combat therefore has a family origin as well as a skill tree.","Pieter's mercenary experience provides the background for the lessons."],"The confirmed answer explains why Coen can fight early; it does not establish his starting moves, weapon, or proficiency level.","The tutorial sequence and upgrade path still require launch testing.","cbb9"],
  ["family","esme-illness","Esme's Illness and the Opening Day","Esme is Coen's mother. Her condition worsens after Brencis takes power, and by the opening day she barely speaks, eats, or sleeps, prompting the medicine errand to Anca.",["She consistently put the family before her own well-being.","Fear and the Blood Mass weigh heavily on her.","Her illness is distinct from Lunka's plague treatment."],"Do not merge the two medical storylines: Anca's medicine errand concerns Esme, while Brencis's vampire blood is associated with Lunka.","The diagnosis, medicine item, and possible outcomes are not fully published.","cbb9"],
  ["family","yanna-family-role","Yanna's Role in Coen's Family","Yanna is the second-oldest sibling and cares for Mirto and Lunka when Coen and Pieter are away.",["She is described as mature beyond her years.","Her patience can wear thin under pressure.","She remains determined to hold the family together."],"Her choices should be tracked as those of an active caretaker, not a passive hostage in Coen's quest.","No complete relationship or outcome tree is available before launch.","cbb9"],
  ["family","lunka-vampire-blood-effects","Does Vampire Blood Change Lunka?","Officially, vampire blood has healing properties for humans and appears to have no known long-term effect on Lunka, though the developers deliberately leave room for uncertainty.",["Brencis used blood healing to promise health and safety during the plague.","Lunka is the youngest sibling and was heavily sheltered.","The official answer does not confirm a transformation."],"Use 'healed by vampire blood' as the verified status; do not label Lunka a vampire, Dawnwalker, or future boss without game evidence.","The story may reveal effects that the pre-release Q&A intentionally withholds.","cbb9"],

  ["editions","steelbook-edition","Which Dawnwalker Edition Includes a Steelbook?","The physical Day 1 Edition and Collector's Edition list a Steelbook; the Standard and digital Eclipse inventories do not list one.",["Day 1 also includes a physical world map.","Collector's includes the Steelbook plus physical collectibles and digital upgrade content.","Retail availability varies by country and stock."],"Buy Day 1 if the Steelbook and map are the main physical goals; Collector's adds larger collectibles at a higher tier.","Retailer artwork, language, and regional packaging should be checked before purchase.","shop"],
  ["editions","world-map-size","Dawnwalker Collector's World Map Size","The Collector's Edition specifies a physical world map measuring 33 × 40 cm; the Day 1 page lists a map but does not state the same dimensions in its text inventory.",["The item is physical, not an in-game map unlock.","Both Day 1 and Collector's list a world map.","Only Collector's publishes the 33 × 40 cm measurement on the official page."],"If dimensions matter for display or framing, verify the exact regional product listing rather than assuming both maps are identical.","Materials, print scale, and regional packaging may differ.","shop"],
  ["editions","physical-world-compendium","Physical World Compendium Details","The Collector's Edition includes a 60-page hardcover physical world compendium.",["The Eclipse digital upgrade contains a separate digital world compendium.","Collector's includes both the physical book and digital upgrade.","The physical book is not listed in Day 1 or Standard."],"Choose Collector's if a hardcover lore artifact matters; choose Eclipse if digital access is sufficient.","Language editions, page dimensions, and exact contents are not specified on the global shop page.","shop"],
  ["editions","eclipse-digital-upgrade","Eclipse Edition Digital Upgrade Contents","The Eclipse digital upgrade includes a digital world compendium, digital comic book, and digital soundtrack.",["Eclipse Edition bundles the base game with the upgrade.","Collector's also includes the same digital upgrade.","The preorder armor is listed separately as a preorder bonus."],"Compare the upgrade's three media extras with the physical items in Day 1 and Collector's; it does not claim gameplay power.","File formats, soundtrack track count, and comic length are not yet listed.","shop"],
  ["editions","preorder-armor-early-unlock","Is the Preorder Armor Exclusive?","No. The Sangoran Wayfarer's Armor Set is an early unlock: the official page says every player can obtain it later in the game.",["It is offered as a digital preorder bonus at participating retailers.","The armor features the emblem of a travelling nameless smith.","Preordering changes access timing, not permanent ownership eligibility."],"Do not pay a premium solely from fear of missing the armor forever; compare convenience, retailer stock, and the edition's other contents.","The normal in-game unlock method and timing are not yet revealed.","shop"],
  ["editions","standard-vs-eclipse-edition","Standard vs Eclipse Edition","Standard contains the full game, while Eclipse adds the digital world compendium, digital comic book, and digital soundtrack through the Eclipse digital upgrade.",["Both can receive the preorder armor where the offer applies.","Eclipse's extra items are media and lore bonuses.","No exclusive quest, weapon, or permanent gameplay advantage is listed."],"Choose Standard for the game alone; choose Eclipse only if the three digital extras are worth the price difference in your region.","Pricing and retailer availability are regional and can change.","shop"],
  ["editions","day-one-vs-collector-edition","Day 1 vs Collector's Edition","Day 1 includes the game, Steelbook, map, and preorder armor; Collector's adds a 23 cm Coen figure, 60-page hardcover compendium, and the Eclipse digital upgrade.",["Both are physical inventories on the official comparison page.","Collector's specifies a 33 × 40 cm map.","Collector's contains both physical and digital lore extras."],"Choose Day 1 for compact physical bonuses; choose Collector's for the figure and compendiums if price, storage, and shipping are acceptable.","Country filters and stock can make an edition unavailable even when it exists globally.","shop"],

  ["pc","i5-11400f-requirement","Intel Core i5-11400F Minimum Requirement","The Intel Core i5-11400F is one of the officially listed minimum CPUs for The Blood of Dawnwalker on PC.",["It is paired in the table with 16 GB RAM, GTX 1060 or RX 580, and a 60 GB SSD.","Windows 10 and DirectX 12 are also required.","The table does not state the target frame rate or preset."],"Meeting the named CPU is a baseline compatibility signal, not proof of a particular performance target; compare the rest of the system as a complete tier.","Final patches, background software, cooling, and settings can change real performance.","shop"],
  ["pc","ryzen-7-2700x-requirement","Ryzen 7 2700X Minimum Requirement","The AMD Ryzen 7 2700X is the official AMD CPU named for the minimum PC tier.",["The alternative minimum CPU is Intel Core i5-11400F.","Minimum memory is 16 GB.","The official page requires a 60 GB SSD and DirectX 12."],"A faster GPU cannot eliminate every CPU limit; evaluate the CPU, RAM, storage, and GPU together against the same tier.","No official benchmark scene, resolution, or frame-rate target is published.","shop"],
  ["pc","i7-11700k-requirement","Intel Core i7-11700K Recommended Requirement","The Intel Core i7-11700K is the Intel CPU listed for the recommended PC tier.",["The AMD alternative is Ryzen 7 5700X.","Recommended graphics options are RTX 4060, RX 7600 XT, or Intel Arc B580.","The tier still lists 16 GB RAM and a 60 GB SSD."],"Use the recommended tier as a balanced-system reference rather than interpreting one named part as a guarantee of maximum settings.","Official resolution, ray tracing, and frame-rate targets are not stated.","shop"],
  ["pc","ryzen-7-5700x-requirement","Ryzen 7 5700X Recommended Requirement","The AMD Ryzen 7 5700X is the AMD CPU named in the recommended specification.",["It is presented as the counterpart to Intel Core i7-11700K.","The requirement table keeps memory at 16 GB.","Recommended GPUs span Nvidia, AMD, and Intel."],"Check motherboard support and memory configuration when upgrading an older AM4 system; the game page names the CPU but cannot validate an individual build.","The official list does not include cooler, firmware, or motherboard guidance.","shop"],
  ["pc","gtx-1060-vs-rx-580","GTX 1060 vs RX 580 Minimum GPUs","Both Nvidia GTX 1060 and AMD Radeon RX 580 are named as minimum graphics options, so neither is officially presented as the recommended choice.",["The minimum tier also needs 16 GB RAM and a compatible CPU.","A 60 GB SSD, Windows 10, and DirectX 12 are listed.","VRAM variants are not specified on the official table."],"Owners of either card should wait for tested launch benchmarks before assuming identical settings or performance.","The requirement page does not state resolution, preset, frame rate, VRAM, or upscaling assumptions.","shop"],
  ["pc","rtx-4060-vs-rx-7600-xt","RTX 4060 vs RX 7600 XT Recommended GPUs","Both RTX 4060 and Radeon RX 7600 XT are listed in the recommended tier, alongside Intel Arc B580.",["The tier pairs them with i7-11700K or Ryzen 7 5700X.","Recommended memory remains 16 GB.","The official chart does not rank the three GPUs."],"Choose between the cards based on the whole PC and independent launch benchmarks, not the order in which names appear in the table.","No official ray-tracing, upscaling, resolution, or frame-rate target is attached to the tier.","shop"],
  ["pc","intel-arc-b580-recommended","Intel Arc B580 Recommended Status","Intel Arc B580 is explicitly listed as a recommended GPU, alongside RTX 4060 and RX 7600 XT.",["Intel is represented at the recommended tier but not in the published minimum alternatives.","The game requires DirectX 12.","Driver version and Resizable BAR guidance are not included on the store page."],"Arc owners should treat the listing as official support intent and still verify launch drivers and tested performance before selecting settings.","The listing does not guarantee parity across every graphics feature.","shop"],
  ["pc","ssd-required","Is an SSD Required for Dawnwalker?","Yes. Both the minimum and recommended tables specify 60 GB of SSD storage.",["The capacity is the same across both tiers.","The requirement is not written as an HDD alternative.","Patches, shader caches, and save data may require extra free space beyond the listed install size."],"Install on an SSD and keep additional headroom; do not plan around exactly 60 GB of total free disk space.","The final download size, compression, and day-one patch size can still change.","shop"],

  ["development","bakir-motion-capture","Bakir Motion Capture Explained","Former UFC champion Jan Błachowicz contributed motion-capture performances for Bakir.",["Bakir is one of Brencis's powerful vampire lieutenants.","The production feature used Błachowicz's combat experience to add weight and authenticity.","The work focused on physical fight performance rather than Bakir's voice."],"Separate performance roles: Dai Tabuchi is the announced voice actor, while Jan Błachowicz contributed motion capture.","The official summary does not map every captured move to a finished encounter.","launch"],
  ["development","jan-blachowicz-bakir","What Did Jan Błachowicz Do on Dawnwalker?","Jan Błachowicz worked on motion capture for antagonist Bakir, advising and performing combat movement so swings, stabs, and punches felt impactful.",["He is a former UFC champion.","The collaboration was shown in a behind-the-scenes feature.","Bakir's design and voice involve other credited contributors."],"This is a production-credit page, not evidence that Błachowicz appears as himself or voices the character.","The final game may blend captured movement with animation editing and other performers.","launch"],
  ["development","uphill-battle-soundtrack","Uphill Battle Soundtrack Track","Uphill Battle is an officially revealed piece from The Blood of Dawnwalker's soundtrack, presented in a live-musician music video during the Road to Launch event.",["It is separate from the earlier Community Bulletin music feature.","The Eclipse digital upgrade includes the soundtrack, though the complete track list is not published.","Music is used to express Coen's inner conflict and choices."],"Use the revealed title as confirmed soundtrack metadata, but do not infer the full album order or in-game scene placement.","Track duration, composer credits on the final album, and complete listing require official release metadata.","launch"],
  ["development","self-contained-brencis-conflict","Does the Brencis Conflict End in This Game?","Yes. Rebel Wolves says Coen and Brencis's conflict will reach its conclusion in The Blood of Dawnwalker, even though a wider saga is planned.",["The first game is described as a self-contained story.","The saga can continue through broader plot threads.","A sequel teaser does not turn the September game into an unfinished prologue."],"Players can expect resolution to the central feud while watching for optional breadcrumbs about the larger narrative.","The number and nature of endings remain undisclosed.","saga"],
  ["development","saga-spans-centuries","Will the Dawnwalker Saga Span Centuries?","Yes. The developers state that future Dawnwalker installments are intended to span centuries.",["The first game begins in a dark 14th-century setting.","A CGI teaser shows a modern 21st-century environment.","The wider plot can outlive one era while the first conflict concludes."],"Keep future-era speculation out of the first game's walkthroughs; use the statement only to frame confirmed franchise scope.","No sequel title, date, platform, or playable character has been announced.","saga"],
  ["development","saga-different-cultures","Future Dawnwalker Locations and Cultures","Rebel Wolves says future installments are intended to feature different eras, locations, and cultures across the globe.",["Vale Sangora remains the setting of the September 2026 game.","New stories and characters are planned for later installments.","The overarching plot may be foreshadowed through breadcrumbs."],"Do not label any real-world country or culture as the next setting until the studio identifies it.","The CGI teaser establishes direction, not a detailed sequel roadmap.","saga"],
  ["development","21st-century-saga-teaser","Dawnwalker 21st-Century Teaser Explained","The Summer Game Fest CGI teaser shows Coen in a modern, 21st-century setting as a glimpse of where the overarching saga may ultimately lead.",["The scene is about franchise direction rather than the main game's normal setting.","The Blood of Dawnwalker itself remains rooted in 1347 and Vale Sangora.","Future stories can move across eras and cultures."],"Treat the modern scene as a saga teaser, not proof of a playable modern chapter inside the September release.","The mechanism, chronology, and gameplay status of the scene are intentionally unexplained.","saga"],
  ["development","kill-npc-content-loss","Can Killing an NPC Remove Content?","Yes. A developer stated that killing certain people can prevent players from seeing substantial authored content, and official examples show services disappearing when an NPC dies.",["Narrative reactivity is designed to accommodate major variation.","A dead blacksmith can mean losing access to that forge.","The system supports consequences rather than a single golden path."],"Before killing a named NPC, consider services, relationships, information, and future quests; use separate saves only if that fits the intended play style.","A complete essential-NPC or lockout list should not be invented before launch.","xbox"],
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function resolveSource(key) {
  if (Array.isArray(key)) return key;
  if (sources[key]) return sources[key];
  return ["Official developer bulletin", key];
}

function nav() {
  return `<header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>Blood of Dawnwalker</strong><small>Wiki &amp; Guides</small></span></a><nav aria-label="Main navigation"><a href="../release-guides/">Release</a><a href="../gameplay-guides/">Gameplay</a><a href="../walkthrough-guides/">Walkthrough</a><a href="../story-guides/">Story</a><a href="../technical-guides/">Technical</a><a href="../faq/">FAQ</a>${LANG}</nav></header>`;
}

function schema(title, description, slug, cluster, faq) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description,
        url: `${SITE}/${slug}/`,
        inLanguage: "en",
        dateModified: DATE,
        isPartOf: { "@type": "WebSite", name: "Blood of Dawnwalker Guide", url: `${SITE}/` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: clusters[cluster].label, item: `${SITE}/${clusters[cluster].hub}/` },
            { "@type": "ListItem", position: 3, name: title, item: `${SITE}/${slug}/` },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: title, acceptedAnswer: { "@type": "Answer", text: faq[0] } },
          { "@type": "Question", name: `What still needs launch verification about ${title}?`, acceptedAnswer: { "@type": "Answer", text: faq[1] } },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");
}

const formats = {
  prologue: (p) => `<section><h2>Quick answer</h2><p>${esc(p.answer)}</p></section><section><h2>Where it fits in the first day</h2><p>${esc(clusters.prologue.intro)}</p></section><section><h2>Confirmed sequence</h2>${facts(p.details)}</section><section><h2>Route decision</h2><p>${esc(p.decision)}</p><p>Because the opening segment exposes its time costs before commitment, the reliable launch-week method is to note the hourglass icons, save the resulting dialogue state, and compare only branches actually tested. A preview mention confirms the activity exists; it does not justify inventing a reward table.</p></section>`,
  combat: (p) => `<section><h2>Mechanic in one sentence</h2><p>${esc(p.answer)}</p></section><section><h2>How the rule works</h2>${facts(p.details)}</section><section><h2>Practical combat use</h2><p>${esc(p.decision)}</p></section><section><h2>Testing protocol</h2><p>${esc(clusters.combat.intro)}</p><p>At launch, test the mechanic against one ordinary opponent and one group, then record input, resource cost, interruption rules, form restriction, unlock requirement, upgrades, and difficulty effects. Only repeatable observations should become numerical advice.</p></section>`,
  world: (p) => `<section><h2>Confirmed consequence</h2><p>${esc(p.answer)}</p></section><section><h2>Cause and effect</h2>${facts(p.details)}</section><section><h2>Decision checklist</h2><p>${esc(p.decision)}</p></section><section><h2>Why this belongs in the world model</h2><p>${esc(clusters.world.intro)}</p><p>The finished guide should connect this state to affected NPCs, services, locations, time segments, and later dialogue. Until those links are tested, this page reports the confirmed relationship without manufacturing a complete branch map.</p></section>`,
  lore: (p) => `<section><h2>Verified lore answer</h2><p>${esc(p.answer)}</p></section><section><h2>Biography and political context</h2>${facts(p.details)}</section><section><h2>How to read this in the game</h2><p>${esc(p.decision)}</p></section><section><h2>Evidence boundary</h2><p>${esc(clusters.lore.intro)}</p><p>Names, dates, origins, and roles here come from official biographies or world material. Motives are described only where the source states them; theories about hidden identities, boss phases, endings, or sequel roles remain outside the indexed answer.</p></section>`,
  family: (p) => `<section><h2>Family profile</h2><p>${esc(p.answer)}</p></section><section><h2>Confirmed relationships</h2>${facts(p.details)}</section><section><h2>Story significance</h2><p>${esc(p.decision)}</p></section><section><h2>What this page does not predict</h2><p>${esc(clusters.family.intro)}</p><p>The final game is expected to react to choices, so a pre-release profile cannot promise survival, romance, reconciliation, or a specific ending. Those claims must wait for captured and repeatable routes.</p></section>`,
  editions: (p) => `<section><h2>Purchase answer</h2><p>${esc(p.answer)}</p></section><section><h2>Included-content check</h2>${facts(p.details)}</section><section><h2>Who this option is for</h2><p>${esc(p.decision)}</p></section><section><h2>Before you order</h2><p>${esc(clusters.editions.intro)}</p><p>Check the selected country, platform, format, seller, delivery terms, and final cart description. A global comparison confirms the product structure but cannot guarantee that every edition remains in stock in every market.</p></section>`,
  pc: (p) => `<section><h2>Compatibility answer</h2><p>${esc(p.answer)}</p></section><section><h2>Official tier context</h2>${facts(p.details)}</section><section><h2>How to use the specification</h2><p>${esc(p.decision)}</p></section><section><h2>Benchmark boundary</h2><p>${esc(clusters.pc.intro)}</p><p>Do not convert a component name into an invented FPS claim. After launch, this page should add driver version, resolution, preset, upscaling mode, crowded-scene lows, and traversal stutter results from a repeatable test route.</p></section>`,
  development: (p) => `<section><h2>Confirmed production answer</h2><p>${esc(p.answer)}</p></section><section><h2>What the announcement establishes</h2>${facts(p.details)}</section><section><h2>Correct interpretation</h2><p>${esc(p.decision)}</p></section><section><h2>Scope boundary</h2><p>${esc(clusters.development.intro)}</p><p>Studio intent is useful evidence for scope and authorship. It is not a substitute for finished-game verification, and it should never be stretched into an unannounced sequel date, platform list, mechanic, or ending.</p></section>`,
};

function facts(items) {
  return `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
}

function pageHtml(p, related) {
  const [sourceName, sourceUrl] = resolveSource(p.source);
  const meta = `${p.answer} Verified from official or first-party material on ${DATE}.`;
  const body = formats[p.cluster](p);
  return `<!doctype html>
<html lang="en"><head>
    ${ADS}
    <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(p.title)} | Blood of Dawnwalker Guide</title>
    <meta name="description" content="${esc(meta)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${SITE}/${p.slug}/" /><link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="stylesheet" href="../styles.css" />
    <meta property="og:type" content="article" /><meta property="og:site_name" content="Blood of Dawnwalker Guide" />
    <meta property="og:title" content="${esc(p.title)}" /><meta property="og:description" content="${esc(meta)}" />
    <meta property="og:url" content="${SITE}/${p.slug}/" /><meta property="og:image" content="${SITE}/icon-512.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${schema(p.title, meta, p.slug, p.cluster, [p.answer, p.boundary])}</script>
    <link rel="alternate" hreflang="en" href="${SITE}/${p.slug}/" />
    <link rel="alternate" hreflang="x-default" href="${SITE}/${p.slug}/" />
  </head><body>
    ${nav()}
    <main class="article-main">
      <section class="article-hero"><div><p class="eyebrow">${esc(clusters[p.cluster].label)} · Verified ${DATE}</p><h1>${esc(p.title)}</h1><p class="hero-copy">${esc(p.answer)}</p><div class="article-meta"><span class="tag">Source-backed</span><span class="tag confirmed">Concrete answer</span></div></div></section>
      <div class="article-body"><article class="article-content">
        ${body}
        <section><h2>What is not confirmed</h2><p>${esc(p.boundary)}</p><p>This boundary is deliberate: the page can answer its named question now without pretending to be a launch walkthrough. It will be expanded only when official patch notes or reproducible play evidence adds a new, useful answer.</p></section>
        <section><h2>Source and verification</h2><p><a href="${esc(sourceUrl)}" target="_blank" rel="noreferrer">${esc(sourceName)}</a>. Checked ${DATE}. The wording on this page paraphrases the source and separates published facts from details that require the final game.</p></section>
        <section id="page-faq"><h2>FAQ</h2><dl class="faq-list"><div><dt>${esc(p.title)}</dt><dd>${esc(p.answer)}</dd></div><div><dt>What still needs launch verification?</dt><dd>${esc(p.boundary)}</dd></div></dl></section>
      </article><aside class="article-aside"><h2>${esc(clusters[p.cluster].label)}</h2><a href="../${clusters[p.cluster].hub}/">Open the parent hub</a>${related.map((r) => `<a href="../${r.slug}/">${esc(r.title)}</a>`).join("")}<a href="../guide-index/">All quality-approved guides</a></aside></div>
    </main>
    <footer class="site-footer"><p>Independent, unofficial Blood of Dawnwalker guide. Confirmed facts are sourced; unannounced details are labeled clearly.</p></footer>
  </body></html>`;
}

function hubHtml(clusterKey, clusterPages) {
  const c = clusters[clusterKey];
  const title = `${c.label} Hub`;
  const description = `${c.summary} Browse ${clusterPages.length} verified, source-backed guides without launch-build speculation.`;
  const groups = [clusterPages.slice(0, 4), clusterPages.slice(4)];
  const sourceSet = [...new Set(clusterPages.map((p) => resolveSource(p.source)[1]))];
  const schemaData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: title, description, url: `${SITE}/${c.hub}/`, inLanguage: "en", dateModified: DATE, isPartOf: { "@type": "WebSite", name: "Blood of Dawnwalker Guide", url: `${SITE}/` } },
      { "@type": "ItemList", numberOfItems: clusterPages.length, itemListElement: clusterPages.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${SITE}/${p.slug}/` })) },
    ],
  }).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="en"><head>
    ${ADS}<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)} | Blood of Dawnwalker Guide</title><meta name="description" content="${esc(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${SITE}/${c.hub}/" />
    <link rel="stylesheet" href="../styles.css" /><meta property="og:type" content="website" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${SITE}/${c.hub}/" /><meta property="og:image" content="${SITE}/icon-512.png" />
    <script type="application/ld+json">${schemaData}</script><link rel="alternate" hreflang="en" href="${SITE}/${c.hub}/" /><link rel="alternate" hreflang="x-default" href="${SITE}/${c.hub}/" />
  </head><body>${nav()}<main class="article-main"><section class="article-hero"><div><p class="eyebrow">Round 13 verified database</p><h1>${esc(title)}</h1><p class="hero-copy">${esc(c.summary)}</p><div class="article-meta"><span class="tag confirmed">${clusterPages.length} indexed guides</span><span class="tag">Updated ${DATE}</span></div></div></section><div class="article-body"><article class="article-content">
    <section><h2>What this hub covers</h2><p>${esc(c.intro)}</p><p>This collection is intentionally narrow. Every child URL resolves one search intent with a direct answer, evidence link, planning implication, and a clear list of what still requires the retail build. It does not expose placeholder quest names, guessed statistics, or cloned translations merely to raise the URL count.</p></section>
    <section><h2>Start with the confirmed answer</h2><div class="related-grid">${groups[0].map((p) => `<a href="../${p.slug}/"><strong>${esc(p.title)}</strong><span>${esc(p.answer)}</span></a>`).join("")}</div></section>
    <section><h2>Continue the database</h2><div class="related-grid">${groups[1].map((p) => `<a href="../${p.slug}/"><strong>${esc(p.title)}</strong><span>${esc(p.answer)}</span></a>`).join("")}</div></section>
    <section><h2>Evidence and update policy</h2><p>The hub uses official Bandai Namco and platform-holder material plus clearly identified first-party hands-on reporting. At launch, each page will be revised from repeatable play, with screenshots where they clarify a route, mechanic, item, comparison, or consequence. Pages that still cannot answer their query will remain outside the sitemap.</p><ul>${sourceSet.map((u) => `<li><a href="${esc(u)}" target="_blank" rel="noreferrer">${esc(u.split("://").pop().split("/").slice(0, 4).join("/"))}</a></li>`).join("")}</ul></section>
    <section><h2>Related site hubs</h2><div class="related-grid"><a href="../gameplay-guides/">Gameplay</a><a href="../walkthrough-guides/">Walkthrough</a><a href="../story-guides/">Story</a><a href="../technical-guides/">Technical</a><a href="../release-guides/">Release</a><a href="../guide-index/">Guide index</a></div></section>
  </article><aside class="article-aside"><h2>Round 13 clusters</h2>${Object.values(clusters).map((x) => `<a href="../${x.hub}/">${esc(x.label)}</a>`).join("")}</aside></div></main><footer class="site-footer"><p>Independent, unofficial Blood of Dawnwalker guide. Confirmed facts are sourced; unannounced details are labeled clearly.</p></footer></body></html>`;
}

function normalize(entry) {
  const [cluster, slug, title, answer, details, decision, boundary, source] = entry;
  return { cluster, slug, title, answer, details, decision, boundary, source };
}

const normalized = pages.map(normalize);
if (normalized.length !== 63) throw new Error(`Expected 63 leaf pages, found ${normalized.length}`);

for (const p of normalized) {
  const dir = path.join(ROOT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  const peers = normalized.filter((x) => x.cluster === p.cluster && x.slug !== p.slug).slice(0, 4);
  fs.writeFileSync(path.join(dir, "index.html"), pageHtml(p, peers));
}

for (const key of Object.keys(clusters)) {
  const clusterPages = normalized.filter((p) => p.cluster === key);
  const dir = path.join(ROOT, clusters[key].hub);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), hubHtml(key, clusterPages));
}

const languageRows = [
  ["English", "English", "Yes", "english-language-support"],
  ["French", "Français", "Yes", "french-language-support"],
  ["Italian", "Italiano", "Yes", "italian-language-support"],
  ["German", "Deutsch", "Yes", "german-language-support"],
  ["Spanish — Spain", "Español (España)", "Yes", "spanish-spain-language-support"],
  ["Polish", "Polski", "Yes", "polish-language-support"],
  ["Simplified Chinese", "简体中文", "No", "simplified-chinese-language-support"],
  ["Traditional Chinese", "繁體中文", "No", "traditional-chinese-language-support"],
  ["Japanese", "日本語", "No", "japanese-language-support"],
  ["Korean", "한국어", "No", "korean-language-support"],
  ["Czech", "Čeština", "No", "czech-language-support"],
  ["Hungarian", "Magyar", "No", "hungarian-language-support"],
  ["Portuguese — Brazil", "Português (Brasil)", "No", "portuguese-brazil-language-support"],
  ["Spanish — Latin America", "Español (Latinoamérica)", "No", "spanish-latin-america-language-support"],
  ["Turkish", "Türkçe", "No", "turkish-language-support"],
];

function languageSupportHtml() {
  const description = "The Blood of Dawnwalker supports 15 official languages: six include full audio and nine provide interface text and subtitles. Compare every confirmed language.";
  const table = languageRows.map(([english, local, audio, slug]) => `<tr><td><a href="../${slug}/">${esc(english)}</a></td><td>${esc(local)}</td><td>Yes</td><td>Yes</td><td>${audio}</td></tr>`).join("");
  const itemList = languageRows.map(([english, , audio, slug], index) => ({ "@type": "ListItem", position: index + 1, name: `${english} — ${audio === "Yes" ? "full audio" : "text and subtitles"}`, url: `${SITE}/${slug}/` }));
  const structured = JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", name: "The Blood of Dawnwalker Language Support", description, url: `${SITE}/language-support/`, inLanguage: "en", dateModified: DATE, isPartOf: { "@type": "WebSite", name: "Blood of Dawnwalker Guide", url: `${SITE}/` } },
    { "@type": "ItemList", numberOfItems: 15, itemListElement: itemList },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "How many languages does The Blood of Dawnwalker support?", acceptedAnswer: { "@type": "Answer", text: "The official Steam listing shows 15 supported languages." } },
      { "@type": "Question", name: "How many languages have full audio?", acceptedAnswer: { "@type": "Answer", text: "Six languages list full audio: English, French, Italian, German, Spanish from Spain, and Polish." } },
    ] },
  ] }).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="en"><head>${ADS}<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>All 15 Supported Languages and Full Audio | Blood of Dawnwalker</title><meta name="description" content="${esc(description)}" /><meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${SITE}/language-support/" /><link rel="stylesheet" href="../styles.css" /><meta property="og:type" content="website" /><meta property="og:title" content="All 15 Supported Languages and Full Audio" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${SITE}/language-support/" /><meta property="og:image" content="${SITE}/icon-512.png" /><script type="application/ld+json">${structured}</script>
  <link rel="alternate" hreflang="en" href="${SITE}/language-support/" /><link rel="alternate" hreflang="x-default" href="${SITE}/language-support/" /></head><body>${nav()}<main class="article-main">
  <section class="article-hero"><div><p class="eyebrow">Release Guide · Verified ${DATE}</p><h1>All 15 Supported Languages</h1><p class="hero-copy">${esc(description)}</p><div class="article-meta"><span class="tag confirmed">15 official languages</span><span class="tag">6 full-audio languages</span></div></div></section>
  <div class="article-body"><article class="article-content"><section><h2>Direct answer</h2><p>The Blood of Dawnwalker lists support for 15 languages. English, French, Italian, German, Spanish from Spain, and Polish include interface text, subtitles, and full audio. Simplified Chinese, Traditional Chinese, Japanese, Korean, Czech, Hungarian, Brazilian Portuguese, Latin American Spanish, and Turkish include interface text and subtitles but do not list full audio.</p><p>Spanish from Spain and Latin American Spanish are separate localization entries. They should not be merged in hreflang or purchase guidance because the official listing treats them as different language variants.</p></section>
  <section><h2>Language feature matrix</h2><div class="table-wrap"><table><thead><tr><th>Language</th><th>Local name</th><th>Interface</th><th>Subtitles</th><th>Full audio</th></tr></thead><tbody>${table}</tbody></table></div></section>
  <section><h2>What full audio means</h2><p>“Full audio” indicates that the store lists spoken dialogue support for that language, in addition to translated interface text and subtitles. A language without full audio is still officially supported for reading menus and subtitles; it should not be described as unsupported. Conversely, subtitle support must not be marketed as a complete dub.</p><p>Availability can also vary at the storefront or packaging level. Before buying a physical copy, check the regional box or retailer listing for included text and audio. For digital copies, review the platform's current language panel and any separate language-pack requirements.</p></section>
  <section><h2>How the site handles localization</h2><p>This guide provides a dedicated landing page for every official language and deeper German and Spanish guide clusters where complete localized content already exists. English pages without an equivalent translation send language-menu visitors to the correct language homepage instead of inventing an empty translated route. That keeps hreflang accurate and avoids hundreds of machine-generated thin pages.</p><p>After launch, additional translations should follow demonstrated search demand and available first-hand game data. A translated walkthrough should carry the same concrete steps, evidence, screenshots, and update status as its English counterpart; translation alone is not sufficient reason to index a URL.</p></section>
  <section><h2>Source and update policy</h2><p>The feature matrix is based on the <a href="https://store.steampowered.com/app/3751260/The_Blood_of_Dawnwalker/" target="_blank" rel="noreferrer">official Steam language table</a>, checked ${DATE}. Storefront metadata can change before release, so this page should be rechecked at launch and after major localization patches.</p></section>
  <section id="page-faq"><h2>FAQ</h2><dl class="faq-list"><div><dt>How many official languages are supported?</dt><dd>Fifteen.</dd></div><div><dt>Which languages have full audio?</dt><dd>English, French, Italian, German, Spanish from Spain, and Polish.</dd></div><div><dt>Do Chinese, Japanese, and Korean have subtitles?</dt><dd>Yes. Their listings include interface text and subtitles, but not full audio.</dd></div></dl></section>
  </article><aside class="article-aside"><h2>Language guide</h2><a href="../release-guides/">Release hub</a>${languageRows.slice(0, 8).map(([english, , , slug]) => `<a href="../${slug}/">${esc(english)}</a>`).join("")}<a href="../guide-index/">Guide index</a></aside></div></main><footer class="site-footer"><p>Independent, unofficial Blood of Dawnwalker guide. Confirmed facts are sourced; unannounced details are labeled clearly.</p></footer></body></html>`;
}

fs.writeFileSync(path.join(ROOT, "language-support", "index.html"), languageSupportHtml());

const additions = [
  ...Object.values(clusters).map((c) => c.hub),
  ...normalized.map((p) => p.slug),
].sort();

function updateSitemap(filename) {
  const file = path.join(ROOT, filename);
  let xml = fs.readFileSync(file, "utf8");
  const closing = "</urlset>";
  if (!xml.includes(closing)) throw new Error(`${filename} has no urlset closing tag`);
  const block = additions
    .filter((slug) => !xml.includes(`<loc>${SITE}/${slug}/</loc>`))
    .map((slug) => `  <url><loc>${SITE}/${slug}/</loc><lastmod>${DATE}</lastmod></url>`)
    .join("\n");
  xml = xml.replace(closing, `${block}${block ? "\n" : ""}${closing}`);
  fs.writeFileSync(file, xml);
}

updateSitemap("sitemap-en.xml");
updateSitemap("sitemap.xml");

const hubCards = Object.values(clusters)
  .map((c) => `<a href="../${c.hub}/"><strong>${esc(c.label)}</strong><span>${esc(c.summary)}</span></a>`)
  .join("");
for (const file of ["guide-index/index.html", "gameplay-guides/index.html", "walkthrough-guides/index.html", "story-guides/index.html", "technical-guides/index.html", "release-guides/index.html"]) {
  const abs = path.join(ROOT, file);
  let html = fs.readFileSync(abs, "utf8");
  if (!html.includes("ROUND13-HUBS:START")) {
    const section = `<section><!-- ROUND13-HUBS:START --><h2>Verified database expansion</h2><p>Browse the latest source-backed topic hubs. Each child page answers one query and keeps unverified launch details outside the index.</p><div class="related-grid">${hubCards}</div><!-- ROUND13-HUBS:END --></section>`;
    html = html.replace("</article>", `${section}</article>`);
    fs.writeFileSync(abs, html);
  }
}

const manifest = {
  generatedAt: DATE,
  round: 13,
  newHubs: Object.entries(clusters).map(([cluster, c]) => ({ cluster, route: `/${c.hub}/`, label: c.label })),
  newLeaves: normalized.map((p) => ({ route: `/${p.slug}/`, cluster: p.cluster, title: p.title, source: resolveSource(p.source)[1] })),
  addedIndexableUrls: additions.length,
  projectedSitemap: { en: 291, total: 393 },
};
fs.writeFileSync(path.join(ROOT, "ROUND_13_URL_MANIFEST.json"), JSON.stringify(manifest, null, 2) + "\n");

const report = `# SEO Round 13 — Controlled URL Expansion

Date: ${DATE}

- Added 63 concrete-answer leaf pages across eight distinct content systems.
- Added 8 collection hubs with ItemList schema and contextual internal links.
- Upgraded the legacy language-support page from noindex to a 15-language comparison resource.
- English sitemap target: 291 URLs.
- All-language sitemap target: 393 URLs.
- Existing 171 noindex placeholders were not promoted.
- Sources: official Bandai Namco pages, PlayStation Blog, and Xbox Wire first-party hands-on material.

## Content mix

${Object.entries(clusters).map(([key, c]) => `- ${c.label}: 1 hub + ${normalized.filter((p) => p.cluster === key).length} leaf pages`).join("\n")}

## Quality policy

Every new leaf contains a direct answer, distinct evidence, a practical use or decision, an explicit verification boundary, a source link, FAQ schema, breadcrumbs, and relevant cluster links. Eight page layouts are used so purchase comparisons, PC requirements, lore profiles, prologue activities, combat mechanics, world consequences, family profiles, and development insights do not collapse into one generic template.
`;
fs.writeFileSync(path.join(ROOT, "SEO_ROUND_13_REPORT.md"), report);

console.log(JSON.stringify({ added: additions.length, leaves: normalized.length, hubs: Object.keys(clusters).length }, null, 2));
