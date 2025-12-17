import { Section, Container, SectionHeader } from '@/components/ui';
import { ContactForm } from '@/components/forms';
import { InstagramIcon, LinkIcon } from '@/components/icons';
import { contactLinks } from '@/config/site';
import { getExternalLinkProps } from '@/lib/utils';
import type { ContactLink } from '@/types';

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
      aria-label={`${link.label}${link.isExternal ? '（外部サイト、新しいタブで開きます）' : ''}`}
      {...externalProps}
    >
      <Icon className="h-5 w-5" aria-hidden={true} />
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
          title="Contact"
          subtitle="撮影のご相談・お見積りはお気軽にどうぞ"
          className="text-center"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <div>
            <h3 className="mb-6 font-display text-xl">予約相談・お問い合わせフォーム</h3>
            <ContactForm />
          </div>

          {/* Contact Links & Info */}
          <div>
            <h3 className="mb-6 font-display text-xl">その他のお問い合わせ方法</h3>
            <div className="rounded-lg bg-white p-6 md:p-8">
              <p className="mb-6 text-text-light">
                フォーム以外でのお問い合わせは、
                <br />
                以下のリンクからお気軽にどうぞ。
              </p>
              <nav
                className="flex flex-col gap-4"
                aria-label="連絡先リンク"
              >
                {contactLinks.map((link) => (
                  <ContactLinkCard key={link.id} link={link} />
                ))}
              </nav>

              <div className="mt-8 border-t border-beige pt-6">
                <p className="text-sm text-text-light">
                  <strong className="text-text">営業時間:</strong> 10:00〜19:00
                  <br />
                  <strong className="text-text">定休日:</strong> 不定休
                  <br />
                  <strong className="text-text">対応エリア:</strong> 大阪・関西エリア
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
