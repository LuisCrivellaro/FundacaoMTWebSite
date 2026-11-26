import type { MetadataRoute } from "next";
import { isPreviewDeploy, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Prévia (Netlify etc.): bloqueia tudo e não anuncia sitemap.
  if (isPreviewDeploy) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/busca"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
