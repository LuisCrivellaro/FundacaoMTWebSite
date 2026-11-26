# Fundação MT — novo site institucional

Redesign do site da [Fundação MT](https://www.fundacaomt.com.br), instituição de pesquisa agropecuária de Mato Grosso criada em 1993. Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion e Lucide.

## Como rodar

Requer Node.js 20.9 ou superior (testado com 24.22.3).

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build && npm start
```

`npm run dev` e `npm run build` executam antes o `scripts/fetch-fonts.mjs`, que baixa as fontes do Fontshare para `src/fonts/`. **Os arquivos de fonte não são versionados**: a licença ITF FFL permite hospedar no site, mas proíbe redistribuir em repositório público.

Outros comandos: `npm run lint`, `npm run typecheck`.

## Variáveis de ambiente

| Variável | Para quê | Padrão |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canônica (metadados, sitemap, JSON-LD) | `https://www.fundacaomt.com.br` |
| `NEXT_PUBLIC_LEGACY_URL` | Endereço do sistema atual (login, inscrições, loja, políticas) | `https://www.fundacaomt.com.br` |
| `CONTACT_WEBHOOK_URL` | Destino do formulário de contato (POST JSON) | vazio: o formulário avisa que não enviou e oferece e-mail/WhatsApp |

## Estrutura

```
src/
  app/                 rotas (home, a-fundacao, pesquisa, centros-experimentais, servicos,
                       laboratorios, conhecimento, eventos, noticias, contato, busca, api/contato)
  components/          layout (Header, Footer, CookieConsent), ui (Button, Primitives),
                       home (seções), cards, buscadores (NewsBrowser, EventsBrowser, SiteSearch)
  content/             dados reais do site oficial (site, áreas, centros, serviços, laboratórios,
                       publicações, institucional, notícias, eventos, mídia, redirects)
  content/generated/   JSON gerado do HTML do site oficial (130 notícias, 49 eventos, áreas)
  lib/format.ts        datas com Intl (pt-BR, fuso de Cuiabá) e utilitários
scripts/fetch-fonts.mjs
docs/                  pesquisa, design system, auditorias e handoff
```

## Documentação

- [docs/AI_HANDOFF.md](docs/AI_HANDOFF.md): estado atual e próximos passos (leia primeiro)
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md): tokens, tipografia, componentes e movimento
- [docs/SITEMAP.md](docs/SITEMAP.md): páginas e redirecionamentos
- [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md): origem de cada conteúdo e status de autorização
- [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md): sistemas externos, formulário e migração de domínio
- [docs/UI_UX_50_PRINCIPIOS.md](docs/UI_UX_50_PRINCIPIOS.md), [docs/SKILLS_APLICADAS.md](docs/SKILLS_APLICADAS.md), [docs/AUDITORIA_FINAL.md](docs/AUDITORIA_FINAL.md)
- [docs/analise-site-atual/](docs/analise-site-atual/): pesquisa e auditoria do site antigo

## Importante antes de publicar

As fotos, os textos e o logotipo vêm do site oficial da Fundação MT e **ainda dependem de autorização formal** para uso neste projeto (ver `docs/CONTENT_SOURCES.md`). As imagens são carregadas do servidor oficial, não copiadas para o repositório.
