# AI_HANDOFF — Projeto de redesign do site da Fundação MT

> Leia este arquivo primeiro. Ele resume a pesquisa de 21/11/2026 para que uma nova sessão continue **sem refazer a pesquisa básica**.
> Repositório: `LuisCrivellaro/FundacaoMTWebSite` (branch de análise: `docs/analise-site-atual`). Site atual: https://www.fundacaomt.com.br

## 1. Estado do projeto

- ✅ **Etapa 1 concluída: pesquisa, auditoria e estratégia** (esta pasta).
- ⏸️ **O novo site ainda NÃO foi iniciado.** O usuário pediu explicitamente para não desenvolver até a próxima instrução. Não crie código, não instale dependências e não escolha stack sem pedido.
- O repositório tinha apenas esta documentação no momento do handoff.

## 2. Mapa dos documentos

| Arquivo | Quando consultar |
|---|---|
| `01_EMPRESA.md` | Quem é a Fundação: identidade, história, governança, equipe, serviços, público, diferenciais, tom. **Fatos ✅ × externos 📰 × interpretação 💭 × pendente ❓** |
| `02_SITE_ATUAL.md` | Estrutura do site atual: menus, rodapé, cada tipo de página, formulários, links, SEO existente |
| `03_AUDITORIA_UX_UI.md` | O que está errado e como corrigir (visual, UX, acessibilidade, mobile, desempenho, técnico) |
| `04_CONTEUDOS_E_ASSETS.md` | Logos, cores, fontes, textos reaproveitáveis, classificação das fotos (originais × banco), direitos de uso |
| `05_ESTRATEGIA_REDESIGN.md` | Arquitetura proposta, templates, direção visual, UX, SEO, CTAs, conversão, roadmap |
| `06_FONTES_E_PENDENCIAS.md` | URLs/fontes, evidências, conflitos, páginas com erro, **checklist do que pedir ao cliente** |
| `inventario/*.md` | Listas completas: 440 páginas, 135 notícias, 49 eventos, 877 imagens |
| `screenshots/` | 33 capturas (desktop 1440 px e mobile 375 px), nomeadas por número e tema |

## 3. Conhecimento essencial (resumo de 1 minuto)

- **Quem**: Fundação de Apoio à Pesquisa Agropecuária de Mato Grosso ("Fundação MT"), CNPJ 70.499.462/0001-80, fundada em **1993 por 23 produtores**, sede no **Centro de Pesquisa Dario Minoru Hiromoto, Rondonópolis-MT**. ICT privada com Comitê Gestor de Inovação.
- **Missão**: "Prover informação técnica, imparcial e confiável que oriente a tomada de decisão do produtor." Slogan: **"Dando vida aos resultados!"**
- **O que faz**: pesquisa agronômica aplicada (soja, milho, algodão, cobertura, pecuária de corte) em **9–10 áreas** (Entomologia, Fitopatologia e Biológicos, Fitotecnia, Matologia, Nematologia, Solos e Sistemas, Mecanização e Tecnologia de Aplicação, Pecuária, Data Science, mais Variabilidade Espacial), em **5 CADs + sede** (Médio Norte, Norte/Sorriso, Oeste/Sapezal, Primavera/Primavera do Leste, Sul) e **3 laboratórios** (cadastrados no PNIPE/MCTI).
- **Receitas/serviços**: pesquisa contratada por empresas (ensaios, posicionamento, avaliação confidencial de máquinas, qualificação Bt), consultoria agronômica e amostragem de solo para produtores (plataforma FMT ID), análises de laboratório, venda de insetos e kits, palestras e treinamentos, **eventos pagos** (ET Soja 26ª ed., ET Algodão 18ª, ET Milho 7ª, ET Pecuária 4ª, Fundação MT em Campo, Cotton Day, Escola de Herbicidas), **Boletim de Pesquisa** (20ª ed., loja com frete), patrocínios, uso de infraestrutura. App iOS/Android e área logada com conteúdo técnico.
- **Público**: produtores de MT, consultores e agrônomos, indústria de insumos/sementes/máquinas, pecuaristas, ICTs e universidades.
- **Diferencial a destacar**: **independência/imparcialidade** + **rede de campos experimentais** + **30+ anos** + especialistas.
- **Redes**: LinkedIn 62,6 mil, Instagram ~36 mil (nov/2026).

## 4. Diagnóstico do site atual (top 10)

1. Sem hero ou proposta de valor; a home abre com carrossel de banners com texto em imagem.
2. Menu com 9 itens redundantes; "Informações Técnicas" só abre o login, sem aviso.
3. Paleta sem sistema (8+ verdes, incluindo o verde padrão do Bootstrap); títulos em "pílulas" de baixo contraste; texto cinza abaixo do AA.
4. Mobile ruim: cabeçalho de ~410 px, banners e flyers ilegíveis, botões flutuantes sobre o conteúdo.
5. **HTML de até 33 MB** (imagens em base64 em 37 páginas); home com ~8,9 MB e load de ~7 s.
6. 13 páginas com erro 500 e 6 com 404, todas no sitemap ou linkadas; conteúdo "TESTE" e páginas "Em breve" publicadas.
7. HTML do Word vazando como texto (Venda de Insetos), datas falsas em `/servicos`, telefones "() -".
8. Serviços sem processo, preço, entregável ou formulário dedicado; nenhum funil de conversão.
9. Conteúdo desatualizado: última notícia em 27/07/2026; relatório de atividades de 2021.
10. Bons ativos subutilizados: fotos aéreas dos CADs, equipe com currículo, JSON-LD já implementado, políticas LGPD recentes, estações meteorológicas.

## 5. Decisões e recomendações já tomadas (propostas, aguardando validação do cliente)

- **Arquitetura**: Pesquisa · Serviços · Eventos · Conteúdo técnico · A Fundação · Contato (detalhe em `05 §3`).
- **Funis**: Produtor → orçamento/evento · Empresa → proposta de pesquisa/patrocínio · Todos → cadastro/app/Boletim.
- **Mensagem do hero**: "Pesquisa agronômica independente para quem produz em Mato Grosso."
- **Visual**: conceito "Ciência no campo"; paleta derivada do logo (`#4A8B42` marca, `#2F7A3B` ação, `#8DC63F` acento, `#1F3D24` escuro, neutros quentes); 2 famílias tipográficas (títulos: Bricolage Grotesque, Sora ou Manrope, ou Barlow por continuidade; texto: Inter ou Source Sans 3); fotos reais (drone dos CADs).
- **Templates**: Home, Área de pesquisa, Serviço, CAD, Evento, Notícia, Equipe, Laboratório, Publicações, Contato, Transparência.
- **Técnico (sugestão, não decidido)**: SSG/SSR moderno (Astro ou Next.js) + CMS headless; mobile-first; metas de desempenho (home ≤ 1,5 MB, LCP < 2,5 s); **301 de todos os URLs válidos**; JSON-LD ampliado.
- **Direitos**: não reutilizar fotos/logos sem autorização; pedir originais e logo vetorial.

## 6. Como continuar (próxima sessão)

1. Leia `05_ESTRATEGIA_REDESIGN.md` e `06_FONTES_E_PENDENCIAS.md §5` (pendências).
2. Pergunte ao usuário qual é a próxima etapa (ex.: design system, wireframes, protótipo, escolha de stack) e se alguma pendência já foi resolvida pela Fundação.
3. Use os fatos de `01_EMPRESA.md` sem reinventar. Tudo marcado ❓ deve ser confirmado antes de ir para o site.
4. Para conteúdo de páginas, consulte `inventario/paginas.md` (URLs) e o site original. O texto extraído **não** foi versionado; se precisar, baixe de novo a página específica.
5. Ao construir, use as capturas de `screenshots/` só como referência do que evitar.

## 7. Método usado (para reproduzir ou atualizar)

- `curl` do `sitemap.xml` → download de cada URL com intervalo de ~0,3 s → extração de `<main>` com um parser Python stdlib (ignorando modais/cookies) → inventários.
- Navegador embutido: screenshots desktop/mobile, `getComputedStyle` (cores/fontes), `performance` (peso), inspeção de menus e modais.
- Cookies não essenciais recusados; nenhum formulário enviado; nenhum login.
- Scripts e HTML bruto ficaram em diretório temporário da sessão (não versionados).
