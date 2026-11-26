import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { areas } from "@/content/areas";
import { centers } from "@/content/centers";
import { services } from "@/content/services";
import { labs } from "@/content/labs";
import { events } from "@/content/events";
import { news } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${site.url}${path}`;
  const statics = [
    "",
    "/a-fundacao",
    "/a-fundacao/comite-gestor-de-inovacao",
    "/a-fundacao/transparencia",
    "/pesquisa",
    "/pesquisa/equipe",
    "/centros-experimentais",
    "/servicos",
    "/laboratorios",
    "/conhecimento",
    "/eventos",
    "/noticias",
    "/contato",
  ].map((p) => ({ url: u(p), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 }));
  return [
    ...statics,
    ...areas.map((a) => ({ url: u(`/pesquisa/${a.slug}`), priority: 0.7 })),
    ...centers.map((c) => ({ url: u(`/centros-experimentais/${c.slug}`), priority: 0.7 })),
    ...services.map((s) => ({ url: u(`/servicos/${s.slug}`), priority: 0.8 })),
    ...labs.map((l) => ({ url: u(`/laboratorios/${l.slug}`), priority: 0.7 })),
    ...events.map((e) => ({ url: u(`/eventos/${e.slug}`), priority: 0.5 })),
    ...news.map((n) => ({ url: u(`/noticias/${n.slug}`), lastModified: n.date, priority: 0.5 })),
  ];
}
