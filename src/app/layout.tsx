import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { contact, site, social } from "@/content/site";
import { media } from "@/content/media";
import "./globals.css";

const sentient = localFont({
  src: [
    { path: "../fonts/Sentient-Variable.woff2", style: "normal", weight: "200 700" },
  ],
  variable: "--font-sentient",
  display: "swap",
});

const generalSans = localFont({
  src: [{ path: "../fonts/GeneralSans-Variable.woff2", style: "normal", weight: "200 700" }],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Fundação MT | Pesquisa agronômica em Mato Grosso",
    template: "%s | Fundação MT",
  },
  description:
    "Pesquisa agronômica aplicada desde 1993: áreas de pesquisa, centros experimentais, laboratórios, serviços e eventos técnicos para o produtor de Mato Grosso.",
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    images: [{ url: media.aerialSul.src, width: 1200, height: 800, alt: media.aerialSul.alt }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "https://www.fundacaomt.com.br/images/favicons/favicon-32x32.png", sizes: "32x32" }],
    apple: "https://www.fundacaomt.com.br/images/favicons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: media.logoHorizontal.src,
  foundingDate: String(site.founded),
  slogan: site.slogan,
  email: contact.email,
  telephone: "+55-66-3439-4100",
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    addressLocality: contact.city,
    addressRegion: contact.state,
    postalCode: contact.zip,
    addressCountry: "BR",
  },
  sameAs: social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${sentient.variable} ${generalSans.variable}`} data-scroll-behavior="smooth">
      <body className="flex min-h-svh flex-col">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-forest-950 px-5 py-3 font-medium text-white transition-transform focus-visible:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
