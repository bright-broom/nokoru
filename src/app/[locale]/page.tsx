import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { HeroSection, WorksSection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { siteConfig } from '@/config';

// Below-the-fold セクションを遅延読み込み（初期バンドルサイズを削減）
const ServicesSection = dynamic(
  () => import('@/components/sections/ServicesSection').then((mod) => mod.ServicesSection),
  { ssr: true }
);
const PlansSection = dynamic(
  () => import('@/components/sections/PlansSection').then((mod) => mod.PlansSection),
  { ssr: true }
);
const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then((mod) => mod.AboutSection),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection').then((mod) => mod.TestimonialsSection),
  { ssr: true }
);
const BookingSection = dynamic(
  () => import('@/components/sections/BookingSection').then((mod) => mod.BookingSection),
  { ssr: true }
);

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen bg-cream">
      <JsonLd />
      <Header />

      <main id="main-content" className="pt-24 md:pt-28">
        <HeroSection />
        <WorksSection />
        <ServicesSection />
        <PlansSection />
        <AboutSection />
        <TestimonialsSection />
        <BookingSection calLink={siteConfig.calLink} />
      </main>

      <Footer />
    </div>
  );
}
