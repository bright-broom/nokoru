import { setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  WorksSection,
  ServicesSection,
  PlansSection,
  AboutSection,
  TestimonialsSection,
  BookingSection,
} from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { siteConfig } from '@/config';

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
