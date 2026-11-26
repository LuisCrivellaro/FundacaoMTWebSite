# Os 50 princípios — como foram tratados

Legenda: ✅ aplicado e verificado · 🟡 parcial · ➖ não aplicável ou não usado por decisão. "Verificado" quer dizer conferido no código e/ou no navegador em 25/11/2026.

## 01 — Direção criativa e identidade

| # | Princípio | Status | Onde e como |
|---|---|---|---|
| 1 | Originalidade | ✅ | Painel de hero arredondado com foto aérea real; serifa Sentient; lista editorial de áreas com foto fixa; seletor de centros. Nenhum bloco copiado dos templates |
| 2 | Identidade | ✅ | Verdes do logotipo, logo oficial, slogan, missão e valores oficiais. 🟡 sem manual de marca |
| 3 | Referências | ✅ | TerraKind (hero, números, títulos em dois tons), EcoMission (cartões de serviço, rodapé completo), Solarify (palavras reveladas, seletor com foto). Ver `SKILLS_APLICADAS.md` |
| 4 | Direção de arte | ✅ | Fotos escolhidas por resolução e assunto (`CONTENT_SOURCES.md §3`); gradiente só onde há texto |
| 5 | Hero | ✅ | "Pesquisa agronômica imparcial para quem produz em Mato Grosso" sobre as parcelas do CAD Sul, com fato (desde 1993, cinco centros) e dois CTAs |
| 6 | Storytelling | ✅ | Home: promessa → origem/missão → áreas → campo → serviços → conhecimento → agenda → contato |
| 7 | Hierarquia | ✅ | Um H1 por página (verificado em 26 URLs), sem saltos de nível, escala tipográfica com passos claros |
| 8 | Autenticidade | ✅ | Só fatos com fonte; frases sem fonte foram cortadas (ver Humanizer) |
| 9 | Consistência | ✅ | Mesmos `PageHeader`, cartões, botões e raios em todas as páginas |
| 10 | Propósito | ✅ | Cada seção termina numa ação (serviço, evento, contato, cadastro) |

## 02 — Design visual e tipografia

| # | Princípio | Status | Onde e como |
|---|---|---|---|
| 11 | Legibilidade | ✅ | Corpo de 17 px, entrelinha 1,6, linha ≤ 68 caracteres |
| 12 | Peso tipográfico | ✅ | Títulos 380–420, corpo 400–500; nada abaixo de 380 |
| 13 | Contraste | ✅ | Pares medidos: tinta 15:1, apoio 7,5:1, metadado 5,4:1, botão 5,3:1 |
| 14 | Espaçamento | ✅ | Seções de 96/128 px; grupos internos de 8–24 px; mais espaço acima do que abaixo de títulos |
| 15 | Alinhamento | ✅ | `.wrap` + grid de 12 colunas; bordas iguais |
| 16 | Agrupamento | ✅ | Serviços agrupados por público; ofertas por tipo em acordeões |
| 17 | Border radius | ✅ | Escala sm/md/lg/xl; raio interno = externo − espaçamento |
| 18 | Cores | ✅ | Cada token tem uma função (ação, acento em fundo escuro, erro, sucesso) |
| 19 | Letter spacing | ✅ | Só tracking negativo leve nos títulos grandes; nenhum espaçamento extra em texto pequeno |
| 20 | Minimalismo | ✅ | Sem selos decorativos nem carrosséis; conteúdo longo em acordeão em vez de 89 páginas soltas |

## 03 — UX e componentes funcionais

| # | Princípio | Status | Onde e como |
|---|---|---|---|
| 21 | CTAs | ✅ | Verbo + objeto: "Pedir orçamento", "Agendar uma visita", "Ir para a inscrição" |
| 22 | Linguagem | ✅ | Revisão Humanizer dos textos próprios |
| 23 | Formulários: labels | ✅ | Rótulos visíveis ligados por `htmlFor` |
| 24 | Placeholders | ✅ | Exemplos ("Ex.: Sorriso – MT…") sem substituir rótulos |
| 25 | Máscaras | ✅ | Telefone `(66) 99999-9999` |
| 26 | Validação | ✅ | Erro abaixo do campo, `aria-invalid`, foco no primeiro erro; validação repetida no servidor |
| 27 | Feedback | ✅ | "Enviando…", sucesso só após envio real, falha com alternativas; `aria-live` |
| 28 | Seleções | ✅ | Rádio para assunto (escolha única), select para serviço/área/centro, checkbox para consentimento |
| 29 | Touch targets | ✅ | Controles com no mínimo 44 px (`min-h-11`); links de rodapé com 40 px |
| 30 | Onboarding | 🟡 | Não há fluxo de várias etapas; o formulário mostra o campo de detalhe conforme o assunto. Login e cadastro estão no sistema atual |

## 04 — Motion design e storytelling

| # | Princípio | Status | Onde e como |
|---|---|---|---|
| 31 | Scroll animations | ✅ | Um momento só (frase da missão). Sem fade em seções |
| 32 | Parallax | ➖ | Não usado: não acrescentava informação e custa desempenho |
| 33 | Scroll storytelling | ✅ | Frase da missão revelada pela rolagem |
| 34 | Sticky sections | ✅ | Foto fixa nas áreas de pesquisa (home); barras laterais fixas nas páginas de área, serviço, centro e evento |
| 35 | Transições | ✅ | Durações de 200–900 ms com a mesma curva (`ease-out-expo`) |
| 36 | Microinterações | ✅ | Botões, setas, sublinhados, zoom de foto, elevação de cartão |
| 37 | Animações 3D | ➖ | Não usadas por decisão (regra de equilíbrio do briefing) |
| 38 | Sequenciamento | ✅ | Hero: título → texto → botões, com atrasos de 80/260/360 ms |
| 39 | Motion funcional | ✅ | Menu e seletor de centros orientam; nada decorativo em loop |
| 40 | Performance e movimento reduzido | ✅ | Só transform/opacity/filter; `prefers-reduced-motion` desliga tudo |

## 05 — Arquitetura, desenvolvimento e qualidade

| # | Princípio | Status | Onde e como |
|---|---|---|---|
| 41 | Responsividade | ✅ | Testado em 375, 768 e 1440 px; sem rolagem horizontal em 26 URLs (375 px); mega-menu vira gaveta em tela cheia |
| 42 | Componentização | ✅ | `ui/`, `layout/`, `home/`, `cards.tsx` e conteúdo separado em `content/` |
| 43 | Acessibilidade | ✅ | Skip link, foco visível, landmarks, tablist com setas, `alt` em todas as imagens, contraste AA. 🟡 sem teste com leitor de tela real |
| 44 | Performance | ✅ | Home em produção ~1,1 MB (antes 8,9 MB), CLS 0, AVIF/WebP, 228 páginas estáticas. 🟡 LCP não medido em 4G real |
| 45 | SEO | ✅ | Metadados, canonical, OG, JSON-LD, sitemap, robots, 301 das URLs antigas, mesmos slugs de notícias e eventos |

## 06 — Conversão e estratégia comercial

| # | Princípio | Status | Onde e como |
|---|---|---|---|
| 46 | Conversão | ✅ | CTAs de orçamento, visita, análise, inscrição e cadastro com contexto pré-preenchido no contato. 🟡 envio depende de `CONTACT_WEBHOOK_URL` |
| 47 | Landing pages | ✅ | Páginas de serviço e de evento com objetivo único, processo, responsável e CTA fixo na lateral |
| 48 | Propostas | ✅ | Serviços mostram problema, processo e entregável, não preço |
| 49 | Negociação | ➖ | Nenhuma política comercial ou desconto foi criado |
| 50 | Relacionamento | 🟡 | Cadastro na área técnica e WhatsApp com mensagem contextual. Falta newsletter ou alerta por cultura (precisa da Fundação e do RD Station) |

## Melhorias ainda necessárias

1. Fotos originais autorizadas em alta resolução (principalmente CAD Oeste e áreas de pesquisa).
2. Teste com NVDA/VoiceOver e medição de LCP/INP em dispositivo real com 4G.
3. Newsletter e alertas por cultura, com consentimento granular.
4. Fluxo integrado de login e inscrição (hoje vai para o sistema atual).
5. Depoimentos reais e logos de parceiros, com autorização.
