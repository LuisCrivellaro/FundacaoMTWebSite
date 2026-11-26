import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, SectionHeading, Avatar } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCta } from "@/components/home/ContactCta";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { history, timeline, councilPresidents, currentLeadership, reports } from "@/content/institutional";
import { leadership } from "@/content/areas";

export const metadata: Metadata = {
  title: "A Fundação",
  description:
    "A Fundação MT foi criada em 1993 por 23 produtores. Conheça a história, a missão, os valores e a governança da instituição de pesquisa agropecuária de Mato Grosso.",
  alternates: { canonical: "/a-fundacao" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "A Fundação" }]}
        title="Criada por produtores para responder às perguntas do campo."
        lead={`A ${site.legalName} existe desde ${site.founded}. Hoje faz pesquisa aplicada em nove áreas, em cinco centros experimentais e três laboratórios.`}
        image={media.aerialSede}
      />

      <section aria-labelledby="historia" className="wrap grid gap-12 pb-24 md:pb-32 lg:grid-cols-12">
        <h2 id="historia" className="font-display text-h2 font-[420] text-ink lg:col-span-4">
          Nossa história
        </h2>
        <div className="space-y-6 text-lead text-ink-soft lg:col-span-7 lg:col-start-6">
          {history.map((p) => (
            <p key={p.slice(0, 20)} className="measure">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="linha-do-tempo" className="bg-white py-24 md:py-32">
        <div className="wrap">
          <SectionHeading id="linha-do-tempo" title="Marcos." muted="Datas publicadas pela própria Fundação MT." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((t) => (
              <li key={t.year} className="bg-white p-7 md:p-8">
                <span className="tabular font-display text-[2.75rem] leading-none text-brand-500">{t.year}</span>
                <p className="mt-4 text-ink-soft">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="missao" aria-labelledby="missao-titulo" className="wrap py-24 md:py-32">
        <h2 id="missao-titulo" className="sr-only">
          Missão, visão, propósito e valores
        </h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            { t: "Missão", d: site.mission },
            { t: "Visão", d: site.vision },
            { t: "Propósito", d: site.purpose },
          ].map((b) => (
            <div key={b.t} className="rounded-[var(--radius-lg)] bg-white p-8 ring-1 ring-line/60">
              <h3 className="text-sm font-medium text-brand-600">{b.t}</h3>
              <p className="mt-4 font-display text-[1.5rem] leading-snug text-ink">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-[var(--radius-lg)] bg-forest-900 p-8 text-white md:p-10">
          <h3 className="text-sm font-medium text-leaf-400">Nosso jeito</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
            {site.values.map((v) => (
              <li key={v} className="font-display text-[1.375rem] leading-snug">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="governanca" aria-labelledby="governanca-titulo" className="bg-white py-24 md:py-32">
        <div className="wrap">
          <SectionHeading
            id="governanca-titulo"
            title="Governança."
            muted="Conselho Curador e diretoria."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {currentLeadership.map((p) => (
              <li key={p.name} className="flex items-center gap-6 rounded-[var(--radius-lg)] bg-paper p-6 ring-1 ring-line/60">
                <span className="relative size-24 shrink-0 overflow-hidden rounded-full bg-sand">
                  <Image src={p.photo} alt={`Foto de ${p.name}`} fill sizes="96px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-display text-[1.5rem] text-ink">{p.name}</span>
                  <span className="block text-ink-soft">{p.role}</span>
                  {p.period && <span className="block text-sm text-ink-mute">{p.period}</span>}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="mt-16 font-display text-h3 text-ink">Ex-presidentes do Conselho Curador</h3>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {councilPresidents.map((p) => (
              <li key={p.name}>
                <span className="relative block aspect-square overflow-hidden rounded-[var(--radius-md)] bg-sand">
                  <Image src={p.photo} alt={`Foto de ${p.name}`} fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-cover grayscale-[35%]" />
                </span>
                <span className="mt-3 block font-medium text-ink">{p.name}</span>
                <span className="tabular block text-sm text-ink-mute">{p.period}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-16 font-display text-h3 text-ink">Liderança técnica</h3>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {leadership.map((p) => (
              <li key={p.name} className="rounded-[var(--radius-lg)] bg-paper p-6 ring-1 ring-line/60">
                <div className="flex items-center gap-4">
                  <Avatar name={p.name} photo={p.photo} size={64} />
                  <span>
                    <span className="block font-medium text-ink">{p.name}</span>
                    <span className="block text-sm text-ink-mute">{p.role}</span>
                  </span>
                </div>
                {p.bio && <p className="mt-4 text-[0.9375rem] text-ink-soft">{p.bio}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="relatorios" aria-labelledby="relatorios-titulo" className="wrap py-24 md:py-32">
        <SectionHeading id="relatorios-titulo" title="Relatórios e transparência." muted="Documentos institucionais e políticas." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reports.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="text-sm font-medium text-brand-600">PDF</span>
              <span className="mt-2 font-display text-[1.375rem] text-ink">{r.title}</span>
              <span className="mt-2 text-ink-soft">{r.text}</span>
              <ArrowUpRight aria-hidden="true" className="mt-6 size-5 text-ink-mute group-hover:text-brand-600" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          ))}
          <div className="flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60 md:col-span-2">
            <p className="text-lead text-ink-soft">
              Políticas de privacidade, termos de uso da infraestrutura, regras de compra e reembolso e a cartilha LGPD estão reunidos na página de transparência.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/a-fundacao/transparencia" variant="secondary">
                Ver transparência
              </ButtonLink>
              <ButtonLink href="/a-fundacao/comite-gestor-de-inovacao" variant="secondary">
                Comitê Gestor de Inovação
              </ButtonLink>
            </div>
          </div>
        </div>

      </section>

      <ContactCta />
    </>
  );
}
