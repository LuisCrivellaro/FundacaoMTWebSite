import data from "./generated/events.json";

/** Eventos do Programa de Difusão de Tecnologia — fonte: /eventos/* do site oficial. */
export type EventLot = { lot: string; label: string; price: string; status: string };
export type EventItem = {
  slug: string;
  title: string;
  info: string;
  description: string[];
  date: string | null;
  startDate: string | null;
  attendance: string;
  image: string | null;
  lots: EventLot[];
  sourceUrl: string;
};

type Raw = EventItem & { offers?: unknown; endDate?: string | null };

/** Informações complementares confirmadas em outras páginas oficiais. */
const extra: Record<string, { venue?: string; summary?: string }> = {
  "vii-encontro-tecnico-de-milho-932f": {
    venue: "Hotel Gran Odara, Cuiabá (MT)",
    summary:
      "Encontro técnico da Fundação MT dedicado à cultura do milho, com pesquisadores, produtores, consultores e a cadeia produtiva.",
  },
  "18o-encontro-tecnico-de-algodao-2d9b": {
    venue: "Hotel Gran Odara, Cuiabá (MT)",
    summary:
      "Painéis sobre a cotonicultura com pesquisadores, produtores rurais, consultores, técnicos e profissionais da indústria.",
  },
};

export const events: (EventItem & { venue?: string; summary?: string; sortDate: string })[] = (data as Raw[])
  .map((e) => {
    const sortDate = e.date ?? (e.startDate ? e.startDate.slice(0, 10) : "0000-00-00");
    return {
      slug: e.slug,
      title: e.title.replace(/\s{2,}/g, " ").trim(),
      info: e.info,
      description: e.description.filter((d) => d.length > 3 && !/^Confira as fotos do último$|^evento$/.test(d)),
      date: e.date,
      startDate: e.startDate,
      attendance: e.attendance,
      image: e.image,
      lots: e.lots,
      sourceUrl: e.sourceUrl,
      sortDate,
      ...extra[e.slug],
    };
  })
  .sort((a, b) => (a.sortDate < b.sortDate ? 1 : -1));

export type EventWithMeta = (typeof events)[number];

/** Série editorial do evento, para agrupar edições anteriores. */
export function seriesOf(title: string) {
  const t = title.toLowerCase();
  if (t.includes("encontro técnico") && t.includes("soja")) return "Encontro Técnico de Soja";
  if (t.includes("encontro técnico") && t.includes("algod")) return "Encontro Técnico de Algodão";
  if (t.includes("encontro técnico") && t.includes("milho")) return "Encontro Técnico de Milho";
  if (t.includes("encontro técnico") && t.includes("pecu")) return "Encontro Técnico de Pecuária";
  if (t.includes("em campo") || t.includes("visita técnica")) return "Fundação MT em Campo";
  if (t.includes("escola de herbicidas")) return "Escola de Herbicidas";
  if (t.includes("circuito")) return "Circuito do Conhecimento";
  if (t.startsWith("live")) return "Lives";
  return "Outros eventos";
}

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

/**
 * Separa próximos e anteriores a partir de uma data (AAAA-MM-DD).
 * Para a data de hoje, use `getEventSplit` de `@/content/event-split` (com cache de 1 hora).
 */
export function splitEvents(today: string) {
  const upcoming = events.filter((e) => e.date && e.date >= today).sort((a, b) => (a.sortDate > b.sortDate ? 1 : -1));
  const past = events.filter((e) => !(e.date && e.date >= today));
  return { today, upcoming, past };
}
