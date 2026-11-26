import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contact, external, navigation, site, social } from "@/content/site";
import { media } from "@/content/media";
import { CookiePreferencesButton } from "./CookieConsent";

export function Footer() {
  return (
    <footer className="bg-forest-950 text-white/80" aria-labelledby="rodape-titulo">
      <h2 id="rodape-titulo" className="sr-only">
        Rodapé
      </h2>
      <div className="wrap grid gap-14 pt-20 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <Image src={media.symbol.src} alt="" width={44} height={44} className="size-11" />
            <span className="font-display text-[1.75rem] leading-none text-white">{site.name}</span>
          </div>
          <p className="mt-6 max-w-sm text-white/70">
            {site.legalName}. Pesquisa agronômica aplicada e difusão de tecnologia em Mato Grosso desde {site.founded}.
          </p>
          <address className="mt-8 not-italic leading-relaxed">
            <span className="block text-white">{contact.headquarters}</span>
            {contact.street}
            <br />
            {contact.district}, {contact.city} – {contact.state}, {contact.zip}
          </address>
          <ul className="mt-6 space-y-1">
            <li>
              <a href={contact.phoneHref} className="inline-flex min-h-11 items-center hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-white">
                WhatsApp {contact.whatsapp}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center hover:text-white">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Mapa do site" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
          {navigation.slice(0, 4).map((g) => (
            <div key={g.label}>
              <p className="font-medium text-white">{g.label}</p>
              <ul className="mt-4 space-y-0.5 text-[0.9375rem]">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="inline-flex min-h-10 items-center hover:text-white">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="font-medium text-white">Institucional</p>
            <ul className="mt-4 space-y-0.5 text-[0.9375rem]">
              <li>
                <Link href="/a-fundacao" className="inline-flex min-h-10 items-center hover:text-white">
                  Quem somos
                </Link>
              </li>
              <li>
                <Link href="/a-fundacao/transparencia" className="inline-flex min-h-10 items-center hover:text-white">
                  Transparência
                </Link>
              </li>
              <li>
                <Link href="/contato" className="inline-flex min-h-10 items-center hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <a href={external.careers} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 hover:text-white">
                  Trabalhe conosco <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={external.staffPortal} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 hover:text-white">
                  Acesso do colaborador <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-white">Redes sociais</p>
            <ul className="mt-4 space-y-0.5 text-[0.9375rem]">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 hover:text-white">
                    {s.label} <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.founded}–2026 {site.name} · CNPJ {site.cnpj}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            <li>
              <a href={external.privacy} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-white">
                Política de privacidade
              </a>
            </li>
            <li>
              <a href={external.cookiesPolicy} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-white">
                Política de cookies
              </a>
            </li>
            <li>
              <CookiePreferencesButton />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
