/**
 * Supabase Database Types
 *
 * Supabaseダッシュボードから自動生成することも可能:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ReservationStatus = 'pending' | 'contacted' | 'confirmed' | 'cancelled';

export type Database = {
  public: {
    Tables: {
      reservations: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          inquiry_type: string | null;
          preferred_date: string | null;
          message: string;
          status: ReservationStatus;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          inquiry_type?: string | null;
          preferred_date?: string | null;
          message: string;
          status?: ReservationStatus;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          inquiry_type?: string | null;
          preferred_date?: string | null;
          message?: string;
          status?: ReservationStatus;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      reservation_status: ReservationStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// 便利な型エイリアス
export type Reservation = Database['public']['Tables']['reservations']['Row'];
export type ReservationInsert = Database['public']['Tables']['reservations']['Insert'];
export type ReservationUpdate = Database['public']['Tables']['reservations']['Update'];
