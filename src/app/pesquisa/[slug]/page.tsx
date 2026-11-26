import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { PageHeader, Avatar } from "@/components/ui/Primitives";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { NewsCard } from "@/components/cards";
import { areas, getArea } from "@/content/areas";
import { news } from "@/content/news";
import { labs } from "@/content/labs";

const newsMatch: Record<string, RegExp> = {
  entomologia: /praga|lagarta|percevejo|inseto|spodoptera|helicoverpa|bicudo|cigarrinha|cascudinho|entomolog/i,
  fitopatologia: /doen|fung|ferrugem|mancha|podrid|fitopatolog|biológic/i,
  fitotecnia: /cultivar|híbrido|vitrine|semeadura|fitotecn|plantio/i,
  matologia: /daninha|herbicida|buva|capim|matolog/i,
  nematologia: /nemat/i,
  "solos-nutricao-e-sistemas-de-producao": /solo|aduba|fertiliz|nutri|calag|rotação/i,
  "mecanizacao-agricola": /máquina|mecaniz|colheita|pulveriza|aplicação/i,
  pecuaria: /pecu|pasto|pastagem|bovino|gado/i,
  "data-science": /dados|data science|digital/i,
};

const areaLab: Record<string, string> = {
  entomologia: "laboratorio-de-entomologia",
  fitopatologia: "laboratorio-de-fitopatologia",
  nematologia: "laboratorio-de-nematologia",
};

// Todas as páginas são pré-geradas no build; a rota pode bloquear na navegação sem custo perceptível.
export const instant = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pesquisa/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return {
    title: `${area.title} — Pesquisa`,
    description: area.summary,
    alternates: { canonical: `/pesquisa/${area.slug}` },
    openGraph: area.image ? { images: [{ url: area.image.src, alt: area.image.alt }] } : undefined,
  };
}

export default async function AreaPage({ params }: PageProps<"/pesquisa/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();
  const related = news.filter((n) => newsMatch[slug]?.test(`${n.title} ${n.tags.join(" ")}`)).slice(0, 3);
  const lab = areaLab[slug] ? labs.find((l) => l.slug === areaLab[slug]) : undefined;

  return (
    <>
      <PageHeader crumbs={[{ label: "Pesquisa", href: "/pesquisa" }, { label: area.title }]} title={area.title} lead={area.summary} image={area.image && area.image.width >= 700 ? area.image : undefined}>
        <ButtonLink href={`/contato?assunto=pesquisa&area=${area.slug}`}>Propor uma pesquisa ou contratar</ButtonLink>
      </PageHeader>

      <div className="wrap grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-h3 text-ink">Sobre a área</h2>
          <div className="mt-5 space-y-5 text-lead text-ink-soft">
            {area.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="measure">
                {p}
              </p>
            ))}
          </div>

          {area.offerings.length > 0 && (
            <>
              <h2 className="mt-16 font-display text-h3 text-ink">O que você pode contratar</h2>
              <div className="mt-6 divide-y divide-line border-y border-line">
                {area.offerings.map((g, i) => (
                  <details key={g.group} className="group/d" open={i === 0}>
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                      <span>
                        {g.group}
                        <span className="ml-2 text-sm font-normal text-ink-mute">{g.items.length}</span>
                      </span>
                      <ChevronDown aria-hidden="true" className="size-5 text-ink-mute transition-transform group-open/d:rotate-180" />
                    </summary>
                    <ul className="space-y-2 pb-6 text-ink-soft">
                      {g.items.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
              <p className="mt-6 text-[0.9375rem] text-ink-mute">
                Palestras e treinamentos podem ser presenciais ou online. Escreva para combinar formato, data e local.
              </p>
            </>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="equipe-area">
          <div className="lg:sticky lg:top-28">
            <h2 id="equipe-area" className="font-display text-h3 text-ink">
              Equipe
            </h2>
            {area.people.length ? (
              <ul className="mt-6 space-y-5">
                {area.people.map((p) => (
                  <li key={p.name} className="rounded-[var(--radius-lg)] bg-white p-5 ring-1 ring-line/60">
                    <div className="flex items-center gap-4">
                      <Avatar name={p.name} photo={p.photo} size={56} />
                      <span>
                        <span className="block font-medium text-ink">{p.name}</span>
                        <span className="block text-sm text-ink-mute">{p.role}</span>
                      </span>
                    </div>
                    {p.bio && <p className="mt-4 line-clamp-6 text-[0.9375rem] text-ink-soft">{p.bio}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink-soft">A equipe desta área ainda não está publicada no site.</p>
            )}
            {lab && (
              <div className="mt-6 rounded-[var(--radius-lg)] bg-forest-900 p-6 text-white">
                <p className="font-display text-[1.25rem]">{lab.title}</p>
                <p className="mt-1 text-[0.9375rem] text-white/75">{lab.summary}</p>
                <TextLink href={`/laboratorios/${lab.slug}`} tone="light" className="mt-2">
                  Ver o laboratório
                </TextLink>
              </div>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="noticias-area" className="bg-white py-20 md:py-28">
          <div className="wrap">
            <div className="flex items-end justify-between gap-6">
              <h2 id="noticias-area" className="font-display text-h2 font-[420] text-ink">
                Notícias de {area.title}
              </h2>
              <TextLink href="/noticias">Todas as notícias</TextLink>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
