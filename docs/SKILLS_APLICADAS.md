# Skills aplicadas

Nenhuma das cinco skills estava instalada no ambiente. Os repositórios foram clonados (`git clone --depth 1`) numa pasta temporária da sessão, só para leitura. **Nada foi instalado em `~/.claude` nem no projeto.** Scripts que baixam binários ou abrem Chrome headless não foram executados: são código de terceiros sem revisão, e a regra do projeto é não executar arquivos não verificados. Onde a skill depende desses scripts, apliquei os critérios manualmente e registro isso abaixo.

| Skill | Versão lida | Leitura | Execução | Uso real |
|---|---|---|---|---|
| Taste Skill (leonxlnx/taste-skill) | 2.5.1 | `SKILL.md` completo | `gate.mjs`, `copy-lint.mjs`, `consistency.mjs`, `check.mjs` **não executados** | Regras aplicadas à mão |
| Impeccable (pbakaus/impeccable) | 4.10.0 | `SKILL.md`, `reference/craft-floor.md` | Launcher `scripts/impeccable` (binário baixado na 1ª execução) **não executado** | Caminho "Launcher unavailable" da própria skill: contexto lido direto e craft floor aplicado |
| Humanizer (blader/humanizer) | atual | `SKILL.md` (padrões §1–§26) | Não tem scripts | Revisão dos textos escritos para o site |
| Web Design Guidelines (vercel-labs) | 1.1.0 | `SKILL.md` + `references/command.md` | Não tem scripts | Checklist aplicado ao código e verificado no navegador |
| UI UX Pro Max (nextlevelbuilder) | atual | `SKILL.md`, dados CSV | `scripts/search.py` **executado** (Python, só leitura de CSV; imports conferidos antes: sem rede nem subprocessos) | Busca de design system e tipografia |

## Taste Skill — direção de arte

Aplicado:
- **Fotografia real em vez de "mood"**: hero, centros e serviços com fotos aéreas originais da Fundação; nenhuma foto de banco.
- **Nenhuma legenda sob imagem** (regra 1). Os créditos e o status ficam em `CONTENT_SOURCES.md`.
- **Entrada única do hero** e **um momento por página longa** (frase com destaque por rolagem na home). Sem fade em todos os cartões, sem parallax em texto, sem tilt, sem carrossel automático.
- **Hover discreto**: cartões sobem 2 px, fotos fazem zoom 1,03, botões pressionam (0,97) e sublinhados se desenham.
- **Margens iguais** (`.wrap`) e a mesma grade de 12 colunas em todas as páginas.
- **Sem violeta**, paleta tirada do logotipo.
- **Fatos reais**: nenhum número, depoimento ou cliente inventado (seção "Never").

Ajustado ao projeto (com justificativa):
- Regra 9 (endereços sem número, telefones fictícios, contatos `.example`) vale para clientes fictícios. Aqui o cliente é real e os contatos são os oficiais.
- "Uma seção por tela": seguido na home em desktop; no celular as seções crescem com o conteúdo, como a própria skill admite.

Não feito: gate automatizado (relatório `GATE:`), varredura de copy-lint e screenshots padronizados da skill.

## Impeccable — refinamento

Craft floor aplicado e conferido no navegador:
- **Contraste**: todos os pares de cor medidos (tabela em `DESIGN_SYSTEM.md`); texto secundário ≥ 5,4:1.
- **Proibições respeitadas**: nenhum eyebrow acima de títulos (removi o que eu havia colocado no hero), sem números de seção, sem texto em gradiente, sem borda lateral em caixas arredondadas, sem glassmorphism decorativo, sem emoji como ícone, sem fonte de sistema como display.
- **Profundidade**: sombras com deslocamento e desfoque.
- **Tipografia**: medida de 65–75 caracteres, display até ~92 px, tracking mínimo −0,025em, títulos balanceados.
- **Movimento**: um momento de autoria, ease-out exponencial partindo de estado visível.
- **Estados**: hover, foco, pressionado, carregando, erro, vazio e sucesso.
- **Superfícies do navegador**: seleção, cursor, barra de rolagem, anel de foco e algarismos tabulares tematizados.
- Modo "Persuade" na home; "Read" e "Operate" nas páginas internas (mais contenção).

## Humanizer — linguagem

Aplicado aos textos que **escrevi** (títulos, resumos, CTAs, mensagens de formulário). Os textos das notícias são da Fundação e foram mantidos como publicados.
- Varredura por travessões, palavras infladas ("inovador", "excelência", "referência", "transformar", "de ponta") e tríades: só sobraram travessões em separadores de título de página (convenção de `<title>`). Troquei "Fotos — X" por "Fotos: X".
- Cortei frases sem fonte: "Conselho presidido por produtores desde a criação", "WhatsApp atende em horário comercial", "responde com prazos", "Desde 2021 os laboratórios…" (virou citação do Relatório 2021).
- CTAs com verbo e objeto: "Pedir orçamento", "Agendar uma visita", "Solicitar análise ou orçamento", "Ir para a inscrição".
- Mensagens de erro dizem o problema e como resolver ("Informe o telefone com DDD.").

## Web Design Guidelines — qualidade técnica

Verificado no código e no navegador (resultados em `AUDITORIA_FINAL.md`):
- Botões de ícone com `aria-label`; ícones decorativos com `aria-hidden`; links para navegação e botões para ações.
- `:focus-visible` em tudo, nenhum `outline: none` sem substituto; skip link aparece no primeiro Tab.
- Formulário: `autocomplete`, `type` e `inputMode` corretos, `spellCheck={false}` no e-mail, rótulos clicáveis, erros ao lado dos campos, foco no primeiro erro, botão desabilitado só durante o envio, placeholders terminando em "…", `aria-live` para status.
- Animação: só `transform`/`opacity`/`filter`, nada de `transition: all`, `prefers-reduced-motion` respeitado.
- Tipografia: "…" em vez de "...", `text-wrap: balance`, `tabular-nums`.
- Datas com `Intl.DateTimeFormat` (pt-BR, fuso America/Cuiaba).
- Imagens com dimensões ou `fill` + contêiner com proporção; `priority` só no hero.
- Estado na URL: filtros de notícias (`?q`, `?tema`, `?pagina`), eventos (`?periodo`, `?serie`), busca (`?q`), contato (`?assunto`…).
- `touch-action: manipulation`, `overscroll-behavior` no menu mobile e `safe-area-inset` no menu.

Não seguido de propósito: "Title Case" em títulos e botões (regra para inglês; em português usamos caixa de sentença).

## UI UX Pro Max — sistema visual

Buscas executadas:
1. `"agriculture research institute scientific credibility editorial" --design-system` → padrão **Enterprise Gateway** (seleção por perfil, mega-menu, sinais de confiança); paleta vermelho/azul e fonte Exo/Roboto Mono.
2. `"agriculture farm research" --design-system` → padrão Feature-Rich Showcase; estilo Organic Biophilic; paleta verde-terra com acento dourado.
3. `"editorial institutional serif grotesk" --domain typography` → pares serifados editoriais.

Adotado: mega-menu; caminhos por perfil (serviços agrupados por público; formulário com assunto e destino); sinais de confiança (PNIPE, ICT, governança, fatos verificáveis); checklist de entrega (sem emoji, cursor, hover de 150–300 ms, contraste 4,5:1, foco visível, movimento reduzido, testes em 375/768/1024/1440); combinação serifa + grotesca.

Rejeitado: as paletas sugeridas (descaracterizariam a marca, que é verde) e Exo/Roboto Mono (aspecto "sci-fi"; mono seria fantasia técnica, como alerta a Impeccable). O prompt pedia fontes do Fontshare.

## Conflitos resolvidos

| Conflito | Decisão |
|---|---|
| TerraKind usa rótulos "02 // Mission" × Impeccable proíbe eyebrow | Títulos de duas frases (afirmação + complemento suave), sem rótulo |
| Taste pede telefones fictícios × cliente real | Contatos oficiais verificados |
| UI UX Pro Max sugere paleta não verde × identidade | Paleta do logotipo |
| Solarify tem palavras que se revelam × legibilidade | Usado uma vez, com opacidade mínima de 0,3 e texto inteiro sob movimento reduzido |
