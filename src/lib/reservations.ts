import { createServerClient } from './supabase';
import { handleSupabaseError, logError } from './errors';
import { sanitizeInput } from './validation';
import type { ReservationRequest, ReservationRequestInput } from '@/types';
import type { ReservationInsert, ReservationStatus } from '@/types/database';

/**
 * DBの行データをアプリケーション型に変換
 */
function toReservationRequest(row: {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  inquiry_type: string | null;
  preferred_date: string | null;
  message: string;
  status: ReservationStatus | null;
}): ReservationRequest {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    inquiryType: (row.inquiry_type as ReservationRequest['inquiryType']) ?? undefined,
    preferredDate: row.preferred_date ?? undefined,
    message: row.message,
    status: (row.status as ReservationRequest['status']) ?? 'pending',
  };
}

/**
 * 予約をSupabaseに保存
 */
export async function appendReservation(
  input: ReservationRequestInput
): Promise<ReservationRequest> {
  const supabase = createServerClient();

  // 入力値のサニタイズ
  const insertData: ReservationInsert = {
    name: sanitizeInput(input.name),
    email: input.email.trim().toLowerCase(),
    phone: input.phone ? sanitizeInput(input.phone) : null,
    inquiry_type: input.inquiryType || null,
    preferred_date: input.preferredDate || null,
    message: sanitizeInput(input.message),
    status: 'pending',
  };

  const { data, error } = await supabase
    .from('reservations')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    logError(error, 'appendReservation');
    throw handleSupabaseError(error, 'insert');
  }

  return toReservationRequest(data);
}

/**
 * 予約一覧を取得
 */
export async function listReservations(): Promise<ReservationRequest[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    logError(error, 'listReservations');
    throw handleSupabaseError(error, 'select');
  }

  return data.map(toReservationRequest);
}

/**
 * 予約のステータスを更新
 */
export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<void> {
  const supabase = createServerClient();

  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id);

  if (error) {
    logError(error, 'updateReservationStatus');
    throw handleSupabaseError(error, 'update');
  }
}
