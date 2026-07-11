import { useState, useCallback, useEffect } from 'react';
import { cn } from '../lib/utils';

// 糖果颜色类型
type CandyType = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';

const CANDY_EMOJIS: Record<CandyType, string> = {
  red: '🍎',
  blue: '🫐',
  green: '🍀',
  yellow: '🌟',
  purple: '🍇',
  orange: '🍊',
};

const CANDY_COLORS: Record<CandyType, string> = {
  red: 'bg-red-400',
  blue: 'bg-blue-400',
  green: 'bg-green-400',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
};

const BOARD_SIZE = 8;
const CANDY_TYPES: CandyType[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

// 生成随机棋盘
function generateBoard(): CandyType[][] {
  const board: CandyType[][] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    board[r] = [];
    for (let c = 0; c < BOARD_SIZE; c++) {
      board[r][c] = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
    }
  }
  return board;
}

// 查找匹配
function findMatches(board: CandyType[][]): Set<string> {
  const matched = new Set<string>();

  // 检查水平匹配
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE - 2; c++) {
      const type = board[r][c];
      if (type && type === board[r][c + 1] && type === board[r][c + 2]) {
        let end = c + 2;
        while (end + 1 < BOARD_SIZE && board[r][end + 1] === type) end++;
        for (let i = c; i <= end; i++) matched.add(`${r}-${i}`);
      }
    }
  }

  // 检查垂直匹配
  for (let c = 0; c < BOARD_SIZE; c++) {
    for (let r = 0; r < BOARD_SIZE - 2; r++) {
      const type = board[r][c];
      if (type && type === board[r + 1][c] && type === board[r + 2][c]) {
        let end = r + 2;
        while (end + 1 < BOARD_SIZE && board[end + 1][c] === type) end++;
        for (let i = r; i <= end; i++) matched.add(`${i}-${c}`);
      }
    }
  }

  return matched;
}

// 填充空格
function dropCandies(board: CandyType[][]): CandyType[][] {
  const newBoard = board.map((row) => [...row]);
  for (let c = 0; c < BOARD_SIZE; c++) {
    let emptyRow = BOARD_SIZE - 1;
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      if (newBoard[r][c] !== null) {
        newBoard[emptyRow][c] = newBoard[r][c];
        if (emptyRow !== r) newBoard[r][c] = null!;
        emptyRow--;
      }
    }
    for (let r = emptyRow; r >= 0; r--) {
      newBoard[r][c] = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
    }
  }
  return newBoard;
}

export default function GameBoard() {
  const [board, setBoard] = useState<CandyType[][]>(generateBoard());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 移除匹配并计分
  const removeMatches = useCallback((currentBoard: CandyType[][]) => {
    const matches = findMatches(currentBoard);
    if (matches.size === 0) return currentBoard;

    const newBoard = currentBoard.map((row) => [...row]);
    matches.forEach((key) => {
      const [r, c] = key.split('-').map(Number);
      newBoard[r][c] = null!;
    });

    const matchCount = matches.size;
    setScore((prev) => prev + matchCount * 10 * (combo + 1));
    setCombo((prev) => prev + 1);

    // 填充新糖果
    setTimeout(() => {
      const filled = dropCandies(newBoard);
      setBoard(filled);
      // 递归检查新产生的匹配
      setTimeout(() => removeMatches(filled), 300);
    }, 300);

    return newBoard;
  }, [combo]);

  // 交换两个位置
  const swap = (r1: number, c1: number, r2: number, c2: number) => {
    const newBoard = board.map((row) => [...row]);
    const temp = newBoard[r1][c1];
    newBoard[r1][c1] = newBoard[r2][c2];
    newBoard[r2][c2] = temp;
    return newBoard;
  };

  const handleClick = (row: number, col: number) => {
    if (isAnimating) return;

    if (!selected) {
      setSelected([row, col]);
      return;
    }

    const [sr, sc] = selected;

    // 检查是否相邻
    const isAdjacent = Math.abs(sr - row) + Math.abs(sc - col) === 1;

    if (!isAdjacent) {
      setSelected([row, col]);
      return;
    }

    // 尝试交换
    setIsAnimating(true);
    const newBoard = swap(sr, sc, row, col);
    setBoard(newBoard);
    setSelected(null);

    // 检查是否有匹配
    setTimeout(() => {
      const matches = findMatches(newBoard);
      if (matches.size > 0) {
        removeMatches(newBoard);
      } else {
        // 没有匹配，交换回来
        const reverted = swap(row, col, sr, sc);
        setBoard(reverted);
        setCombo(0);
      }
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 分数面板 */}
      <div className="flex items-center gap-6 bg-white/90 backdrop-blur rounded-2xl px-6 py-3 shadow-lg">
        <div className="text-center">
          <p className="text-sm text-gray-500">得分</p>
          <p className="text-2xl font-bold text-purple-600">{score}</p>
        </div>
        {combo > 1 && (
          <div className="text-center animate-bounce">
            <p className="text-sm text-orange-500 font-bold">{combo}x 连击!</p>
          </div>
        )}
      </div>

      {/* 游戏棋盘 */}
      <div className="grid grid-cols-8 gap-1.5 bg-white/50 backdrop-blur p-4 rounded-3xl shadow-2xl border border-white/60">
        {board.map((row, ri) =>
          row.map((candy, ci) => (
            <button
              key={`${ri}-${ci}`}
              onClick={() => handleClick(ri, ci)}
              disabled={isAnimating}
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200',
                candy ? CANDY_COLORS[candy] : 'bg-gray-100',
                selected && selected[0] === ri && selected[1] === ci
                  ? 'ring-4 ring-yellow-400 scale-110'
                  : '',
                candy ? 'hover:scale-105 active:scale-95 cursor-pointer' : '',
                !candy ? 'opacity-0' : 'opacity-100'
              )}
              style={{ transition: 'all 0.2s ease' }}
            >
              {candy ? CANDY_EMOJIS[candy] : ''}
            </button>
          ))
        )}
      </div>

      <p className="text-sm text-gray-500">点击两个相邻糖果交换，三个或更多相同糖果连成一线即可消除 🍬</p>
    </div>
  );
}
