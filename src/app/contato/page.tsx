import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/ContactForm";
import { contact, external, whatsappLink } from "@/content/site";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { centers } from "@/content/centers";
import { labs } from "@/content/labs";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a Fundação MT: ${contact.phone}, WhatsApp ${contact.whatsapp}, ${contact.email}. ${contact.street}, ${contact.city} – MT.`,
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  const details = {
    servico: services.map((s) => ({ value: s.slug, label: s.title })),
    pesquisa: areas.map((a) => ({ value: a.slug, label: a.title })),
    visita: centers.map((c) => ({ value: c.slug, label: `${c.name} (${c.city})` })),
    laboratorio: labs.map((l) => ({ value: l.slug, label: l.title })),
  };
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contato" }]}
        title="Fale com a Fundação MT."
        lead="Escolha o assunto para que a mensagem chegue à equipe certa. Para uma conversa rápida, use o WhatsApp."
        image={media.fieldTalk}
      />
      <div className="wrap grid gap-14 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Suspense fallback={<p className="text-ink-mute">Carregando formulário…</p>}>
            <ContactForm details={details} />
          </Suspense>
        </div>
        <aside className="space-y-5 lg:col-span-4 lg:col-start-9" aria-label="Outros canais">
          <div className="rounded-[var(--radius-lg)] bg-forest-900 p-7 text-white">
            <h2 className="font-display text-[1.5rem]">Canais diretos</h2>
            <ul className="mt-5 space-y-1">
              <li>
                <a href={contact.phoneHref} className="flex min-h-12 items-center gap-3 hover:text-leaf-200">
                  <Phone aria-hidden="true" className="size-5 text-leaf-400" /> {contact.phone}
                </a>
              </li>
              <li>
                <a href={whatsappLink("Olá, vim pelo site da Fundação MT.")} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 hover:text-leaf-200">
                  <MessageCircle aria-hidden="true" className="size-5 text-leaf-400" /> WhatsApp {contact.whatsapp}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex min-h-12 items-center gap-3 hover:text-leaf-200">
                  <Mail aria-hidden="true" className="size-5 text-leaf-400" /> {contact.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60">
            <h2 className="font-display text-[1.5rem] text-ink">Sede</h2>
            <p className="mt-4 flex gap-3 text-ink-soft">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-600" />
              <span>
                {contact.headquarters}
                <br />
                {contact.street}
                <br />
                {contact.district}, {contact.city} – {contact.state}, {contact.zip}
              </span>
            </p>
            <p className="mt-4 flex gap-3 text-ink-soft">
              <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-600" />
              {contact.hours}
            </p>
            <div className="mt-6">
              <ButtonLink href={contact.mapsHref} variant="secondary">
                Ver no mapa
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line/60">
            <h2 className="font-display text-[1.25rem] text-ink">Outros acessos</h2>
            <ul className="mt-3 space-y-1 text-[0.9375rem]">
              <li>
                <a href={external.careers} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center text-brand-600 hover:underline">
                  Trabalhe conosco
                </a>
              </li>
              <li>
                <a href={external.userArea} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center text-brand-600 hover:underline">
                  Área do usuário (site oficial)
                </a>
              </li>
              <li>
                <a href={external.infrastructureRequest} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center text-brand-600 hover:underline">
                  Solicitar uso de infraestrutura
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
