# Fontes de conteúdo

Todo o conteúdo do site vem de fontes públicas e oficiais da Fundação MT. Nada foi inventado: quando uma informação não pôde ser confirmada, ela ficou fora do site e entrou na lista de pendências (`docs/AUDITORIA_FINAL.md`). Coleta: 21/11/2026, com verificações em 25/11/2026.

## 1. Status de autorização

| Tipo | Origem | Onde fica | Status |
|---|---|---|---|
| Fotografias | Servidor oficial (`www.fundacaomt.com.br/storage/...`, `/imgs/...`) | Carregadas remotamente via `next/image` (`next.config.ts › images.remotePatterns`); **não copiadas para o repositório** | ⚠️ Autorização formal pendente |
| Logotipo e símbolo | `/images/resources/fundacao-logo.png` e `icone.png` | Carregados remotamente | ⚠️ Pendente; falta versão vetorial e negativa |
| Textos institucionais e de áreas/serviços | Páginas oficiais, reescritos com fidelidade | `src/content/*.ts` | ⚠️ Pendente de revisão pela Fundação |
| Notícias (130) e eventos (49) | HTML oficial, convertido por script | `src/content/generated/*.json` | ⚠️ Pendente. O repositório é público: confirmar que a Fundação autoriza a cópia do texto integral |
| Fontes tipográficas | Fontshare (Sentient, General Sans), licença ITF FFL | Baixadas no build, fora do git | ✅ Uso permitido; redistribuição proibida |
| Ícones | Lucide (ISC) | Dependência npm | ✅ |

Para trocar as imagens por arquivos autorizados, basta editar `src/content/media.ts` (catálogo central) e os campos `image`/`photo` dos módulos de conteúdo.

## 2. Origem por conteúdo

| Conteúdo | Arquivo | Fonte oficial |
|---|---|---|
| Nome, razão social, CNPJ, endereço, telefones, e-mail, horário | `src/content/site.ts` | Rodapé de todas as páginas; `/fale-conosco`; `/area-experimental/*` (horário) |
| Missão, visão, propósito, valores | `site.ts` | `/sobre-nos` |
| Slogan "Dando vida aos resultados" | `site.ts` | LinkedIn oficial (tagline) e banners do site |
| História e linha do tempo | `src/content/institutional.ts` | `/sobre-nos`; datas de criação em `/area-experimental/*`; `/area-de-pesquisa/data-science` (2021); `/relatorio-de-atividades/...` (eventos digitais, estúdio) |
| Conselho Curador e diretoria (fotos e períodos) | `institutional.ts` | `/sobre-nos` |
| Comitê Gestor de Inovação | `institutional.ts` | `/comite-gestor` |
| Documentos de transparência | `institutional.ts` | `/transparencia/*` (links para as versões oficiais) |
| Áreas de pesquisa: textos, pesquisadores, minicurrículos, ofertas | `src/content/areas.ts` + `generated/areas.json` | `/area-de-pesquisa/<área>` e `/area-de-pesquisa/servico/*` (títulos completos) |
| Data Science: Paulo Souza e Danilo Passos | `areas.ts` | `/servicos-por-area/data-science` |
| Resumos de uma linha das áreas | `areas.ts` | Reescritos a partir do texto oficial de cada área |
| "Mais de 200 ensaios a campo por safra" | `areas.ts`, home | `/area-de-pesquisa/fitopatologia` (vale só para Fitopatologia, e o site diz isso) |
| Centros: criação, foco, linhas, culturas, coordenação, mapas, estações | `src/content/centers.ts` | `/area-experimental/*` (coordenadas tiradas dos links "Como chegar"; widgets WeatherLink das próprias páginas) |
| Municípios dos CADs | `centers.ts` | Notícias oficiais: "CAD Norte (Sorriso", "CAD Médio Norte (Nova Mutum", "CAD Oeste, em Sapezal", "CAD PRIMAVERA (Primavera do Leste", "CAD Sul (Itiquira" |
| Serviços | `src/content/services.ts` | `/servicos-por-area/*` e `/servicos/*` |
| Laboratórios e links PNIPE | `src/content/labs.ts` | `/laboratorio/*` |
| Publicações | `src/content/publications.ts` | `/links-uteis` (redirecionamentos oficiais) e PDF do Relatório 2022 |
| Áreas da informação técnica restrita | `publications.ts` | Menu "Informações Técnicas" do site oficial |
| Notícias | `generated/news.json` | `/noticias/*` (corpo, data, imagem, tags e vídeos do YouTube) |
| Eventos, lotes e preços | `generated/events.json` | `/eventos/*` (texto da página e lotes). Valores copiados em 21/11/2026; a página avisa para conferir no site oficial |
| Local do VII ET Milho e do 18º ET Algodão | `src/content/events.ts` | Banner oficial do VII ET Milho e notícia do 18º ET Algodão (Hotel Gran Odara, Cuiabá) |
| Fatos da home (1993, 6 centros, 3 laboratórios, 200+, 26 edições) | `components/home/About.tsx` | `/sobre-nos`, `/area-experimental/*`, `/laboratorio/*`, `/area-de-pesquisa/fitopatologia`, `/eventos/26o-encontro-tecnico-de-soja-26f8` |

## 3. Imagens usadas

| Uso | Arquivo oficial | Resolução |
|---|---|---|
| Hero da home e OG | `innovation-committee/1772820423-tetgJjVPkF.jpg` (CAD Sul, aérea) | 6804 × 4536 |
| Sede | `innovation-committee/1772819686-lNmMlkbuoc.JPG` | 4575 × 3051 |
| CAD Norte | `innovation-committee/1772820063-rvVjL3dtWH.JPG` | 4000 × 3000 |
| CAD Médio Norte | `innovation-committee/1772820099-2K71XtqlJv.JPG` | 5472 × 3648 |
| CAD Primavera | `innovation-committee/1772820364-WcrgoRCnhH.JPG` | 4081 × 2915 |
| CAD Oeste | `experimental-area/banners/cb2ff1e4-...png` (traz o selo "Parceria AMAGGI") | 1168 × 500 (baixa; pedir original) |
| Áreas de pesquisa | `research-area/*` | 283 a 1563 px (as menores só como miniatura) |
| Pesquisadores, conselho | `researchers/*`, `/imgs/inside/*` | Retratos oficiais |
| Notícias e eventos | `post/*`, `products/*` | Imagens das próprias publicações |

**Não usamos** as imagens de banco do site antigo (Data Science com gráficos genéricos, "Liderança" com mão e gráfico, banner com pessoas e tablet). Onde não há foto própria, usamos um grafismo de parcelas experimentais (`DataGlyph`) ou iniciais (`Avatar`).

## 4. Conteúdo removido por não ter destino válido (25/11/2026)

- Downloads do **aplicativo**: App Store e Google Play retornam 404, inclusive pela página oficial `/app`.
- **Informativo Técnico — Vitrine de Cultivares de Algodão 24/25**: o link oficial redireciona para a home.
- O link "Boletim 19/20 versão digital" leva à Hotmart (produto "17-18"); ficou no site com essa informação na descrição.
