import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('.');
const slugs=['blood-guards','kobolds','ancient-undead','psoglavs','vrakhiri','svartrau','howling-keep','shrikes-crag','xanthe','ambrus','enemy-types','vale-sangora'];
const section='<section><h2>How to Use This Pre-Release Guide</h2><p>This entry records what Rebel Wolves and Bandai Namco have actually disclosed before launch. It does not convert folklore from another game into Dawnwalker mechanics, and it does not treat a trailer edit as proof of a fixed quest route. Exact map coordinates, dialogue outcomes, weaknesses, rewards, and missable conditions will be added only when the release build or a new primary source makes them verifiable. That distinction keeps the page useful now without forcing players to unlearn invented details later.</p></section>';
for(const slug of slugs){const file=path.join(root,slug,'index.html');let html=await readFile(file,'utf8');if(!html.includes('How to Use This Pre-Release Guide'))html=html.replace('<section><h2>Related Guides</h2>',section+'<section><h2>Related Guides</h2>');await writeFile(file,html)}
