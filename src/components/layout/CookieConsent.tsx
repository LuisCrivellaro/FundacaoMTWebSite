"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { external } from "@/content/site";

/**
 * Consentimento de cookies (LGPD). Este site ainda não carrega nenhum
 * rastreador; a escolha fica registrada para quando a integração de
 * medição (GTM/GA4, RD Station) for ativada — ver docs/INTEGRATIONS.md.
 */
type Consent = { necessary: true; analytics: boolean; marketing: boolean; date: string };
const KEY = "fmt-consent-v1";
const EVENT = "fmt-consent-open";

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function save(c: Omit<Consent, "necessary" | "date">) {
  const value: Consent = { necessary: true, ...c, date: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* navegação privada: segue sem persistir */
  }
  window.dispatchEvent(new CustomEvent("fmt-consent-change", { detail: value }));
}

const subscribe = (cb: () => void) => {
  window.addEventListener("fmt-consent-change", cb);
  return () => window.removeEventListener("fmt-consent-change", cb);
};

export function CookieConsent() {
  const stored = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(KEY),
    () => "server",
  );
  const [forced, setForced] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const open = () => {
      const c = read();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setDetails(true);
      setForced(true);
    };
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);

  const visible = forced || stored === null;
  if (!visible || stored === "server") return null;

  const finish = (c: { analytics: boolean; marketing: boolean }) => {
    save(c);
    setForced(false);
    setDetails(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-titulo"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_24px_60px_-20px_rgb(12_31_19/0.45)] ring-1 ring-line md:bottom-6"
    >
      <p id="cookie-titulo" className="font-display text-xl text-ink">
        Privacidade neste site
      </p>
      <p className="mt-2 text-[0.9375rem] text-ink-soft">
        Usamos cookies essenciais para o site funcionar. Medição de audiência e marketing só são ativados com a sua permissão.{" "}
        <a href={external.cookiesPolicy} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 underline underline-offset-4">
          Política de cookies
        </a>
        .
      </p>

      {details && (
        <fieldset className="mt-5 space-y-3">
          <legend className="sr-only">Categorias de cookies</legend>
          <label className="flex items-start gap-3 rounded-[var(--radius-sm)] bg-paper p-3">
            <input type="checkbox" checked disabled className="mt-1 size-5 accent-brand-600" />
            <span>
              <span className="block font-medium text-ink">Essenciais</span>
              <span className="block text-sm text-ink-mute">Necessários para navegação e segurança. Sempre ativos.</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] bg-paper p-3">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 size-5 accent-brand-600" />
            <span>
              <span className="block font-medium text-ink">Medição de audiência</span>
              <span className="block text-sm text-ink-mute">Estatísticas anônimas de uso, como Google Analytics.</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] bg-paper p-3">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 size-5 accent-brand-600" />
            <span>
              <span className="block font-medium text-ink">Marketing</span>
              <span className="block text-sm text-ink-mute">Comunicação sobre eventos e conteúdos, como RD Station e Meta.</span>
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {details ? (
          <button type="button" onClick={() => finish({ analytics, marketing })} className="min-h-11 rounded-full bg-brand-600 px-5 font-medium text-white hover:bg-forest-700">
            Salvar escolhas
          </button>
        ) : (
          <>
            <button type="button" onClick={() => finish({ analytics: true, marketing: true })} className="min-h-11 rounded-full bg-brand-600 px-5 font-medium text-white hover:bg-forest-700">
              Aceitar todos
            </button>
            <button type="button" onClick={() => finish({ analytics: false, marketing: false })} className="min-h-11 rounded-full px-5 font-medium text-forest-900 ring-1 ring-line hover:bg-paper">
              Só os essenciais
            </button>
            <button type="button" onClick={() => setDetails(true)} className="min-h-11 rounded-full px-4 font-medium text-brand-600 hover:bg-paper">
              Escolher
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENT))}
      className="inline-flex min-h-10 items-center hover:text-white"
    >
      Preferências de cookies
    </button>
  );
}
