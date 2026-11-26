import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn, isExternal } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium tracking-[-0.005em] transition-[background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-standard)] active:scale-[0.97] focus-visible:outline-offset-4 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-[0_1px_0_rgb(255_255_255/0.15)_inset] hover:bg-forest-700",
  secondary: "bg-white text-forest-900 ring-1 ring-line hover:ring-forest-900/30 hover:bg-paper",
  ghost: "text-forest-900 hover:bg-forest-900/[0.06]",
  light: "bg-white text-forest-950 hover:bg-leaf-100",
  "outline-light": "text-white ring-1 ring-white/45 hover:bg-white/10 hover:ring-white/80",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.9375rem]",
  lg: "px-6 py-3.5 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: "arrow" | "external" | "none";
  "aria-label"?: string;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", className, icon = "arrow", ...rest }: Props) {
  const external = isExternal(href);
  const Icon = external && icon !== "none" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && (
        <Icon
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    const isWeb = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={rest["aria-label"]}>
        {content}
        {isWeb && <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={rest["aria-label"]}>
      {content}
    </Link>
  );
}

/** Link de texto com seta, para chamadas secundárias dentro de cartões e seções. */
export function TextLink({ href, children, className, tone = "dark" }: { href: string; children: React.ReactNode; className?: string; tone?: "dark" | "light" }) {
  const external = isExternal(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const cls = cn(
    "group/link inline-flex min-h-11 items-center gap-1.5 font-medium",
    tone === "dark" ? "text-brand-600 hover:text-forest-800" : "text-leaf-200 hover:text-white",
    className,
  );
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <Icon aria-hidden="true" className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/link:translate-x-0.5" />
    </>
  );
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
      {inner}
      {href.startsWith("http") && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
