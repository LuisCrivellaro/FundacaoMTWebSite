# Mapa do site

228 páginas geradas no build (`npm run build`), mais a rota de API do contato.

## Navegação principal

```
Início (/)
├─ Pesquisa
│  ├─ Áreas de pesquisa ............ /pesquisa
│  │  └─ 9 áreas ................... /pesquisa/{entomologia, fitopatologia, fitotecnia, matologia, nematologia,
│  │                                  solos-nutricao-e-sistemas-de-producao, mecanizacao-agricola, pecuaria, data-science}
│  ├─ Pesquisadores ................ /pesquisa/equipe
│  ├─ Centros experimentais ........ /centros-experimentais
│  │  └─ 6 centros ................. /centros-experimentais/{centro-de-pesquisa-dario-minoru-hiromoto, cad-norte,
│  │                                  cad-medio-norte, cad-oeste, cad-primavera, cad-sul}
│  └─ Laboratórios ................. /laboratorios
│     └─ 3 laboratórios ............ /laboratorios/laboratorio-de-{entomologia, fitopatologia, nematologia}
├─ Serviços ........................ /servicos
│  └─ 6 serviços ................... /servicos/{amostragem-de-solo-e-diagnostico-completo, consultoria-agronomica,
│                                     tecnologia-de-aplicacao-e-variabilidade-espacial, tutoria-nematologica,
│                                     venda-de-insetos, boletim-de-pesquisa}
├─ Conhecimento .................... /conhecimento (publicações + informações técnicas restritas)
│  └─ Notícias ..................... /noticias (busca, temas, paginação: ?q= &tema= &pagina=)
│     └─ 130 notícias .............. /noticias/<slug> (mesmo slug do site antigo)
├─ Eventos ......................... /eventos (?periodo=anteriores, ?serie=)
│  └─ 49 eventos ................... /eventos/<slug> (mesmo slug do site antigo)
├─ A Fundação ...................... /a-fundacao (história, marcos, missão, governança, relatórios)
│  ├─ Comitê Gestor de Inovação .... /a-fundacao/comite-gestor-de-inovacao
│  └─ Transparência ................ /a-fundacao/transparencia
├─ Contato ......................... /contato (?assunto= &servico= &area= &centro= &laboratorio=)
└─ Busca ........................... /busca (?q=), noindex
```

Arquivos técnicos: `/sitemap.xml` (216 URLs), `/robots.txt`, `404` personalizada, `POST /api/contato`.

## Redirecionamentos do site antigo

Definidos em `src/content/redirects.ts` (permanentes, HTTP 308, que os buscadores tratam como 301):

| Antigo | Novo |
|---|---|
| `/sobre-nos` | `/a-fundacao` |
| `/comite-gestor` | `/a-fundacao/comite-gestor-de-inovacao` |
| `/transparencia/*`, `/protecao-de-dados/*` | `/a-fundacao/transparencia` |
| `/relatorio-de-atividades/*` | `/a-fundacao#relatorios` |
| `/fale-conosco` | `/contato` |
| `/area-de-pesquisa/<área>`, `/servicos-por-area/<área>` | `/pesquisa/<área>` |
| `/area-de-pesquisa/lideranca-...`, `/servicos-por-area/lideranca-...` | `/pesquisa/equipe` |
| `/area-de-pesquisa/<serviço>`, `/servicos-por-area/<serviço>` | `/servicos/<serviço>` |
| `/area-de-pesquisa/servico/*` e áreas vazias | `/pesquisa` |
| `/servicos/<espécie de inseto ou kit>` (16 URLs) | `/servicos/venda-de-insetos` |
| `/servicos/<etapa da amostragem>` (8) | `/servicos/amostragem-de-solo-e-diagnostico-completo` |
| `/servicos/<item da consultoria>` (6) | `/servicos/consultoria-agronomica` |
| `/servicos/<item de precisão>` (11) | `/servicos/tecnologia-de-aplicacao-e-variabilidade-espacial` |
| `/area-experimental/<slug>` | `/centros-experimentais/<slug>` |
| `/laboratorio/<slug>` | `/laboratorios/<slug>` |
| `/eventos-anteriores` | `/eventos?periodo=anteriores` |
| `/links-uteis/*`, `/power-bi`, `/palestra-e-treinamento/*`, `/servicos-por-area/aplicativo` | `/conhecimento` |

Testados no navegador: `/sobre-nos`, `/area-de-pesquisa/entomologia`, `/servicos-por-area/entomologia` e `/servicos/helicoverpa-armigera`.

⚠️ `/links-uteis/*` e `/transparencia/*` hoje são destinos do sistema antigo. Na troca de domínio, o sistema antigo precisa ir para um subdomínio (ver `INTEGRATIONS.md`), senão esses links passam a cair nos próprios redirecionamentos.
