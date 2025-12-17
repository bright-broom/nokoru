import { siteConfig } from '@/config/site';

const BASE_URL = 'https://silverlacewedding.netlify.app';

// LocalBusiness + VideoProductionCompany 構造化データ
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'VideoProductionCompany'],
  '@id': `${BASE_URL}/#business`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: BASE_URL,
  logo: `${BASE_URL}/opengraph-image`,
  image: `${BASE_URL}/opengraph-image`,
  telephone: '',
  email: '',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '大阪市',
    addressRegion: '大阪府',
    addressCountry: 'JP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.6937,
    longitude: 135.5023,
  },
  areaServed: [
    { '@type': 'State', name: '大阪府' },
    { '@type': 'State', name: '兵庫県' },
    { '@type': 'State', name: '京都府' },
    { '@type': 'State', name: '奈良県' },
    { '@type': 'State', name: '滋賀県' },
  ],
  priceRange: '¥100,000〜',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00',
  },
  sameAs: [
    'https://www.instagram.com/silver_lace_weddings/',
    'https://www.instagram.com/aki.h_eastprojects',
    'https://lit.link/Akimitsu',
  ],
};

// Service 構造化データ
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/#service`,
  name: 'ロケーション前撮り映像制作',
  description:
    '大阪・関西を中心としたロケーション前撮り撮影とウェディングムービー制作サービス。結婚式のオープニングムービーやプロフィールムービーを制作します。',
  provider: {
    '@id': `${BASE_URL}/#business`,
  },
  serviceType: 'ウェディング映像制作',
  areaServed: {
    '@type': 'Country',
    name: '日本',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '料金プラン',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Standard プラン',
          description: 'ロケーション1ヶ所、撮影時間2時間、ショートムービーまたは写真100枚',
        },
        price: '100000',
        priceCurrency: 'JPY',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Premium プラン',
          description: 'ロケーション1ヶ所、撮影時間3時間、ムービー1本、写真100枚',
        },
        price: '158000',
        priceCurrency: 'JPY',
      },
    ],
  },
};

// WebSite 構造化データ
const websiteSchema = {
  '@context': 'https://schema.org',
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

// BreadcrumbList 構造化データ
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: BASE_URL,
    },
  ],
};

// FAQPage 構造化データ（よくある質問として活用）
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'ロケーション前撮りの撮影エリアはどこですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '大阪・兵庫・京都・奈良・滋賀を中心に、全国出張対応しております。',
      },
    },
    {
      '@type': 'Question',
      name: '料金プランについて教えてください',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standardプラン（¥100,000〜）とPremiumプラン（¥158,000〜）をご用意しております。Standardはロケーション1ヶ所・撮影2時間、Premiumはロケーション1ヶ所・撮影3時間でムービーと写真100枚がセットになっています。',
      },
    },
    {
      '@type': 'Question',
      name: 'オープニングムービーとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '結婚式で上映できる1分のショートムービーです。前撮りの映像をシネマティックに編集し、お二人の大切な日を美しく演出します。',
      },
    },
    {
      '@type': 'Question',
      name: '予約はどのように行えますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Webサイトの予約フォームから無料相談を予約いただけます。日程調整の上、オンラインまたは対面でご相談いただけます。',
      },
    },
  ],
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
