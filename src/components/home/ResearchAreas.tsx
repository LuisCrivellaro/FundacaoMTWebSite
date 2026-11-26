import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { areas } from "@/content/areas";
import { media } from "@/content/media";
import { SectionHeading } from "@/components/ui/Primitives";
import { TextLink } from "@/components/ui/Button";

/** Lista editorial das áreas (em vez de grade de cartões iguais). */
export function ResearchAreas() {
  return (
    <section aria-labelledby="areas-titulo" className="bg-white py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          id="areas-titulo"
          title="Nove áreas de pesquisa."
          muted="Uma equipe e uma linha de ensaios em cada uma."
          lead="Os pesquisadores trabalham nos CADs, em casa de vegetação e nos laboratórios, com soja, milho, algodão, plantas de cobertura e pecuária de corte."
        />

        <div className="areas-scope mt-16 grid gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-sand">
              <Image
                src={media.aerialMedioNorte.src}
                alt={media.aerialMedioNorte.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 0px"
                className="areas-photo object-cover"
              />
            </div>
          </div>

          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {areas.map((a) => (
              <li key={a.slug} className="reveal">
                <Link
                  href={`/pesquisa/${a.slug}`}
                  className="group flex items-center gap-5 py-5 transition-colors duration-300 md:gap-7 md:py-6"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-sand md:size-20">
                    {a.image ? (
                      <Image
                        src={a.image.src}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                      />
                    ) : (
                      <DataGlyph />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.5rem] leading-tight text-ink transition-colors group-hover:text-brand-600 md:text-[1.75rem]">
                      {a.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-ink-soft md:text-base">{a.summary}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-ink-mute transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-brand-600"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 lg:justify-end">
          <TextLink href="/pesquisa/equipe">Conhecer os pesquisadores</TextLink>
          <TextLink href="/laboratorios">Ver os laboratórios</TextLink>
        </div>
      </div>
    </section>
  );
}

/** Grafismo de parcelas experimentais (usado onde não há foto própria da área). */
export function DataGlyph() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className="absolute inset-0 size-full">
      <rect width="80" height="80" fill="var(--color-forest-900)" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={10 + c * 15.5}
            y={10 + r * 15.5}
            width="12"
            height="12"
            rx="2"
            fill={(r * 3 + c) % 5 === 0 ? "var(--color-leaf-400)" : (r + c) % 2 ? "var(--color-forest-700)" : "var(--color-brand-500)"}
          />
        )),
      )}
    </svg>
  );
}
