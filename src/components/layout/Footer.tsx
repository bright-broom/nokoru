import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer
      className="bg-text py-12 text-center text-cream"
      role="contentinfo"
    >
      <p className="font-display text-lg">{siteConfig.name}</p>
      <p className="mt-2 text-sm text-cream/60">{siteConfig.copyright}</p>
    </footer>
  );
}
