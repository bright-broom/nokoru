import type {
  SiteConfig,
  NavItem,
  Service,
  Plan,
  Staff,
  WorkImage,
  ContactLink,
} from '@/types';
import { text } from './text';

/**
 * サイト基本設定
 */
export const siteConfig: SiteConfig = {
  name: text.site.name,
  description: text.site.descriptionShort,
  tagline: text.site.tagline,
  subTagline: text.site.subTagline,
  areas: text.site.areas,
  year: text.site.year,
  copyright: `© ${new Date().getFullYear()} ${text.site.name}. ${text.site.copyrightSuffix}`,
  heroVideoId: 'g7AeR7aV698',
  calLink: 'aki-eastproject',
} as const;

/**
 * ナビゲーション項目
 */
export const navItems: readonly NavItem[] = [
  { label: text.nav.labels.works, href: '#works', ariaLabel: text.nav.aria.works },
  { label: text.nav.labels.services, href: '#services', ariaLabel: text.nav.aria.services },
  { label: text.nav.labels.plans, href: '#plans', ariaLabel: text.nav.aria.plans },
  { label: text.nav.labels.about, href: '#about', ariaLabel: text.nav.aria.about },
  { label: text.nav.labels.booking, href: '#booking', ariaLabel: text.nav.aria.booking },
  { label: text.nav.labels.contact, href: '/contact', ariaLabel: text.nav.aria.contact },
] as const;

/**
 * サービス一覧
 */
export const services: readonly Service[] = [
  {
    id: 'location-shooting',
    title: text.content.services.locationShooting.title,
    description: text.content.services.locationShooting.description,
    detailedDescription: text.content.services.locationShooting.detailedDescription,
    features: text.content.services.locationShooting.features,
    icon: 'video',
  },
  {
    id: 'opening-movie',
    title: text.content.services.openingMovie.title,
    description: text.content.services.openingMovie.description,
    detailedDescription: text.content.services.openingMovie.detailedDescription,
    features: text.content.services.openingMovie.features,
    icon: 'play',
  },
] as const;

/**
 * 料金プラン（オールインクルーシブ）
 */
export const plans: readonly Plan[] = [
  {
    id: 'light',
    name: text.content.plans.light.name,
    price: text.content.plans.light.price,
    priceNote: text.content.plans.light.priceNote,
    features: [
      ...text.content.plans.light.features.map((t) => ({ text: t })),
    ],
    bestFor: text.content.plans.light.bestFor,
    includes: text.content.plans.light.includes,
    notIncludes: text.content.plans.light.notIncludes,
  },
  {
    id: 'signature',
    name: text.content.plans.signature.name,
    price: text.content.plans.signature.price,
    priceNote: text.content.plans.signature.priceNote,
    isRecommended: true,
    features: [
      ...text.content.plans.signature.features.map((t) => ({ text: t })),
    ],
    bestFor: text.content.plans.signature.bestFor,
    includes: text.content.plans.signature.includes,
    notIncludes: text.content.plans.signature.notIncludes,
  },
  {
    id: 'complete',
    name: text.content.plans.complete.name,
    price: text.content.plans.complete.price,
    priceNote: text.content.plans.complete.priceNote,
    features: [
      ...text.content.plans.complete.features.map((t) => ({ text: t })),
    ],
    bestFor: text.content.plans.complete.bestFor,
    includes: text.content.plans.complete.includes,
    notIncludes: text.content.plans.complete.notIncludes,
  },
] as const;

/**
 * スタッフ一覧
 */
export const staffMembers: readonly Staff[] = [
  {
    id: 'aki',
    name: 'Aki',
    role: text.content.staff.akiRole,
    bio: text.content.staff.akiBio,
    imageUrl: '/images/staff/aki.jpg',
  },
  {
    id: 'hiyori',
    name: 'Hiyori',
    role: text.content.staff.hiyoriRole,
    bio: text.content.staff.hiyoriBio,
    imageUrl: '/images/staff/hiyori.jpg',
  },
] as const;

/**
 * 作品ギャラリー（差し替え前提）
 * 画像は public/ 配下に配置してください（README参照）
 */
export const workImages: readonly WorkImage[] = [
  {
    id: 'works-couple-cliff',
    src: '/images/works/couple-cliff.jpg',
    alt: text.content.works.alts.coupleCliff,
    description: text.content.works.descriptions.coupleCliff,
    locationTag: text.content.works.tags.location,
    isFeatured: true,
  },
  {
    id: 'works-couple-sea-smile',
    src: '/images/works/couple-sea-smile.jpg',
    alt: text.content.works.alts.coupleSeaSmile,
    description: text.content.works.descriptions.coupleSeaSmile,
    locationTag: text.content.works.tags.seaside,
    gridSpan: 7,
  },
  {
    id: 'works-bouquet-new',
    src: '/images/works/bouquet-new.jpg',
    alt: text.content.works.alts.bouquetNew,
    description: text.content.works.descriptions.bouquetNew,
    locationTag: text.content.works.tags.detail,
    gridSpan: 5,
  },
  {
    id: 'works-couple-sea-rocks',
    src: '/images/works/couple-sea-rocks.jpg',
    alt: text.content.works.alts.coupleSeaRocks,
    description: text.content.works.descriptions.coupleSeaRocks,
    locationTag: text.content.works.tags.seaside,
  },
  {
    id: 'works-couple-sea',
    src: '/images/works/couple-sea.jpg',
    alt: text.content.works.alts.coupleSea,
    description: text.content.works.descriptions.coupleSea,
    locationTag: text.content.works.tags.seaside,
    isFeatured: true,
  },
  {
    id: 'works-bride-portrait',
    src: '/images/works/bride-portrait.jpg',
    alt: text.content.works.alts.bridePortrait,
    description: text.content.works.descriptions.bridePortrait,
    locationTag: text.content.works.tags.location,
    gridSpan: 7,
  },
  {
    id: 'works-couple-playground',
    src: '/images/works/couple-playground.jpg',
    alt: text.content.works.alts.couplePlayground,
    description: text.content.works.descriptions.couplePlayground,
    locationTag: text.content.works.tags.couple,
    gridSpan: 5,
  },
  {
    id: 'works-couple-sunflower',
    src: '/images/works/couple-sunflower.jpg',
    alt: text.content.works.alts.coupleSunflower,
    description: text.content.works.descriptions.coupleSunflower,
    locationTag: text.content.works.tags.sunflower,
    gridSpan: 5,
  },
  {
    id: 'works-bouquet',
    src: '/images/works/bouquet.jpg',
    alt: text.content.works.alts.bouquet,
    description: text.content.works.descriptions.bouquet,
    locationTag: text.content.works.tags.detail,
    gridSpan: 7,
  },
] as const;

/**
 * 連絡先リンク
 */
export const contactLinks: readonly ContactLink[] = [
  {
    id: 'instagram',
    label: text.content.links.instagramAkiLabel,
    href: 'https://www.instagram.com/aki.h_eastprojects',
    icon: 'instagram',
    isExternal: true,
  },
  {
    id: 'litlink',
    label: text.content.links.litlinkLabel,
    href: 'https://lit.link/Akimitsu',
    icon: 'link',
    isExternal: true,
  },
] as const;
