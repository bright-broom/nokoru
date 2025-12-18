import { Section, Container, SectionHeader, FadeIn } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { plans } from '@/config/site';
import { cn } from '@/lib/utils';
import { renderMultilineText } from '@/lib/helpers';
import type { Plan } from '@/types';

function PlanCard({ plan, delay }: { plan: Plan; delay: number }) {
  const isComingSoon = plan.isComingSoon;
  const isRecommended = plan.isRecommended;

  return (
    <FadeIn direction="up" delay={delay}>
      <article
        className={cn(
          'relative rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl',
          isComingSoon && 'border-2 border-dashed border-beige bg-linear-to-br from-beige/30 to-transparent opacity-80',
          isRecommended && 'border-2 border-site-accent bg-white ring-4 ring-site-accent/10 scale-[1.02]',
          !isComingSoon && !isRecommended && 'border border-beige/60 bg-white hover:-translate-y-1'
        )}
      >
        {isRecommended && (
          <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-site-accent to-site-accent/80 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            おすすめ
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
          <ul className="mt-8 space-y-4 text-sm" role="list">
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
      </article>
    </FadeIn>
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
          {plans.map((plan, index) => (
            <div key={plan.id} role="listitem">
              <PlanCard plan={plan} delay={index * 150} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
