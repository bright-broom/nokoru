import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { text, contactLinks } from '@/config';
import { Header, Footer } from '@/components/layout';
import { FadeIn } from '@/components/ui';
import {
  InstagramIcon,
  LinkIcon,
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  MailIcon,
  SendIcon,
} from '@/components/icons';
import { cn, getExternalLinkProps } from '@/lib/utils';
import type { ContactLink } from '@/types';

// フォームを遅延読み込み
const ContactForm = dynamic(
  () => import('@/components/forms/ContactForm').then((mod) => mod.ContactForm),
  {
    loading: () => (
      <div className="animate-pulse rounded-xl bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 rounded bg-beige" />
              <div className="h-11 w-full rounded-lg bg-beige" />
            </div>
          ))}
          <div className="h-12 w-full rounded-full bg-site-accent/20" />
        </div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: `${text.pages.contact.metaTitle} | ${text.site.name}`,
  description: text.pages.contact.metaDescription,
};

const iconMap = {
  instagram: InstagramIcon,
  link: LinkIcon,
} as const;

function ContactLinkCard({ link, delay }: { link: ContactLink; delay: number }) {
  const Icon = iconMap[link.icon];
  const externalProps = getExternalLinkProps(link.isExternal);

  return (
    <FadeIn direction="up" delay={delay}>
      <a
        href={link.href}
        className={cn(
          'group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm',
          'border-2 border-transparent transition-all duration-300',
          'hover:border-site-accent/30 hover:shadow-md hover:-translate-y-0.5'
        )}
        aria-label={`${link.label}${link.isExternal ? text.sections.contact.info.externalSuffix : ''}`}
        {...externalProps}
      >
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
            'bg-site-accent/10 transition-all duration-300',
            'group-hover:bg-site-accent group-hover:scale-110'
          )}
        >
          <Icon
            className={cn(
              'h-5 w-5 text-site-accent transition-colors duration-300',
              'group-hover:text-white'
            )}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-text group-hover:text-site-accent transition-colors">
            {link.label}
          </p>
          <p className="text-xs text-text-light">
            {link.icon === 'instagram' ? 'Instagram' : 'Website'}
          </p>
        </div>
        <SendIcon className="h-4 w-4 text-text-light/50 transition-transform group-hover:translate-x-1 group-hover:text-site-accent" />
      </a>
    </FadeIn>
  );
}

interface InfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delay: number;
}

function InfoItem({ icon: Icon, label, value, delay }: InfoItemProps) {
  return (
    <FadeIn direction="up" delay={delay}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-site-accent/10">
          <Icon className="h-4 w-4 text-site-accent" />
        </div>
        <div>
          <p className="text-xs text-text-light">{label}</p>
          <p className="text-sm font-medium text-text">{value}</p>
        </div>
      </div>
    </FadeIn>
  );
}

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
          <FadeIn direction="up">
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
            <FadeIn direction="up" delay={100} className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-site-accent/10">
                    <MailIcon className="h-5 w-5 text-site-accent" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg">{text.sections.contact.formHeading}</h2>
                    <p className="text-sm text-text-light">{text.sections.contact.formDescription}</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Side Panel */}
            <div className="space-y-6 lg:col-span-2">
              {/* SNS Links */}
              <FadeIn direction="up" delay={200}>
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
              <FadeIn direction="up" delay={400}>
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
