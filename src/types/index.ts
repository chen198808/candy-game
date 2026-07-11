export type CandyType = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';

export interface BoardPosition {
  row: number;
  col: number;
}

export interface GameState {
  board: CandyType[][];
  score: number;
  combo: number;
  selected: BoardPosition | null;
  isAnimating: boolean;
}

export interface User {
  id: string;
  nickname: string;
  email: string;
  coins: number;
  createdAt: string;
}

export interface WithdrawRequest {
  id: string;
  userId: string;
  amount: number;
  method: 'wechat' | 'alipay';
  account: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: string;
}

export interface AdConfig {
  laoRongShuSiteId: string;
  laoRongShuBannerUrl: string;
  uniAdAppId: string;
  uniAdBannerId: string;
  uniAdRewardId: string;
}
