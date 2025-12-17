import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  ServicesSection,
  PlansSection,
  OptionsSection,
  AboutSection,
  ContactSection,
} from '@/components/sections';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main id="main-content" role="main">
        <HeroSection />
        <ServicesSection />
        <PlansSection />
        <OptionsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
