import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { ResearchAreas } from "@/components/home/ResearchAreas";
import { CentersExplorer } from "@/components/home/CentersExplorer";
import { Services } from "@/components/home/Services";
import { Knowledge } from "@/components/home/Knowledge";
import { FieldGallery } from "@/components/home/FieldGallery";
import { EventsNews } from "@/components/home/EventsNews";
import { ContactCta } from "@/components/home/ContactCta";
import { SectionHeading } from "@/components/ui/Primitives";
import { TextLink } from "@/components/ui/Button";
import { centers } from "@/content/centers";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ResearchAreas />
      <section aria-labelledby="centros-titulo" className="bg-forest-950 py-24 text-white md:py-32">
        <div className="wrap">
          <SectionHeading
            id="centros-titulo"
            tone="light"
            title="Pesquisa feita onde a lavoura está."
            muted="Uma sede e cinco CADs em regiões diferentes de Mato Grosso."
            lead="Os Centros de Aprendizagem e Difusão recebem ensaios de longa duração, vitrines de cultivares, dias de campo e visitas técnicas."
          />
          <CentersExplorer centers={centers} />
          <div className="mt-12">
            <TextLink href="/centros-experimentais" tone="light">
              Ver todos os centros experimentais
            </TextLink>
          </div>
        </div>
      </section>
      <Services />
      <FieldGallery />
      <Knowledge />
      <EventsNews />
      <ContactCta />
    </>
  );
}
