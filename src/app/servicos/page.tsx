import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, GraduationCap, Microscope } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCta } from "@/components/home/ContactCta";
import { services } from "@/content/services";
import { labs } from "@/content/labs";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Amostragem de solo, consultoria agronômica, agricultura de precisão, tutoria nematológica, venda de insetos, análises de laboratório e o Boletim de Pesquisa da Fundação MT.",
  alternates: { canonical: "/servicos" },
};

const groups = [
  { key: "produtor", title: "Para a propriedade", text: "Diagnóstico, planejamento e acompanhamento da safra." },
  { key: "todos", title: "Para profissionais, propriedades e empresas", text: "Agricultura de precisão, capacitação e publicação técnica." },
  { key: "empresa", title: "Para empresas e pesquisa", text: "Material biológico para ensaios e treinamentos." },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Serviços" }]}
        title="Serviços técnicos com a mesma base da pesquisa."
        lead="Os serviços usam a metodologia, os laboratórios e os campos experimentais da Fundação MT. Escolha o serviço e peça um orçamento: a equipe responde com escopo e condições."
        image={media.aerialPrimavera}
      >
        <ButtonLink href="/contato?assunto=servico">Pedir orçamento</ButtonLink>
      </PageHeader>

      <div className="wrap space-y-16 pb-24 md:pb-32">
        {groups.map((g) => {
          const list = services.filter((s) => s.audience === g.key);
          return (
            <section key={g.key} aria-labelledby={`grupo-${g.key}`}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
                <h2 id={`grupo-${g.key}`} className="font-display text-h3 text-ink">
                  {g.title}
                </h2>
                <p className="text-ink-mute">{g.text}</p>
              </div>
              <ul className="mt-6 grid gap-5 md:grid-cols-2">
                {list.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicos/${s.slug}`}
                      className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] md:p-8"
                    >
                      <span className="font-display text-[1.6rem] leading-tight text-ink group-hover:text-brand-600">{s.title}</span>
                      <span className="mt-3 flex-1 text-ink-soft">{s.summary}</span>
                      <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-brand-600">
                        Ver detalhes
                        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section aria-labelledby="grupo-labs">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <h2 id="grupo-labs" className="font-display text-h3 text-ink">
              Análises de laboratório
            </h2>
            <p className="text-ink-mute">Diagnóstico, bioensaios e testes em casa de vegetação.</p>
          </div>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {labs.map((l, i) => {
              const Icon = [Microscope, FlaskConical, GraduationCap][i] ?? Microscope;
              return (
                <li key={l.slug}>
                  <Link href={`/laboratorios/${l.slug}`} className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-forest-900 p-7 text-white transition-colors hover:bg-forest-800">
                    <Icon aria-hidden="true" className="size-6 text-leaf-400" strokeWidth={1.75} />
                    <span className="mt-5 font-display text-[1.4rem] leading-tight">{l.title}</span>
                    <span className="mt-2 flex-1 text-[0.9375rem] text-white/75">{l.summary}</span>
                    <ArrowRight aria-hidden="true" className="mt-6 size-5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <ContactCta />
    </>
  );
}
