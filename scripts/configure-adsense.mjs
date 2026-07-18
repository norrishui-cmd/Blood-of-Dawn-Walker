import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';

const root=path.resolve('.');
const publisherId='pub-9505220977121599';
const accountId=`ca-${publisherId}`;
const meta=`    <meta name="google-adsense-account" content="${accountId}" />`;
const loader=`    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${accountId}" crossorigin="anonymous"></script>`;

async function walk(dir){
  const files=[];
  for(const entry of await readdir(dir,{withFileTypes:true})){
    if(entry.name==='.git')continue;
    const full=path.join(dir,entry.name);
    if(entry.isDirectory())files.push(...await walk(full));
    else if(entry.name.endsWith('.html'))files.push(full);
  }
  return files;
}

const files=await walk(root);
let changed=0;
for(const file of files){
  let html=await readFile(file,'utf8');
  const before=html;
  // Remove stale or duplicate account declarations before inserting one canonical block.
  html=html.replace(/\s*<meta\s+name=["']google-adsense-account["'][^>]*>\s*/gi,'\n');
  html=html.replace(/\s*<script\s+async\s+src=["']https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=[^"']+["'][^>]*><\/script>\s*/gi,'\n');
  html=html.replace(/<head([^>]*)>/i,`<head$1>\n${meta}\n${loader}`);
  if(html!==before){await writeFile(file,html);changed++}
}

await writeFile(path.join(root,'ads.txt'),`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`);
console.log(JSON.stringify({htmlFiles:files.length,htmlFilesConfigured:changed,publisherId,adsTxt:'/ads.txt'},null,2));
