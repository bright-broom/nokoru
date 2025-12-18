import { siteConfig, text } from '@/config';

const BASE_URL = text.seo.baseUrl;

const localBusinessSchema = {
  '@type': ['LocalBusiness', 'VideoProductionCompany'],
  '@id': `${BASE_URL}/#business`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: BASE_URL,
  logo: `${BASE_URL}/opengraph-image`,
  image: `${BASE_URL}/opengraph-image`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: text.seo.jsonLd.addressLocality,
    addressRegion: text.seo.jsonLd.addressRegion,
    addressCountry: text.seo.jsonLd.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: text.seo.jsonLd.geo.latitude,
    longitude: text.seo.jsonLd.geo.longitude,
  },
  areaServed: text.seo.jsonLd.areaServedStates.map((name) => ({
    '@type': 'State',
    name,
  })),
  priceRange: text.seo.jsonLd.priceRange,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: text.seo.jsonLd.openingHours.dayOfWeek,
    opens: text.seo.jsonLd.openingHours.opens,
    closes: text.seo.jsonLd.openingHours.closes,
  },
  sameAs: text.seo.jsonLd.sameAs,
};

const serviceSchema = {
  '@type': 'Service',
  '@id': `${BASE_URL}/#service`,
  name: text.seo.jsonLd.service.name,
  description: text.seo.jsonLd.service.description,
  provider: {
    '@id': `${BASE_URL}/#business`,
  },
  serviceType: text.seo.jsonLd.service.serviceType,
  areaServed: {
    '@type': 'Country',
    name: text.seo.jsonLd.service.areaServedCountry,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: text.seo.jsonLd.service.offerCatalogName,
    itemListElement: text.seo.jsonLd.service.offers.map((offer) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: offer.name,
        description: offer.description,
      },
      price: offer.price,
      priceCurrency: offer.priceCurrency,
    })),
  },
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: siteConfig.name,
  url: BASE_URL,
  description: siteConfig.description,
  publisher: {
    '@id': `${BASE_URL}/#business`,
  },
  inLanguage: 'ja-JP',
};

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: text.seo.jsonLd.breadcrumbHome,
      item: BASE_URL,
    },
  ],
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: text.seo.jsonLd.faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    localBusinessSchema,
    serviceSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema),
      }}
    />
  );
}
