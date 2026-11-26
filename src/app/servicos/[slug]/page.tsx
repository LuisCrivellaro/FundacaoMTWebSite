import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { services, getService } from "@/content/services";
import { whatsappLink } from "@/content/site";

// Todas as páginas são pré-geradas no build; a rota pode bloquear na navegação sem custo perceptível.
export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: `${s.title} — Serviços`, description: s.summary, alternates: { canonical: `/servicos/${s.slug}` } };
}

export default async function ServicePage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.summary,
    provider: { "@type": "ResearchOrganization", name: "Fundação MT" },
    areaServed: { "@type": "State", name: "Mato Grosso" },
  };

  return (
    <>
      <PageHeader crumbs={[{ label: "Serviços", href: "/servicos" }, { label: s.title }]} title={s.title} lead={s.summary}>
        <ButtonLink href={s.cta.href}>{s.cta.label}</ButtonLink>
        <ButtonLink href={whatsappLink(`Olá, quero saber mais sobre ${s.title}.`)} variant="secondary">
          Perguntar no WhatsApp
        </ButtonLink>
      </PageHeader>

      <div className="wrap grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-sm font-medium text-brand-600">{s.audienceLabel}</p>
          <div className="mt-4 space-y-5 text-lead text-ink-soft">
            {s.intro.map((p) => (
              <p key={p.slice(0, 24)} className="measure">
                {p}
              </p>
            ))}
          </div>

          {s.steps && (
            <>
              <h2 className="mt-14 font-display text-h3 text-ink">Como funciona</h2>
              <ol className="mt-6 space-y-0">
                {s.steps.map((st, i) => (
                  <li key={st.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {i < s.steps!.length - 1 && <span aria-hidden="true" className="absolute top-10 bottom-0 left-5 w-px bg-line" />}
                    <span className="tabular grid size-10 shrink-0 place-items-center rounded-full bg-forest-900 font-medium text-white">{i + 1}</span>
                    <span className="pt-1.5">
                      <span className="block font-medium text-ink">{st.title}</span>
                      {st.text && <span className="mt-1 block text-ink-soft">{st.text}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          )}

          {s.includes && (
            <>
              <h2 className="mt-14 font-display text-h3 text-ink">{s.slug === "boletim-de-pesquisa" ? "Edições disponíveis" : "O que está incluído"}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.includes.map((it) => (
                  <li key={it} className="flex gap-3 rounded-[var(--radius-md)] bg-white p-4 text-ink ring-1 ring-line/60">
                    <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                    {it}
                  </li>
                ))}
              </ul>
            </>
          )}

          {s.groups?.map((g) => (
            <div key={g.title}>
              <h2 className="mt-14 font-display text-h3 text-ink">{g.title}</h2>
              <ul className="mt-6 space-y-3">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-3 text-ink-soft">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-600" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Contratação">
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[var(--radius-lg)] bg-forest-900 p-7 text-white">
              <p className="font-display text-[1.5rem] leading-tight">Peça um orçamento</p>
              <p className="mt-2 text-white/75">Conte a cultura, o município e o que você precisa. A equipe responde com o escopo e as condições.</p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={s.cta.href} variant="light">
                  {s.cta.label}
                </ButtonLink>
              </div>
            </div>
            {s.responsible && (
              <div className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-line/60">
                <p className="text-sm text-ink-mute">Responsável técnico</p>
                <p className="mt-1 font-medium text-ink">{s.responsible.name}</p>
                <p className="text-[0.9375rem] text-ink-soft">{s.responsible.role}</p>
                {s.responsible.email && (
                  <a href={`mailto:${s.responsible.email}`} className="mt-2 inline-flex min-h-10 items-center gap-2 break-all text-[0.9375rem] text-brand-600 hover:underline">
                    <Mail aria-hidden="true" className="size-4 shrink-0" />
                    {s.responsible.email}
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      <section aria-labelledby="outros-servicos" className="bg-white py-20">
        <div className="wrap">
          <h2 id="outros-servicos" className="font-display text-h3 text-ink">
            Outros serviços
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/servicos/${o.slug}`} className="inline-flex min-h-11 items-center rounded-full bg-paper px-5 font-medium text-ink ring-1 ring-line hover:ring-forest-900/30">
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
