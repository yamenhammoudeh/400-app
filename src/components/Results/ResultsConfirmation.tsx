import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { GameHistoryTable } from '../GameHistory/GameHistoryTable';
import { ResultsHeader } from './ResultsHeader';
import { Player, Round } from '../../types/game';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface ResultsConfirmationProps {
  players: Array<{
    id: number;
    name: string;
    bid: number;
  }>;
  onResultSubmit: (playerId: number, success: boolean) => void;
  results: Map<number, boolean>;
  onConfirmResults: () => void;
  rounds: Round[];
}

export function ResultsConfirmation({ 
  players, 
  onResultSubmit, 
  results,
  onConfirmResults,
  rounds 
}: ResultsConfirmationProps) {
  const { playSuccess, playFail, playRoundComplete } = useSoundEffects();
  const allResultsSubmitted = players.every(player => results.has(player.id));
  const currentRoundNumber = rounds.length + 1;

  const handleResultSubmit = (playerId: number, success: boolean) => {
    if (success) {
      playSuccess();
    } else {
      playFail();
    }
    onResultSubmit(playerId, success);
  };

  const handleConfirmResults = () => {
    playRoundComplete();
    onConfirmResults();
  };

  return (
    <div className="space-y-6">
      <ResultsHeader roundNumber={currentRoundNumber} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map((player) => {
          const currentResult = results.get(player.id);
          
          return (
            <div key={player.id} className="card bg-gradient-to-br from-gray-900/80 to-gray-800/80">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-white">{player.name}</span>
                <span className="text-3xl font-bold text-white">
                  {player.bid}
                </span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleResultSubmit(player.id, true)}
                  className={`
                    flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200
                    flex items-center justify-center gap-2
                    ${currentResult === true 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 scale-105' 
                      : 'bg-white/10 text-white hover:bg-green-500/20'}
                  `}
                >
                  <ThumbsUp className={`w-5 h-5 ${currentResult === true ? 'animate-bounce' : ''}`} />
                  Success
                </button>
                <button
                  onClick={() => handleResultSubmit(player.id, false)}
                  className={`
                    flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200
                    flex items-center justify-center gap-2
                    ${currentResult === false 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105' 
                      : 'bg-white/10 text-white hover:bg-red-500/20'}
                  `}
                >
                  <ThumbsDown className={`w-5 h-5 ${currentResult === false ? 'animate-bounce' : ''}`} />
                  Failed
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {allResultsSubmitted && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <div className="max-w-md mx-auto">
            <button 
              onClick={handleConfirmResults}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                       py-3 px-8 rounded-lg text-lg font-bold
                       hover:from-blue-500 hover:to-purple-500 
                       transition-all duration-200 shadow-lg 
                       hover:shadow-blue-500/25 active:scale-95"
            >
              Confirm Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}