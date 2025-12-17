/**
 * 型定義
 * @description アプリケーション全体で使用する型定義
 */

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
  readonly isComingSoon?: boolean;
  readonly description?: string;
}

// オプション
export interface Option {
  readonly id: string;
  readonly name: string;
  readonly price: string;
}

// スタッフ
export interface Staff {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly imageUrl?: string;
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
