import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { ContactCta } from "@/components/home/ContactCta";
import { labs } from "@/content/labs";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Laboratórios",
  description: "Laboratórios de Entomologia, Fitopatologia e Nematologia da Fundação MT, em Rondonópolis, cadastrados no PNIPE do MCTI.",
  alternates: { canonical: "/laboratorios" },
};

export default function LabsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Laboratórios" }]}
        title="Três laboratórios na sede, em Rondonópolis."
        lead="Entomologia, Fitopatologia e Nematologia atendem pesquisas próprias, empresas e produtores. Os três estão cadastrados na Plataforma Nacional de Infraestrutura de Pesquisa (PNIPE), do MCTI."
        image={media.aerialSede}
      />
      <div className="wrap pb-24 md:pb-32">
        <ul className="reveal-group grid gap-5 lg:grid-cols-3">
          {labs.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/laboratorios/${l.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] md:p-8"
              >
                <span className="font-display text-[1.75rem] leading-tight text-ink group-hover:text-brand-600">{l.title}</span>
                <span className="mt-2 text-ink-soft">{l.summary}</span>
                <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-5 text-[0.9375rem] text-ink-soft">
                  {l.services.map((s) => (
                    <li key={s} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-brand-600">
                  Ver o laboratório
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
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
