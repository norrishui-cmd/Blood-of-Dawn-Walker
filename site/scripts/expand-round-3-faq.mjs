import { readFile, writeFile } from 'node:fs/promises';
const file = new URL('../faq/index.html', import.meta.url);
let html = await readFile(file, 'utf8');
html = html.replace('FAQ · 40+ Answers','FAQ · 60+ Answers')
  .replace('editions, romance, combat, PC requirements','editions, romance, combat, monsters, locations, PC requirements')
  .replaceAll('Updated July 16, 2026','Updated July 18, 2026')
  .replaceAll('Last checked: July 16, 2026.','Last checked: July 18, 2026.');
const section = `<section id="monsters-locations"><h2>Monsters, Vampires, and Locations</h2><dl class="faq-list">
<div><dt>Who are the vrakhiri?</dt><dd>The vrakhiri are the ancient vampires ruling Vale Sangora. Brencis leads the disclosed group, which includes Xanthe, Ambrus, and Bakir. See the <a href="../vrakhiri/">vrakhiri guide</a>.</dd></div>
<div><dt>Who is Xanthe?</dt><dd>Xanthe is the oldest disclosed vrakhiri, formerly a priestess in Ancient Greece. She creates Blood Guards and uses blood-control powers.</dd></div>
<div><dt>What are Blood Guards?</dt><dd>They are human servants whose bodies and minds are bound to the vrakhiri through dark blood rites. They are stronger than normal human enemies.</dd></div>
<div><dt>Are Blood Guards vampires?</dt><dd>They are humans tainted and transformed by vampire blood, not members of the ancient vrakhiri group.</dd></div>
<div><dt>What are kobolds?</dt><dd>Kobolds are small creatures that control Vale Sangora's mines and attack distracted prey in groups from tunnels and shadows.</dd></div>
<div><dt>What are the ancient undead?</dt><dd>They are former warriors and guardians trapped between life and death, still protecting someone or something within old ruins.</dd></div>
<div><dt>What is a psoglav?</dt><dd>A psoglav is a canine corrupted after a vrakhiri fang becomes lodged in its body, creating a blood-driven predator.</dd></div>
<div><dt>Are there werewolves in Dawnwalker?</dt><dd>No werewolf or lycanthrope has been confirmed. The studio instead names murohni, kobolds, uriashi, likhos, psoglavs, and other creatures.</dd></div>
<div><dt>What is Svartrau?</dt><dd>Svartrau is the silver-rich capital of Vale Sangora. Cellars, caves, crypts, and timeless ruins form a maze under the city.</dd></div>
<div><dt>Where is Howling Keep?</dt><dd>Local stories place the disappearing mansion deep in the Tantari Woods. Exact access conditions and its lady's identity remain unrevealed.</dd></div>
<div><dt>What happened at Shrike's Crag?</dt><dd>Skender Dragosti massacred surviving peasant rebels at the old quarry. Locals consider the blood-soaked site cursed.</dd></div>
<div><dt>Is Vale Sangora a real place?</dt><dd>No. It is a fictional Carpathian valley inspired by Central and Eastern European landscapes, history, folklore, and cultures.</dd></div>
</dl></section>\n          `;
if (!html.includes('id="monsters-locations"')) html = html.replace('<section><h2>New In-Depth Answers</h2>', section + '<section><h2>New In-Depth Answers</h2>');
await writeFile(file, html);
