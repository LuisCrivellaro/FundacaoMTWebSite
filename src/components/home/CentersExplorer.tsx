"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import type { Center } from "@/content/centers";
import { cn } from "@/lib/format";

/**
 * Seletor de centros experimentais: lista à esquerda (tablist acessível),
 * foto aérea e dados à direita. Escolha do usuário, sem rotação automática.
 */
export function CentersExplorer({ centers }: { centers: Center[] }) {
  const [index, setIndex] = useState(5);
  const reduce = useReducedMotion();
  const c = centers[index];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const n = (index + 1) % centers.length;
      setIndex(n);
      document.getElementById(`centro-tab-${n}`)?.focus();
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const n = (index - 1 + centers.length) % centers.length;
      setIndex(n);
      document.getElementById(`centro-tab-${n}`)?.focus();
    }
  };

  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div role="tablist" aria-label="Centros experimentais" aria-orientation="vertical" className="flex flex-col lg:col-span-4" onKeyDown={onKey}>
        {centers.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.slug}
              id={`centro-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="centro-painel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={cn(
                "group flex min-h-14 items-baseline justify-between gap-4 border-b border-white/12 py-4 text-left transition-colors",
                selected ? "text-white" : "text-white/55 hover:text-white/85",
              )}
            >
              <span className="font-display text-[1.375rem] leading-tight md:text-[1.6rem]">{item.name}</span>
              <span className={cn("shrink-0 text-sm tabular", selected ? "text-leaf-400" : "text-white/45")}>{item.city}</span>
            </button>
          );
        })}
      </div>

      <div id="centro-painel" role="tabpanel" aria-labelledby={`centro-tab-${index}`} className="lg:col-span-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] bg-forest-800">
          <AnimatePresence initial={false}>
            <motion.div
              key={c.slug}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-7 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm text-white/65">
              <MapPin aria-hidden="true" className="size-4 text-leaf-400" />
              {c.city}, MT{c.founded ? ` · criado em ${c.founded}` : ""}
            </p>
            <p className="mt-3 max-w-2xl text-lead text-white">{c.focus}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Culturas pesquisadas">
              {c.crops.map((crop) => (
                <li key={crop} className="rounded-full bg-white/10 px-3 py-1 text-[0.8125rem] text-white/85">
                  {crop}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/centros-experimentais/${c.slug}`}
            className="group/btn inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 font-medium text-forest-950 transition-[background-color,transform] hover:bg-leaf-100 active:scale-[0.97] md:self-end"
          >
            Conhecer o {c.short === "Sede" ? "centro de pesquisa" : c.name}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
