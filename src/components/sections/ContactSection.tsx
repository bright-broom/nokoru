import dynamic from 'next/dynamic';
import { Section, Container, SectionHeader } from '@/components/ui';
import { InstagramIcon, LinkIcon } from '@/components/icons';
import { contactLinks, text } from '@/config';
import { getExternalLinkProps } from '@/lib/utils';
import type { ContactLink } from '@/types';

// フォームを遅延読み込み（フォールドより下のため初期ロードを軽量化）
const ContactForm = dynamic(
  () => import('@/components/forms/ContactForm').then((mod) => mod.ContactForm),
  {
    loading: () => (
      <div className="animate-pulse rounded-lg bg-white p-6 md:p-8">
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 rounded bg-beige" />
              <div className="h-10 w-full rounded bg-beige" />
            </div>
          ))}
          <div className="h-12 w-full rounded bg-beige" />
        </div>
      </div>
    ),
  }
);

const iconMap = {
  instagram: InstagramIcon,
  link: LinkIcon,
} as const;

function ContactLinkCard({ link }: { link: ContactLink }) {
  const Icon = iconMap[link.icon];
  const externalProps = getExternalLinkProps(link.isExternal);

  return (
    <a
      href={link.href}
      className="flex items-center justify-center gap-3 rounded-lg bg-white px-6 py-4 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
      aria-label={`${link.label}${link.isExternal ? text.sections.contact.info.externalSuffix : ''}`}
      {...externalProps}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span>{link.label}</span>
    </a>
  );
}

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

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="mb-6 font-display text-xl">{text.sections.contact.formHeading}</h3>
            <ContactForm />
          </div>

          <div>
            <h3 className="mb-6 font-display text-xl">{text.sections.contact.otherHeading}</h3>
            <div className="rounded-lg bg-white p-6 md:p-8">
              <p className="mb-6 whitespace-pre-line text-text-light">
                {text.sections.contact.otherDescription}
              </p>
              <nav
                className="flex flex-col gap-4"
                aria-label={text.sections.contact.linksAria}
              >
                {contactLinks.map((link) => (
                  <ContactLinkCard key={link.id} link={link} />
                ))}
              </nav>

              <div className="mt-8 border-t border-beige pt-6">
                <p className="text-sm text-text-light">
                  <strong className="text-text">{text.sections.contact.info.businessHoursLabel}</strong>{' '}
                  {text.sections.contact.info.businessHoursValue}
                  <br />
                  <strong className="text-text">{text.sections.contact.info.holidaysLabel}</strong>{' '}
                  {text.sections.contact.info.holidaysValue}
                  <br />
                  <strong className="text-text">{text.sections.contact.info.areaLabel}</strong>{' '}
                  {text.sections.contact.info.areaValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
