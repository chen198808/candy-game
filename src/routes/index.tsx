import Header from '../components/Header';
import GameBoard from '../components/GameBoard';
import AdButton from '../components/AdButton';
import AuthPanel from '../components/AuthPanel';
import ProfilePanel from '../components/ProfilePanel';
import { useState } from 'react';

export default function MainPage() {
  const [user, setUser] = useState<{ id: string; nickname: string; coins: number } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100">
      <Header user={user} coins={user?.coins ?? 0} />
      <main className="container mx-auto px-4 py-6 flex flex-col items-center gap-6">
        {/* 老榕树广告位 - 顶部横幅 */}
        <div className="w-full flex justify-center">
          <script
            dangerouslySetInnerHTML={{
              __html: `document.write('<script src="http://wm.lrswl.com/page/s.php?s=295046&w=950&h=90"><\\/script>');`,
            }}
          />
        </div>

        <GameBoard />

        <div className="flex gap-4 flex-wrap justify-center">
          <AdButton />
          {!user ? (
            <AuthPanel onLogin={setUser} />
          ) : (
            <ProfilePanel user={user} onLogout={() => setUser(null)} />
          )}
        </div>
      </main>
    </div>
  );
}
