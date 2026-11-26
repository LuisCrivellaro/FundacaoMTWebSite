const TZ = "America/Cuiaba";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function toDate(value: string) {
  // Datas "AAAA-MM-DD" são tratadas como meio-dia local para não mudar de dia no fuso.
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00-04:00`) : new Date(value);
}

export function formatDate(value: string | null | undefined, style: "long" | "short" | "month" = "long") {
  if (!value) return "";
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return "";
  const opts: Intl.DateTimeFormatOptions =
    style === "long"
      ? { day: "numeric", month: "long", year: "numeric", timeZone: TZ }
      : style === "short"
        ? { day: "2-digit", month: "short", year: "numeric", timeZone: TZ }
        : { month: "long", year: "numeric", timeZone: TZ };
  return new Intl.DateTimeFormat("pt-BR", opts).format(d).replace(/ de (\d{4})$/, " de $1");
}

export function dateParts(value: string) {
  const d = toDate(value);
  const day = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", timeZone: TZ }).format(d);
  const month = new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: TZ }).format(d).replace(".", "");
  const year = new Intl.DateTimeFormat("pt-BR", { year: "numeric", timeZone: TZ }).format(d);
  return { day, month, year };
}

export function isoDate(value: string) {
  return toDate(value).toISOString();
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}
