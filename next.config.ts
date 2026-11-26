import type { NextConfig } from "next";
import { legacyRedirects } from "./src/content/redirects";

/**
 * Imagens institucionais são carregadas do servidor oficial da Fundação MT
 * (não são copiadas para o repositório) até que a autorização de uso e os
 * arquivos originais sejam entregues. Ver docs/CONTENT_SOURCES.md.
 */
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "www.fundacaomt.com.br", pathname: "/storage/**" },
      { protocol: "https", hostname: "www.fundacaomt.com.br", pathname: "/images/**" },
      { protocol: "https", hostname: "www.fundacaomt.com.br", pathname: "/imgs/**" },
      { protocol: "https", hostname: "fundacaomt.com.br", pathname: "/images/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  // Redirecionamentos 301 das URLs do site atual (ver src/content/redirects.ts).
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
