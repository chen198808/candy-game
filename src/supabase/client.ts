import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase: SupabaseClient<Database> = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ========== 用户相关 API ==========

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateUserCoins(userId: string, coins: number) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ coins })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ========== 提现相关 API ==========

export async function createWithdrawRequest(request: {
  user_id: string;
  amount: number;
  method: 'wechat' | 'alipay';
  account: string;
}) {
  const { data, error } = await supabase
    .from('withdraw_requests')
    .insert({
      user_id: request.user_id,
      amount: request.amount,
      method: request.method,
      account: request.account,
      status: 'pending',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getWithdrawRequests(userId: string) {
  const { data, error } = await supabase
    .from('withdraw_requests')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// ========== 游戏记录 ==========

export async function saveGameRecord(record: {
  user_id: string;
  score: number;
  coins_earned: number;
}) {
  const { data, error } = await supabase
    .from('game_records')
    .insert({
      user_id: record.user_id,
      score: record.score,
      coins_earned: record.coins_earned,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getLeaderboard(limit = 100) {
  const { data, error } = await supabase
    .from('game_records')
    .select('user_id, score, profiles(nickname)')
    .order('score', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}
