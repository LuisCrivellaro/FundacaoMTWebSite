"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EventCard } from "@/components/cards";
import type { EventWithMeta } from "@/content/events";
import { cn } from "@/lib/format";

type Props = { upcoming: EventWithMeta[]; past: EventWithMeta[]; series: Record<string, string> };

export function EventsBrowser({ upcoming, past, series }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const period = params.get("periodo") === "anteriores" ? "anteriores" : "proximos";
  const serie = params.get("serie") ?? "";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "periodo") next.delete("serie");
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  const base = period === "proximos" ? upcoming : past;
  const seriesList = [...new Set(base.map((e) => series[e.slug]))].sort();
  const list = serie ? base.filter((e) => series[e.slug] === serie) : base;

  return (
    <div>
      <div role="tablist" aria-label="Período" className="inline-flex rounded-full bg-white p-1 ring-1 ring-line">
        {[
          { id: "proximos", label: `Próximos (${upcoming.length})` },
          { id: "anteriores", label: `Anteriores (${past.length})` },
        ].map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={period === t.id}
            onClick={() => set("periodo", t.id === "proximos" ? "" : t.id)}
            className={cn(
              "min-h-11 rounded-full px-5 font-medium transition-colors",
              period === t.id ? "bg-forest-900 text-white" : "text-ink-soft hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {seriesList.length > 1 && (
        <div className="mt-6">
          <label htmlFor="serie" className="block text-sm font-medium text-ink">
            Série de eventos
          </label>
          <select
            id="serie"
            value={serie}
            onChange={(e) => set("serie", e.target.value)}
            className="mt-2 min-h-11 w-full max-w-sm rounded-[var(--radius-sm)] bg-white px-3 text-ink ring-1 ring-line focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="">Todas as séries</option>
            {seriesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      <div aria-live="polite" className="mt-10">
        <h2 className="sr-only">{period === "proximos" ? "Próximos eventos" : "Eventos anteriores"}</h2>
        {list.length ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {list.map((e) => (
              <li key={e.slug}>
                <EventCard event={e} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-[var(--radius-lg)] bg-white p-8 ring-1 ring-line/60">
            <p className="font-display text-[1.5rem] text-ink">Nenhum evento com data marcada agora.</p>
            <p className="mt-2 text-ink-soft">
              Os próximos encontros técnicos e dias de campo aparecem aqui assim que a data é confirmada. Enquanto isso, veja as edições anteriores.
            </p>
            <button type="button" onClick={() => set("periodo", "anteriores")} className="mt-5 min-h-11 font-medium text-brand-600 hover:underline">
              Ver eventos anteriores
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
