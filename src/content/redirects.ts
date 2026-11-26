/**
 * Redirecionamentos 301 das URLs do site atual (inventário de 21/11/2026,
 * docs/analise-site-atual/inventario/paginas.md) para a nova arquitetura.
 * Notícias e eventos mantêm o mesmo endereço. Ordem importa: regras
 * específicas primeiro.
 */
type Redirect = { source: string; destination: string; permanent: true };
const r = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

const areaSlugs = [
  "data-science",
  "entomologia",
  "fitopatologia",
  "fitotecnia",
  "matologia",
  "mecanizacao-agricola",
  "nematologia",
  "pecuaria",
  "solos-nutricao-e-sistemas-de-producao",
];
const serviceSlugs = [
  "amostragem-de-solo-e-diagnostico-completo",
  "boletim-de-pesquisa",
  "consultoria-agronomica",
  "tecnologia-de-aplicacao-e-variabilidade-espacial",
  "tutoria-nematologica",
  "venda-de-insetos",
];

const insects = [
  "anticarsia-gemmatalis",
  "chloridea-virescens",
  "chrysodeixis-includens",
  "dalbulus-maidis",
  "diceraeus-melacanthus",
  "elasmopalpus-lignosellus",
  "euschistus-heros",
  "helicoverpa-armigera",
  "rachiplusia-nu",
  "spodoptera-cosmioides",
  "spodoptera-eridania",
  "spodoptera-frugiperda",
  "fenologia-do-algodao-f675",
  "kit-de-identificacao-chaveiro-2471",
  "kit-de-identificacao-f099",
  "kit-de-identificacao-fdf4",
];
const soilSteps = [
  "1-pre-levantamento-com-imagens-de-satelite-conhecendo-o-historico-da-area-4927",
  "2-levantamento-in-loco-para-obter-toda-informacao-necessaria-para-a-divisao-das-glebas-4519",
  "3-execucao-da-coleta-sem-contaminacao-e-com-avaliacao-de-amostra-retirada-96c0",
  "4-todas-as-amostras-sao-cadastradas-etiquetadas-e-passam-por-um-processo-rigoroso-dentro-de-um-sistema-tecnologico-para-evitar-troca-de-resultados",
  "5-avaliacao-individual-dos-resultados-laboratoriais-e-comparativo-com-historico-de-resultados-e2bb",
  "6-apresentacao-dos-resultados-em-forma-de-mapas-via-plataforma-digital-da-fundacao-mt-7406",
  "7-recomendacao-de-adubacao-e-corretivo-05d9",
  "amostragem-de-solo-27b9",
];
const consultancy = [
  "acompanhamento-do-desenvolvimento-de-culturas-a01f",
  "estrategias-do-sistemas-de-producao-e-posicionamento-de-cultivares-cf68",
  "gestao-de-dados-plataforma-fmt-id-6799",
  "manejo-para-controle-de-nematoides-93f0",
  "planejamento-e-sugestao-do-manejo-fitossanitario-3bf2",
  "recomendacao-de-corretivos-e-fertilizantes-e032",
];
const precision = [
  "amostragem-de-solo-com-alta-eficiencia-e-qualidade-com-metodologia-propria-estratificando-as-camadas-de-interesse-agronomicos-evitando-contaminacao-das-amostras-para-analises-quimicas-fisicas-e-biologicas",
  "definicao-de-zonas-de-manejo-e-recomendacao-de-aplicacao-de-corretivos-fertilizantes-e-sementes-em-taxa-variada",
  "definicao-e-manejo-de-ambientes-de-producao-atraves-de-ferramentas-para-caracterizacao-da-variabilidade-espacial",
  "direcionamento-das-subdivisoes-de-amostragem-de-solo-de-acordo-com-as-regioes-distintas-do-talhao",
  "estrategias-de-manejo-potencializando-a-rentabilidade-para-cada-ambiente-de-producao-definido",
  "instalacao-e-conducao-de-experimentos-na-propriedade-para-ajuste-fino-das-recomendacoes-e-embasamento-das-tomadas-de-decisoes-validada-pelas-particularidades-locais",
  "levantamentos-a-campo-validando-os-dados-em-funcao-da-realidade-dos-ambientes",
  "mapeamento-com-condutividade-eletrica-do-solo;-indices-vegetativos",
  "preparo-das-equipes-tecnicas-e-operacionais-quanto-a-calibracao-de-maquinas-equipamentos-e-sensores-1",
  "processamento-de-mapas-de-fertilidade",
  "processamento-dos-dados-de-produtividade",
];

export const legacyRedirects: Redirect[] = [
  // Institucional
  r("/sobre-nos", "/a-fundacao"),
  r("/comite-gestor", "/a-fundacao/comite-gestor-de-inovacao"),
  r("/relatorio-de-atividades/:slug*", "/a-fundacao#relatorios"),
  r("/transparencia", "/a-fundacao/transparencia"),
  r("/transparencia/:slug*", "/a-fundacao/transparencia"),
  r("/protecao-de-dados/:slug*", "/a-fundacao/transparencia"),
  r("/fale-conosco", "/contato"),
  r("/links-uteis/:slug*", "/conhecimento"),
  r("/power-bi", "/conhecimento"),
  r("/palestra-e-treinamento/:path*", "/conhecimento"),
  r("/eventos-anteriores", "/eventos?periodo=anteriores"),

  // Áreas de pesquisa
  ...areaSlugs.flatMap((s) => [r(`/area-de-pesquisa/${s}`, `/pesquisa/${s}`), r(`/servicos-por-area/${s}`, `/pesquisa/${s}`)]),
  r("/area-de-pesquisa/lideranca-de-pesquisa-servicos-e-operacoes", "/pesquisa/equipe"),
  r("/servicos-por-area/lideranca-de-pesquisa-servicos-e-operacoes", "/pesquisa/equipe"),
  ...serviceSlugs.flatMap((s) => [r(`/area-de-pesquisa/${s}`, `/servicos/${s}`), r(`/servicos-por-area/${s}`, `/servicos/${s}`)]),
  r("/servicos-por-area/aplicativo", "/conhecimento"),
  r("/area-de-pesquisa/eventos", "/eventos"),
  r("/area-de-pesquisa/servico/:slug", "/pesquisa"),
  r("/area-de-pesquisa/:slug", "/pesquisa"),

  // Itens antigos de /servicos/*
  ...insects.map((s) => r(`/servicos/${s}`, "/servicos/venda-de-insetos")),
  ...soilSteps.map((s) => r(`/servicos/${s}`, "/servicos/amostragem-de-solo-e-diagnostico-completo")),
  ...consultancy.map((s) => r(`/servicos/${s}`, "/servicos/consultoria-agronomica")),
  ...precision.map((s) => r(`/servicos/${s}`, "/servicos/tecnologia-de-aplicacao-e-variabilidade-espacial")),
  r("/servicos/boletim-impresso-2223-0061", "/servicos/boletim-de-pesquisa"),
  r("/servicos/tutoria-nematologica-0d6a", "/servicos/tutoria-nematologica"),
  r("/servicos/download-para-android-a089", "/conhecimento"),
  r("/servicos/download-para-ios", "/conhecimento"),
  r("/servicos/colaboradores-fundacao-mt-72ba", "/servicos"),

  // Estrutura
  r("/area-experimental/:slug", "/centros-experimentais/:slug"),
  r("/laboratorio/:slug", "/laboratorios/:slug"),
];
