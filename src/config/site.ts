import type {
  SiteConfig,
  NavItem,
  Service,
  Plan,
  Option,
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
  calLink: 'toshiki-sakuta-ohgi5i',
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
  { label: text.nav.labels.contact, href: '#contact', ariaLabel: text.nav.aria.contact },
] as const;

/**
 * サービス一覧
 */
export const services: readonly Service[] = [
  {
    id: 'location-shooting',
    title: text.content.services.locationShooting.title,
    description: text.content.services.locationShooting.description,
    icon: 'video',
  },
  {
    id: 'opening-movie',
    title: text.content.services.openingMovie.title,
    description: text.content.services.openingMovie.description,
    icon: 'play',
  },
] as const;

/**
 * 料金プラン
 */
export const plans: readonly Plan[] = [
  {
    id: 'standard',
    name: text.content.plans.standard.name,
    price: text.content.plans.standard.price,
    priceNote: text.content.plans.standard.priceNote,
    features: [
      ...text.content.plans.standard.features.map((t) => ({ text: t })),
    ],
  },
  {
    id: 'premium',
    name: text.content.plans.premium.name,
    price: text.content.plans.premium.price,
    priceNote: text.content.plans.premium.priceNote,
    isRecommended: true,
    features: [
      ...text.content.plans.premium.features.map((t) => ({ text: t })),
    ],
  },
  {
    id: 'coming-soon',
    name: text.content.plans.comingSoon.name,
    price: text.content.plans.comingSoon.price,
    isComingSoon: true,
    features: [],
    description: text.content.plans.comingSoon.description,
  },
] as const;

/**
 * オプション一覧
 */
export const options: readonly Option[] = [
  { id: 'dress', name: text.content.options.dressRental, price: text.content.options.dressRentalPrice },
  { id: 'tuxedo', name: text.content.options.tuxedoRental, price: text.content.options.tuxedoRentalPrice },
  { id: 'hair-makeup', name: text.content.options.hairMakeup, price: text.content.options.hairMakeupPrice },
] as const;

/**
 * スタッフ一覧
 */
export const staffMembers: readonly Staff[] = [
  {
    id: 'aki',
    name: 'Aki',
    role: text.content.staff.akiRole,
    imageUrl: '/images/staff/aki.jpg',
  },
  {
    id: 'hiyori',
    name: 'Hiyori',
    role: text.content.staff.hiyoriRole,
    imageUrl: '/images/staff/hiyori.jpg',
  },
] as const;

/**
 * 作品ギャラリー（差し替え前提）
 * 画像は public/ 配下に配置してください（README参照）
 */
export const workImages: readonly WorkImage[] = [
  {
    id: 'works-couple-sea',
    src: '/images/works/couple-sea.jpg',
    alt: text.content.works.alts.coupleSea,
    locationTag: text.content.works.tags.seaside,
    isFeatured: true,
  },
  {
    id: 'works-bride-portrait',
    src: '/images/works/bride-portrait.jpg',
    alt: text.content.works.alts.bridePortrait,
    locationTag: text.content.works.tags.location,
    gridSpan: 7,
  },
  {
    id: 'works-couple-playground',
    src: '/images/works/couple-playground.jpg',
    alt: text.content.works.alts.couplePlayground,
    locationTag: text.content.works.tags.couple,
    gridSpan: 5,
  },
  {
    id: 'works-couple-sunflower',
    src: '/images/works/couple-sunflower.jpg',
    alt: text.content.works.alts.coupleSunflower,
    locationTag: text.content.works.tags.sunflower,
    gridSpan: 5,
  },
  {
    id: 'works-bouquet',
    src: '/images/works/bouquet.jpg',
    alt: text.content.works.alts.bouquet,
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
