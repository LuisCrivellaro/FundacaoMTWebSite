import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FlaskConical, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { DataGlyph } from "@/components/home/ResearchAreas";
import { ContactCta } from "@/components/home/ContactCta";
import { areas } from "@/content/areas";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Pesquisa",
  description:
    "Nove áreas de pesquisa agronômica da Fundação MT: Entomologia, Fitopatologia, Fitotecnia, Matologia, Nematologia, Solos, Mecanização, Pecuária de Corte e Data Science.",
  alternates: { canonical: "/pesquisa" },
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Pesquisa" }]}
        title="Pesquisa aplicada, do laboratório à lavoura."
        lead="Cada área tem pesquisadores próprios e conduz ensaios nos CADs, em casa de vegetação e nos laboratórios. Empresas e produtores podem contratar pesquisas, palestras e treinamentos de cada área."
        image={media.aerialMedioNorte}
      />

      <section aria-labelledby="lista-areas" className="wrap pb-24 md:pb-32">
        <h2 id="lista-areas" className="sr-only">
          Áreas de pesquisa
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/pesquisa/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-line/60 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="relative block aspect-[16/9] overflow-hidden bg-sand">
                  {a.image ? (
                    <Image
                      src={a.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    />
                  ) : (
                    <DataGlyph />
                  )}
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="font-display text-[1.5rem] leading-tight text-ink group-hover:text-brand-600">{a.title}</span>
                  <span className="mt-2 flex-1 text-[0.9375rem] text-ink-soft">{a.summary}</span>
                  <span className="mt-5 flex items-center justify-between text-sm text-ink-mute">
                    <span>
                      {a.people.length} {a.people.length === 1 ? "pesquisador" : "pesquisadores"}
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            { href: "/centros-experimentais", icon: MapPin, title: "Centros experimentais", text: "A sede e cinco CADs em Sorriso, Nova Mutum, Sapezal, Primavera do Leste e Itiquira." },
            { href: "/laboratorios", icon: FlaskConical, title: "Laboratórios", text: "Entomologia, Fitopatologia e Nematologia, cadastrados no PNIPE." },
            { href: "/pesquisa/equipe", icon: Users, title: "Pesquisadores", text: "Quem conduz os ensaios e responde por cada área." },
          ].map((b) => (
            <Link key={b.href} href={b.href} className="group flex items-start gap-5 rounded-[var(--radius-lg)] bg-forest-900 p-7 text-white transition-colors hover:bg-forest-800">
              <b.icon aria-hidden="true" className="mt-1 size-6 shrink-0 text-leaf-400" strokeWidth={1.75} />
              <span>
                <span className="block font-display text-[1.375rem]">{b.title}</span>
                <span className="mt-1 block text-[0.9375rem] text-white/75">{b.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
