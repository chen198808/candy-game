export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          nickname: string | null;
          email: string | null;
          coins: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nickname?: string | null;
          email?: string | null;
          coins?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nickname?: string | null;
          email?: string | null;
          coins?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      withdraw_requests: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          method: 'wechat' | 'alipay';
          account: string;
          status: 'pending' | 'approved' | 'rejected' | 'paid';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          method: 'wechat' | 'alipay';
          account: string;
          status?: 'pending' | 'approved' | 'rejected' | 'paid';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          method?: 'wechat' | 'alipay';
          account?: string;
          status?: 'pending' | 'approved' | 'rejected' | 'paid';
          created_at?: string;
          updated_at?: string;
        };
      };
      game_records: {
        Row: {
          id: string;
          user_id: string;
          score: number;
          coins_earned: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          score: number;
          coins_earned: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          score?: number;
          coins_earned?: number;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
