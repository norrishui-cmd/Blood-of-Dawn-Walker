import fs from "node:fs";
import path from "node:path";

const root = path.resolve(".");
const faq = fs.readFileSync(path.join(root, "faq/index.html"), "utf8");
const expected = {
  "release-guides": 7,
  "gameplay-guides": 9,
  "walkthrough-guides": 8,
  "story-guides": 8,
  "technical-guides": 8,
  "faq-guides": 5,
  "updates-guides": 5
};
const errors = [];

const schemaMatch = faq.match(/<script type="application\/ld\+json" data-faq-round15="true">([\s\S]*?)<\/script>/);
if (!schemaMatch) errors.push("Round 15 FAQ schema missing");
let entities = [];
if (schemaMatch) {
  try {
    const schema = JSON.parse(schemaMatch[1]);
    entities = schema.mainEntity || [];
  } catch {
    errors.push("Round 15 FAQ schema is invalid JSON");
  }
}
if (entities.length !== 50) errors.push(`Round 15 schema has ${entities.length} questions`);

const ids = [...faq.matchAll(/<div id="(faq-round15-[^"]+)"/g)].map((m) => m[1]);
if (ids.length !== 50) errors.push(`Round 15 visible FAQ count is ${ids.length}`);
if (new Set(ids).size !== ids.length) errors.push("Duplicate Round 15 FAQ anchors");

const allQuestionNames = [];
for (const match of faq.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
  try {
    const data = JSON.parse(match[1]);
    if (data["@type"] === "FAQPage") {
      for (const item of data.mainEntity || []) allQuestionNames.push(item.name);
    }
  } catch {
    errors.push("Invalid JSON-LD block on FAQ page");
  }
}
const round15Names = new Set(entities.map((e) => e.name));
for (const name of round15Names) {
  if (allQuestionNames.filter((x) => x === name).length !== 1) {
    errors.push(`Round 15 question duplicates an existing exact question: ${name}`);
  }
}

let tabLinks = 0;
for (const [tab, count] of Object.entries(expected)) {
  const html = fs.readFileSync(path.join(root, tab, "index.html"), "utf8");
  const block = html.match(/<section class="cluster-index tab-faq-links-round15">([\s\S]*?)<\/section>/);
  if (!block) {
    errors.push(`${tab} missing Round 15 FAQ module`);
    continue;
  }
  const hrefs = [...block[1].matchAll(/href="\.\.\/faq\/#(faq-round15-[^"]+)"/g)].map((m) => m[1]);
  tabLinks += hrefs.length;
  if (hrefs.length !== count) errors.push(`${tab} has ${hrefs.length} Round 15 links, expected ${count}`);
  for (const id of hrefs) if (!ids.includes(id)) errors.push(`${tab} links to missing #${id}`);
}
if (tabLinks !== 50) errors.push(`Tabs contain ${tabLinks} Round 15 links`);

const result = {
  generatedAt: "2026-07-26",
  faqPageAnswers: "170+",
  addedVisibleFaqs: ids.length,
  addedSchemaQuestions: entities.length,
  tabsChecked: Object.keys(expected).length,
  tabEntryLinks: tabLinks,
  distribution: expected,
  exactQuestionDuplicates: errors.filter((e) => e.includes("duplicates")).length,
  brokenFaqAnchors: errors.filter((e) => e.includes("missing #")).length,
  errors
};
fs.writeFileSync(path.join(root, "ROUND_15_FAQ_VALIDATION.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
