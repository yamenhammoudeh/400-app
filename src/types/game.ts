import { GamePhase } from './phases';

export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface Team {
  id: number;
  players: [Player, Player];
  color: string;
}

export interface Round {
  playerBids: Map<number, number>;
  playerResults: Map<number, boolean>;
}

export interface GameState {
  id: string;
  players: Player[];
  currentRound: Round;
  rounds: Round[];
  isGameOver: boolean;
  winningTeam?: number;
  currentPhase: GamePhase;
}

export interface GameShare {
  id: string;
  url: string;
  qrCode: string;
}