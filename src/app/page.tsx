import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  WorksSection,
  ServicesSection,
  PlansSection,
  OptionsSection,
  AboutSection,
  BookingSection,
  ContactSection,
} from '@/components/sections';
import { JsonLd } from '@/components/seo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <JsonLd />
      <Header />

      <main id="main-content" role="main">
        <HeroSection />
        <WorksSection />
        <ServicesSection />
        <PlansSection />
        <OptionsSection />
        <AboutSection />
        <BookingSection calLink="toshiki-sakuta-ohgi5i" />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
