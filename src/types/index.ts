/**
 * 型定義
 * @description アプリケーション全体で使用する型定義
 */

// =============================================================================
// アニメーション
// =============================================================================

/** FadeInアニメーションの方向 */
export type AnimationDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'none'
  | 'scale'
  | 'scale-up'
  | 'blur'
  | 'blur-up'
  | 'diagonal-left'
  | 'diagonal-right';

/** アニメーションのイージング */
export type AnimationEasing = 'ease-out' | 'ease-in-out' | 'bounce' | 'smooth';

/** FadeInプリセット設定 */
export interface FadeInPreset {
  readonly direction: AnimationDirection;
  readonly duration: number;
  readonly easing: AnimationEasing;
}

// =============================================================================
// ナビゲーション
// =============================================================================

// ナビゲーション
export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly ariaLabel?: string;
}

// サービス
export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly detailedDescription: string;
  readonly features: readonly string[];
  readonly icon: 'video' | 'play';
}

// 料金プラン
export interface PlanFeature {
  readonly text: string;
}

export interface Plan {
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly priceNote?: string;
  readonly features: readonly PlanFeature[];
  readonly isRecommended?: boolean;
  readonly bestFor?: string;
  readonly includes?: readonly string[];
  readonly notIncludes?: readonly string[];
}

// スタッフ
export interface Staff {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly imageUrl?: string;
}

// 作品（ギャラリー）
export interface WorkImage {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly description?: string;
  readonly locationTag?: string;
  readonly isFeatured?: boolean;
  readonly gridSpan?: 5 | 7;
}

// 連絡先リンク
export interface ContactLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon: 'instagram' | 'link';
  readonly isExternal?: boolean;
}

// サイト設定
export interface SiteConfig {
  readonly name: string;
  readonly description: string;
  readonly tagline: string;
  readonly subTagline: string;
  readonly areas: string;
  readonly year: string;
  readonly copyright: string;
  readonly heroVideoId: string;
  readonly calLink: string;
}

// セクション共通Props
export interface SectionProps {
  readonly id?: string;
  readonly className?: string;
}

// コンポーネント共通Props
export type PropsWithClassName<T = unknown> = T & {
  readonly className?: string;
};

// アイコンProps
export interface IconProps {
  readonly className?: string;
  readonly size?: number;
  readonly 'aria-hidden'?: boolean;
}

// 予約（リクエスト）
export const reservationInquiryTypes = [
  'location',
  'opening',
  'both',
  'other',
] as const;

export type ReservationInquiryType = (typeof reservationInquiryTypes)[number];

export interface ReservationRequestInput {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly inquiryType?: ReservationInquiryType | '';
  readonly preferredDate?: string;
  readonly message: string;
}

export interface ReservationRequest extends ReservationRequestInput {
  readonly id: string;
  readonly createdAt: string;
  readonly status: 'pending';
}

// =============================================================================
// お客様の声
// =============================================================================

export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly date: string;
  readonly plan: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly comment: string;
  readonly imageUrl?: string;
}

// =============================================================================
// ビデオギャラリー
// =============================================================================

export type VideoCategory = 'openingMovie' | 'locationShooting' | 'digest';

export interface Video {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly youtubeId: string;
  readonly category: VideoCategory;
  readonly location?: string;
  readonly date: string;
  readonly duration: string;
  readonly isFeatured?: boolean;
}

// =============================================================================
// ブログ
// =============================================================================

export type BlogCategory = 'news' | 'report' | 'tips';

export interface BlogPost {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly content: string;
  readonly category: BlogCategory;
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly coverImageUrl?: string;
  readonly tags?: readonly string[];
  readonly author?: string;
}
