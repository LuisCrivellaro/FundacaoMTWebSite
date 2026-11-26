# Design system — Fundação MT

Fonte da verdade: `src/app/globals.css` (bloco `@theme`) e os componentes em `src/components/ui/`.

## 1. Direção

**"Ciência no campo."** Fotografia aérea real das parcelas experimentais, títulos em serifa contemporânea, muito respiro e cor usada com função. A base é editorial (TerraKind), a organização é institucional (EcoMission) e os detalhes de interação são discretos (Solarify). O site não usa estética de "sustentabilidade genérica" nem de energia solar.

Regras que valem para todo o site:
- Nenhum rótulo (eyebrow) acima de títulos; nada de números de seção.
- Títulos com duas frases: a afirmação em tinta escura e o complemento em tom suave, na mesma `h2`.
- Fotografias da própria Fundação; nenhuma imagem de banco apresentada como registro real.
- Movimento ligado à rolagem e à leitura (ver §7): conteúdo entra ao aparecer na tela, fotos têm profundidade, nada se move sozinho em loop.

## 2. Cores

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `forest-950` | `#0c1f13` | Rodapé, seções escuras | branco 17:1 |
| `forest-900` | `#12301c` | Cartões escuros, botões ativos | branco 14:1 |
| `forest-800` / `700` | `#1a4227` / `#245633` | Hover de botões, fundos | — |
| `brand-600` | `#2f7a3b` | **Ação**: botões primários, links | branco 5,3:1; sobre papel 4,8:1 (AA) |
| `brand-500` | `#4a8b42` | Cor do logotipo: grafismos, números grandes | 4,1:1: só texto ≥ 24 px |
| `leaf-400` | `#8dc63f` | Acento do logotipo, **só sobre fundo escuro** | sobre `forest-950` 8,4:1 |
| `leaf-200` / `100` | `#cfe5ad` / `#e6f1d6` | Seleção de texto, etiquetas, ícones | — |
| `paper` | `#f6f4ee` | Fundo geral (papel quente) | — |
| `sand` / `sand-300` | `#ece7dc` / `#ddd5c4` | Fundos alternados, placeholders de imagem | — |
| `line` | `#d8d9cf` | Bordas e divisores | — |
| `ink` | `#16201a` | Texto principal | sobre papel 15:1 |
| `ink-soft` | `#46514a` | Texto de apoio | sobre papel 7,5:1 |
| `ink-mute` | `#5c665f` | Metadados, legendas | sobre papel 5,4:1 |
| `danger` / `danger-soft` | `#a8321f` / `#f8e6e1` | Erros de formulário | 6,1:1 sobre papel; 5,5:1 sobre `danger-soft` |
| `success` | `#1f6b34` | Confirmações | — |

As cores foram amostradas do PNG oficial do logotipo (`#4A8B42`, `#8DC63F`). Falta o manual de marca para confirmar os valores oficiais.

## 3. Tipografia

| Papel | Família | Origem | Pesos |
|---|---|---|---|
| Títulos (`font-display`) | **Sentient** (serifa contemporânea, variável) | Fontshare, ITF FFL | 380–420 |
| Texto e interface (`font-sans`) | **General Sans** (grotesca, variável) | Fontshare, ITF FFL | 400–600 |

Escala (fluida com `clamp`):

| Token | Tamanho | Entrelinha | Tracking |
|---|---|---|---|
| `text-display` | 44 → 92 px | 1,02 | −0,025em |
| `text-h1` | 40 → 72 px | 1,04 | −0,022em |
| `text-h2` | 32 → 56 px | 1,08 | −0,018em |
| `text-h3` | 22 → 28 px | 1,2 | −0,01em |
| `text-lead` | 18 → 21 px | 1,55 | 0 |
| corpo | 17 px | 1,6 | 0 |

Regras: linha de texto até ~68 caracteres (`.measure`); `text-wrap: balance` em títulos e `pretty` em parágrafos; números com `tabular-nums` (`.tabular`); nada de letter-spacing em texto pequeno; sem caixa-alta em títulos.

## 4. Espaço, grid e raios

- Contêiner `.wrap`: até 88rem (1408 px), margem lateral fluida de 16 a 48 px.
- Grid de 12 colunas em `lg`; uma coluna no celular. Itens de grid/flex têm `min-width: 0` global (evita estouro por e-mails e nomes científicos).
- Ritmo vertical das seções: `py-24` (96 px) no celular e `py-32` (128 px) a partir de `md`.
- Raios: `sm` 10 px (campos, miniaturas) · `md` 16 px (imagens de cartão) · `lg` 24 px (cartões) · `xl` 32 px (painéis de hero e CTA). Raio interno = externo − espaçamento.
- Sombras: `shadow-card` (repouso) e `shadow-lift` (hover), sempre com deslocamento e desfoque.

## 5. Componentes

| Componente | Arquivo | Notas |
|---|---|---|
| `ButtonLink` | `ui/Button.tsx` | Variantes `primary`, `secondary`, `ghost`, `light`, `outline-light`; tamanhos `md`/`lg`; mínimo 44 px de altura; seta que desliza no hover; externo abre em nova aba com aviso para leitor de tela |
| `TextLink` | `ui/Button.tsx` | Link com sublinhado que se desenha no hover |
| `SectionHeading` | `ui/Primitives.tsx` | Título de duas frases + texto de apoio, layout dividido ou empilhado |
| `PageHeader` | `ui/Primitives.tsx` | Trilha, H1, texto de apoio, ações e foto opcional |
| `Breadcrumbs`, `Tag`, `Avatar`, `Frame` | `ui/Primitives.tsx` | Avatar mostra iniciais quando não há foto oficial |
| `NewsCard`, `EventCard` | `cards.tsx` | Cartão inteiro clicável via `after:inset-0`, sem `div` clicável |
| `Header` | `layout/Header.tsx` | Mega-menu com `aria-expanded`, Esc, clique fora; menu mobile em tela cheia |
| `Footer`, `CookieConsent` | `layout/` | Preferências de cookies reabríveis pelo rodapé |
| `ContactForm` | `ContactForm.tsx` | Rótulos visíveis, placeholders de exemplo, máscara de telefone, erros ao lado do campo, foco no primeiro erro, anti-spam |
| `NewsBrowser`, `EventsBrowser`, `SiteSearch` | `components/` | Filtros e busca sincronizados com a URL |

Estados cobertos: hover, foco (`:focus-visible` com anel `brand-600`), pressionado (`scale 0.97`), carregando ("Enviando…"), erro, vazio (listas sem resultado) e sucesso (só após envio real).

## 6. Imagens

- `next/image` com AVIF/WebP, `sizes` por contexto e `priority` só no hero.
- Proporções: hero de página cheia; cartões 16:9 ou 3:2; retratos quadrados ou circulares.
- Fotos de baixa resolução do site antigo (≈300 px) só aparecem como miniaturas; no topo das páginas usamos apenas originais ≥ 700 px.
- Gradientes escurecem só a base e a lateral do hero, para leitura sem esconder as parcelas.

## 7. Movimento

| Onde | O quê | Por quê |
|---|---|---|
| Hero | Título, texto e botões sobem com desfoque (0,9 s, `ease-out-expo`); a foto assenta de 1,06 para 1. Ao rolar para fora, a foto desce mais devagar que a página e o texto some subindo | Entrada ao carregar + profundidade na saída |
| Cabeçalho das páginas internas | Trilha, título, texto e botões sobem em sequência; a foto abre de baixo para cima e desfaz o zoom | Mesma entrada do hero em todas as páginas |
| Títulos de seção, cartões, listas | Sobem 36 px e aparecem ao entrar na tela; em grades, as colunas entram escalonadas (`--i` 0, 1, 2) | Ritmo de leitura ao rolar |
| Fotos em moldura (`Frame`, evento em destaque) | Abrem de baixo para cima e desfazem o zoom ao entrar na tela | Fotos como protagonistas |
| Foto da sede, bloco de serviços | Parallax: a foto se desloca 7% mais devagar dentro da moldura | Profundidade sem mexer no texto |
| "Quem somos" | Palavras ganham opacidade conforme a rolagem; números (6, 3, 200+, 26) contam a partir de zero ao aparecer | Leitura guiada da missão |
| Áreas de pesquisa | Foto aérea fixa (sticky) que recua o zoom enquanto a lista rola | Contexto visual sem carrossel |
| "Do campo experimental ao produtor" | Duas faixas de fotos correm em sentidos opostos conforme a rolagem | Mostrar o volume de campo e eventos sem carrossel automático |
| Centros experimentais | Troca de foto com fade; texto do centro sobe; marcador verde desliza até o centro escolhido | Escolha do usuário, sem rotação automática |
| Convite final ("Fale com a equipe") | As parcelas do grafismo brotam em diagonal ao entrar na tela | Fecho da página |
| Notícia | Barra verde de progresso de leitura no topo | Orientação em textos longos |
| Cartões e fotos | Elevação de 2 px; zoom de 1,03 na foto | Resposta ao ponteiro |
| Menus | Fade + 6 px | Orientação espacial |

**Como funciona.** O movimento ao rolar usa CSS scroll-driven animations (`animation-timeline: view()`/`scroll()`), sem JavaScript: classes `.reveal`, `.reveal-group`, `.stagger`, `.reveal-photo`, `.parallax` + `.parallax-layer`, `.photo-band`, `.hero-stage`, `.plots-scope`, `.read-progress` em `globals.css`. As animações usam `transform` e `opacity`; o hover do Tailwind 4 usa as propriedades `translate`/`scale`, então os dois se somam. Moldura com `overflow-hidden` vira o "scroller" mais próximo da imagem, por isso a linha do tempo é nomeada na moldura (`view-timeline-name`) e usada pela imagem. JavaScript só no contador (`CountUp`, com `motion`) e no seletor de centros.

**Movimento reduzido e navegadores sem suporte.** Tudo fica dentro de `@media (prefers-reduced-motion: no-preference)` e `@supports (animation-timeline: view())`. Com movimento reduzido ou sem suporte (Firefox, hoje), o conteúdo aparece no estado final, as faixas de fotos viram listas com rolagem horizontal e o contador mostra o número final. Nada se move em loop sozinho (sem carrossel automático, sem marquee), e não há parallax em texto nem 3D.

## 8. Superfícies do navegador

Seleção de texto em `leaf-200`, cursor de digitação `brand-600`, barras de rolagem no tom de papel, `theme-color` igual ao fundo, foco visível com deslocamento de 3 px.
