import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { ContactCta } from "@/components/home/ContactCta";
import { centers, visitHours } from "@/content/centers";

export const metadata: Metadata = {
  title: "Centros experimentais",
  description:
    "A sede da Fundação MT em Rondonópolis e os cinco Centros de Aprendizagem e Difusão (CADs) em Sorriso, Nova Mutum, Sapezal, Primavera do Leste e Itiquira.",
  alternates: { canonical: "/centros-experimentais" },
};

export default function CentersPage() {
  const [hq, ...cads] = centers;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Centros experimentais" }]}
        title="Seis endereços de pesquisa em Mato Grosso."
        lead={`A sede, em Rondonópolis, e cinco Centros de Aprendizagem e Difusão (CADs) em regiões agrícolas diferentes. Visitas: ${visitHours.toLowerCase()}.`}
      />

      <div className="wrap pb-24 md:pb-32">
        <Link
          href={`/centros-experimentais/${hq.slug}`}
          className="group relative block overflow-hidden rounded-[var(--radius-xl)] bg-forest-900"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image src={hq.image.src} alt={hq.image.alt} fill priority sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(12_31_19/0)_40%,rgb(12_31_19/0.85)_100%)]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white md:p-10">
            <div>
              <p className="flex items-center gap-2 text-white/75">
                <MapPin aria-hidden="true" className="size-4 text-leaf-400" /> {hq.city}, MT · sede
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-tight">{hq.name}</h2>
              <p className="mt-2 max-w-xl text-white/80">{hq.focus}</p>
            </div>
            <ArrowRight aria-hidden="true" className="size-6 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <ul className="reveal-group mt-5 grid gap-5 md:grid-cols-2">
          {cads.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/centros-experimentais/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-line/60 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="relative block aspect-[16/9] overflow-hidden bg-sand">
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </span>
                <span className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="flex items-center gap-2 text-sm text-ink-mute">
                    <MapPin aria-hidden="true" className="size-4 text-brand-600" />
                    {c.city}, MT{c.founded ? ` · criado em ${c.founded}` : ""}
                  </span>
                  <span className="mt-2 font-display text-[1.75rem] leading-tight text-ink group-hover:text-brand-600">{c.name}</span>
                  <span className="mt-2 text-ink-soft">{c.focus}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ContactCta />
    </>
  );
}
