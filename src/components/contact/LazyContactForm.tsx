import dynamic from 'next/dynamic';

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

export function LazyContactForm() {
  return <ContactForm />;
}
