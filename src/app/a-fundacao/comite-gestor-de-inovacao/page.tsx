import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { innovationCommittee as ic } from "@/content/institutional";
import { centers } from "@/content/centers";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Comitê Gestor de Inovação",
  description:
    "Como solicitar o uso dos CADs, laboratórios e casas de vegetação da Fundação MT: quem pode pedir, critérios de avaliação e termos.",
  alternates: { canonical: "/a-fundacao/comite-gestor-de-inovacao" },
};

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60 md:p-8">
      <h2 className="font-display text-h3 text-ink">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-ink-soft">
            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-600" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CommitteePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "A Fundação", href: "/a-fundacao" }, { label: "Comitê Gestor de Inovação" }]}
        title="Infraestrutura de pesquisa aberta a parceiros."
        lead={ic.intro[0]}
        image={media.aerialNorte}
      >
        <ButtonLink href={ic.requestHref}>Solicitar uso da infraestrutura</ButtonLink>
        <ButtonLink href={ic.termsHref} variant="secondary">
          Ler os termos de uso
        </ButtonLink>
      </PageHeader>

      <div className="wrap pb-24 md:pb-32">
        <p className="text-lead text-ink-soft measure">{ic.intro[1]}</p>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <List title="Atribuições do comitê" items={ic.duties} />
          <List title="Quem pode solicitar" items={ic.whoCanApply} />
          <List title="Critérios de avaliação" items={ic.criteria} />
          <div className="rounded-[var(--radius-lg)] bg-forest-900 p-7 text-white md:p-8">
            <h2 className="font-display text-h3">Aprovação e uso</h2>
            <p className="mt-5 text-white/80">
              Depois da análise, o solicitante recebe comunicação formal sobre a aprovação, as condições de uso e a disponibilidade de data. O uso pode depender da
              assinatura de:
            </p>
            <ul className="mt-4 space-y-2">
              {ic.terms.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-leaf-400" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/65">{ic.hours}</p>
          </div>
        </div>

        <h2 className="mt-20 font-display text-h2 font-[420] text-ink">Infraestrutura disponível</h2>
        <p className="mt-4 text-lead text-ink-soft measure">
          Laboratórios de Entomologia, Fitopatologia e Nematologia na sede e áreas experimentais em cinco regiões do estado.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {centers.map((c) => (
            <li key={c.slug} className="group overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-line/60">
              <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <p className="font-display text-[1.25rem] text-ink">{c.name}</p>
                <p className="text-sm text-ink-mute">{c.city}, MT</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
