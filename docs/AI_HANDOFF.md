# AI_HANDOFF — novo site da Fundação MT

> Atualizado em 26/11/2026. Repositório `LuisCrivellaro/FundacaoMTWebSite`.
> Pesquisa do site antigo e contexto da empresa: `docs/analise-site-atual/AI_HANDOFF.md`.
> Leia também `CLAUDE.md` (regras do projeto) e `AGENTS.md` (Next 16: leia `node_modules/next/dist/docs/` antes de usar APIs).

## 0. Retomada rápida (leia primeiro)

**Tarefa em andamento:** preparar uma **prévia estática para publicar no Netlify Drop** (https://app.netlify.com/drop, arrastar e soltar uma pasta). O usuário vai hospedar a prévia só por um dia. Pedido: "prepare toda a pasta para isso".

**Branch e commits**
- Branch de trabalho: `feat/animacoes-e-fotos` (criada a partir de `main`). **Não fazer merge na `main` sem autorização do usuário. Não usar force push.**
- `main` = `origin/main` = `54ff8d9` (site completo + pesquisa).
- `1d0e480` (na branch): animações ao rolar, sete fotos novas, typecheck com `next typegen`, entrada `site-windows` no launch.json, docs.
- O commit deste handoff vem logo depois de `1d0e480`. **O código do build estático (lista no §0.2) pode ainda não estar no GitHub**: se `scripts/build-netlify.mjs` não existir no clone, ele ficou só na máquina anterior; recrie a partir do §0.2.

**Próxima ação exata**
1. `npm install` (num clone novo) e confirme que existem `scripts/build-netlify.mjs`, `src/lib/static-image-loader.ts`, `src/content/event-split.ts`, `src/content/event-split.static.ts` e `docs/DEPLOY_NETLIFY_DROP.md`.
2. Confirme que o código-fonte está íntegro (o script altera arquivos temporariamente; ver §0.3): `git status` não deve mostrar `src/app/api` ausente, `robots.ts`/`sitemap.ts` ausentes nem `instant` removido das rotas `[slug]`. Se mostrar, rode o script uma vez (ele restaura no início) ou `git checkout -- src/app`.
3. Pare o `npm run dev`, rode `npm run build:netlify` e leia o fim da saída (`[netlify] pronto: netlify-drop/ com N arquivos, X MB`).
4. Teste a pasta com um servidor que imite o Netlify (ver §0.4) em 1440 px e 375 px: home, `/eventos/`, uma notícia, `/contato/` (envio → aviso "O envio direto pelo site ainda não está ativo" com e-mail e WhatsApp), um redirecionamento antigo (`/sobre-nos` → `/a-fundacao/`) e uma página inexistente (404).
5. Confirme que o build normal não mudou: `npm run typecheck`, `npx eslint src`, `npm run build` (228 páginas).
6. Atualize `DEPLOY_NETLIFY_DROP.md` com tamanho e número de arquivos reais, commit e push da branch.
7. Diga ao usuário para arrastar a pasta **`netlify-drop`** inteira em https://app.netlify.com/drop.

### 0.1 Histórico do build estático (o que já falhou e por quê)

| Tentativa | Erro | Correção aplicada |
|---|---|---|
| 1 | `.next/dev/types/validator.ts` citava `src/app/api/contato/route.js` (tipos antigos do `next dev`) | Script apaga `.next/dev/types` antes do build |
| 2 | `robots.txt`: export exige `dynamic = "force-static"`, incompatível com `cacheComponents` | `robots.ts` e `sitemap.ts` saem do build estático (renomeados para `*.off`); script escreve `robots.txt` próprio; prévia sem sitemap |
| 3 | `Invariant: PPR cannot be enabled in export mode` | No modo estático, `cacheComponents` e `partialPrefetching` desligados; `"use cache"` isolado em `event-split.ts` e trocado por `event-split.static.ts` via `turbopack.resolveAlias` |
| 4 | `Route segment config "instant" requires nextConfig.cacheComponents` (6 rotas `[slug]`) | Script remove a linha `export const instant = false;` durante o build, com cópia em `.cache/build-netlify-backup/`, e restaura no fim |
| 5 | Em execução no momento deste handoff | Resultado ainda não verificado |

Possíveis próximos obstáculos: o `turbopack.resolveAlias` não substituir `@/content/event-split` (aí o build reclama de `"use cache"`; alternativa: o script trocar o arquivo temporariamente, como faz com `instant`); páginas que leem `searchParams` no servidor (hoje nenhuma; a busca e os filtros são client-side com `useSearchParams` dentro de `Suspense`).

### 0.2 Arquivos do build estático (criados ou alterados nesta tarefa)

- `scripts/build-netlify.mjs`: orquestra tudo.
  1. Restaura sobras de execução interrompida e baixa as fontes (`scripts/fetch-fonts.mjs`).
  2. Apaga `out/` e `.next/dev/types`. Renomeia `src/app/api` → `src/app/_api` (pasta privada), `robots.ts` e `sitemap.ts` → `*.off` e tira o `instant` das rotas `[slug]`.
  3. Roda `next build` com `STATIC_EXPORT=1` e `NEXT_PUBLIC_STATIC_EXPORT=1`. Restaura tudo no `finally` e no SIGINT/SIGTERM.
  4. Procura URLs de fotos `fundacaomt.com.br` nos `.html/.txt/.js/.json` de `out/`. Baixa os originais (cache em `.cache/fotos-originais/`, 6 em paralelo, 3 tentativas) e gera WebP q72 com `sharp` em `out/img/<largura>/<chave>.webp`, nas larguras 96, 256, 640, 1080, 1600 e 2048, sem ampliar.
  5. Escreve `out/_redirects` (de `src/content/redirects.ts`, com barra final; `:slug*` vira a linha pura + `/*`), `out/_headers` (`X-Robots-Tag: noindex, nofollow`, cache longo em `/_next/static/*` e 7 dias em `/img/*`) e `out/robots.txt` (`Disallow: /`).
  6. Copia `out/` para `netlify-drop/`.
- `src/lib/static-image-loader.ts`: loader custom (`/img/<w>/<chave>.webp`; chave = FNV-1a 32 bits + tamanho em base 36), `isOptimizable` (só `fundacaomt.com.br`, sem SVG; YouTube passa direto) e as larguras. O script importa este mesmo arquivo (Node 24 roda TypeScript simples), então a chave é a mesma dos dois lados.
- `next.config.ts`: com `STATIC_EXPORT=1` usa `output: "export"`, `trailingSlash: true`, loader custom com `imageSizes [96, 256]` e `deviceSizes [640, 1080, 1600, 2048]`, sem `redirects()`, `cacheComponents: false`, `partialPrefetching: false` e o `resolveAlias` de `@/content/event-split`. Sem a variável, a configuração é a mesma de antes.
- `src/components/ContactForm.tsx`: com `NEXT_PUBLIC_STATIC_EXPORT=1`, depois de validar, vai direto ao aviso `not_configured` (e-mail com texto preenchido + WhatsApp), sem `fetch`. Nada é simulado.
- `src/content/events.ts`: `getEventSplit` saiu; agora há `splitEvents(today)` puro. `src/content/event-split.ts` (com `"use cache"` + `cacheLife("hours")`) e `src/content/event-split.static.ts` (sem cache). Imports atualizados em `src/app/eventos/page.tsx` e `src/components/home/EventsNews.tsx`.
- `package.json`: script `build:netlify` = `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/build-netlify.mjs`.
- `.gitignore`: `/netlify-drop/` e `/.cache/`. A pasta final tem as fontes do Fontshare (licença proíbe repositório público) e cópias das fotos.
- Docs: `docs/DEPLOY_NETLIFY_DROP.md` (guia completo), `docs/INTEGRATIONS.md` (formulário no estático), este arquivo.

### 0.3 Cuidado: o script altera o código temporariamente

Durante `npm run build:netlify`, `src/app/api`, `src/app/robots.ts`, `src/app/sitemap.ts` e a linha `instant` de 6 páginas `[slug]` somem do disco e voltam no fim. **Nunca faça commit enquanto o script roda.** Se ele for morto à força, a próxima execução restaura (ou use `git checkout -- src/app` e `git status` para conferir).

### 0.4 Servidor de teste que imita o Netlify

A sessão anterior usou um script local de ~60 linhas (fora do repositório). Ele serve um arquivo exato, depois `pasta/index.html`, depois `arquivo.html`; aplica `_redirects` simples (`:placeholder`, `*`, código 301); manda `/x` → `/x/` quando existe `x/index.html`; e cai em `404.html`. Recriar se precisar (`node serve.mjs netlify-drop 4173`), ou usar `npx serve netlify-drop` (não aplica `_redirects`).

## 1. Estado do site

Construído e funcional em Next.js: todas as páginas públicas, navegação, busca, filtros, formulário com API, cookies, SEO e redirecionamentos das URLs antigas. Build de produção ok (228 páginas). **Não está pronto para o domínio oficial** por pendências da Fundação: autorização de fotos/textos, logo vetorial, destino do formulário, subdomínio do sistema atual e confirmação do aplicativo (`AUDITORIA_FINAL.md §6`).

## 2. Como rodar

- Node 20.9+. Máquina atual: Windows 11, Node do sistema (`C:\Program Files\nodejs`, v24.15.0). Na máquina anterior (macOS) era `export PATH=$HOME/.local/node/bin:$PATH`.
- Num clone novo: `npm install` antes de tudo.
- `npm run dev` (porta 3000; baixa as fontes antes). No navegador do Claude: `preview_start` com `site-windows` (Windows) ou `site` (macOS/Linux), de `.claude/launch.json`.
- `npm run build && npm start` para produção. `npm run typecheck` (= `next typegen && tsc --noEmit`) e `npx eslint src` passavam em `1d0e480`. Não rode `npx tsc --noEmit` sozinho num clone novo.
- `npm run build:netlify` para a prévia estática (§0).
- Variáveis: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_LEGACY_URL`, `CONTACT_WEBHOOK_URL` (ver `README.md`). Internas do build estático: `STATIC_EXPORT`, `NEXT_PUBLIC_STATIC_EXPORT`.

## 3. Arquitetura

- **Next.js 16.4.6** (App Router, `cacheComponents` + `partialPrefetching` no build normal), React 19.3, TypeScript, Tailwind 4.3 (tokens em `@theme` no `globals.css`), Motion 14, Lucide.
- Conteúdo em `src/content/` (TS tipado) + `src/content/generated/` (JSON extraído do site oficial). Páginas em `src/app/`, componentes em `src/components/`.
- Imagens remotas do servidor oficial (`next.config.ts › remotePatterns`), catálogo em `src/content/media.ts`.
- Redirecionamentos em `src/content/redirects.ts` (Next no build normal, `_redirects` no estático).
- Eventos: `getEventSplit()` em `src/content/event-split.ts` (`"use cache"`, `cacheLife("hours")`); lógica em `splitEvents()` de `events.ts`.

## 4. Design system (detalhes em `DESIGN_SYSTEM.md`)

Conceito "Ciência no campo". Sentient (títulos) + General Sans (texto), do Fontshare, **fora do git por licença**. Verdes do logotipo (`brand-600 #2f7a3b` para ação, `leaf-400 #8dc63f` só em fundo escuro), papel `#f6f4ee`. Raios de 10/16/24/32 px. Sem eyebrows, sem números de seção.

Movimento (ampliado em 25/11/2026 a pedido do usuário, commit `1d0e480`): entrada animada no hero e no topo das páginas internas; títulos, cartões e listas aparecem ao rolar; parallax e zoom em fotos; contador nos números da home (`CountUp`); faixa de fotos "Do campo experimental ao produtor" que corre com a rolagem (`FieldGallery`); marcador deslizante nos centros; parcelas que brotam no convite final; barra de leitura nas notícias. Quase tudo é CSS scroll-driven em `globals.css`, dentro de `prefers-reduced-motion: no-preference` e `@supports (animation-timeline: view())`. Sem suporte (Firefox), o conteúdo aparece estático. Sete fotos novas das notícias oficiais estão em `media.ts` (origem em `CONTENT_SOURCES.md §3`).

## 5. Páginas

Concluídas: `/`, `/a-fundacao` (+ `/comite-gestor-de-inovacao`, `/transparencia`), `/pesquisa` (+ 9 áreas, `/equipe`), `/centros-experimentais` (+ 6), `/servicos` (+ 6), `/laboratorios` (+ 3), `/conhecimento`, `/eventos` (+ 49), `/noticias` (+ 130), `/contato`, `/busca`, 404, `sitemap.xml`, `robots.txt`, `POST /api/contato`.

Fora do site de propósito: área logada, inscrição e compra (continuam no sistema atual); aplicativo (lojas fora do ar); imprensa e newsletter (precisam de conteúdo da Fundação).

## 6. Decisões

- Fotos e logo **remotos, não copiados para o repositório**, até haver autorização; trocar em `media.ts`. A prévia estática leva cópias otimizadas das fotos na pasta de publicação (fora do git), equivalente ao cache do otimizador do Next num servidor.
- Prévia no Netlify com `noindex` e `canonical` apontando para `www.fundacaomt.com.br`, para não competir com o site oficial.
- Cópia do texto das notícias no repositório: ⚠️ confirmar autorização (o repositório é público).
- Nenhum envio simulado: sem webhook (ou no site estático), o formulário avisa e oferece e-mail e WhatsApp.
- Links mortos removidos (app, informativo), com registro em `CONTENT_SOURCES.md §4`.
- Eventos: lotes e preços são cópia de 21/11/2026, com aviso na página. Na prévia estática, "próximos × anteriores" fica fixo na data do build.
- Git: o usuário pede commit e push explicitamente; trabalhar na branch, sem merge na `main` sem autorização.

## 7. Pendências e próximos passos

**Desta tarefa:** terminar o §0 (build estático passando, teste local, commit e push).

**Depois:**
1. Revisar com a Fundação: textos, fotos, pendências da `AUDITORIA_FINAL.md §6`. Combinar com ela a prévia pública.
2. Ajustar o cabeçalho entre ~768 e ~1024 px: "A Fundação" e "Área do usuário" quebram em duas linhas (visto a ~800 px).
3. Trocar as imagens remotas por arquivos autorizados otimizados.
4. Configurar `CONTACT_WEBHOOK_URL` e GTM com consentimento.
5. Ligar notícias e eventos a uma fonte de dados (CMS headless ou API do Laravel).
6. Testes com leitor de tela, Safari/iOS, Firefox e 4G real; emular `prefers-reduced-motion`; definir hospedagem definitiva e o subdomínio do sistema legado.
