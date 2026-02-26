import type { Metadata } from 'next';
import Link from 'next/link';
import { text, contactLinks } from '@/config';
import { Header, Footer } from '@/components/layout';
import { FadeIn, IconBox, simplePreset } from '@/components/ui';
import { ClockIcon, CalendarIcon, MapPinIcon, MailIcon } from '@/components/icons';
import { ContactLinkCard, InfoItem } from '@/components/contact/ContactCards';
import { LazyContactForm } from '@/components/contact/LazyContactForm';

export const metadata: Metadata = {
  title: `${text.pages.contact.metaTitle} | ${text.site.name}`,
  description: text.pages.contact.metaDescription,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main id="main-content" className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <nav className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-light transition hover:text-text"
            >
              <span aria-hidden="true">←</span>
              {text.pages.contact.backToTop}
            </Link>
          </nav>

          {/* Header */}
          <FadeIn {...simplePreset}>
            <div className="mb-12 text-center">
              <h1 className="font-display text-3xl tracking-wide md:text-4xl">
                {text.sections.contact.title}
              </h1>
              <p className="mt-3 text-text-light">
                {text.sections.contact.subtitle}
              </p>
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-text-light shadow-sm">
                  <MailIcon className="h-4 w-4 text-site-accent" />
                  {text.sections.contact.responseTime}
                </span>
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Form Section */}
            <FadeIn {...simplePreset} delay={100} className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <IconBox icon={MailIcon} size="sm" />
                  <div>
                    <h2 className="font-display text-lg">{text.sections.contact.formHeading}</h2>
                    <p className="text-sm text-text-light">{text.sections.contact.formDescription}</p>
                  </div>
                </div>
                <LazyContactForm />
              </div>
            </FadeIn>

            {/* Side Panel */}
            <div className="space-y-6 lg:col-span-2">
              {/* SNS Links */}
              <FadeIn {...simplePreset} delay={200}>
                <div className="rounded-2xl bg-beige/30 p-6">
                  <h3 className="mb-4 font-display text-lg">{text.sections.contact.otherHeading}</h3>
                  <p className="mb-4 text-sm text-text-light">
                    {text.sections.contact.otherDescription}
                  </p>
                  <nav
                    className="space-y-3"
                    aria-label={text.sections.contact.linksAria}
                  >
                    {contactLinks.map((link, index) => (
                      <ContactLinkCard key={link.id} link={link} delay={300 + index * 100} />
                    ))}
                  </nav>
                </div>
              </FadeIn>

              {/* Business Info */}
              <FadeIn {...simplePreset} delay={400}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h4 className="mb-4 text-sm font-medium text-text-light">基本情報</h4>
                  <div className="space-y-4">
                    <InfoItem
                      icon={ClockIcon}
                      label={text.sections.contact.info.businessHoursLabel}
                      value={text.sections.contact.info.businessHoursValue}
                      delay={500}
                    />
                    <InfoItem
                      icon={CalendarIcon}
                      label={text.sections.contact.info.holidaysLabel}
                      value={text.sections.contact.info.holidaysValue}
                      delay={550}
                    />
                    <InfoItem
                      icon={MapPinIcon}
                      label={text.sections.contact.info.areaLabel}
                      value={text.sections.contact.info.areaValue}
                      delay={600}
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
