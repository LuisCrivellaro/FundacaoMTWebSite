import { site } from "@/content/site";

/** Links de compartilhamento sem scripts de terceiros. */
export function ShareLinks({ title, path }: { title: string; path: string }) {
  const url = encodeURIComponent(`${site.url}${path}`);
  const text = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${text}%20${url}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <span className="text-sm text-ink-mute">Compartilhar:</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center text-sm font-medium text-brand-600 hover:underline">
          {l.label}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      ))}
    </div>
  );
}
