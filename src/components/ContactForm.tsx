"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { contact, external, whatsappLink } from "@/content/site";
import { cn } from "@/lib/format";

type Option = { value: string; label: string };

const SUBJECTS: Option[] = [
  { value: "servico", label: "Contratar um serviço" },
  { value: "pesquisa", label: "Pesquisa para minha empresa" },
  { value: "laboratorio", label: "Análise de laboratório" },
  { value: "visita", label: "Visita a um centro experimental" },
  { value: "evento", label: "Eventos ou patrocínio" },
  { value: "infraestrutura", label: "Uso de infraestrutura (ICT)" },
  { value: "imprensa", label: "Imprensa" },
  { value: "outro", label: "Outro assunto" },
];

type Errors = Partial<Record<"nome" | "email" | "telefone" | "assunto" | "mensagem" | "consentimento", string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "fallback"; reason: string; mailto: string };

function Err({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {msg}
    </p>
  );
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function ContactForm({ details }: { details: Record<string, Option[]> }) {
  const params = useSearchParams();
  const initialSubject = SUBJECTS.some((s) => s.value === params.get("assunto")) ? (params.get("assunto") as string) : "";
  const initialDetail = params.get("servico") ?? params.get("area") ?? params.get("centro") ?? params.get("laboratorio") ?? "";
  const [subject, setSubject] = useState(initialSubject);
  const [detail, setDetail] = useState(initialDetail);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const detailOptions = details[subject] ?? [];

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    if (String(fd.get("nome") ?? "").trim().length < 3) e.nome = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(fd.get("email") ?? "").trim())) e.email = "Informe um e-mail válido, como nome@empresa.com.br.";
    const tel = String(fd.get("telefone") ?? "").replace(/\D/g, "");
    if (tel && tel.length < 10) e.telefone = "Informe o telefone com DDD.";
    if (!subject) e.assunto = "Escolha o assunto para direcionarmos sua mensagem.";
    if (String(fd.get("mensagem") ?? "").trim().length < 10) e.mensagem = "Escreva sua mensagem (pelo menos 10 caracteres).";
    if (!fd.get("consentimento")) e.consentimento = "É preciso concordar com o uso dos dados para podermos responder.";
    return e;
  }

  function focusFirst(e: Errors) {
    const first = (["nome", "email", "telefone", "assunto", "mensagem", "consentimento"] as const).find((k) => e[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirst(e);
      return;
    }
    const subjectLabel = SUBJECTS.find((x) => x.value === subject)?.label ?? "Contato";
    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`[Site] ${subjectLabel}`)}&body=${encodeURIComponent(
      `${String(fd.get("mensagem") ?? "")}\n\n${String(fd.get("nome") ?? "")}\n${String(fd.get("telefone") ?? "")}\n${String(fd.get("cidade") ?? "")}`,
    )}`;
    // Build estático (Netlify Drop): não existe /api/contato. Vai direto às alternativas, sem fingir envio.
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
      setStatus({ kind: "fallback", reason: "not_configured", mailto });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: fd.get("nome"),
          email: fd.get("email"),
          telefone: fd.get("telefone"),
          cidade: fd.get("cidade"),
          assunto: subject,
          detalhe: detail,
          mensagem: fd.get("mensagem"),
          consentimento: Boolean(fd.get("consentimento")),
          website: fd.get("website"),
        }),
      });
      if (res.ok) {
        setStatus({ kind: "sent" });
        formRef.current?.reset();
        setPhone("");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (res.status === 422 && body.errors) {
        setErrors(body.errors);
        setStatus({ kind: "idle" });
        focusFirst(body.errors);
        return;
      }
      setStatus({ kind: "fallback", reason: body.error ?? "unknown", mailto });
    } catch {
      setStatus({ kind: "fallback", reason: "network", mailto });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="rounded-[var(--radius-lg)] bg-white p-8 ring-1 ring-line/60">
        <CheckCircle2 aria-hidden="true" className="size-8 text-success" />
        <p className="mt-4 font-display text-[1.75rem] text-ink">Mensagem enviada.</p>
        <p className="mt-2 text-ink-soft">A equipe da Fundação MT recebeu seu contato e vai responder pelo e-mail informado.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-6 min-h-11 font-medium text-brand-600 hover:underline">
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const fieldCls = (err?: string) =>
    cn(
      "mt-2 block min-h-12 w-full rounded-[var(--radius-sm)] bg-white px-4 text-ink ring-1 placeholder:text-ink-mute focus-visible:outline-none focus-visible:ring-2",
      err ? "ring-danger focus-visible:ring-danger" : "ring-line focus-visible:ring-brand-600",
    );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby="form-ajuda">
      <p id="form-ajuda" className="text-sm text-ink-mute">
        Campos com * são obrigatórios.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="font-medium text-ink">
            Nome completo *
          </label>
          <input id="nome" name="nome" autoComplete="name" placeholder="Ex.: Maria da Silva…" aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "erro-nome" : undefined} className={fieldCls(errors.nome)} />
          <Err id="erro-nome" msg={errors.nome} />
        </div>
        <div>
          <label htmlFor="email" className="font-medium text-ink">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="nome@empresa.com.br…"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "erro-email" : undefined}
            className={fieldCls(errors.email)}
          />
          <Err id="erro-email" msg={errors.email} />
        </div>
        <div>
          <label htmlFor="telefone" className="font-medium text-ink">
            Telefone ou WhatsApp
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={phone}
            onChange={(e) => setPhone(maskPhone(e.target.value))}
            placeholder="(66) 99999-9999…"
            aria-invalid={!!errors.telefone}
            aria-describedby={errors.telefone ? "erro-telefone" : undefined}
            className={fieldCls(errors.telefone)}
          />
          <Err id="erro-telefone" msg={errors.telefone} />
        </div>
        <div>
          <label htmlFor="cidade" className="font-medium text-ink">
            Município
          </label>
          <input id="cidade" name="cidade" autoComplete="address-level2" placeholder="Ex.: Sorriso – MT…" className={fieldCls()} />
        </div>
      </div>

      <fieldset aria-describedby={errors.assunto ? "erro-assunto" : undefined}>
        <legend className="font-medium text-ink">Assunto *</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {SUBJECTS.map((s) => (
            <label
              key={s.value}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] bg-white px-4 ring-1 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600",
                subject === s.value ? "ring-brand-600" : errors.assunto ? "ring-danger" : "ring-line hover:ring-forest-900/30",
              )}
            >
              <input
                type="radio"
                name="assunto"
                value={s.value}
                checked={subject === s.value}
                onChange={() => {
                  setSubject(s.value);
                  setDetail("");
                  setErrors((e) => ({ ...e, assunto: undefined }));
                }}
                className="size-4 accent-brand-600"
              />
              <span className="text-ink">{s.label}</span>
            </label>
          ))}
        </div>
        <Err id="erro-assunto" msg={errors.assunto} />
      </fieldset>

      {detailOptions.length > 0 && (
        <div>
          <label htmlFor="detalhe" className="font-medium text-ink">
            {subject === "visita" ? "Centro experimental" : subject === "laboratorio" ? "Laboratório" : subject === "pesquisa" ? "Área de pesquisa" : "Serviço"}
          </label>
          <select id="detalhe" name="detalhe" value={detail} onChange={(e) => setDetail(e.target.value)} className={fieldCls()}>
            <option value="">Não sei ainda</option>
            {detailOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="mensagem" className="font-medium text-ink">
          Mensagem *
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={6}
          placeholder="Conte a cultura, a área, o município e o que você precisa…"
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? "erro-mensagem" : undefined}
          className={cn(fieldCls(errors.mensagem), "py-3")}
        />
        <Err id="erro-mensagem" msg={errors.mensagem} />
      </div>

      {/* Campo-armadilha anti-spam: escondido de pessoas e de leitores de tela */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consentimento"
            aria-invalid={!!errors.consentimento}
            aria-describedby={errors.consentimento ? "erro-consentimento" : undefined}
            className="mt-1 size-5 shrink-0 accent-brand-600"
          />
          <span className="text-[0.9375rem] text-ink-soft">
            Concordo que a Fundação MT use estes dados para responder ao meu contato, conforme a{" "}
            <a href={external.privacy} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 underline underline-offset-4">
              política de privacidade
            </a>
            . *
          </span>
        </label>
        <Err id="erro-consentimento" msg={errors.consentimento} />
      </div>

      <div aria-live="polite">
        {status.kind === "fallback" && (
          <div role="alert" className="rounded-[var(--radius-md)] bg-danger-soft p-5 text-ink">
            <p className="font-medium">
              {status.reason === "not_configured"
                ? "O envio direto pelo site ainda não está ativo."
                : status.reason === "rate_limited"
                  ? "Muitas tentativas em pouco tempo."
                  : "Não conseguimos enviar sua mensagem agora."}
            </p>
            <p className="mt-1 text-[0.9375rem] text-ink-soft">Sua mensagem não foi enviada. Fale com a equipe por um destes canais:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={status.mailto} className="inline-flex min-h-11 items-center rounded-full bg-brand-600 px-5 font-medium text-white hover:bg-forest-700">
                Enviar por e-mail (texto já preenchido)
              </a>
              <a href={whatsappLink("Olá, vim pelo site da Fundação MT.")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-white px-5 font-medium text-forest-900 ring-1 ring-line">
                WhatsApp {contact.whatsapp}
              </a>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-600 px-7 font-medium text-white transition-[background-color,transform] hover:bg-forest-700 active:scale-[0.97] disabled:cursor-wait disabled:opacity-80"
      >
        {status.kind === "sending" && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
        {status.kind === "sending" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
