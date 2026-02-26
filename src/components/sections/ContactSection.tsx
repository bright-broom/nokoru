import { Section, Container, SectionHeader, FadeIn, IconBox, simplePreset } from '@/components/ui';
import { ClockIcon, CalendarIcon, MapPinIcon, MailIcon } from '@/components/icons';
import { contactLinks, text } from '@/config';
import { ContactLinkCard, InfoItem } from '@/components/contact/ContactCards';
import { LazyContactForm } from '@/components/contact/LazyContactForm';

export function ContactSection() {
  return (
    <Section id="contact" variant="alternate" aria-labelledby="contact-heading">
      <Container>
        <SectionHeader
          id="contact-heading"
          title={text.sections.contact.title}
          subtitle={text.sections.contact.subtitle}
          className="text-center"
        />

        {/* Response Time Badge */}
        <FadeIn {...simplePreset} delay={100}>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-text-light shadow-sm">
              <MailIcon className="h-4 w-4 text-site-accent" />
              {text.sections.contact.responseTime}
            </span>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Form Section - Takes more space */}
          <FadeIn {...simplePreset} delay={200} className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <IconBox icon={MailIcon} size="sm" />
                <div>
                  <h3 className="font-display text-lg">{text.sections.contact.formHeading}</h3>
                  <p className="text-sm text-text-light">{text.sections.contact.formDescription}</p>
                </div>
              </div>
              <LazyContactForm />
            </div>
          </FadeIn>

          {/* Side Panel */}
          <div className="space-y-6 lg:col-span-2">
            {/* SNS Links */}
            <FadeIn {...simplePreset} delay={300}>
              <div className="rounded-2xl bg-white/50 p-6">
                <h3 className="mb-4 font-display text-lg">{text.sections.contact.otherHeading}</h3>
                <p className="mb-4 text-sm text-text-light">
                  {text.sections.contact.otherDescription}
                </p>
                <nav
                  className="space-y-3"
                  aria-label={text.sections.contact.linksAria}
                >
                  {contactLinks.map((link, index) => (
                    <ContactLinkCard key={link.id} link={link} delay={400 + index * 100} />
                  ))}
                </nav>
              </div>
            </FadeIn>

            {/* Business Info */}
            <FadeIn {...simplePreset} delay={500}>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-sm font-medium text-text-light">基本情報</h4>
                <div className="space-y-4">
                  <InfoItem
                    icon={ClockIcon}
                    label={text.sections.contact.info.businessHoursLabel}
                    value={text.sections.contact.info.businessHoursValue}
                    delay={600}
                  />
                  <InfoItem
                    icon={CalendarIcon}
                    label={text.sections.contact.info.holidaysLabel}
                    value={text.sections.contact.info.holidaysValue}
                    delay={650}
                  />
                  <InfoItem
                    icon={MapPinIcon}
                    label={text.sections.contact.info.areaLabel}
                    value={text.sections.contact.info.areaValue}
                    delay={700}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
