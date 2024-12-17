import { GameState, Player, Round, GamePhase } from '../types/game';

export function createInitialGameState(playerNames: string[]): GameState {
  const players: Player[] = playerNames.map((name, index) => ({
    id: index + 1,
    name,
    score: 0,
  }));

  return {
    players,
    currentRound: {
      playerBids: new Map(),
      playerResults: new Map(),
    },
    rounds: [],
    isGameOver: false,
    currentPhase: 'bidding',
  };
}

export function checkWinCondition(players: Player[]): number | undefined {
  // Team 1: players[0] (Player 1) and players[2] (Player 3)
  const team1Player1Score = players[0].score;
  const team1Player2Score = players[2].score;
  
  // Team 2: players[1] (Player 2) and players[3] (Player 4)
  const team2Player1Score = players[1].score;
  const team2Player2Score = players[3].score;

  // Check if team 1 has won (Player 1 & 3)
  if ((team1Player1Score >= 41 && team1Player2Score >= 0) || 
      (team1Player2Score >= 41 && team1Player1Score >= 0)) {
    return 1;
  }

  // Check if team 2 has won (Player 2 & 4)
  if ((team2Player1Score >= 41 && team2Player2Score >= 0) || 
      (team2Player2Score >= 41 && team2Player1Score >= 0)) {
    return 2;
  }

  return undefined;
}

export function calculateNewScores(
  players: Player[],
  bids: Map<number, number>,
  results: Map<number, boolean>
): Player[] {
  return players.map(player => ({
    ...player,
    score: player.score + (
      results.get(player.id)
        ? (bids.get(player.id) || 0)
        : -(bids.get(player.id) || 0)
    ),
  }));
}