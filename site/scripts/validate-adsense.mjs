import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('.'),account='ca-pub-9505220977121599',errors=[];
async function walk(dir){let out=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.name==='.git')continue;const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else if(e.name.endsWith('.html'))out.push(f)}return out}
const files=await walk(root);
for(const file of files){const h=await readFile(file,'utf8'),rel=path.relative(root,file);const meta=[...h.matchAll(/name="google-adsense-account"/g)].length,script=[...h.matchAll(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-9505220977121599/g)].length;if(meta!==1)errors.push(`${rel}: AdSense meta count ${meta}`);if(script!==1)errors.push(`${rel}: loader count ${script}`);if(!h.includes(`content="${account}"`))errors.push(`${rel}: wrong account id`);if(!h.includes('crossorigin="anonymous"'))errors.push(`${rel}: missing crossorigin`)}
const ads=(await readFile(path.join(root,'ads.txt'),'utf8')).trim();if(ads!=='google.com, pub-9505220977121599, DIRECT, f08c47fec0942fa0')errors.push('ads.txt content mismatch');
const report={generatedAt:'2026-07-18',htmlFilesChecked:files.length,adsenseAccount:account,adsTxt:ads,errors};await writeFile(path.join(root,'ADSENSE_VALIDATION.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
