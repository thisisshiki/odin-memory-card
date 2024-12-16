import { Trophy, Target } from 'lucide-react';

interface ScoreboardProps {
  currentScore: number;
  bestScore: number;
}

export function Scoreboard({ currentScore, bestScore }: ScoreboardProps) {
  return (
    <div className="flex gap-8 text-xl font-semibold text-gray-100 bg-gray-700 p-4 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Target className="w-6 h-6" />
        <span>Current Score: {currentScore}</span>
      </div>
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        <span>Best Score: {bestScore}</span>
      </div>
    </div>
  );
}