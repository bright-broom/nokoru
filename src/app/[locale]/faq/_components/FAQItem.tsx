import { FadeIn, simplePreset } from '@/components/ui';

interface FAQItemProps {
  question: string;
  answer: string;
  delay: number;
}

export function FAQItem({ question, answer, delay }: FAQItemProps) {
  return (
    <FadeIn {...simplePreset} delay={delay}>
      <details className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-text">
          <span>{question}</span>
          <span className="shrink-0 text-site-accent transition-transform group-open:rotate-180">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </summary>
        <p className="mt-4 text-text-light leading-relaxed">{answer}</p>
      </details>
    </FadeIn>
  );
}
