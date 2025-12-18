import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn } from '@/components/ui';
import { CheckIcon, StarIcon } from '@/components/icons';
import { plans, text } from '@/config';
import { cn } from '@/lib/utils';
import { renderMultilineText } from '@/lib/helpers';
import type { Plan } from '@/types';

function PlanCard({ plan, delay }: { plan: Plan; delay: number }) {
  const isComingSoon = plan.isComingSoon;
  const isRecommended = plan.isRecommended;

  return (
    <FadeIn direction="up" delay={delay}>
      <Link
        href={`/plans/${plan.id}`}
        className={cn(
          'group relative block h-full rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl',
          isComingSoon && 'border-2 border-dashed border-beige bg-linear-to-br from-beige/30 to-transparent opacity-80',
          isRecommended && 'border-2 border-site-accent bg-white ring-4 ring-site-accent/10 scale-[1.02]',
          !isComingSoon && !isRecommended && 'border border-beige/60 bg-white hover:-translate-y-1'
        )}
      >
        {isRecommended && (
          <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-site-accent to-site-accent/80 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
            <StarIcon className="h-3.5 w-3.5" />
            {text.sections.plans.recommendedBadge}
          </div>
        )}
        <h3
          className={cn(
            'font-display text-2xl',
            isComingSoon && 'text-text-light',
            isRecommended && 'mt-2'
          )}
        >
          {plan.name}
        </h3>
        <p
          className={cn(
            'mt-3 text-3xl font-light tracking-tight',
            isComingSoon && 'text-text-light'
          )}
        >
          {plan.price}
          {plan.priceNote && (
            <span className="ml-1 text-base font-normal text-text-light">{plan.priceNote}</span>
          )}
        </p>

        {plan.features.length > 0 ? (
          <ul className="mt-8 space-y-4 text-sm">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-site-accent/10">
                  <CheckIcon className="h-3.5 w-3.5 text-site-accent" />
                </span>
                <span className="text-text-light">{feature.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          plan.description && (
            <p className="mt-8 text-sm leading-relaxed text-text-light">
              {renderMultilineText(plan.description)}
            </p>
          )
        )}
      </Link>
    </FadeIn>
  );
}

export function PlansSection() {
  return (
    <Section id="plans" aria-labelledby="plans-heading">
      <Container>
        <SectionHeader
          id="plans-heading"
          title={text.sections.plans.title}
          subtitle={text.sections.plans.subtitle}
        />
        <ul
          className="mt-16 grid list-none gap-8 md:grid-cols-3"
          aria-label={text.sections.plans.listAria}
        >
          {plans.map((plan, index) => (
            <li key={plan.id}>
              <PlanCard plan={plan} delay={index * 150} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
