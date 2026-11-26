import { ArrowUpRight, BookOpen, Lock } from "lucide-react";
import { publications } from "@/content/publications";
import { external, OFFICIAL } from "@/content/site";
import { SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink, TextLink } from "@/components/ui/Button";

export function Knowledge() {
  const docs = publications.filter((p) => p.kind !== "Fotos").slice(0, 4);
  return (
    <section aria-labelledby="conhecimento-titulo" className="bg-sand/60 py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          id="conhecimento-titulo"
          title="Conhecimento para levar ao campo."
          muted="Publicações e área técnica."
          lead="O Boletim de Pesquisa, na 20ª edição, reúne posicionamentos para soja, milho e algodão. Resultados por área ficam na área técnica, com cadastro gratuito."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <ul className="reveal divide-y divide-sand-300 rounded-[var(--radius-lg)] bg-white px-6 ring-1 ring-line/60 md:px-8 lg:col-span-7">
            {docs.map((p) => (
              <li key={p.href}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-6">
                  <span className="w-24 shrink-0 text-sm font-medium text-brand-600">{p.kind}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-ink group-hover:text-brand-600">{p.title}</span>
                    <span className="mt-0.5 block text-[0.9375rem] text-ink-mute">{p.description}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="reveal-group grid gap-5 lg:col-span-5">
            <div id="area-tecnica" className="flex flex-col rounded-[var(--radius-lg)] bg-forest-900 p-7 text-white md:p-8">
              <Lock aria-hidden="true" className="size-6 text-leaf-400" strokeWidth={1.75} />
              <p className="mt-5 font-display text-[1.6rem] leading-tight">Informações técnicas por área</p>
              <p className="mt-2 text-white/75">
                Entomologia, Fitopatologia, Nematologia, Solos e outras áreas publicam resultados para usuários cadastrados no site oficial.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={external.userArea} variant="light">
                  Entrar ou criar cadastro
                </ButtonLink>
              </div>
            </div>
            <div className="flex flex-col rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60 md:p-8">
              <BookOpen aria-hidden="true" className="size-6 text-brand-600" strokeWidth={1.75} />
              <p className="mt-5 font-display text-[1.6rem] leading-tight text-ink">Boletim de Pesquisa impresso</p>
              <p className="mt-2 text-ink-soft">Edições 19/20 e 22/23, vendidas no site oficial com envio pelos Correios.</p>
              <div className="mt-4">
                <TextLink href={`${OFFICIAL}/servicos-por-area/boletim-de-pesquisa`}>Comprar no site oficial</TextLink>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:text-right">
          <TextLink href="/conhecimento">Ver todas as publicações e materiais</TextLink>
        </div>
      </div>
    </section>
  );
}
