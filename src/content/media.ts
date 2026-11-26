/**
 * Catálogo central de imagens. Todas as fotografias abaixo são da própria
 * Fundação MT e são carregadas do servidor oficial (não ficam no repositório).
 * STATUS: uso pendente de autorização formal — ver docs/CONTENT_SOURCES.md.
 * Para trocar por arquivos autorizados, basta alterar as URLs aqui.
 */
const S = "https://www.fundacaomt.com.br/storage/images";

export type Media = { src: string; alt: string; width: number; height: number };

export const media = {
  logoHorizontal: {
    src: "https://www.fundacaomt.com.br/images/resources/fundacao-logo.png",
    alt: "Fundação MT",
    width: 928,
    height: 204,
  },
  symbol: {
    src: "https://www.fundacaomt.com.br/images/resources/icone.png",
    alt: "",
    width: 512,
    height: 512,
  },
  // Fotos aéreas originais em alta resolução (Comitê Gestor de Inovação)
  aerialSede: {
    src: `${S}/innovation-committee/1772819686-lNmMlkbuoc.JPG`,
    alt: "Vista aérea do Centro de Pesquisa Dario Minoru Hiromoto, em Rondonópolis",
    width: 4575,
    height: 3051,
  },
  aerialNorte: {
    src: `${S}/innovation-committee/1772820063-rvVjL3dtWH.JPG`,
    alt: "Vista aérea das parcelas experimentais do CAD Norte",
    width: 4000,
    height: 3000,
  },
  aerialMedioNorte: {
    src: `${S}/innovation-committee/1772820099-2K71XtqlJv.JPG`,
    alt: "Vista aérea das parcelas experimentais do CAD Médio Norte entre lavouras",
    width: 5472,
    height: 3648,
  },
  aerialOeste: {
    src: `${S}/experimental-area/banners/cb2ff1e4-400c-4903-9adc-25dc243d1155.png`,
    alt: "Vista aérea do CAD Oeste, com parcelas de pesquisa e lavouras ao redor",
    width: 1168,
    height: 500,
  },
  aerialPrimavera: {
    src: `${S}/innovation-committee/1772820364-WcrgoRCnhH.JPG`,
    alt: "Vista aérea das parcelas experimentais do CAD Primavera",
    width: 4081,
    height: 2915,
  },
  aerialSul: {
    src: `${S}/innovation-committee/1772820423-tetgJjVPkF.jpg`,
    alt: "Vista aérea do CAD Sul: parcelas experimentais coloridas ao lado da rodovia BR-163",
    width: 6804,
    height: 4536,
  },
  // Fotos de campo e de eventos publicadas nas notícias oficiais (originais ≥ 1600 px; fonte em docs/CONTENT_SOURCES.md §3)
  fieldDayAerial: {
    src: `${S}/post/1770842933-bAUD9CGVE3.JPG`,
    alt: "Vista aérea de um dia de campo: tenda, carros e visitantes ao lado das parcelas experimentais",
    width: 4000,
    height: 3000,
  },
  cultivarShowcase: {
    src: `${S}/post/1713895348-FVm3EES0TC.JPG`,
    alt: "Pesquisadora apresenta uma vitrine de cultivares a um grupo de visitantes no campo",
    width: 6000,
    height: 4000,
  },
  soybeanRows: {
    src: `${S}/post/1716934292-xImoGrkwk1.jpeg`,
    alt: "Lavoura de soja em estágio inicial, com duas pessoas caminhando entre as linhas ao fundo",
    width: 4032,
    height: 3024,
  },
  fieldTalk: {
    src: `${S}/post/1768241835-9Lwt8HNvwO.jpeg`,
    alt: "Apresentação técnica sob uma tenda, ao lado de uma lavoura de soja, durante um dia de campo",
    width: 1600,
    height: 1156,
  },
  etSojaAudience: {
    src: `${S}/post/1778099889-u3l3iXOyJE.jpeg`,
    alt: "Plateia acompanha uma palestra no palco do 25º Encontro Técnico de Soja",
    width: 6000,
    height: 3376,
  },
  etPecuariaTalk: {
    src: `${S}/post/1759842712-1udtBf7yD2.jpeg`,
    alt: "Palestrante apresenta dados sobre pastagens no 4º Encontro Técnico de Pecuária",
    width: 5987,
    height: 3369,
  },
  conferenceAudience: {
    src: `${S}/post/1716935920-91eMAhGW7N.jpg`,
    alt: "Auditório cheio acompanha a apresentação de resultados de pesquisa em um encontro técnico",
    width: 5917,
    height: 3329,
  },
  // Áreas de pesquisa (fotos de campo e laboratório)
  entomologia: { src: `${S}/research-area/entomologia.jpg`, alt: "Inseto sobre folha de soja", width: 368, height: 276 },
  fitopatologia: { src: `${S}/research-area/1628521944.jpeg`, alt: "Folha de soja com lesão de doença", width: 960, height: 1280 },
  fitotecnia: { src: `${S}/research-area/fitotecnica.jpg`, alt: "Fileiras de soja em parcela experimental", width: 715, height: 509 },
  matologia: { src: `${S}/research-area/1627933303.png`, alt: "Parcela experimental com cultivo em linhas", width: 369, height: 277 },
  mecanizacao: { src: `${S}/research-area/1753208987-J8TlhUA0PM.jpg`, alt: "Trator e implemento em área de pesquisa", width: 1563, height: 879 },
  nematologia: { src: `${S}/research-area/nematologia.jpg`, alt: "Raízes com sintomas de nematoides", width: 338, height: 253 },
  pecuaria: { src: `${S}/research-area/1625493106.jpg`, alt: "Gado de corte em pastagem", width: 667, height: 667 },
  solos: { src: `${S}/research-area/solos.jpg`, alt: "Palhada sobre o solo em sistema de produção", width: 283, height: 297 },
} satisfies Record<string, Media>;
