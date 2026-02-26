import { text } from '@/config';
import { FadeIn, simplePreset } from '@/components/ui';
import { FAQItem } from './FAQItem';

type FAQCategory = keyof typeof text.pages.faq.categories;

interface FAQSectionProps {
  category: FAQCategory;
  items: typeof text.pages.faq.items;
  delay: number;
}

export function FAQSection({ category, items, delay }: FAQSectionProps) {
  const categoryItems = items.filter(item => item.category === category);
  if (categoryItems.length === 0) return null;

  return (
    <FadeIn {...simplePreset} delay={delay}>
      <div className="mb-12">
        <h2 className="mb-6 font-display text-xl tracking-wide text-site-accent">
          {text.pages.faq.categories[category]}
        </h2>
        <div className="space-y-4">
          {categoryItems.map((item, index) => (
            <FAQItem
              key={`${category}-${index}`}
              question={item.question}
              answer={item.answer}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
