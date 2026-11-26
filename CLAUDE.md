# FundacaoMTWebSite

Novo site da Fundação MT (https://www.fundacaomt.com.br), instituição de pesquisa agropecuária de Mato Grosso. Next.js 16 + TypeScript + Tailwind 4.

- Antes de qualquer tarefa, leia `docs/AI_HANDOFF.md` (estado do site, decisões e próximos passos). O contexto da empresa e do site antigo está em `docs/analise-site-atual/AI_HANDOFF.md`.
- Esta versão do Next.js tem mudanças importantes: leia `node_modules/next/dist/docs/` antes de usar APIs (ver `AGENTS.md`).
- Node 20.9 ou superior. No Windows (máquina atual) é o Node do sistema, em `C:\Program Files\nodejs` (v24.15.0); no Mac/Linux antigo ficava em `~/.local/node/bin`. No navegador do Claude, suba o site com `preview_start` e o nome `site-windows` (ou `site` no Mac/Linux). Para checar tipos use `npm run typecheck` (gera os tipos do Next antes do `tsc`). As fontes do Fontshare são baixadas por `scripts/fetch-fonts.mjs` e **não podem ir para o git** (licença).
- Informações sobre a empresa: use só o que está documentado com fonte (`docs/CONTENT_SOURCES.md`) ou confirme com o usuário. Não invente serviços, pessoas, números ou endereços.
- Fotos, logo e textos do site antigo dependem de autorização da Fundação MT: são carregados remotamente via `src/content/media.ts`, sem cópia no repositório.
- Nunca simule envios, login ou transações; fluxos não integrados vão para o sistema oficial (`NEXT_PUBLIC_LEGACY_URL`).
- Idioma do projeto e do conteúdo: português do Brasil.
