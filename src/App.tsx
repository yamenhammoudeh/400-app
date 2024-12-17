import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerSetup } from './components/PlayerSetup';
import { BidCollectionPhase } from './components/BidCollection/BidCollectionPhase';
import { ResultsConfirmation } from './components/Results/ResultsConfirmation';
import { Scoreboard } from './components/Scoreboard';
import { VictoryScreen } from './components/VictoryScreen';
import { QRCodeButton } from './components/QRCode/QRCodeButton';
import { QRCodeModal } from './components/QRCode/QRCodeModal';
import { JoinGame } from './components/JoinGame';
import { DonateButton } from './components/Footer/DonateButton';
import { Footer } from './components/Footer/Footer';
import { useGameState } from './hooks/useGameState';
import { TEAMS } from './constants/game';
import { getGameUrl } from './utils/gameId';

export default function App() {
  const { gameId: urlGameId } = useParams();
  const [showQRCode, setShowQRCode] = useState(false);
  
  const {
    gameState,
    initializeGame,
    resetGame,
    handleBidChange,
    handleConfirmBids,
    handleResultSubmit,
    handleConfirmResults,
  } = useGameState(urlGameId);

  const handleJoinGame = (id: string) => {
    window.location.href = `/${id}`;
  };

  if (!gameState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <PlayerSetup onPlayersSubmit={initializeGame} />
        <div className="w-full max-w-md">
          <div className="text-center text-white/60 my-4">- OR -</div>
          <JoinGame onJoin={handleJoinGame} />
        </div>
        <Footer />
      </div>
    );
  }

  const teams = TEAMS.map(team => ({
    id: team.id,
    color: team.color,
    players: team.playerIndices.map(idx => gameState.players[idx]),
  }));

  if (gameState.isGameOver && gameState.winningTeam) {
    const winningTeam = teams.find(team => team.id === gameState.winningTeam);
    if (!winningTeam) return null;

    return (
      <>
        <VictoryScreen
          winningTeam={winningTeam}
          rounds={gameState.rounds}
          onNewGame={resetGame}
        />
        <DonateButton />
        <Footer />
      </>
    );
  }

  return (
    <div className="game-container">
      <Scoreboard
        teams={teams}
        isGameOver={gameState.isGameOver}
        winningTeam={gameState.winningTeam}
        rounds={gameState.rounds}
      />

      <div className="game-content">
        {gameState.currentPhase === 'bidding' && (
          <BidCollectionPhase
            players={gameState.players}
            currentBids={gameState.currentRound.playerBids}
            onBidChange={handleBidChange}
            onConfirmBids={handleConfirmBids}
          />
        )}

        {gameState.currentPhase === 'results' && (
          <ResultsConfirmation
            players={gameState.players.map(player => ({
              ...player,
              bid: gameState.currentRound.playerBids.get(player.id) || 0,
            }))}
            onResultSubmit={handleResultSubmit}
            results={gameState.currentRound.playerResults}
            onConfirmResults={handleConfirmResults}
            rounds={gameState.rounds}
          />
        )}
      </div>

      <QRCodeButton onClick={() => setShowQRCode(true)} />
      <DonateButton />
      <Footer />
      
      <QRCodeModal
        isOpen={showQRCode}
        onClose={() => setShowQRCode(false)}
        gameId={gameState.id}
        gameUrl={getGameUrl(gameState.id)}
      />
    </div>
  );
}