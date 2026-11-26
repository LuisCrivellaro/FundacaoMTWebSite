import Image from "next/image";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Hero: foto aérea real do CAD Sul em painel arredondado (referência editorial
 * TerraKind), título em serifa e entrada única ao carregar (CSS, sem JS).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="px-[clamp(0.5rem,0.2rem+1.2vw,1.5rem)] pb-4">
      <div className="hero-stage relative isolate flex min-h-[calc(100svh-5.5rem)] flex-col justify-end overflow-hidden rounded-[var(--radius-xl)] bg-forest-900 md:min-h-[44rem] lg:min-h-[calc(100svh-5.5rem)]">
        {/* A foto desce mais devagar que a página ao rolar (CSS, ver globals.css) */}
        <div className="hero-drift parallax-layer -z-20">
          <Image
            src={media.aerialSul.src}
            alt={media.aerialSul.alt}
            fill
            priority
            fetchPriority="high"
            quality={60}
            sizes="100vw"
            className="hero-photo object-cover object-[55%_40%]"
          />
        </div>
        {/* Leitura: escurece a base e a esquerda sem esconder as parcelas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(12_31_19/0.35)_0%,rgb(12_31_19/0)_28%,rgb(12_31_19/0.25)_55%,rgb(12_31_19/0.88)_100%),linear-gradient(90deg,rgb(12_31_19/0.72)_0%,rgb(12_31_19/0.35)_45%,rgb(12_31_19/0)_70%)]"
        />

        <div className="wrap pb-10 md:pb-14 lg:pb-16">
          <div className="hero-copy max-w-[56rem]">
            <h1
              id="hero-titulo"
              className="hero-in font-display text-display font-[400] text-white"
              style={{ animationDelay: "80ms" }}
            >
              Pesquisa agronômica imparcial para quem produz em Mato Grosso
            </h1>
            <p className="hero-in mt-6 max-w-[40rem] text-lead text-white/85" style={{ animationDelay: "260ms" }}>
              Desde 1993 avaliamos cultivares, insumos, máquinas e manejos em cinco centros experimentais no estado. Os resultados
              chegam ao produtor como recomendação técnica, eventos e serviços.
            </p>
            <div className="hero-in mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
              <ButtonLink href="/servicos" variant="light" size="lg">
                Conhecer os serviços
              </ButtonLink>
              <ButtonLink href="/eventos" variant="outline-light" size="lg">
                Ver a agenda de eventos
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
