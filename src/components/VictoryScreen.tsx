import React from 'react';
import { Trophy, Star, Award, Crown, Share2, RotateCcw } from 'lucide-react';
import { Team, Round, Player } from '../types/game';
import { useVictoryEffect } from '../hooks/useVictoryEffect';
import { shareGameResults } from '../utils/share';
import { getHighestBid } from '../utils/scores';
import { GameHistoryTable } from './GameHistory/GameHistoryTable';

interface VictoryScreenProps {
  winningTeam: Team;
  rounds: Round[];
  onNewGame: () => void;
}

export function VictoryScreen({ winningTeam, rounds, onNewGame }: VictoryScreenProps) {
  useVictoryEffect();

  const totalRounds = rounds.length;
  const winningScore = Math.max(...winningTeam.players.map(p => p.score));
  const highestBid = getHighestBid(rounds);

  // Get all players from both teams
  const allPlayers: Player[] = [
    ...winningTeam.players,
    ...(winningTeam.id === 1 
      ? [{ id: 2, name: '', score: 0 }, { id: 4, name: '', score: 0 }] 
      : [{ id: 1, name: '', score: 0 }, { id: 3, name: '', score: 0 }])
  ].sort((a, b) => a.id - b.id);

  const handleShare = () => {
    shareGameResults(
      winningTeam.id,
      winningTeam.players[0].name,
      winningTeam.players[1].name,
      winningTeam.players[0].score,
      winningTeam.players[1].score,
      totalRounds,
      highestBid
    );
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto my-8 space-y-6">
        <div className="bg-white rounded-2xl p-8 shadow-2xl transform animate-bounce-once">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-yellow-500 animate-pixel-float" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Team {winningTeam.id} Wins!
            </h2>
            <p className="text-gray-600">
              Congratulations to {winningTeam.players[0].name} and {winningTeam.players[1].name}!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<Star className="w-8 h-8 text-blue-500" />}
              value={totalRounds}
              label="Total Rounds"
              color="blue"
            />
            <StatCard
              icon={<Award className="w-8 h-8 text-green-500" />}
              value={winningScore}
              label="Winning Score"
              color="green"
            />
            <StatCard
              icon={<Crown className="w-8 h-8 text-purple-500" />}
              value={highestBid}
              label="Highest Bid"
              color="purple"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onNewGame}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Start New Game
            </button>
            <button
              onClick={handleShare}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Results
            </button>
          </div>
        </div>

        {/* Compact Game History */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">Game History</h3>
          <div className="overflow-x-auto">
            <GameHistoryTable 
              players={allPlayers}
              rounds={rounds}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: 'blue' | 'green' | 'purple';
}

function StatCard({ icon, value, label, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
  };

  return (
    <div className={`p-4 rounded-lg text-center ${colorClasses[color]}`}>
      <div className="mx-auto mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}