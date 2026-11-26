import { Mail, MessageCircle, Phone } from "lucide-react";
import { contact, whatsappLink } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <section aria-labelledby="contato-titulo" className="px-[clamp(0.5rem,0.2rem+1.2vw,1.5rem)] pb-[clamp(0.5rem,0.2rem+1.2vw,1.5rem)]">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-forest-900 py-20 text-white md:py-28">
        <svg aria-hidden="true" className="absolute -right-24 -bottom-24 size-[32rem] text-forest-800" viewBox="0 0 200 200" fill="none">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={c * 33} y={r * 33} width="28" height="28" rx="4" fill="currentColor" opacity={((r + c) % 3) * 0.35 + 0.25} />
            )),
          )}
        </svg>
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="contato-titulo" className="font-display text-h2 font-[420]">
              Fale com a equipe técnica.
              <span className="block text-leaf-200/80">Para contratar um serviço, propor uma pesquisa ou tirar uma dúvida.</span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contato" variant="light" size="lg">
                Enviar uma mensagem
              </ButtonLink>
              <ButtonLink href={whatsappLink("Olá, vim pelo site da Fundação MT.")} variant="outline-light" size="lg">
                Conversar no WhatsApp
              </ButtonLink>
            </div>
          </div>
          <ul className="space-y-1 text-white/85 lg:col-span-5 lg:justify-self-end">
            <li>
              <a href={contact.phoneHref} className="flex min-h-12 items-center gap-3 hover:text-white">
                <Phone aria-hidden="true" className="size-5 text-leaf-400" /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 hover:text-white">
                <MessageCircle aria-hidden="true" className="size-5 text-leaf-400" /> {contact.whatsapp}
                <span className="sr-only"> (WhatsApp, abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex min-h-12 items-center gap-3 hover:text-white">
                <Mail aria-hidden="true" className="size-5 text-leaf-400" /> {contact.email}
              </a>
            </li>
            <li className="pt-2 text-sm text-white/60">{contact.hours}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
