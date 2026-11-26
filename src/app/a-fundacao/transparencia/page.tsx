import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { transparencyDocs, reports } from "@/content/institutional";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Transparência",
  description: "Políticas de privacidade, cookies, LGPD, uso de infraestrutura, compra e reembolso e relatórios da Fundação MT.",
  alternates: { canonical: "/a-fundacao/transparencia" },
};

export default function TransparencyPage() {
  const docs = [...transparencyDocs, ...reports.map((r) => ({ title: r.title, text: r.text, href: r.href }))];
  return (
    <>
      <PageHeader
        crumbs={[{ label: "A Fundação", href: "/a-fundacao" }, { label: "Transparência" }]}
        title="Transparência e políticas."
        lead={`Documentos institucionais da ${site.legalName} (CNPJ ${site.cnpj}). As versões oficiais e vigentes ficam no portal de transparência do site da Fundação.`}
      />
      <div className="wrap pb-24 md:pb-32">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => (
            <li key={d.href}>
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="font-display text-[1.375rem] leading-snug text-ink">{d.title}</span>
                  <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
                </span>
                <span className="mt-3 text-ink-soft">{d.text}</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
