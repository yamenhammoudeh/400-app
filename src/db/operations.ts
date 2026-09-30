import { db } from './client';
import { GameState, Round } from '../types/game';

const STORAGE_PREFIX = 'game:';

// Maps don't survive JSON.stringify, so rounds are stored as arrays of entries.
interface StoredRound {
  playerBids: [number, number][];
  playerResults: [number, boolean][];
}

interface StoredGame extends Omit<GameState, 'currentRound' | 'rounds'> {
  currentRound: StoredRound;
  rounds: StoredRound[];
  createdAt: number;
  updatedAt: number;
}

function serializeRound(round: Round): StoredRound {
  return {
    playerBids: Array.from(round.playerBids.entries()),
    playerResults: Array.from(round.playerResults.entries()),
  };
}

function deserializeRound(round: Partial<StoredRound> | undefined): Round {
  // Older saves wrote Maps as {}, which carry no data
  return {
    playerBids: new Map(Array.isArray(round?.playerBids) ? round.playerBids : []),
    playerResults: new Map(Array.isArray(round?.playerResults) ? round.playerResults : []),
  };
}

function deserializeGame(data: string): GameState {
  const game: StoredGame = JSON.parse(data);
  return {
    ...game,
    currentRound: deserializeRound(game.currentRound),
    rounds: (game.rounds ?? []).map(deserializeRound),
  };
}

export async function saveGame(gameState: GameState): Promise<void> {
  const now = Date.now();
  const game: StoredGame = {
    ...gameState,
    currentRound: serializeRound(gameState.currentRound),
    rounds: gameState.rounds.map(serializeRound),
    createdAt: now,
    updatedAt: now,
  };

  if (!db) {
    const existing = localStorage.getItem(STORAGE_PREFIX + game.id);
    if (existing) game.createdAt = JSON.parse(existing).createdAt ?? now;
    localStorage.setItem(STORAGE_PREFIX + game.id, JSON.stringify(game));
    return;
  }

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
  if (!db) {
    const data = localStorage.getItem(STORAGE_PREFIX + gameId);
    return data ? deserializeGame(data) : null;
  }

  const result = await db.execute({
    sql: 'SELECT data FROM games WHERE id = ?',
    args: [gameId],
  });

  if (!result.rows.length) {
    return null;
  }

  return deserializeGame(result.rows[0].data as string);
}

export async function deleteGame(gameId: string): Promise<void> {
  if (!db) {
    localStorage.removeItem(STORAGE_PREFIX + gameId);
    return;
  }

  await db.execute({
    sql: 'DELETE FROM games WHERE id = ?',
    args: [gameId],
  });
}

export async function cleanupOldGames(): Promise<void> {
  const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  if (!db) {
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith(STORAGE_PREFIX)) continue;
      try {
        if ((JSON.parse(localStorage.getItem(key)!).createdAt ?? 0) < oneMonthAgo) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
    return;
  }

  await db.execute({
    sql: 'DELETE FROM games WHERE createdAt < ?',
    args: [oneMonthAgo],
  });
}
