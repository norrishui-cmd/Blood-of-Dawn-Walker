import { readFile, writeFile } from 'node:fs/promises';
const file = new URL('../index.html', import.meta.url);
let html = await readFile(file,'utf8');
const marker = `        <article class="guide-card" data-category="walkthrough" data-keywords="quest walkthrough ending choices main story route">`;
const cards = `<article class="guide-card" data-category="systems" data-keywords="monsters enemies bestiary blood guards kobolds undead psoglavs">
<div class="card-top"><span class="tag confirmed">Official Bestiary</span><span>World</span></div><h3>Monsters and Enemy Types</h3><p>Meet Blood Guards, kobolds, ancient undead, psoglavs, and the vrakhiri without invented weaknesses or drops.</p><a href="./enemy-types/">Browse the bestiary</a></article>
<article class="guide-card" data-category="systems" data-keywords="map locations vale sangora svartrau howling keep shrikes crag">
<div class="card-top"><span class="tag confirmed">World Lore</span><span>Locations</span></div><h3>Vale Sangora Locations</h3><p>Explore verified lore for Svartrau, Howling Keep, Shrike's Crag, and the landscapes of the Carpathian valley.</p><a href="./vale-sangora/">Explore Vale Sangora</a></article>
<article class="guide-card" data-category="systems" data-keywords="characters vampires vrakhiri xanthe ambrus brencis">
<div class="card-top"><span class="tag confirmed">Character Lore</span><span>Characters</span></div><h3>Vrakhiri and Their Servants</h3><p>Compare Brencis, Xanthe, Ambrus, Blood Guards, and other forms of vampiric corruption.</p><a href="./vrakhiri/">Meet the vrakhiri</a></article>
        `;
if (!html.includes('Browse the bestiary')) html=html.replace(marker,cards+marker);
await writeFile(file,html);
