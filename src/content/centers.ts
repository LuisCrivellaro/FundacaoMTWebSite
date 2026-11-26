import { media, type Media } from "./media";

/**
 * Centros experimentais. Fonte: páginas /area-experimental/* do site oficial
 * (criação, foco, coordenação, horários, mapa e estação meteorológica) e
 * notícias oficiais para o município de cada CAD. Ver docs/CONTENT_SOURCES.md.
 */
export type Center = {
  slug: string;
  name: string;
  short: string;
  city: string;
  founded?: number;
  focus: string;
  paragraphs: string[];
  areas: string[];
  crops: string[];
  coordinator?: { name: string; email: string };
  contactEmail?: string;
  coords?: { lat: number; lng: number };
  weatherWidget?: string;
  image: Media;
  sourceUrl: string;
};

const visitHours = "Segunda a sexta, das 7h às 11h30 e das 13h às 17h20";
export { visitHours };

export const centers: Center[] = [
  {
    slug: "centro-de-pesquisa-dario-minoru-hiromoto",
    name: "Centro de Pesquisa Dario Minoru Hiromoto",
    short: "Sede",
    city: "Rondonópolis",
    focus: "Sede administrativa e laboratórios de Entomologia, Fitopatologia e Nematologia.",
    paragraphs: [
      "A sede da Fundação MT fica em Rondonópolis. Os laboratórios da instituição estão centralizados no Centro de Pesquisa Dario Minoru Hiromoto, o que, segundo o Relatório de Atividades de 2021, facilitou a interação entre as equipes.",
      "É também o endereço de atendimento ao público, recepção de amostras e agendamento de visitas técnicas.",
    ],
    areas: ["Entomologia", "Fitopatologia", "Nematologia"],
    crops: ["Soja", "Milho", "Algodão"],
    contactEmail: "recepcao@fundacaomt.com.br",
    image: media.aerialSede,
    sourceUrl: "https://www.fundacaomt.com.br/area-experimental/centro-de-pesquisa-dario-minoru-hiromoto",
  },
  {
    slug: "cad-norte",
    name: "CAD Norte",
    short: "Norte",
    city: "Sorriso",
    founded: 2019,
    focus: "Solos e sistemas de produção, com ensaios de longa duração.",
    paragraphs: [
      "Com o CAD Norte, criado em 2019, a Fundação MT voltou a ter uma estação de pesquisa na região de Sorriso, onde antes conduzia a maior parte dos ensaios de melhoramento de soja.",
      "Hoje o centro reúne trabalhos de Solos e Sistemas de Produção, Fitopatologia, Entomologia, Matologia, Fitotecnia e Mecanização. Desde 2020 também abriga ensaios de longa duração contratados pela iniciativa privada, com foco na intensificação sustentável dos sistemas de produção.",
    ],
    areas: ["Solos e Sistemas de Produção", "Fitopatologia", "Entomologia", "Matologia", "Fitotecnia", "Mecanização"],
    crops: ["Soja", "Milho", "Algodão", "Plantas de cobertura"],
    coordinator: { name: "Kênia Viscovini", email: "keniaviscovini@fundacaomt.com.br" },
    coords: { lat: -12.44, lng: -55.89 },
    weatherWidget: "https://www.weatherlink.com/embeddablePage/show/71326a9c761c4a098c9e2420c5307586/wide",
    image: media.aerialNorte,
    sourceUrl: "https://www.fundacaomt.com.br/area-experimental/cad-norte",
  },
  {
    slug: "cad-medio-norte",
    name: "CAD Médio Norte",
    short: "Médio Norte",
    city: "Nova Mutum",
    founded: 2013,
    focus: "Pesquisa aplicada aberta ao público durante todo o ano.",
    paragraphs: [
      "O CAD Médio Norte começou em 2013 como um novo modelo de trabalho: além da pesquisa aplicada, o centro recebe o público ao longo do ano em visitas, dias de campo e apresentações de resultados, e serve para levantar demandas diretamente com os produtores.",
      "As linhas de pesquisa envolvem principalmente Fitotecnia, Fitopatologia, Biológicos, Matologia e Mecanização.",
    ],
    areas: ["Fitotecnia", "Fitopatologia", "Biológicos", "Matologia", "Mecanização"],
    crops: ["Soja", "Milho", "Algodão", "Plantas de cobertura"],
    coords: { lat: -13.68, lng: -56.03 },
    weatherWidget: "https://www.weatherlink.com/embeddablePage/show/483b585f4ce8469b9e2da03b3a7f158b/wide",
    image: media.aerialMedioNorte,
    sourceUrl: "https://www.fundacaomt.com.br/area-experimental/cad-medio-norte",
  },
  {
    slug: "cad-oeste",
    name: "CAD Oeste",
    short: "Oeste",
    city: "Sapezal",
    founded: 2015,
    focus: "Algodão de segunda safra e sistemas de produção regionais.",
    paragraphs: [
      "Na região do CAD Oeste, além da soja, o algodão de segunda safra tem grande peso econômico e muitas vezes se torna a cultura principal. Por isso os esforços do centro se concentram em projetos com o algodoeiro em segunda safra, sem deixar de avaliar a soja.",
      "A estação conduz trabalhos de adubação e correção, fertilidade do solo, Fitotecnia, Entomologia, Fitopatologia, Matologia e Nematologia. É ali que acontece o Fundação MT em Campo – Cotton Day.",
    ],
    areas: ["Solos e fertilidade", "Fitotecnia", "Entomologia", "Fitopatologia", "Matologia", "Nematologia"],
    crops: ["Algodão", "Soja"],
    coordinator: { name: "André Vacari", email: "andrevacari@fundacaomt.com.br" },
    coords: { lat: -13.55, lng: -58.82 },
    weatherWidget: "https://www.weatherlink.com/embeddablePage/show/55bcb50522644614bee423bdb68722f2/wide",
    image: media.aerialOeste,
    sourceUrl: "https://www.fundacaomt.com.br/area-experimental/cad-oeste",
  },
  {
    slug: "cad-primavera",
    name: "CAD Primavera",
    short: "Primavera",
    city: "Primavera do Leste",
    founded: 2015,
    focus: "Fitossanidade e sistemas de soja, algodão e milho.",
    paragraphs: [
      "A Fundação MT realiza ensaios na região desde o início da década de 1990. Nos primeiros anos, o trabalho era voltado sobretudo ao melhoramento genético da soja; com o tempo, passou a se concentrar em fitossanidade.",
      "Com a implantação do Centro de Aprendizagem e Difusão, a atuação foi ampliada. Hoje há ensaios de Matologia, Fitopatologia e Biológicos, Entomologia, Fitotecnia e Solos, com soja, algodão, milho e culturas de cobertura.",
    ],
    areas: ["Matologia", "Fitopatologia e Biológicos", "Entomologia", "Fitotecnia", "Solos"],
    crops: ["Soja", "Algodão", "Milho", "Culturas de cobertura"],
    coordinator: { name: "Lucas Queiroz", email: "lucasribeiro@fundacaomt.com.br" },
    coords: { lat: -15.23, lng: -54.14 },
    weatherWidget: "https://www.weatherlink.com/embeddablePage/show/6e14e4fd8f474a5eb5d29f643dac6ba8/wide",
    image: media.aerialPrimavera,
    sourceUrl: "https://www.fundacaomt.com.br/area-experimental/cad-primavera",
  },
  {
    slug: "cad-sul",
    name: "CAD Sul",
    short: "Sul",
    city: "Itiquira",
    founded: 2008,
    focus: "Experimentos de longa duração em sistemas de produção.",
    paragraphs: [
      "O CAD Sul é formado por três áreas experimentais. A maior parte dos ensaios é de Solos e Sistemas de Produção, com soja, milho e culturas de cobertura, além do algodão nos dez primeiros anos.",
      "Ali estão os experimentos de longa duração em sistemas de produção, iniciados junto com a criação do centro a partir de limitações de produtividade observadas nessas culturas. Também há ensaios de Entomologia, Fitotecnia e Matologia.",
    ],
    areas: ["Solos e Sistemas de Produção", "Entomologia", "Fitotecnia", "Matologia"],
    crops: ["Soja", "Milho", "Culturas de cobertura"],
    coordinator: { name: "Mickael Silva", email: "mickaelsilva@fundacaomt.com.br" },
    coords: { lat: -17.16, lng: -54.76 },
    weatherWidget: "https://www.weatherlink.com/embeddablePage/show/4f86543fbc64497a9034f2d78aaf3889/wide",
    image: media.aerialSul,
    sourceUrl: "https://www.fundacaomt.com.br/area-experimental/cad-sul",
  },
];

export function getCenter(slug: string) {
  return centers.find((c) => c.slug === slug);
}

export function mapsLink(c: Center) {
  if (c.coords) return `https://www.google.com/maps/search/?api=1&query=${c.coords.lat},${c.coords.lng}`;
  return "https://www.google.com/maps/search/?api=1&query=Avenida+Ant%C3%B4nio+Teixeira+dos+Santos+1559+Rondon%C3%B3polis+MT";
}
