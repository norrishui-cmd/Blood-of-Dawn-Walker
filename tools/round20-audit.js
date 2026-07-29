const fs=require("fs");
const path=require("path");
const ROOT=path.resolve(__dirname,"..");
const SITE="https://bloodofdawnwalker.cc";
const locales=["es","fr","it","pl"];
const routes=require(path.join(ROOT,"ROUND_20_URL_MANIFEST.json")).routes;
const hubs=["release-guides","gameplay-guides","walkthrough-guides","story-guides","technical-guides"];
const classes=["site-header","article-main","article-hero","article-body","article-content","article-aside","verification-box","related-grid","faq-list","site-footer"];
const errors=[];
const metrics=[];

function text(html){return html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&[a-z#0-9]+;/gi," ").replace(/\s+/g," ").trim();}
function alts(html){return new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(x=>[x[1],x[2]]));}
function localPath(locale,route){return path.join(ROOT,locale,route,"index.html");}

for(const locale of locales){
  for(const route of [...routes,...(locale==="es"?[]:hubs)]){
    const file=localPath(locale,route);
    if(!fs.existsSync(file)){errors.push(`missing ${locale}/${route}`);continue;}
    const html=fs.readFileSync(file,"utf8");
    const words=text(html).split(/\s+/).filter(Boolean).length;
    metrics.push({locale,route,words});
    for(const className of classes){
      if(!new RegExp(`class="[^"]*\\b${className}\\b`).test(html))errors.push(`${locale}/${route} missing .${className}`);
    }
    if(!html.includes("../../styles.css"))errors.push(`${locale}/${route} does not use shared English CSS`);
    if(!html.includes("LANG-DROPDOWN:START"))errors.push(`${locale}/${route} missing language dropdown`);
    if(!html.includes("google-adsense-account"))errors.push(`${locale}/${route} missing AdSense`);
    if(!html.includes('id="page-faq"'))errors.push(`${locale}/${route} missing visible FAQ`);
    if(/name="robots" content="[^"]*noindex/i.test(html))errors.push(`${locale}/${route} unexpectedly noindex`);
    const minimum=hubs.includes(route)?210:380;
    if(words<minimum)errors.push(`${locale}/${route} only ${words} words`);
    const map=alts(html);
    for(const [folder,lang] of [["","en"],["de","de"],["es","es"],["fr","fr"],["it","it"],["pl","pl"],["ja","ja"]]){
      const target=path.join(ROOT,folder,route,"index.html");
      if(!fs.existsSync(target))continue;
      const expected=`${SITE}/${folder?`${folder}/`:""}${route}/`;
      if(map.get(lang)!==expected)errors.push(`${locale}/${route} hreflang ${lang} mismatch`);
      const reciprocal=alts(fs.readFileSync(target,"utf8")).get(locale);
      if(reciprocal!==`${SITE}/${locale}/${route}/`)errors.push(`${folder||"en"}/${route} missing reciprocal ${locale}`);
    }
    const sitemap=fs.readFileSync(path.join(ROOT,`sitemap-${locale}.xml`),"utf8");
    if(!sitemap.includes(`<loc>${SITE}/${locale}/${route}/</loc>`))errors.push(`sitemap-${locale} missing ${route}`);
  }
  const home=fs.readFileSync(path.join(ROOT,locale,"index.html"),"utf8");
  if(!home.includes(`ROUND20-${locale.toUpperCase()}-DEEP-DIVES`))errors.push(`${locale} homepage missing round 20 section`);
  for(const route of routes)if(!home.includes(`./${route}/`))errors.push(`${locale} homepage missing ${route}`);
}

const result={
  generatedAt:"2026-07-29",round:20,
  addedIndexableUrls:63,
  localizedDetailPages:48,
  newLocalizedHubs:15,
  minimumDetailWords:Object.fromEntries(locales.map(l=>[l,Math.min(...metrics.filter(x=>x.locale===l&&routes.includes(x.route)).map(x=>x.words))])),
  sharedEnglishComponentContract:classes,
  reciprocalHreflang:["en","de","es","fr","it","pl","ja"],
  errors:[...new Set(errors)],
};
fs.writeFileSync(path.join(ROOT,"ROUND_20_VALIDATION.json"),JSON.stringify(result,null,2)+"\n");
console.log(JSON.stringify(result,null,2));
if(result.errors.length)process.exit(1);
