/**
 * Dados institucionais verificados em fundacaomt.com.br (coleta de 21/11/2026).
 * Fonte de cada item: docs/CONTENT_SOURCES.md. Não inventar dados aqui.
 */
/**
 * Endereço do sistema atual (login, inscrições, loja, políticas). Enquanto o
 * novo site não substitui o domínio, é o próprio www.fundacaomt.com.br. Na
 * migração, o sistema legado deve ir para um subdomínio e esta variável deve
 * apontar para ele (ver docs/INTEGRATIONS.md).
 */
export const OFFICIAL = process.env.NEXT_PUBLIC_LEGACY_URL ?? "https://www.fundacaomt.com.br";

export const site = {
  name: "Fundação MT",
  legalName: "Fundação de Apoio à Pesquisa Agropecuária de Mato Grosso",
  cnpj: "70.499.462/0001-80",
  founded: 1993,
  slogan: "Dando vida aos resultados",
  mission:
    "Prover informação técnica, imparcial e confiável que oriente a tomada de decisão do produtor.",
  vision:
    "Ser protagonista na pesquisa agronômica, atualizada e atenta aos problemas do produtor e reconhecida pelo desenvolvimento tecnológico e sustentável da agricultura.",
  purpose:
    "Contribuir para o desenvolvimento sustentável do agronegócio brasileiro, promovendo sua viabilidade para as gerações futuras.",
  values: [
    "Somos imparciais",
    "Buscamos proximidade",
    "Estamos em constante movimento",
    "Cultivamos a busca pelo conhecimento",
    "Buscamos a autossuficiência",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fundacaomt.com.br",
} as const;

export const contact = {
  headquarters: "Centro de Pesquisa Dario Minoru Hiromoto",
  street: "Avenida Antônio Teixeira dos Santos, 1559",
  district: "Parque Residencial Universitário",
  city: "Rondonópolis",
  state: "MT",
  zip: "78750-360",
  phone: "(66) 3439-4100",
  phoneHref: "tel:+556634394100",
  whatsapp: "(66) 99647-9027",
  whatsappHref: "https://api.whatsapp.com/send?phone=5566996479027",
  email: "contato@fundacaomt.com.br",
  reception: "recepcao@fundacaomt.com.br",
  hours: "Segunda a sexta, das 7h às 11h30 e das 13h às 17h20",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Avenida+Ant%C3%B4nio+Teixeira+dos+Santos+1559+Rondon%C3%B3polis+MT",
} as const;

export function whatsappLink(message?: string) {
  return message
    ? `${contact.whatsappHref}&text=${encodeURIComponent(message)}`
    : contact.whatsappHref;
}

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/fundacaomt/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/fundacaomt/" },
  { label: "YouTube", href: "https://www.youtube.com/user/fundacaomt/videos" },
  { label: "Facebook", href: "https://www.facebook.com/fundacaomt" },
] as const;

/** Sistemas oficiais externos, mantidos até haver integração autorizada. */
export const external = {
  userArea: `${OFFICIAL}/#login`,
  careers: "https://atracaodetalentos.totvs.app/trabalheconoscofundacaomt",
  privacy: `${OFFICIAL}/transparencia/privacidade`,
  cookiesPolicy: `${OFFICIAL}/transparencia/cookies`,
  transparency: `${OFFICIAL}/transparencia`,
  lgpd: `${OFFICIAL}/transparencia/lgpd`,
  refunds: `${OFFICIAL}/transparencia/cancelamentos-e-reembolsos`,
  shipping: `${OFFICIAL}/transparencia/envio-e-frete`,
  infrastructureTerms: `${OFFICIAL}/transparencia/infraestrutura`,
  infrastructureRequest: `${OFFICIAL}/comite-gestor`,
  // App Store e Google Play retornavam 404 em 25/11/2026: links fora do site até a Fundação confirmar o app.
  appStore: "https://apps.apple.com/br/app/funda%C3%A7%C3%A3o-mt/id1508392816",
  playStore: "https://play.google.com/store/apps/details?id=com.fundacaomtapp",
  staffPortal: "https://apps.fundacaomt.app.br/Portal-Colaborador",
  report2022: "https://fundacaomt.com.br/storage/pdf/relatorio_de_atividades_fmt_2022_final.pdf",
} as const;

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; intro: string; items: NavItem[] };

export const navigation: NavGroup[] = [
  {
    label: "Pesquisa",
    href: "/pesquisa",
    intro: "Nove áreas de conhecimento, laboratórios e campos experimentais em Mato Grosso.",
    items: [
      { label: "Áreas de pesquisa", href: "/pesquisa", description: "Entomologia, Fitopatologia, Solos e mais" },
      { label: "Centros experimentais", href: "/centros-experimentais", description: "Sede e cinco CADs no estado" },
      { label: "Laboratórios", href: "/laboratorios", description: "Entomologia, Fitopatologia e Nematologia" },
      { label: "Pesquisadores", href: "/pesquisa/equipe", description: "Quem conduz os ensaios" },
    ],
  },
  {
    label: "Serviços",
    href: "/servicos",
    intro: "Consultoria, amostragem de solo, análises e materiais para produtores e empresas.",
    items: [
      { label: "Amostragem de Solo e Diagnóstico", href: "/servicos/amostragem-de-solo-e-diagnostico-completo" },
      { label: "Consultoria Agronômica", href: "/servicos/consultoria-agronomica" },
      { label: "Tecnologia de Aplicação e Variabilidade Espacial", href: "/servicos/tecnologia-de-aplicacao-e-variabilidade-espacial" },
      { label: "Tutoria Nematológica", href: "/servicos/tutoria-nematologica" },
      { label: "Venda de Insetos", href: "/servicos/venda-de-insetos" },
      { label: "Boletim de Pesquisa", href: "/servicos/boletim-de-pesquisa" },
    ],
  },
  {
    label: "Conhecimento",
    href: "/conhecimento",
    intro: "Publicações, informações técnicas e notícias da Fundação MT.",
    items: [
      { label: "Publicações e materiais", href: "/conhecimento" },
      { label: "Informações técnicas", href: "/conhecimento#informacoes-tecnicas" },
      { label: "Notícias", href: "/noticias" },
    ],
  },
  {
    label: "Eventos",
    href: "/eventos",
    intro: "Encontros técnicos, dias de campo e treinamentos do Programa de Difusão de Tecnologia.",
    items: [
      { label: "Próximos eventos", href: "/eventos" },
      { label: "Eventos anteriores", href: "/eventos?periodo=anteriores" },
    ],
  },
  {
    label: "A Fundação",
    href: "/a-fundacao",
    intro: "História, governança, transparência e o Comitê Gestor de Inovação.",
    items: [
      { label: "Quem somos", href: "/a-fundacao" },
      { label: "Missão, visão e valores", href: "/a-fundacao#missao" },
      { label: "Governança", href: "/a-fundacao#governanca" },
      { label: "Comitê Gestor de Inovação", href: "/a-fundacao/comite-gestor-de-inovacao" },
      { label: "Transparência", href: "/a-fundacao/transparencia" },
    ],
  },
];
