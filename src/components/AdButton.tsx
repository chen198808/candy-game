import { Play } from 'lucide-react';
import { useState } from 'react';

export default function AdButton() {
  const [loading, setLoading] = useState(false);
  const [watched, setWatched] = useState(false);

  const handleWatchAd = () => {
    setLoading(true);
    // DCloud uni-AD 激励视频广告模拟
    // 实际项目中替换为 uni-AD SDK 调用
    // 例如: uni.createRewardedVideoAd({ adUnitId: 'xxx' })
    console.log('[uni-AD] 请求激励视频广告...');

    // 模拟广告观看
    setTimeout(() => {
      setLoading(false);
      setWatched(true);
      alert('🎉 观看广告成功！获得 50 金币奖励！');
      setTimeout(() => setWatched(false), 3000);
    }, 2000);
  };

  return (
    <button
      onClick={handleWatchAd}
      disabled={loading}
      className={cn(
        'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all',
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 active:scale-95 shadow-lg hover:shadow-xl'
      )}
    >
      {loading ? (
        <>
          <span className="animate-spin">⏳</span>
          广告加载中...
        </>
      ) : watched ? (
        <>
          <span>✅</span>
          已领取奖励
        </>
      ) : (
        <>
          <Play className="w-5 h-5" />
          观看广告获取金币
        </>
      )}
    </button>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
