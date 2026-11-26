import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/Primitives";
import { NewsBrowser, type NewsListItem } from "@/components/NewsBrowser";
import { leadOf, news, newsTopics, topicsOf } from "@/content/news";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Notícias, alertas técnicos e resultados de pesquisa da Fundação MT sobre soja, milho, algodão, pecuária e manejo em Mato Grosso.",
  alternates: { canonical: "/noticias" },
};

export default function NewsPage() {
  const items: NewsListItem[] = news.map((n) => ({
    slug: n.slug,
    title: n.title,
    date: n.date,
    image: n.image,
    topics: topicsOf(n),
    excerpt: leadOf(n),
    readingMinutes: n.readingMinutes,
  }));
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Notícias" }]}
        title="Notícias e resultados de pesquisa."
        lead={`${news.length} publicações da Fundação MT, de 2021 a 2026: alertas técnicos, resultados de ensaios e cobertura dos eventos.`}
      />
      <div className="wrap pb-24 md:pb-32">
        <Suspense fallback={<p className="text-ink-mute">Carregando notícias…</p>}>
          <NewsBrowser items={items} topics={newsTopics} />
        </Suspense>
      </div>
    </>
  );
}
