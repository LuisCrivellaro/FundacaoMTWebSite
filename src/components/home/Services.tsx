import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Bug, FlaskConical, Layers, Map, Sprout } from "lucide-react";
import { services } from "@/content/services";
import { media } from "@/content/media";
import { SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";

const icons: Record<string, typeof Sprout> = {
  "amostragem-de-solo-e-diagnostico-completo": Layers,
  "consultoria-agronomica": Sprout,
  "tecnologia-de-aplicacao-e-variabilidade-espacial": Map,
  "tutoria-nematologica": FlaskConical,
  "venda-de-insetos": Bug,
  "boletim-de-pesquisa": BookOpen,
};

export function Services() {
  return (
    <section aria-labelledby="servicos-titulo" className="wrap py-24 md:py-32">
      <SectionHeading
        id="servicos-titulo"
        title="Serviços para a propriedade e para empresas."
        muted="Boa parte deles conduzida pelos próprios pesquisadores."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <div className="group parallax reveal relative min-h-[22rem] overflow-hidden rounded-[var(--radius-lg)] bg-forest-900 lg:col-span-5 lg:row-span-2">
          <div className="parallax-layer">
            <Image
              src={media.aerialPrimavera.src}
              alt={media.aerialPrimavera.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-90 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(12_31_19/0)_35%,rgb(12_31_19/0.85)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
            <p className="max-w-sm font-display text-[1.75rem] leading-tight text-white">Precisa de um ensaio, uma análise ou uma recomendação?</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contato?assunto=servico" variant="light">
                Pedir orçamento
              </ButtonLink>
            </div>
          </div>
        </div>

        <ul className="reveal-group grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {services.map((s) => {
            const Icon = icons[s.slug] ?? Sprout;
            return (
              <li key={s.slug}>
                <Link
                  href={`/servicos/${s.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line/60 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] md:p-7"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-full bg-leaf-100 text-forest-800">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-ink-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600"
                    />
                  </span>
                  <span className="mt-6 text-sm font-medium text-brand-600">{s.audienceLabel}</span>
                  <span className="mt-1 font-display text-[1.375rem] leading-snug text-ink">{s.title}</span>
                  <span className="mt-2 text-[0.9375rem] text-ink-soft">{s.summary}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
