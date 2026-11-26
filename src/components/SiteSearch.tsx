"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

export type SearchEntry = { title: string; href: string; type: string; text: string };

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function SiteSearch({ index }: { index: SearchEntry[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => {
    const t = setTimeout(() => router.replace(q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname, { scroll: false }), 300);
    return () => clearTimeout(t);
  }, [q, pathname, router]);

  const terms = normalize(q).split(/\s+/).filter((t) => t.length > 1);
  const results = terms.length
    ? index
        .map((e) => {
          const title = normalize(e.title);
          const text = normalize(e.text);
          const score = terms.reduce((s, t) => s + (title.includes(t) ? 3 : 0) + (text.includes(t) ? 1 : 0), 0);
          const all = terms.every((t) => title.includes(t) || text.includes(t));
          return { e, score: all ? score : 0 };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 40)
    : [];
  const groups = [...new Set(results.map((r) => r.e.type))];

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="busca-site" className="block font-medium text-ink">
          O que você procura?
        </label>
        <div className="relative mt-3 max-w-2xl">
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-mute" />
          <input
            id="busca-site"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
            placeholder="Ex.: nematoide, CAD Norte, amostragem de solo…"
            className="min-h-14 w-full rounded-full bg-white pr-5 pl-14 text-lg text-ink ring-1 ring-line placeholder:text-ink-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
        </div>
      </form>

      <div aria-live="polite" className="mt-10">
        {terms.length === 0 ? (
          <p className="text-ink-mute">Digite pelo menos uma palavra para buscar em páginas, serviços, eventos e notícias.</p>
        ) : results.length === 0 ? (
          <div className="rounded-[var(--radius-lg)] bg-white p-8 ring-1 ring-line/60">
            <p className="font-display text-[1.5rem] text-ink">Nada encontrado para “{q}”.</p>
            <p className="mt-2 text-ink-soft">Tente outra palavra ou fale com a equipe.</p>
            <Link href="/contato" className="mt-4 inline-flex min-h-11 items-center font-medium text-brand-600 hover:underline">
              Ir para o contato
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink-mute">{results.length} resultados</p>
            {groups.map((g) => (
              <section key={g} className="mt-8" aria-label={g}>
                <h2 className="text-sm font-medium text-brand-600">{g}</h2>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {results
                    .filter((r) => r.e.type === g)
                    .map(({ e }) => (
                      <li key={e.href}>
                        <Link href={e.href} className="group flex items-center gap-4 py-4">
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium text-ink group-hover:text-brand-600">{e.title}</span>
                            <span className="mt-0.5 line-clamp-1 block text-[0.9375rem] text-ink-mute">{e.text}</span>
                          </span>
                          <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink-mute group-hover:text-brand-600" />
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
