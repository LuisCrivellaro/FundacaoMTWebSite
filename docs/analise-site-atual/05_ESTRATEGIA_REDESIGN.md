# 05 — Estratégia preliminar para o novo site

> Proposta baseada nos documentos 01–04. É **recomendação**, para validar com a Fundação MT antes do desenvolvimento.
> Princípio: usar o site atual como **fonte de conteúdo**, não como referência de design.

---

## 1. Objetivos do novo site

1. **Posicionar** a Fundação MT como a referência independente em pesquisa agronômica de Mato Grosso (ICT, 30+ anos, rede de CADs).
2. **Converter** em três funis claros:
   - **Produtor/consultor** → contratar serviço (consultoria, amostragem, laboratório) ou se inscrever em evento.
   - **Empresa** → solicitar proposta de pesquisa/ensaio, patrocinar evento ou usar infraestrutura.
   - **Todos** → cadastrar-se na área técnica, baixar o app ou comprar o Boletim.
3. **Difundir** conhecimento: notícias, alertas, resultados e eventos fáceis de achar, rápidos no 4G do campo.
4. **Reduzir atrito operacional**: formulários roteados por assunto, conteúdo gerido em CMS sem colar HTML do Word nem imagens em base64.

## 2. Mensagem central (proposta de copy, para validar)

> **Pesquisa agronômica independente para quem produz em Mato Grosso.**
> Há mais de 30 anos, testamos tecnologias de todas as empresas, com o mesmo rigor, em campos experimentais nas principais regiões do estado, para que você decida com segurança.
> [Conheça nossos serviços] [Próximos eventos]

Pilares de mensagem (em ordem): **Imparcialidade** → **Campo de verdade (CADs)** → **Especialistas** → **Do dado à decisão** → **Comunidade técnica (eventos)**.

## 3. Arquitetura de informação proposta

Menu principal com 6 itens + utilitários (login, busca, CTA):

```
Logo │ Pesquisa ▾ │ Serviços ▾ │ Eventos │ Conteúdo técnico ▾ │ A Fundação ▾ │ Contato │ [🔍] [Entrar] [Fale com a gente]

Pesquisa
  ├─ Áreas de pesquisa (hub)  → Entomologia · Fitopatologia e Biológicos · Fitotecnia · Matologia · Nematologia ·
  │                             Solos e Sistemas de Produção · Mecanização e Tecnologia de Aplicação · Pecuária de Corte · Data Science
  ├─ Campos experimentais (CADs) → mapa interativo + 6 páginas
  ├─ Laboratórios → Entomologia · Fitopatologia · Nematologia
  └─ Infraestrutura e parcerias (Comitê Gestor de Inovação / ICT)

Serviços
  ├─ Para produtores → Consultoria Agronômica · Amostragem de Solo e Diagnóstico · Agricultura de Precisão (variabilidade espacial) · Tutoria Nematológica
  ├─ Para empresas → Pesquisa contratada e ensaios · Avaliação de máquinas · Análises laboratoriais · Insetos e kits
  └─ Palestras e treinamentos (catálogo filtrável por área)

Eventos
  ├─ Próximos eventos (cards com data, local, formato, preço/lote, inscrição)
  ├─ Edições anteriores (por série: ET Soja, ET Algodão, ET Milho, ET Pecuária, Fundação MT em Campo, Cotton Day, Escola de Herbicidas, Circuito do Conhecimento)
  └─ Seja patrocinador

Conteúdo técnico
  ├─ Notícias e alertas
  ├─ Publicações → Boletim de Pesquisa (loja), Cartilhas, Informativos
  ├─ Vídeos (YouTube/lives)
  ├─ Área do produtor (login: informações técnicas por área)
  └─ App Fundação MT

A Fundação
  ├─ Quem somos (história, missão, valores, linha do tempo)
  ├─ Governança (Conselho Curador, diretoria)
  ├─ Equipe (todos os pesquisadores, filtrável por área)
  ├─ Transparência (políticas, LGPD, relatórios de atividades)
  ├─ Imprensa (press kit, contatos)
  └─ Trabalhe conosco (→ TOTVS)
```

Rodapé: endereço e mapa da sede, horários, telefone/WhatsApp/e-mail, redes, newsletter (cadastro), links rápidos, CNPJ e razão social, políticas. **Portais internos** (Portal do Colaborador, GLPI) ficam num link discreto "Acesso colaborador".

## 4. Páginas recomendadas e ordem das seções

### 4.1 Home
1. **Hero**: título e subtítulo da §2, 2 CTAs, foto aérea real de CAD (ou vídeo curto de drone sem som) e selo "ICT · desde 1993".
2. **Faixa de números** (validar com a Fundação): anos de atuação · CADs · pesquisadores · ensaios por safra · participantes em eventos/ano · edições do Boletim.
3. **"Como podemos ajudar"**: 3 cartões por público (Produtor · Empresa · Pesquisador/ICT), cada um com 3 links.
4. **Próximo evento em destaque** (card grande com data, local, contagem regressiva e inscrição) + 2 seguintes.
5. **Áreas de pesquisa**: grade de 9 cards (ícone de linha, nome, frase de 1 linha).
6. **Mapa dos campos experimentais**: MT estilizado com 6 pins; clique → região, culturas, foco e clima (WeatherLink).
7. **Por que a Fundação MT**: imparcialidade, campo, especialistas, confidencialidade. Citação da Missão.
8. **Notícias e alertas técnicos**: 3 cards + "Ver todas".
9. **Publicações e App**: Boletim de Pesquisa (capa, preço, comprar) + app (mockup, badges).
10. **Parceiros e patrocinadores** (logos com autorização).
11. **CTA final**: "Fale com um especialista" (formulário curto ou WhatsApp).

### 4.2 Área de pesquisa (template)
Hero com foto real da área → "O que pesquisamos" (3–5 tópicos) → "Resultados em destaque" (notícias e publicações filtradas) → **Equipe** (cards com foto, formação, Lattes/LinkedIn) → "Como contratar" (abas: Pesquisa para empresas · Palestras · Treinamentos · Serviços), com cada item expansível em vez de 89 páginas soltas → CTA "Solicitar proposta" com a área pré-selecionada.

### 4.3 Serviço (template)
Para quem é → Problema que resolve → O que está incluído → **Como funciona** (stepper, ex.: as 7 etapas da amostragem) → Entregáveis (mapa, laudo, recomendação) → Responsável técnico → FAQ → Formulário de orçamento (serviço pré-preenchido).

### 4.4 CAD (template)
Hero aéreo → Região/município, criação, área e culturas → Linhas de pesquisa → Estação meteorológica (widget) → Galeria → Próximos eventos no CAD (ex.: Cotton Day no CAD Oeste) → Coordenador e "Agendar visita" → Mapa.

### 4.5 Evento (template)
Hero com data, local e formato → Programação (texto, não imagem) → Palestrantes → Ingressos (lotes em tabela HTML, presencial × online) → Local e hospedagem → Patrocinadores → FAQ (cancelamento → política) → Edições anteriores.

### 4.6 Demais
Quem somos (com linha do tempo 1993 → 2008 CAD Sul → 2013 nova marca/CAD Médio Norte → 2015 CADs Oeste e Primavera → 2019 CAD Norte → 2021 Data Science → 2022 nova marca → 2026), Equipe, Laboratório, Notícias (lista com filtros por cultura/área/tipo), Publicações/Loja, Área do produtor (landing pública explicando o que há atrás do login), Contato, Transparência, 404 personalizada.

## 5. Estratégia de apresentação dos serviços

- Organizar **por público** (produtor × empresa), não por departamento.
- Cada serviço com **resultado esperado** ("descubra onde sua lavoura perde produtividade") antes da técnica.
- **Catálogo de palestras/treinamentos** único, com filtro por área/cultura/formato, substituindo as 89 páginas `area-de-pesquisa/servico/*`.
- **Prova** em cada serviço: número, foto real, pesquisador responsável, depoimento (coletar).
- CTA único e consistente: **"Solicitar proposta"** (empresa) / **"Solicitar orçamento"** (produtor).

## 6. Direção visual

### 6.1 Conceito
**"Ciência no campo"**: a precisão de uma instituição científica com o calor e a luz do cerrado mato-grossense. Mais editorial e menos "template": fotografia aérea grande, tipografia forte, muito respiro, dados como elemento visual (mapas, gráficos simples, parcelas experimentais vistas de cima como padrão gráfico).

### 6.2 Paleta proposta (derivada do logo; validar com o manual de marca)
| Token | Hex sugerido | Uso |
|---|---|---|
| `--green-900` | #1F3D24 | Fundos escuros, rodapé, texto de destaque |
| `--green-700` (marca) | #4A8B42 | Cor da marca: ícones, elementos gráficos e texto ≥ 24 px (≈ 4,2:1 sobre branco, **não** usar em texto pequeno) |
| `--green-600` | #2F7A3B | Botão primário e links (≈ 5,3:1 com branco, AA) |
| `--lime-400` (acento) | #8DC63F | Destaques, sublinhados, badges, dados |
| `--soil-500` | #B5835A | Acento terroso pontual (solo do cerrado), opcional |
| `--sand-50` | #F7F5EF | Fundo alternativo quente |
| `--ink-900` / `--ink-600` | #1A1F1B / #4B544D | Texto principal / secundário (≥ 4,5:1) |
| `--white` | #FFFFFF | Fundo |
Regras: no máximo 1 verde de ação; o lima nunca carrega texto branco; validar todos os pares no WCAG AA; modo escuro opcional.

### 6.3 Tipografia
- **Títulos**: uma sans geométrica/grotesca com personalidade e boa leitura em português, ex.: **"Bricolage Grotesque"**, **"Sora"** ou **"Manrope"** (todas no Google Fonts). Alternativa: manter **Barlow/Barlow Semi Condensed** para continuidade com o site atual.
- **Texto**: **"Inter"** ou **"Source Sans 3"**, 16–18 px, entrelinha 1,6, alinhado à esquerda.
- Números/dados: algarismos tabulares (Inter `tnum`).
- Eliminar Amatic SC, Roboto e as fontes de sistema.
- ❓ Se o manual de marca definir a fonte oficial do logotipo, usá-la nos títulos.

### 6.4 Fotografia e ícones
- Prioridade: aéreas de CADs → pesquisadores em ação (campo/lab) → macro de pragas e doenças → eventos com público.
- Tratamento consistente (leve aquecimento, contraste natural); retratos com o mesmo fundo.
- Ícones de linha próprios para as 9 áreas (inseto, folha com mancha, planta, daninha, nematoide, solo, trator/bico, boi, gráfico).
- Padrão gráfico: grade de parcelas experimentais (retângulos verdes/amarelos) como textura em seções.

### 6.5 Componentes-chave
Header fixo compacto (≤ 72 px desktop / 60 px mobile) · mega-menu · hero editorial · stat band · cards (área, serviço, evento, notícia, pessoa) · mapa interativo de MT · stepper de processo · tabela de lotes · accordion de catálogo · filtros com chips · formulário multi-etapas com roteamento · barra de CTA fixa no mobile (WhatsApp + Solicitar) · footer completo · breadcrumb · banner de cookies (manter a lógica atual).

## 7. UX/UI — recomendações

1. Hierarquia: um H1 por página, H2 escuros e grandes; nada de "pílulas" como título.
2. **Zero texto em imagem**: banners, flyers e programações viram HTML.
3. Navegação por público e tarefa; busca global com resultados agrupados.
4. Área restrita transparente: cadeado + explicação + benefício antes do login.
5. Microcopy clara nos CTAs ("Inscrever-se no 26º ET Soja", não "Saiba mais").
6. Feedback e estados (carregando, erro, sucesso) em formulários; nunca páginas "Em breve" públicas.
7. Acessibilidade WCAG 2.2 AA: contraste, foco visível, alt descritivo, navegação por teclado, `prefers-reduced-motion`.
8. Datas reais em todo conteúdo; esconder seções vazias automaticamente.

## 8. Responsividade

- **Mobile-first**: o público acessa do campo, muitas vezes em 4G instável.
- Header de no máximo 60 px; hambúrguer à direita com CTA visível.
- Uma coluna com cards horizontais; grades 2×N só para itens pequenos.
- Barra inferior fixa com 2 ações (WhatsApp / Solicitar), sem botões flutuantes sobrepostos.
- Imagens com `srcset`/`sizes` e art direction para o mobile (crop vertical do hero).
- Tabelas de lotes e programação em cards empilhados no mobile.
- Testar em 360, 390, 768, 1024, 1280 e 1440 px.

## 9. Desempenho (metas)

- Home ≤ 1,5 MB na primeira carga; LCP < 2,5 s em 4G; CLS < 0,1; INP < 200 ms.
- Imagens WebP/AVIF, lazy-load nativo, nada de base64 em HTML.
- Fontes self-hosted com `font-display: swap`, no máximo 2 famílias.
- Sem jQuery/Owl Carousel; componentes leves.
- 💭 Stack sugerida (a decidir na próxima etapa): **Astro** ou **Next.js (SSG/ISR)** + Tailwind + CMS headless (Sanity, Strapi ou Payload) para notícias, eventos, equipe e serviços. Integração com o checkout/área do usuário atuais via API, ou manutenção do Laravel como back-end.

## 10. SEO básico

- **Redirecionamentos 301** de todos os 422 URLs válidos (mapa a gerar a partir de `inventario/paginas.md`); remover do sitemap os URLs 404/500/vazios.
- URLs semânticas e curtas: `/pesquisa/entomologia`, `/servicos/amostragem-de-solo`, `/eventos/encontro-tecnico-soja-2026`, `/noticias/<slug>` (manter slugs das notícias).
- Títulos únicos com palavra-chave + local ("Análise de nematoides em Mato Grosso | Fundação MT").
- JSON-LD: manter Organization (trocar para `ResearchOrganization`), `Event` com local e datas corretos, `NewsArticle`, `Service`, `Person` (pesquisadores), `Place` (CADs com geo), `Product` (Boletim), `BreadcrumbList`, `FAQPage`.
- Conteúdo pilar por cultura (soja, milho, algodão, pecuária) que agrega notícias, pesquisas e eventos.
- Google Business Profile da sede e dos CADs; `hreflang` desnecessário (só pt-BR).
- Open Graph por página com imagem real.

## 11. CTAs estratégicos

| Contexto | CTA primário | CTA secundário |
|---|---|---|
| Home (hero) | Conheça nossos serviços | Próximos eventos |
| Área de pesquisa | Solicitar proposta de pesquisa | Falar com o pesquisador |
| Serviço ao produtor | Solicitar orçamento | WhatsApp |
| Laboratório | Enviar amostra / solicitar análise | Ver procedimento de coleta |
| Evento | Inscrever-se (lote atual: R$ X) | Seja patrocinador |
| Notícia | Cadastre-se para receber alertas | Ver eventos relacionados |
| CAD | Agendar visita | Ver clima agora |
| Boletim | Comprar | Ver sumário |

## 12. Elementos de confiança

- Selo/menção de **ICT** e da Política de Inovação; links **PNIPE/MCTI** dos laboratórios.
- Linha do tempo de 30+ anos e lista de ex-presidentes do conselho (nomes reconhecidos no agro).
- **Equipe com formação** (UFV, UFLA, ESALQ/USP, UFPR, UFMT…), foto e Lattes.
- Números auditáveis (com a data de referência).
- Logos de parceiros e patrocinadores (AMAGGI, BASF, TMG, Bayer…), **com autorização**.
- Depoimentos de produtores e empresas (a coletar) e de participantes de eventos.
- Imprensa: "A Fundação MT na mídia" (Canal Rural, Revista Cultivar, Notícias Agrícolas, Agrolink).
- Transparência: políticas, relatórios anuais e LGPD visíveis.
- Site rápido, sem erros e atualizado (sinal implícito de rigor).

## 13. Contato e conversão

- **Formulário inteligente**: passo 1, "Sobre o que você quer falar?" (Serviço para minha propriedade · Pesquisa para minha empresa · Laboratório · Evento/patrocínio · Imprensa · Infraestrutura/ICT · Outro) → passo 2, campos específicos (cultura, área em ha, município, serviço) → roteamento ao e-mail certo e ao RD Station.
- WhatsApp com mensagem pré-preenchida por contexto ("Olá, vim pela página de Amostragem de Solo…").
- Formulário de orçamento embutido em cada serviço; confirmação com prazo de resposta.
- Newsletter/alertas por cultura (consentimento LGPD granular).
- Rastreamento de eventos de conversão (GA4/GTM existente).
- Página de obrigado com próximos passos (baixar o app, ver eventos).

## 14. Roadmap sugerido (próximas etapas)

1. **Validar** com a Fundação: mensagem, números, lista de serviços com responsáveis, parceiros e fotos originais (ver `06_FONTES_E_PENDENCIAS.md`).
2. **Design system** (tokens, tipografia, componentes) + wireframes da home e dos 5 templates.
3. **Protótipo navegável** em alta fidelidade (desktop + mobile).
4. **Definir stack** e integrações (checkout, login, RD Station, WeatherLink, YouTube).
5. **Migração de conteúdo** (notícias, eventos, equipe) + mapa de 301.
6. Desenvolvimento, QA (acessibilidade, desempenho, SEO) e lançamento.
