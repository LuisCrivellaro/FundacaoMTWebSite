import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";
import type { Media } from "@/content/media";

/** Seção padrão: um título forte e uma segunda frase em tom suave (sem eyebrow). */
export function SectionHeading({
  id,
  title,
  muted,
  lead,
  tone = "dark",
  align = "split",
  as: Tag = "h2",
  children,
}: {
  id?: string;
  title: string;
  muted?: string;
  lead?: string;
  tone?: "dark" | "light";
  align?: "split" | "stack";
  as?: "h1" | "h2";
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("grid gap-6", align === "split" ? "lg:grid-cols-12 lg:items-end" : "")}>
      <Tag
        id={id}
        className={cn(
          "font-display font-[420] text-h2 lg:col-span-7",
          tone === "dark" ? "text-ink" : "text-white",
          Tag === "h1" && "text-h1",
        )}
      >
        {title}
        {muted && <span className={cn("block", tone === "dark" ? "text-ink-mute" : "text-leaf-200/80")}>{muted}</span>}
      </Tag>
      {(lead || children) && (
        <div className={cn("lg:col-span-5", align === "split" ? "lg:pb-2" : "")}>
          {lead && <p className={cn("text-lead measure", tone === "dark" ? "text-ink-soft" : "text-white/80")}>{lead}</p>}
          {children}
        </div>
      )}
    </div>
  );
}

export function Breadcrumbs({ items, tone = "dark" }: { items: { label: string; href?: string }[]; tone?: "dark" | "light" }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className={cn("flex flex-wrap items-center gap-1 text-sm", tone === "dark" ? "text-ink-mute" : "text-white/75")}>
        <li>
          <Link href="/" className="rounded px-1 py-2 hover:underline">
            Início
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
            {it.href && i < items.length - 1 ? (
              <Link href={it.href} className="rounded px-1 py-2 hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn("px-1 py-2", tone === "dark" ? "text-ink" : "text-white")}>
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Cabeçalho das páginas internas: trilha, título, texto de apoio e foto opcional. */
export function PageHeader({
  crumbs,
  title,
  lead,
  image,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  lead?: string;
  image?: Media | { src: string; alt: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="wrap pt-6 pb-12 md:pt-10 md:pb-16">
      <Breadcrumbs items={crumbs} />
      <div className={cn("mt-6 grid gap-10", image ? "lg:grid-cols-12 lg:items-end" : "")}>
        <div className={cn(image ? "lg:col-span-7" : "max-w-4xl")}>
          <h1 className="font-display text-h1 font-[420] text-ink">{title}</h1>
          {lead && <p className="mt-6 text-lead text-ink-soft measure">{lead}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-sand lg:col-span-5">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority />
          </div>
        )}
      </div>
    </header>
  );
}

export function Tag({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" | "leaf" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.8125rem] font-medium",
        tone === "light" && "bg-sand text-forest-900",
        tone === "dark" && "bg-forest-900 text-white",
        tone === "leaf" && "bg-leaf-100 text-forest-800",
      )}
    >
      {children}
    </span>
  );
}

/** Avatar com iniciais quando não há foto oficial da pessoa. */
export function Avatar({ name, photo, size = 64 }: { name: string; photo?: string | null; size?: number }) {
  const initials = name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  if (photo)
    return (
      <span className="relative block shrink-0 overflow-hidden rounded-full bg-sand" style={{ width: size, height: size }}>
        <Image src={photo} alt={`Foto de ${name}`} fill sizes={`${size}px`} className="object-cover" />
      </span>
    );
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-full bg-leaf-100 font-display text-forest-800"
      style={{ width: size, height: size, fontSize: size / 2.8 }}
    >
      {initials}
    </span>
  );
}

/** Imagem em moldura com zoom suave no hover do elemento pai com classe `group`. */
export function Frame({
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
  rounded = "lg",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: "md" | "lg" | "xl";
}) {
  const radius = { md: "rounded-[var(--radius-md)]", lg: "rounded-[var(--radius-lg)]", xl: "rounded-[var(--radius-xl)]" }[rounded];
  return (
    <div className={cn("relative overflow-hidden bg-sand", radius, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
      />
    </div>
  );
}
