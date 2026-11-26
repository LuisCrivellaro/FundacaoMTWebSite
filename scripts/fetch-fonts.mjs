// Baixa as fontes do Fontshare (ITF Free Font License) para src/fonts.
// Os arquivos NÃO são versionados: a licença permite hospedar no próprio site,
// mas proíbe redistribuir os arquivos em repositórios públicos.
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src", "fonts");

const targets = [
  { file: "Sentient-Variable.woff2", family: "Sentient", style: "normal", query: "sentient@1,2" },
  { file: "GeneralSans-Variable.woff2", family: "General Sans", style: "normal", query: "general-sans@1,2" },
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

await mkdir(outDir, { recursive: true });
const cssCache = new Map();

for (const t of targets) {
  const dest = join(outDir, t.file);
  if (await exists(dest)) continue;
  if (!cssCache.has(t.query)) {
    const res = await fetch(`https://api.fontshare.com/v2/css?f[]=${t.query}&display=swap`);
    if (!res.ok) throw new Error(`Fontshare CSS ${res.status}`);
    cssCache.set(t.query, await res.text());
  }
  const css = cssCache.get(t.query);
  const blocks = css.split("@font-face").slice(1);
  const block = blocks.find(
    (b) => b.includes(`font-family: '${t.family}'`) && b.includes(`font-style: ${t.style}`) && /font-weight:\s*\d+\s+\d+/.test(b),
  );
  const url = block?.match(/url\('([^']+\.woff2)'\)/)?.[1];
  if (!url) throw new Error(`Variable woff2 não encontrado para ${t.family} ${t.style}`);
  const fontRes = await fetch(url.startsWith("//") ? `https:${url}` : url);
  if (!fontRes.ok) throw new Error(`Download ${fontRes.status} ${url}`);
  await writeFile(dest, Buffer.from(await fontRes.arrayBuffer()));
  console.log(`fonte baixada: ${t.file}`);
}
