import { Player, Round } from '../types/game';
import { WINNING_SCORE } from '../constants/game';

export function calculateRoundScore(bid: number, success: boolean): number {
  return success ? bid : -bid;
}

export function calculateRunningTotals(players: Player[], rounds: Round[]): Record<number, number>[] {
  return rounds.reduce((totals, round, index) => {
    const roundTotals = players.map(player => {
      const previousTotal = index > 0 ? totals[index - 1][player.id] : 0;
      const bid = round.playerBids.get(player.id) || 0;
      const success = round.playerResults.get(player.id) || false;
      return previousTotal + calculateRoundScore(bid, success);
    });

    const totalsByPlayerId = players.reduce((acc, player, idx) => {
      acc[player.id] = roundTotals[idx];
      return acc;
    }, {} as Record<number, number>);

    return [...totals, totalsByPlayerId];
  }, [] as Record<number, number>[]);
}

export function getHighestBid(rounds: Round[]): number {
  return Math.max(...rounds.flatMap(round => Array.from(round.playerBids.values())));
}

export function hasTeamWon(player1Score: number, player2Score: number): boolean {
  return (player1Score >= WINNING_SCORE && player2Score >= 0) || 
         (player2Score >= WINNING_SCORE && player1Score >= 0);
}