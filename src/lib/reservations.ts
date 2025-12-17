import { createServerSupabaseClient } from './supabase';
import type { ReservationRequest, ReservationRequestInput } from '@/types';
import type { ReservationInsert } from '@/types/database';

/**
 * 予約をSupabaseに保存
 */
export async function appendReservation(
  input: ReservationRequestInput
): Promise<ReservationRequest> {
  const supabase = createServerSupabaseClient();

  const insertData: ReservationInsert = {
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    inquiry_type: input.inquiryType || null,
    preferred_date: input.preferredDate || null,
    message: input.message,
    status: 'pending',
  };

  const { data, error } = await supabase
    .from('reservations')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error('予約の保存に失敗しました');
  }

  // DBのカラム名をアプリの型に変換
  return {
    id: data.id,
    createdAt: data.created_at,
    name: data.name,
    email: data.email,
    phone: data.phone ?? undefined,
    inquiryType: (data.inquiry_type as ReservationRequest['inquiryType']) ?? undefined,
    preferredDate: data.preferred_date ?? undefined,
    message: data.message,
    status: 'pending',
  };
}

/**
 * 予約一覧を取得
 */
export async function listReservations(): Promise<ReservationRequest[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase select error:', error);
    throw new Error('予約一覧の取得に失敗しました');
  }

  return data.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    inquiryType: (row.inquiry_type as ReservationRequest['inquiryType']) ?? undefined,
    preferredDate: row.preferred_date ?? undefined,
    message: row.message,
    status: 'pending',
  }));
}

/**
 * 予約のステータスを更新
 */
export async function updateReservationStatus(
  id: string,
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled'
): Promise<void> {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Supabase update error:', error);
    throw new Error('ステータスの更新に失敗しました');
  }
}
