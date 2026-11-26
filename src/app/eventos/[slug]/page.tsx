import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Video } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { EventCard } from "@/components/cards";
import { events, getEvent, seriesOf } from "@/content/events";
import { external } from "@/content/site";
import { cn } from "@/lib/format";

// Todas as páginas são pré-geradas no build; a rota pode bloquear na navegação sem custo perceptível.
export const instant = false;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/eventos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.summary ?? `${e.title} — ${e.info}. Evento do Programa de Difusão de Tecnologia da Fundação MT.`,
    alternates: { canonical: `/eventos/${e.slug}` },
    openGraph: e.image ? { images: [{ url: e.image, alt: e.title }] } : undefined,
  };
}

const statusStyle: Record<string, string> = {
  ENCERRADO: "bg-sand text-ink-mute",
  "EM BREVE": "bg-leaf-100 text-forest-800",
  "FAÇA SUA INSCRIÇÃO": "bg-brand-600 text-white",
};
const statusLabel: Record<string, string> = { ENCERRADO: "Encerrado", "EM BREVE": "Em breve", "FAÇA SUA INSCRIÇÃO": "Inscrições abertas" };

export default async function EventPage({ params }: PageProps<"/eventos/[slug]">) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();
  const serie = seriesOf(e.title);
  const related = events.filter((x) => x.slug !== e.slug && seriesOf(x.title) === serie).slice(0, 4);
  const online = /online/i.test(e.info);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    ...(e.date ? { startDate: e.date } : {}),
    eventAttendanceMode: online ? "https://schema.org/MixedEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@type": "ResearchOrganization", name: "Fundação MT", url: "https://www.fundacaomt.com.br" },
    ...(e.venue ? { location: { "@type": "Place", name: e.venue } } : {}),
    ...(e.image ? { image: [e.image] } : {}),
  };

  return (
    <>
      <PageHeader crumbs={[{ label: "Eventos", href: "/eventos" }, { label: e.title }]} title={e.title} lead={e.summary}>
        <ButtonLink href={e.sourceUrl}>{e.lots.some((l) => l.status === "FAÇA SUA INSCRIÇÃO") ? "Fazer inscrição no site oficial" : "Ver no site oficial"}</ButtonLink>
      </PageHeader>

      <div className="wrap grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-ink">
            {e.info && (
              <li className="flex items-center gap-2">
                <CalendarDays aria-hidden="true" className="size-5 text-brand-600" />
                {e.info}
              </li>
            )}
            {e.venue && (
              <li className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-5 text-brand-600" />
                {e.venue}
              </li>
            )}
            {online && (
              <li className="flex items-center gap-2">
                <Video aria-hidden="true" className="size-5 text-brand-600" />
                Também online
              </li>
            )}
          </ul>

          {e.description.length > 0 && (
            <div className="mt-10 space-y-5 text-lead text-ink-soft">
              {e.description.map((p) => (
                <p key={p.slice(0, 24)} className="measure">
                  {p}
                </p>
              ))}
            </div>
          )}

          {e.image && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] bg-sand">
              <Image src={e.image} alt={`Arte de divulgação: ${e.title}`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" />
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="inscricoes">
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-line/60">
              <h2 id="inscricoes" className="font-display text-[1.5rem] text-ink">
                Inscrições
              </h2>
              {e.lots.length ? (
                <>
                  <table className="mt-4 w-full text-left text-[0.9375rem]">
                    <caption className="sr-only">Lotes de inscrição</caption>
                    <thead className="text-sm text-ink-mute">
                      <tr>
                        <th scope="col" className="pb-2 font-normal">
                          Lote
                        </th>
                        <th scope="col" className="pb-2 text-right font-normal">
                          Valor
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {e.lots.map((l) => (
                        <tr key={`${l.lot}-${l.price}`}>
                          <td className="py-3">
                            <span className="block font-medium text-ink">{l.lot}</span>
                            <span className="text-sm text-ink-mute">{l.label}</span>
                            {l.status && (
                              <span className={cn("ml-0 mt-1 block w-fit rounded-full px-2 py-0.5 text-xs font-medium", statusStyle[l.status] ?? "bg-sand text-ink")}>
                                {statusLabel[l.status] ?? l.status}
                              </span>
                            )}
                          </td>
                          <td className="tabular py-3 text-right align-top font-medium text-ink">R$ {l.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 text-sm text-ink-mute">Valores e lotes copiados do site oficial em 21/11/2026. Confira lá a situação atual: a compra é feita no sistema oficial.</p>
                </>
              ) : (
                <p className="mt-3 text-ink-soft">As informações de inscrição deste evento estão no site oficial.</p>
              )}
              <div className="mt-5 grid gap-3">
                <ButtonLink href={e.sourceUrl}>Ir para a inscrição</ButtonLink>
              </div>
              <p className="mt-4 text-sm">
                <a href={external.refunds} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-4">
                  Regras de cancelamento e reembolso
                </a>
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] bg-forest-900 p-6 text-white">
              <p className="font-display text-[1.25rem]">Quer patrocinar?</p>
              <p className="mt-1 text-[0.9375rem] text-white/75">Empresas apoiadoras têm espaço nos encontros técnicos.</p>
              <TextLink href="/contato?assunto=evento" tone="light" className="mt-2">
                Falar com a equipe de eventos
              </TextLink>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="mesma-serie" className="bg-white py-20">
          <div className="wrap">
            <h2 id="mesma-serie" className="font-display text-h3 text-ink">
              Outras edições: {serie}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <EventCard event={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
