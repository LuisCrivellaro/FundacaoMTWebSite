# 03 — Auditoria visual, UX/UI e técnica do site atual

> Inspeção feita em 21/11/2026 no navegador embutido, em **desktop (1440×900)** e **mobile (375×812)**, mais leitura do HTML de **441 URLs** (436 do sitemap + 5 linkadas fora dele), das quais 422 responderam com conteúdo.
> Capturas em [`screenshots/`](screenshots/). Tudo aqui é **avaliação de design** (opinião técnica), não fato sobre a empresa.
> Severidade: 🔴 alta · 🟠 média · 🟡 baixa.

---

## 1. Resumo do diagnóstico

O site atual tem **muito conteúdo útil**, mas **apresentação fraca**. A Fundação é uma instituição científica de 30+ anos, com 62 mil seguidores no LinkedIn, e o site não transmite essa autoridade. Os problemas principais:

1. **Não comunica proposta de valor.** A home não diz o que a Fundação faz, para quem, nem por que confiar. Começa com um carrossel de banners promocionais.
2. **A arquitetura segue a organização interna, não a necessidade do visitante.** São 9 itens no menu e dezenas de subitens. "Pesquisa", "Serviços", "Laboratórios" e "Informações Técnicas" se sobrepõem.
3. **O visual é inconsistente e datado.** São 8+ tons de verde diferentes, três famílias tipográficas, títulos cinza-claro em caixa alta, selos verde-claro em toda seção e cara de template de 2016.
4. **Há conteúdo em imagem.** Serviços e eventos aparecem como flyers JPG/PNG, com texto ilegível no mobile e invisível para o Google e para leitores de tela.
5. **Há erros técnicos visíveis:** 13 páginas com erro 500, imagens quebradas na home, HTML escapado aparecendo como texto (`<p><br></p>`), datas falsas ("21 nov, 2026" em todos os serviços) e página "Power BI — Em breve" publicada.
6. **A home é pesada:** ~8,9 MB, 47 requisições, `load` em ~7,3 s, com imagens PNG de até 1,3 MB e um JPEG de 2,8 MB.

---

## 2. Qualidade e consistência visual

| # | Problema | Evidência | Sev. | Correção no redesign |
|---|---|---|---|---|
| V1 | **Paleta sem sistema**: 8+ verdes diferentes usados ao acaso. `#93A72C` (theme-color), `#70A743` (botões do topo), `#ACC671` (busca), `#3C7B47` (rodapé), `#5B8C51` (voltar ao topo/Enviar), `#28A745` (verde padrão do Bootstrap em "Entrar/Cadastrar/WhatsApp"), `#3F9C45`, `#005936` (cookies/skip-link). Fundos verde-pastel `#E8F0DF`. | Medido via `getComputedStyle` na home | 🔴 | Definir tokens: 1 verde primário de marca, 1 verde escuro institucional, 1 acento (amarelo-limão do logo) e neutros. Nunca usar cores padrão de framework. |
| V2 | **Títulos de seção como "pílulas" verde-claro com texto branco** ("NOTÍCIAS", "ÁREAS DE PESQUISA", "MISSÃO"…). Baixo contraste (branco sobre `#ACC671` ≈ 1,9:1) e repetitivo. | `02_desktop_home_noticias-areas.jpg`, `13_desktop_sobre_missao-visao.jpg` | 🔴 | Usar hierarquia tipográfica real (H2 grande, escuro, com sobretítulo/eyebrow pequeno), sem caixas. |
| V3 | **Títulos de página (H1) em cinza-claro, caixa alta e centralizados** ("INSTITUCIONAL", "ENTOMOLOGIA"), com cara de placeholder. | `12_…`, `15_…` | 🟠 | H1 escuro, alinhado à esquerda, com subtítulo explicativo e breadcrumb discreto. |
| V4 | **Tipografia misturada**: Barlow (corpo), Roboto, Inter, Amatic SC (carregada do Google Fonts) e fontes de sistema nos formulários (Helvetica/Arial em "POR FAVOR ENTRE EM CONTATO"). | `fonts` via JS; `28_desktop_fale-conosco.jpg` | 🟠 | No máximo 2 famílias: uma display/títulos e uma de texto. Ver estratégia. |
| V5 | **Texto justificado** em parágrafos longos, gerando "rios" brancos, sobretudo no mobile. | `30_mobile_entomologia_texto-justificado.jpg` | 🟠 | Alinhar à esquerda; largura de linha de 60–75 caracteres. |
| V6 | **Estilos de parágrafo diferentes na mesma página** (um preto, outro cinza-claro, tamanhos diferentes). | `15_desktop_area-pesquisa_entomologia.jpg` | 🟡 | Um estilo de corpo único (`p`), com variação só por intenção (lead, legenda). |
| V7 | **Ícones de cultura sem rótulo** no cabeçalho (milho, algodão, soja, boi) que não levam a lugar claro. | `01_desktop_home_topo.jpg` | 🟡 | Remover, ou transformar em navegação por cultura com rótulo. |
| V8 | **Ilustrações com bordas "rasgadas"** (papel) atrás do menu, um estilo artesanal que conflita com o posicionamento científico. | `01_…` | 🟡 | Linguagem visual limpa, com texturas sutis de campo/dados se for preciso. |

## 3. Hierarquia, organização e conteúdo da home

| # | Problema | Sev. | Correção |
|---|---|---|---|
| H1 | Não existe **hero com proposta de valor**. O primeiro bloco é um carrossel de banners (evento de milho, venda do Boletim) com o texto embutido na imagem. | 🔴 | Hero com título claro ("Pesquisa agronômica independente para quem produz em Mato Grosso"), subtítulo, 2 CTAs (Conheça os serviços / Próximos eventos) e uma foto real de campo experimental. |
| H2 | O H1 ("Fundação MT — pesquisa e tecnologia para o agronegócio") vem **abaixo do carrossel**, pequeno e sem destaque. | 🟠 | O H1 vira o título do hero. |
| H3 | **Notícias e Áreas de Pesquisa lado a lado**, competindo. As notícias ficam numa caixa estreita com paginação "Próxima »" dentro da home. | 🟠 | Blocos em sequência; notícias como 3 cards com link "Ver todas". |
| H4 | **Áreas de Pesquisa em círculos** com fotos de banco (gráficos genéricos, mão com caneta), alguns com nomes longos que quebram mal ("Liderança de Pesquisa, Serviços e Operações"). | 🟠 | Grade de cards com ícone e descrição de 1 linha; tirar "Liderança…" da lista de áreas (é uma unidade de gestão). |
| H5 | Faltam números de prova (anos, pesquisadores, CADs, ensaios, público de eventos), parceiros, depoimentos, "quem somos" resumido e a missão de imparcialidade. | 🔴 | Faixa de números, seção "Por que a Fundação MT" (imparcialidade, rede de CADs, 30+ anos) e logos de parceiros/patrocinadores. |
| H6 | O **app** é promovido num carrossel com fundo branco e imagens soltas, sem explicar o que ele faz. | 🟡 | Seção dedicada: benefício, mockup e botões oficiais de App Store/Google Play. |
| H7 | Banner "Tenha conhecimento técnico… Clique aqui para se cadastrar!" em imagem, com CTA vago. | 🟡 | CTA de cadastro com o benefício explícito (acesso a resultados técnicos) em HTML. |

## 4. Navegação

| # | Problema | Sev. | Correção |
|---|---|---|---|
| N1 | **9 itens de menu**, vários com 6–11 subitens. "Pesquisa", "Informações Técnicas", "Serviços" e "Laboratórios" repetem os mesmos nomes de área (Entomologia aparece 4 vezes). | 🔴 | 5–6 itens orientados ao visitante: Pesquisa · Serviços · Eventos · Conteúdo técnico · Institucional · Contato. |
| N2 | **"Informações Técnicas"**: os 11 subitens não têm link e só abrem o modal de login. O visitante descobre que é restrito apenas depois de clicar. | 🔴 | Mostrar um cadeado e uma descrição ("Área do produtor — requer cadastro gratuito"); landing page explicando o que há dentro. |
| N3 | **Dropdowns se sobrepõem** ao passar o mouse de um item para outro (transição lenta, dois menus visíveis ao mesmo tempo). | 🟠 | Menu com atraso de fechamento correto ou mega-menu único. |
| N4 | Na **barra superior** há 4 grupos competindo: Área do Usuário, Trabalhe Conosco, redes sociais, ícones de cultura, busca e o botão flutuante "Tem alguma dúvida?". | 🟠 | Utilitários discretos (login, busca) e um único CTA principal. |
| N5 | Os **links "Eventos" e "Links Úteis"** levam a páginas pouco úteis: Eventos mistura próximos e passados, e Links Úteis tem pouco conteúdo. | 🟡 | Separar "Próximos eventos" e "Edições anteriores"; eliminar "Links Úteis" ou levá-lo para o rodapé. |
| N6 | **Breadcrumb inconsistente**: em serviços aparece "Início › Consultoria Agronômica › Serviços" (ordem invertida). | 🟡 | Breadcrumb gerado da hierarquia real. |
| N7 | Busca existe, mas sem sugestões; o resultado não foi avaliado em profundidade. | 🟡 | Busca com filtros (notícias, serviços, eventos). |

## 5. Legibilidade, contraste e acessibilidade

| # | Problema | Sev. | Correção |
|---|---|---|---|
| A1 | Texto cinza `#878986` predominante (733 elementos) sobre branco: contraste ≈ 3,6:1, **abaixo do AA (4,5:1)** para texto normal. | 🔴 | Texto de corpo ≥ `#4A4A4A` ou verde-escuro de marca. |
| A2 | Selos brancos sobre verde-claro (≈1,9:1); menu mobile cinza-claro sobre cinza (`24_mobile_menu-aberto.jpg`). | 🔴 | Testar todas as combinações com o validador WCAG. |
| A3 | **Texto dentro de imagens** (banners, flyers de serviço, cards de evento): inacessível e não indexável. | 🔴 | Todo texto em HTML; imagens só como apoio. |
| A4 | Foco de teclado pouco visível; o skip-link existe (ponto positivo). | 🟡 | Estados `:focus-visible` claros. |
| A5 | O `alt` existe em todas as imagens, mas costuma ser **sem significado ou errado**: "card-image1-f03b22a8-…" (UUID) nos banners, "thumb image" nas notícias e "imagem do pesquisador da área" nas fotos dos **presidentes do Conselho Curador**. | 🟠 | `alt` descritivo, escrito por pessoa e validado no CMS. |

## 6. Fotografia e imagens

| # | Problema | Sev. | Correção |
|---|---|---|---|
| F1 | Há **boas fotos originais** (vistas aéreas dos CADs, eventos, pesquisadores com camisa da Fundação, insetos e doenças), mas convivem com **fotos de banco genéricas** (Data Science, Liderança). | 🟠 | Priorizar fotos reais; fazer sessão nova de pesquisadores, laboratórios e campo. |
| F2 | **Imagens quebradas/vazias na home**: CAD Norte, CAD Sul e Centro de Pesquisa aparecem sem foto. 19 `<img>` com `src` vazio (lazy-load sem fallback). | 🔴 | Lazy-load nativo (`loading="lazy"`), `src` sempre válido e placeholder. |
| F3 | **Retratos com fundos diferentes** (estúdio cinza nos conselheiros, fundo verde nos pesquisadores). | 🟡 | Padronizar recorte e tratamento. |
| F4 | **Peso excessivo**: PNGs de 700 KB–1,3 MB e JPEG de 2,8 MB na home. | 🔴 | WebP/AVIF, `srcset` responsivo, máximo de ~200 KB por imagem de destaque. |

## 7. CTAs e conversão

| # | Problema | Sev. | Correção |
|---|---|---|---|
| C1 | **Nenhum CTA principal claro**. Há "Saiba mais", "Leia mais", "Quero mais informações", "Clique aqui", "Tem alguma dúvida?" e "Seja um patrocinador", todos com o mesmo peso. | 🔴 | Definir 3 conversões: **solicitar serviço/orçamento**, **inscrever-se em evento** e **cadastrar-se na área técnica**. Cada uma com CTA próprio e consistente. |
| C2 | **Serviços sem preço, prazo, processo ou formulário**. Muitos terminam em "Entre em contato para verificar disponibilidade". | 🔴 | Página de serviço com o que inclui, para quem é, como funciona (passos), entregáveis e formulário de orçamento pré-preenchido com o serviço. |
| C3 | O formulário de contato é **genérico** (nome, e-mail, telefone, cidade, mensagem), **sem assunto/área de interesse**, então todas as demandas caem na mesma caixa. | 🟠 | Formulário com "assunto" (serviço, evento, imprensa, parceria, infraestrutura) para rotear à equipe certa. |
| C4 | WhatsApp duplicado (botão flutuante + botão "Tem alguma dúvida?" no topo) e **botões flutuantes que cobrem conteúdo** no mobile, incluindo o botão "Próxima". | 🟠 | Um botão flutuante, com posição que não colida com a paginação. |
| C5 | A **loja** (Boletim de Pesquisa, kits, ingressos) existe, mas fica escondida e é anunciada só por banner. | 🟠 | Seção "Publicações" com produto, preço e botão de compra. |

## 8. Credibilidade

- **Positivos**: Missão/Visão/Propósito claros; Conselho Curador com fotos; pesquisadores com mini-currículo (formação, UFLA, UFERSA etc.); Portal de Transparência com políticas recentes (agosto/2026); CNPJ no rodapé.
- **Negativos**: erros 500; página "Em breve" (Power BI); datas falsas na listagem de serviços; HTML escapado visível; última notícia de **27/07/2026** (quase 4 meses sem atualização na data da análise); sem números de impacto, parceiros visíveis (só em banners) ou depoimentos.
- **Recomendação**: no redesign, credibilidade = **dados + pessoas + instituições**. Números verificados, pesquisadores com foto e Lattes, parceiros/patrocinadores, selo de ICT e eventos com público real.

## 9. Responsividade (mobile 375 px)

| # | Problema | Evidência | Sev. |
|---|---|---|---|
| R1 | O **cabeçalho ocupa ~410 px** (logo grande + faixa com hambúrguer) antes de qualquer conteúdo. | `20_mobile_home_topo.jpg` | 🔴 |
| R2 | **Banners desktop reduzidos** no mobile: preços e datas ficam ilegíveis. | `23_mobile_banner-texto-ilegivel.jpg` | 🔴 |
| R3 | **Flyers de serviço** (consultoria) ilegíveis. | `32_mobile_consultoria_flyer-ilegivel.jpg` | 🔴 |
| R4 | **H1 sem margem lateral**, colado na borda esquerda. | `31_mobile_consultoria_titulo-sem-margem.jpg` | 🟠 |
| R5 | Grade de áreas de pesquisa com círculos enormes: a página tem **6.067 px** de altura no mobile. | `22_mobile_home_areas-pesquisa.jpg` | 🟠 |
| R6 | Botões flutuantes (WhatsApp + voltar ao topo) sobrepõem texto e botões. | `21_mobile_home_noticias-botao-sobreposto.jpg` | 🟠 |
| R7 | Elementos do carrossel (`owl-stage`) passam da largura da tela; não geram scroll horizontal visível, mas indicam layout frágil. | JS | 🟡 |
| R8 | O menu mobile funciona (gaveta lateral), mas tem baixo contraste e submenus em acordeão sem hierarquia visual. | `24_mobile_menu-aberto.jpg` | 🟡 |

## 10. Técnica, SEO e desempenho

| Item | Situação | Sev. |
|---|---|---|
| Stack | Laravel (CSRF token), jQuery, Owl Carousel, Bootstrap 4, lazysizes, template "front-theme". | — |
| Peso da home | ~8,9 MB / 47 requisições / DOMContentLoaded 1,2 s / load 7,3 s (medido no navegador embutido, sem throttling). | 🔴 |
| **HTML gigante com imagens em base64** | 37 páginas embutem imagens como `data:image/…;base64` direto no HTML. Exemplos: `/eventos/6o-encontro-tecnico-de-milho-aac9` = **33 MB de HTML**, `/eventos/fundacao-mt-em-campo-2a-safra-2025-5ac2` = 23 MB, notícia do 4º ET Pecuária = 22 MB, `/eventos/17o-encontro-tecnico-de-algodao-20ef` = 21 MB. Isso inviabiliza o acesso por 3G/4G no campo. | 🔴 |
| Erros 500 | 13 páginas de categoria de palestras (`/palestra-e-treinamento/categoria/*`) que **estão no sitemap**. | 🔴 |
| Erros 404 no sitemap e na home | 5 notícias do sitemap retornam 404; o link da home para `/area-de-pesquisa/gestao-de-pesquisa` também dá 404. | 🟠 |
| Conteúdo de teste publicado | `/area-de-pesquisa/agricultura-digital` mostra "Encontro Técnico TESTE t.I"; `/area-de-pesquisa/validacao-de-resultados`, `/educacional` e `/marketing` estão vazias e indexadas. | 🟠 |
| HTML do Word vazando | Na página **Venda de Insetos**, os resumos mostram código cru (`<p class="MsoNormal" style="margin-bottom: 0cm; line-height: 150%;"><i>Anticarsia…`). | 🔴 |
| Contatos vazios | Vários cards de equipe mostram telefone "() -". | 🟡 |
| Dados de evento inconsistentes | O JSON-LD do 18º ET Algodão indica o local como a sede em Rondonópolis, mas a notícia diz Hotel Gran Odara, em Cuiabá. | 🟡 |
| Coordenada inválida | O mapa do Centro de Pesquisa usa `@162702.32,543959.73` (fora de qualquer faixa válida de latitude/longitude). | 🟡 |
| Erros de digitação visíveis | "Psquisadora" (Mecanização), "Fitopalogia" (página do app), títulos duplicados com sufixo " 1" ("Aplicação de produtos… 1"). | 🟡 |
| Conteúdo desatualizado | O Relatório de Atividades tem data de 14/07/2021 e manda ler o "Relatório 2022"; o Boletim mais recente à venda é o 22/23. | 🟠 |
| Páginas vazias/“em breve” | `/power-bi` ("Em breve"), várias categorias de palestra só com "Quero mais informações", páginas de evento só com a data. | 🟠 |
| Datas dinâmicas falsas | `/servicos` mostra "21 nov, 2026" (data de hoje) em todos os itens. | 🟠 |
| HTML escapado | `<p><br></p>` aparece como texto na listagem de serviços. | 🟠 |
| Duplicação | Itens duplicados na listagem `/servicos`; slugs com sufixo `-1`; muitos URLs `area-de-pesquisa/servico/*` (89) com conteúdo curto. | 🟠 |
| Meta tags | Título e descrição presentes em todas as páginas (positivo); OG/Twitter configurados; descrições genéricas em eventos ("Evento da Fundação MT — pesquisa e difusão…"). | 🟡 |
| Headings | Apenas 1 H1 na home (bom); H2 usados como rótulos visuais e dentro de modais (termos LGPD duplicados no DOM). | 🟡 |
| robots/sitemap | `robots.txt` e `sitemap.xml` presentes (436 URLs). O sitemap inclui páginas com erro. | 🟡 |
| Dados estruturados | **Positivo**: JSON-LD presente em ~385 páginas: `Organization` (com endereço, telefone e `sameAs`), `WebSite`, `WebPage`, `BreadcrumbList`, `NewsArticle` (131), `Service` (164), `Event` (49) com `Offer`/`Place`, `AboutPage` e `ContactPage`. **Manter e melhorar no redesign** (ex.: `Event` com datas reais e `ResearchOrganization`). | 🟡 |
| Consentimento de cookies | Banner LGPD bem feito, com opção "Recusar não essenciais" (positivo). Rastreadores declarados: Google Analytics, Google Ads, Meta, RD Station. | — |

## 11. Experiência geral — nota qualitativa

| Critério | Nota (0–5) | Comentário |
|---|---|---|
| Consistência visual | 1,5 | Paleta e tipografia sem sistema |
| Hierarquia | 1,5 | Sem hero, títulos fracos |
| Navegação | 2 | Completa, mas redundante e confusa |
| Legibilidade/contraste | 2 | Cinza-claro predominante |
| Fotografia | 3 | Bom acervo original, mal aproveitado |
| Mobile | 1,5 | Cabeçalho gigante, flyers ilegíveis |
| CTAs/conversão | 1 | Nenhum funil claro |
| Credibilidade | 2,5 | Bom conteúdo institucional, erros visíveis |
| Desempenho | 1,5 | 8,9 MB na home |
| **Média** | **≈1,8** | Base de conteúdo boa; precisa de redesign completo |
