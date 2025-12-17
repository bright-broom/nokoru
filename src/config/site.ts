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

/**
 * サイト基本設定
 */
export const siteConfig: SiteConfig = {
  name: 'Silver Lace Weddings',
  description:
    '大阪・関西発、ロケーション前撮りに特化したウェディングムービー。美しい映像に。2026年撮影受付中。',
  tagline: 'ロケーション前撮りを、\n美しい映像に。',
  subTagline: 'Location Wedding Film',
  areas: '大阪・兵庫・京都・奈良・滋賀を中心に、全国出張対応。',
  year: '2026年撮影受付中。',
  copyright: `© ${new Date().getFullYear()} Silver Lace Weddings. All rights reserved.`,
} as const;

/**
 * ナビゲーション項目
 */
export const navItems: readonly NavItem[] = [
  { label: 'Works', href: '#works', ariaLabel: '作品ギャラリーへ移動' },
  { label: 'Services', href: '#services', ariaLabel: 'サービス紹介へ移動' },
  { label: 'Plans', href: '#plans', ariaLabel: '料金プランへ移動' },
  { label: 'About', href: '#about', ariaLabel: 'スタッフ紹介へ移動' },
  { label: 'Booking', href: '#booking', ariaLabel: '無料相談予約へ移動' },
  { label: 'Contact', href: '#contact', ariaLabel: 'お問い合わせへ移動' },
] as const;

/**
 * サービス一覧
 */
export const services: readonly Service[] = [
  {
    id: 'location-shooting',
    title: 'ロケーション撮影',
    description: '2〜6時間のロケーション撮影。\nお二人らしい自然な表情を引き出します。',
    icon: 'video',
  },
  {
    id: 'opening-movie',
    title: 'オープニングムービー',
    description:
      '結婚式で上映できる1分のショートムービー。\nシネマティックな映像美でお届けします。',
    icon: 'play',
  },
] as const;

/**
 * 料金プラン
 */
export const plans: readonly Plan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: '¥100,000',
    priceNote: '〜',
    features: [
      { text: 'ロケーション1ヶ所' },
      { text: '撮影時間 2時間' },
      { text: 'ショートムービー or 写真100枚' },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '¥158,000',
    priceNote: '〜',
    isRecommended: true,
    features: [
      { text: 'ロケーション1ヶ所' },
      { text: '撮影時間 3時間' },
      { text: 'ムービー × 1本' },
      { text: '写真100枚' },
    ],
  },
  {
    id: 'coming-soon',
    name: 'Coming Soon',
    price: '要相談',
    isComingSoon: true,
    features: [],
    description:
      'マルチロケーションプランを準備中です。\n複数ヶ所での撮影をご希望の方はお問い合わせください。',
  },
] as const;

/**
 * オプション一覧
 */
export const options: readonly Option[] = [
  { id: 'dress', name: 'ドレスレンタル', price: '¥44,000' },
  { id: 'tuxedo', name: 'タキシードレンタル', price: '¥33,000' },
  { id: 'hair-makeup', name: 'ヘアメイク（1パターン）', price: '¥22,000' },
] as const;

/**
 * スタッフ一覧
 */
export const staffMembers: readonly Staff[] = [
  {
    id: 'aki',
    name: 'Aki',
    role: 'ビデオグラファー / カラリスト',
    imageUrl: '/images/staff/aki.jpg',
  },
  {
    id: 'hiyori',
    name: 'Hiyori',
    role: 'フォト / サポート',
    imageUrl: '/images/staff/hiyori.jpg',
  },
] as const;

/**
 * 作品ギャラリー（差し替え前提）
 * 画像は public/ 配下に配置してください（README参照）
 */
export const workImages: readonly WorkImage[] = [
  {
    id: 'works-bride-portrait',
    src: '/images/works/bride-portrait.jpg',
    alt: '自然光の中で撮影した花嫁の横顔',
    locationTag: 'Location',
  },
  {
    id: 'works-couple-playground',
    src: '/images/works/couple-playground.jpg',
    alt: '自然体のふたりを切り取ったカップルフォト',
    locationTag: 'Couple',
  },
  {
    id: 'works-couple-sea',
    src: '/images/works/couple-sea.jpg',
    alt: '海辺の風景の中で佇む新郎新婦のシルエット',
    locationTag: 'Seaside',
  },
  {
    id: 'works-couple-sunflower',
    src: '/images/works/couple-sunflower.jpg',
    alt: 'ひまわり畑で撮影した抱き合うふたりの後ろ姿',
    locationTag: 'Sunflower',
  },
  {
    id: 'works-bouquet',
    src: '/images/works/bouquet.jpg',
    alt: 'ドライフラワーのブーケのクローズアップ',
    locationTag: 'Detail',
  },
] as const;

/**
 * 連絡先リンク
 */
export const contactLinks: readonly ContactLink[] = [
  {
    id: 'instagram',
    label: '@aki.h_eastprojects',
    href: 'https://www.instagram.com/aki.h_eastprojects',
    icon: 'instagram',
    isExternal: true,
  },
  {
    id: 'litlink',
    label: 'lit.link/Akimitsu',
    href: 'https://lit.link/Akimitsu',
    icon: 'link',
    isExternal: true,
  },
] as const;
