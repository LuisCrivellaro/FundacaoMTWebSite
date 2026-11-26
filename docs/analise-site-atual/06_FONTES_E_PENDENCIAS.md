# 06 — Fontes, evidências e pendências

> Data da coleta: **21/11/2026**. Ferramentas: navegador embutido do Claude Desktop (navegação visual, screenshots, inspeção do DOM via JavaScript), `curl` (download do HTML de todas as URLs do sitemap, 1 pedido a cada ~0,3 s), WebSearch e leitura de páginas externas.
> Nenhum formulário foi enviado, nenhum login feito e nada foi alterado no site original. Cookies não essenciais foram **recusados** no banner.

## 1. URLs consultadas

### 1.1 Site oficial (fundacaomt.com.br)
- `robots.txt`, `sitemap.xml` (436 URLs) → lista completa e status em [`inventario/paginas.md`](inventario/paginas.md).
- **Navegadas visualmente** (com captura): `/`, `/sobre-nos`, `/area-de-pesquisa/entomologia`, `/area-experimental/cad-oeste`, `/servicos-por-area/consultoria-agronomica`, `/laboratorio/laboratorio-de-entomologia`, `/noticias/fundacao-mt-promove-discussoes-sobre-a-cultura-do-algodao`, `/eventos`, `/transparencia`, `/fale-conosco`, `/palestra-e-treinamento/categoria/encontro-tecnico-soja` (500); modal "Área do Usuário"; menus desktop e mobile.
- **Lidas por HTML (texto extraído)**: as 436 do sitemap + `/links-uteis`, `/servicos-por-area/aplicativo`, `/palestra-e-treinamento/categoria/palestras`, `/protecao-de-dados/lei-geral-de-protecao-de-dados-pessoais`, `/area-de-pesquisa/gestao-de-pesquisa` (404).
- Assets verificados: `/images/resources/{logo.webp, fundacao-logo.png, logo.jpg, icone.png, og-default.jpg}`, `/img/logo_premium.png`, favicons.

### 1.2 Perfis oficiais
| Fonte | URL | O que confirmou | Acesso |
|---|---|---|---|
| LinkedIn [LI] | https://www.linkedin.com/company/fundacaomt/ | Slogan "Dando vida aos resultados!", 62.596 seguidores, 51–200 funcionários, 715 vinculados, fundada em 1993, sede em Rondonópolis, unidade na BR-163 km 765 (Sorriso), descrição institucional | ✅ Página pública |
| Instagram [IG] | https://www.instagram.com/fundacaomt/ | ~36 mil seguidores, bio "Instituição de pesquisa agronômica e desenvolvimento tecnológico para a agricultura", destaques (26 ET Soja, 18 ET Algodão, Boletim, Sobre Nós) | ✅ Parcial (sem login) |
| YouTube | https://www.youtube.com/user/fundacaomt/videos | — | ❌ A página não carregou o conteúdo no navegador embutido |
| Facebook | https://www.facebook.com/fundacaomt | — | ⏭️ Não acessado (exige login) |
| PNIPE/MCTI | pnipe.mcti.gov.br/laboratory/38559 · 38560 · 38561 | Links citados nas páginas de laboratório | ⏭️ Não aberto; links registrados |

### 1.3 Fontes externas (imprensa)
| Cód. | URL | Data | Uso |
|---|---|---|---|
| E1 | https://revistacultivar.com.br/noticias/fundacao-mt-tem-nova-marca | 10/12/2013 | Marca de 2013 (conceito, cores, fonte Amelia) |
| E2 | https://www.comprerural.com/fundacao-mt-traca-nova-trajetoria-no-agronegocio/ | 20/07/2022 | Reestruturação, 9 áreas, 16 pesquisadores, CADs, marca de 2022, FMT ID, Escola de Herbicidas (200+ formados) |
| E3 | https://revistacultivar.com.br/noticias/como-30-anos-de-pesquisas-da-fundacao-mt-contribuiram-com-o-agronegocio | 16/11/2023 | 30 anos, público dos eventos (1.900 em 2022; 2.196 em 2023), Boletim bienal |
| E4 | https://www.noticiasagricolas.com.br/noticia/393309 | 30/01/2025 | Extremo norte de MT; serviços; Douglas Coradini (head de serviços) |
| E5 | https://www.agrolink.com.br/noticias/pesquisa-agronomica-avanca-no-extremo-norte-de-mato-grosso_498953.html | 01/02/2025 | Vitrine em Alta Floresta (61 cultivares, 19 empresas) |
| — | Resultados de busca na Revista Cultivar (2009–2018) | — | Cultivar de soja Inox (2009, com TMG), "Fundação MT em Campo", CAD-Sul na Fazenda Cachoeira, BR-163 km 40 (2018) |

## 2. Evidências das informações-chave

| Informação | Evidência |
|---|---|
| Razão social e CNPJ | Rodapé de todas as páginas; `screenshots/08_desktop_home_rodape.jpg` |
| Endereço, telefone, e-mail | Rodapé; `/fale-conosco`; JSON-LD `Organization` |
| Fundação em 1993, 23 produtores | `/sobre-nos` (texto); [LI] |
| Missão/Visão/Propósito/Valores | `/sobre-nos`; `screenshots/13_desktop_sobre_missao-visao.jpg` |
| Conselho Curador | `/sobre-nos`; `screenshots/14_desktop_sobre_conselho-curador.jpg` |
| Equipe técnica | `/area-de-pesquisa/*`, `/servicos-por-area/*` |
| CADs: criação, coordenadores, horários, coordenadas | `/area-experimental/*` (texto + iframes do Google Maps) |
| 200+ ensaios/safra (Fitopatologia) | `/area-de-pesquisa/fitopatologia` |
| Laboratórios no PNIPE | `/laboratorio/*` |
| Preços de ingressos (18º ET Algodão) | JSON-LD `Event.offers` em `/eventos/18o-encontro-tecnico-de-algodao-2d9b` |
| Preços do Boletim | Banner da home (imagem), `screenshots/23_mobile_banner-texto-ilegivel.jpg` |
| Erros 500/404, base64, HTML do Word | `inventario/paginas.md`; tamanho dos arquivos HTML; `/servicos-por-area/venda-de-insetos` |
| Peso da home (8,9 MB, 7,3 s) | `performance.getEntriesByType` no navegador embutido, desktop, sem throttling (medição única, indicativa) |
| Cores e fontes | `getComputedStyle` na home; amostragem de pixels de `fundacao-logo.png` |

## 3. Informações NÃO confirmadas / conflitantes ❓

| # | Tema | Situação |
|---|---|---|
| 1 | **Municípios dos CADs** | O site não diz a cidade de cada CAD. Inferido pelas coordenadas + [E2]: Médio Norte ≈ Nova Mutum; Norte = Sorriso; Oeste = Sapezal (confirmado pela página do Cotton Day); Primavera = Primavera do Leste; Sul ≈ Itiquira ([E2]) ou Rondonópolis/BR-163 km 40 (2018). **Confirmar.** |
| 2 | Ano do CAD Primavera | A página diz "Data de criação: 2015" e, no texto, "implantação do CAD em 2018". |
| 3 | Número de pesquisadores/funcionários hoje | 16 pesquisadores (2022, [E2]); 51–200 funcionários ([LI]); o site lista ~16 pessoas técnicas. |
| 4 | Número de áreas de pesquisa | Menu "Pesquisa": 10 itens (com Liderança); "Informações Técnicas": 10 áreas + Boletim; [E2]: 9. |
| 5 | Serra da Petrovina | Citada em [E2] e em um Circuito do Conhecimento (2022); não aparece como CAD hoje. |
| 6 | Preços do Boletim | Só aparecem em banner (R$ 175 / 70 / 250 / 350); confirmar valores vigentes. |
| 7 | Slogan oficial | "Dando vida aos resultados!" está no LinkedIn e nos banners; confirmar se continua oficial. |
| 8 | Paleta e tipografia oficiais | Amostradas do PNG; falta o manual de marca. |
| 9 | Douglas Coradini | Citado em 2025 como head de serviços ([E4]); não aparece no site. |
| 10 | Local do 18º ET Algodão | JSON-LD: sede em Rondonópolis; notícia: Hotel Gran Odara, Cuiabá. |
| 11 | Data da marca atual | [E2] diz "lançada no dia 1º de julho", sem o ano (artigo de 20/07/2022). |
| 12 | Associados/mantenedores | Não há informação pública sobre o modelo de financiamento (associados, contribuições). |
| 13 | Acesso "Premium" | Existe um botão "acesso Premium" via WhatsApp, sem explicação do que inclui ou do preço. |
| 14 | Conteúdo da área logada | Não acessado (exige cadastro); não sabemos o volume nem o formato dos conteúdos técnicos. |
| 15 | Depoimentos | Nenhum depoimento de cliente encontrado. |

## 4. Páginas inacessíveis ou com erro

| Tipo | URLs |
|---|---|
| **500** (13) | `/palestra-e-treinamento/categoria/{digital-tech, fmt-em-campo-2-safra, encontro-tecnico-da-pecuaria, encontro-tecnico-soja, escola-de-herbicidas, seminario-agricultura-do-futuro, fundacao-mt-em-campo, e-hora-de-cuidar, circuito-do-conhecimento, encontro-tecnico-milho, encontro-tecnico-algodao, e-hora-de-plantar, live}` |
| **404** (6) | `/noticias/como-minimizar-os-efeitos-da-cigarrinha-do-milho-nas-lavouras`, `/noticias/pragas-iniciais-na-cultura-da-soja`, `/noticias/manejo-de-pragas-na-cultura-da-soja-fase-vegetativa`, `/noticias/entenda-o-cascudinho-da-soja-no-sistema-de-cultivo-soja-milho`, `/noticias/manejo-de-plantas-daninhas-no-sistema-de-producao`, `/area-de-pesquisa/gestao-de-pesquisa` |
| **Restritas (login)** | "Informações Técnicas" (11 áreas), `/perfil`, `/carrinho`, `/pedidos`, `/certificado`, `/comite-gestor/solicitar-agendamento` |
| **Vazias/placeholder** | `/power-bi`, `/area-de-pesquisa/{agricultura-digital (TESTE), validacao-de-resultados, educacional, marketing}`, várias `/palestra-e-treinamento/categoria/*`, `/servicos-por-area/pecuaria` |
| Não exploradas | Fluxo de compra/checkout, área logada, busca interna em profundidade, Portal do Colaborador/GLPI (internos, fora do escopo) |

## 5. Pendências para a etapa de desenvolvimento (pedir à Fundação MT)

**Marca e assets**
- [ ] Manual de marca e logotipo vetorial (SVG/AI/PDF): versões vertical, horizontal, negativa e símbolo.
- [ ] Autorização formal de uso de fotos e textos do site atual.
- [ ] Banco de fotos originais em alta resolução (CADs/drone, laboratórios, equipe, eventos).
- [ ] Fotos padronizadas de toda a equipe técnica + links Lattes/LinkedIn.
- [ ] Logos de parceiros/patrocinadores com autorização.

**Conteúdo**
- [ ] Validar a mensagem central, os pilares e os números (anos, CADs, pesquisadores, ensaios/safra, público de eventos, hectares).
- [ ] Município e área (ha) de cada CAD; confirmar coordenadores e contatos.
- [ ] Lista oficial de serviços com responsável, público, entregáveis, prazos e (se houver) faixa de preço.
- [ ] Texto original do flyer da Consultoria Agronômica.
- [ ] Relatórios de atividades recentes (2023–2025) e Boletim mais recente.
- [ ] Depoimentos de produtores, empresas e participantes de eventos.
- [ ] Explicar o "acesso Premium" e o conteúdo da área logada.
- [ ] Próximos eventos de 2027 (calendário).

**Técnico**
- [ ] Decidir a stack e o CMS; acesso ao back-end/admin atual (Laravel) e às APIs de checkout, login e eventos.
- [ ] Acesso a GA4/GTM, Search Console e RD Station para preservar rastreamento e medir a migração.
- [ ] Gerar o mapa de redirecionamentos 301 (base: `inventario/paginas.md`).
- [ ] Definir o destino dos portais internos (Portal do Colaborador, GLPI, Ocorrências).
- [ ] Confirmar os links das lojas de apps (`fundacaomt.com.br/app`) e o estado atual do app.
- [ ] Hospedagem, domínio e certificado.
