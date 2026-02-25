import { NextResponse } from 'next/server';
import { appendReservation, listReservations } from '@/lib/reservations';
import { isValidEmail, isValidPhone, isValidPreferredDate, sanitizeInput, isWithinLength } from '@/lib/validation';
import { reservationInquiryTypes } from '@/types';
import type { ReservationRequestInput } from '@/types';
import { text } from '@/config';

export const runtime = 'nodejs';

// CSRF対策: 許可されたオリジン
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean) as string[];

function isValidOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // サーバーサイドからのリクエスト（originなし）は許可
  if (!origin && !referer) return true;

  // originがある場合は検証
  if (origin) {
    return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
  }

  // refererのみの場合
  if (referer) {
    return ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
  }

  return false;
}

// エラーレスポンスヘルパー
function errorResponse(message: string, status: number, errors?: Record<string, string>) {
  return NextResponse.json(
    { ok: false, message, ...(errors && { errors }) },
    { status }
  );
}

// 入力制限定数
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_PHONE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_BODY_SIZE = 10000; // 10KB

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isReservationInquiryType(
  value: string
): value is (typeof reservationInquiryTypes)[number] {
  return (reservationInquiryTypes as readonly string[]).includes(value);
}

function normalizeInput(body: Record<string, unknown>): ReservationRequestInput {
  // サニタイズして危険な文字を除去
  const name = isNonEmptyString(body.name)
    ? sanitizeInput(body.name.trim()).slice(0, MAX_NAME_LENGTH)
    : '';
  const email = isNonEmptyString(body.email)
    ? body.email.trim().toLowerCase().slice(0, MAX_EMAIL_LENGTH)
    : '';
  const message = isNonEmptyString(body.message)
    ? sanitizeInput(body.message.trim()).slice(0, MAX_MESSAGE_LENGTH)
    : '';
  const phone = isNonEmptyString(body.phone)
    ? sanitizeInput(body.phone.trim()).slice(0, MAX_PHONE_LENGTH)
    : undefined;
  const preferredDate = isNonEmptyString(body.preferredDate)
    ? body.preferredDate.trim().slice(0, 10) // YYYY-MM-DD format
    : undefined;
  const inquiryType = isNonEmptyString(body.inquiryType)
    ? body.inquiryType.trim()
    : '';

  return {
    name,
    email,
    message,
    phone,
    preferredDate,
    inquiryType:
      inquiryType === '' || isReservationInquiryType(inquiryType)
        ? inquiryType
        : '',
  };
}

function validateInput(input: ReservationRequestInput) {
  const errors: Record<string, string> = {};

  // 名前
  if (!input.name) {
    errors.name = text.form.validationErrors.nameRequired;
  } else if (!isWithinLength(input.name, 1, MAX_NAME_LENGTH)) {
    errors.name = text.form.validationErrors.nameTooLong;
  }

  // メール
  if (!input.email) {
    errors.email = text.form.validationErrors.emailRequired;
  } else if (!isValidEmail(input.email)) {
    errors.email = text.form.validationErrors.emailInvalid;
  }

  // メッセージ
  if (!input.message) {
    errors.message = text.form.validationErrors.messageRequired;
  } else if (!isWithinLength(input.message, 1, MAX_MESSAGE_LENGTH)) {
    errors.message = text.form.validationErrors.messageTooLong;
  }

  // 電話番号（任意）- validation.tsの共通関数を使用
  if (input.phone && !isValidPhone(input.phone)) {
    errors.phone = text.form.validationErrors.phoneInvalid;
  }

  // 希望日（任意）
  if (input.preferredDate && !isValidPreferredDate(input.preferredDate)) {
    errors.preferredDate = text.form.validationErrors.preferredDateInvalid;
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

function isAuthorized(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;

  // ヘッダーからのみトークン取得（セキュリティ上、URLパラメータは使用しない）
  const headerToken = req.headers.get('x-admin-token');
  return headerToken === token;
}

export async function POST(req: Request) {
  // CSRF対策: オリジン検証
  if (!isValidOrigin(req)) {
    return errorResponse('Invalid origin', 403);
  }

  // Content-Type チェック
  const contentType = req.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return errorResponse('Content-Type must be application/json', 415);
  }

  // ボディサイズチェック
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return errorResponse('Request body too large', 413);
  }

  let body: unknown;
  try {
    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_SIZE) {
      return errorResponse('Request body too large', 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse(text.api.reservations.invalidJson, 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return errorResponse(text.api.reservations.invalidBody, 400);
  }

  const input = normalizeInput(body as Record<string, unknown>);
  const { ok, errors } = validateInput(input);
  if (!ok) {
    return errorResponse(text.api.reservations.invalidInput, 422, errors);
  }

  try {
    const reservation = await appendReservation(input);

    return NextResponse.json(
      { ok: true, reservation: { id: reservation.id, createdAt: reservation.createdAt } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Reservation creation failed:', error);
    return errorResponse(text.errors.dbInsert, 500);
  }
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    // タイミング攻撃を防ぐため、一定の遅延を追加
    await new Promise((resolve) => setTimeout(resolve, 100));
    return errorResponse(text.api.reservations.unauthorized, 401);
  }

  try {
    const reservations = await listReservations();
    return NextResponse.json({ ok: true, reservations });
  } catch (error) {
    console.error('Failed to list reservations:', error);
    return errorResponse(text.errors.dbSelect, 500);
  }
}

// OPTIONS リクエストのハンドリング（CORS preflight）
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
