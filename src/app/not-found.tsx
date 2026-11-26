import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  const links = [
    { href: "/pesquisa", label: "Áreas de pesquisa" },
    { href: "/servicos", label: "Serviços" },
    { href: "/eventos", label: "Eventos" },
    { href: "/noticias", label: "Notícias" },
  ];
  return (
    <section className="wrap py-24 md:py-32">
      <p className="tabular font-display text-[5rem] leading-none text-brand-500">404</p>
      <h1 className="mt-6 max-w-3xl font-display text-h1 font-[420] text-ink">Esta página não existe ou mudou de endereço.</h1>
      <p className="mt-6 text-lead text-ink-soft measure">
        O site da Fundação MT foi reorganizado. Use a busca ou siga por uma das seções abaixo.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/busca">Buscar no site</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Ir para o início
        </ButtonLink>
      </div>
      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-11 items-center font-medium text-brand-600 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
