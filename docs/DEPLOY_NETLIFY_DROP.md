# Publicar uma prévia no Netlify Drop

Prévia temporária do site novo em https://app.netlify.com/drop (arrastar e soltar uma pasta). O Netlify Drop só serve arquivos estáticos, então existe um build próprio para isso. O build normal (`npm run build` + `npm start`) não muda.

## Passo a passo

1. Gere a pasta:

   ```powershell
   npm run build:netlify
   ```

   Leva alguns minutos na primeira vez (baixa e converte as fotos). As próximas execuções usam o cache em `.cache/fotos-originais`. Resultado em 26/11/2026 (Windows 10, Node 22.14): **2.631 arquivos, 91,0 MB**, 216 fotos em 6 larguras (1.296 WebP), 99 regras de redirecionamento, nenhuma falha.

   Node 22.6 ou mais novo: o script importa arquivos `.ts` (`--experimental-strip-types`, já no `package.json`; no Node 23.6+ isso é padrão).

   O servidor oficial limita requisições (HTTP 429): o script baixa com 2 conexões e espera e tenta de novo (até 6 vezes, respeitando `Retry-After`). Se ainda assim faltar alguma foto, o fim da saída lista quais; rode de novo (as que já baixaram vêm do cache).
2. (Opcional) Teste localmente com um servidor que imita o Netlify (arquivos, `index.html` de pastas, `_redirects`, barra final e `404.html`):

   ```powershell
   node scripts/serve-netlify-drop.mjs netlify-drop 4173
   ```

   Abra http://localhost:4173. No navegador do Claude: `preview_start` com o nome `netlify-drop` (`.claude/launch.json`).
3. Abra https://app.netlify.com/drop e arraste a pasta **`netlify-drop`** (a pasta inteira, não o conteúdo nem um zip de outra pasta).
4. O Netlify devolve um endereço `https://<nome-aleatório>.netlify.app`. Publicado sem conta, o site pode ser temporário: siga o aviso da própria página do Netlify (entrar na conta ou "reivindicar" o site para mantê-lo). Para tirar do ar depois, apague o site no painel do Netlify (Site configuration → Delete site).

A pasta `netlify-drop/` **não vai para o git** (tem as fontes do Fontshare, que a licença proíbe redistribuir em repositório público, e cópias das fotos).

## O que muda no site estático

| Recurso | No servidor Node | No Netlify Drop |
|---|---|---|
| Formulário de contato | `POST /api/contato` (webhook) | Sem API: ao enviar, o formulário mostra "O envio direto pelo site ainda não está ativo" e oferece e-mail (texto já preenchido) e WhatsApp. Nada é simulado |
| Fotos | Otimizador do Next (AVIF/WebP sob demanda) | WebP gerado no build em 6 larguras (96 a 2048 px) em `/img/<largura>/<chave>.webp`, a partir das fotos do servidor oficial |
| Redirecionamentos do site antigo | `next.config.ts › redirects` | Arquivo `_redirects` gerado de `src/content/redirects.ts` |
| Próximos × anteriores em Eventos | Recalculado a cada hora | Fixo na data do build. Gere de novo se a prévia ficar no ar depois de um evento |
| Indexação | Normal, com `sitemap.xml` | `noindex` (cabeçalho `X-Robots-Tag` e `robots.txt` com `Disallow: /`), sem `sitemap.xml`, para não competir com o site oficial. O `canonical` continua apontando para `www.fundacaomt.com.br` |
| Endereços | `/eventos` | `/eventos/` (com barra final; o Netlify redireciona) |

## Como funciona

- `scripts/build-netlify.mjs` roda `next build` com `STATIC_EXPORT=1` (`output: "export"`, `trailingSlash: true` e o loader de `src/lib/static-image-loader.ts`). Durante a execução, `src/app/api` (vira `_api`, pasta privada), `robots.ts` e `sitemap.ts` (viram `*.off`) saem do build e voltam no fim, inclusive se o build falhar ou for interrompido; se algo ficar renomeado, a próxima execução restaura. `robots.ts`/`sitemap.ts` saem porque o export exige `dynamic = "force-static"`, que não combina com `cacheComponents`; a prévia não tem `sitemap.xml` e usa um `robots.txt` próprio. Pare o `npm run dev` antes de rodar.
- O modo export não aceita PPR, então o build estático desliga `cacheComponents` e `partialPrefetching`. Sem eles não há `"use cache"`: `turbopack.resolveAlias` troca `@/content/event-split` por `event-split.static.ts` (mesma função, sem cache). O `export const instant = false` das rotas `[slug]` também exige `cacheComponents`: o script tira essa linha durante o build (cópia em `.cache/build-netlify-backup/`) e devolve no fim.
- O loader troca cada foto do servidor oficial por `/img/<largura>/<chave>.webp`. O script procura as URLs das fotos no HTML e nos dados das páginas, baixa os originais (com cache) e gera as versões com `sharp`.
- SVG e imagens de outros domínios (miniaturas do YouTube) continuam carregando direto da origem.
- `_headers` também define cache longo para `/_next/static/*` e uma semana para `/img/*`.

## Antes de mostrar a prévia

- As fotos, o logo e os textos ainda dependem de **autorização da Fundação MT** (`CONTENT_SOURCES.md`). Uma prévia pública com a marca deve ser combinada com a Fundação.
- Os links de login, inscrição, loja e políticas levam ao site oficial (`NEXT_PUBLIC_LEGACY_URL`).
