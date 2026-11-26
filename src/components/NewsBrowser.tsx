"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { cn, formatDate } from "@/lib/format";

export type NewsListItem = { slug: string; title: string; date: string; image: string | null; topics: string[]; excerpt: string; readingMinutes: number };

const PER_PAGE = 12;
const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function NewsBrowser({ items, topics }: { items: NewsListItem[]; topics: string[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const topic = params.get("tema") ?? "";
  const page = Math.max(1, Number(params.get("pagina") ?? 1) || 1);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const deferred = useDeferredValue(query);

  const update = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  // Mantém a busca na URL (sem recarregar a cada tecla)
  useEffect(() => {
    const t = setTimeout(() => {
      if ((params.get("q") ?? "") !== query) update({ q: query, pagina: "" });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const q = normalize(deferred.trim());
  const filtered = items.filter((n) => (!topic || n.topics.includes(topic)) && (!q || normalize(`${n.title} ${n.excerpt}`).includes(q)));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <label htmlFor="busca-noticias" className="block text-sm font-medium text-ink">
            Buscar nas notícias
          </label>
          <div className="relative mt-2">
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-mute" />
            <input
              id="busca-noticias"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex.: cigarrinha, nematoides, algodão…"
              autoComplete="off"
              className="min-h-12 w-full rounded-full bg-white pr-12 pl-12 text-ink ring-1 ring-line placeholder:text-ink-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca" className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-ink-mute hover:bg-paper">
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
        </div>
        <fieldset className="lg:col-span-7">
          <legend className="text-sm font-medium text-ink">Filtrar por tema</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {["", ...topics].map((t) => (
              <button
                key={t || "todos"}
                type="button"
                aria-pressed={topic === t}
                onClick={() => update({ tema: t, pagina: "" })}
                className={cn(
                  "min-h-10 rounded-full px-4 text-[0.9375rem] font-medium transition-colors",
                  topic === t ? "bg-forest-900 text-white" : "bg-white text-ink-soft ring-1 ring-line hover:text-ink",
                )}
              >
                {t || "Todos"}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p aria-live="polite" className="mt-8 text-sm text-ink-mute">
        {filtered.length} {filtered.length === 1 ? "notícia encontrada" : "notícias encontradas"}
      </p>

      {shown.length ? (
        <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((n) => (
            <li key={n.slug}>
              <article className="group relative flex h-full flex-col">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-md)] bg-sand">
                  {n.image && (
                    <Image
                      src={n.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <p className="mt-4 text-sm text-ink-mute">
                  <time dateTime={n.date}>{formatDate(n.date)}</time> · {n.readingMinutes} min
                </p>
                <h2 className="mt-1.5 font-display text-[1.3rem] leading-snug text-ink group-hover:text-brand-600">
                  <Link href={`/noticias/${n.slug}`} className="after:absolute after:inset-0">
                    {n.title}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-[0.9375rem] text-ink-soft">{n.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-[var(--radius-lg)] bg-white p-8 ring-1 ring-line/60">
          <p className="font-display text-[1.5rem] text-ink">Nenhuma notícia com esses termos.</p>
          <p className="mt-2 text-ink-soft">Tente outra palavra ou remova o filtro de tema.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              update({ tema: "", q: "", pagina: "" });
            }}
            className="mt-4 min-h-11 font-medium text-brand-600 hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Paginação" className="mt-14 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              aria-current={p === current ? "page" : undefined}
              aria-label={`Página ${p}`}
              onClick={() => {
                update({ pagina: p === 1 ? "" : String(p) });
                document.getElementById("conteudo")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "tabular grid size-11 place-items-center rounded-full font-medium transition-colors",
                p === current ? "bg-forest-900 text-white" : "bg-white text-ink-soft ring-1 ring-line hover:text-ink",
              )}
            >
              {p}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
