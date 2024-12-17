import { db } from './client';
import { DBGame } from './schema';
import { GameState } from '../types/game';

export async function saveGame(gameState: GameState): Promise<void> {
  const now = Date.now();
  const game: DBGame = {
    ...gameState,
    createdAt: now,
    updatedAt: now,
  };

  await db.execute({
    sql: `
      INSERT INTO games (id, data, createdAt, updatedAt)
      VALUES (?, ?, ?, ?)
      ON CONFLICT (id) DO UPDATE SET
        data = excluded.data,
        updatedAt = excluded.updatedAt
    `,
    args: [game.id, JSON.stringify(game), game.createdAt, game.updatedAt],
  });
}

export async function getGame(gameId: string): Promise<GameState | null> {
  const result = await db.execute({
    sql: 'SELECT data FROM games WHERE id = ?',
    args: [gameId],
  });

  if (!result.rows.length) {
    return null;
  }

  const gameData = result.rows[0].data as string;
  return JSON.parse(gameData);
}

export async function deleteGame(gameId: string): Promise<void> {
  await db.execute({
    sql: 'DELETE FROM games WHERE id = ?',
    args: [gameId],
  });
}

export async function cleanupOldGames(): Promise<void> {
  const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  
  await db.execute({
    sql: 'DELETE FROM games WHERE createdAt < ?',
    args: [oneMonthAgo],
  });
}