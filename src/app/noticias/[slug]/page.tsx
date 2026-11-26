import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Primitives";
import { NewsCard } from "@/components/cards";
import { ShareLinks } from "@/components/ShareLinks";
import { getNews, leadOf, news, relatedNews, topicsOf } from "@/content/news";
import { formatDate } from "@/lib/format";
import { site } from "@/content/site";

// Todas as páginas são pré-geradas no build; a rota pode bloquear na navegação sem custo perceptível.
export const instant = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) return {};
  return {
    title: n.title,
    description: leadOf(n),
    alternates: { canonical: `/noticias/${n.slug}` },
    openGraph: { type: "article", publishedTime: n.date, images: n.image ? [{ url: n.image }] : undefined },
  };
}

export default async function ArticlePage({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) notFound();
  const related = relatedNews(n);
  const topics = topicsOf(n);
  const firstImg = n.body.findIndex((b) => b.type === "img" && b.src === n.image);
  const body = n.body.filter((_, i) => i !== firstImg);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title,
    datePublished: n.date,
    image: n.image ? [n.image] : undefined,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/noticias/${n.slug}`,
  };

  return (
    <>
      <article>
        <header className="wrap pt-6 pb-10">
          <Breadcrumbs items={[{ label: "Notícias", href: "/noticias" }, { label: n.title }]} />
          <div className="mx-auto mt-8 max-w-3xl">
            <p className="text-ink-mute">
              <time dateTime={n.date}>{formatDate(n.date)}</time> · {n.readingMinutes} min de leitura
            </p>
            <h1 className="mt-3 font-display text-h1 font-[420] text-ink">{n.title}</h1>
            {topics.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <li key={t}>
                    <Link href={`/noticias?tema=${encodeURIComponent(t)}`} className="inline-flex min-h-9 items-center rounded-full bg-leaf-100 px-3 text-[0.8125rem] font-medium text-forest-800 hover:bg-leaf-200">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        {n.image && (
          <div className="wrap">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[var(--radius-lg)] bg-sand">
              <Image src={n.image} alt="" fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="wrap py-12 md:py-16">
          <div className="prose-article mx-auto max-w-[68ch] text-[1.125rem] leading-[1.7] text-ink-soft">
            {body.map((b, i) => {
              if (b.type === "p") return <p key={i}>{b.text}</p>;
              if (b.type === "h") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "quote") return <blockquote key={i}>{b.text}</blockquote>;
              if (b.type === "li")
                return (
                  <ul key={i}>
                    <li>{b.text}</li>
                  </ul>
                );
              if (b.type === "img")
                return (
                  <figure key={i} className="relative my-8 aspect-[3/2] overflow-hidden rounded-[var(--radius-md)] bg-sand">
                    <Image src={b.src} alt={b.alt} fill sizes="(min-width: 768px) 68ch, 100vw" className="object-cover" />
                  </figure>
                );
              if (b.type === "video") {
                const id = b.src.split("/embed/")[1];
                return (
                  <div key={i} className="relative my-8 aspect-video overflow-hidden rounded-[var(--radius-md)] bg-forest-950">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${id}`}
                      title={`Vídeo: ${n.title}`}
                      loading="lazy"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 size-full border-0"
                    />
                  </div>
                );
              }
              return null;
            })}
            <div className="!mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-base">
              <ShareLinks title={n.title} path={`/noticias/${n.slug}`} />
              <a href={n.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-mute underline underline-offset-4 hover:text-brand-600">
                Publicada originalmente no site da Fundação MT
              </a>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="relacionadas" className="bg-white py-20">
          <div className="wrap">
            <h2 id="relacionadas" className="font-display text-h3 text-ink">
              Leia também
            </h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <NewsCard key={r.slug} item={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
