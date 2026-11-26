import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/Primitives";
import { SiteSearch, type SearchEntry } from "@/components/SiteSearch";
import { areas } from "@/content/areas";
import { services } from "@/content/services";
import { labs } from "@/content/labs";
import { centers } from "@/content/centers";
import { events } from "@/content/events";
import { leadOf, news } from "@/content/news";
import { publications } from "@/content/publications";

export const metadata: Metadata = {
  title: "Busca",
  description: "Busque áreas de pesquisa, serviços, centros experimentais, eventos e notícias da Fundação MT.",
  alternates: { canonical: "/busca" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const index: SearchEntry[] = [
    ...areas.map((a) => ({ title: a.title, href: `/pesquisa/${a.slug}`, type: "Pesquisa", text: `${a.summary} ${a.paragraphs.join(" ")} ${a.offerings.flatMap((o) => o.items).join(" ")} ${a.people.map((p) => p.name).join(" ")}` })),
    ...services.map((s) => ({ title: s.title, href: `/servicos/${s.slug}`, type: "Serviços", text: `${s.summary} ${s.intro.join(" ")} ${(s.groups ?? []).flatMap((g) => g.items).join(" ")}` })),
    ...labs.map((l) => ({ title: l.title, href: `/laboratorios/${l.slug}`, type: "Laboratórios", text: `${l.summary} ${l.services.join(" ")}` })),
    ...centers.map((c) => ({ title: c.name, href: `/centros-experimentais/${c.slug}`, type: "Centros experimentais", text: `${c.city} ${c.focus} ${c.areas.join(" ")}` })),
    ...publications.map((p) => ({ title: p.title, href: "/conhecimento", type: "Publicações", text: `${p.topic} ${p.description}` })),
    ...events.map((e) => ({ title: e.title, href: `/eventos/${e.slug}`, type: "Eventos", text: `${e.info} ${e.description.join(" ")}` })),
    ...news.map((n) => ({ title: n.title, href: `/noticias/${n.slug}`, type: "Notícias", text: `${leadOf(n)} ${n.tags.join(" ")}` })),
    { title: "A Fundação", href: "/a-fundacao", type: "Institucional", text: "história missão visão valores conselho curador governança" },
    { title: "Comitê Gestor de Inovação", href: "/a-fundacao/comite-gestor-de-inovacao", type: "Institucional", text: "infraestrutura ICT PD&I uso de laboratório CAD" },
    { title: "Transparência", href: "/a-fundacao/transparencia", type: "Institucional", text: "privacidade LGPD cookies reembolso frete relatório" },
    { title: "Contato", href: "/contato", type: "Institucional", text: "telefone whatsapp e-mail endereço Rondonópolis" },
  ];
  return (
    <>
      <PageHeader crumbs={[{ label: "Busca" }]} title="Buscar no site." />
      <div className="wrap pb-24 md:pb-32">
        <Suspense fallback={null}>
          <SiteSearch index={index} />
        </Suspense>
      </div>
    </>
  );
}
