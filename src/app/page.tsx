import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  WorksSection,
  ServicesSection,
  PlansSection,
  AboutSection,
  BookingSection,
} from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { siteConfig } from '@/config';

export default function HomePage() {
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
        <BookingSection calLink={siteConfig.calLink} />
      </main>

      <Footer />
    </div>
  );
}
