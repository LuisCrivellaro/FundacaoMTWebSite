import { media, type Media } from "./media";
import { OFFICIAL } from "./site";

/** Laboratórios — fonte: /laboratorio/* do site oficial. */
export type Lab = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  paragraphs: string[];
  services: string[];
  details?: { title: string; items: string[] }[];
  pnipe: string;
  people: { name: string; role: string }[];
  image: Media;
  sourceUrl: string;
};

export const labs: Lab[] = [
  {
    slug: "laboratorio-de-entomologia",
    title: "Laboratório de Entomologia",
    short: "Entomologia",
    summary: "Criação de insetos, bioensaios e qualificação de materiais Bt.",
    paragraphs: [
      "O laboratório mantém populações de diversos insetos para pesquisas sobre a eficácia de produtos biológicos e químicos, conduzidas em laboratório, em casa de vegetação e com infestações artificiais a campo.",
      "Também estuda a biologia e o comportamento de insetos alimentados com diferentes dietas e faz testes de qualificação para o registro de materiais Bt em soja, algodão e milho.",
    ],
    services: ["Avaliação de protocolos de campo", "Criação de insetos", "Ensaios", "Insetos resinados e kit de identificação"],
    details: [
      { title: "Avaliação de protocolos de campo", items: ["Dissecação de mariposas", "Pisos de monitoramento de mariposas", "Teste de tetrazólio e germinação de sementes"] },
      { title: "Criação de insetos", items: ["Cascudinho", "Lagartas", "Percevejos"] },
      {
        title: "Ensaios",
        items: [
          "Bioensaios com produtos químicos e biológicos",
          "Biologia e danos em soja do complexo de lagartas",
          "Casa de vegetação com tratamento de semente, pulverização no sulco e dessecação em soja, milho e algodão",
          "Qualificação de linhagens Bt em soja e algodão com as proteínas Cry e Vip",
        ],
      },
    ],
    pnipe: "https://pnipe.mcti.gov.br/laboratory/38561",
    people: [{ name: "Carlos Bezerra", role: "Pesquisador" }],
    image: media.entomologia,
    sourceUrl: `${OFFICIAL}/laboratorio/laboratorio-de-entomologia`,
  },
  {
    slug: "laboratorio-de-fitopatologia",
    title: "Laboratório de Fitopatologia",
    short: "Fitopatologia",
    summary: "Diagnose de doenças, sanidade de sementes e testes de fungicidas.",
    paragraphs: [
      "O laboratório faz a diagnose de patógenos causadores de doenças, com foco principal nas culturas de soja, algodão e milho.",
      "Para atender à demanda por testes rápidos e variados, oferece ensaios in vitro com diferentes patógenos e fungicidas, em laboratório e em casa de vegetação.",
    ],
    services: [
      "Teste de sanidade de sementes",
      "Diagnose de doenças",
      "Teste de patogenicidade em cultivares",
      "Teste de eficácia de fungicidas",
      "Ensaios em laboratório e em casa de vegetação",
    ],
    pnipe: "https://pnipe.mcti.gov.br/laboratory/38559",
    people: [{ name: "Mônica Müller", role: "Pesquisadora" }],
    image: media.fitopatologia,
    sourceUrl: `${OFFICIAL}/laboratorio/laboratorio-de-fitopatologia`,
  },
  {
    slug: "laboratorio-de-nematologia",
    title: "Laboratório de Nematologia",
    short: "Nematologia",
    summary: "Identificação e quantificação de fitonematoides e teste de raça do NCS.",
    paragraphs: [
      "O laboratório diagnostica os principais fitonematoides que afetam culturas de grande peso econômico em Mato Grosso, apoiando pesquisas, programas de melhoramento e o desenvolvimento de mercado.",
    ],
    services: [
      "Identificação de raça do nematoide de cisto da soja (NCS) em amostras de solo e raízes",
      "Caracterização fenotípica de materiais e linhagens aos principais fitonematoides",
      "Avaliação de nematicidas químicos e biológicos em casa de vegetação",
      "Identificação e quantificação dos principais fitonematoides",
      "Avaliação de genótipos de soja a todas as raças do NCS",
    ],
    details: [
      { title: "1. Recebimento e extração", items: ["Recebimento das amostras", "Armazenamento", "Extração dos nematoides"] },
      { title: "2. Identificação e quantificação", items: ["Heterodera glycines", "Pratylenchus brachyurus", "Rotylenchulus reniformis"] },
      { title: "3. Casa de vegetação", items: ["Inoculação para teste de raça", "Banco de inóculo", "Ensaios e avaliação"] },
      { title: "4. Teste de raça do NCS", items: ["Instalação do ensaio", "Avaliação de genótipos de soja a todas as raças"] },
    ],
    pnipe: "https://pnipe.mcti.gov.br/laboratory/38560",
    people: [
      { name: "Rosângela Silva", role: "Pesquisadora" },
      { name: "Tania Santos", role: "Pesquisadora" },
    ],
    image: media.nematologia,
    sourceUrl: `${OFFICIAL}/laboratorio/laboratorio-de-nematologia`,
  },
];

export function getLab(slug: string) {
  return labs.find((l) => l.slug === slug);
}
