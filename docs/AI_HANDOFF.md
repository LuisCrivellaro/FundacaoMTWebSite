# AI_HANDOFF — novo site da Fundação MT

> Atualizado em 26/11/2026 (2ª sessão do dia). Repositório `LuisCrivellaro/FundacaoMTWebSite`.
> Pesquisa do site antigo e contexto da empresa: `docs/analise-site-atual/AI_HANDOFF.md`.
> Leia também `CLAUDE.md` (regras do projeto) e `AGENTS.md` (Next 16: leia `node_modules/next/dist/docs/` antes de usar APIs).

## 0. Retomada rápida (leia primeiro)

**Atenção:** o trabalho atual está na branch **`feat/animacoes-e-fotos`**, não na `main`. Um clone novo abre na `main` (desatualizada): rode `git checkout feat/animacoes-e-fotos` antes de tudo.

**Última sessão (26/11/2026, Windows 10, Node 22.14):** retomou a prévia do Netlify Drop e as pendências que não dependem da Fundação.
- Prévia regenerada e **testada no navegador** com `scripts/serve-netlify-drop.mjs` (servidor que imita o Netlify, agora no repositório e no `launch.json` como `netlify-drop`): home e `/eventos/` a 1024/1300 px; contato, notícia e 404 a 375 px; envio do formulário mostra "O envio direto pelo site ainda não está ativo" com e-mail e WhatsApp, sem requisição; redirecionamentos 301 conferidos com `curl`; nenhuma imagem quebrada; fontes carregadas.
- `build:netlify` agora passa `--experimental-strip-types` (o script importa `.ts`; Node 22.6+ precisa da flag, Node 24 ignora).
- `_redirects` sem linhas duplicadas (`/transparencia` aparecia duas vezes); 99 regras.
- Home ganhou `canonical` (`/`), que faltava (as internas já tinham).
- **Cabeçalho corrigido** (pendência 2 da §7 antiga): o menu completo precisava de ~1.268 px de conteúdo e se sobrepunha de 1024 até ~1370 px. Agora: botão "Menu" abaixo de 1280 px (`xl`); de 1280 a 1407 px versão compacta (itens `px-3`, "Área do usuário" só com ícone `UserRound`, rótulo `sr-only` e `title`); a partir de 1408 px (breakpoint `wide` = 88rem em `@theme` no `globals.css`) tudo por extenso. Medido sem sobreposição em 1280, 1300 e 1408 px; mega-menu e painel "Menu" testados.
- `npm run typecheck`, `npx eslint src scripts` e `npm run build` (228 páginas) passam. `npm run build:netlify`: 2.631 arquivos, 91,0 MB, 216 fotos sem falhas.

**Netlify com Git (26/11/2026, depois do Drop):** o usuário publicou em https://fundacaomt.netlify.app conectando o repositório (build do Next.js, não a pasta estática). Problemas encontrados: o Netlify publicava a `main` antiga e as fotos voltavam **403** na Image CDN (`/_next/image` → `/.netlify/images`), porque o `remotePatterns` do Next não foi copiado para a lista de origens liberadas. Correção: `netlify.toml` com `[images] remote_images` (regex, igual ao `remotePatterns`), `X-Robots-Tag: noindex` e Node 24; `isPreviewDeploy` em `src/content/site.ts` (`NETLIFY=true` ou `SITE_PREVIEW=1`) gera `robots.txt` com `Disallow: /` e `<meta name="robots" content="noindex, nofollow">`. Para valer, o Netlify precisa publicar a branch `feat/animacoes-e-fotos` (mudar a "Production branch" no painel) ou a `main` precisa receber o merge (só com autorização do usuário).

**Branch e commits**
- Branch de trabalho: `feat/animacoes-e-fotos` (criada a partir de `main`). **Não fazer merge na `main` sem autorização do usuário. Não usar force push.**
- `main` = `origin/main` = `54ff8d9` (site completo + pesquisa).
- `1d0e480` (na branch): animações ao rolar, sete fotos novas, typecheck com `next typegen`, entrada `site-windows` no launch.json, docs.
- `660aceb`: handoff. `390c319`: build estático para o Netlify Drop. `940ba50`: downloads com limite (HTTP 429). `1a62e9d`: handoff.
- Commit desta sessão: cabeçalho responsivo, canonical da home, servidor de teste e ajustes do `build:netlify`. Ver `git log` para saber se já foi enviado ao `origin` (o push depende de pedido do usuário).

**Não testados:** o upload real no Netlify; Safari/iOS e Firefox; leitor de tela.

**Próxima ação exata**
1. Num clone novo: `git checkout feat/animacoes-e-fotos`, `npm install`.
2. Confirme que o código-fonte está íntegro (o script altera arquivos temporariamente; ver §0.3): `git status` limpo.
3. Pare o `npm run dev`, rode `npm run build:netlify` e leia o fim da saída (`[netlify] pronto: netlify-drop/ com N arquivos, X MB`).
4. Opcional: `node scripts/serve-netlify-drop.mjs` (ou `preview_start` com `netlify-drop`) e confira em http://localhost:4173.
5. O usuário arrasta a pasta **`netlify-drop`** inteira em https://app.netlify.com/drop.
6. Depois: itens da §7 que não dependem da Fundação (ex.: trilha de navegação das notícias, abaixo).

### 0.1 Histórico do build estático (o que já falhou e por quê)

| Tentativa | Erro | Correção aplicada |
|---|---|---|
| 1 | `.next/dev/types/validator.ts` citava `src/app/api/contato/route.js` (tipos antigos do `next dev`) | Script apaga `.next/dev/types` antes do build |
| 2 | `robots.txt`: export exige `dynamic = "force-static"`, incompatível com `cacheComponents` | `robots.ts` e `sitemap.ts` saem do build estático (renomeados para `*.off`); script escreve `robots.txt` próprio; prévia sem sitemap |
| 3 | `Invariant: PPR cannot be enabled in export mode` | No modo estático, `cacheComponents` e `partialPrefetching` desligados; `"use cache"` isolado em `event-split.ts` e trocado por `event-split.static.ts` via `turbopack.resolveAlias` |
| 4 | `Route segment config "instant" requires nextConfig.cacheComponents` (6 rotas `[slug]`) | Script remove a linha `export const instant = false;` durante o build, com cópia em `.cache/build-netlify-backup/`, e restaura no fim |
| 5 | Passou, mas 57 fotos falharam com HTTP 429 (limite do servidor oficial) | Downloads com 2 conexões, até 6 tentativas e `Retry-After` |
| 6 | Passou sem falhas | — |

Possíveis próximos obstáculos: o `turbopack.resolveAlias` não substituir `@/content/event-split` (aí o build reclama de `"use cache"`; alternativa: o script trocar o arquivo temporariamente, como faz com `instant`); páginas que leem `searchParams` no servidor (hoje nenhuma; a busca e os filtros são client-side com `useSearchParams` dentro de `Suspense`).

### 0.2 Arquivos do build estático (criados ou alterados nesta tarefa)

- `scripts/build-netlify.mjs`: orquestra tudo.
  1. Restaura sobras de execução interrompida e baixa as fontes (`scripts/fetch-fonts.mjs`).
  2. Apaga `out/` e `.next/dev/types`. Renomeia `src/app/api` → `src/app/_api` (pasta privada), `robots.ts` e `sitemap.ts` → `*.off` e tira o `instant` das rotas `[slug]`.
  3. Roda `next build` com `STATIC_EXPORT=1` e `NEXT_PUBLIC_STATIC_EXPORT=1`. Restaura tudo no `finally` e no SIGINT/SIGTERM.
  4. Procura URLs de fotos `fundacaomt.com.br` nos `.html/.txt/.js/.json` de `out/`. Baixa os originais (cache em `.cache/fotos-originais/`, 2 em paralelo, até 6 tentativas com espera, por causa do HTTP 429) e gera WebP q72 com `sharp` em `out/img/<largura>/<chave>.webp`, nas larguras 96, 256, 640, 1080, 1600 e 2048, sem ampliar.
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

`scripts/serve-netlify-drop.mjs` (no repositório desde 26/11/2026): `node scripts/serve-netlify-drop.mjs netlify-drop 4173`, ou `preview_start` com `netlify-drop`. Serve um arquivo exato, depois `pasta/index.html`; aplica `_redirects` simples (`:placeholder`, `*`, código 301); manda `/x` → `/x/` quando existe `x/index.html`; tenta `arquivo.html`; e cai em `404.html` com status 404.

## 1. Estado do site

Construído e funcional em Next.js: todas as páginas públicas, navegação, busca, filtros, formulário com API, cookies, SEO e redirecionamentos das URLs antigas. Build de produção ok (228 páginas). **Não está pronto para o domínio oficial** por pendências da Fundação: autorização de fotos/textos, logo vetorial, destino do formulário, subdomínio do sistema atual e confirmação do aplicativo (`AUDITORIA_FINAL.md §6`).

## 2. Como rodar

- Node 20.9+ (22.6+ para `build:netlify`). Máquinas usadas: Windows 10 com Node do sistema v22.14.0 (26/11, 2ª sessão); Windows 11 com v24.15.0; macOS com `export PATH=$HOME/.local/node/bin:$PATH`.
- Num clone novo: `git checkout feat/animacoes-e-fotos` e `npm install` antes de tudo. O `npm install` com npm 10 tira campos `libc` do `package-lock.json`; descarte essa mudança (`git checkout -- package-lock.json`).
- `npm run dev` (porta 3000; baixa as fontes antes). No navegador do Claude: `preview_start` com `site-windows` (Windows) ou `site` (macOS/Linux), de `.claude/launch.json`.
- `npm run build && npm start` para produção. `npm run typecheck` (= `next typegen && tsc --noEmit`) e `npx eslint src scripts` passam (26/11/2026). Não rode `npx tsc --noEmit` sozinho num clone novo.
- `npm run build:netlify` para a prévia estática (§0) e `node scripts/serve-netlify-drop.mjs` para testá-la (§0.4).
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

**Desta tarefa:** a pasta `netlify-drop/` está gerada e testada localmente. Falta o usuário publicar arrastando-a no Netlify Drop (num clone novo, gerar de novo: `npm install` + `npm run build:netlify`).

**Feito em 26/11/2026 (2ª sessão):** cabeçalho entre 1024 e ~1370 px (era a antiga pendência 2), canonical da home, trilha de navegação com título longo no celular (o item atual agora fica em uma linha com reticências; antes quebrava e deixava a seta solta), `_redirects` sem duplicatas.

**Depois:**
1. Revisar com a Fundação: textos, fotos, pendências da `AUDITORIA_FINAL.md §6`. Combinar com ela a prévia pública.
2. Trocar as imagens remotas por arquivos autorizados otimizados.
3. Configurar `CONTACT_WEBHOOK_URL` e GTM com consentimento.
4. Ligar notícias e eventos a uma fonte de dados (CMS headless ou API do Laravel).
5. Testes com leitor de tela, Safari/iOS, Firefox e 4G real; emular `prefers-reduced-motion`; definir hospedagem definitiva e o subdomínio do sistema legado.
6. Revisar o cabeçalho em tablets na faixa de 1024 a 1279 px (agora usam o botão "Menu"): os botões do painel ficam com a largura toda, o que funciona, mas pode ganhar um layout em duas colunas.
