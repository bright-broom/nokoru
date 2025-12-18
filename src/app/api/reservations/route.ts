import { NextResponse } from 'next/server';
import { appendReservation, listReservations } from '@/lib/reservations';
import { isValidEmail, sanitizeInput, isWithinLength } from '@/lib/validation';
import { reservationInquiryTypes } from '@/types';
import type { ReservationRequestInput } from '@/types';
import { text } from '@/config';

export const runtime = 'nodejs';

// 入力制限定数
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_PHONE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_BODY_SIZE = 10000; // 10KB

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidPreferredDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return false;

  // 過去日付は拒否
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
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

  // 電話番号（任意）
  if (input.phone && !/^[0-9\-+() ]{10,20}$/.test(input.phone)) {
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

  // ヘッダーからのみトークン取得（URLパラメータは避ける）
  const headerToken = req.headers.get('x-admin-token');
  if (headerToken && headerToken === token) return true;

  // 後方互換性のためURLパラメータも許可（非推奨）
  const url = new URL(req.url);
  const queryToken = url.searchParams.get('token');
  return Boolean(queryToken && queryToken === token);
}

export async function POST(req: Request) {
  // Content-Type チェック
  const contentType = req.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return NextResponse.json(
      { ok: false, message: 'Content-Type must be application/json' },
      { status: 415 }
    );
  }

  // ボディサイズチェック
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return NextResponse.json(
      { ok: false, message: 'Request body too large' },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { ok: false, message: 'Request body too large' },
        { status: 413 }
      );
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, message: text.api.reservations.invalidJson },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json(
      { ok: false, message: text.api.reservations.invalidBody },
      { status: 400 }
    );
  }

  const input = normalizeInput(body as Record<string, unknown>);
  const { ok, errors } = validateInput(input);
  if (!ok) {
    return NextResponse.json(
      { ok: false, message: text.api.reservations.invalidInput, errors },
      { status: 422 }
    );
  }

  try {
    const reservation = await appendReservation(input);

    return NextResponse.json(
      { ok: true, reservation: { id: reservation.id, createdAt: reservation.createdAt } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Reservation creation failed:', error);
    return NextResponse.json(
      { ok: false, message: text.errors.dbInsert },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    // タイミング攻撃を防ぐため、一定の遅延を追加
    await new Promise((resolve) => setTimeout(resolve, 100));
    return NextResponse.json(
      { ok: false, message: text.api.reservations.unauthorized },
      { status: 401 }
    );
  }

  try {
    const reservations = await listReservations();
    return NextResponse.json({ ok: true, reservations });
  } catch (error) {
    console.error('Failed to list reservations:', error);
    return NextResponse.json(
      { ok: false, message: text.errors.dbSelect },
      { status: 500 }
    );
  }
}

// OPTIONS リクエストのハンドリング（CORS preflight）
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
