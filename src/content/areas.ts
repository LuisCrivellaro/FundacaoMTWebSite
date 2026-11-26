import generated from "./generated/areas.json";
import { media, type Media } from "./media";

export type Person = { name: string; role: string; bio: string; photo: string | null };
export type OfferingGroup = { group: string; items: string[] };
export type Area = {
  slug: string;
  title: string;
  summary: string;
  paragraphs: string[];
  people: Person[];
  offerings: OfferingGroup[];
  image: Media | null;
  sourceUrl: string;
};

type Gen = { slug: string; title: string; paragraphs: string[]; people: Person[]; offerings: OfferingGroup[]; sourceUrl: string };
const g = generated as Record<string, Gen>;

/** Resumos de uma linha, reescritos a partir do texto oficial de cada área. */
const meta: Record<string, { title?: string; summary: string; image: Media | null; extraPeople?: Person[] }> = {
  "data-science": {
    summary: "Planejamento experimental, registro e análise estatística dos ensaios, com ferramentas digitais próprias.",
    image: null,
    extraPeople: [
      { name: "Paulo Souza", role: "Supervisor de Data Science", bio: "", photo: null },
      { name: "Danilo Passos", role: "Pesquisador", bio: "", photo: null },
    ],
  },
  entomologia: {
    summary: "Manejo de pragas em soja, milho e algodão e eficácia de produtos químicos, biológicos e comportamentais.",
    image: media.entomologia,
  },
  fitopatologia: {
    title: "Fitopatologia e Biológicos",
    summary: "Mais de 200 ensaios a campo por safra para encontrar estratégias de controle de doenças.",
    image: media.fitopatologia,
  },
  fitotecnia: {
    summary: "Escolha de cultivares e híbridos: vitrines, interação genótipo × ambiente e época de semeadura.",
    image: media.fitotecnia,
  },
  matologia: {
    summary: "Plantas daninhas: posicionamento de herbicidas e monitoramento de espécies resistentes em Mato Grosso.",
    image: media.matologia,
  },
  "mecanizacao-agricola": {
    summary: "Avaliação técnica e imparcial de máquinas, protótipos e tecnologias de aplicação terrestre e aérea.",
    image: media.mecanizacao,
  },
  nematologia: {
    summary: "Diagnóstico de fitonematoides e validação de produtos químicos e biológicos em todas as fases.",
    image: media.nematologia,
  },
  pecuaria: {
    title: "Pecuária de Corte",
    summary: "Pesquisa com bovinos e pastagens: correção e adubação do solo e manejo do pastejo.",
    image: media.pecuaria,
  },
  "solos-nutricao-e-sistemas-de-producao": {
    summary: "Eficiência de corretivos, fertilizantes e bioestimulantes e manejo dos sistemas de produção.",
    image: media.solos,
  },
};

export const areaOrder = [
  "entomologia",
  "fitopatologia",
  "fitotecnia",
  "matologia",
  "nematologia",
  "solos-nutricao-e-sistemas-de-producao",
  "mecanizacao-agricola",
  "pecuaria",
  "data-science",
] as const;

export const areas: Area[] = areaOrder.map((slug) => {
  const src = g[slug];
  const m = meta[slug];
  return {
    slug,
    title: m.title ?? src.title,
    summary: m.summary,
    paragraphs: src.paragraphs,
    people: [...src.people, ...(m.extraPeople ?? [])],
    offerings: src.offerings,
    image: m.image,
    sourceUrl: src.sourceUrl,
  };
});

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}

/** Liderança técnica (página "Liderança de Pesquisa, Serviços e Operações"). */
export const leadership: Person[] = g["lideranca-de-pesquisa-servicos-e-operacoes"].people;

/** Conteúdo da página de Tecnologia de Aplicação e Variabilidade Espacial (usado em Serviços). */
export const precisionArea = g["tecnologia-de-aplicacao-e-variabilidade-espacial"];

/** Todas as pessoas da equipe técnica, sem repetição, com as áreas em que aparecem. */
export function allResearchers() {
  const map = new Map<string, Person & { areas: { slug: string; title: string }[] }>();
  for (const a of areas) {
    for (const p of a.people) {
      const cur = map.get(p.name);
      if (cur) {
        cur.areas.push({ slug: a.slug, title: a.title });
        if (!cur.photo && p.photo) cur.photo = p.photo;
        if (!cur.bio && p.bio) cur.bio = p.bio;
      } else {
        map.set(p.name, { ...p, areas: [{ slug: a.slug, title: a.title }] });
      }
    }
  }
  return [...map.values()];
}
