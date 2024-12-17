import React from 'react';
import { Trophy } from 'lucide-react';
import { Team, Round } from '../types/game';
import { GameHistoryTable } from './GameHistory/GameHistoryTable';

interface ScoreboardProps {
  teams: Team[];
  isGameOver: boolean;
  winningTeam?: number;
  rounds?: Round[];
}

export function Scoreboard({ teams, isGameOver, winningTeam, rounds = [] }: ScoreboardProps) {
  if (!teams || teams.length === 0) {
    return null;
  }

  const allPlayers = teams.flatMap(team => team.players);

  return (
    <div className="space-y-4 sticky top-0 z-10 bg-gradient-to-b from-indigo-900/95 to-transparent backdrop-blur-sm pb-4 pt-2">
      <div className="grid grid-cols-2 gap-3">
        {teams.map((team) => {
          if (!team || !team.players) return null;

          const isWinningTeam = isGameOver && team.id === winningTeam;
          const bgColor = team.color === 'blue' ? 'bg-blue-900/50' : 'bg-red-900/50';
          const borderColor = team.color === 'blue' ? 'border-blue-500/50' : 'border-red-500/50';
          const glowColor = team.color === 'blue' ? 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'shadow-[0_0_15px_rgba(239,68,68,0.3)]';

          return (
            <div
              key={team.id}
              className={`p-4 rounded-lg border ${borderColor} ${bgColor} ${glowColor}
                       ${isWinningTeam ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Team {team.id}</h3>
                {isWinningTeam && (
                  <Trophy className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              {team.players.map((player) => {
                if (!player) return null;

                return (
                  <div key={player.id} className="flex justify-between items-center mt-2">
                    <span className="text-white font-medium">{player.name}</span>
                    <span className={`font-bold text-lg ${
                      player.score >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {player.score}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {rounds.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <GameHistoryTable players={allPlayers} rounds={rounds} />
        </div>
      )}
    </div>
  );
}