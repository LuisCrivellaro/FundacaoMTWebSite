# Auditoria final — 25/11/2026

## 1. Testes realizados

| Teste | Como | Resultado |
|---|---|---|
| TypeScript | `npm run typecheck` (`next typegen && tsc --noEmit`) | ✅ sem erros |
| Lint | `npx eslint src` | ✅ sem erros (corrigido 1 problema `react-hooks/static-components`) |
| Build de produção | `npm run build` | ✅ 228 páginas estáticas (◐/○), 1 rota dinâmica (`/api/contato`) |
| Verificação automática em 375 px | Script no navegador embutido, 26 URLs (todas as rotas e 4 redirecionamentos) | ✅ sem rolagem horizontal, 1 H1 por página, sem salto de título (após correção), 0 imagens sem `alt`, 0 links/botões sem nome |
| Visual desktop 1440 px | Screenshots da home inteira, área, centro, notícia, eventos, contato | ✅ após correções |
| Visual mobile 375 px | Home, centro, serviço, menu | ✅ após correção de overflow |
| Visual tablet 768 px | Home | ✅ |
| Teclado | Tab inicial (skip link), mega-menu com Enter/Esc, seletor de centros com setas | ✅ |
| Formulário | Envio vazio (erros e foco), pré-preenchimento por URL, envio válido sem webhook | ✅ erros no lugar certo; resposta 503 com e-mail e WhatsApp |
| Redirecionamentos | `/sobre-nos`, `/area-de-pesquisa/entomologia`, `/servicos-por-area/entomologia`, `/servicos/helicoverpa-armigera` | ✅ (308 permanente) |
| Sitemap e robots | `curl` no servidor de produção | ✅ 216 URLs; `/api` e `/busca` bloqueados |
| Desempenho | `next start` + Performance API no navegador embutido (sem throttling) | Home ~1,1 MB / 15 requisições / 202 KB de JS / CLS 0 (site atual: 8,9 MB / 47) |
| Links externos oficiais | `curl` em 17 destinos | ✅ 14 ok; ❌ App Store, ❌ Google Play, ⚠️ Informativo → home (removidos do site) |
| Console | Painel do navegador e log do servidor | ✅ sem erros de console; avisos de "instant navigation" resolvidos com `instant = false` |

**Não testado**: leitor de tela real (NVDA/VoiceOver), Safari/iOS e Firefox, LCP/INP em 4G real, entrega do formulário a um webhook de verdade, login e inscrição (ficam no sistema atual).

## 2. Problemas encontrados e corrigidos

| # | Problema | Correção |
|---|---|---|
| 1 | Logo oficial (PNG com fundo branco) mostrava um retângulo branco com o cabeçalho translúcido | Cabeçalho sólido; `mix-blend-multiply` funciona sem `backdrop-blur` |
| 2 | Texto do hero pouco legível sobre a foto em algumas áreas | Gradiente lateral reforçado (0,72 → 0) |
| 3 | Eyebrow acima do H1 (proibido pela Impeccable) | Removido |
| 4 | Rolagem horizontal de 12 px na página de serviço no celular (grid crescendo com conteúdo) | `min-width: 0` global em filhos de grid/flex + `overflow-wrap` |
| 5 | Salto H1 → H3 em Eventos | `h2` (só para leitor de tela) na lista |
| 6 | Página 404 com o título da home | `metadata` próprio e `noindex` |
| 7 | Componente criado durante o render no formulário (lint) | Componente `Err` movido para fora |
| 8 | Aviso "URL data outside Suspense" nas rotas `[slug]` | `export const instant = false` (todas pré-geradas) |
| 9 | Selo de data esticado nos cartões de evento | `self-start` |
| 10 | Links de download do app quebrados (404 nas lojas) | Chamadas removidas; pendência registrada |
| 11 | "Informativo Técnico" redireciona para a home no site oficial | Removido da lista |
| 12 | "Boletim 19/20 digital" leva a um produto "17-18" na Hotmart | Descrição avisa sobre a Hotmart |
| 13 | Fonte itálica baixada sem uso (51 KB) | Removida |
| 14 | Frases sem fonte (conselho presidido por produtores; horário do WhatsApp; prazos) | Removidas |
| 15 | Fallback do formulário pedia que a pessoa redigitasse tudo | E-mail abre com assunto e texto já preenchidos |
| 16 | Fotos de baixa resolução (≈300 px) ampliadas no topo das áreas | Topo só com originais ≥ 700 px; as outras como miniatura |

## 3. Páginas validadas

Home · A Fundação · Comitê Gestor de Inovação · Transparência · Pesquisa · 9 áreas · Pesquisadores · Centros experimentais · 6 centros · Serviços · 6 serviços · Laboratórios · 3 laboratórios · Conhecimento · Eventos (próximos/anteriores/série) · 49 eventos · Notícias (busca/tema/paginação) · 130 notícias · Contato · Busca · 404.
(Checagem automática em todas as rotas-modelo; visual completo em home, área, centro, serviço, notícia, eventos e contato.)

## 4. Funcionalidades operacionais

- Navegação desktop (mega-menu acessível) e mobile (gaveta em tela cheia com acordeões).
- Busca no site (`/busca`) em áreas, serviços, laboratórios, centros, publicações, eventos e notícias.
- Notícias: busca por texto, filtro por tema, paginação, artigos com vídeo, compartilhamento e "Leia também".
- Eventos: próximos × anteriores (pela data de hoje, cache de 1 h), filtro por série, lotes de inscrição e link para a inscrição oficial.
- Contato: formulário validado, roteável por assunto, anti-spam, envio via webhook configurável e alternativa honesta.
- Cookies: banner com categorias e reabertura pelo rodapé (nenhum rastreador carregado).
- Clima ao vivo dos CADs (WeatherLink), mapas, e-mails de coordenação.
- SEO: metadados, JSON-LD, sitemap, robots e redirecionamentos das URLs antigas.

## 5. Avaliação por critério

Notas de 0 a 5, conservadoras.

| Critério | Nota | Fundamento |
|---|---|---|
| Identidade visual | 4 | Própria e consistente; depende do manual de marca e de um logo vetorial/negativo para chegar a 5 |
| Direção de arte | 4 | Fotos aéreas fortes e composição editorial; algumas áreas ainda com fotos fracas do acervo antigo |
| UX/UI | 4 | Arquitetura por público, filtros na URL, estados completos; login e inscrição saem do site |
| Tipografia | 4,5 | Par serifa + grotesca, escala fluida, medida controlada |
| Storytelling | 4 | Narrativa clara na home; faltam depoimentos e resultados de pesquisa em destaque |
| Motion | 4 | Discreto e funcional; um momento só |
| Conteúdo | 4 | Real e rastreável; textos de áreas ainda densos (são os oficiais) e notícias antigas sem revisão editorial |
| Funcionalidade | 3,5 | Tudo que é público funciona; formulário sem destino configurado; transações no sistema atual |
| Responsividade | 4,5 | Testada em três larguras; sem overflow |
| Acessibilidade | 4 | Checklist WCAG 2.2 AA aplicado e verificado; falta leitor de tela real |
| Performance | 4 | 1,1 MB e 228 páginas estáticas; imagens remotas têm custo no primeiro acesso (otimização sob demanda) |
| SEO | 4,5 | Estrutura completa e migração de URLs pronta |

## 6. Pendências

**Dependem da Fundação MT**
- Autorização de uso de fotos, logotipo e textos (inclusive as 130 notícias num repositório público).
- Manual de marca, logo vetorial (SVG) e versão negativa.
- Fotos originais em alta resolução: CAD Oeste, laboratórios, equipe e áreas de pesquisa.
- Confirmar se o aplicativo ainda existe (lojas retornam 404).
- Link correto do "Informativo Técnico — Vitrine de Cultivares de Algodão 24/25".
- Destino do formulário (RD Station ou outro) e e-mails por assunto.
- Números atuais (equipe, hectares, ensaios por safra no total) e depoimentos.
- Relatórios de atividades após 2022.

**Técnicas**
- Hospedagem e subdomínio do sistema legado (`NEXT_PUBLIC_LEGACY_URL`).
- Fonte de dados para notícias e eventos (CMS ou API) em vez do JSON gerado.
- GTM/GA4 com Consent Mode.
- Rate limit compartilhado (Redis, Turnstile) em produção com várias instâncias.
- Testes com leitor de tela, Safari/iOS e 4G real.

## 7. Limitações técnicas

- Imagens remotas: a primeira requisição de cada tamanho é lenta (originais de até 7 MB são otimizados sob demanda). Some quando houver arquivos locais otimizados.
- Os lotes e preços de eventos são uma cópia de 21/11/2026; a página avisa e manda para o site oficial.
- O conteúdo foi gerado do HTML coletado em 21/11/2026. O script de coleta ficou numa pasta temporária que não existe mais; para atualizar, refazer a coleta (ver `docs/analise-site-atual/AI_HANDOFF.md §7`) ou, melhor, ligar o site a uma fonte de dados.
