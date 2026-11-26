# 02 — Mapeamento do site atual (fundacaomt.com.br)

> Coleta em 21/11/2026. Método: navegação visual no navegador embutido (desktop 1440 px e mobile 375 px) + download do HTML de **todas as 436 URLs do `sitemap.xml`** + 5 URLs linkadas fora do sitemap. O texto foi extraído de `<main>`.
> Lista completa, URL por URL: [`inventario/paginas.md`](inventario/paginas.md).

## 1. Números gerais

| Métrica | Valor |
|---|---|
| URLs no sitemap | 436 |
| URLs extras encontradas por links internos | 5 (`/links-uteis`, `/servicos-por-area/aplicativo`, `/palestra-e-treinamento/categoria/palestras`, `/protecao-de-dados/lei-geral-de-protecao-de-dados-pessoais`, `/area-de-pesquisa/gestao-de-pesquisa`) |
| **Total verificado** | **441** |
| Respondem 200 com conteúdo | 422 |
| Erro 500 | 13 (todas em `/palestra-e-treinamento/categoria/*`) |
| Erro 404 | 6 (5 notícias do sitemap + `/area-de-pesquisa/gestao-de-pesquisa`, linkada na home) |
| Páginas restritas (login) | "Informações Técnicas" (11 áreas); `robots.txt` bloqueia `/informacoes-tecnicas`, `/perfil`, `/carrinho`, `/pedidos` etc. |
| Plataforma | Laravel (PHP) + Bootstrap 4 + jQuery + Owl Carousel; CMS próprio ("painel administrativo" citado no Portal de Transparência) |

### URLs por seção

| Seção | Qtde | O que é |
|---|---|---|
| `/noticias/*` | 136 | Notícias/artigos técnicos (135 + índice). Datas de 2021 a 27/07/2026 |
| `/area-de-pesquisa/*` | 110 | 10 áreas + 5 páginas órfãs/vazias + 89 subpáginas `area-de-pesquisa/servico/*` (temas de palestra/pesquisa/treinamento) |
| `/eventos/*` | 50 | 49 eventos + índice |
| `/servicos/*` | 47 | Itens de serviço/produto (etapas da amostragem, espécies de insetos, kits, boletins, downloads do app) + índice |
| `/laboratorio/*` | 32 | 3 laboratórios + 29 subpáginas de serviço de laboratório |
| `/palestra-e-treinamento/categoria/*` | 26 | Categorias de vídeo/conteúdo; **13 com erro 500**, várias vazias |
| `/servicos-por-area/*` | 17 | Páginas de serviço por área (consultoria, amostragem, boletim, insetos, tutoria…) |
| `/transparencia/*` | 7 | Portal de Transparência (políticas) |
| `/area-experimental/*` | 6 | Sede + 5 CADs |
| Institucionais avulsas | 8 | `/`, `/sobre-nos`, `/fale-conosco`, `/eventos-anteriores`, `/comite-gestor`, `/relatorio-de-atividades/…`, `/power-bi`, `/links-uteis` |

## 2. Estrutura de navegação

### 2.1 Cabeçalho (desktop) — `screenshots/01_desktop_home_topo.jpg`

- **Linha 1**: logo à esquerda · botões "Área do Usuário" (abre o modal de login/cadastro) e "Trabalhe Conosco" (portal TOTVS externo) · 4 ícones sociais (Facebook, Instagram, LinkedIn, YouTube) · 4 ícones de culturas sem rótulo (milho, algodão, soja, boi) · campo "Pesquisar" · botão fixo "Tem alguma dúvida? Entre em contato." (WhatsApp).
- **Linha 2 (menu principal)**, 9 itens:

```
Início
Institucional ▾        → Sobre · Portal de Transparência · Relatório de Atividades · Comitê Gestor de Inovação
Áreas Experimentais ▾  → Centro de Pesquisa Dario Minoru Hiromoto · CAD Médio Norte · CAD Norte · CAD Oeste · CAD Primavera · CAD Sul
Pesquisa ▾             → Data Science · Entomologia · Fitopatologia · Fitotecnia · Liderança de Pesquisa, Serviços e Operações ·
                         Matologia · Mecanização Agrícola · Nematologia · Pecuária · Solos, Nutrição e Sistemas de Produção
Informações Técnicas ▾ → (todos abrem o modal de login) Boletim de Pesquisa · Data Science · Entomologia · Eventos · Fitopatologia ·
                         Fitotecnia · Matologia · Mecanização Agrícola · Nematologia · Solos, Nutrição e Sistemas de Produção ·
                         Tecnologia de Aplicação e Variabilidade Espacial
Serviços ▾             → Amostragem de Solo e Diagnóstico Completo · Boletim de Pesquisa · Consultoria Agronômica ·
                         Tecnologia de Aplicação e Variabilidade Espacial · Tutoria Nematológica · Venda de Insetos
Laboratórios ▾         → Laboratório de Fitopatologia · Laboratório de Nematologia · Laboratório de Entomologia
Eventos ▾              → (página de eventos) · Eventos anteriores
Links Úteis
```

### 2.2 Cabeçalho mobile — `screenshots/20_mobile_home_topo.jpg`, `24_mobile_menu-aberto.jpg`
Logo grande centralizado + faixa verde-clara com hambúrguer. Gaveta lateral com os mesmos 9 itens em acordeão, mais e-mail e telefone. Botões utilitários, redes e busca ficam ocultos no mobile.

### 2.3 Rodapé — `screenshots/08_desktop_home_rodape.jpg`
- Card verde: "Faça seu cadastro e fique por dentro dos acontecimentos, eventos e notícias" + botão **Cadastrar-se** · "Siga nossas redes sociais" (4 ícones).
- **Endereço**: Av. Antônio Teixeira dos Santos, 1559 – Parque Res. Universitário, Rondonópolis – MT, 78750-360 · contato@fundacaomt.com.br · (66) 3439-4100 · WhatsApp (66) 99647-9027 · Trabalhe conosco · Fale Conosco.
- **Portais internos**: Portal do Colaborador (apps.fundacaomt.app.br) · Suporte (atendimento.fundacaomt.com.br, GLPI) · Registros e Melhorias.
- Linha legal: "Fundação de Apoio à Pesquisa Agropecuária de Mato Grosso – 70.499.462/0001-80 · © 2026 Fundação MT — Todos os direitos reservados."

### 2.4 Elementos globais
- **Banner de cookies LGPD** com Aceitar todos / Recusar não essenciais / Preferências (cita GA, Google Ads, Meta, RD Station).
- **Botão flutuante de WhatsApp** (canto inferior esquerdo) + **voltar ao topo** (direito).
- **Modal "Bem-vindo(a)!"**: abas "Já tenho acesso" (e-mail/CPF/documento + senha) e "Ainda não tenho acesso, iniciar cadastro" (e-mail, senha, nacionalidade, CPF, tipo e número de documento, nome, data de nascimento, ocupação) + termo LGPD embutido.
- **Modal "acesso Premium"** com botão "Falar no WhatsApp".
- **Skip-link** "Ir para o conteúdo".

## 3. Páginas, uma a uma (conteúdo e funcionalidade)

### 3.1 Home `/` — capturas 01–08, 20–23
Ordem das seções:
1. **Carrossel de banners** (imagem com texto embutido): VII Encontro Técnico de Milho (03/12, Hotel Gran Odara, Cuiabá, patrocinadores BASF/TMG/Bayer/Abramilho/FS), Boletim de Pesquisa (preços), Laboratório/Centro de Pesquisa (venda de insetos, kits de identificação, placas resinadas) e outros.
2. **H1**: "Fundação MT — pesquisa e tecnologia para o agronegócio".
3. **Notícias** (4 últimas, com paginação "Próxima »") ao lado de **Áreas de Pesquisa** (10 círculos com foto).
4. **Áreas Experimentais** (6 cards com foto aérea; 3 sem imagem).
5. **Banner** "Tenha conhecimento técnico… Clique aqui para se cadastrar!" (imagem).
6. **Carrossel do App Fundação MT**.
7. Rodapé.

### 3.2 Institucional
| Página | URL | Conteúdo principal |
|---|---|---|
| Sobre | `/sobre-nos` | História (1993, 23 produtores, 30 anos), Missão, Visão, Propósito, Nosso Jeito (5 valores), Conselho Curador (6 presidentes com foto e período), Diretor-presidente |
| Portal de Transparência | `/transparencia` (+ `/privacidade`, `/infraestrutura`, `/cancelamentos-e-reembolsos`, `/envio-e-frete`, `/cookies`, `/lgpd`) | "Central de governança" com abas; documentos com versão publicada em 28/08/2026 e atualização de 12–13/08/2026 |
| Relatório de Atividades | `/relatorio-de-atividades/relatorio-de-atividades-d5eb` | Texto de 14/07/2021 (eventos digitais, estúdio, laboratórios centralizados, 6 CADs) + link "Relatório de Atividade 2022" |
| Comitê Gestor de Inovação | `/comite-gestor` | Atribuições, dinâmica, infraestrutura, quem pode solicitar, critérios, horário (seg.–sex., 8h–18h), termos (NDA, contrato), lista de CADs com fotos, formulário de agendamento (`/comite-gestor/solicitar-agendamento`, bloqueado no robots) |
| Proteção de dados | `/protecao-de-dados/lei-geral-de-protecao-de-dados-pessoais` | Cartilha LGPD |
| Power BI | `/power-bi` | **"Em breve — Nenhum dashboard disponível"** |

### 3.3 Áreas Experimentais (`/area-experimental/*`) — captura 17
Estrutura de cada página: título + "Centro de Aprendizado e Difusão" · carrossel de fotos aéreas (selo "Parceria AMAGGI" no CAD Oeste) · data de criação · objetivo dos trabalhos · culturas e áreas · coordenador (nome, e-mail, celular) · horário de visita · **widget de clima WeatherLink** · notícias relacionadas · mapa Google ("Como chegar") · compartilhar no WhatsApp.

| Unidade | Criação | Foco | Coordenador | Coordenadas do mapa |
|---|---|---|---|---|
| Centro de Pesquisa Dario Minoru Hiromoto (sede, Rondonópolis) | — | Laboratórios, gestão | Recepção | inválidas no HTML |
| CAD Médio Norte | 2013 | Fitotecnia, Fitopatologia, Biológicos, Matologia, Mecanização; soja, milho, algodão, cobertura | não informado | -13,68 / -56,03 |
| CAD Norte | 2019 | Solos e Sistemas, Fitopatologia, Entomologia, Matologia, Fitotecnia, Mecanização; ensaios de longa duração (2020) | Kênia Viscovini | -12,44 / -55,89 |
| CAD Oeste | 2015 (local desde 2009) | Algodão 2ª safra + soja; adubação, fertilidade, Fitotecnia, Entomologia, Fitopatologia, Matologia, Nematologia | André Vacari | -13,55 / -58,82 |
| CAD Primavera | 2015 (texto cita CAD em 2018) | Matologia, Fitopatologia e Biológicos, Entomologia, Fitotecnia, Solos | Lucas Queiroz | -15,23 / -54,14 |
| CAD Sul | 2008 | 3 áreas experimentais; Solos e Sistemas (longa duração), Entomologia, Fitotecnia, Matologia | Mickael Silva | -17,16 / -54,76 |

### 3.4 Pesquisa (`/area-de-pesquisa/<area>`) — capturas 15–16, 30
Estrutura: título · 1–2 parágrafos de descrição · cards de pesquisadores (foto, nome, cargo, minicurrículo) · "**Contrate com a Fundação MT**" com carrosséis por tipo (Palestras · Pesquisa a campo e em casa de vegetação · Serviços · Treinamentos/Cursos · Interação em propriedades), cada item levando a `/area-de-pesquisa/servico/<slug>` (89 páginas curtas) · botão Fale Conosco.
Áreas: Data Science, Entomologia, Fitopatologia, Fitotecnia, Liderança de Pesquisa/Serviços/Operações, Matologia, Mecanização Agrícola, Nematologia, Pecuária, Solos/Nutrição/Sistemas, Tecnologia de Aplicação e Variabilidade Espacial.
Páginas órfãs: `agricultura-digital` (conteúdo "TESTE"), `validacao-de-resultados`, `educacional`, `marketing` (vazias), `eventos`, `consultoria-agronomica`, `amostragem-de-solo-…`, `boletim-de-pesquisa`, `tutoria-nematologica`, `venda-de-insetos` (duplicam `/servicos-por-area/*`).
O conteúdo detalhado de cada área está em `01_EMPRESA.md §7` e `04_CONTEUDOS_E_ASSETS.md`.

### 3.5 Serviços (`/servicos-por-area/*` e `/servicos/*`) — capturas 18, 31, 32
- **Consultoria Agronômica**: flyer em imagem ("Consultoria Agronômica de Alto Impacto… mais de 30 anos de experiência") + carrossel de 7 itens + card do consultor.
- **Amostragem de Solo e Diagnóstico Completo**: 7 etapas numeradas (cada uma é uma página em `/servicos/`).
- **Boletim de Pesquisa**: texto editorial longo da 20ª edição + produtos (Boletim 22/23, Super Combo, Boletim 19/20) → carrinho/checkout.
- **Tecnologia de Aplicação e Variabilidade Espacial**, **Tutoria Nematológica**, **Venda de Insetos** (9 lagartas, 3 hemípteros, insetos resinados, fenologia do algodão, kits de identificação; resumos com HTML do Word vazando).
- `/servicos` (índice): lista de todos os itens com **data falsa** (hoje) e duplicados.
- Também existem páginas `/servicos-por-area/<area>` (entomologia, fitopatologia etc.) com a equipe e os contatos de cada área.

### 3.6 Laboratórios (`/laboratorio/*`) — captura 19
Três páginas (Entomologia, Fitopatologia, Nematologia) com descrição, lista de serviços, **link PNIPE/MCTI**, pesquisador responsável e galeria de etapas (ex.: Nematologia: 1 recebimento/extração → 2 identificação → 3 casa de vegetação → 4 teste de raça NCS). 29 subpáginas de detalhe.

### 3.7 Eventos — captura 26
- `/eventos`: "Programa de Difusão de Tecnologia (eventos)". Lista **mistura futuros e passados** (6 páginas), com títulos grandes e data. Botões "Saiba mais" e "Seja um patrocinador".
- `/eventos-anteriores`: praticamente a mesma lista.
- Página de evento: título + data e, em geral, **só imagens** (algumas em base64, gigantes); compra de ingresso por lotes (preços no JSON-LD).
- 49 eventos de 2020 a 2026: ver [`inventario/eventos.md`](inventario/eventos.md).

### 3.8 Notícias — captura 25
- `/noticias`: lista paginada (12 por página, 8+ páginas) com data e título.
- Página de notícia: breadcrumb, categoria, H1 em caixa alta, data, tags, compartilhar (Facebook, LinkedIn, Twitter, WhatsApp), texto.
- 135 notícias: 2021 (28), 2022 (40), 2023 (18), 2024 (18), 2025 (22), **2026 (4)**; última em 27/07/2026. Lista: [`inventario/noticias.md`](inventario/noticias.md).

### 3.9 Palestras e treinamentos (`/palestra-e-treinamento/categoria/*`)
26 categorias: Apresentações, Artigos, Cursos, Empresas, Encontro Técnico (soja, milho, algodão, pecuária), Escola de Herbicidas, FMT Play, Fundação MT em Campo, Lives, Laudos, Relatórios, Resultados, Seminário Agricultura do Futuro, É Hora de Plantar/Cuidar, Circuito do Conhecimento, Digital Tech, Independentes, Pecuária de Corte, Palestras. **13 dão erro 500**; as demais mostram só "Quero mais informações". 💭 Provavelmente o conteúdo exige login.

### 3.10 Links Úteis `/links-uteis`
Cards: fotos (Cotton Day Sapezal 2026, 18º ET Algodão 2026, 26º ET Soja), Cartilha Nematológica, Informativo Técnico (Vitrine de Cultivares de Algodão 24-25), Atendimento, Trabalhe Conosco, Boletim 22/23, Boletim 19/20 (digital), Contrate nossos Serviços e Treinamentos.

### 3.11 Fale Conosco `/fale-conosco` — captura 28
Formulário (campos `name`, `email`, `phone`, `city`, `message`, checkbox de política de privacidade, **Enviar**; sem campo de assunto/área) + card "Centro de Pesquisa Dario Minoru Hiromoto" com endereço, e-mail e telefone. **Não enviamos o formulário.**

## 4. Formulários e conversões existentes

| Formulário/CTA | Onde | Campos/Destino |
|---|---|---|
| Contato | `/fale-conosco` | nome, e-mail, telefone, cidade, mensagem, aceite LGPD |
| Login/Cadastro | modal global | ver §2.4 |
| Compra (Boletim, ingressos) | páginas de produto/evento → `/carrinho` | checkout próprio |
| Solicitação de infraestrutura | `/comite-gestor/solicitar-agendamento` | nome, e-mail, vínculo, objetivo, descrição, experimentos, nº de participantes, finalidade, local (segundo o termo) |
| WhatsApp | flutuante, topo e rodapé | api.whatsapp.com/send?phone=5566996479027 |
| Trabalhe Conosco | topo e rodapé | portal TOTVS externo |
| Busca | topo (desktop) | — |
| Patrocínio | `/eventos` "Seja um patrocinador" | — |

## 5. Links externos

Facebook, Instagram, LinkedIn, YouTube · TOTVS (vagas) · apps.fundacaomt.app.br (Portal do Colaborador, Ocorrências) · atendimento.fundacaomt.com.br (GLPI) · pnipe.mcti.gov.br (laboratórios) · weatherlink.com (estações) · Google Maps · lojas de apps (App Store / Google Play via `fundacaomt.com.br/app`).

## 6. SEO técnico existente (a preservar na migração)

- `<title>` padrão "Página | Fundação MT"; `meta description` em todas as páginas; OG/Twitter Cards; `theme-color #93a72c`.
- JSON-LD em ~385 páginas (Organization, WebSite, WebPage, BreadcrumbList, NewsArticle, Service, Event+Offer, AboutPage, ContactPage).
- `sitemap.xml` e `robots.txt`. GTM `GTM-M4SGK6BN`.
- ⚠️ **A migração precisa de um mapa de redirecionamentos 301** dos 422 URLs válidos (principalmente as 135 notícias, as áreas e os CADs) para não perder o ranqueamento.
