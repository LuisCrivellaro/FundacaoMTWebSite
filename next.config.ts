import type { NextConfig } from "next";
import { legacyRedirects } from "./src/content/redirects";
import { STATIC_DEVICE_SIZES, STATIC_IMAGE_SIZES } from "./src/lib/static-image-loader";

/**
 * Build estático para hospedagem só de arquivos (Netlify Drop): `npm run build:netlify`
 * liga STATIC_EXPORT=1. Sem servidor não há API do formulário, otimizador de imagens
 * nem redirecionamentos do Next; o script cobre cada um (ver docs/DEPLOY_NETLIFY_DROP.md).
 * O build normal (`npm run build` + `npm start`) não muda.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  { protocol: "https", hostname: "www.fundacaomt.com.br", pathname: "/storage/**" },
  { protocol: "https", hostname: "www.fundacaomt.com.br", pathname: "/images/**" },
  { protocol: "https", hostname: "www.fundacaomt.com.br", pathname: "/imgs/**" },
  { protocol: "https", hostname: "fundacaomt.com.br", pathname: "/images/**" },
  { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
];

/**
 * Imagens institucionais são carregadas do servidor oficial da Fundação MT
 * (não são copiadas para o repositório) até que a autorização de uso e os
 * arquivos originais sejam entregues. Ver docs/CONTENT_SOURCES.md.
 */
const nextConfig: NextConfig = {
  // Cache Components implica PPR, que não existe no modo export: desligado só no build estático.
  cacheComponents: !staticExport,
  partialPrefetching: !staticExport,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
    // Sem cacheComponents não há "use cache": usa a versão sem cache (data fixa no build).
    ...(staticExport ? { resolveAlias: { "@/content/event-split": "./src/content/event-split.static.ts" } } : {}),
  },
  ...(staticExport
    ? {
        output: "export" as const,
        // /eventos/ → eventos/index.html: funciona em qualquer hospedagem estática
        trailingSlash: true,
        images: {
          loader: "custom" as const,
          loaderFile: "./src/lib/static-image-loader.ts",
          imageSizes: STATIC_IMAGE_SIZES,
          deviceSizes: STATIC_DEVICE_SIZES,
          qualities: [60, 75, 85],
          remotePatterns,
        },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          qualities: [60, 75, 85],
          minimumCacheTTL: 60 * 60 * 24 * 30,
          remotePatterns,
        },
        // Redirecionamentos 301 das URLs do site atual (ver src/content/redirects.ts).
        // No build estático eles viram o arquivo _redirects do Netlify.
        async redirects() {
          return legacyRedirects;
        },
      }),
};

export default nextConfig;
