# Integrações

O novo site é a camada pública (conteúdo, navegação, captação). Os fluxos transacionais continuam nos sistemas oficiais da Fundação MT até existir uma integração autorizada. **Nenhuma transação, login ou envio é simulado.**

## 1. Fluxos mantidos nos sistemas oficiais

| Fluxo | Destino atual | Onde aparece no site novo |
|---|---|---|
| Login e cadastro ("Área do usuário") | `{LEGACY}/#login` (modal do site atual) | Cabeçalho, menu mobile, Conhecimento, Contato |
| Informações técnicas por área (restritas) | Área logada do site atual | `/conhecimento#informacoes-tecnicas` |
| Inscrição e pagamento de eventos | `{LEGACY}/eventos/<slug>` | Página de cada evento |
| Compra do Boletim de Pesquisa | `{LEGACY}/servicos-por-area/boletim-de-pesquisa` | Serviço Boletim, home, Conhecimento |
| Políticas (privacidade, cookies, LGPD, reembolso, frete, infraestrutura) | `{LEGACY}/transparencia/*` | Rodapé, banner de cookies, Transparência, formulário |
| Pedido de uso de infraestrutura | `{LEGACY}/comite-gestor` | Comitê Gestor, Contato |
| Trabalhe conosco | `atracaodetalentos.totvs.app/trabalheconoscofundacaomt` | Rodapé, Contato |
| Portal do colaborador | `apps.fundacaomt.app.br/Portal-Colaborador` | Rodapé ("Acesso do colaborador") |
| Publicações (Drive, Hotmart, PDF) | `{LEGACY}/links-uteis/<id>` e PDF do relatório | Conhecimento, home |
| Clima dos CADs | WeatherLink (iframes das páginas oficiais) | Páginas de cada CAD |
| Vídeos | YouTube (`youtube-nocookie.com`) | Notícias com vídeo |
| Mapas | Google Maps (link de busca por coordenadas/endereço) | Centros, Contato |

`{LEGACY}` = `NEXT_PUBLIC_LEGACY_URL` (padrão `https://www.fundacaomt.com.br`).

### Migração de domínio
Quando o site novo assumir `www.fundacaomt.com.br`, o sistema atual (Laravel) precisa continuar acessível em outro endereço, por exemplo `sistema.fundacaomt.com.br`. Depois é preciso:
1. definir `NEXT_PUBLIC_LEGACY_URL` com esse endereço;
2. confirmar que login, carrinho, inscrições, `/links-uteis/<id>` e `/transparencia/*` funcionam lá;
3. apontar as imagens (`next.config.ts › images.remotePatterns` e `src/content/media.ts`) para o novo host ou, de preferência, para arquivos autorizados hospedados com o site.

## 2. Formulário de contato

- Rota: `POST /api/contato` (`src/app/api/contato/route.ts`).
- Validação no navegador e no servidor (nome, e-mail, telefone opcional com DDD, assunto, mensagem ≥ 10 caracteres, consentimento LGPD).
- Anti-spam: campo-armadilha `website` e limite de 5 envios a cada 10 minutos por IP (memória do processo; em várias instâncias, usar um armazenamento compartilhado ou um serviço como Turnstile).
- Entrega: se `CONTACT_WEBHOOK_URL` estiver definida, o JSON é enviado por POST (timeout de 8 s). Serve para RD Station (via automação), Make, Zapier ou um endpoint da Fundação.
- Sem `CONTACT_WEBHOOK_URL`, a API responde **503** e o formulário mostra "O envio direto pelo site ainda não está ativo", com e-mail (texto já preenchido) e WhatsApp. **Nunca aparece "mensagem enviada" sem envio real.**

Campos enviados: `nome, email, telefone, cidade, assunto, detalhe, mensagem, consentimento, origem, enviadoEm`. Os assuntos são `servico, pesquisa, laboratorio, visita, evento, imprensa, infraestrutura, outro`; o `detalhe` é o serviço, a área, o centro ou o laboratório escolhido, para roteamento.

Testado em 25/11/2026: validação (erros ao lado dos campos e foco no primeiro), pré-preenchimento pela URL e resposta 503 com alternativas. **Não testado**: entrega real a um webhook (nenhum configurado).

## 3. Cookies e medição

- Banner próprio com três categorias (essenciais, medição, marketing), salvo em `localStorage` (`fmt-consent-v1`) e reabrível em "Preferências de cookies" no rodapé.
- **Nenhum rastreador é carregado hoje.** O site atual usa GTM `GTM-M4SGK6BN`, Google Analytics, Google Ads, Meta e RD Station. Para ativar: carregar o GTM só após o evento `fmt-consent-change` com `analytics: true` ou `marketing: true` e configurar o Consent Mode no GTM.

## 4. SEO técnico

- `metadata` por página, `canonical`, Open Graph com foto real, `sitemap.xml`, `robots.txt`.
- JSON-LD: `ResearchOrganization` (global), `NewsArticle`, `Event`, `Service`, `Place` (com coordenadas).
- Redirecionamentos do site antigo: `docs/SITEMAP.md`.

## 5. Pendências de integração

- [ ] Definir o destino de `CONTACT_WEBHOOK_URL` com a Fundação (RD Station?).
- [ ] Confirmar se `/#login` abre o modal de login no site atual; criar uma URL de login direta.
- [ ] API ou feed de eventos e notícias para não depender do JSON gerado (CMS headless ou o próprio Laravel).
- [ ] Ativar GTM com consentimento.
- [ ] Hospedagem (Vercel, Node próprio ou container) e o subdomínio do sistema legado.
