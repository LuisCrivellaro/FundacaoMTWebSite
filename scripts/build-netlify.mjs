#!/usr/bin/env node
/**
 * Gera `netlify-drop/`: o site inteiro em arquivos estáticos, pronto para
 * arrastar em https://app.netlify.com/drop. Uso: `npm run build:netlify`.
 *
 * O que o script faz (detalhes em docs/DEPLOY_NETLIFY_DROP.md):
 * 1. baixa as fontes (fora do git) e roda `next build` com STATIC_EXPORT=1;
 *    a pasta src/app/api sai do build (vira `_api`, pasta privada) e volta no fim;
 * 2. gera as fotos oficiais em WebP nas larguras usadas pelo site (/img/<w>/<chave>.webp),
 *    com cache dos originais em .cache/fotos-originais;
 * 3. escreve _redirects (URLs do site antigo), _headers (noindex e cache) e um
 *    robots.txt que bloqueia indexação, porque esta é uma prévia;
 * 4. copia tudo para netlify-drop/ (ignorada pelo git: tem as fontes do Fontshare).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { STATIC_IMAGE_WIDTHS, imageKey, isOptimizable } from "../src/lib/static-image-loader.ts";
import { legacyRedirects } from "../src/content/redirects.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "out");
const DEST = path.join(root, "netlify-drop");
const CACHE = path.join(root, ".cache", "fotos-originais");
const APP = path.join(root, "src", "app");
/**
 * Saem só do build estático e voltam no fim:
 * - api/: POST do formulário (não existe sem servidor). Vira `_api`, pasta privada.
 * - robots.ts e sitemap.ts: no export o Next exige `dynamic = "force-static"`, que não
 *   combina com cacheComponents. A prévia é noindex e o script escreve o próprio robots.txt.
 */
const SET_ASIDE = [
  ["api", "_api"],
  ["robots.ts", "robots.ts.off"],
  ["sitemap.ts", "sitemap.ts.off"],
].map(([on, off]) => ({ on: path.join(APP, on), off: path.join(APP, off), name: on }));

const log = (...a) => console.log("[netlify]", ...a);
const fail = (msg) => {
  console.error(`[netlify] ERRO: ${msg}`);
  process.exit(1);
};

// ---------------------------------------------------------------------------
// 1. Build estático
// ---------------------------------------------------------------------------
function restoreApi() {
  for (const { on, off, name } of SET_ASIDE) {
    if (fs.existsSync(off) && !fs.existsSync(on)) {
      fs.renameSync(off, on);
      log(`src/app/${name} restaurado.`);
    }
  }
  if (fs.existsSync(BACKUP)) {
    for (const f of walk(BACKUP)) {
      const target = path.join(root, path.relative(BACKUP, f));
      fs.copyFileSync(f, target);
      log(`${path.relative(root, target)} restaurado.`);
    }
    fs.rmSync(BACKUP, { recursive: true, force: true });
  }
}

/**
 * `export const instant = false` exige cacheComponents, que o export desliga.
 * A linha sai das rotas [slug] durante o build; o original fica em BACKUP e volta no fim.
 */
const INSTANT_LINE = /^export const instant = false;\r?\n/m;
const BACKUP = path.join(root, ".cache", "build-netlify-backup");
function stripInstant() {
  for (const f of walk(APP).filter((p) => /\[slug\][\\/]page\.tsx$/.test(p))) {
    const src = fs.readFileSync(f, "utf8");
    if (!INSTANT_LINE.test(src)) continue;
    const backup = path.join(BACKUP, path.relative(root, f));
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    fs.copyFileSync(f, backup);
    fs.writeFileSync(f, src.replace(INSTANT_LINE, ""));
  }
}
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}
restoreApi(); // sobra de uma execução interrompida

function runNode(args, env = {}) {
  const r = spawnSync(process.execPath, args, { cwd: root, stdio: "inherit", env: { ...process.env, ...env } });
  return r.status ?? 1;
}

if (runNode(["scripts/fetch-fonts.mjs"]) !== 0) fail("não consegui baixar as fontes.");

fs.rmSync(OUT, { recursive: true, force: true });
// Tipos gerados pelo `next dev` citam src/app/api e quebrariam a checagem de tipos
// sem essa pasta; o próximo `next dev` ou `npm run typecheck` os recria.
fs.rmSync(path.join(root, ".next", "dev", "types"), { recursive: true, force: true });
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
let buildStatus = 1;
const onSignal = () => {
  restoreApi();
  process.exit(130);
};
process.on("SIGINT", onSignal);
process.on("SIGTERM", onSignal);
try {
  for (const { on, off } of SET_ASIDE) fs.renameSync(on, off);
  stripInstant();
  log("api/, robots.ts, sitemap.ts e `instant` das rotas [slug] fora do build estático (voltam no fim).");
  buildStatus = runNode([nextBin, "build"], { STATIC_EXPORT: "1", NEXT_PUBLIC_STATIC_EXPORT: "1" });
} finally {
  restoreApi();
  process.off("SIGINT", onSignal);
  process.off("SIGTERM", onSignal);
}
if (buildStatus !== 0) fail("o next build falhou (veja acima).");
if (!fs.existsSync(path.join(OUT, "index.html"))) fail("out/index.html não foi gerado.");

// ---------------------------------------------------------------------------
// 2. Imagens
// ---------------------------------------------------------------------------
const textFiles = walk(OUT).filter((f) => /\.(html|txt|js|json|xml|rsc)$/i.test(f));

const URL_RE = /https?:\/\/(?:www\.)?fundacaomt\.com\.br\/[^"'\s<>\\)]+/g;
const IMG_EXT = /\.(jpe?g|png|webp|gif|bmp|avif)$/i;
const KEY_RE = /\/img\/(\d+)\/([a-z0-9]+)\.webp/g;

const sources = new Map(); // chave → URL
const wanted = new Set(); // chaves pedidas pelo HTML/JS
for (const f of textFiles) {
  const text = fs.readFileSync(f, "utf8");
  for (const m of text.matchAll(URL_RE)) {
    const url = m[0].replace(/&amp;/g, "&");
    if (IMG_EXT.test(new URL(url).pathname) && isOptimizable(url)) sources.set(imageKey(url), url);
  }
  for (const m of text.matchAll(KEY_RE)) wanted.add(m[2]);
}
const orphan = [...wanted].filter((k) => !sources.has(k));
log(`${sources.size} fotos oficiais encontradas; ${wanted.size} referenciadas no HTML.`);
if (orphan.length) log(`AVISO: ${orphan.length} chaves sem URL de origem (imagem ficaria quebrada): ${orphan.slice(0, 5).join(", ")}`);

fs.mkdirSync(CACHE, { recursive: true });
async function download(key, url) {
  const ext = (path.extname(new URL(url).pathname) || ".img").toLowerCase();
  const file = path.join(CACHE, key + ext);
  if (fs.existsSync(file) && fs.statSync(file).size > 0) return fs.readFileSync(file);
  // O servidor oficial limita requisições (HTTP 429): poucas conexões e espera crescente.
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(90_000), headers: { "User-Agent": "Mozilla/5.0 (static site build)" } });
      if (res.status === 429 || res.status === 503) {
        const wait = Number(res.headers.get("retry-after")) || 5 * attempt;
        if (attempt === 6) throw new Error(`HTTP ${res.status}`);
        await new Promise((r) => setTimeout(r, wait * 1000));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(file, buf);
      return buf;
    } catch (e) {
      if (attempt === 6) throw e;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
}

const failures = [];
let generated = 0;
async function processImage(key, url) {
  let buf;
  try {
    buf = await download(key, url);
  } catch (e) {
    failures.push(`${url} (download: ${e.message})`);
    return;
  }
  for (const w of STATIC_IMAGE_WIDTHS) {
    const target = path.join(OUT, "img", String(w), `${key}.webp`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    try {
      await sharp(buf, { failOn: "none", animated: false })
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 72, effort: 4 })
        .toFile(target);
      generated++;
    } catch (e) {
      failures.push(`${url} @${w} (conversão: ${e.message})`);
      return;
    }
  }
}

const queue = [...sources.entries()];
let done = 0;
async function worker() {
  while (queue.length) {
    const [key, url] = queue.shift();
    await processImage(key, url);
    done++;
    if (done % 25 === 0 || done === sources.size) log(`imagens: ${done}/${sources.size}`);
  }
}
await Promise.all(Array.from({ length: 2 }, worker));

// ---------------------------------------------------------------------------
// 3. _redirects, _headers e robots.txt
// ---------------------------------------------------------------------------
/** "/a-fundacao#x" → "/a-fundacao/#x"; "/eventos?p=1" → "/eventos/?p=1" (trailingSlash). */
function withSlash(dest) {
  const m = /^([^?#]*)(.*)$/.exec(dest);
  const p = m[1].endsWith("/") ? m[1] : `${m[1]}/`;
  return p + m[2];
}
const redirectLines = [];
for (const { source, destination } of legacyRedirects) {
  const to = withSlash(destination);
  if (/:\w+\*$/.test(source)) {
    // ":slug*" do Next = zero ou mais segmentos → caminho puro + "/*"
    const base = source.replace(/\/:\w+\*$/, "");
    redirectLines.push(`${base}  ${to}  301`, `${base}/*  ${to}  301`);
  } else {
    redirectLines.push(`${source}  ${to}  301`);
  }
}
fs.writeFileSync(
  path.join(OUT, "_redirects"),
  `# URLs do site antigo → site novo (gerado de src/content/redirects.ts)\n${redirectLines.join("\n")}\n`,
);

fs.writeFileSync(
  path.join(OUT, "_headers"),
  [
    "# Prévia: não indexar (o site oficial continua em www.fundacaomt.com.br)",
    "/*",
    "  X-Robots-Tag: noindex, nofollow",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  X-Content-Type-Options: nosniff",
    "/_next/static/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "/img/*",
    "  Cache-Control: public, max-age=604800",
    "",
  ].join("\n"),
);
fs.writeFileSync(path.join(OUT, "robots.txt"), "# Prévia do novo site: não indexar\nUser-agent: *\nDisallow: /\n");

// ---------------------------------------------------------------------------
// 4. Pasta final
// ---------------------------------------------------------------------------
fs.rmSync(DEST, { recursive: true, force: true });
fs.cpSync(OUT, DEST, { recursive: true });

const files = walk(DEST);
const bytes = files.reduce((s, f) => s + fs.statSync(f).size, 0);
log(`pronto: netlify-drop/ com ${files.length} arquivos, ${(bytes / 1024 / 1024).toFixed(1)} MB.`);
log(`${generated} versões de imagem geradas, ${redirectLines.length} redirecionamentos.`);
if (failures.length) {
  log(`AVISO: ${failures.length} imagens com problema (ficam sem foto):`);
  for (const f of failures.slice(0, 20)) log(`  - ${f}`);
}
if (!fs.existsSync(path.join(DEST, "404.html"))) log("AVISO: 404.html não foi gerado.");
