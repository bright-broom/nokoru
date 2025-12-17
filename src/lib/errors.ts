/**
 * 統一エラーハンドリング
 *
 * アプリケーション全体で一貫したエラー処理を提供
 */

// エラーコード定義
export const ErrorCode = {
  // バリデーション
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  // 認証・認可
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  // データベース
  DB_INSERT_ERROR: 'DB_INSERT_ERROR',
  DB_SELECT_ERROR: 'DB_SELECT_ERROR',
  DB_UPDATE_ERROR: 'DB_UPDATE_ERROR',
  DB_DELETE_ERROR: 'DB_DELETE_ERROR',
  // ネットワーク
  NETWORK_ERROR: 'NETWORK_ERROR',
  // 汎用
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

// ユーザー向けエラーメッセージ
const userMessages: Record<ErrorCodeType, string> = {
  [ErrorCode.VALIDATION_ERROR]: '入力内容に問題があります。',
  [ErrorCode.UNAUTHORIZED]: '認証が必要です。',
  [ErrorCode.FORBIDDEN]: 'この操作は許可されていません。',
  [ErrorCode.DB_INSERT_ERROR]: 'データの保存に失敗しました。時間をおいて再度お試しください。',
  [ErrorCode.DB_SELECT_ERROR]: 'データの取得に失敗しました。時間をおいて再度お試しください。',
  [ErrorCode.DB_UPDATE_ERROR]: 'データの更新に失敗しました。時間をおいて再度お試しください。',
  [ErrorCode.DB_DELETE_ERROR]: 'データの削除に失敗しました。時間をおいて再度お試しください。',
  [ErrorCode.NETWORK_ERROR]: '通信に失敗しました。ネットワーク状況をご確認ください。',
  [ErrorCode.UNKNOWN_ERROR]: 'エラーが発生しました。時間をおいて再度お試しください。',
};

/**
 * アプリケーションエラークラス
 */
export class AppError extends Error {
  public readonly code: ErrorCodeType;
  public readonly userMessage: string;
  public readonly details?: unknown;

  constructor(
    code: ErrorCodeType,
    message: string,
    details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.userMessage = userMessages[code];
    this.details = details;

    // Errorクラスを継承する際に必要
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Supabaseエラーをアプリケーションエラーに変換
 */
export function handleSupabaseError(
  error: { message: string; code?: string },
  operation: 'insert' | 'select' | 'update' | 'delete'
): AppError {
  const codeMap = {
    insert: ErrorCode.DB_INSERT_ERROR,
    select: ErrorCode.DB_SELECT_ERROR,
    update: ErrorCode.DB_UPDATE_ERROR,
    delete: ErrorCode.DB_DELETE_ERROR,
  } as const;

  return new AppError(
    codeMap[operation],
    `Supabase ${operation} error: ${error.message}`,
    error
  );
}

/**
 * 未知のエラーをアプリケーションエラーに変換
 */
export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(
      ErrorCode.UNKNOWN_ERROR,
      error.message,
      { originalError: error.name, stack: error.stack }
    );
  }

  return new AppError(
    ErrorCode.UNKNOWN_ERROR,
    String(error),
    error
  );
}

/**
 * 開発環境でのみエラー詳細をログ出力
 */
export function logError(error: unknown, context?: string): void {
  const normalizedError = normalizeError(error);
  const prefix = context ? `[${context}]` : '';

  if (process.env.NODE_ENV === 'development') {
    console.error(`${prefix} ${normalizedError.code}: ${normalizedError.message}`, normalizedError.details);
  } else {
    // 本番環境では最小限のログ
    console.error(`${prefix} ${normalizedError.code}`);
  }
}

/**
 * APIレスポンス用のエラーオブジェクトを生成
 */
export function toApiError(error: unknown): {
  error: string;
  code: ErrorCodeType;
} {
  const normalizedError = normalizeError(error);
  return {
    error: normalizedError.userMessage,
    code: normalizedError.code,
  };
}
