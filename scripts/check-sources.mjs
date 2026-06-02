import fs from "node:fs/promises";

const sourceFile = new URL("../src/data/ocwSources.ts", import.meta.url);
const contents = await fs.readFile(sourceFile, "utf8");
const urls = Array.from(new Set(contents.match(/https:\/\/ocw\.mit\.edu\/[^"]+/g) ?? []));

if (!urls.length) {
  throw new Error("No MIT OCW URLs found in src/data/ocwSources.ts");
}

const failures = [];

for (const url of urls) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow"
    });

    if (!response.ok) {
      failures.push(`${response.status} ${url}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${url} (${message})`);
  }
}

if (failures.length) {
  console.error("MIT OCW source check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Checked ${urls.length} MIT OCW source URLs.`);
