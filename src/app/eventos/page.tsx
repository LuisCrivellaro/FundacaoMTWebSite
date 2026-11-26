import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { EventsBrowser } from "@/components/EventsBrowser";
import { events, getEventSplit, seriesOf } from "@/content/events";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Programa de Difusão de Tecnologia da Fundação MT: Encontros Técnicos de Soja, Milho, Algodão e Pecuária, Fundação MT em Campo, dias de campo e treinamentos.",
  alternates: { canonical: "/eventos" },
};

export default async function EventsPage() {
  const { upcoming, past } = await getEventSplit();
  const series = Object.fromEntries(events.map((e) => [e.slug, seriesOf(e.title)]));
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Eventos" }]}
        title="Encontros técnicos, dias de campo e treinamentos."
        lead="O Programa de Difusão de Tecnologia leva os resultados de pesquisa a produtores, consultores e técnicos, em Cuiabá, nos CADs e online."
      >
        <ButtonLink href="/contato?assunto=evento" variant="secondary">
          Quero patrocinar um evento
        </ButtonLink>
      </PageHeader>
      <div className="wrap pb-24 md:pb-32">
        <Suspense fallback={<p className="text-ink-mute">Carregando a agenda…</p>}>
          <EventsBrowser upcoming={upcoming} past={past} series={series} />
        </Suspense>
      </div>
    </>
  );
}
