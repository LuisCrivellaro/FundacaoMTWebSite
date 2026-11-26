import Image from "next/image";
import { media } from "@/content/media";
import { TextLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Statement } from "./Statement";

const facts = [
  { value: "1993", label: "ano de fundação, por iniciativa de 23 produtores", count: false },
  { value: "6", label: "centros de pesquisa: a sede e cinco CADs", count: true },
  { value: "3", label: "laboratórios cadastrados no PNIPE, do MCTI", count: true },
  { value: "200+", label: "ensaios de campo por safra só em Fitopatologia", count: true },
  { value: "26", label: "edições do Encontro Técnico de Soja", count: true },
];

export function About() {
  return (
    <section aria-labelledby="quem-somos" className="wrap py-24 md:py-32">
      <h2 id="quem-somos" className="sr-only">
        Quem somos
      </h2>
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Statement text="A Fundação MT nasceu em 1993, criada por 23 produtores que precisavam de respostas para plantar no cerrado. A missão continua a mesma: prover informação técnica, imparcial e confiável que oriente a decisão do produtor." />
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
            <TextLink href="/a-fundacao">Conhecer a história</TextLink>
            <TextLink href="/a-fundacao#governanca">Ver a governança</TextLink>
          </div>
        </div>
        <div className="group parallax reveal-photo relative hidden aspect-[3/4] overflow-hidden rounded-[var(--radius-lg)] bg-sand lg:col-span-4 lg:block">
          <div className="parallax-layer">
            <Image
              src={media.aerialSede.src}
              alt={media.aerialSede.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 0px"
              className="object-cover object-[45%_50%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>

      <dl className="reveal-group mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 md:grid-cols-3 lg:grid-cols-5">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col-reverse justify-end gap-3">
            <dt className="max-w-[16rem] text-[0.9375rem] text-ink-soft">{f.label}</dt>
            <dd className="tabular font-display text-[clamp(2.5rem,1.8rem+2vw,3.75rem)] leading-none font-[380] text-forest-900">
              {f.count ? <CountUp value={f.value} /> : f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
