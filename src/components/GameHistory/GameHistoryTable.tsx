import React from 'react';
import { Player, Round } from '../../types/game';

interface GameHistoryTableProps {
  players: Player[];
  rounds: Round[];
}

export function GameHistoryTable({ players, rounds }: GameHistoryTableProps) {
  // Sort players by ID to ensure consistent order (1,2,3,4)
  const sortedPlayers = [...players].sort((a, b) => a.id - b.id);

  // Calculate total scores for each player
  const totalScores = sortedPlayers.map(player => {
    return rounds.reduce((total, round) => {
      const bid = round.playerBids.get(player.id) || 0;
      const success = round.playerResults.get(player.id) || false;
      return total + (success ? bid : -bid);
    }, 0);
  });

  return (
    <div className="overflow-x-auto">
      <table className="history-table">
        <thead>
          <tr>
            <th className="text-center">Round</th>
            {sortedPlayers.map(player => (
              <th key={player.id} className="text-center">{player.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rounds.map((round, index) => (
            <tr key={index}>
              <td className="text-center font-medium">{index + 1}</td>
              {sortedPlayers.map(player => {
                const bid = round.playerBids.get(player.id) || 0;
                const success = round.playerResults.get(player.id) || false;
                const score = success ? bid : -bid;

                return (
                  <td key={player.id} className="text-center">
                    <span className={`font-bold ${score >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {score >= 0 ? '+' : ''}{score}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
          {rounds.length > 0 && (
            <tr className="border-t-2 border-white/20">
              <td className="text-center font-bold">Total</td>
              {totalScores.map((score, index) => (
                <td key={index} className="text-center">
                  <span className={`font-bold ${score >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {score >= 0 ? '+' : ''}{score}
                  </span>
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}