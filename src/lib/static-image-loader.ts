/**
 * Loader de imagens do build estático (`npm run build:netlify`, STATIC_EXPORT=1).
 *
 * Num site estático não existe o otimizador do Next. Em vez de mandar o
 * visitante baixar os originais (até 7 MB) do servidor da Fundação MT, cada
 * foto oficial aponta para `/img/<largura>/<chave>.webp`. Esses arquivos são
 * gerados por `scripts/build-netlify.mjs`, que importa este mesmo arquivo
 * (Node 24 executa TypeScript simples) para calcular as chaves.
 *
 * Só sintaxe TypeScript "apagável" aqui (sem enum/namespace) e sem imports.
 */

/** Larguras geradas para cada foto (imageSizes + deviceSizes do build estático). */
export const STATIC_IMAGE_SIZES = [96, 256];
export const STATIC_DEVICE_SIZES = [640, 1080, 1600, 2048];
export const STATIC_IMAGE_WIDTHS = [...STATIC_IMAGE_SIZES, ...STATIC_DEVICE_SIZES];

const OPTIMIZED_HOSTS = ["www.fundacaomt.com.br", "fundacaomt.com.br"];

/** Fotos do servidor oficial são convertidas; SVG e outros domínios (YouTube) passam direto. */
export function isOptimizable(src: string) {
  try {
    const url = new URL(src);
    return OPTIMIZED_HOSTS.includes(url.hostname) && !/\.svg$/i.test(url.pathname);
  } catch {
    return false;
  }
}

/** Chave estável e curta para a URL (FNV-1a de 32 bits + tamanho, em base 36). */
export function imageKey(src: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < src.length; i++) {
    h ^= src.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${h.toString(36)}${src.length.toString(36)}`;
}

export default function staticImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!isOptimizable(src)) return src;
  return `/img/${width}/${imageKey(src)}.webp`;
}
