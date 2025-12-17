import { Section, Container, SectionHeader } from '@/components/ui';
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
      className="flex w-full max-w-xs items-center justify-center gap-3 rounded-lg bg-white px-6 py-4 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
      <Container size="narrow" className="text-center">
        <SectionHeader
          id="contact-heading"
          title="Contact"
          subtitle="撮影のご相談・お見積りはお気軽にどうぞ"
        />
        <nav
          className="mt-12 flex flex-col items-center gap-4"
          aria-label="連絡先リンク"
        >
          {contactLinks.map((link) => (
            <ContactLinkCard key={link.id} link={link} />
          ))}
        </nav>
      </Container>
    </Section>
  );
}
