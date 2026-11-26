import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { NewsItem } from "@/content/news";
import type { EventWithMeta } from "@/content/events";
import { formatDate, dateParts } from "@/lib/format";

export function NewsCard({ item, priority, size = "md" }: { item: NewsItem; priority?: boolean; size?: "md" | "lg" }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative overflow-hidden rounded-[var(--radius-md)] bg-sand ${size === "lg" ? "aspect-[16/10]" : "aspect-[3/2]"}`}>
        {item.image && (
          <Image
            src={item.image}
            alt=""
            fill
            priority={priority}
            sizes={size === "lg" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        )}
      </div>
      <p className="mt-5 text-sm text-ink-mute">
        <time dateTime={item.date}>{formatDate(item.date)}</time>
        <span aria-hidden="true"> · </span>
        {item.readingMinutes} min de leitura
      </p>
      <h3 className={`mt-2 font-display leading-snug text-ink ${size === "lg" ? "text-[1.75rem] md:text-[2rem]" : "text-[1.25rem]"}`}>
        <Link href={`/noticias/${item.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-600">
          {item.title}
        </Link>
      </h3>
    </article>
  );
}

export function EventCard({ event, tone = "light" }: { event: EventWithMeta; tone?: "light" | "dark" }) {
  const date = event.date ?? event.sortDate;
  const parts = date && date !== "0000-00-00" ? dateParts(date) : null;
  const open = event.lots.some((l) => /FAÇA SUA INSCRIÇÃO/i.test(l.status));
  return (
    <article
      className={`group relative flex h-full gap-5 rounded-[var(--radius-lg)] p-5 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 md:p-6 ${
        tone === "light" ? "bg-white shadow-[var(--shadow-card)] ring-1 ring-line/60 hover:shadow-[var(--shadow-lift)]" : "bg-white/[0.06] ring-1 ring-white/10"
      }`}
    >
      {parts && (
        <div
          className={`flex w-16 shrink-0 flex-col items-center justify-center self-start rounded-[var(--radius-sm)] py-3 ${
            tone === "light" ? "bg-leaf-100 text-forest-900" : "bg-white/10 text-white"
          }`}
        >
          <span className="tabular font-display text-[1.75rem] leading-none">{parts.day}</span>
          <span className="mt-1 text-xs uppercase">{parts.month}</span>
          <span className="text-xs opacity-70">{parts.year}</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        {open && (
          <span className="mb-2 inline-flex rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-medium text-white">Inscrições abertas</span>
        )}
        <h3 className={`font-display text-[1.25rem] leading-snug ${tone === "light" ? "text-ink" : "text-white"}`}>
          <Link href={`/eventos/${event.slug}`} className="after:absolute after:inset-0">
            {event.title}
          </Link>
        </h3>
        <p className={`mt-2 flex items-start gap-1.5 text-[0.9375rem] ${tone === "light" ? "text-ink-soft" : "text-white/70"}`}>
          <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {event.info || formatDate(date)}
        </p>
        {event.venue && (
          <p className={`mt-1 flex items-start gap-1.5 text-[0.9375rem] ${tone === "light" ? "text-ink-soft" : "text-white/70"}`}>
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {event.venue}
          </p>
        )}
      </div>
      <ArrowRight aria-hidden="true" className={`size-5 shrink-0 self-center transition-transform group-hover:translate-x-1 ${tone === "light" ? "text-ink-mute" : "text-white/60"}`} />
    </article>
  );
}
