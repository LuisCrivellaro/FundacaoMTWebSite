import Image from "next/image";
import { media, type Media } from "@/content/media";
import { SectionHeading } from "@/components/ui/Primitives";
import { TextLink } from "@/components/ui/Button";
import { cn } from "@/lib/format";

type Shot = { photo: Media; label: string; wide?: boolean };

const rows: Shot[][] = [
  [
    { photo: media.fieldDayAerial, label: "Dia de campo" },
    { photo: media.cultivarShowcase, label: "Vitrine de cultivares", wide: true },
    { photo: media.soybeanRows, label: "Soja em campo" },
    { photo: media.etSojaAudience, label: "Encontro Técnico de Soja", wide: true },
  ],
  [
    { photo: media.conferenceAudience, label: "Resultados de pesquisa", wide: true },
    { photo: media.fieldTalk, label: "Palestra no campo" },
    { photo: media.etPecuariaTalk, label: "Encontro Técnico de Pecuária", wide: true },
    { photo: media.aerialNorte, label: "CAD Norte" },
  ],
];

/**
 * Duas faixas de fotos reais que correm em sentidos opostos conforme a rolagem
 * (CSS scroll-driven, ver `.photo-band` em globals.css). Sem suporte ou com
 * movimento reduzido, cada faixa vira uma lista com rolagem horizontal.
 */
export function FieldGallery() {
  return (
    <section aria-labelledby="pratica-titulo" className="overflow-x-clip py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          id="pratica-titulo"
          title="Do campo experimental ao produtor."
          muted="Dias de campo, vitrines e encontros técnicos."
          lead="Os resultados dos ensaios são apresentados nos CADs, em dias de campo e vitrines de cultivares, e nos encontros técnicos de soja, milho, algodão e pecuária."
        />
      </div>

      <div className="mt-14 space-y-4 md:space-y-5">
        {rows.map((row, i) => (
          <div
            key={i}
            role="region"
            aria-label={i === 0 ? "Fotos de campo e eventos, primeira faixa" : "Fotos de campo e eventos, segunda faixa"}
            tabIndex={0}
            className={cn("photo-band", i === 1 && "photo-band--reverse")}
          >
            <ul className="band-track flex w-max gap-4 px-[clamp(0.5rem,0.2rem+1.2vw,1.5rem)] md:gap-5">
              {row.map((shot) => (
                <li
                  key={shot.photo.src}
                  className={cn(
                    "group relative h-[14rem] shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-sand sm:h-[18rem] lg:h-[24rem]",
                    shot.wide ? "aspect-[16/10]" : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={shot.photo.src}
                    alt={shot.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 40rem, (min-width: 640px) 30rem, 23rem"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 rounded-full bg-forest-950/75 px-3 py-1 text-[0.8125rem] font-medium text-white backdrop-blur-sm"
                  >
                    {shot.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="wrap mt-10 flex flex-wrap gap-x-8 gap-y-2 lg:justify-end">
        <TextLink href="/eventos">Ver a agenda de eventos</TextLink>
        <TextLink href="/centros-experimentais">Visitar um centro experimental</TextLink>
      </div>
    </section>
  );
}
