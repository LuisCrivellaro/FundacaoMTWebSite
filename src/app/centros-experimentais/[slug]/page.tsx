import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Mail, MapPin, Sprout } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { centers, getCenter, mapsLink, visitHours } from "@/content/centers";
import { contact } from "@/content/site";

// Todas as páginas são pré-geradas no build; a rota pode bloquear na navegação sem custo perceptível.
export const instant = false;

export function generateStaticParams() {
  return centers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/centros-experimentais/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCenter(slug);
  if (!c) return {};
  return {
    title: `${c.name} — ${c.city}`,
    description: `${c.name}, centro experimental da Fundação MT em ${c.city} (MT). ${c.focus}`,
    alternates: { canonical: `/centros-experimentais/${c.slug}` },
    openGraph: { images: [{ url: c.image.src, alt: c.image.alt }] },
  };
}

export default async function CenterPage({ params }: PageProps<"/centros-experimentais/[slug]">) {
  const { slug } = await params;
  const c = getCenter(slug);
  if (!c) notFound();
  const others = centers.filter((x) => x.slug !== c.slug);
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: c.name,
    address: { "@type": "PostalAddress", addressLocality: c.city, addressRegion: "MT", addressCountry: "BR" },
    ...(c.coords ? { geo: { "@type": "GeoCoordinates", latitude: c.coords.lat, longitude: c.coords.lng } } : {}),
    containedInPlace: { "@type": "ResearchOrganization", name: "Fundação MT" },
  };

  return (
    <>
      <div className="wrap pt-6">
        <Breadcrumbs items={[{ label: "Centros experimentais", href: "/centros-experimentais" }, { label: c.name }]} />
      </div>
      <section aria-labelledby="centro-titulo" className="px-[clamp(0.5rem,0.2rem+1.2vw,1.5rem)] pt-6">
        <div className="relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-[var(--radius-xl)] bg-forest-900 md:min-h-[38rem]">
          <Image src={c.image.src} alt={c.image.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(12_31_19/0.15)_0%,rgb(12_31_19/0.1)_40%,rgb(12_31_19/0.88)_100%)]" />
          <div className="wrap pb-10 text-white md:pb-14">
            <p className="flex items-center gap-2 text-white/80">
              <MapPin aria-hidden="true" className="size-4 text-leaf-400" />
              {c.city}, Mato Grosso{c.founded ? ` · criado em ${c.founded}` : ""}
            </p>
            <h1 id="centro-titulo" className="mt-3 font-display text-h1 font-[420]">
              {c.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lead text-white/85">{c.focus}</p>
          </div>
        </div>
      </section>

      <div className="wrap grid gap-16 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="space-y-5 text-lead text-ink-soft">
            {c.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="measure">
                {p}
              </p>
            ))}
          </div>
          <h2 className="mt-14 font-display text-h3 text-ink">Linhas de pesquisa</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.areas.map((a) => (
              <li key={a} className="rounded-full bg-white px-4 py-2 text-[0.9375rem] text-ink ring-1 ring-line">
                {a}
              </li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-h3 text-ink">Culturas</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.crops.map((a) => (
              <li key={a} className="flex items-center gap-2 rounded-full bg-leaf-100 px-4 py-2 text-[0.9375rem] text-forest-800">
                <Sprout aria-hidden="true" className="size-4" />
                {a}
              </li>
            ))}
          </ul>

          {c.weatherWidget && (
            <>
              <h2 className="mt-14 font-display text-h3 text-ink">Clima agora no {c.name}</h2>
              <p className="mt-2 text-ink-soft">Dados da estação meteorológica instalada no centro (WeatherLink).</p>
              <div className="mt-5 overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-line/60">
                <iframe
                  title={`Estação meteorológica do ${c.name}`}
                  src={c.weatherWidget}
                  loading="lazy"
                  className="h-[260px] w-full border-0"
                />
              </div>
            </>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Visita e contato">
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-line/60">
              <h2 className="font-display text-[1.375rem] text-ink">Visitas</h2>
              <p className="mt-3 flex gap-3 text-ink-soft">
                <Clock aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-600" />
                {visitHours}
              </p>
              {c.coordinator && (
                <div className="mt-5 border-t border-line pt-5">
                  <p className="text-sm text-ink-mute">Coordenação</p>
                  <p className="font-medium text-ink">{c.coordinator.name}</p>
                  <a href={`mailto:${c.coordinator.email}`} className="mt-1 inline-flex min-h-10 items-center gap-2 break-all text-[0.9375rem] text-brand-600 hover:underline">
                    <Mail aria-hidden="true" className="size-4 shrink-0" />
                    {c.coordinator.email}
                  </a>
                </div>
              )}
              {c.contactEmail && (
                <div className="mt-5 border-t border-line pt-5">
                  <p className="text-sm text-ink-mute">Recepção</p>
                  <a href={`mailto:${c.contactEmail}`} className="inline-flex min-h-10 items-center gap-2 text-[0.9375rem] text-brand-600 hover:underline">
                    <Mail aria-hidden="true" className="size-4" />
                    {c.contactEmail}
                  </a>
                  <p className="text-[0.9375rem] text-ink-soft">{contact.phone}</p>
                </div>
              )}
              <div className="mt-6 grid gap-3">
                <ButtonLink href={`/contato?assunto=visita&centro=${c.slug}`}>Agendar uma visita</ButtonLink>
                <ButtonLink href={mapsLink(c)} variant="secondary">
                  Ver no mapa
                </ButtonLink>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="outros-centros" className="bg-white py-20 md:py-24">
        <div className="wrap">
          <h2 id="outros-centros" className="font-display text-h3 text-ink">
            Outros centros
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/centros-experimentais/${o.slug}`} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-sand">
                    <Image src={o.image.src} alt="" fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </span>
                  <span className="mt-3 block font-medium text-ink group-hover:text-brand-600">{o.name}</span>
                  <span className="block text-sm text-ink-mute">{o.city}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
    </>
  );
}
