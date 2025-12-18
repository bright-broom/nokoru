import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { InstagramIcon } from '@/components/icons';
import { text } from '@/config/text';

export function Footer() {
  return (
    <footer
      className="bg-linear-to-b from-text to-text/95 py-16 text-cream"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-cream/30" />
          <span className="text-cream/40">{text.footer.decorativeMark}</span>
          <div className="h-px w-12 bg-cream/30" />
        </div>

        <p className="text-center font-display text-2xl tracking-widest">
          {siteConfig.name}
        </p>

        <div className="mt-6 flex justify-center gap-6">
          <Link
            href={text.content.links.instagramFooter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream/70 transition-all hover:border-cream hover:text-cream hover:scale-110"
            aria-label={text.footer.instagramFollowAria}
          >
            <InstagramIcon className="h-5 w-5" />
          </Link>
        </div>

        <div className="mx-auto mt-10 h-px w-24 bg-cream/20" />

        <p className="mt-6 text-center text-sm text-cream/50">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
