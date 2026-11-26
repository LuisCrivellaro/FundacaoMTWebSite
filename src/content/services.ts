import { media, type Media } from "./media";
import { OFFICIAL } from "./site";

/**
 * Serviços reais publicados em /servicos-por-area/* do site oficial.
 * Textos reescritos a partir do conteúdo oficial; nada de preço ou prazo
 * inventado. Contatos de responsáveis: os publicados nas páginas oficiais.
 */
export type Service = {
  slug: string;
  title: string;
  audience: "produtor" | "empresa" | "todos";
  audienceLabel: string;
  summary: string;
  intro: string[];
  includes?: string[];
  steps?: { title: string; text?: string }[];
  groups?: { title: string; items: string[] }[];
  responsible?: { name: string; role: string; email?: string };
  cta: { label: string; href: string; external?: boolean };
  image: Media;
  sourceUrl: string;
};

export const services: Service[] = [
  {
    slug: "amostragem-de-solo-e-diagnostico-completo",
    title: "Amostragem de Solo e Diagnóstico Completo",
    audience: "produtor",
    audienceLabel: "Para a propriedade",
    summary: "Da imagem de satélite à recomendação de adubação, com amostras rastreadas e mapas na plataforma digital.",
    intro: [
      "A Fundação MT executa a amostragem de solo com metodologia própria, estratificando as camadas de interesse agronômico e evitando contaminação das amostras para análises químicas, físicas e biológicas.",
      "O resultado chega em mapas pela plataforma digital da Fundação MT, comparado ao histórico da área, junto com a recomendação de corretivos e fertilizantes.",
    ],
    steps: [
      { title: "Pré-levantamento com imagens de satélite", text: "Conhecer o histórico da área antes de ir a campo." },
      { title: "Levantamento in loco", text: "Reunir as informações necessárias para dividir as glebas." },
      { title: "Coleta sem contaminação", text: "Com avaliação de cada amostra retirada." },
      { title: "Cadastro e etiquetagem", text: "Todas as amostras passam por um sistema que evita a troca de resultados." },
      { title: "Avaliação dos resultados", text: "Análise individual dos laudos e comparação com o histórico." },
      { title: "Mapas na plataforma digital", text: "Resultados apresentados em mapas da Fundação MT." },
      { title: "Recomendação de adubação e corretivo" },
    ],
    responsible: { name: "Patrícia Matias", role: "Pesquisadora" },
    cta: { label: "Solicitar orçamento de amostragem", href: "/contato?assunto=servico&servico=amostragem-de-solo-e-diagnostico-completo" },
    image: media.solos,
    sourceUrl: `${OFFICIAL}/servicos-por-area/amostragem-de-solo-e-diagnostico-completo`,
  },
  {
    slug: "consultoria-agronomica",
    title: "Consultoria Agronômica",
    audience: "produtor",
    audienceLabel: "Para a propriedade",
    summary: "O conhecimento das áreas de pesquisa da Fundação MT aplicado ao planejamento e ao acompanhamento da sua safra.",
    intro: [
      "A consultoria agronômica reúne o que as diversas áreas de pesquisa da Fundação MT produzem e leva esse conhecimento para a realidade de cada propriedade.",
      "Os dados da consultoria ficam organizados na Plataforma FMT ID.",
    ],
    includes: [
      "Acompanhamento do desenvolvimento das culturas",
      "Amostragem de solo",
      "Estratégias do sistema de produção e posicionamento de cultivares",
      "Gestão de dados na Plataforma FMT ID",
      "Manejo para controle de nematoides",
      "Planejamento e sugestão do manejo fitossanitário",
      "Recomendação de corretivos e fertilizantes",
    ],
    responsible: { name: "Vitor Pierobon", role: "Consultor Agronômico", email: "vitorpierobon@fundacaomt.com.br" },
    cta: { label: "Falar com a consultoria", href: "/contato?assunto=servico&servico=consultoria-agronomica" },
    image: media.fitotecnia,
    sourceUrl: `${OFFICIAL}/servicos-por-area/consultoria-agronomica`,
  },
  {
    slug: "tecnologia-de-aplicacao-e-variabilidade-espacial",
    title: "Tecnologia de Aplicação e Variabilidade Espacial",
    audience: "todos",
    audienceLabel: "Para propriedades e fabricantes",
    summary: "Agricultura de precisão no talhão e protocolos confidenciais para fabricantes de máquinas.",
    intro: [
      "Para empresas de máquinas, a Fundação MT oferece protocolos de pesquisa para avaliar tecnologias atuais e em desenvolvimento, com avaliações comparativas e resultados confidenciais.",
      "Para o produtor, além do acompanhamento das operações mecanizadas, a equipe identifica e maneja a variabilidade espacial com sensores, direciona as amostragens de solo e recomenda estratégias para cada ambiente de produção.",
    ],
    groups: [
      {
        title: "Na propriedade",
        items: [
          "Amostragem de solo estratificada por camadas de interesse agronômico",
          "Definição de zonas de manejo e recomendação em taxa variada",
          "Caracterização da variabilidade espacial e manejo de ambientes de produção",
          "Direcionamento das subdivisões de amostragem conforme as regiões do talhão",
          "Experimentos na propriedade para ajuste fino das recomendações",
          "Mapeamento por condutividade elétrica do solo e índices vegetativos",
          "Processamento de mapas de fertilidade e de dados de produtividade",
        ],
      },
      { title: "Treinamento", items: ["Calibração de máquinas, equipamentos e sensores para equipes técnicas e operacionais"] },
    ],
    cta: { label: "Solicitar proposta", href: "/contato?assunto=servico&servico=tecnologia-de-aplicacao-e-variabilidade-espacial" },
    image: media.mecanizacao,
    sourceUrl: `${OFFICIAL}/servicos-por-area/tecnologia-de-aplicacao-e-variabilidade-espacial`,
  },
  {
    slug: "tutoria-nematologica",
    title: "Tutoria Nematológica",
    audience: "todos",
    audienceLabel: "Para profissionais e empresas",
    summary: "Acompanhamento prático com pesquisadores de Nematologia, da amostragem ao plano de controle.",
    intro: [
      "Tutoria voltada a profissionais e empresas que querem aprofundar o conhecimento sobre o manejo de nematoides nas principais culturas agrícolas.",
      "Com abordagem prática e suporte direto dos pesquisadores, a tutoria ajuda nas decisões de campo, desde a amostragem até o planejamento de estratégias integradas de controle.",
    ],
    responsible: { name: "Tania Santos", role: "Pesquisadora", email: "taniasantos@fundacaomt.com.br" },
    cta: { label: "Pedir informações sobre a tutoria", href: "/contato?assunto=servico&servico=tutoria-nematologica" },
    image: media.nematologia,
    sourceUrl: `${OFFICIAL}/servicos-por-area/tutoria-nematologica`,
  },
  {
    slug: "venda-de-insetos",
    title: "Venda de Insetos",
    audience: "empresa",
    audienceLabel: "Para empresas e pesquisa",
    summary: "Ovos e lagartas criados em laboratório para ensaios, insetos resinados e kits de identificação.",
    intro: [
      "O Laboratório de Entomologia mantém populações de diversos insetos e fornece ovos e lagartas para a realização de ensaios, além de kits de identificação para treinamentos.",
      "A disponibilidade varia: entre em contato para verificar e pedir orçamento.",
    ],
    groups: [
      {
        title: "Lagartas",
        items: [
          "Anticarsia gemmatalis (lagarta-da-soja)",
          "Chloridea virescens (lagarta-das-maçãs)",
          "Chrysodeixis includens (falsa-medideira)",
          "Elasmopalpus lignosellus (lagarta-elasmo)",
          "Helicoverpa armigera",
          "Rachiplusia nu",
          "Spodoptera cosmioides",
          "Spodoptera eridania",
          "Spodoptera frugiperda",
        ],
      },
      {
        title: "Hemípteros",
        items: ["Dalbulus maidis (cigarrinha-do-milho)", "Diceraeus melacanthus (percevejo-barriga-verde)", "Euschistus heros (percevejo-marrom)"],
      },
      { title: "Materiais", items: ["Insetos resinados", "Fenologia do algodão", "Kit de identificação", "Kit de identificação – chaveiro"] },
    ],
    responsible: { name: "Carlos Bezerra", role: "Pesquisador", email: "carlosbezerra@fundacaomt.com.br" },
    cta: { label: "Consultar disponibilidade", href: "/contato?assunto=servico&servico=venda-de-insetos" },
    image: media.entomologia,
    sourceUrl: `${OFFICIAL}/servicos-por-area/venda-de-insetos`,
  },
  {
    slug: "boletim-de-pesquisa",
    title: "Boletim de Pesquisa",
    audience: "todos",
    audienceLabel: "Publicação",
    summary: "A publicação técnica da Fundação MT, com posicionamentos para soja, milho e algodão.",
    intro: [
      "O Boletim de Pesquisa chegou à 20ª edição com temas novos e atualizações nas culturas de soja, milho e algodão, reunindo posicionamentos para o manejo dos sistemas de produção.",
      "A edição traz capítulos sobre contribuições digitais para a agricultura, controle biológico de doenças, microrganismos promotores de crescimento, solos e mitigação das mudanças climáticas, sementes, fisiologia da produção, insetos-praga, adubação, nematoides, plantas daninhas, tecnologia de aplicação e responsabilidade ambiental.",
      "O conteúdo é escrito pela equipe técnica da Fundação MT com pesquisadores e especialistas de outras instituições.",
    ],
    includes: ["Boletim 22/23", "Boletim 19/20", "Super Combo (Boletim 19/20 + 22/23)"],
    cta: { label: "Comprar no site oficial", href: `${OFFICIAL}/servicos-por-area/boletim-de-pesquisa`, external: true },
    image: media.fitotecnia,
    sourceUrl: `${OFFICIAL}/servicos-por-area/boletim-de-pesquisa`,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
