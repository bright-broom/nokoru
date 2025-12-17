import { Section, Container, SectionHeader } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { plans } from '@/config/site';
import { cn, renderMultilineText } from '@/lib/utils';
import type { Plan } from '@/types';

function PlanCard({ plan }: { plan: Plan }) {
  const isComingSoon = plan.isComingSoon;
  const isRecommended = plan.isRecommended;

  return (
    <article
      className={cn(
        'rounded-lg p-8',
        isComingSoon && 'border border-beige bg-beige/50',
        isRecommended && 'border-2 border-accent bg-white',
        !isComingSoon && !isRecommended && 'border border-beige bg-white'
      )}
    >
      {isRecommended && (
        <div className="mb-4 inline-block rounded bg-accent px-3 py-1 text-xs text-white">
          おすすめ
        </div>
      )}
      <h3
        className={cn(
          'font-display text-2xl',
          isComingSoon && 'text-text-light'
        )}
      >
        {plan.name}
      </h3>
      <p
        className={cn(
          'mt-2 text-3xl font-light',
          isComingSoon && 'text-text-light'
        )}
      >
        {plan.price}
        {plan.priceNote && (
          <span className="text-base text-text-light">{plan.priceNote}</span>
        )}
      </p>

      {plan.features.length > 0 ? (
        <ul className="mt-8 space-y-3 text-sm text-text-light" role="list">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        plan.description && (
          <p className="mt-8 text-sm text-text-light">
            {renderMultilineText(plan.description)}
          </p>
        )
      )}
    </article>
  );
}

export function PlansSection() {
  return (
    <Section id="plans" aria-labelledby="plans-heading">
      <Container>
        <SectionHeader
          id="plans-heading"
          title="Plans"
          subtitle="料金プラン"
        />
        <div
          className="mt-16 grid gap-8 md:grid-cols-3"
          role="list"
          aria-label="料金プラン一覧"
        >
          {plans.map((plan) => (
            <div key={plan.id} role="listitem">
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
