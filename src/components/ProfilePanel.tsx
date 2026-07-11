import { useState } from 'react';
import { LogOut, Coins, Trophy, Wallet, X } from 'lucide-react';

interface User {
  id: string;
  nickname: string;
  coins: number;
}

interface ProfilePanelProps {
  user: User;
  onLogout: () => void;
}

export default function ProfilePanel({ user, onLogout }: ProfilePanelProps) {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [withdrawMsg, setWithdrawMsg] = useState('');

  const handleWithdraw = () => {
    const amount = Number(withdrawAmount);
    if (!amount || amount < 1000) {
      setWithdrawMsg('❌ 最低提现金额为 1000 金币');
      return;
    }
    if (amount > user.coins) {
      setWithdrawMsg('❌ 金币余额不足');
      return;
    }
    // 模拟提现请求
    setWithdrawMsg('✅ 提现申请已提交，预计 1-3 个工作日到账');
    setTimeout(() => {
      setShowWithdraw(false);
      setWithdrawMsg('');
    }, 3000);
  };

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 w-full max-w-sm border border-white/60">
      {/* 用户信息 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold">
            {user.nickname.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{user.nickname}</h3>
            <p className="text-xs text-gray-400">ID: {user.id.slice(0, 12)}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition"
          title="退出登录"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* 金币余额 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-4 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-600">金币余额</span>
          </div>
          <span className="text-2xl font-bold text-yellow-600">{user.coins}</span>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3">
        <button
          onClick={() => setShowWithdraw(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:from-green-500 hover:to-emerald-600 transition shadow-md"
        >
          <Wallet className="w-5 h-5" />
          提现
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Trophy className="w-4 h-4" />
          累计游戏得分将自动转换为金币
        </div>
      </div>

      {/* 提现弹窗 */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">💰 提现申请</h3>
              <button onClick={() => setShowWithdraw(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* 提现方式 */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">提现方式</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setWithdrawMethod('wechat')}
                    className={`flex-1 py-2 rounded-lg border-2 transition ${
                      withdrawMethod === 'wechat'
                        ? 'border-green-400 bg-green-50 text-green-600'
                        : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    🟢 微信
                  </button>
                  <button
                    onClick={() => setWithdrawMethod('alipay')}
                    className={`flex-1 py-2 rounded-lg border-2 transition ${
                      withdrawMethod === 'alipay'
                        ? 'border-blue-400 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    🔵 支付宝
                  </button>
                </div>
              </div>

              {/* 提现金额 */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">提现金币数量</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="最低 1000 金币"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  汇率：1000 金币 = 1 元 | 当前可提现：{Math.floor(user.coins / 1000) * 1000} 金币
                </p>
              </div>

              {/* 提现账号 */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  {withdrawMethod === 'wechat' ? '微信' : '支付宝'}账号
                </label>
                <input
                  type="text"
                  placeholder={withdrawMethod === 'wechat' ? '微信号' : '支付宝账号'}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                />
              </div>

              {withdrawMsg && (
                <p className={`text-sm text-center ${withdrawMsg.includes('❌') ? 'text-red-500' : 'text-green-500'}`}>
                  {withdrawMsg}
                </p>
              )}

              <button
                onClick={handleWithdraw}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition shadow-md"
              >
                确认提现
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
