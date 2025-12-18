import { NextResponse } from 'next/server';
import { appendReservation, listReservations } from '@/lib/reservations';
import { reservationInquiryTypes } from '@/types';
import type { ReservationRequestInput } from '@/types';
import { text } from '@/config/text';

export const runtime = 'nodejs';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPreferredDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime());
}

function isReservationInquiryType(
  value: string
): value is (typeof reservationInquiryTypes)[number] {
  return (reservationInquiryTypes as readonly string[]).includes(value);
}

function normalizeInput(body: Record<string, unknown>): ReservationRequestInput {
  const name = isNonEmptyString(body.name) ? body.name.trim() : '';
  const email = isNonEmptyString(body.email) ? body.email.trim() : '';
  const message = isNonEmptyString(body.message) ? body.message.trim() : '';
  const phone = isNonEmptyString(body.phone) ? body.phone.trim() : undefined;
  const preferredDate = isNonEmptyString(body.preferredDate)
    ? body.preferredDate.trim()
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

  if (!input.name) errors.name = text.form.validationErrors.nameRequired;
  if (!input.email) errors.email = text.form.validationErrors.emailRequired;
  if (input.email && !isValidEmail(input.email)) {
    errors.email = text.form.validationErrors.emailInvalid;
  }
  if (!input.message) errors.message = text.form.validationErrors.messageRequired;

  if (input.preferredDate && !isValidPreferredDate(input.preferredDate)) {
    errors.preferredDate = text.form.validationErrors.preferredDateInvalid;
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

function isAuthorized(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;

  const headerToken = req.headers.get('x-admin-token');
  if (headerToken && headerToken === token) return true;

  const url = new URL(req.url);
  const queryToken = url.searchParams.get('token');
  return Boolean(queryToken && queryToken === token);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: text.api.reservations.invalidJson },
      { status: 400 }
    );
  }

  if (!body || typeof body !== 'object') {
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

  const reservation = await appendReservation(input);

  return NextResponse.json(
    { ok: true, reservation: { id: reservation.id, createdAt: reservation.createdAt } },
    { status: 201 }
  );
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { ok: false, message: text.api.reservations.unauthorized },
      { status: 401 }
    );
  }

  const reservations = await listReservations();
  return NextResponse.json({ ok: true, reservations });
}
