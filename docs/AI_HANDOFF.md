# AI_HANDOFF — novo site da Fundação MT

> Atualizado em 25/11/2026. Todo o trabalho está na branch `main`, publicada em `origin/main` (commit `54ff8d9`, "Novo site da Fundação MT em Next.js e pesquisa do site atual"). As branches `feat/novo-site` e `docs/analise-site-atual` citadas em versões anteriores não existem mais no repositório.
> Pesquisa do site antigo: `docs/analise-site-atual/` (comece pelo `AI_HANDOFF.md` de lá se precisar do contexto da empresa).

## 1. Estado atual

O site está **construído e funcional** em Next.js: todas as páginas públicas, navegação, busca, filtros, formulário com API, cookies, SEO e redirecionamentos das URLs antigas. Build de produção ok (228 páginas). Auditorias e documentação concluídas.

**Não está pronto para publicar** por causa de pendências da Fundação: autorização de fotos/textos, logo vetorial, destino do formulário, subdomínio do sistema atual e confirmação do aplicativo. Lista completa em `AUDITORIA_FINAL.md §6`.

## 2. Como rodar

- Node 20.9+. Máquina atual: Windows 11, Node do sistema (`C:\Program Files\nodejs`, v24.15.0). Na máquina anterior (macOS) era `export PATH=$HOME/.local/node/bin:$PATH` (v24.22.3).
- Num clone novo: `npm install` antes de tudo (`node_modules` não vai para o git).
- `npm run dev` (porta 3000; baixa as fontes antes). No navegador do Claude: `preview_start` com o nome `site-windows` no Windows ou `site` no macOS/Linux (`.claude/launch.json`). Se a 3000 estiver ocupada, o painel escolhe outra porta.
- `npm run build && npm start` para produção. `npm run typecheck` (= `next typegen && tsc --noEmit`) e `npx eslint src` passam. Não rode `npx tsc --noEmit` sozinho num clone novo: `PageProps`/`LayoutProps` só existem depois do `next typegen`, `next dev` ou `next build`.
- Variáveis: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_LEGACY_URL`, `CONTACT_WEBHOOK_URL` (ver `README.md`).

## 3. Arquitetura

- **Next.js 16.4.6** (App Router, `cacheComponents` + `partialPrefetching`), React 19.3, TypeScript, Tailwind 4.3 (tokens em `@theme` no `globals.css`), Motion 14, Lucide.
- Antes de usar APIs do Next, leia `node_modules/next/dist/docs/`: params assíncronos, `images.qualities`, `"use cache"`/`io()` para `new Date()`, `instant = false` nas rotas `[slug]`.
- Conteúdo em `src/content/` (TS tipado) + `src/content/generated/` (JSON extraído do site oficial). Páginas em `src/app/`, componentes em `src/components/`.
- Imagens remotas do servidor oficial (`next.config.ts › remotePatterns`), catálogo em `src/content/media.ts`.
- Redirecionamentos em `src/content/redirects.ts`, usados pelo `next.config.ts`.
- "Próximos × anteriores" dos eventos: `getEventSplit()` com `"use cache"` e `cacheLife("hours")`.

## 4. Design system (resumo; detalhes em `DESIGN_SYSTEM.md`)

Conceito "Ciência no campo". Sentient (títulos) + General Sans (texto), do Fontshare, **fora do git por licença**. Verdes do logotipo (`brand-600 #2f7a3b` para ação, `leaf-400 #8dc63f` só em fundo escuro), papel `#f6f4ee`. Raios de 10/16/24/32 px. Sem eyebrows, sem números de seção. Movimento (ampliado em 25/11/2026, a pedido do usuário): entrada animada no hero e no topo de todas as páginas, conteúdo e fotos que aparecem ao rolar, parallax, contador nos números da home, faixa de fotos que corre com a rolagem, barra de leitura nas notícias. É quase tudo CSS scroll-driven (sem JS), e nada roda com `prefers-reduced-motion` ou em navegador sem suporte. Detalhes em `DESIGN_SYSTEM.md §7`. Sete fotos novas das notícias oficiais estão em `media.ts` (lista em `CONTENT_SOURCES.md §3`).

## 5. Páginas

Concluídas: `/`, `/a-fundacao` (+ `/comite-gestor-de-inovacao`, `/transparencia`), `/pesquisa` (+ 9 áreas, `/equipe`), `/centros-experimentais` (+ 6), `/servicos` (+ 6), `/laboratorios` (+ 3), `/conhecimento`, `/eventos` (+ 49), `/noticias` (+ 130), `/contato`, `/busca`, 404, `sitemap.xml`, `robots.txt`, `POST /api/contato`.

Pendentes ou de propósito fora do site: área logada, inscrição e compra (continuam no sistema atual); aplicativo (lojas fora do ar); página de imprensa e newsletter (precisam de conteúdo da Fundação).

## 6. Decisões

- Fotos e logo **remotos, não copiados**, até haver autorização; trocar em `media.ts`.
- Cópia do texto das notícias no repositório: ⚠️ confirmar autorização (o repositório é público).
- Nenhum envio simulado: sem `CONTACT_WEBHOOK_URL`, o formulário avisa e oferece e-mail e WhatsApp.
- Links mortos removidos (app, informativo), com registro em `CONTENT_SOURCES.md §4`.
- Skills usadas por leitura e aplicação manual; só o `search.py` da UI UX Pro Max foi executado (`SKILLS_APLICADAS.md`).
- Eventos: lotes e preços são cópia de 21/11/2026, com aviso na página.

## 7. Próximos passos

1. Revisar com a Fundação: textos, fotos, pendências da `AUDITORIA_FINAL.md §6`.
2. Ajustar o cabeçalho entre ~768 e ~1024 px: o menu de desktop aparece, mas "A Fundação" e "Área do usuário" quebram em duas linhas (visto a ~800 px em 25/11/2026; a auditoria só testou 375, 768 e 1440 px).
3. Trocar as imagens remotas por arquivos autorizados otimizados (`public/` ou CDN).
4. Configurar `CONTACT_WEBHOOK_URL` e GTM com consentimento.
5. Ligar notícias e eventos a uma fonte de dados (CMS headless ou API do Laravel).
6. Testes com leitor de tela, Safari/iOS e 4G real; definir hospedagem e o subdomínio do sistema legado.
