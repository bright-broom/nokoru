import { FadeIn } from '@/components/ui';
import { InstagramIcon, LinkIcon, SendIcon } from '@/components/icons';
import { text } from '@/config';
import { cn, getExternalLinkProps, iconBoxStyles } from '@/lib/utils';
import type { ContactLink } from '@/types';

const iconMap = {
  instagram: InstagramIcon,
  link: LinkIcon,
} as const;

interface ContactLinkCardProps {
  link: ContactLink;
  delay: number;
}

export function ContactLinkCard({ link, delay }: ContactLinkCardProps) {
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
            'h-12 w-12 shrink-0 rounded-full',
            iconBoxStyles.base,
            iconBoxStyles.groupHover
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
          <p className="truncate text-sm font-medium text-text transition-colors group-hover:text-site-accent">
            {link.label}
          </p>
          <p className="text-sm text-text-light">
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

export function InfoItem({ icon: Icon, label, value, delay }: InfoItemProps) {
  return (
    <FadeIn direction="up" delay={delay}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-site-accent/10">
          <Icon className="h-4 w-4 text-site-accent" />
        </div>
        <div>
          <p className="text-sm text-text-light">{label}</p>
          <p className="text-sm font-medium text-text">{value}</p>
        </div>
      </div>
    </FadeIn>
  );
}
