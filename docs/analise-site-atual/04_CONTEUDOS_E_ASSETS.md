# 04 — Inventário de conteúdos e assets

> Coleta em 21/11/2026. Base: `https://www.fundacaomt.com.br` (abreviado como `/` nos caminhos).
> Inventários completos gerados automaticamente:
> - [`inventario/paginas.md`](inventario/paginas.md): 440 URLs com título, status e tamanho do texto
> - [`inventario/noticias.md`](inventario/noticias.md): 135 notícias com data
> - [`inventario/eventos.md`](inventario/eventos.md): 49 eventos
> - [`inventario/imagens.md`](inventario/imagens.md): 877 imagens únicas com URL, `alt` e página de origem
>
> ⚠️ **Direitos de uso**: todo texto, foto e logotipo deste inventário pertence à Fundação MT ou a terceiros (fotógrafos, patrocinadores, bancos de imagem). **Nenhum arquivo foi baixado para o projeto** além das capturas de tela de análise. Antes de reutilizar qualquer asset no novo site, é preciso **autorização formal da Fundação MT** e, para fotos de banco ou de terceiros, a licença original. Até lá, trate tudo como **referência**.

---

## 1. Identidade visual

### 1.1 Logotipo
| Arquivo | URL | Formato | Uso atual | Observação |
|---|---|---|---|---|
| Logo vertical (símbolo acima do nome) | `/images/resources/logo.webp` | WebP, 44 KB | Cabeçalho | Versão principal no site |
| Logo horizontal (nome + símbolo à direita) | `/images/resources/fundacao-logo.png` | PNG 928×204, 90 KB | Cookies, modais | Fundo branco opaco (não transparente na prática) |
| Logo JPG | `/images/resources/logo.jpg` | JPEG, 22 KB | JSON-LD `logo` | — |
| Ícone/símbolo | `/images/resources/icone.png` | PNG, 141 KB | Notícias | — |
| Logo "Premium" | `/img/logo_premium.png` | PNG, 60 KB | Modal de acesso Premium | — |
| Favicons | `/images/favicons/apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png` | PNG | — | — |
| Imagem social padrão | `/images/resources/og-default.jpg` | 1200×630 | OG/Twitter | — |
| **SVG / vetorial** | ❌ não encontrado (`/images/resources/logo.svg` dá 404) | — | — | **Pendência: pedir o logo vetorial e o manual de marca** |

**Descrição do símbolo** (marca de 2022, segundo [E2]): folhas estilizadas que formam uma figura humana com os braços abertos, inclinada para a direita (dinamismo/futuro). O nome usa tipografia sem serifa itálica/oblíqua, grossa e arredondada.

**Cores amostradas do PNG do logo** (aproximadas, quantizadas):
| Papel | Hex aprox. | Onde |
|---|---|---|
| Verde da marca (wordmark) | **#4A8B42** | "Fundação MT" e folha principal |
| Verde médio | #52A043 | Folha |
| Verde-limão | **#8DC63F** | Folha superior direita (acento) |
| Verde claro | #6ABB6A | Folha inferior |
| Verde-esmeralda | #128A44 | Sobreposição central |

**Cores usadas na interface atual** (via `getComputedStyle`): `#93A72C` (meta theme-color), `#70A743`, `#ACC671`, `#3C7B47` (rodapé), `#5B8C51`, `#28A745` (Bootstrap), `#3F9C45`, `#005936`, fundos `#E8F0DF`/`#F1F5E9`, texto `#878986`/`#5B6B61`/`#2D3748`.

**Tipografia atual**: Barlow 400–700 (Google Fonts, principal) · Amatic SC (carregada, uso decorativo) · Roboto e Inter (componentes) · fonte de sistema em formulários. 📰 A marca de 2013 usava Amelia [E1]; ❓ não se sabe a fonte oficial da marca de 2022.

### 1.2 Slogan e frases de marca
- "Dando vida aos resultados!" (LinkedIn; banners)
- "Prover informação técnica, imparcial e confiável que oriente a tomada de decisão do produtor." (Missão)
- "Fundação MT — pesquisa e tecnologia para o agronegócio" (H1 da home)
- "Instituição de pesquisa agronômica e desenvolvimento tecnológico para a agricultura." (bio do Instagram)

## 2. Textos institucionais (fonte `/sobre-nos`, salvo indicação)

| Bloco | Texto/Resumo | Reaproveitável? |
|---|---|---|
| História | 4 parágrafos: 1993, 23 homens, soja no cerrado; 30 anos; sustentabilidade econômica e socioambiental; "dar vida aos resultados" | ✅ Sim, com edição (o "30 anos" está desatualizado: em 2026 são 33) |
| Missão / Visão / Propósito | Textos literais em `01_EMPRESA.md §5` | ✅ Literal |
| Nosso jeito | 5 valores curtos | ✅ Literal, ideal para ícones |
| Conselho Curador | 6 presidentes + diretor-presidente, com período | ✅ Confirmar se ainda vale |
| Comitê Gestor de Inovação | Atribuições, critérios, fluxo de aprovação | ✅ Base da página "Infraestrutura e parcerias" |
| Relatório de Atividades | Texto de 2021 | ⚠️ Desatualizado; pedir os relatórios 2023–2025 |
| Políticas (Transparência) | 6 documentos, versão de 28/08/2026 | ✅ Migrar 1:1 (jurídico) |

## 3. Conteúdo das áreas de pesquisa (fonte `/area-de-pesquisa/<slug>`)

| Área | Descrição (resumo fiel) | Pesquisadores | Ofertas listadas |
|---|---|---|---|
| Data Science | Excelência experimental e gestão da informação; estatística, visualização, programação web/mobile, IA; criada em 2021 | Paulo Souza (supervisor), Danilo Passos | — |
| Entomologia | Manejo de pragas no sistema soja/milho/algodão; eficácia de químicos, biológicos e comportamentais | Carlos Bezerra | 10 palestras, 4 linhas de pesquisa, 4 treinamentos |
| Fitopatologia (e Biológicos) | Mais de 200 ensaios a campo por safra nos CADs; rodadas técnicas; setor de Biológicos | Meyriele Pires de Camargo, Mônica Müller, Victor Porto | 3 palestras, 3 pesquisas, 1 treinamento, Circuito do Conhecimento (inativo) |
| Fitotecnia | Escolha de materiais genéticos; vitrines de variedades; capacitação de equipes comerciais | Ciro Maia de Brito | 9 palestras, 5 pesquisas, serviços (VCU/EC/ECV, fenotipagem, vitrine), 1 treinamento |
| Matologia | Posicionamento de tecnologias contra daninhas; monitoramento de espécies resistentes em MT; seleção de herbicidas | Vicente Pontes | 2 palestras, 6 pesquisas, 2 treinamentos |
| Mecanização Agrícola (e Tecnologia de Aplicação) | Avaliação técnica e imparcial de máquinas, protótipos e tecnologias de aplicação terrestre/aérea | Márcia Menezes | avaliação em propriedades, palestra, 2 pesquisas, 6 serviços (benchmark confidencial etc.), 2 treinamentos |
| Nematologia | Caracterização de químicos e biológicos; parcerias em larga escala; treinamentos | Rosângela Silva, Tania Santos | Curso de Nematologia, palestras, 4 pesquisas, 4 treinamentos |
| Pecuária (de Corte) | Bovinos e pastagens; produtividade com conservação e bem-estar animal | Ciro Maia de Brito | 1 pesquisa, 2 treinamentos |
| Solos, Nutrição e Sistemas de Produção | Eficiência de corretivos, fertilizantes, bioestimulantes; posicionamento de novas tecnologias | Almir Salvador, Patrícia Matias | 4 palestras, 5 pesquisas, 1 treinamento |
| Tecnologia de Aplicação e Variabilidade Espacial | Protocolos para empresas de máquinas (resultados confidenciais); para o produtor, operações mecanizadas e agricultura de precisão | — | 10 interações em propriedade, 1 treinamento |
| Liderança de Pesquisa, Serviços e Operações | Gestão | Luís Carlos Oliveira, Ciro Maia de Brito, Douglas Vidal | — |

> Os textos completos estão no HTML de cada página (`inventario/paginas.md`). Para a migração: **reescrever** com base nesses textos (estão densos, com quebras de linha do Word e erros de digitação).

## 4. Serviços, produtos e laboratórios
Ver tabela completa em `01_EMPRESA.md §7`. Fontes de texto:
- `/servicos-por-area/consultoria-agronomica`: o conteúdo principal está **dentro de um flyer em imagem**; será preciso transcrever ou pedir o texto original.
- `/servicos-por-area/amostragem-de-solo-e-diagnostico-completo`: 7 etapas (texto curto, bom para um componente de "processo").
- `/servicos-por-area/boletim-de-pesquisa`: texto editorial longo (apresentação da 20ª edição) e 3 produtos.
- `/servicos-por-area/venda-de-insetos`: 12 espécies com descrição curta (com HTML do Word vazando, precisa de limpeza), resinados, kits.
- `/laboratorio/laboratorio-de-{entomologia,fitopatologia,nematologia}`: descrição, lista de serviços, links PNIPE e fluxo em etapas (Nematologia).

## 5. Contatos e localização
- Sede: Av. Antônio Teixeira dos Santos, 1559, Parque Res. Universitário, Rondonópolis – MT, 78750-360 · (66) 3439-4100 · contato@ · recepcao@ · WhatsApp (66) 99647-9027.
- Horário: seg.–sex., 07:00–11:30 e 13:00–17:20.
- CADs: coordenador, e-mail e celular publicados em cada página `/area-experimental/*` (não copiados aqui).
- Unidade em Sorriso: Rodovia BR-163, km 765 (LinkedIn).
- Mapas: iframes do Google Maps por CAD; coordenadas em `02_SITE_ATUAL.md §3.3`.

## 6. Notícias e eventos (conteúdo editorial)
- **135 notícias** (2021–2026). Temas: resultados de pesquisa e alertas técnicos (lagartas, cigarrinha, nematoides raça 4, mancha-alvo, plantas daninhas), mercado (algodão recorde, milho/biocombustível, pecuária), cobertura dos próprios eventos e institucional (ICT, nova marca). ⚠️ 5 URLs do sitemap dão 404.
- **49 eventos** (2020–2026): Encontros Técnicos (Soja XXIV–26º, Algodão XIII–18º, Milho II–VII, Pecuária I–4º), Visita Técnica Safra 2021, Fundação MT em Campo (safra e 2ª safra, 2022–2025), Cotton Day 2026, Circuito do Conhecimento (ferrugem, mancha-alvo, plantas daninhas), Escola de Herbicidas (II–V), Dia de Campo Gergelim, Curso de Nematologia, Lives (Pasto Forte, Mancha-alvo, É Hora de Plantar/Cuidar, Spodoptera etc.).
- 💭 Recomendação: migrar **todas as notícias** (SEO e acervo técnico) e manter os eventos passados como "edições anteriores" com resumo, fotos e resultados.

## 7. Fotografias e imagens

### 7.1 Visão geral
877 imagens únicas no conteúdo, distribuídas por pasta: `products` (233+78 product), `storageimages/products` (118, caminho com erro de digitação), `post` (145), `posts` (66), `speakers` (82), `research-area` (45), `researchers` (16), `banners` (12), `news` (12), `experimental-area` (8), `innovation-committee` (6), `useful-links` (5), `cads` (4), `categories` (3), `resources` (3), `imgs/inside` (7). Além disso, **37 páginas têm imagens em base64** no HTML.

### 7.2 Classificação: originais × genéricas 💭 (avaliação visual)

| Grupo | Exemplos (URL) | Parece original? | Qualidade | Uso no redesign |
|---|---|---|---|---|
| **Vistas aéreas dos CADs** | `/storage//images/cads/cad-{medionorte,oeste,primavera,sul}.JPG`; `/storage/images/innovation-committee/1772820*.JPG`; banners `/storage/images/experimental-area/banners/*.png` | ✅ Original (drone sobre parcelas experimentais; selo "Parceria AMAGGI" no CAD Oeste) | Boa/alta | ⭐ **Imagem-chave** do novo site (hero, mapa de CADs). Pedir os originais em alta resolução |
| **Pesquisadores** | `/storage/images/researchers/*.png/jpg` (16) | ✅ Original (camisa da Fundação, fundo verde) | Boa, recorte circular | Usar após padronizar; pedir ensaio novo com o mesmo tratamento |
| **Conselho Curador** | `/imgs/inside/dir_*.jpg`, `Marcelo_Vendrame.jpg`, `Romao_Viana.jpg` | ✅ Original (retratos institucionais) | Média | Usar com autorização |
| **Eventos** (palco, plateia, dias de campo) | miniaturas das notícias (ex.: 26º ET Soja, Safra 25/26 em campo) em `/storage/images/post*/` | ✅ Original | Boa | Galeria de eventos, prova social |
| **Pragas, doenças e laboratório** (lagarta, percevejo, mancha foliar, bicudo, casa de vegetação, nematoides) | `/storage/images/research-area/entomologia.jpg`, `1628521944.jpeg` (Fitopatologia), cards de "Contrate" em `/area-de-pesquisa/*`, galeria do Lab. Nematologia | ✅ Provavelmente original (macro de campo/lab) | Boa | Ilustrar áreas e serviços |
| **Lavouras** (fileiras de soja, algodão, pastagem, solo) | `fitotecnica.jpg`, `solos.jpg`, `1625493106.jpg` (Pecuária), `1627933303.png` (Matologia) | ⚠️ Misto (parte pode ser de banco) | Boa | Usar só as confirmadas como próprias |
| **Banco de imagens genérico** | `/storage/images/research-area/1625519993.jpg` (Data Science: gráficos sobrepostos), `1753187561-rOKPJ6vLML.png` (Liderança: mão com caneta diante de gráfico), banner "Tenha conhecimento técnico" (pessoas com tablet), flyer da Consultoria (agricultor) | ❌ Genérica/banco | Média | **Não reutilizar**; substituir por fotos reais da equipe de dados/gestão |
| **Banners promocionais** (texto embutido) | `/storage/images/banners/*.png` (até 1,3 MB): VII ET Milho, Boletim, Centro de Pesquisa | ✅ Peças da Fundação, com logos de patrocinadores | Baixa para web (texto em imagem) | Não reutilizar como imagem; recriar em HTML |
| **Produtos** (Boletins, kits, chaveiro, insetos resinados) | `/storage/images/products/*` | ✅ Original | Média | Loja/Publicações |
| **Palestrantes de eventos** | `/storage/images/speakers/*` (82) | ⚠️ Fotos de convidados, direito de imagem de terceiros | Variada | Só com autorização |
| **Ícones decorativos** | `/images/resources/leaf.png`, `register.webp` | ✅ Da marca | — | Substituir por um sistema de ícones novo |
| **Selos de lojas de apps** | `fundacaomt.com.br/images/1588189259066472.svg` (App Store), `…253203660.svg` (Play) | Marcas Apple/Google | — | Usar os badges oficiais atualizados |

### 7.3 Capturas de tela desta análise (`screenshots/`)
| Arquivo | O que mostra |
|---|---|
| `00_home_banner-cookies_800px.jpg` | Primeira carga, banner de cookies (viewport 800 px) |
| `01_desktop_home_topo.jpg` | Cabeçalho + carrossel (desktop) |
| `02_desktop_home_noticias-areas.jpg` | H1, Notícias e Áreas de Pesquisa |
| `03_desktop_home_areas-pesquisa.jpg` | Grade de áreas (círculos) |
| `04_desktop_home_areas-experimentais.jpg` | Cards dos CADs |
| `05_desktop_home_imagens-quebradas-cads_banner-cadastro.jpg` | CAD Sul/Centro sem imagem + banner de cadastro |
| `06_desktop_home_carrossel-app.jpg` | Carrossel do app |
| `07_desktop_home_rodape-carregando-vazio.jpg` | Rodapé vazio durante a animação |
| `08_desktop_home_rodape.jpg` | Rodapé completo |
| `09_desktop_menu-institucional.jpg` | Dropdown Institucional |
| `10_desktop_menus-sobrepostos.jpg` | Dropdowns sobrepostos (bug) |
| `11_desktop_erro-500_palestras-categoria.jpg` | Página de erro 500 |
| `12–14_desktop_sobre_*.jpg` | Sobre: topo, Missão/Visão, Conselho Curador |
| `15–16_desktop_*entomologia*.jpg` | Área de pesquisa e bloco "Contrate" |
| `17_desktop_cad-oeste.jpg` | Página de CAD |
| `18_desktop_servico_consultoria-texto-em-imagem.jpg` | Serviço com texto em flyer |
| `19_desktop_laboratorio-entomologia.jpg` | Laboratório |
| `20–24_mobile_*.jpg` | Mobile: topo, notícias com botão sobreposto, áreas, banner ilegível, menu aberto |
| `25_desktop_noticia-interna.jpg` | Notícia |
| `26_desktop_eventos.jpg` | Eventos |
| `27_desktop_portal-transparencia.jpg` | Transparência |
| `28_desktop_fale-conosco.jpg` | Contato |
| `29_desktop_modal-area-do-usuario.jpg` | Modal de login |
| `30–32_mobile_*.jpg` | Mobile: texto justificado, título sem margem, flyer ilegível |

## 8. Parceiros e marcas citados (apenas referência)
AMAGGI (parceria no CAD Oeste, selo na foto) · BASF, TMG, Bayer, Abramilho, FS (patrocinadores no banner do VII ET Milho) · MCTI/PNIPE (cadastro dos laboratórios) · TOTVS (vagas) · RD Station, Google, Meta (marketing). ❓ Não há página de parceiros/associados; pedir a lista oficial e a autorização de uso das logos.

## 9. Regras de reutilização (resumo)
1. **Texto institucional** (missão, história, valores, políticas): reutilizar com revisão; é da própria Fundação.
2. **Fotos originais** (CADs, equipe, eventos, laboratório): reutilizar **somente após autorização** e de preferência a partir dos **arquivos originais em alta resolução** fornecidos pela Fundação (não os comprimidos do site).
3. **Fotos de banco e palestrantes**: não reutilizar sem licença ou autorização.
4. **Logos de parceiros**: só com autorização de cada marca.
5. **Logotipo da Fundação**: pedir o vetor (SVG/AI/PDF) e o manual de marca; não vetorizar a partir do PNG.
