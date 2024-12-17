import { useState, useCallback, useEffect } from 'react';
import { GameState, Round } from '../types/game';
import { createInitialGameState, checkWinCondition, calculateNewScores } from '../utils/gameLogic';
import { generateGameId } from '../utils/gameId';
import { useGameDatabase } from './useGameDatabase';
import { useSoundEffects } from './useSoundEffects';

export function useGameState(urlGameId?: string) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const { gameData, loading, saveGame } = useGameDatabase(urlGameId);
  const { playClick, playBidSelect, playSuccess, playFail, playRoundComplete, playVictory } = useSoundEffects();

  // Sync with database when gameData changes
  useEffect(() => {
    if (gameData) {
      setGameState(gameData);
    }
  }, [gameData]);

  const initializeGame = useCallback(async (playerNames: string[]) => {
    playClick();
    const initialState = createInitialGameState(playerNames);
    const gameId = generateGameId();
    const newGameState = { 
      ...initialState, 
      id: gameId,
      createdAt: Date.now()
    };
    setGameState(newGameState);
    await saveGame(newGameState);
  }, [saveGame, playClick]);

  const resetGame = useCallback(() => {
    playClick();
    setGameState(null);
  }, [playClick]);

  const handleBidChange = useCallback((playerId: number, bid: number) => {
    if (!gameState) return;
    
    playBidSelect(bid);
    
    const newState = {
      ...gameState,
      currentRound: {
        ...gameState.currentRound,
        playerBids: new Map(gameState.currentRound.playerBids).set(playerId, bid),
      },
    };
    
    setGameState(newState);
    saveGame(newState);
  }, [gameState, saveGame, playBidSelect]);

  const handleConfirmBids = useCallback(() => {
    if (!gameState) return;
    
    playClick();
    
    const newState = {
      ...gameState,
      currentPhase: 'results' as const,
    };
    
    setGameState(newState);
    saveGame(newState);
  }, [gameState, saveGame, playClick]);

  const handleResultSubmit = useCallback((playerId: number, success: boolean) => {
    if (!gameState) return;
    
    if (success) {
      playSuccess();
    } else {
      playFail();
    }
    
    const newState = {
      ...gameState,
      currentRound: {
        ...gameState.currentRound,
        playerResults: new Map(gameState.currentRound.playerResults).set(playerId, success),
      },
    };
    
    setGameState(newState);
    saveGame(newState);
  }, [gameState, saveGame, playSuccess, playFail]);

  const handleConfirmResults = useCallback(() => {
    if (!gameState) return;
    
    playRoundComplete();

    const currentRound: Round = {
      playerBids: gameState.currentRound.playerBids,
      playerResults: gameState.currentRound.playerResults,
    };

    const updatedPlayers = calculateNewScores(
      gameState.players,
      currentRound.playerBids,
      currentRound.playerResults
    );

    const winningTeam = checkWinCondition(updatedPlayers);

    if (winningTeam) {
      playVictory();
    }

    const newState = {
      ...gameState,
      players: updatedPlayers,
      rounds: [...gameState.rounds, currentRound],
      currentRound: {
        playerBids: new Map(),
        playerResults: new Map(),
      },
      currentPhase: 'bidding' as const,
      isGameOver: !!winningTeam,
      winningTeam,
    };

    setGameState(newState);
    saveGame(newState);
  }, [gameState, saveGame, playRoundComplete, playVictory]);

  return {
    gameState,
    loading,
    initializeGame,
    resetGame,
    handleBidChange,
    handleConfirmBids,
    handleResultSubmit,
    handleConfirmResults,
  };
}