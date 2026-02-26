import { Header } from './Header';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  /** main要素に追加するクラス */
  className?: string;
}

/**
 * 共通ページレイアウト（Header + main + Footer）
 */
export function PageLayout({ children, className = 'py-16 md:py-24' }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main id="main-content" className={className}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
