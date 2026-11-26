"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { navigation, external, contact } from "@/content/site";
import { media } from "@/content/media";
import { cn } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const panelId = useId();

  // Fecha menus ao trocar de rota
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobile]);

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const active = navigation.find((g) => g.label === open);
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0].split("#")[0]));

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
        // Fundo sólido: o logo oficial (PNG com fundo branco) usa mix-blend-multiply, que não funciona sobre backdrop-blur.
        scrolled || open || mobile ? "bg-paper shadow-[0_1px_0_var(--color-line)]" : "bg-paper",
      )}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="relative -ml-1 flex shrink-0 items-center rounded-md p-1" aria-label="Fundação MT — página inicial">
          <Image
            src={media.logoHorizontal.src}
            alt="Fundação MT"
            width={182}
            height={40}
            priority
            className="h-9 w-auto mix-blend-multiply md:h-10"
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((g) => {
              const expanded = open === g.label;
              return (
                <li key={g.label} onMouseEnter={() => hoverOpen(g.label)} onMouseLeave={hoverClose}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${panelId}-${g.label}`}
                    onClick={() => setOpen(expanded ? null : g.label)}
                    className={cn(
                      "flex min-h-11 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-medium transition-colors",
                      expanded || isCurrent(g.href) ? "bg-forest-900/[0.07] text-forest-950" : "text-ink-soft hover:text-forest-950",
                    )}
                  >
                    {g.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("size-4 transition-transform duration-300", expanded && "rotate-180")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/busca"
            aria-label="Buscar no site"
            className="grid size-11 place-items-center rounded-full text-ink-soft transition-colors hover:bg-forest-900/[0.06] hover:text-forest-950"
          >
            <Search aria-hidden="true" className="size-5" />
          </Link>
          <a
            href={external.userArea}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-medium text-ink-soft hover:text-forest-950"
          >
            Área do usuário
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (site oficial, abre em nova aba)</span>
          </a>
          <ButtonLink href="/contato" icon="none">
            Fale com a equipe
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-medium text-forest-950 ring-1 ring-line lg:hidden"
          aria-expanded={mobile}
          aria-controls="menu-mobile"
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          <span>{mobile ? "Fechar" : "Menu"}</span>
        </button>
      </div>

      {/* Painel do mega-menu (desktop) */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.label}
            id={`${panelId}-${active.label}`}
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => hoverOpen(active.label)}
            onMouseLeave={hoverClose}
            className="absolute inset-x-0 top-full hidden border-t border-line bg-paper shadow-[0_24px_48px_-24px_rgb(18_48_28/0.25)] lg:block"
          >
            <div className="wrap grid grid-cols-12 gap-10 py-10">
              <div className="col-span-4">
                <p className="font-display text-[1.75rem] leading-tight text-ink">{active.label}</p>
                <p className="mt-3 text-ink-soft">{active.intro}</p>
                <Link
                  href={active.href}
                  className="group/link mt-6 inline-flex min-h-11 items-center gap-1.5 font-medium text-brand-600 hover:text-forest-800"
                >
                  <span className="link-underline">Ver tudo em {active.label}</span>
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/link:translate-x-0.5" />
                </Link>
              </div>
              <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-1">
                {active.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="group/item flex items-start justify-between gap-4 rounded-[var(--radius-md)] p-4 transition-colors hover:bg-white"
                    >
                      <span>
                        <span className="block font-medium text-ink">{it.label}</span>
                        {it.description && <span className="mt-1 block text-[0.9375rem] text-ink-mute">{it.description}</span>}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-ink-mute transition-transform duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-brand-600"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile em tela cheia */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            id="menu-mobile"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto overscroll-contain bg-paper lg:hidden"
          >
            <MobileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <nav aria-label="Principal (celular)" className="wrap flex min-h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
      <ul className="divide-y divide-line border-y border-line">
        {navigation.map((g) => {
          const isOpen = expanded === g.label;
          return (
            <li key={g.label}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : g.label)}
                className="flex min-h-14 w-full items-center justify-between py-3 text-left font-display text-[1.6rem] text-ink"
              >
                {g.label}
                <ChevronDown aria-hidden="true" className={cn("size-5 transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <ul className="pb-4">
                  <li>
                    <Link href={g.href} className="flex min-h-11 items-center py-2 font-medium text-brand-600">
                      Visão geral
                    </Link>
                  </li>
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="flex min-h-11 items-center py-2 text-ink-soft">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-8 grid gap-3">
        <ButtonLink href="/busca" variant="secondary" size="lg" className="w-full" icon="none">
          Buscar no site
        </ButtonLink>
        <ButtonLink href="/contato" size="lg" className="w-full">
          Fale com a equipe
        </ButtonLink>
        <ButtonLink href={external.userArea} variant="secondary" size="lg" className="w-full">
          Área do usuário
        </ButtonLink>
      </div>
      <div className="mt-auto pt-10 text-[0.9375rem] text-ink-soft">
        <p>
          <a href={contact.phoneHref} className="underline-offset-4 hover:underline">
            {contact.phone}
          </a>
        </p>
        <p className="mt-1">
          <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
            {contact.email}
          </a>
        </p>
      </div>
    </nav>
  );
}
