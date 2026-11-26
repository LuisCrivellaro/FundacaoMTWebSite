import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHeader, Avatar } from "@/components/ui/Primitives";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { labs, getLab } from "@/content/labs";
import { areas } from "@/content/areas";

// Todas as páginas são pré-geradas no build; a rota pode bloquear na navegação sem custo perceptível.
export const instant = false;

export function generateStaticParams() {
  return labs.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/laboratorios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = getLab(slug);
  if (!l) return {};
  return { title: l.title, description: `${l.title} da Fundação MT: ${l.summary}`, alternates: { canonical: `/laboratorios/${l.slug}` } };
}

export default async function LabPage({ params }: PageProps<"/laboratorios/[slug]">) {
  const { slug } = await params;
  const l = getLab(slug);
  if (!l) notFound();
  const photos = new Map(areas.flatMap((a) => a.people).map((p) => [p.name, p.photo]));
  const areaSlug = slug.replace("laboratorio-de-", "");

  return (
    <>
      <PageHeader crumbs={[{ label: "Laboratórios", href: "/laboratorios" }, { label: l.short }]} title={l.title} lead={l.summary}>
        <ButtonLink href={`/contato?assunto=laboratorio&laboratorio=${l.slug}`}>Solicitar análise ou orçamento</ButtonLink>
        <ButtonLink href={l.pnipe} variant="secondary">
          Cadastro no PNIPE
        </ButtonLink>
      </PageHeader>

      <div className="wrap grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="space-y-5 text-lead text-ink-soft">
            {l.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="measure">
                {p}
              </p>
            ))}
          </div>
          <h2 className="mt-14 font-display text-h3 text-ink">Serviços</h2>
          <ul className="mt-6 grid gap-3">
            {l.services.map((s) => (
              <li key={s} className="flex gap-3 rounded-[var(--radius-md)] bg-white p-4 text-ink ring-1 ring-line/60">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                {s}
              </li>
            ))}
          </ul>
          {l.details && (
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {l.details.map((d) => (
                <div key={d.title} className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-line/60">
                  <h3 className="font-medium text-ink">{d.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-ink-soft">
                    {d.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="responsaveis">
          <div className="lg:sticky lg:top-28">
            <h2 id="responsaveis" className="font-display text-h3 text-ink">
              Responsáveis
            </h2>
            <ul className="mt-6 space-y-4">
              {l.people.map((p) => (
                <li key={p.name} className="flex items-center gap-4 rounded-[var(--radius-lg)] bg-white p-5 ring-1 ring-line/60">
                  <Avatar name={p.name} photo={photos.get(p.name) ?? null} size={56} />
                  <span>
                    <span className="block font-medium text-ink">{p.name}</span>
                    <span className="block text-sm text-ink-mute">{p.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-[var(--radius-lg)] bg-forest-900 p-6 text-white">
              <p className="text-white/80">O laboratório fica no Centro de Pesquisa Dario Minoru Hiromoto, em Rondonópolis.</p>
              <TextLink href="/centros-experimentais/centro-de-pesquisa-dario-minoru-hiromoto" tone="light" className="mt-2">
                Ver endereço e horários
              </TextLink>
            </div>
            <p className="mt-6">
              <Link href={`/pesquisa/${areaSlug}`} className="font-medium text-brand-600 hover:underline">
                Conhecer a área de pesquisa
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
