import { UserCircle } from 'lucide-react';

interface HeaderProps {
  user: { nickname: string; coins: number } | null;
  coins: number;
}

export default function Header({ user, coins }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          🍬 Candy Game
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
            <span className="text-yellow-600 font-semibold">🪙 {coins}</span>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <UserCircle className="w-8 h-8 text-purple-500" />
              <span className="font-medium text-gray-700">{user.nickname}</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
