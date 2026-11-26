import { cacheLife } from "next/cache";
import { splitEvents } from "./events";

/**
 * Próximos × anteriores pela data de hoje, com cache de 1 hora.
 * No build estático (Netlify Drop) este módulo é trocado por `event-split.static.ts`
 * via `turbopack.resolveAlias` (ver next.config.ts), porque lá não há cacheComponents.
 */
export async function getEventSplit() {
  "use cache";
  cacheLife("hours");
  return splitEvents(new Date().toISOString().slice(0, 10));
}
