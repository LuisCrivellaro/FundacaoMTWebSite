import { NextResponse } from "next/server";

/**
 * Recebe o formulário de contato.
 * - Valida no servidor (nunca confiar só no navegador).
 * - Descarta envios com o campo-armadilha preenchido (anti-spam).
 * - Encaminha para CONTACT_WEBHOOK_URL (ex.: RD Station, Make, Zapier ou o
 *   back-end da Fundação). Sem essa variável, responde 503 e o site oferece
 *   e-mail e WhatsApp: nunca simula um envio que não aconteceu.
 * Ver docs/INTEGRATIONS.md.
 */
const SUBJECTS = ["servico", "pesquisa", "laboratorio", "visita", "evento", "imprensa", "infraestrutura", "outro"] as const;
const hits = new Map<string, { count: number; reset: number }>();

function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60_000 });
    return false;
  }
  h.count += 1;
  return h.count > 5;
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Campo-armadilha: pessoas não veem nem preenchem
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const str = (k: string, max = 2000) => (typeof data[k] === "string" ? (data[k] as string).trim().slice(0, max) : "");
  const payload = {
    nome: str("nome", 120),
    email: str("email", 160),
    telefone: str("telefone", 30),
    cidade: str("cidade", 120),
    assunto: str("assunto", 40),
    detalhe: str("detalhe", 160),
    mensagem: str("mensagem", 4000),
    consentimento: data.consentimento === true,
    origem: "site-novo",
    enviadoEm: new Date().toISOString(),
  };

  const errors: Record<string, string> = {};
  if (payload.nome.length < 3) errors.nome = "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) errors.email = "Informe um e-mail válido.";
  if (payload.telefone && payload.telefone.replace(/\D/g, "").length < 10) errors.telefone = "Informe o telefone com DDD.";
  if (!SUBJECTS.includes(payload.assunto as (typeof SUBJECTS)[number])) errors.assunto = "Escolha um assunto.";
  if (payload.mensagem.length < 10) errors.mensagem = "Escreva sua mensagem (pelo menos 10 caracteres).";
  if (!payload.consentimento) errors.consentimento = "É preciso concordar com o uso dos dados para responder.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
