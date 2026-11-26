import type { Metadata } from "next";
import { ArrowUpRight, Lock } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { NewsCard } from "@/components/cards";
import { publications, restrictedTopics } from "@/content/publications";
import { external, OFFICIAL } from "@/content/site";
import { news } from "@/content/news";

export const metadata: Metadata = {
  title: "Conhecimento técnico",
  description:
    "Boletim de Pesquisa, cartilhas, relatórios, galerias de eventos e a área técnica para usuários cadastrados da Fundação MT.",
  alternates: { canonical: "/conhecimento" },
};

const kinds = ["Boletim", "Cartilha", "Informativo", "Relatório", "Fotos"] as const;
const kindLabel: Record<(typeof kinds)[number], string> = {
  Boletim: "Boletins de Pesquisa",
  Cartilha: "Cartilhas",
  Informativo: "Informativos técnicos",
  Relatório: "Relatórios",
  Fotos: "Galerias de eventos",
};

export default function KnowledgePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Conhecimento" }]}
        title="Publicações e informações técnicas."
        lead="Materiais publicados pela Fundação MT para consulta e download. Os resultados detalhados por área ficam na área técnica do site oficial, com cadastro gratuito."
      />

      <section aria-labelledby="publicacoes" className="wrap pb-20">
        <h2 id="publicacoes" className="font-display text-h2 font-[420] text-ink">
          Publicações
        </h2>
        <div className="mt-10 space-y-12">
          {kinds.map((k) => {
            const list = publications.filter((p) => p.kind === k);
            if (!list.length) return null;
            return (
              <div key={k}>
                <h3 className="text-sm font-medium text-brand-600">{kindLabel[k]}</h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {list.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 py-5">
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[1.375rem] leading-snug text-ink group-hover:text-brand-600">{p.title}</span>
                          <span className="mt-1 block text-ink-mute">
                            {p.topic} · {p.description}
                          </span>
                        </span>
                        <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
                        <span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-10 rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-ink-soft">
            O Boletim de Pesquisa impresso (edições 19/20 e 22/23) é vendido no site oficial, com envio pelos Correios.
          </p>
          <ButtonLink href={`${OFFICIAL}/servicos-por-area/boletim-de-pesquisa`} variant="secondary" className="mt-4 md:mt-0">
            Comprar o Boletim
          </ButtonLink>
        </div>
      </section>

      <section id="informacoes-tecnicas" aria-labelledby="info-tecnicas" className="bg-forest-950 py-20 text-white md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Lock aria-hidden="true" className="size-7 text-leaf-400" strokeWidth={1.75} />
            <h2 id="info-tecnicas" className="mt-5 font-display text-h2 font-[420]">
              Informações técnicas para cadastrados.
            </h2>
            <p className="mt-5 text-lead text-white/75">
              Com um cadastro gratuito no site oficial você acessa os conteúdos técnicos de cada área. O acesso e o cadastro continuam no sistema atual da Fundação MT.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={external.userArea} variant="light">
                Entrar ou criar cadastro
              </ButtonLink>
            </div>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {restrictedTopics.map((t) => (
              <li key={t} className="flex min-h-14 items-center gap-3 rounded-[var(--radius-md)] bg-white/[0.06] px-4 ring-1 ring-white/10">
                <Lock aria-hidden="true" className="size-4 shrink-0 text-leaf-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>


      <section aria-labelledby="noticias-recentes" className="bg-white py-20 md:py-28">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <h2 id="noticias-recentes" className="font-display text-h2 font-[420] text-ink">
              Notícias técnicas
            </h2>
            <TextLink href="/noticias">Ver todas</TextLink>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
