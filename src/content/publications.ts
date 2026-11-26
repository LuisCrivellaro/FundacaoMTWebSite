import { OFFICIAL } from "./site";

/**
 * Publicações e materiais com destino oficial. Os links /links-uteis/<id>
 * são os redirecionamentos publicados pela própria Fundação MT.
 */
export type Publication = {
  title: string;
  kind: "Boletim" | "Cartilha" | "Informativo" | "Fotos" | "Relatório";
  description: string;
  href: string;
  topic: string;
};

export const publications: Publication[] = [
  {
    title: "Boletim de Pesquisa 22/23",
    kind: "Boletim",
    topic: "Soja, milho e algodão",
    description: "Última edição impressa, à venda no site oficial com envio pelos Correios.",
    href: `${OFFICIAL}/links-uteis/707a6a69-89aa-4b67-90e8-aca392cab374`,
  },
  {
    title: "Boletim de Pesquisa Agronômica 19/20, versão digital",
    kind: "Boletim",
    topic: "Soja, milho e algodão",
    description: "Versão digital do boletim. O link oficial leva à página de venda na Hotmart.",
    href: `${OFFICIAL}/links-uteis/67d0df82-b0fa-4b22-90c5-e7f8ccd00667`,
  },
  {
    title: "Cartilha Nematológica",
    kind: "Cartilha",
    topic: "Nematologia",
    description: "Material de referência da Fundação MT sobre nematoides.",
    href: `${OFFICIAL}/links-uteis/271aa686-8445-4c6c-8d07-4de15281edd7`,
  },
  {
    title: "Relatório de Atividades 2022",
    kind: "Relatório",
    topic: "Institucional",
    description: "Relatório anual de atividades da Fundação MT.",
    href: "https://fundacaomt.com.br/storage/pdf/relatorio_de_atividades_fmt_2022_final.pdf",
  },
  {
    title: "Fotos: Cotton Day Sapezal 2026",
    kind: "Fotos",
    topic: "Eventos",
    description: "Galeria oficial do Fundação MT em Campo – Cotton Day.",
    href: `${OFFICIAL}/links-uteis/6506cfc0-e37e-4879-912f-31f2397aa091`,
  },
  {
    title: "Fotos: 18º Encontro Técnico de Algodão 2026",
    kind: "Fotos",
    topic: "Eventos",
    description: "Galeria oficial do 18º Encontro Técnico de Algodão.",
    href: `${OFFICIAL}/links-uteis/0e96d07d-07e3-4db7-8f02-a8f8ea7fe6e1`,
  },
  {
    title: "Fotos: 26º Encontro Técnico de Soja",
    kind: "Fotos",
    topic: "Eventos",
    description: "Galeria oficial do 26º Encontro Técnico de Soja.",
    href: `${OFFICIAL}/links-uteis/4e7b2f1b-b69c-4916-bb7d-5cde32066359`,
  },
];

/** Áreas com conteúdo técnico exclusivo para usuários cadastrados no site oficial. */
export const restrictedTopics = [
  "Boletim de Pesquisa",
  "Data Science",
  "Entomologia",
  "Eventos",
  "Fitopatologia",
  "Fitotecnia",
  "Matologia",
  "Mecanização Agrícola",
  "Nematologia",
  "Solos, Nutrição e Sistemas de Produção",
  "Tecnologia de Aplicação e Variabilidade Espacial",
];
