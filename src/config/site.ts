import type {
  SiteConfig,
  NavItem,
  Service,
  Plan,
  Staff,
  WorkImage,
  ContactLink,
  Testimonial,
  Video,
  BlogPost,
} from '@/types';
import { text } from './text';
import { getWorkImageUrl, getStaffImageUrl } from '@/lib/storage';

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
  { label: text.nav.labels.works, href: '/#works', ariaLabel: text.nav.aria.works },
  { label: text.nav.labels.services, href: '/#services', ariaLabel: text.nav.aria.services },
  { label: text.nav.labels.plans, href: '/#plans', ariaLabel: text.nav.aria.plans },
  { label: text.nav.labels.about, href: '/#about', ariaLabel: text.nav.aria.about },
  { label: text.nav.labels.booking, href: '/#booking', ariaLabel: text.nav.aria.booking },
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
    imageUrl: getStaffImageUrl('aki.jpg'),
  },
  {
    id: 'hiyori',
    name: 'Hiyori',
    role: text.content.staff.hiyoriRole,
    bio: text.content.staff.hiyoriBio,
    imageUrl: getStaffImageUrl('hiyori.jpg'),
  },
] as const;

/**
 * 作品ギャラリー
 * 画像は Supabase Storage に保存されています
 */
export const workImages: readonly WorkImage[] = [
  {
    id: 'works-couple-cliff',
    src: getWorkImageUrl('couple-cliff.jpg'),
    alt: text.content.works.alts.coupleCliff,
    description: text.content.works.descriptions.coupleCliff,
    locationTag: text.content.works.tags.location,
    isFeatured: true,
  },
  {
    id: 'works-couple-sea-smile',
    src: getWorkImageUrl('couple-sea-smile.jpg'),
    alt: text.content.works.alts.coupleSeaSmile,
    description: text.content.works.descriptions.coupleSeaSmile,
    locationTag: text.content.works.tags.seaside,
    gridSpan: 7,
  },
  {
    id: 'works-bouquet-new',
    src: getWorkImageUrl('bouquet-new.jpg'),
    alt: text.content.works.alts.bouquetNew,
    description: text.content.works.descriptions.bouquetNew,
    locationTag: text.content.works.tags.detail,
    gridSpan: 5,
  },
  {
    id: 'works-couple-sea-rocks',
    src: getWorkImageUrl('couple-sea-rocks.jpg'),
    alt: text.content.works.alts.coupleSeaRocks,
    description: text.content.works.descriptions.coupleSeaRocks,
    locationTag: text.content.works.tags.seaside,
  },
  {
    id: 'works-couple-sea',
    src: getWorkImageUrl('couple-sea.jpg'),
    alt: text.content.works.alts.coupleSea,
    description: text.content.works.descriptions.coupleSea,
    locationTag: text.content.works.tags.seaside,
    isFeatured: true,
  },
  {
    id: 'works-bride-portrait',
    src: getWorkImageUrl('bride-portrait.jpg'),
    alt: text.content.works.alts.bridePortrait,
    description: text.content.works.descriptions.bridePortrait,
    locationTag: text.content.works.tags.location,
    gridSpan: 7,
  },
  {
    id: 'works-couple-playground',
    src: getWorkImageUrl('couple-playground.jpg'),
    alt: text.content.works.alts.couplePlayground,
    description: text.content.works.descriptions.couplePlayground,
    locationTag: text.content.works.tags.couple,
    gridSpan: 5,
  },
  {
    id: 'works-couple-sunflower',
    src: getWorkImageUrl('couple-sunflower.jpg'),
    alt: text.content.works.alts.coupleSunflower,
    description: text.content.works.descriptions.coupleSunflower,
    locationTag: text.content.works.tags.sunflower,
    gridSpan: 5,
  },
  {
    id: 'works-bouquet',
    src: getWorkImageUrl('bouquet.jpg'),
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

/**
 * お客様の声
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Y.S 様',
    location: '大阪・中之島',
    date: '2024年10月',
    plan: 'Signature',
    rating: 5,
    comment: '緊張していた私たちを自然な笑顔に導いてくれました。完成したムービーを見て、当日の幸せな気持ちが蘇りました。結婚式で上映したときのゲストの反応も最高でした！',
  },
  {
    id: 'testimonial-2',
    name: 'K.M 様',
    location: '京都・嵐山',
    date: '2024年9月',
    plan: 'Complete',
    rating: 5,
    comment: 'ロケーション選びから親身に相談に乗っていただき、想像以上に素敵な映像になりました。友人からも「映画みたい！」と大好評。一生の宝物です。',
  },
  {
    id: 'testimonial-3',
    name: 'T.A 様',
    location: '神戸・北野',
    date: '2024年8月',
    plan: 'Signature',
    rating: 5,
    comment: '初めての撮影で不安でしたが、終始リラックスした雰囲気で撮影できました。シネマティックな仕上がりに感動。両親へのプレゼントにも最適でした。',
  },
  {
    id: 'testimonial-4',
    name: 'R.N 様',
    location: '奈良・若草山',
    date: '2024年7月',
    plan: 'Light',
    rating: 5,
    comment: '短い撮影時間でしたが、とても満足のいく写真と映像を撮っていただけました。料金以上の価値があると思います。',
  },
] as const;

/**
 * ビデオギャラリー
 * NOTE: youtubeId は現在プレースホルダー。実際の動画IDに置き換えてください。
 */
export const videos: readonly Video[] = [
  {
    id: 'video-1',
    title: '中之島ロケーション前撮り',
    description: '大阪・中之島の美しい夕景の中で撮影したウェディングムービー',
    youtubeId: 'g7AeR7aV698',
    category: 'locationShooting',
    location: '大阪・中之島',
    date: '2024年10月',
    duration: '3:45',
    isFeatured: true,
  },
  {
    id: 'video-2',
    title: 'オープニングムービー - Sunset',
    description: '結婚式オープニング用に制作したシネマティックムービー',
    youtubeId: 'g7AeR7aV698',
    category: 'openingMovie',
    location: '京都・嵐山',
    date: '2024年9月',
    duration: '1:00',
  },
  {
    id: 'video-3',
    title: '神戸北野ウェディング',
    description: '異人館街の趣ある街並みでのロケーション撮影',
    youtubeId: 'g7AeR7aV698',
    category: 'locationShooting',
    location: '神戸・北野',
    date: '2024年8月',
    duration: '4:20',
  },
  {
    id: 'video-4',
    title: 'ダイジェストムービー - Spring',
    description: '桜の季節のロケーション撮影ダイジェスト',
    youtubeId: 'g7AeR7aV698',
    category: 'digest',
    location: '奈良・若草山',
    date: '2024年4月',
    duration: '2:30',
  },
] as const;

/**
 * ブログ記事
 */
export const blogPosts: readonly BlogPost[] = [
  {
    id: 'blog-1',
    slug: '2024-autumn-locations',
    title: '【2024年秋】関西おすすめロケーションスポット5選',
    excerpt: '紅葉シーズンにぴったりの前撮りロケーションをご紹介。京都・奈良・神戸の絶景スポットを厳選しました。',
    content: `
# 2024年秋のおすすめロケーション

秋は前撮りに最適な季節です。紅葉の美しい背景と、程よい気温で快適に撮影できます。

## 1. 京都・嵐山
言わずと知れた紅葉の名所。竹林と紅葉のコントラストが絶景です。

## 2. 奈良公園
鹿と紅葉のロケーションは奈良ならでは。外国の方にも人気です。

## 3. 神戸・布引ハーブ園
神戸の街並みを見下ろす絶景ロケーション。

## 4. 大阪・箕面
大阪から近くアクセス抜群。滝と紅葉が美しいスポット。

## 5. 滋賀・メタセコイア並木
まっすぐに伸びる並木道は圧巻の一言。
    `,
    category: 'tips',
    publishedAt: '2024-10-15',
    tags: ['ロケーション', '紅葉', '関西'],
  },
  {
    id: 'blog-2',
    slug: 'opening-movie-guide',
    title: 'オープニングムービーとは？結婚式を感動的に演出する方法',
    excerpt: '結婚式のオープニングを盛り上げるムービーの魅力と、効果的な演出方法をご紹介します。',
    content: `
# オープニングムービーで結婚式を盛り上げよう

結婚式のオープニングムービーは、ゲストの期待感を高め、感動的な雰囲気を作り出す重要な演出です。

## オープニングムービーとは
披露宴の開始時に上映する、お二人を紹介する約1分のショートムービーです。

## 効果的な演出のポイント
- シネマティックな映像美
- BGMとの調和
- 適切な尺（60〜90秒）
- ゲストを引き込むストーリー性
    `,
    category: 'tips',
    publishedAt: '2024-09-20',
    tags: ['オープニングムービー', '結婚式', '演出'],
  },
  {
    id: 'blog-3',
    slug: 'shooting-report-nakanoshima',
    title: '【撮影レポート】大阪・中之島での前撮り',
    excerpt: '先日撮影した大阪・中之島でのロケーション前撮りの様子をレポートします。',
    content: `
# 中之島でのロケーション前撮り

大阪のシンボル・中之島で行った前撮り撮影のレポートです。

## 当日のスケジュール
- 14:00 現地集合・準備
- 15:00 撮影開始
- 17:00 夕景撮影
- 18:00 撮影終了

## 撮影のポイント
川沿いの遊歩道と、歴史的建造物を背景に撮影しました。
    `,
    category: 'report',
    publishedAt: '2024-10-01',
    tags: ['撮影レポート', '中之島', '大阪'],
  },
] as const;
