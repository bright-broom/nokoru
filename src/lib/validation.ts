/**
 * 共通バリデーションユーティリティ
 *
 * フォームとAPIで同じバリデーションロジックを使用することで
 * 一貫性を保ち、重複コードを排除
 */

// バリデーションエラーの型
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// メールアドレスの正規表現（RFC 5322簡易版）
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 電話番号の正規表現（日本の電話番号形式）
const PHONE_REGEX = /^[0-9\-+() ]{10,15}$/;

/**
 * メールアドレスの形式をチェック
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * 電話番号の形式をチェック
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // 任意項目
  return PHONE_REGEX.test(phone.trim());
}

/**
 * 必須フィールドのチェック
 */
export function isRequired(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim() !== '';
}

/**
 * 文字列の長さをチェック
 */
export function isWithinLength(
  value: string,
  min: number,
  max: number
): boolean {
  const length = value.trim().length;
  return length >= min && length <= max;
}

/**
 * 将来の日付かどうかをチェック
 */
export function isFutureDate(dateString: string): boolean {
  if (!dateString) return true; // 任意項目
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

/**
 * XSS対策用の基本的なサニタイズ
 * HTMLタグを除去し、危険な文字をエスケープ
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * HTMLタグを完全に除去（表示用）
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

// お問い合わせフォームのバリデーションルール
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  preferredDate?: string;
  message: string;
}

/**
 * お問い合わせフォームのバリデーション
 * クライアント・サーバー両方で使用可能
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationError[] = [];

  // 名前（必須）
  if (!isRequired(data.name)) {
    errors.push({ field: 'name', message: 'お名前を入力してください' });
  } else if (!isWithinLength(data.name, 1, 100)) {
    errors.push({ field: 'name', message: 'お名前は100文字以内で入力してください' });
  }

  // メールアドレス（必須）
  if (!isRequired(data.email)) {
    errors.push({ field: 'email', message: 'メールアドレスを入力してください' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: '正しいメールアドレスを入力してください' });
  }

  // 電話番号（任意）
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: '正しい電話番号を入力してください' });
  }

  // 希望日（任意、ただし入力時は将来日付）
  if (data.preferredDate && !isFutureDate(data.preferredDate)) {
    errors.push({ field: 'preferredDate', message: '撮影希望日は本日以降の日付を選択してください' });
  }

  // メッセージ（必須）
  if (!isRequired(data.message)) {
    errors.push({ field: 'message', message: 'お問い合わせ内容を入力してください' });
  } else if (!isWithinLength(data.message, 1, 2000)) {
    errors.push({ field: 'message', message: 'お問い合わせ内容は2000文字以内で入力してください' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * バリデーション結果をフィールド別のエラーマップに変換
 */
export function toErrorMap(
  result: ValidationResult
): Record<string, string> {
  return result.errors.reduce(
    (acc, error) => {
      acc[error.field] = error.message;
      return acc;
    },
    {} as Record<string, string>
  );
}
