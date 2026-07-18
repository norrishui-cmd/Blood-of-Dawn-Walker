import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const site = 'https://bloodofdawnwalker.cc';
const updated = '2026-07-17';

const pages = [
  {
    slug: 'gone-gold',
    eyebrow: 'Release Status',
    title: 'The Blood of Dawnwalker Has Gone Gold',
    description: 'The Blood of Dawnwalker went gold on July 15, 2026. Learn what gold status means for the September 3 release, physical copies, and a possible day-one patch.',
    answer: '<strong>Yes.</strong> Rebel Wolves announced on July 15, 2026 that The Blood of Dawnwalker has gone gold. The September 3 launch for PC, PS5, and Xbox Series X|S is therefore on track.',
    sections: [
      ['What “Gone Gold” Means', 'Gold status means the launch build has reached the point where it can be submitted for platform certification and prepared for physical manufacturing. It is a strong release-readiness milestone, although it is not a promise that the shipped build will never receive another change. Studios normally continue testing and preparing updates after a game goes gold.'],
      ['Does Gold Status Guarantee No Delay?', 'It makes a delay much less likely because the core launch build is complete and the announced date is only several weeks away. It is still more accurate to say the September 3 release is on track than to claim a delay is impossible. The official storefronts continue to list September 3, 2026.'],
      ['Could There Still Be a Day-One Patch?', 'Yes. Going gold does not prevent Rebel Wolves from fixing bugs, tuning performance, or updating balance before launch. No final day-one patch size or contents are confirmed yet. Players should treat download-size claims as unverified until the publisher or platform stores publish them.'],
      ['What Players Should Watch Next', 'The next high-intent launch details are the exact regional unlock schedule, preload timing, review embargo, final console performance modes, and any launch patch notes. Those details affect when players can start and what they need to download, but they should not be guessed from the gold announcement alone.']
    ],
    faqs: [
      ['When did The Blood of Dawnwalker go gold?', 'Rebel Wolves announced gold status on July 15, 2026.'],
      ['Is the September 3 release still happening?', 'Yes. The game is on track to release September 3, 2026 on PC, PS5, and Xbox Series X|S.'],
      ['Does going gold mean there will be no launch patch?', 'No. Testing and patch work can continue after the launch build goes gold.']
    ],
    related: [['Release Date','release-date'],['Platforms','platforms'],['PC Requirements','system-requirements'],['Preorder','preorder'],['Latest Updates','updates']],
    sources: [['Rebel Wolves gold announcement coverage','https://www.psu.com/news/the-blood-of-dawnwalker-has-gone-gold-ahead-of-september-launch/'],['Official release announcement','https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-will-launch-september-3-rebel-wolves-revealed-key-details']]
  },
  {
    slug: 'character-creation',
    eyebrow: 'Character FAQ',
    title: 'Does The Blood of Dawnwalker Have Character Creation?',
    description: 'The Blood of Dawnwalker does not use a custom protagonist. Learn what can and cannot be customized when you play as Coen.',
    answer: '<strong>No custom protagonist has been announced.</strong> The game follows Coen, a predefined male lead with his own family, history, voice, and role in the story. Player choice shapes his behavior and development rather than replacing him with a created hero.',
    sections: [
      ['Why You Play as Coen', 'Rebel Wolves built the narrative around Coen’s relationship with his captured family and his incomplete transformation into a vampire. A fixed protagonist lets quests, performances, relationships, and consequences react to a specific character while still allowing the player to decide what kind of person he becomes.'],
      ['Can You Choose Coen’s Gender?', 'No gender-selection option has been announced. Official materials consistently present Coen as the protagonist. Images or videos showing an alternate custom protagonist should be treated as fan concepts unless Rebel Wolves announces a new mode.'],
      ['What Can You Customize?', 'The game supports role-playing through choices, skills, equipment, human magic, vampire abilities, and different ways of resolving quests. Official edition listings also confirm armor for Coen. A complete list of hairstyles, face options, transmog rules, dyes, or appearance-editing services has not been confirmed.'],
      ['Choices Still Change the Character', 'A predefined protagonist does not mean a fixed playthrough. Coen can build alliances, pursue relationships, decide whom to help, feed on people or animals, and approach objectives by day or night. Those choices can change his abilities, reputation, available information, and story outcomes.']
    ],
    faqs: [
      ['Can you make your own character in The Blood of Dawnwalker?', 'No. You play as the predefined protagonist Coen.'],
      ['Can you play as a female protagonist?', 'No alternate protagonist or gender-selection feature has been announced.'],
      ['Can Coen’s build be customized?', 'Yes. Skills, equipment, magic, vampire powers, choices, and quest approaches let players shape how Coen plays.']
    ],
    related: [['Coen Guide','coen'],['Human vs Vampire','human-vampire'],['Skills','skills'],['Characters','characters'],['Choices and Consequences','choices-consequences']],
    sources: [['Official Xbox game page','https://www.xbox.com/en-US/games/the-blood-of-dawnwalker'],['Developer interview on the predefined protagonist','https://www.techradar.com/gaming/the-blood-of-dawnwalker-interview']]
  },
  {
    slug: 'blood-hunger',
    eyebrow: 'Vampire System',
    title: 'The Blood of Dawnwalker Blood Hunger System Explained',
    description: 'How Coen’s blood hunger meter works, what happens when it empties, and whether you can feed on animals instead of important NPCs.',
    answer: 'Coen has a <strong>blood hunger meter</strong>. If it falls too low, hunger can take control and force a feeding outcome during dialogue. Players can feed on animals as well as humans, but every choice may carry different risks and consequences.',
    sections: [
      ['What Happens at Critical Hunger', 'A demonstrated low-hunger state covers normal dialogue options with a red command to give in to hunger. The player can no longer refuse that impulse in the shown encounter. This turns hunger into a narrative system rather than a simple combat debuff: neglecting it can remove choice and kill a character who might otherwise matter.'],
      ['Can You Feed on Animals?', 'Yes. Rebel Wolves has specifically named deer, bears, and wolves as possible sources of blood. Feeding on wildlife may avoid the immediate social consequences of attacking a human, although the final amount restored, combat risk, and ecological availability still need hands-on testing.'],
      ['Can You Avoid Killing Important NPCs?', 'The safest pre-release answer is to manage hunger before entering important conversations. The game has shown that severe hunger can override dialogue choice, so players who want to protect an NPC should not assume they can always back out once the critical state begins. Exact thresholds and save behavior remain untested.'],
      ['Hunger and Role-Playing', 'The system supports several character directions. A player may protect people and hunt animals, use willing or hostile humans when available, or embrace a more predatory Coen. Because NPC deaths do not necessarily stop the game, the world can continue while reflecting the consequences of how Coen feeds.']
    ],
    faqs: [
      ['What happens when Coen runs out of blood?', 'Critical hunger can override normal dialogue choices and force Coen to give in and feed.'],
      ['Can Coen drink animal blood?', 'Yes. Deer, bears, and wolves have been named as possible feeding targets.'],
      ['Can blood hunger kill quest NPCs?', 'A demonstrated hunger outcome can kill an NPC, so hunger management may affect quests and relationships.']
    ],
    related: [['Stealth Feeding','stealth-feeding'],['Vampire Powers','vampire-powers'],['Choices and Consequences','choices-consequences'],['Human vs Vampire','human-vampire'],['FAQ Hub','faq']],
    sources: [['PlayStation Blog hands-on feature','https://blog.playstation.com/2026/04/28/choices-and-consequences-in-the-blood-of-dawnwalker-out-september-3/']]
  },
  {
    slug: 'omni-block',
    eyebrow: 'Combat System',
    title: 'What Is Omni-Block in The Blood of Dawnwalker?',
    description: 'Omni-Block explained: how the accessible defense option differs from directional blocking, parrying, and free attacks in Dawnwalker combat.',
    answer: '<strong>Omni-Block is an optional defensive aid</strong> designed for players who do not want to manually match every incoming attack direction. The deeper directional combat remains available for players who want more precision.',
    sections: [
      ['Directional Combat Basics', 'Human sword combat reads enemy movement and attack direction. Players can block, parry, dodge, and counter rather than relying only on repeated light attacks. The design takes inspiration from directional fighting systems but is intended to remain cinematic and readable in an open-world RPG.'],
      ['What Omni-Block Changes', 'Omni-Block reduces the directional burden when defending. It should not be confused with invulnerability or an automatic win button: timing, stamina or other combat resources, enemy patterns, positioning, and follow-up decisions can still matter. Final menu wording and difficulty interactions require launch verification.'],
      ['Can You Still Use Manual Directional Defense?', 'Yes. The combat system is built to support players who want to select attack and defense directions. Omni-Block is presented as a choice for accessibility and comfort, not a replacement for the entire combat model.'],
      ['How Abilities Fit Into Combat', 'Successful swordplay helps generate activation charges used for stronger abilities. Human Coen can combine weapons with hex magic, while vampire Coen uses claws, supernatural movement, and feeding-related powers. The best defense setting may therefore depend on form, enemy type, and the abilities in a build.']
    ],
    faqs: [
      ['Is Omni-Block automatic parrying?', 'No. It assists with block direction; it should not be assumed to automatically parry every attack.'],
      ['Can Omni-Block be turned off?', 'It has been discussed as an optional approach, allowing players to use the directional system.'],
      ['Is Dawnwalker combat turn-based?', 'No. Combat is real-time and uses directional melee actions, magic, vampire powers, blocks, parries, and dodges.']
    ],
    related: [['Combat Guide','combat'],['Human vs Vampire','human-vampire'],['Skills','skills'],['Gameplay','gameplay'],['Beginner Guide','beginner-guide']],
    sources: [['Combat design interview','https://www.gamesradar.com/games/action-rpg/the-blood-of-dawnwalker-director-compares-the-rpgs-excellent-fantasy-combat-to-max-payne-and-guitar-hero-oh-god-it-was-a-lot-of-iteration/']]
  },
  {
    slug: 'compel-soul',
    eyebrow: 'Human Magic',
    title: 'Compel Soul in The Blood of Dawnwalker Explained',
    description: 'Compel Soul is a human-form hex that lets Coen speak with the dead and unlock new information or quest branches. Here is what is confirmed.',
    answer: '<strong>Compel Soul is a human-form spell</strong> that allows Coen to communicate with the dead. It can reveal missing context and open alternative quest branches, making it useful for investigation rather than only combat.',
    sections: [
      ['How Coen Learns Human Magic', 'Magic is tied to runes carved into Coen’s human flesh. When he becomes a vampire, supernatural regeneration heals those scars, which explains why the same hexes are not available in vampire form. Discovering magical knowledge in the world gives daytime play a unique advantage.'],
      ['What Compel Soul Does', 'The revealed use is speaking with a dead character to obtain information that living witnesses may not provide. That information can change how a player understands an event or unlock another solution. Exact targets, time costs, upgrades, and combat applications have not been fully published.'],
      ['Why Time of Day Matters', 'A corpse or clue may be approachable in both forms, but only human Coen can use the disclosed hex system. Players may need to decide whether the additional context is worth returning by day or spending time on a related quest action. This is one example of the two gameplay loops producing different story knowledge.'],
      ['Is Compel Soul Required?', 'No official source says the spell is mandatory for finishing the game. Dawnwalker is designed around optional stories and multiple solutions. It is more accurate to view Compel Soul as an investigative tool that can reveal routes unavailable to another build or time-of-day approach.']
    ],
    faqs: [
      ['What does Compel Soul do?', 'It lets human Coen communicate with the dead and can reveal information or new quest branches.'],
      ['Can vampire Coen use Compel Soul?', 'The revealed hex magic belongs to human Coen; vampire regeneration removes the carved runes that enable it.'],
      ['Is Compel Soul a combat spell?', 'Its confirmed use is investigative. Any combat use or exact upgrades still need verification.']
    ],
    related: [['Skills Guide','skills'],['Human vs Vampire','human-vampire'],['Day and Night System','day-night-system'],['Quests','quests'],['Choices and Consequences','choices-consequences']],
    sources: [['Human combat and magic feature','https://www.gamesradar.com/games/rpg/the-blood-of-dawnwalker-devs-were-afraid-that-people-wouldnt-want-to-play-as-human-coen-so-it-set-out-to-create-a-combat-system-that-can-set-a-new-standard-for-rpgs/']]
  },
  {
    slug: 'game-length',
    eyebrow: 'Playtime FAQ',
    title: 'How Long Is The Blood of Dawnwalker?',
    description: 'The developers estimate 55–70 hours for a playthrough. Learn why the 30-day story limit is not the same as real-world playtime.',
    answer: 'Developer playthroughs have taken roughly <strong>55 to 70 hours</strong>. That is an estimate rather than a guaranteed campaign length, and the 30 in-game days do not equal 30 real-world hours.',
    sections: [
      ['Why Playtime Varies', 'The narrative sandbox lets players choose which stories, alliances, investigations, and upgrades are worth their limited in-game time. Someone who pushes toward Brencis early may finish much faster, while an explorer who reads lore and completes most available arcs can spend considerably longer.'],
      ['30 Days Does Not Mean 30 Hours', 'The clock does not run continuously while you explore. Time advances when the player accepts a clearly communicated cost for a meaningful action. You can travel around, inspect locations, and read without losing minutes simply because the game is running.'],
      ['Can You Complete Everything?', 'Rebel Wolves has said it is impossible to see every story and arc in one playthrough, while more recent testing suggests many players can complete around 80 percent before the deadline. This is designed to support different routes and replays, not to hide a real-time speedrun requirement.'],
      ['Main Story vs Completionist Time', 'The final main-story average, fastest route, and full achievement time cannot be measured reliably until release. Pre-launch estimates should not be presented as HowLongToBeat-style community data. The 55–70 hour figure is best used as a broad expectation from internal playthroughs.']
    ],
    faqs: [
      ['How many hours is The Blood of Dawnwalker?', 'Developer playthroughs have taken about 55–70 hours.'],
      ['Does the 30-day limit mean the game lasts 30 hours?', 'No. In-game time advances through meaningful actions, not continuous real time.'],
      ['Can you finish every quest in one run?', 'The developers say not every story and arc can be completed in one playthrough.']
    ],
    related: [['30 Days Guide','30-days'],['What Happens After 30 Days','after-30-days'],['Quests','quests'],['Endings','endings'],['Gameplay','gameplay']],
    sources: [['PlayStation Blog playtime and time-system feature','https://blog.playstation.com/2026/04/28/choices-and-consequences-in-the-blood-of-dawnwalker-out-september-3/'],['Official narrative sandbox announcement','https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-rebel-wolves-unveiled-their-upcoming-narrative-sandbox']]
  },
  {
    slug: 'exploration-time-cost',
    eyebrow: 'Time System FAQ',
    title: 'Does Exploration Use Time in The Blood of Dawnwalker?',
    description: 'Exploration does not drain Dawnwalker’s 30-day clock. Learn which activities spend time and how the game warns you before a cost.',
    answer: '<strong>No.</strong> Free exploration, idling, and reading do not continuously advance the 30-day clock. Time is spent on narratively meaningful actions, and the cost is communicated before the player commits.',
    sections: [
      ['Safe Exploration vs Time-Spending Actions', 'Walking through Vale Sangora, searching an area, reading discovered material, and taking time to plan do not function like a real-time countdown. Confirmed time-spending examples include some quest stages, certain dialogue decisions, and learning particular abilities.'],
      ['Will the Game Hide Time Costs?', 'The developers say they always communicate how much time remains and how much an activity consumes. Players should therefore be able to decide whether a result is worth its cost. Exact interface icons and whether every cost can be cancelled still need final verification.'],
      ['Can You Explore the Whole Map First?', 'Nothing confirmed prevents long exploration sessions, but access to locations may depend on story progress, abilities, form, or time of day. “Exploration is free” means the clock does not tick simply because you wander; it does not mean every region is open from the first minute.'],
      ['How to Plan a First Playthrough', 'Explore freely when you need routes, resources, or context, then read the displayed cost before advancing a quest or skill. Keep enough days for the family objective instead of assuming every optional story can fit. The system is designed to make selection meaningful, not to punish players for looking around.']
    ],
    faqs: [
      ['Does walking around advance time?', 'No. Normal exploration does not continuously advance the 30-day clock.'],
      ['Do quests advance time?', 'Some quest stages and other meaningful actions spend time, with the cost shown to the player.'],
      ['Can you pause the timer?', 'There is no continuous real-time timer to pause while exploring. Manual reversal of spent time has not been announced.']
    ],
    related: [['30 Days Guide','30-days'],['Gameplay','gameplay'],['Day and Night System','day-night-system'],['World Map','world-map'],['What Happens After 30 Days','after-30-days']],
    sources: [['Recent developer interview on time as a deliberate resource','https://www.digitallydownloaded.net/2026/07/interview-the-blood-of-dawnwalker-wants-you-to-fail-forward.html'],['PlayStation Blog time-system feature','https://blog.playstation.com/2026/04/28/choices-and-consequences-in-the-blood-of-dawnwalker-out-september-3/']]
  },
  {
    slug: 'after-30-days',
    eyebrow: 'Ending FAQ',
    title: 'What Happens After 30 Days in The Blood of Dawnwalker?',
    description: 'Running out of time is not an automatic game over in The Blood of Dawnwalker. The story continues with consequences based on your choices and preparation.',
    answer: 'Reaching the end of the 30-day period is <strong>not an automatic game over</strong>. The story moves forward and applies consequences. The exact fate of Coen’s family and the ending conditions remain intentionally unrevealed.',
    sections: [
      ['The Deadline Is a Consequence Trigger', 'The 30 days create urgency around saving Coen’s family, but Rebel Wolves does not simply erase the save when the clock expires. The game evaluates what the player did, what they ignored, who survived, and how prepared Coen is for the confrontation ahead.'],
      ['Can You Still Finish the Game?', 'Developers have said the game continues after the time runs out. They have also confirmed multiple endings and many optional stories. It is therefore reasonable to expect a finishable route, but not to promise that every family member or desired outcome remains available.'],
      ['Can You Attack Brencis Before the Deadline?', 'Yes, once the relevant point is reached, players can choose to confront Brencis instead of completing the wider set of stories. The direct route is expected to be significantly harder because Coen may lack allies, abilities, equipment, and information earned through preparation.'],
      ['Should You Reload If Time Runs Out?', 'That depends on the outcome you want. A first playthrough can continue and show the consequences naturally. Completionists may later use saves or another run to pursue different stories, but exact autosave slots, manual-save rules, and point-of-no-return warnings need launch testing.']
    ],
    faqs: [
      ['Is running out of time a game over?', 'No. The story continues with consequences.'],
      ['Can Coen still confront Brencis after the deadline?', 'The exact post-deadline sequence is unrevealed, but developers say the game continues rather than ending automatically.'],
      ['Does the family always die after 30 days?', 'No official source has revealed a universal outcome. The result depends on the narrative and player choices.']
    ],
    related: [['30 Days Guide','30-days'],['Endings','endings'],['Choices and Consequences','choices-consequences'],['Brencis','brencis'],['Quests','quests']],
    sources: [['PlayStation Blog developer comments on the deadline','https://blog.playstation.com/2026/04/28/choices-and-consequences-in-the-blood-of-dawnwalker-out-september-3/'],['Official narrative sandbox announcement','https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-rebel-wolves-unveiled-their-upcoming-narrative-sandbox']]
  },
  {
    slug: '30-days',
    eyebrow: 'Core Time System',
    title: 'The Blood of Dawnwalker 30-Day Time Limit Explained',
    description: 'A complete, spoiler-light explanation of Dawnwalker’s 30 in-game days: what advances time, whether exploration is safe, and what happens at the deadline.',
    answer: 'Coen has <strong>30 in-game days and nights</strong> to save his family. This is not a real-time countdown: exploration does not drain the clock, while clearly marked, narratively meaningful actions spend time. Reaching the deadline is not an automatic game over.',
    sections: [
      ['What Actually Advances the Clock', 'Confirmed examples include completing certain quest stages, making some dialogue decisions, and learning particular abilities. The game communicates the cost before the player commits, so time functions like a currency. Walking around, reading, and considering a decision do not continuously spend it.'],
      ['Can You Complete Most of the Game?', 'Developers say most players can complete a majority of the content. A July interview indicated testers often saw around 80 percent and reached the final phase near day 22 or 24 when they did not try to exhaust every possible arc. The game is designed so every story cannot fit into one run.'],
      ['What Happens at Day 30', 'The story continues with consequences rather than displaying an immediate game-over screen. Exact family outcomes and ending requirements remain unrevealed, but the player keeps control over whether to prepare further or focus on the main objective as the deadline approaches.'],
      ['Can You Fight Brencis Early?', 'After reaching the necessary point, Coen can attempt a more direct confrontation with Brencis. Skipping allies, powers, information, and equipment makes that route much harder. The time system therefore asks how much preparation is worth its cost rather than forcing one ideal quest order.']
    ],
    faqs: [
      ['Is the 30-day limit real time?', 'No. The clock advances through marked story actions, not every minute you play.'],
      ['Does exploration consume days?', 'No. Ordinary exploration does not advance the clock.'],
      ['Is day 30 an automatic game over?', 'No. The story moves forward with consequences.']
    ],
    related: [['Exploration Time Cost','exploration-time-cost'],['After 30 Days','after-30-days'],['Day and Night System','day-night-system'],['Choices and Consequences','choices-consequences'],['Game Length','game-length']],
    sources: [['PlayStation Blog time-system feature','https://blog.playstation.com/2026/04/28/choices-and-consequences-in-the-blood-of-dawnwalker-out-september-3/'],['Official narrative sandbox announcement','https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-rebel-wolves-unveiled-their-upcoming-narrative-sandbox'],['July developer interview','https://www.digitallydownloaded.net/2026/07/interview-the-blood-of-dawnwalker-wants-you-to-fail-forward.html']]
  },
  {
    slug: 'day-night-system',
    eyebrow: 'Dual Gameplay Loop',
    title: 'The Blood of Dawnwalker Day and Night System Explained',
    description: 'Compare human Coen by day with vampire Coen by night, including magic, movement, feeding, quests, and different solutions.',
    answer: 'Day and night create <strong>two connected gameplay loops</strong>. Human Coen uses swords and carved-rune hex magic; vampire Coen gains supernatural movement, claws, bites, and powers. Quests and discoveries can change depending on which form you use.',
    sections: [
      ['Human Coen During the Day', 'Coen’s human form uses grounded medieval sword combat and dark hexes. Compel Soul, for example, can speak with the dead and reveal new quest context. Runes must be carved into human flesh, giving the daytime form investigative and magical options unavailable after vampire regeneration heals the marks.'],
      ['Vampire Coen at Night', 'At night, Coen becomes physically stronger and can use claws, bites, supernatural mobility, and gravity-defying traversal. Blood hunger also becomes an important narrative risk: if neglected, it can remove normal dialogue options and force Coen to feed.'],
      ['Do Quests Change by Time of Day?', 'The developers describe different abilities, mysteries, and ways to achieve goals across both loops. That does not prove every quest has two complete versions. The reliable pre-release rule is that time of day can change access, information, combat tools, and outcomes on a case-by-case basis.'],
      ['Can You Freely Switch Day and Night?', 'Players can choose different day or night approaches, but the final waiting, resting, and switching interface has not been fully documented. Do not assume that changing form is free or available inside every objective until the release build confirms the exact rule.']
    ],
    faqs: [
      ['Is Coen human during the day?', 'Yes. He uses swordplay and human-only hex magic during the day.'],
      ['What changes at night?', 'Coen becomes a vampire with claws, bites, supernatural movement, and other powers.'],
      ['Can the same quest have different solutions?', 'Yes. The dual gameplay loops can offer different information, abilities, and approaches.']
    ],
    related: [['Human vs Vampire','human-vampire'],['Compel Soul','compel-soul'],['Blood Hunger','blood-hunger'],['30-Day System','30-days'],['Vampire Powers','vampire-powers']],
    sources: [['Official Xbox features','https://www.xbox.com/en-US/games/the-blood-of-dawnwalker'],['Official gameplay reveal recap','https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap'],['Human combat and magic feature','https://www.gamesradar.com/games/rpg/the-blood-of-dawnwalker-devs-were-afraid-that-people-wouldnt-want-to-play-as-human-coen-so-it-set-out-to-create-a-combat-system-that-can-set-a-new-standard-for-rpgs/']]
  },
  {
    slug: 'combat',
    eyebrow: 'Combat Guide',
    title: 'The Blood of Dawnwalker Combat System Explained',
    description: 'How Dawnwalker combat works: directional sword attacks, blocking, parrying, Omni-Block, activation charges, human magic, and vampire powers.',
    answer: 'Combat is <strong>real-time and directional</strong>. Players read enemy attacks, choose strike and defense directions, block, parry, dodge, and spend activation charges on stronger abilities. Human and vampire Coen use different toolsets.',
    sections: [
      ['Directional Sword Fighting', 'Human combat draws on medieval sword techniques. Attacks and defense respond to direction and timing rather than operating as a turn-based system. Enemies have patterns to learn, while free attacks and reactive parries create openings. Final frame windows and stamina costs still need launch testing.'],
      ['Omni-Block and Accessibility', 'Omni-Block is an optional way to reduce the need to manually match every incoming direction. It should not be described as automatic parrying or invulnerability. Players who want the deeper directional system can still use it, while others can choose a less demanding defensive input style.'],
      ['Activation Charges and Abilities', 'Effective combat builds activation charges that power stronger actions. Human Coen combines swordplay with upgradeable hex magic. Vampire Coen uses claws, bites, supernatural strength, and movement, changing both his attack rhythm and the routes available through an encounter.'],
      ['Is It a Soulslike?', 'Rebel Wolves markets the game as an open-world action RPG, not a Soulslike. Pattern reading and parrying may feel familiar to action-RPG players, but the wider design focuses on narrative choice, day and night forms, alliances, and a time-driven open world.']
    ],
    faqs: [
      ['Is combat turn-based?', 'No. The Blood of Dawnwalker uses real-time action combat.'],
      ['Does the game have parrying?', 'Yes. Blocking, parrying, dodging, and directional attacks are part of combat.'],
      ['What is Omni-Block?', 'It is an optional defensive aid that reduces directional input demands.']
    ],
    related: [['Omni-Block','omni-block'],['Human vs Vampire','human-vampire'],['Skills','skills'],['Vampire Powers','vampire-powers'],['Beginner Guide','beginner-guide']],
    sources: [['Recent combat design interview','https://www.gamesradar.com/games/action-rpg/the-blood-of-dawnwalker-director-compares-the-rpgs-excellent-fantasy-combat-to-max-payne-and-guitar-hero-oh-god-it-was-a-lot-of-iteration/'],['Official Road to Launch announcement','https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-will-launch-september-3-rebel-wolves-revealed-key-details']]
  }
];

const escapeJson = value => JSON.stringify(value).replaceAll('<', '\\u003c');
const plain = html => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function render(page) {
  const url = `${site}/${page.slug}/`;
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage', url,
    mainEntity: page.faqs.map(([q, a]) => ({'@type':'Question', name:q, acceptedAnswer:{'@type':'Answer', text:a}}))
  };
  const webPage = {
    '@context':'https://schema.org','@type':'WebPage',name:page.title,description:page.description,url,inLanguage:'en',dateModified:updated,
    isPartOf:{'@type':'WebSite',name:'Blood of Dawnwalker Guide',url:`${site}/`},
    breadcrumb:{'@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${site}/`},
      {'@type':'ListItem',position:2,name:page.title,item:url}
    ]}
  };
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Blood of Dawnwalker Guide" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${site}/icon-512.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${escapeJson(webPage)}</script>
    <script type="application/ld+json" data-seo-faq="true">${escapeJson(faqSchema)}</script>
    <link rel="alternate" type="application/atom+xml" title="Blood of Dawnwalker Guide Updates" href="/feed.xml" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header"><a class="brand" href="../"><span class="brand-mark">BD</span><span><strong>Blood of Dawnwalker</strong><small>Guide &amp; Wiki</small></span></a><nav aria-label="Main navigation"><a href="../release-guides/">Release</a><a href="../gameplay-guides/">Gameplay</a><a href="../faq/">FAQ</a><a href="../guide-index/">All Guides</a></nav></header>
    <main class="article-main">
      <section class="article-hero"><div><p class="eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p class="hero-copy">${page.description}</p><div class="article-meta"><span class="tag confirmed">Verified July 17, 2026</span><span class="tag confirmed">Pre-release facts</span></div></div></section>
      <div class="article-body"><article class="article-content">
        <section class="verification-box"><h2>Quick Answer</h2><p>${page.answer}</p><p>Confirmed facts are separated from details that still need launch-day testing.</p></section>
        ${page.sections.map(([h, body]) => `<section><h2>${h}</h2><p>${body}</p></section>`).join('')}
        <section><h2>Related Guides</h2><div class="related-grid">${page.related.map(([name, slug]) => `<a href="../${slug}/">${name}</a>`).join('')}</div></section>
        <section><h2>Sources</h2><ul>${page.sources.map(([name, href]) => `<li><a href="${href}" target="_blank" rel="noreferrer">${name}</a></li>`).join('')}</ul><p>See the <a href="../sources/">editorial and sourcing policy</a> for verification rules.</p></section>
        <section id="page-faq"><h2>FAQ</h2><dl class="faq-list">${page.faqs.map(([q,a]) => `<div><dt>${q}</dt><dd>${a}</dd></div>`).join('')}</dl></section>
      </article><aside class="article-aside"><h2>At a Glance</h2><p>${plain(page.answer)}</p>${page.related.slice(0,4).map(([name, slug]) => `<a href="../${slug}/">${name}</a>`).join('')}</aside></div>
    </main>
  </body>
</html>\n`;
}

for (const page of pages) {
  const dir = path.join(root, page.slug);
  await mkdir(dir, {recursive:true});
  await writeFile(path.join(dir, 'index.html'), render(page));
}

console.log(`Generated ${pages.length} verified SEO pages.`);
