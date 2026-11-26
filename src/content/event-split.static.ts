import { splitEvents } from "./events";

/**
 * Versão do build estático (`npm run build:netlify`): a divisão fica fixa na data do build.
 * Substitui `event-split.ts` via `turbopack.resolveAlias` em next.config.ts.
 */
export async function getEventSplit() {
  return splitEvents(new Date().toISOString().slice(0, 10));
}
