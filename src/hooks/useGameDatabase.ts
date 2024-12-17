import { useEffect, useState } from 'react';
import { GameState } from '../types/game';
import { saveGame, getGame, deleteGame, cleanupOldGames } from '../db/operations';
import { initializeDatabase } from '../db/client';

export function useGameDatabase(gameId: string | undefined) {
  const [gameData, setGameData] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize database on first load
  useEffect(() => {
    initializeDatabase().catch(console.error);
  }, []);

  // Load game data when gameId changes
  useEffect(() => {
    if (!gameId) {
      setLoading(false);
      return;
    }

    const loadGame = async () => {
      try {
        const game = await getGame(gameId);
        setGameData(game);
      } catch (err) {
        console.error('Error loading game:', err);
        setError('Failed to load game');
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [gameId]);

  // Cleanup old games periodically
  useEffect(() => {
    const cleanup = () => {
      cleanupOldGames().catch(console.error);
    };

    // Run cleanup once on mount and then every hour
    cleanup();
    const interval = setInterval(cleanup, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    gameData,
    loading,
    error,
    saveGame: async (state: GameState) => {
      try {
        await saveGame(state);
        setGameData(state);
      } catch (err) {
        console.error('Error saving game:', err);
        setError('Failed to save game');
      }
    },
    deleteGame: async (id: string) => {
      try {
        await deleteGame(id);
        if (id === gameId) {
          setGameData(null);
        }
      } catch (err) {
        console.error('Error deleting game:', err);
        setError('Failed to delete game');
      }
    },
  };
}