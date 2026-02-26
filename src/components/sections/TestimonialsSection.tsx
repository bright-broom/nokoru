'use client';

import { memo } from 'react';
import { Section, Container, SectionHeader, FadeIn, SectionCTA, cardPreset } from '@/components/ui';
import { StarIcon } from '@/components/icons';
import { testimonials, text } from '@/config';
import { ANIMATION_DELAYS } from '@/lib/constants';
import { cardStyles } from '@/lib/styles';
import type { Testimonial } from '@/types';

// 星の配列を事前に作成（レンダリング毎の再生成を防ぐ）
const STAR_INDICES = [0, 1, 2, 3, 4] as const;

const StarRating = memo(function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`評価: ${rating}点`}>
      {STAR_INDICES.map((i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-gold' : 'text-beige'}`}
        />
      ))}
    </div>
  );
});

const TestimonialCard = memo(function TestimonialCard({ testimonial, delay }: { testimonial: Testimonial; delay: number }) {
  return (
    <FadeIn {...cardPreset} delay={delay} className="h-full">
      <article className={`${cardStyles.base} ${cardStyles.hover} flex h-full flex-col p-6 md:p-8`}>
        <div className="mb-4 flex items-center justify-between">
          <StarRating rating={testimonial.rating} />
          <span className="text-xs text-text-light">{testimonial.date}</span>
        </div>

        <blockquote className="flex-1">
          <p className="text-sm leading-relaxed text-text-light">
            "{testimonial.comment}"
          </p>
        </blockquote>

        <footer className="mt-6 border-t border-beige pt-4">
          <p className="font-medium text-text">{testimonial.name}</p>
          <p className="mt-1 text-xs text-text-light">
            {testimonial.location} / {testimonial.plan}プラン
          </p>
        </footer>
      </article>
    </FadeIn>
  );
});

export function TestimonialsSection() {
  return (
    <Section id="testimonials" aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeader
          id="testimonials-heading"
          title={text.sections.testimonials.title}
          subtitle={text.sections.testimonials.subtitle}
        />

        <ul
          className="mt-16 grid gap-6 md:grid-cols-2"
          aria-label={text.sections.testimonials.listAria}
        >
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.id}>
              <TestimonialCard
                testimonial={testimonial}
                delay={index * ANIMATION_DELAYS.CARD_STAGGER}
              />
            </li>
          ))}
        </ul>

        <SectionCTA
          href="/contact"
          label={text.sections.testimonials.cta}
          ariaLabel={text.sections.testimonials.ctaAria}
        />
      </Container>
    </Section>
  );
}
