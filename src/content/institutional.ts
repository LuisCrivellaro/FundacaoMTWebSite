import { OFFICIAL, external } from "./site";

/** Conteúdo institucional — fonte: /sobre-nos, /comite-gestor, /transparencia e /relatorio-de-atividades. */

export const history = [
  "Nossa história começa em 1993. Alcançar altas produtividades com soja de forma sustentável, nas terras de Mato Grosso, ainda era muito difícil. Vinte e três produtores decidiram unir forças para encontrar soluções que tornassem a agricultura da região sustentável e rentável, num lugar em que poucos acreditavam.",
  "Desde então, a Fundação MT dá suporte à classe agrícola com tecnologias aplicadas à agricultura. Hoje Mato Grosso é um dos maiores produtores de grãos do mundo.",
  "A pesquisa que desenvolvemos e difundimos busca aumentar a produtividade com bom uso do solo, para que as mesmas áreas continuem produzindo sem degradação e com ganhos de fertilidade. Ano a ano, os experimentos mostram que é possível equilibrar eficiência, rentabilidade, conservação, inovação e preservação da saúde humana, animal e do meio ambiente.",
];

/** Linha do tempo apenas com datas publicadas pela própria Fundação MT. */
export const timeline = [
  { year: "1993", text: "23 produtores criam a Fundação MT para buscar soluções para a agricultura de Mato Grosso." },
  { year: "2008", text: "Criação do CAD Sul, onde começam os experimentos de longa duração em sistemas de produção." },
  { year: "2013", text: "O CAD Médio Norte inaugura um modelo de pesquisa aberto a visitas e dias de campo." },
  { year: "2015", text: "Criação do CAD Oeste, voltado ao algodão de segunda safra, e do CAD Primavera." },
  { year: "2019", text: "Com o CAD Norte, a Fundação MT volta a ter uma estação de pesquisa na região de Sorriso." },
  { year: "2021", text: "Criação do setor de Data Science e consolidação dos eventos digitais e do estúdio de transmissão." },
];

export const councilPresidents = [
  { name: "Gilberto Goellner", period: "1993–1998", photo: "https://www.fundacaomt.com.br/imgs/inside/dir_gilberto.jpg" },
  { name: "Blairo Maggi", period: "1999–2001", photo: "https://www.fundacaomt.com.br/imgs/inside/dir_blairo.jpg" },
  { name: "Celso Griesang", period: "2002", photo: "https://www.fundacaomt.com.br/imgs/inside/dir_celso.jpg" },
  { name: "Hugo Ribeiro", period: "2003–2013", photo: "https://www.fundacaomt.com.br/imgs/inside/dir_hugo.jpg" },
  { name: "Odílio Balbinotti Filho", period: "2014–2024", photo: "https://www.fundacaomt.com.br/imgs/inside/dir_odilio.jpg" },
];

export const currentLeadership = [
  {
    name: "Marcelo Vendrame",
    role: "Presidente do Conselho Curador",
    period: "2024 – atual",
    photo: "https://www.fundacaomt.com.br/imgs/inside/Marcelo_Vendrame.jpg",
  },
  { name: "Romão Viana", role: "Diretor-presidente", period: "", photo: "https://www.fundacaomt.com.br/imgs/inside/Romao_Viana.jpg" },
];

export const innovationCommittee = {
  intro: [
    "O Comitê Gestor de Inovação orienta, acompanha e fortalece as atividades de pesquisa, desenvolvimento e inovação (PD&I) da Fundação MT, em linha com a Política Institucional de Inovação.",
    "Ele garante que os investimentos em infraestrutura científica, projetos de pesquisa e parcerias tecnológicas sigam a missão de prover informação técnica, imparcial e confiável ao produtor rural e ao setor agropecuário.",
  ],
  duties: [
    "Orientar a implementação da Política Institucional de Inovação",
    "Avaliar propostas de projetos de pesquisa, desenvolvimento e inovação",
    "Analisar e deliberar sobre pedidos de uso da infraestrutura científica e laboratorial",
    "Integrar pesquisadores, empresas, produtores e instituições de ciência e tecnologia",
    "Acompanhar o uso e o desempenho da infraestrutura financiada com recursos públicos",
    "Propor melhorias na gestão da inovação e no acesso à infraestrutura",
    "Apoiar a proteção da propriedade intelectual e a transferência de tecnologia",
  ],
  whoCanApply: [
    "Pesquisadores da própria Fundação MT",
    "Instituições de ciência e tecnologia (ICTs)",
    "Universidades e centros de pesquisa",
    "Empresas e organizações do setor produtivo",
    "Parceiros institucionais em projetos de PD&I",
  ],
  criteria: [
    "Alinhamento com a missão institucional",
    "Relevância científica ou tecnológica da proposta",
    "Disponibilidade da infraestrutura",
    "Capacidade técnica da equipe solicitante",
    "Impacto potencial para o setor agropecuário",
  ],
  terms: ["Termo de responsabilidade", "Acordo de confidencialidade (NDA)", "Contrato de parceria ou prestação de serviços"],
  hours: "Uso da infraestrutura preferencialmente de segunda a sexta, das 8h às 18h. Outros horários podem ser autorizados mediante justificativa e disponibilidade da equipe técnica.",
  requestHref: external.infrastructureRequest,
  termsHref: external.infrastructureTerms,
};

export const transparencyDocs = [
  { title: "Política de privacidade", text: "Tratamento de dados pessoais de cadastro e perfil.", href: `${OFFICIAL}/transparencia/privacidade` },
  { title: "Uso de infraestrutura", text: "Termos para solicitar CAD, laboratório e demais estruturas.", href: `${OFFICIAL}/transparencia/infraestrutura` },
  { title: "Compra, cancelamento e reembolso", text: "Regras de compra e desistência de inscrições em eventos.", href: `${OFFICIAL}/transparencia/cancelamentos-e-reembolsos` },
  { title: "Envio e frete", text: "Prazos e regras para produtos físicos, como o Boletim.", href: `${OFFICIAL}/transparencia/envio-e-frete` },
  { title: "Cookies", text: "Como o site usa cookies e tecnologias semelhantes.", href: `${OFFICIAL}/transparencia/cookies` },
  { title: "Cartilha LGPD", text: "Orientações sobre a Lei Geral de Proteção de Dados.", href: `${OFFICIAL}/transparencia/lgpd` },
];

export const reports = [
  {
    title: "Relatório de Atividades 2022",
    text: "Documento oficial em PDF publicado pela Fundação MT.",
    href: external.report2022,
  },
];
