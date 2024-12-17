import { GameState } from '../types/game';

export interface DBGame extends GameState {
  createdAt: number;
  updatedAt: number;
}

export const SCHEMA = {
  games: `
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    )
  `,
  
  rounds: `
    CREATE TABLE IF NOT EXISTS rounds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gameId TEXT NOT NULL,
      roundNumber INTEGER NOT NULL,
      data TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      FOREIGN KEY (gameId) REFERENCES games(id) ON DELETE CASCADE
    )
  `,
};

export const INDEXES = {
  gameCreatedAt: `
    CREATE INDEX IF NOT EXISTS idx_games_createdAt ON games(createdAt)
  `,
  roundGameId: `
    CREATE INDEX IF NOT EXISTS idx_rounds_gameId ON rounds(gameId)
  `,
};