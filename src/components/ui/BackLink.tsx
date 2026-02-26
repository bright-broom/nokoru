import Link from 'next/link';

interface BackLinkProps {
  href: string;
  label: string;
}

/**
 * ページ上部の戻るリンク
 */
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <nav className="mb-12">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm text-text-light transition hover:text-text"
      >
        <span aria-hidden="true">←</span>
        {label}
      </Link>
    </nav>
  );
}
