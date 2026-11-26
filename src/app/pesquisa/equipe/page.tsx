import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHeader, Avatar } from "@/components/ui/Primitives";
import { allResearchers, leadership } from "@/content/areas";
import { centers } from "@/content/centers";

export const metadata: Metadata = {
  title: "Pesquisadores",
  description: "Equipe técnica da Fundação MT: pesquisadores por área, liderança de pesquisa e coordenadores dos centros experimentais.",
  alternates: { canonical: "/pesquisa/equipe" },
};

export default function TeamPage() {
  const people = allResearchers();
  const coordinators = centers.filter((c) => c.coordinator);
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Pesquisa", href: "/pesquisa" }, { label: "Pesquisadores" }]}
        title="Quem conduz a pesquisa."
        lead="Pesquisadores e coordenadores publicados no site da Fundação MT, com a formação informada por cada um."
      />

      <section aria-labelledby="lideranca" className="wrap pb-16">
        <h2 id="lideranca" className="font-display text-h3 text-ink">
          Liderança de Pesquisa, Serviços e Operações
        </h2>
        <ul className="reveal-group mt-6 grid gap-5 md:grid-cols-3">
          {leadership.map((p) => (
            <li key={p.name} className="flex items-center gap-4 rounded-[var(--radius-lg)] bg-white p-5 ring-1 ring-line/60">
              <Avatar name={p.name} photo={p.photo} size={64} />
              <span>
                <span className="block font-medium text-ink">{p.name}</span>
                <span className="block text-sm text-ink-mute">{p.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pesquisadores" className="wrap pb-16">
        <h2 id="pesquisadores" className="font-display text-h3 text-ink">
          Pesquisadores por área
        </h2>
        <ul className="reveal-group mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {people
            .filter((p) => !leadership.some((l) => l.name === p.name))
            .map((p) => (
              <li key={p.name} className="flex flex-col rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-line/60">
                <div className="flex items-center gap-4">
                  <Avatar name={p.name} photo={p.photo} size={72} />
                  <span>
                    <span className="block font-display text-[1.25rem] text-ink">{p.name}</span>
                    <span className="block text-sm text-ink-mute">{p.role}</span>
                  </span>
                </div>
                {p.bio && <p className="mt-4 line-clamp-5 text-[0.9375rem] text-ink-soft">{p.bio}</p>}
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.areas.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/pesquisa/${a.slug}`} className="inline-flex min-h-9 items-center rounded-full bg-leaf-100 px-3 text-[0.8125rem] font-medium text-forest-800 hover:bg-leaf-200">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </section>

      <section aria-labelledby="coordenadores" className="wrap pb-24 md:pb-32">
        <h2 id="coordenadores" className="font-display text-h3 text-ink">
          Coordenação dos centros experimentais
        </h2>
        <ul className="reveal-group mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coordinators.map((c) => (
            <li key={c.slug} className="rounded-[var(--radius-lg)] bg-white p-5 ring-1 ring-line/60">
              <Link href={`/centros-experimentais/${c.slug}`} className="text-sm font-medium text-brand-600 hover:underline">
                {c.name} · {c.city}
              </Link>
              <p className="mt-2 font-medium text-ink">{c.coordinator!.name}</p>
              <a href={`mailto:${c.coordinator!.email}`} className="mt-1 inline-flex min-h-10 items-center gap-2 text-[0.9375rem] text-ink-soft hover:text-brand-600">
                <Mail aria-hidden="true" className="size-4" />
                {c.coordinator!.email}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
