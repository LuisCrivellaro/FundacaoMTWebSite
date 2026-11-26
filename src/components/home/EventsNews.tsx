import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { getEventSplit } from "@/content/events";
import { news } from "@/content/news";
import { SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { EventCard, NewsCard } from "@/components/cards";

export async function EventsNews() {
  const { upcoming, past } = await getEventSplit();
  const featured = upcoming[0];
  const latest = news.slice(0, 3);
  const open = featured?.lots.find((l) => /FAÇA SUA INSCRIÇÃO/i.test(l.status));

  return (
    <section aria-labelledby="agenda-titulo" className="wrap py-24 md:py-32">
      <SectionHeading id="agenda-titulo" title="Agenda e notícias." muted="Encontros técnicos, dias de campo e resultados de pesquisa." />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {featured ? (
          <article className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-forest-950 text-white lg:col-span-7">
            {featured.image && (
              <div className="relative aspect-[16/9]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="p-7 md:p-9">
              <p className="text-sm font-medium text-leaf-400">Próximo evento</p>
              <h3 className="mt-2 font-display text-[2rem] leading-tight md:text-[2.5rem]">
                <Link href={`/eventos/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h3>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-white/80">
                <span className="flex items-center gap-2">
                  <CalendarDays aria-hidden="true" className="size-4 text-leaf-400" />
                  {featured.info}
                </span>
                {featured.venue && (
                  <span className="flex items-center gap-2">
                    <MapPin aria-hidden="true" className="size-4 text-leaf-400" />
                    {featured.venue}
                  </span>
                )}
              </div>
              {open && <p className="mt-4 text-white/70">Inscrições abertas: {open.lot.toLowerCase()} disponível no site oficial.</p>}
            </div>
          </article>
        ) : (
          <div className="rounded-[var(--radius-lg)] bg-white p-8 ring-1 ring-line/60 lg:col-span-7">
            <p className="font-display text-[1.75rem] text-ink">Nenhum evento com data marcada agora.</p>
            <p className="mt-2 text-ink-soft">A agenda é publicada aqui assim que cada encontro é confirmado.</p>
          </div>
        )}

        <div className="flex flex-col gap-5 lg:col-span-5">
          {(upcoming.slice(1, 3).length ? upcoming.slice(1, 3) : past.slice(0, 2)).map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
          <div className="mt-auto flex flex-wrap gap-3">
            <ButtonLink href="/eventos" variant="secondary">
              Ver todos os eventos
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="mt-20 flex items-end justify-between gap-6 border-t border-line pt-10">
        <h3 className="font-display text-h3 text-ink">Últimas notícias</h3>
        <TextLink href="/noticias">Ver todas</TextLink>
      </div>
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((n) => (
          <NewsCard key={n.slug} item={n} />
        ))}
      </div>
    </section>
  );
}
