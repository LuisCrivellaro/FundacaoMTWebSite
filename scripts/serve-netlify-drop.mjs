// Uso: node scripts/serve-netlify-drop.mjs [pasta] [porta]  (padrão: netlify-drop 4173)
// Servidor local que imita o Netlify: arquivo exato, pasta/index.html, x.html,
// _redirects simples (:placeholder, *, código), /x -> /x/ e 404.html.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "netlify-drop");
const port = Number(process.argv[3] || 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon", ".xml": "application/xml" };

const rules = fs.readFileSync(path.join(root, "_redirects"), "utf8").split(/\r?\n/)
  .map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
  .map((l) => { const [from, to, code = "301"] = l.split(/\s+/); return { from, to, code: Number(code) }; });

function matchRule(p) {
  for (const r of rules) {
    const names = [];
    const re = new RegExp("^" + r.from.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/:(\w+)/g, (_, n) => { names.push(n); return "([^/]+)"; }).replace(/\*/g, () => { names.push("splat"); return "(.*)"; }) + "/?$");
    const m = p.match(re);
    if (m) { let to = r.to; names.forEach((n, i) => { to = to.replace(n === "splat" ? ":splat" : ":" + n, m[i + 1]); }); return { ...r, to }; }
  }
  return null;
}

const isFile = (f) => { try { return fs.statSync(f).isFile(); } catch { return false; } };

function send(res, file, status = 200) {
  res.writeHead(status, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  const p = decodeURIComponent(url.pathname);
  const f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
  if (isFile(f)) return send(res, f);
  if (p.endsWith("/") && isFile(path.join(f, "index.html"))) return send(res, path.join(f, "index.html"));
  const r = matchRule(p);
  if (r) { res.writeHead(r.code, { Location: r.to }).end(); return; }
  if (!p.endsWith("/") && isFile(path.join(f, "index.html"))) { res.writeHead(301, { Location: p + "/" + url.search }).end(); return; }
  if (isFile(f + ".html")) return send(res, f + ".html");
  send(res, path.join(root, "404.html"), 404);
}).listen(port, () => console.log(`http://localhost:${port} -> ${root}`));
