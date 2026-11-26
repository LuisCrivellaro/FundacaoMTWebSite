import data from "./generated/news.json";

/** Notícias publicadas no site oficial (130 artigos com conteúdo; 5 URLs antigas retornam 404). */
export type NewsBlock =
  | { type: "p" | "h" | "li" | "quote"; text: string }
  | { type: "img"; src: string; alt: string }
  | { type: "video"; src: string };

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  category: string;
  tags: string[];
  body: NewsBlock[];
  readingMinutes: number;
  sourceUrl: string;
};

/** Temas editoriais derivados das tags e do título (para filtro). */
const TOPICS: { label: string; match: RegExp }[] = [
  { label: "Soja", match: /\bsoja\b/i },
  { label: "Milho", match: /\bmilho\b|cigarrinha/i },
  { label: "Algodão", match: /algod|bicudo|cotton/i },
  { label: "Pecuária", match: /pecu|pasto|pastagem|bovino|gado/i },
  { label: "Pragas", match: /praga|lagarta|percevejo|inseto|spodoptera|helicoverpa|bicudo|cascudinho|vaquinha/i },
  { label: "Doenças", match: /doen|fung|ferrugem|mancha|podrid/i },
  { label: "Nematoides", match: /nemat/i },
  { label: "Plantas daninhas", match: /daninha|herbicida|buva|capim|vassourinha/i },
  { label: "Solos e nutrição", match: /solo|aduba|fertiliz|nutri|calag|gesso/i },
  { label: "Eventos", match: /encontro técnico|dia de campo|em campo|evento|live|circuito|escola de herbicidas|hora de/i },
];

export const news: NewsItem[] = (data as NewsItem[]).map((n) => ({
  ...n,
  excerpt: n.excerpt.replace(/\.\.\.$/, "…"),
}));

export function topicsOf(n: NewsItem) {
  const hay = `${n.title} ${n.tags.join(" ")}`;
  return TOPICS.filter((t) => t.match.test(hay)).map((t) => t.label);
}

export const newsTopics = TOPICS.map((t) => t.label);

export function getNews(slug: string) {
  return news.find((n) => n.slug === slug);
}

export function relatedNews(item: NewsItem, count = 3) {
  const mine = new Set(topicsOf(item));
  return news
    .filter((n) => n.slug !== item.slug)
    .map((n) => ({ n, score: topicsOf(n).filter((t) => mine.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.n.date < b.n.date ? 1 : -1))
    .slice(0, count)
    .map((x) => x.n);
}

/** Primeiro parágrafo legível do corpo, para cartões e metadados. */
export function leadOf(n: NewsItem) {
  const p = n.body.find((b) => b.type === "p" && "text" in b && b.text.length > 60);
  const text = p && "text" in p ? p.text : n.excerpt;
  return text.length > 220 ? `${text.slice(0, 217).trimEnd()}…` : text;
}
